using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using ClientManage.Domain.Entities;
using ClientManage.WebUI.Models;


namespace ClientManage.WebUI.Areas.Students.Models
{
    public class StudentInfoViewModel
    {
        public StudentInfoEntity StudentInfo { get; set; }
        public AppRelationsEntity AppRelation { get; set; }
    }
}