using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using ClientManage.WebUI.Areas.StudentMgr.Models;
using ClientManage.WebUI.Models;

namespace ClientManage.WebUI.Controllers
{
    public class RoleMgrController : Controller
    {
        private IRoleInfoRepository repository;

        public RoleMgrController(IRoleInfoRepository roleRepository)
        {
            repository = roleRepository;
        }

        [HttpGet]
        public JsonResult List()
        {
            IEnumerable<RoleInfo> roleList = repository.RolesInfo.Select(r => r);
            Array tempArr = roleList.ToArray();
            return Json(roleList, JsonRequestBehavior.AllowGet);
        }

    }
}
