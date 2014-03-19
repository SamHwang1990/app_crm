using System.Web.Mvc;

namespace ClientManage.WebUI.Areas.Admin
{
    public class AdminAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Admin";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                null,
                "Admin/{controller}/List/Page{page}",
                new { controller = "Users", action = "List", page = UrlParameter.Optional }
            );

            context.MapRoute(
                "Admin_default",
                "Admin/{controller}/{action}/{id}",
                new {controller="Users",action = "List", id = UrlParameter.Optional }
            );
        }
    }
}
