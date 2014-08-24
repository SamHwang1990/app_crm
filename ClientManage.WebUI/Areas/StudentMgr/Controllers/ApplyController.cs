using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Reflection;

using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using ClientManage.Domain.Enum;
using ClientManage.WebUI.Areas.StudentMgr.Models;
using ClientManage.WebUI.Areas.Setting.Models;
using ClientManage.WebUI.Models;

namespace ClientManage.WebUI.Areas.StudentMgr.Controllers
{
    public partial class ApplyController : Controller
    {
        private IStudentInfoRepository repository;
        public ApplyController(IStudentInfoRepository studentInfoRepository)
        {
            this.repository = studentInfoRepository;
        }

        #region Ajax Get Request

        public JsonResult Index_StageWrapList(string studentID)
        {
            List<StudentApplyStageWrap> stageWrapList = GetStudentApplyStageWrapList(studentID);
            if (stageWrapList == null)
                return Json(new { GetResult = false, Msg = "不能传入空的学生ID" }, JsonRequestBehavior.AllowGet);
            else
                return Json(stageWrapList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Syllabus_StageWrap(string studentID, string parentNameEn)
        {
            StudentApplyStageWrap stageWrap = GetStudentApplyStageWrapItem(studentID, parentNameEn);
            if (stageWrap == null)
                return Json(new { GetResult = false, Msg = "学生ID 为空，或不存在指定的阶段" }, JsonRequestBehavior.AllowGet);
            else
                return Json(stageWrap, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Resume_CurrentChildStage(string studentID, string parentNameEn)
        {
            IEnumerable<StudentApplyStageEntity> childStages = GetChildStageList(studentID, parentNameEn);
            StudentApplyStageEntity currentChild;
            if (childStages == null)
                return Json(new { GetResult = false, Msg = "学生ID 为空，或不存在指定的阶段" }, JsonRequestBehavior.AllowGet);
            else
            {
                if(childStages.Count(s=>s.Percentage>0 && s.Percentage<100) > 0)
                    currentChild = childStages.LastOrDefault(s=>s.Percentage > 0 && s.Percentage < 100);
                else
                    currentChild = childStages.First(s=>s.Percentage > 0);

                return Json(new { CurrentChildNameEn = currentChild.StageNameEn, CurrentChildNo = currentChild.StageNo }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult Detail_StageItem(string studentID, string stageNameEn)
        {
            StudentApplyStageEntity stageItem = GetStudentApplyStageItem(studentID, stageNameEn);
            if (stageItem == null)
                return Json(new { GetResult = false, Msg = "学生ID 为空，或不存在指定的阶段" }, JsonRequestBehavior.AllowGet);
            else
                return Json(stageItem, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Get Student Apply Stages From DB

        /// <summary>
        /// 根据学生ID，从数据库中返回StudentApplyStage集合
        /// </summary>
        /// <param name="studentID"></param>
        /// <returns></returns>
        public IEnumerable<StudentApplyStageEntity> GetStudentApplyStageList(string studentID)
        {
            if (!IsGuidStringValid(studentID))
                return null;
            else
                return repository.StudentApplyStage.Where(s => s.StudentID == new Guid(studentID));
        }

        /// <summary>
        /// 根据学生ID、父阶段英文名，从数据库返回子阶段List
        /// </summary>
        /// <param name="studentID"></param>
        /// <param name="parentNameEn"></param>
        /// <returns></returns>
        public IEnumerable<StudentApplyStageEntity> GetChildStageList(string studentID, string parentNameEn)
        {
            if (!IsGuidStringValid(studentID))
                return null;

            Guid _StudentID = new Guid(studentID);
            StudentApplyStageEntity parentStage = repository.StudentApplyStage.SingleOrDefault(s=>s.StudentID == _StudentID && s.StageNameEn == parentNameEn);
            if(parentStage == null)
                return null;

            return repository.StudentApplyStage.Where(s => s.StudentID == _StudentID && s.ParentNo == parentStage.StageNo).OrderBy(s => s.StageNo) ;
        }

        /// <summary>
        /// 根据学生ID，从数据库返回StudentApplyStage，并封装成StudentApplyStageWrap集合
        /// </summary>
        /// <param name="studentID"></param>
        /// <returns></returns>
        public List<StudentApplyStageWrap> GetStudentApplyStageWrapList(string studentID)
        {
            if (!IsGuidStringValid(studentID))
                return null;

            Guid _StudentId = new Guid(studentID);
            List<StudentApplyStageWrap> resultList = new List<StudentApplyStageWrap>();
            foreach (StudentApplyStageEntity parentStage in repository.StudentApplyStage.Where(s=>s.StudentID == _StudentId && s.StageClass == 1))
            {
                resultList.Add(new StudentApplyStageWrap { 
                    ParentStage = parentStage, 
                    ChildStages = repository.StudentApplyStage
                    .Where(s => s.StudentID == _StudentId && s.ParentNo == parentStage.StageNo)
                    .OrderBy(s=>s.StageNo)
                    .ToList()});
            }
            return resultList.OrderBy(s=>s.ParentStage.StageNo).ToList();
        }

        /// <summary>
        /// 根据学生ID、父阶段英文名，从数据库返回StudentApplyStageWrap
        /// </summary>
        /// <param name="studentID"></param>
        /// <param name="parentNameEn"></param>
        /// <returns></returns>
        public StudentApplyStageWrap GetStudentApplyStageWrapItem(string studentID, string parentNameEn)
        {
            if (!IsGuidStringValid(studentID))
                return null;

            Guid _StudentID = new Guid(studentID);
            StudentApplyStageEntity parentStage = repository.StudentApplyStage.FirstOrDefault(s => s.StudentID == _StudentID && s.StageNameEn == parentNameEn);
            return new StudentApplyStageWrap
            {
                ParentStage = parentStage,
                ChildStages = repository.StudentApplyStage
                    .Where(s => s.StudentID == _StudentID && s.ParentNo == parentStage.StageNo)
                    .OrderBy(s => s.StageNo)
                    .ToList()
            };
        }

        /// <summary>
        /// 根据学生ID、阶段英文名，从数据库返回StudentApplyStage
        /// </summary>
        /// <param name="studentID"></param>
        /// <param name="stageNameEn"></param>
        /// <returns></returns>
        public StudentApplyStageEntity GetStudentApplyStageItem(string studentID, string stageNameEn)
        {
            if (!IsGuidStringValid(studentID))
                return null;

            Guid _StudentID = new Guid(studentID);
            return repository.StudentApplyStage.SingleOrDefault(s => s.StudentID == _StudentID && s.StageNameEn == stageNameEn);
        }

        #endregion

        /// <summary>
        /// 根据传入的Guid 字符串，判断其是否为空，为null
        /// </summary>
        /// <param name="_id"></param>
        /// <returns></returns>
        private bool IsGuidStringValid(string _id)
        {
            if (_id == null || _id == string.Empty || _id == Guid.Empty.ToString())
                return false;
            else
                return true;
        }


    }
}
