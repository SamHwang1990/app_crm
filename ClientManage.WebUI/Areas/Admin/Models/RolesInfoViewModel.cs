using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ClientManage.Domain.Entities;
using ClientManage.WebUI.Models;

namespace ClientManage.WebUI.Areas.Admin.Models
{
    public class RolesInfoViewModel
    {
        public IEnumerable<RoleInfo> RolesInfo { get; set; }
        public PagingInfo pagingInfo { get; set; }
    }
}