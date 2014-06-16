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
            Array roles = roleList.ToArray();
            return Json(roleList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Edit(RoleInfo ajaxData)
        {
            repository.SaveRoleInfo(ajaxData);
            return Json(new { SaveResult = true });
        }

        /// <summary>
        /// 根据角色ID返回角色实体
        /// </summary>
        /// <param name="roleID"></param>
        /// <returns></returns>
        public JsonResult Edit(string roleID)
        {
            if (roleID == null || roleID == string.Empty || roleID == Guid.Empty.ToString())
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            RoleInfo roleInfo = repository.RolesInfo.Single(r => r.RoleID == new Guid(roleID));
            return Json(roleInfo, JsonRequestBehavior.AllowGet);
        }
    }
}
