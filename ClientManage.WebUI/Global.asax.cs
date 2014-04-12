using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

using ClientManage.WebUI.Infrastructure;
using ClientManage.WebUI.Areas.Admin.Controllers;
using ClientManage.WebUI.Binders;
using ClientManage.WebUI.Models;

namespace ClientManage.WebUI
{
    // 注意: 有关启用 IIS6 或 IIS7 经典模式的说明，
    // 请访问 http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            var rootUrl = "";

            routes.MapRoute(
                null,
                rootUrl,
                new { controller = "Home", action = "Index" }
                );
            routes.MapRoute(
                "Login", //登录
                rootUrl+"app-login.html", //app-login.html
                new { controller = "Home", action = "Login" }
            );
            routes.MapRoute(
                "Default", // 路由名称
                rootUrl+"{controller}/{action}/{id}", // 带有参数的 URL
                new {controller = "Home", action = "Index", id = UrlParameter.Optional }// 参数默认值
            );
        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            //ViewEngines.Engines.Clear();
            //ViewEngines.Engines.Add(new ClientManageViewEngine());  //更改视图搜索位置以及视图格式

            RegisterGlobalFilters(GlobalFilters.Filters);
            RegisterRoutes(RouteTable.Routes);

            DependencyResolver.SetResolver(new NinjectDependencyResolver());
            ModelBinders.Binders.Add(typeof(LoginUser), new UserAccountModelBinder());
        }
    }
}