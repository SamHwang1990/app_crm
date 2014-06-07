using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using ClientManage.Domain.Entities;
using ClientManage.WebUI.Models;
using ClientManage.Domain.Enum;

namespace ClientManage.WebUI.Areas.StudentMgr.Models
{
    public class GetFromInterviewModel
    {
        public string trackID { get; set; }
        public int trackNo { get; set; }
        public IsSign isSign { get; set; }
        public DateTime signDate { get; set; }
        public string getFrom { get; set; }
        public string clientMostCare { get; set; }
    }
}