using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Mail;
using System.Text;
using System.Xml.Linq;

using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using ClientManage.Domain.Enum;
using ClientManage.WebUI.Areas.StudentMgr.Models;
using ClientManage.WebUI.Models;

namespace ClientManage.WebUI.Areas.StudentMgr.Controllers
{
    public class SaleTrackController : Controller
    {
        private ISaleTrackRepository repository;

        public SaleTrackController(ISaleTrackRepository saleTrackRepository)
        {
            repository = saleTrackRepository;
        }

        

        /// <summary>
        /// 根据学生ID，获取申请进度，并返回JSON格式的进度数据
        /// </summary>
        /// <param name="studentID"></param>
        /// <returns></returns>
        public JsonResult GetInterviewData(string studentID)
        {
            Guid id = new Guid(studentID);
            if (repository.AppRelation.SingleOrDefault(a => a.StudentID == id).IsSign == IsSign.已签约)
                return Json(new { HasSign = true },JsonRequestBehavior.AllowGet);

            int itemNum = repository.SaleTrack.Where(s => s.StudentID == id).Count();
            if (itemNum == 0)
            {
                return GetFirstInterviewData(id);     //初访
            }
            else
            {
                int trackNo = repository.SaleTrack.Where(s => s.StudentID == id).Max(s => s.TrackNo);
                if (trackNo == 1)
                {
                    if (!CheckGerFromDone(id, trackNo))
                    {
                        return GetFirstInterviewData(id);       //初访
                    }
                    else
                    {
                        return GetCommonInterviewData(id, trackNo + 1);      //第N+1次回访Action
                    }
                }
                else
                {
                    if (!CheckGerFromDone(id, trackNo))
                    {
                        return GetCommonInterviewData(id, trackNo);      //第N次回访Action
                    }
                    else
                    {
                        return GetCommonInterviewData(id, trackNo + 1);      //第N+1次回访Action
                    }
                }
            }
        }

        #region FirstInterview
        JsonResult GetFirstInterviewData(Guid id)
        {
            StudentInfoEntity studentInfo = repository.StudentInfo.FirstOrDefault(s => s.StudentID == id);
            SaleTrackEntity SaleTrack;
            IEnumerable<SaleTrackParticipantsEntity> SaleTrackParticipants = null;
            if (repository.SaleTrack.SingleOrDefault(s => s.StudentID == id && s.TrackNo == 1) != null)
            {
                SaleTrack = repository.SaleTrack.SingleOrDefault(s => s.StudentID == id && s.TrackNo == 1);
                SaleTrackParticipants = repository.SaleTrackParticipants.Where(s => s.SaleTrackID == SaleTrack.TrackItemID).Select(s => s);
            }
            else
            {
                SaleTrack = new SaleTrackEntity
                {
                    TrackItemID = Guid.NewGuid(),
                    StudentID = id,
                    Inputor = HttpContext.User.Identity.Name,
                    StateName = "初访",
                    TrackPattern = TrackPattern.面谈,
                    TrackDate = studentInfo.CreateTime.AddDays(1),
                    ToDo = "了解客户需求，完成初访登记表！",
                    IsComplete = TrackIsComplete.否,
                    Remark = ""
                };
                SaleTrackParticipants = Enumerable.Empty<SaleTrackParticipantsEntity>();
            }
            return Json(new SaleTrackAjaxViewModel { 
                SaleTrackItem = SaleTrack, 
                SaleTrackParticipant = SaleTrackParticipants 
            }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region CommonInterview
        JsonResult GetCommonInterviewData(Guid id, int TrackNo)
        {
            StudentInfoEntity studentInfo = repository.StudentInfo.FirstOrDefault(s => s.StudentID == id);
            SaleTrackEntity SaleTrack;
            IEnumerable<SaleTrackParticipantsEntity> SaleTrackParticipants = null;
            if (repository.SaleTrack.SingleOrDefault(s => s.StudentID == id && s.TrackNo == TrackNo) != null)
            {
                SaleTrack = repository.SaleTrack.SingleOrDefault(s => s.StudentID == id && s.TrackNo == TrackNo);
                SaleTrackParticipants = repository.SaleTrackParticipants.Where(s => s.SaleTrackID == SaleTrack.TrackItemID).Select(s => s);
            }
            else
            {
                DateTime nextDate = repository.SaleTrack.SingleOrDefault(s => s.StudentID == id && s.TrackNo == TrackNo - 1).TrackDate;
                SaleTrack = new SaleTrackEntity
                {
                    TrackItemID = Guid.NewGuid(),
                    StudentID = id,
                    Inputor = HttpContext.User.Identity.Name,
                    StateName = "第" + TrackNo.ToString() + "次回访",
                    TrackNo = (byte)TrackNo,
                    TrackPattern = TrackPattern.面谈,
                    TrackDate = nextDate.AddDays(1),
                    ToDo = "第" + TrackNo.ToString() + "次回访",
                    IsComplete = TrackIsComplete.否,
                    Remark = "请输入备注信息 "
                };
                SaleTrackParticipants = Enumerable.Empty<SaleTrackParticipantsEntity>();
            }
            return Json(new SaleTrackAjaxViewModel
            {
                SaleTrackItem = SaleTrack,
                SaleTrackParticipant = SaleTrackParticipants
            }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region 辅助函数
        /// <summary>
        /// 检测学生的某个销售进度是否已完成
        /// </summary>
        /// <param name="studentId">学生ID</param>
        /// <param name="trackNo">销售序号</param>
        /// <returns></returns>
        public bool CheckGerFromDone(Guid studentId, int trackNo)
        {
            bool isGetFromDone = false;
            SaleTrackEntity trackItem = repository.SaleTrack.SingleOrDefault(s => s.StudentID == studentId && s.TrackNo == trackNo);
            isGetFromDone = trackItem.IsGetFromDone;
            return isGetFromDone;
        }

        #endregion
    }
}
