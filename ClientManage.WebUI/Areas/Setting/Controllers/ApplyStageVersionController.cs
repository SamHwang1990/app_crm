using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using ClientManage.Domain.Enum;
//using ClientManage.WebUI.Areas.Setting.Models;
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
    }
}
