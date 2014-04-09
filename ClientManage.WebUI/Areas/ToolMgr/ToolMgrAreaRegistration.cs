using System.Web.Mvc;

namespace ClientManage.WebUI.Areas.ToolMgr
{
    public class ToolMgrAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "ToolMgr";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "ToolMgr_default",
                "ToolMgr/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
