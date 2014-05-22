using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using ClientManage.Domain.Enum;
using ClientManage.WebUI.Areas.Students.Models;
using ClientManage.WebUI.Models;

namespace ClientManage.WebUI.Areas.StudentMgr.Controllers
{
    public class IndexController : Controller
    {
        private IStudentInfoRepository repository;

        public IndexController(IStudentInfoRepository studentInfoRepository)
        {
            repository = studentInfoRepository;
        }

        
        public ActionResult List(string sort, string keyword)
        {
            IEnumerable<StudentInfoViewModel> StudentsInfo = null;
            if (sort == "学生")
            {
                StudentsInfo = repository.StudentsInfo
                    .Where(s => s.NameCn == keyword)
                    .Join(repository.AppRelations, s => s.StudentID, a => a.StudentID, (s, a) => new StudentInfoViewModel { StudentInfo = s, AppRelation = a });
            }
            else if (sort == "销售负责人")
            {
                Guid saleConsultantID = repository.UsersInfo.FirstOrDefault(u => u.UserNameCn.Contains(keyword)).UserID;
                StudentsInfo = repository.AppRelations
                    .Where(a => a.SaleConsultant == saleConsultantID)
                    .Join(repository.StudentsInfo, a => a.StudentID, s => s.StudentID, (a, s) => new StudentInfoViewModel { StudentInfo = s, AppRelation = a });
            }
            else
            {
                StudentsInfo = repository.StudentsInfo.Join(repository.AppRelations, s => s.StudentID, a => a.StudentID, (s, a) => new StudentInfoViewModel { AppRelation = a, StudentInfo = s })   //调用Join函数，连结两个集合，返回一个包对象
                    .OrderBy(r => r.StudentInfo.NameCn);
            }
            Array students = StudentsInfo.ToArray();        //用来调试时检测获取StudentsInfo内容之用，只是发布时可删除
            return Json(StudentsInfo, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Create(StudentCreateModel ajaxData)
        {
            StudentInfoEntity studentInfo = ajaxData.StudentInfo;
            studentInfo.StudentID = Guid.NewGuid();

            AppRelationsEntity appRelation = ajaxData.AppRelation;
            appRelation.SignDate = new DateTime(1990, 1, 1);
            appRelation.StudentID = studentInfo.StudentID;
            appRelation.SaleConsultantName = GetUserName(appRelation.SaleConsultant);

            if (ajaxData.ContactStudent != null)
            {
                studentInfo.Mobile = ajaxData.ContactStudent.ContactIdentity.Mobile;
                studentInfo.Email = ajaxData.ContactStudent.ContactIdentity.Email;
            }
            repository.SaveStudentInfo(studentInfo, appRelation);   //保存StudentInfo以及AppRelation信息

            if (ajaxData.ContactStudent != null && ajaxData.ContactStudent.EasyChatTimes != null)
            {
                foreach (EasyChatTimeEntity item in ajaxData.ContactStudent.EasyChatTimes)
                {
                    item.IfStudentID = studentInfo.StudentID;
                    repository.SaveEasyChatTime(item);      //保存方便联系时间
                }
            }

            if (ajaxData.ContactFather != null)
            {
                AddParentAndChattime(ajaxData.ContactFather, studentInfo.StudentID);
            }
            if (ajaxData.ContactMother != null)
            {
                AddParentAndChattime(ajaxData.ContactMother, studentInfo.StudentID);
            }
            if (ajaxData.ContactOther != null)
            {
                AddParentAndChattime(ajaxData.ContactOther, studentInfo.StudentID);
            }

            return Json(new { CreateReslut = true, StudentID = studentInfo.StudentID });
        }

        /// <summary>
        /// 编辑学生基础信息
        /// </summary>
        /// <param name="studentInfo"></param>
        /// <param name="appRelation"></param>
        /// <param name="EasyChatTimes"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult EditStudent(StudentInfoEntity studentInfo, AppRelationsEntity appRelation, IEnumerable<EasyChatTimeEntity> EasyChatTimes)
        {
            bool editResult = true;
            if (studentInfo != null && appRelation != null)
            {
                //保存StudentInfo、AppRelation 信息到数据库中
                repository.SaveStudentInfo(studentInfo, appRelation);

                //删除EasyChatTimes中与学生有关的所有记录
                repository.EmptyStudentEasyChatTimes(studentInfo.StudentID);

                //遍历EasyChatTimes， 并添加到数据库中
                foreach (EasyChatTimeEntity item in EasyChatTimes)
                {
                    repository.SaveEasyChatTime(item);
                }
            }
            else
            {
                editResult = false;
            }
            return Json(new { EditResult = editResult });
        }

        /// <summary>
        /// 添加Parent及其EasyChatTime
        /// </summary>
        /// <param name="contact"></param>
        /// <param name="studentID"></param>
        void AddParentAndChattime(EasyChatTimeModel contact, Guid studentID)
        {
            StudentParentEntity other = new StudentParentEntity
            {
                ParentID = Guid.NewGuid(),
                StudentID = studentID,
                NameCn = contact.ContactIdentity.NameCn,
                Email = contact.ContactIdentity.Email,
                Mobile = contact.ContactIdentity.Mobile,
                PersonIdentity = (PersonIdentity)Enum.Parse(typeof(PersonIdentity), contact.ContactIdentity.PersonIdentity)
            };
            repository.SaveStudentParent(other);    //添加Parent信息

            if (contact.EasyChatTimes != null)
            {
                foreach (EasyChatTimeEntity item in contact.EasyChatTimes)
                {
                    item.IfParentID = other.ParentID;
                    repository.SaveEasyChatTime(item);  //添加EasyChatTime信息
                }
            }
        }

        /// <summary>
        /// 根据用户ID返回用户名
        /// </summary>
        /// <param name="userIDString"></param>
        /// <returns></returns>
        public string GetUserName(Guid? userID)
        {
            var userName = "系统管理员";
            if (userID != Guid.Empty)
            {
                UserInfoEntity user = repository.UsersInfo.FirstOrDefault(u => u.UserID == userID);
                if (user != null)
                {
                    userName = user.UserNameCn;
                }
            }
            return userName;
        }

        //根据学生ID返回StudentInfo和AppRelation
        public JsonResult GetStudentInfoViewModel(string studentID)
        {
            StudentInfoEntity studentInfo = null;
            AppRelationsEntity appRelation = null;
            if (studentID == string.Empty || studentID == Guid.Empty.ToString())
            {
                studentInfo = new StudentInfoEntity();
                appRelation = new AppRelationsEntity { StudentID = studentInfo.StudentID };
            }
            else
            {
                Guid id = new Guid(studentID);
                studentInfo = repository.StudentsInfo.SingleOrDefault(s => s.StudentID == id);
                appRelation = repository.AppRelations.SingleOrDefault(a => a.StudentID == id);
            }
            return Json(new { StudentInfo=studentInfo, AppRelation=appRelation },JsonRequestBehavior.AllowGet);
        }

        //根据联系人ID 返回EasyChatTimeList
        public JsonResult GetEasyChatTimeList(string identity, string contactIDString)
        {
            IEnumerable<EasyChatTimeEntity> list = null;
            if (contactIDString == "" || contactIDString == Guid.Empty.ToString())
            {
                return Json(new { GetResult = false });
            }
            Guid contactID = new Guid(contactIDString);
            if (identity == "学生")
            {
                list = repository.EasyChatTime.Where(e => e.IfStudentID == contactID).Select(e => e);
            }
            else
            {
                list = repository.EasyChatTime.Where(e => e.IfParentID == contactID).Select(e => e);
            }
            Array temp = list.ToArray();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}
