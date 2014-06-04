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

        #region FirstInterviewReg 
        /// <summary>
        /// 根据学生ID获取初访数据
        /// </summary>
        /// <param name="studentID">学生ID</param>
        /// <returns></returns>
        public JsonResult GetFirstInterviewRegData(string studentID)
        {
            if (studentID == null || studentID == string.Empty)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            Guid id = new Guid(studentID);
            StudentInfoEntity studentInfo = repository.StudentInfo.SingleOrDefault(s => s.StudentID == id);
            AppRelationsEntity appRelation = repository.AppRelation.SingleOrDefault(a => a.StudentID == id);
            StudentTPInfoEntity studentTP = GetStudentTP(id);
            ExamResultTFIELTSModel tfIELTSModel = GetTFIELTSExamResult(id);
            ExamResultSATSSATModel satSSATModel = GetSATSSATExamResult(id);
            ExamResultEntity sat2Model = GetSAT2ExamResult(id);
            ExamResultGREGMATModel greGmatModel = GetGREGMATExamResult(id);
            ExamResultEntity apModel = GetAPResult(id);
            IEnumerable<StudentSourceItemEntity> studentSourceList = GetStudentSourceList();
            IEnumerable<StudentFromEntity> studentFromList = GetStudentFromList(id);

            FirstInterviewRegModel firstInterviewRegMode = new FirstInterviewRegModel
            {
                StudentInfo = studentInfo,
                AppRelation = appRelation,
                StudentTPInfo = studentTP,
                TFIELTSResult = tfIELTSModel.ExamResult,
                TFIELTSResultDetail = tfIELTSModel.ExamResultDetail,
                SATSSATResult = satSSATModel.ExamResult,
                SATSSATResultDetail = satSSATModel.ExamResultDetail,
                SAT2Result = sat2Model,
                GREGMATResult = greGmatModel.ExamResult,
                GREGMATResultDetail = greGmatModel.ExamResultDetail,
                APResult = apModel,
                StudentSourceList = studentSourceList,
                StudentFromList = studentFromList
            };

            return Json(firstInterviewRegMode, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 根据学生ID返回课程信息TPInfo
        /// </summary>
        /// <param name="studentID"></param>
        /// <returns></returns>
        StudentTPInfoEntity GetStudentTP(Guid studentID)
        {
            StudentTPInfoEntity tpInfo = repository.StudentTPInfo.SingleOrDefault(s => s.StudentID == studentID);
            if (tpInfo == null)
            {
                tpInfo = new StudentTPInfoEntity { StudentID = studentID };
                return tpInfo;
            }
            else
            {
                return tpInfo;
            }
        }

        /// <summary>
        /// 从数据库返回所有StudentSource
        /// </summary>
        /// <returns></returns>
        IEnumerable<StudentSourceItemEntity> GetStudentSourceList()
        {
            IEnumerable<StudentSourceItemEntity> sourceList = repository.StudentSourceItem;
            return sourceList;
        }

        /// <summary>
        /// 从数据库返回该学生所有来源数据
        /// </summary>
        /// <param name="studentID"></param>
        /// <returns></returns>
        IEnumerable<StudentFromEntity> GetStudentFromList(Guid studentID)
        {
            IEnumerable<StudentFromEntity> studentFromList = repository.StudentFrom.Where(s => s.StudentID == studentID);
            return studentFromList;
        }

        ExamResultTFIELTSModel GetTFIELTSExamResult(Guid studentID)
        {
            //从数据库中根据StudentID、ExamDate、ExamType 选择考试条目
            ExamResultEntity examResult = repository.ExamResult
                .FirstOrDefault(e => e.StudentID == studentID && e.IsBeforeSign == true && (e.ExamType == ExamType.TOFEL || e.ExamType == ExamType.IELTS));
            if (examResult == null)
            {
                examResult = new ExamResultEntity
                {
                    ResultID = Guid.NewGuid(),
                    StudentID = studentID,
                    ExamID = Guid.NewGuid(),
                    IsBeforeSign = true,
                    ExamType = ExamType.TOFEL
                };
            }
            ExamResultTFIELTSEntity examResultDetail = repository.ExamResultTFIELTS.SingleOrDefault(e => e.ExamID == examResult.ExamID);
            if (examResultDetail == null)
            {
                examResultDetail = new ExamResultTFIELTSEntity { 
                    ExamID = examResult.ExamID,
                    Total = examResult.Total
                };
            }
            return new ExamResultTFIELTSModel
            {
                ExamResult = examResult,
                ExamResultDetail = examResultDetail
            };
        }

        ExamResultSATSSATModel GetSATSSATExamResult(Guid studentID)
        {
            //从数据库中根据StudentID、ExamDate、ExamType 选择考试条目
            ExamResultEntity examResult = repository.ExamResult
                .FirstOrDefault(e => e.StudentID == studentID && e.IsBeforeSign == true && (e.ExamType == ExamType.SAT || e.ExamType == ExamType.SSAT));
            if (examResult == null)
            {
                examResult = new ExamResultEntity
                {
                    ResultID = Guid.NewGuid(),
                    StudentID = studentID,
                    ExamID = Guid.NewGuid(),
                    IsBeforeSign = true,
                    ExamType = ExamType.SAT
                };
            }
            ExamResultSATSSATEntity examResultDetail = repository.ExamResultSATSSAT.SingleOrDefault(e => e.ExamID == examResult.ExamID);
            if (examResultDetail == null)
            {
                examResultDetail = new ExamResultSATSSATEntity
                {
                    ExamID = examResult.ExamID,
                    Total = examResult.Total
                };
            }
            return new ExamResultSATSSATModel
            {
                ExamResult = examResult,
                ExamResultDetail = examResultDetail
            };
        }

        ExamResultEntity GetSAT2ExamResult(Guid studentID)
        {
            //从数据库中根据StudentID、ExamDate、ExamType 选择考试条目
            ExamResultEntity examResult = repository.ExamResult
                .FirstOrDefault(e => e.StudentID == studentID && e.IsBeforeSign == true && e.ExamType == ExamType.SAT2);
            if (examResult == null)
            {
                examResult = new ExamResultEntity
                {
                    ResultID = Guid.NewGuid(),
                    StudentID = studentID,
                    ExamID = Guid.NewGuid(),
                    IsBeforeSign = true,
                    ExamType = ExamType.SAT2
                };
            }
            return examResult;
        }

        ExamResultGREGMATModel GetGREGMATExamResult(Guid studentID)
        {
            //从数据库中根据StudentID、ExamDate、ExamType 选择考试条目
            ExamResultEntity examResult = repository.ExamResult
                .FirstOrDefault(e => e.StudentID == studentID && e.IsBeforeSign == true && (e.ExamType == ExamType.GMAT || e.ExamType == ExamType.GRE));
            if (examResult == null)
            {
                examResult = new ExamResultEntity
                {
                    ResultID = Guid.NewGuid(),
                    StudentID = studentID,
                    ExamID = Guid.NewGuid(),
                    IsBeforeSign = true,
                    ExamType = ExamType.GRE
                };
            }
            ExamResultGREGMATEntity examResultDetail = repository.ExamResultGREGMAT.SingleOrDefault(e => e.ExamID == examResult.ExamID);
            if (examResultDetail == null)
            {
                examResultDetail = new ExamResultGREGMATEntity
                {
                    ExamID = examResult.ExamID,
                    Total = examResult.Total
                };
            }
            return new ExamResultGREGMATModel
            {
                ExamResult = examResult,
                ExamResultDetail = examResultDetail
            };
        }

        ExamResultEntity GetAPResult(Guid studentID)
        {
            //从数据库中根据StudentID、ExamDate、ExamType 选择考试条目
            ExamResultEntity examResult = repository.ExamResult
                .FirstOrDefault(e => e.StudentID == studentID && e.IsBeforeSign == true && e.ExamType == ExamType.AP);
            if (examResult == null)
            {
                examResult = new ExamResultEntity
                {
                    ResultID = Guid.NewGuid(),
                    StudentID = studentID,
                    ExamID = Guid.NewGuid(),
                    IsBeforeSign = true,
                    ExamType = ExamType.AP
                };
            }
            return examResult;
        }

        #endregion

        [HttpPost]
        public JsonResult PostInterviewData(SaleTrackAjaxViewModel ajaxData)
        {
            bool postResult = true;
            if (ajaxData.SaleTrackItem.StudentID == Guid.Empty)
            {
                postResult = false;
                return Json(postResult);
            }
            if (ajaxData.SaleTrackItem.TrackItemID == Guid.Empty)
                ajaxData.SaleTrackItem.TrackItemID = Guid.NewGuid();

            ajaxData.SaleTrackItem.ParticipantIDs = "";
            if (ajaxData.SaleTrackParticipant != null && ajaxData.SaleTrackParticipant.Count() >0 )
            {
                foreach (SaleTrackParticipantsEntity item in ajaxData.SaleTrackParticipant)
                {
                    item.ParticipantID = Guid.NewGuid();
                    item.SaleTrackID = ajaxData.SaleTrackItem.TrackItemID;
                    ajaxData.SaleTrackItem.ParticipantIDs += (item.ParticipantID.ToString() + ",");
                }
            }
            repository.SaveSaleTrack(ajaxData.SaleTrackItem, ajaxData.SaleTrackParticipant);
            return Json(postResult);
        }

        /// <summary>
        /// 处理Interview GetFrom
        /// </summary>
        /// <param name="id">学生id</param>
        /// <param name="trackID">TrackID</param>
        /// <param name="isSign">是否已签约</param>
        /// <param name="signDate">签约日期</param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult SetGetFromDone(GetFromInterviewModel ajaxData)
        {
            Guid trackId;
            Guid studentID;
            if (ajaxData.trackID == string.Empty || ajaxData.trackID == null)
                return Json(false);

            trackId = new Guid(ajaxData.trackID);
            SaleTrackEntity trackItem = repository.SaleTrack.SingleOrDefault(s => s.TrackItemID == trackId );
            
            studentID = trackItem.StudentID;
            trackItem.IsGetFromDone = true;
            trackItem.GetFromTrack = ajaxData.getFrom;
            repository.SaveSaleTrack(trackItem);

            if (ajaxData.isSign == true)
            {
                AppRelationsEntity appRelation = repository.AppRelation.SingleOrDefault(s => s.StudentID == studentID);
                appRelation.IsSign = IsSign.已签约;
                appRelation.SignDate = ajaxData.signDate;
                appRelation.SignTrackItem = trackId;
                repository.SaveAppRelation(appRelation);
            }

            return Json(true);
        }

        [HttpPost]
        public JsonResult PostFirstInterviewRegInfoForm(FirstInterviewRegModel ajaxData)
        {
            return Json(true);
        }

        [HttpPost]
        public JsonResult PostFirstInterviewRegTPForm(FirstInterviewRegModel ajaxData)
        {
            return Json(true);
        }

        [HttpPost]
        public JsonResult PostFirstInterviewRegFromForm(FirstInterviewRegModel ajaxData)
        {
            return Json(true);
        }

        #region 功能模块响应

        /// <summary>
        /// 执行发送提示邮件
        /// </summary>
        /// <param name="trackItem">SaleTrackItemID</param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult EmailToParticipant(string trackItem)
        {
            
            if (trackItem == null || trackItem == string.Empty )
            {
                return Json(false);
            }

            Guid trackItemId = new Guid(trackItem);
            if(repository.SaleTrack.SingleOrDefault(s => s.TrackItemID == trackItemId) == null)
                return Json(false); 
            bool setResult = SetEmail(trackItemId);
            if (setResult)
                return Json(true);
            else
                return Json(false);
        }

        #region 发送邮件逻辑代码

        private bool SetEmail(Guid trackItemId)
        {
            bool setResult = true;

            //获取EmailConfig
            XDocument emailConfig = XDocument.Load(Server.MapPath(Url.Content("~/Content/xml/EmailConfig.xml")));

            SaleTrackEntity currentTrackItem =
                repository.SaleTrack
                .SingleOrDefault(s => s.TrackItemID == trackItemId);
            Guid studentId = currentTrackItem.StudentID;
            IEnumerable<SaleTrackParticipantsEntity> currentParticipants =
                repository.SaleTrackParticipants
                .Where(s => s.SaleTrackID == trackItemId)
                .Select(s => s);

            //问候语句，从xml处读取，方便随时更改，stringFormat参数化的；{0}：参与人名字，{1}：访谈时间
            //（看来也可以做到管理员管理的内容中，note by sam, 2014.03.16）
            string greetStr = emailConfig.Descendants("EmailGreet").SingleOrDefault().Value;

            #region 邮件正文

            StringBuilder curInterviewContent = new StringBuilder();
            curInterviewContent.Append("<p>&nbsp;</p><p>");
            curInterviewContent.AppendFormat("回访阶段名：{0}，回访日期：{1}",
                currentTrackItem.StateName, currentTrackItem.TrackDate.ToString("yyyy/MM/dd HH:mm"));
            curInterviewContent.Append("<br/>");
            curInterviewContent.Append("回访参与人：");

            int participantCount = currentParticipants.Count();
            foreach (SaleTrackParticipantsEntity participant in currentParticipants)
            {
                curInterviewContent.AppendFormat("{0}（{1}）；", participant.ParticipantName, participant.ParticipantIdentity);
            }
            curInterviewContent.Append("<br/>");
            curInterviewContent.AppendFormat("回访内容：{0}</p>", currentTrackItem.ToDo);

            if (currentTrackItem.TrackNo != 1)
            {
                curInterviewContent.Append("<p>历史回访记录：<br/>");
                IEnumerable<SaleTrackEntity> historyTrackItem =
                    repository.SaleTrack
                    .Where(s => s.TrackNo < currentTrackItem.TrackNo && s.StudentID == studentId)
                    .Select(s => s);
                foreach (SaleTrackEntity trackItem in historyTrackItem)
                {
                    curInterviewContent.AppendFormat("回访阶段名：{0}，回访日期：{1}，获得信息：{2}<br/>",
                        trackItem.StateName, trackItem.TrackDate.ToString("yyyy/MM/dd HH:mm"), trackItem.GetFromTrack);
                }
                curInterviewContent.Append("</p>");
            }

            curInterviewContent.AppendFormat("<p>&nbsp;</p><p>APP邮件提醒助手<br/>{0}</p>", DateTime.Now.ToLongDateString());

            #endregion

            string title = emailConfig.Descendants("EmailTitle").SingleOrDefault().Value;  //邮件标题
            string strHost = emailConfig.Descendants("EmailHost").SingleOrDefault().Value; //邮件smtp服务器
            string strAccount = emailConfig.Descendants("EmailAccount").SingleOrDefault().Value;   //发送方邮箱账号
            string strPwd = emailConfig.Descendants("EmailPwd").SingleOrDefault().Value;   //发送方邮箱密码
            string strFrom = emailConfig.Descendants("EmailFrom").SingleOrDefault().Value;  //发件人邮箱地址

            //bool emailResult = sendMail(strTo1, strTo2, title, content, strHost, strAccount, strPwd, strFrom);
            //return emailResult;

            bool sendResult = true;
            foreach (SaleTrackParticipantsEntity participant in currentParticipants
                .Where(p => p.ParticipantIdentity == SaleParticipantIdentity.顾问助理 || p.ParticipantIdentity == SaleParticipantIdentity.咨询顾问)
                .Select(p => p))
            {
                sendResult = sendMail(participant.ParticipantEmail, title,
                    string.Format(greetStr, participant.ParticipantName, DateTime.Now.ToLongDateString()) + curInterviewContent,
                    strHost, strAccount, strPwd, strFrom);
                if (!sendResult)
                    setResult = false;
                break;
            }
            return setResult;
        }

        static bool sendMail(string emailTo, string emailTitle, string emailContent, string emailHost, string emailAccount, string emailPwd, string emailFrom)
        {
            SmtpClient _smtpClient = new SmtpClient();
            _smtpClient.UseDefaultCredentials = true;
            _smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;//指定电子邮件发送方式
            _smtpClient.Host = emailHost; ;//指定SMTP服务器
            _smtpClient.Credentials = new System.Net.NetworkCredential(emailAccount, emailPwd);//用户名和密码
            

            MailMessage _mailMessage = new MailMessage(emailFrom, emailTo);
            _mailMessage.Subject = emailTitle;//主题
            _mailMessage.Body = emailContent;//内容
            _mailMessage.BodyEncoding = System.Text.Encoding.UTF8;//正文编码
            _mailMessage.IsBodyHtml = true;//设置为HTML格式
            _mailMessage.Priority = MailPriority.Normal;//优先级

            try
            {
                _smtpClient.Send(_mailMessage);
                return true;
            }
            catch
            {
                return false;
            }
        }

        #endregion

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
