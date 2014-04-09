using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClientManage.WebUI.Models
{
    public class LoginUser
    {
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public bool RememberMe { get; set; }
    }
}