using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.Mvc;

using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using ClientManage.WebUI.Models;
using ClientManage.WebUI.Infrastructure.Filters;

namespace ClientManage.WebUI.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        private IUserInfoRepository repository;
        private IRoleInfoRepository roleRepository;

        public HomeController(IUserInfoRepository userInfoRepository,IRoleInfoRepository _roleRepository)
        {
            repository = userInfoRepository;
            roleRepository = _roleRepository;
        }

        //[CustomAuth]
        public ViewResult Index()
        {
            return View();
        }

        [HttpGet]
        public ViewResult Login()
        {
            return View();
        }

        public JsonResult GetUserPermission()
        {
            string userName = HttpContext.User.Identity.Name;

            if (userName == string.Empty)
                return Json(false, JsonRequestBehavior.AllowGet);

            UserInfoEntity userInfo = repository.UsersInfo.SingleOrDefault(u => u.UserNameCn == userName);
            PermissionPValueEntity primaryPermission = roleRepository.PermissionValue.FirstOrDefault(p => p.RoleID == userInfo.UserRole);
            PermissionPValueEntity secondPermission = roleRepository.PermissionValue.FirstOrDefault(p => p.RoleID == userInfo.UserSecondRole);

            if (primaryPermission == null)
                primaryPermission = new PermissionPValueEntity { RoleID = userInfo.UserRole };

            if (secondPermission == null)
                secondPermission = new PermissionPValueEntity { RoleID = userInfo.UserSecondRole };

            PermissionPValueEntity resultPermission = new PermissionPValueEntity
            {
                RoleID = userInfo.UserRole,
                IsManage = primaryPermission.IsManage || secondPermission.IsManage,
                IsApplyList = primaryPermission.IsApplyList || secondPermission.IsApplyList,
                IsApplyListAll = primaryPermission.IsApplyListAll || secondPermission.IsApplyListAll,
                IsApplyListEdit = primaryPermission.IsApplyListEdit || secondPermission.IsApplyListEdit,
                IsSaleList = primaryPermission.IsSaleList || secondPermission.IsSaleList,
                IsSaleListAll = primaryPermission.IsSaleListAll || secondPermission.IsSaleListAll,
                IsSaleListEdit = primaryPermission.IsSaleListEdit || secondPermission.IsSaleListEdit,
                IsStudentList = primaryPermission.IsStudentList || secondPermission.IsStudentList,
                IsStudentListAll = primaryPermission.IsStudentListAll || secondPermission.IsStudentListAll,
                IsStudentListEdit = primaryPermission.IsStudentListEdit || secondPermission.IsStudentListEdit
            };
            return Json(resultPermission, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Login(string UserName,string UserPassword,bool RememberMe)
        {
            UserInfoEntity user = repository.GetUserInfo(UserName);
            bool loginResult = false;
            string loginMsg = "";

            if (user == null)
            {
                loginMsg = "用户名不存在";
            }
            else if(user.UserPass != UserPassword)
            {
                loginMsg = "用户密码错误";
            }
            else
            {
                FormsAuthentication.SetAuthCookie(UserName, RememberMe);
                user.LastLoginTime = DateTime.Now;
                repository.SaveUserInfo(user);
                loginResult = true;
            }
            if(loginResult)
                return Json(new { result = loginResult, loginMsg = loginMsg, UserID = user.UserID });
            else
                return Json(new { result = loginResult, loginMsg = loginMsg });
        }

        [HttpPost]
        public JsonResult CheckLogin()
        {
            string userName="";
            bool hasCurrentUser = false;
            if (HttpContext.User.Identity.Name != string.Empty)
            {
                userName = HttpContext.User.Identity.Name;
                Guid userID = repository.UsersInfo.SingleOrDefault(u => u.UserNameCn == userName).UserID;
                hasCurrentUser = true;
                return Json(new { HasCurrentUser = hasCurrentUser, UserName = userName, UserID = userID });
            }
            else
                return Json(new { HasCurrentUser = false });
        }

        //[CustomAuth]
        [HttpPost]
        public JsonResult About()
        {

            return Json(new { });
        }

        //[CustomAuth]
        [HttpPost]
        public JsonResult Logout()
        {
            bool logoutResult = true;
            try 
            { 
                FormsAuthentication.SignOut();
            }
            catch
            {
                logoutResult = false;
            }
            return Json(new {LogOutResult = logoutResult });
        }
    }
}
