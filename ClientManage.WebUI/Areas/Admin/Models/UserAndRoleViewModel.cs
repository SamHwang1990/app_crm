using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using ClientManage.Domain.Entities;

namespace ClientManage.WebUI.Areas.Admin.Models
{
    public class UserAndRoleViewModel
    {
        public UserInfoEntity UserInfo { get; set; }
        public RoleInfo MainRoleInfo { get; set; }
        public RoleInfo SecondRoleInfo { get; set; }
    }
}