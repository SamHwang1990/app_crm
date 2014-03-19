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
using ClientManage.WebUI.Areas.Students.Models;
using ClientManage.WebUI.Models;

namespace ClientManage.WebUI.Areas.Students.Controllers
{
    public class SaleTrackController : Controller
    {
        private ISaleTrackRepository repository;

        public SaleTrackController(ISaleTrackRepository saleTrackRepository)
        {
            repository = saleTrackRepository;
        }

        /// <summary>
        /// 首页，判断要进入哪个销售阶段
        /// </summary>
        /// <param name="id">学生id</param>
        public RedirectToRouteResult Index(Guid id)
        {
            int itemNum = repository.SaleTrack.Where(s => s.StudentID == id).Count();
            if (itemNum == 0)
            {
                return RedirectToAction("FirstInterview", new { id = id });     //初访
            }
            else
            {
                int trackNo = repository.SaleTrack.Where(s => s.StudentID == id).Max(s => s.TrackNo);
                if (trackNo == 1)
                    return RedirectToAction("FirstInterview", new { id = id });     //初访
                else
                    return RedirectToAction("CommonInterview", new { id = id, TrackNo = trackNo }); //第N次回访Action
            }
        }

        #region 初访部分
        /// <summary>
        /// 响应初访视图渲染
        /// </summary>
        /// <param name="id">学生ID</param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult FirstInterview(Guid id)
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
                        StudentID = id,
                        Inputor = "Admin",
                        StateName = "初访",
                        TrackPattern = TrackPattern.面谈,
                        TrackDate = studentInfo.CreateTime.AddDays(1),
                        ToDo = "了解客户需求，完成初访登记表！",
                        IsComplete = TrackIsComplete.否,
                        Remark = "待创建"
                    };
                SaleTrackParticipants = Enumerable.Empty<SaleTrackParticipantsEntity>();
            }
            return View(new SaleTrackViewModel
                {
                    StudentInfo = studentInfo,
                    SaleTrack = SaleTrack,
                    SaleTrackParticipants = SaleTrackParticipants,
                    AdditionalIdentity = SaleParticipantIdentity.咨询顾问
                });
        }

        /// <summary>
        /// 响应初访通知建立
        /// </summary>
        /// <param name="ajaxData"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult FirstInterview(SaleTrackAjaxViewModel ajaxData)
        {
            if (ajaxData.SaleTrackItem.TrackItemID == Guid.Empty)
                ajaxData.SaleTrackItem.TrackItemID = Guid.NewGuid();
            foreach (SaleTrackParticipantsEntity item in ajaxData.SaleTrackParticipant)
            {
                item.ParticipantID = Guid.NewGuid();
                item.SaleTrackID = ajaxData.SaleTrackItem.TrackItemID;
                ajaxData.SaleTrackItem.ParticipantIDs += (item.ParticipantID.ToString() + ",");
            }
            repository.SaveSaleTrack(ajaxData.SaleTrackItem, ajaxData.SaleTrackParticipant);
            return Json(ajaxData);
        }

        /// <summary>
        /// 渲染初访登记表——学生信息与联系时间
        /// </summary>
        /// <param name="id">学生ID</param>
        /// <returns></returns>
        public ViewResult FirstRegFormInfo(Guid id)
        {
            StudentInfoEntity studentInfo = repository.StudentInfo.SingleOrDefault(s => s.StudentID == id);

            StudentCreateModel regFromInfo = new StudentCreateModel
            {
                StudentInfo = studentInfo,
                AppRelation = repository.AppRelation.SingleOrDefault(a=>a.StudentID == studentInfo.StudentID)
            };

            StudentParentEntity father = repository.StudentParent.SingleOrDefault(s => s.StudentID == id && s.PersonIdentity == PersonIdentity.父亲);
            StudentParentEntity mother = repository.StudentParent.SingleOrDefault(s => s.StudentID == id && s.PersonIdentity == PersonIdentity.母亲);
            StudentParentEntity other = repository.StudentParent.SingleOrDefault(s => s.StudentID == id && s.PersonIdentity == PersonIdentity.其他);

            EasyChatTimeModel contactFather = null;
            EasyChatTimeModel contactMother = null;
            EasyChatTimeModel contactOther = null;
            EasyChatTimeModel contactStudent = null;

            if (studentInfo != null)
            {
                contactStudent = ReturnEasyChatTimeModel(PersonIdentity.学生, studentInfo.NameCn, studentInfo.Email, studentInfo.Mobile, studentInfo.StudentID);
                regFromInfo.ContactStudent = contactStudent;
            }
            if (father != null)
            {
                contactFather = ReturnEasyChatTimeModel(father.PersonIdentity, father.NameCn, father.Email, father.Mobile, father.ParentID);
                regFromInfo.ContactFather = contactFather;
            }
            if (mother != null)
            {
                contactMother = ReturnEasyChatTimeModel(mother.PersonIdentity, mother.NameCn, mother.Email, mother.Mobile, mother.ParentID);
                regFromInfo.ContactMother = contactMother;
            }
            if (other != null)
            {
                contactOther = ReturnEasyChatTimeModel(other.PersonIdentity, other.NameCn, other.Email, other.Mobile, other.ParentID);
                regFromInfo.ContactOther = contactOther;
            }

            return View(regFromInfo);
        }

        /// <summary>
        /// 渲染初访登记表——学生的培训、课程、考试信息
        /// </summary>
        /// <param name="id">学生ID</param>
        /// <returns></returns>
        public ViewResult FirstRegFormTP(string id)
        {
            Guid studentID = new Guid(id);
            StudentInfoEntity studentInfo = repository.StudentInfo.SingleOrDefault(s => s.StudentID == studentID);

            StudentTPInfoEntity studentTPInfo = null;
            if (repository.StudentTPInfo.SingleOrDefault(s => s.StudentID == studentID) != null)
            {
                studentTPInfo = repository.StudentTPInfo.SingleOrDefault(s => s.StudentID == studentID);
            }
            else
                studentTPInfo = new StudentTPInfoEntity();

            ExamResultEntity tfIELTSResult = null;
            if(repository.ExamResult.FirstOrDefault(e=>e.StudentID == studentID && (e.ExamType == ExamType.TOFEL || e.ExamType == ExamType.IELTS)) != null)
                tfIELTSResult = repository.ExamResult.FirstOrDefault(e=>e.StudentID == studentID && (e.ExamType == ExamType.TOFEL || e.ExamType == ExamType.IELTS));
            else
                tfIELTSResult = new ExamResultEntity{ExamType = Domain.Enum.ExamType.TOFEL,StudentID = studentID};

            ExamResultEntity sATSSATResult = null;
            ExamResultSATSSATEntity sATSSATResultDetail = null;
            if (repository.ExamResult.FirstOrDefault(e => e.StudentID == studentID && (e.ExamType == ExamType.SAT || e.ExamType == ExamType.SSAT)) != null)
            {
                sATSSATResult = repository.ExamResult.FirstOrDefault(e => e.StudentID == studentID && (e.ExamType == ExamType.SAT || e.ExamType == ExamType.SSAT));
                if (repository.ExamResultSATSSAT.SingleOrDefault(e => e.ExamID == sATSSATResult.ExamID) != null)
                {
                    sATSSATResultDetail = repository.ExamResultSATSSAT.SingleOrDefault(e => e.ExamID == sATSSATResult.ExamID);
                }
                else
                {
                    sATSSATResultDetail = new ExamResultSATSSATEntity();
                }
            }
            else
            {
                sATSSATResult = new ExamResultEntity { ExamType = Domain.Enum.ExamType.SAT,StudentID = studentID};
                sATSSATResultDetail = new ExamResultSATSSATEntity();
            }

            ExamResultEntity sAT2Result = null;
            if (repository.ExamResult.FirstOrDefault(e => e.StudentID == studentID && e.ExamType == ExamType.SAT2) != null)
            {
                sAT2Result = repository.ExamResult.FirstOrDefault(e => e.StudentID == studentID && e.ExamType == ExamType.SAT2);
            }
            else
                sAT2Result = new ExamResultEntity { ExamType = Domain.Enum.ExamType.SAT2, StudentID = studentID };

            FirstInterviewTPModel tpModel = new FirstInterviewTPModel
            {
                StudentInfo=studentInfo,
                StudentTPInfo = studentTPInfo,
                TFIELTSResult = tfIELTSResult,
                TFIELTSResultDetail = new ExamResultTFIELTSEntity(),
                SATSSATResult = sATSSATResult,
                SATSSATResultDetail = sATSSATResultDetail,
                SAT2Result = sAT2Result
            };
            return View(tpModel);
        }

        /// <summary>
        /// 渲染初访登记表——如何知道APP
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ViewResult FirstRegFormFrom(string id)
        {
            Guid studentID = new Guid(id);
            StudentInfoEntity studentInfo = repository.StudentInfo.SingleOrDefault(s => s.StudentID == studentID);
            ViewBag.StudentInfo = studentInfo;
            return View();
            
        }
        #endregion

        #region 渲染html

        [ChildActionOnly]
        public ViewResult GetUserList()
        {
            IEnumerable<UserAndRoleViewModel> UserList = repository.UserInfo
                .Select(u =>
                    new UserAndRoleViewModel
                    {
                        UserInfo = u,
                        MainRoleInfo = repository.RoleInfo.FirstOrDefault(r => r.RoleID == u.UserRole),
                        SecondRoleInfo = repository.RoleInfo.FirstOrDefault(r => r.RoleID == u.UserSecondRole)
                    })
                .OrderBy(u => u.MainRoleInfo.RoleName);
            return View(UserList);
        }

        /// <summary>
        /// 根据学生ID获取相关联系人信息
        /// </summary>
        /// <param name="id">学生ID</param>
        /// <returns></returns>
        public ViewResult GetContactList(Guid id)
        {
            StudentInfoEntity studentInfo = repository.StudentInfo.FirstOrDefault(s => s.StudentID == id);
            StudentParentEntity fatherInfo = repository.StudentParent.FirstOrDefault(s => s.StudentID == id && s.PersonIdentity == PersonIdentity.父亲);
            StudentParentEntity motherInfo = repository.StudentParent.FirstOrDefault(s => s.StudentID == id && s.PersonIdentity == PersonIdentity.母亲);
            StudentParentEntity otherInfo = repository.StudentParent.FirstOrDefault(s => s.StudentID == id && s.PersonIdentity == PersonIdentity.其他);
            if (fatherInfo != null)
                ViewBag.FatherId = fatherInfo.ParentID;
            if (motherInfo != null)
                ViewBag.MotherId = motherInfo.ParentID;
            if (otherInfo != null)
                ViewBag.OtherId = otherInfo.ParentID;
            ViewBag.StudentId = id;
            return View();
        }

        [HttpPost]
        public JsonResult GetParticipateUser(string userID)
        {
            Guid UserID = new Guid(userID);
            return Json(repository.UserInfo.SingleOrDefault(u=>u.UserID==UserID));
        }

        [HttpPost]
        public JsonResult GetParticipateParent(string parentID)
        {
            Guid ParentID = new Guid(parentID);
            return Json(repository.StudentParent.SingleOrDefault(p => p.ParentID == ParentID));
        }

        [ChildActionOnly]
        public ViewResult GetSourceItem()
        {
            IEnumerable<StudentSourceItemEntity> studentSourceItems = repository.StudentSourceItem.Select(s => s);
            return View(studentSourceItems);
        }

        #endregion

        #region 功能模块响应

        /// <summary>
        /// 执行发送提示邮件
        /// </summary>
        /// <param name="trackItem">SaleTrackItemID</param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult EmailToParticipant(string trackItem)
        {
            Guid trackItemId = new Guid(trackItem);
            if (trackItem == string.Empty || repository.SaleTrack.SingleOrDefault(s => s.TrackItemID == trackItemId) == null)
            {
                return Json(false);
            }
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
            IEnumerable <SaleTrackParticipantsEntity> currentParticipants = 
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
                currentTrackItem.StateName,currentTrackItem.TrackDate.ToString("yyyy/MM/dd HH:mm"));
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
                        trackItem.StateName,trackItem.TrackDate.ToString("yyyy/MM/dd HH:mm"),trackItem.GetFromTrack);
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
                .Where(p=>p.ParticipantIdentity == SaleParticipantIdentity.顾问助理 || p.ParticipantIdentity == SaleParticipantIdentity.咨询顾问)
                .Select(p=>p))
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
            _smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;//指定电子邮件发送方式
            _smtpClient.Host = emailHost; ;//指定SMTP服务器
            _smtpClient.Credentials = new System.Net.NetworkCredential(emailAccount, emailPwd);//用户名和密码

            MailMessage _mailMessage = new MailMessage(emailFrom, emailTo);
            _mailMessage.Subject= emailTitle;//主题
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
        /// 返回EasyChatTimeModel
        /// </summary>
        /// <param name="identity">身份</param>
        /// <param name="nameCn">中文名</param>
        /// <param name="email">邮箱</param>
        /// <param name="mobile">电话</param>
        /// <param name="personId">id</param>
        /// <returns></returns>
        public EasyChatTimeModel ReturnEasyChatTimeModel(PersonIdentity identity, string nameCn, string email, string mobile, Guid personId)
        {
            EasyChatTimeModel returnModel = new EasyChatTimeModel();
            ContactIdentity contact = new ContactIdentity
            {
                PersonIdentity = identity.ToString(),
                NameCn = nameCn,
                Email = email,
                Mobile = mobile
            };
            IEnumerable<EasyChatTimeEntity> easyChatTimes = null;

            if (identity == PersonIdentity.学生)
                easyChatTimes = repository.EasyChatTime.Where(e => e.IfStudentID == personId).Select(e => e);
            else
                easyChatTimes = repository.EasyChatTime.Where(e => e.IfParentID == personId).Select(e => e);

            returnModel.ContactIdentity = contact;
            returnModel.EasyChatTimes = easyChatTimes;
            return returnModel;
        }

        #endregion
    }
}
