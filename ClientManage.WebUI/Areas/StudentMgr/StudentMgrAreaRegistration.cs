using System.Web.Mvc;

namespace ClientManage.WebUI.Areas.StudentMgr
{
    public class StudentMgrAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "StudentMgr";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "StudentMgr_default",
                "StudentMgr/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
