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
            IEnumerable<UserInfoEntity> userList = null;
            if (roleIDString == null || roleIDString == string.Empty )
                userList = repository.UsersInfo;
            else{
                Guid roleID = new Guid(roleIDString);
                userList = repository.UsersInfo.Where(s => s.UserRole == roleID || s.UserSecondRole == roleID);
            }
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
        /// <param name="userID"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetRoleID(string userID)
        {
            string roleID = "";
            if (userID != null && userID != "" && userID != Guid.Empty.ToString())
            {
                Guid uID = new Guid(userID);
                UserInfoEntity user = repository.UsersInfo.SingleOrDefault(u => u.UserID == uID);
                roleID = user.UserRole.ToString();
            }
            //return Json(new { RoleID = roleID },JsonRequestBehavior.AllowGet);
            return roleID; ;
        }

        /// <summary>
        /// 根据用户ID返回用户信息实体
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        public JsonResult Edit(string userID)
        {
            if (userID == null || userID == string.Empty || userID == Guid.Empty.ToString())
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            UserInfoEntity userInfo = repository.UsersInfo.Single(r => r.UserID == new Guid(userID));
            return Json(userInfo, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Edit(UserInfoEntity ajaxData)
        {
            repository.SaveUserInfo(ajaxData);
            return Json(new { SaveResult = true });
        }
    }
}
