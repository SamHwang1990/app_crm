using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using ClientManage.Domain.Enum;
using ClientManage.WebUI.Areas.Setting.Models;
using ClientManage.WebUI.Models;

namespace ClientManage.WebUI.Areas.Setting.Controllers
{
    public class ApplyStageVersionController : Controller
    {
        private IApplyStagesRepository repository;

        public ApplyStageVersionController(IApplyStagesRepository applyStagesRepository)
        {
            repository = applyStagesRepository;
        }

        /// <summary>
        /// 返回Version 列表
        /// </summary>
        /// <returns></returns>
        public JsonResult VersionList()
        {
            IEnumerable<ApplyStageVersionEntity> list = null;
            list = repository.ApplyStageVersion.OrderBy(a => a.SignDateBefore);
            return Json(list,JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 修改Version 信息
        /// </summary>
        /// <param name="ajaxData"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult VersionEdit(ApplyStageVersionEntity ajaxData)
        {
            if (ajaxData.SignDateBefore == null)
                return Json(new { SaveResult = false });
            else
            {
                repository.SaveApplyStageVersion(ajaxData);
                return Json(new { SaveResult = true });
            }
        }

        /// <summary>
        /// 根据版本ID 返回版本信息
        /// </summary>
        /// <param name="versionID"></param>
        /// <returns></returns>
        public JsonResult GetVersionById(string versionID)
        {
            if (versionID == null || versionID == string.Empty || versionID == Guid.Empty.ToString())
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            ApplyStageVersionEntity applyVersion = repository.ApplyStageVersion.Single(r => r.VersionID == new Guid(versionID));
            return Json(applyVersion, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 根据VersionID 获取VersionDetail
        /// </summary>
        /// <param name="versionID"></param>
        /// <returns></returns>
        public JsonResult GetVersionDetail(string versionID)
        {
            List<ApplyStageVersionDetailWrap> versionDetailList = new List<ApplyStageVersionDetailWrap>();
            ApplyStageVersionDetailEntity parentDetail = null;
            List<ApplyStageVersionDetailEntity> childDetails = null;

            Guid VersionID = new Guid(versionID);

            //如果VersionDetail 表中没有该Version的Detail，则默认从ApplyStages中抓数据过来，否则就可以直接从VersionDetail表中抓数据了
            if (repository.ApplyStageVersionDetail.Count(a => a.VersionID == new Guid(versionID)) <= 0)
            {
                //如果没有VersionID，就创建一个
                if(VersionID == Guid.Empty || VersionID == null)
                {
                    VersionID = Guid.NewGuid();
                }
                //遍历所有StageClass为1 的阶段
                foreach (ApplyStagesEntity parent in repository.ApplyStages.Where(a=>a.StageClass == 1))
                {
                    parentDetail = this.TranStageToDetail(Guid.NewGuid(), VersionID, parent);
                    //根据父阶段的No 查找所有子阶段，并转化为VersionDetailEntity
                    childDetails = repository.ApplyStages
                        .Where(a => a.ParentNo == parent.StageNo)
                        .OrderBy(a => a.StageNo)
                        .ToList()
                        .Select(a => this.TranStageToDetail(Guid.NewGuid(), VersionID, a))
                        .ToList<ApplyStageVersionDetailEntity>();

                    //添加到ApplyStageVersionDetailWrap List 中
                    versionDetailList.Add(new ApplyStageVersionDetailWrap { ParentVersionDetail = parentDetail, ChildVersionDetails = childDetails });
                }
            }
            else
            {
                foreach (ApplyStageVersionDetailEntity parent in repository.ApplyStageVersionDetail.Where(a=>a.VersionID == VersionID && a.StageClass == 1))
                {
                    parentDetail = parent;
                    childDetails = repository.ApplyStageVersionDetail
                        .Where(a=>a.VersionID == VersionID && a.ParentNo == parent.ParentNo)
                        .OrderBy(a=>a.StageNo)
                        .ToList<ApplyStageVersionDetailEntity>();

                    //添加到ApplyStageVersionDetailWrap List 中
                    versionDetailList.Add(new ApplyStageVersionDetailWrap { ParentVersionDetail = parentDetail, ChildVersionDetails = childDetails });
                }
            }
            return Json(versionDetailList.OrderBy(v=>v.ParentVersionDetail.StageNo), JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 将ApplyStageEntity 转换为 ApplyStageVersionDetailEntity
        /// </summary>
        /// <param name="detailID">DetailID</param>
        /// <param name="versionID">VersionID</param>
        /// <param name="stageEntity">ApplyStageEntity的数据</param>
        /// <returns></returns>
        public ApplyStageVersionDetailEntity TranStageToDetail(Guid detailID, Guid versionID, ApplyStagesEntity stageEntity)
        {
            return new ApplyStageVersionDetailEntity
            {
                DetailID = detailID,
                VersionID = versionID,
                StageNo = stageEntity.StageNo,
                StageName = stageEntity.StageName,
                StageClass = stageEntity.StageClass,
                ParentNo = stageEntity.ParentNo,
                IsForbid = stageEntity.IsForbid,
                StatusOption = stageEntity.StatusOption,
                BeginOption = stageEntity.BeginOption,
                EndOption = stageEntity.EndOption,
                BeginDate = stageEntity.BeginDate,
                EndDate = stageEntity.EndDate,
                CompareDateWith = stageEntity.CompareDateWith,
                IsDateSameWithParent = stageEntity.IsDateSameWithParent,
                ChildStage = stageEntity.ChildStage,
                ResponseRole = stageEntity.ResponseRole,
                IsCalBeginDate = stageEntity.IsCalBeginDate,
                IsCalEndDate = stageEntity.IsCalEndDate,
                CanForbid = stageEntity.CanForbid,
                CanChangeDate = stageEntity.CanChangeDate,
                CanChangeName = stageEntity.CanChangeName,
                Remark = stageEntity.Remark
            };
        }
    }
}
