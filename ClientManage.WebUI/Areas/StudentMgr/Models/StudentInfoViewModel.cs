using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using ClientManage.Domain.Entities;

namespace ClientManage.WebUI.Areas.StudentMgr.Models
{
    public class StudentInfoViewModel
    {
        public StudentInfoEntity StudentInfo { get; set; }
        public AppRelationsEntity AppRelation { get; set; }
    }
}