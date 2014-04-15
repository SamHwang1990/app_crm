﻿using System;
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

        public HomeController(IUserInfoRepository userInfoRepository)
        {
            repository = userInfoRepository;
        }

        [CustomAuth]
        public ViewResult Index()
        {
            return View();
        }

        [HttpGet]
        public ViewResult Login()
        {
            return View();
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
                loginResult = true;
            }


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
                hasCurrentUser = true;
            }
            return Json(new { HasCurrentUser = hasCurrentUser, UserName = userName });
        }

        [CustomAuth]
        [HttpPost]
        public JsonResult About()
        {

            return Json(new { });
        }

        [CustomAuth]
        public RedirectToRouteResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Login");
        }
    }
}
