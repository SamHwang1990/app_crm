using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web;

using ClientManage.WebUI.Models;

namespace ClientManage.WebUI.Infrastructure.Filters
{
    public class CustomAuthAttribute:AuthorizeAttribute
    {

        public CustomAuthAttribute()
        {
            
        }

        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            if (httpContext.User.Identity.Name == string.Empty)
                return false;
            return true;
            //return httpContext.Request.IsAuthenticated &&  base.AuthorizeCore(httpContext);
        }
    }
}