using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using ClientManage.WebUI.Models;

namespace ClientManage.WebUI.Binders
{
    public class UserAccountModelBinder : IModelBinder
    {
        private const string sessionKey = "User";
        public object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            //获取会话中的User
            LoginUser user = (LoginUser)controllerContext.HttpContext.Session[sessionKey];
            if (user != null)
            {
                return user;    //如果有该会话，则返回该User
            }
            else
                return null;    //如果没有该会话，返回null
        }
    }
}