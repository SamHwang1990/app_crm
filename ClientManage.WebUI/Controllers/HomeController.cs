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
            string loginUserMsg = "";
            string loginPassMsg = "";

            if (user != null && user.UserPass == UserPassword)
            {
                FormsAuthentication.SetAuthCookie(UserName, RememberMe);
                loginResult = true;
            }
            else
            {
                loginResult = false;
                loginUserMsg = "用户名不存在";
                loginPassMsg = "用户密码错误";
            }

            return Json(new { result = loginResult, userMsg = loginUserMsg, passMsg=loginPassMsg });
        }


    }
}
