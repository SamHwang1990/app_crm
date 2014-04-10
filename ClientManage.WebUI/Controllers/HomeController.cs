using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using ClientManage.WebUI.Models;
using ClientManage.WebUI.Infrastructure.Filters;

namespace ClientManage.WebUI.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
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
            return Json(new{ msg="login successfully"});
        }

    }
}
