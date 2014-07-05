using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using ClientManage.Domain.Entities;
using ClientManage.WebUI.Models;
using ClientManage.Domain.Enum;

namespace ClientManage.WebUI.Areas.StudentMgr.Models
{
    public class AssignConsultantData
    {
        public Guid StudentID { get; set; }
        public Guid ApplyConsultant { get; set; }
        public string ApplyConsultantName { get; set; }
        public Guid EssayConsultant { get; set; }
        public string EssayConsultantName { get; set; }
        public Guid ActConsultant { get; set; }
        public string ActConsultantName { get; set; }
        public Guid ExamConsultant { get; set; }
        public string ExamConsultantName { get; set; }
    }
}