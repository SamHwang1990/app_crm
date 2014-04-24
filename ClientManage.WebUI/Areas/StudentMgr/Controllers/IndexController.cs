using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using ClientManage.WebUI.Areas.StudentMgr.Models;
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

    }
}
