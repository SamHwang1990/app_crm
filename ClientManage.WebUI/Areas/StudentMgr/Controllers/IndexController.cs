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

        [HttpGet]
        public ActionResult List()
        {
            IEnumerable<StudentInfoViewModel> StudentsInfo = repository.StudentsInfo.Join(repository.AppRelations, s => s.StudentID, a => a.StudentID, (s, a) => new StudentInfoViewModel { StudentInfo = s, AppRelation = a })   //调用Join函数，连结两个集合，返回一个包对象
                .OrderBy(r => r.StudentInfo.NameCn);
            Array students = StudentsInfo.ToArray();
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

            if (ajaxData.ContactStudent != null)
            {
                studentInfo.Mobile = ajaxData.ContactStudent.ContactIdentity.Mobile;
                studentInfo.Email = ajaxData.ContactStudent.ContactIdentity.Email;
            }
            repository.SaveStudentInfo(studentInfo, appRelation);   //保存StudentInfo以及AppRelation信息

            if (ajaxData.ContactStudent != null)
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

            foreach (EasyChatTimeEntity item in contact.EasyChatTimes)
            {
                item.IfParentID = other.ParentID;
                repository.SaveEasyChatTime(item);  //添加EasyChatTime信息
            }
        }
    }
}
