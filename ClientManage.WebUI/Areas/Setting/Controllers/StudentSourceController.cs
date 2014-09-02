using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using ClientManage.Domain.Abstract;
using ClientManage.Domain.Abstract.ISetting;
using ClientManage.Domain.Entities;
using ClientManage.Domain.Enum;
using ClientManage.WebUI.Models;

namespace ClientManage.WebUI.Areas.Setting.Controllers
{
    public class StudentSourceController : Controller
    {
        private IStudentSourceRepository repository;

        public StudentSourceController(IStudentSourceRepository studentSourceRepository)
        {
            this.repository = studentSourceRepository;
        }

        #region Ajax Get Request

        public JsonResult List()
        {
            return Json(repository.StudentSource.OrderBy(s => s.SourceName), JsonRequestBehavior.AllowGet);
        }

        #endregion

    }
}
