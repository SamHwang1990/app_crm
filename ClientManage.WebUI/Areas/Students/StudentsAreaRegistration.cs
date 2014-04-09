using System.Web.Mvc;

namespace ClientManage.WebUI.Areas.Students
{
    public class StudentsAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Students";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            //context.MapRoute(
            //    null,
            //    "",
            //    new { controller = "StudentInfo", action = "List", page = 1 }
            //);

            context.MapRoute(
                "Students_default",
                "Students/{controller}/{action}/{id}",
                new { controller = "StudentInfo", action = "List", id = UrlParameter.Optional }
            );
        }
    }
}
