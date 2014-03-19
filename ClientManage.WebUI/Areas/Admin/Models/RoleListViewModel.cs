using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ClientManage.Domain.Entities;
using ClientManage.WebUI.Models;

namespace ClientManage.WebUI.Areas.Admin.Models
{
    public class RoleListViewModel
    {
        public Guid CurrentRole { get; set; }
        public string ElementName { get; set; }
        public IEnumerable<RoleInfo> RoleList
        {
            get;
            set;
        }
    }
}