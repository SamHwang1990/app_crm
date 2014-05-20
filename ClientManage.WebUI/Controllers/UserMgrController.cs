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
    public class UserMgrController : Controller
    {
        private IUserInfoRepository repository;

        public UserMgrController(IUserInfoRepository userRepository)
        {
            repository = userRepository;
        }

        [HttpGet]
        public JsonResult List(string roleIDString)
        {
            Guid roleID = new Guid(roleIDString);
            IEnumerable<UserInfoEntity> userList = repository.UsersInfo.Where(s => s.UserRole == roleID || s.UserSecondRole == roleID);
            Array users = userList.ToArray();
            return Json(userList, JsonRequestBehavior.AllowGet);
        }
        
        /// <summary>
        /// 根据用户ID返回用户名
        /// </summary>
        /// <param name="userIDString"></param>
        /// <returns></returns>
        public string GetUserName(string userIDString)
        {
            var userName = "系统管理员";
            if (userIDString != "")
            {
                Guid userID = new Guid(userIDString);
                UserInfoEntity user = repository.UsersInfo.FirstOrDefault(u => u.UserID == userID);
                if (user != null)
                {
                    userName = user.UserNameCn;
                }
            }
            return userName;
        }

        /// <summary>
        /// 根据用户ID返回主要角色ID
        /// </summary>
        /// <param name="ajaxData"></param>
        /// <returns></returns>
        [HttpGet]
        public JsonResult GetRoleID(string ajaxData)
        {
            string roleID = "";
            if (ajaxData!=null && ajaxData != "" && ajaxData != Guid.Empty.ToString())
            {
                roleID = repository.UsersInfo.SingleOrDefault(u => u.UserID.ToString() == ajaxData).UserRole.ToString();
            }
            return Json(new { RoleID = roleID },JsonRequestBehavior.AllowGet);
        }
    }
}
