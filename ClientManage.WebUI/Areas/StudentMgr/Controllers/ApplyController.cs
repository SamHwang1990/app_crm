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
    public class ApplyController : Controller
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

        #endregion

        #region Ajax Put Request

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

        #endregion

        /// <summary>
        /// 根据传入的Guid 字符串，判断其是否为空，为null
        /// </summary>
        /// <param name="_id"></param>
        /// <returns></returns>
        private bool IsGuidStringValid(string _id)
        {
            if (_id == null && _id == string.Empty && _id == Guid.Empty.ToString())
                return false;
            else
                return true;
        }
    }
}
