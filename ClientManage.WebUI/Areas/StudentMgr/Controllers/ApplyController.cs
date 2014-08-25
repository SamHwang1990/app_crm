using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Reflection;
using System.Dynamic;

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

        /// <summary>
        /// 返回新的父阶段Percentage
        /// </summary>
        /// <param name="parentStageNo">父阶段StageNo</param>
        /// <param name="studentID">学生ID</param>
        public int UpdateParentPercentage(int parentStageNo, Guid studentID)
        {
            int newParentPercentage;
            IEnumerable<StudentApplyStageEntity> childStages = repository.StudentApplyStage.Where(s => s.StudentID == studentID && s.ParentNo == parentStageNo);

            int childLength = childStages.Count();
            int completeChildLength = childStages.Count(c => c.Percentage == 100);

            newParentPercentage = completeChildLength * 100 / childLength;

            return newParentPercentage;
        }

        /// <summary>
        /// 返回子阶段的阶段百分比
        /// </summary>
        /// <param name="childStage"></param>
        /// <returns></returns>
        public int UpdateChildPercentage(StudentApplyStageEntity childStage)
        {
            string[] statusOptionArray = childStage.StatusOption.Split(',');
            int statusOptionLength = statusOptionArray.Length;
            int currentOptionIndex = Array.IndexOf(statusOptionArray, childStage.CurrentOption);
            return (currentOptionIndex + 1) * 100 / statusOptionLength;
        }

        /// <summary>
        /// 开始新的申请期
        /// </summary>
        /// <param name="parentStageNo"></param>
        /// <param name="studentID"></param>
        public void StartParentStage(int parentStageNo, Guid studentID)
        {
            List<StudentApplyStageEntity> resultList = new List<StudentApplyStageEntity>();
            StudentApplyStageEntity parentStage = repository.StudentApplyStage.SingleOrDefault(s => s.StudentID == studentID && s.StageNo == parentStageNo);
            IEnumerable<StudentApplyStageEntity> childStages = repository.StudentApplyStage.Where(s => s.StudentID == studentID && s.ParentNo == parentStageNo);

            if (parentStage == null)
                return;

            parentStage.Percentage = 1;
            parentStage.CurrentOption = parentStage.BeginOption;
            resultList.Add(parentStage);

            //如果子阶段无时间限制，则所有子阶段Percentage 均设为1
            //否则，仅设置第一个子阶段的Percentage 为1
            if (parentStage.IsDateSameWithParent)
            {
                foreach (StudentApplyStageEntity childItem in childStages)
                {
                    childItem.Percentage = 1;
                    childItem.CurrentOption = childItem.BeginOption;
                }
                resultList.AddRange(childStages);
            }
            else
            {
                int minChildNo = childStages.Min(s => s.StageNo);
                StudentApplyStageEntity firstChild = childStages.SingleOrDefault(s => s.StageNo == minChildNo);
                firstChild.Percentage = 1;
                firstChild.CurrentOption = firstChild.BeginOption;

                resultList.Add(firstChild);
            }

            //保存到数据库中
            repository.UpdateStudentApplyStages(resultList);
        }

        public Dictionary<string, object> ChildStageFinishHandler(StudentApplyStageEntity childStage)
        {
            Dictionary<string, object> resultDict = new Dictionary<string, object>();

            StudentApplyStageEntity parentStage = repository.StudentApplyStage.SingleOrDefault(s => s.StudentID == childStage.StudentID && s.StageNo == childStage.ParentNo);
            parentStage.Percentage = UpdateParentPercentage(parentStage.StageNo, parentStage.StudentID);
            if (parentStage.Percentage == 100)
            {
                resultDict.Add("IsParentComplete", new { IsParentComplete = true });
                resultDict.Add("NextParentNameEn", ChildStageFinishHandler_GetNextParent(parentStage));
            }
            else
            {
                resultDict.Add("IsParentComplete", new { IsParentComplete = false });
                resultDict.Add("NextSiblingNameEn", ChildStageFinishHandler_GetNextSibling(childStage));
            }
            repository.SaveStudentApplyStage(parentStage);

            return resultDict;
        }

        /// <summary>
        /// 获取并设置下一申请期信息，仅在当前父阶段所有子阶段都完成后才调用
        /// </summary>
        /// <param name="currentParentStage"></param>
        /// <returns></returns>
        public object ChildStageFinishHandler_GetNextParent(StudentApplyStageEntity currentParentStage)
        {
            Guid studentID = currentParentStage.StudentID;
            IEnumerable<StudentApplyStageEntity> siblingParentStages = repository.StudentApplyStage.Where(s => s.StudentID == studentID && s.StageClass == 1 && s.StageNo != currentParentStage.StageNo);
            StudentApplyStageEntity nextParent;

            if (siblingParentStages.Count(s => s.Percentage < 100) <= 0)
            {
                return new { NextParentNameEn = "ApplyCompleted" };
            }
            else
            {
                //如果所有申请期的Percentage 都不为0，则选取第一个未完成的申请期
                //否则，选取第一个未开始的申请期，并调用StartParentStage 函数初始化申请期的进度信息
                if (siblingParentStages.Count(s => s.Percentage == 0) <= 0)
                {
                    nextParent = siblingParentStages.FirstOrDefault(s => s.Percentage > 0 && s.Percentage < 100);
                }
                else
                {
                    nextParent = siblingParentStages.FirstOrDefault(s => s.Percentage == 0);
                    StartParentStage(nextParent.StageNo, studentID);
                }
                return new { NextParentNameEn = nextParent.StageNameEn };
            }
        }

        /// <summary>
        /// 获取并设置下一子阶段信息，仅在当前子阶段完成，而其他兄弟子阶段未全部完成才调用
        /// </summary>
        /// <param name="currentChildStage"></param>
        /// <returns></returns>
        public object ChildStageFinishHandler_GetNextSibling(StudentApplyStageEntity currentChildStage)
        {
            Guid studentID = currentChildStage.StudentID;
            IEnumerable<StudentApplyStageEntity> siblingChild = repository.StudentApplyStage
                .Where(s => s.StudentID == studentID && s.ParentNo == currentChildStage.ParentNo && s.StageClass == 2 && s.StageNo != currentChildStage.StageNo);

            StudentApplyStageEntity nextChild;
            //如果兄弟阶段的Percent 都不为0，则选取第一个未完成的阶段
            //否则，选取第一个未开始的阶段，Percent 为0
            if (siblingChild.Count(s => s.Percentage == 0) <= 0)
            {
                nextChild = siblingChild.Where(s => s.Percentage > 0 && s.Percentage < 100).OrderBy(s => s.StageNo).First();
            }
            else
            {
                nextChild = siblingChild.Where(s => s.Percentage == 0).OrderBy(s=>s.StageNo).First();
                nextChild.Percentage = 1;
                nextChild.CurrentOption = nextChild.BeginOption;
                repository.SaveStudentApplyStage(nextChild);
            }
            return new { NextSiblingNameEn = nextChild.StageNameEn };
        }

        public object ConvertDictToString(Dictionary<string, object> dict)
        {
            var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            var entries = dict.Select(d => d.Value);
            return serializer.Deserialize<object>(serializer.Serialize(entries));
        }
    }
}
