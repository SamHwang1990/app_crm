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

        [HttpPost]
        public JsonResult EditPermission(PermissionPValueEntity ajaxData)
        {
            repository.SavePermissionValue(ajaxData);
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

        /// <summary>
        /// 根据角色ID 返回角色权限表
        /// </summary>
        /// <param name="roleID"></param>
        /// <returns></returns>
        public JsonResult EditPermission(string roleID)
        {
            if (roleID == null || roleID == string.Empty || roleID == Guid.Empty.ToString())
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            PermissionPValueEntity permissionValue = repository.PermissionValue.SingleOrDefault(r => r.RoleID == new Guid(roleID));
            if (permissionValue == null)
            {
                permissionValue = new PermissionPValueEntity { RoleID = new Guid(roleID) };
            }
            return Json(permissionValue, JsonRequestBehavior.AllowGet);
        }
    }
}
