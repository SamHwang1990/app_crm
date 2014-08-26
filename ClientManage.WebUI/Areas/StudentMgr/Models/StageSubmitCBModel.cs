using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using ClientManage.Domain.Entities;
using ClientManage.WebUI.Models;
using ClientManage.Domain.Enum;

namespace ClientManage.WebUI.Areas.StudentMgr.Models
{
    public class StageSubmitCBModel
    {
        public bool SaveResult { get; set; }
        public bool IsParentComplete { get; set; }
        public string NextParentNameEn { get; set; }
        public string NextSiblingNameEn { get; set; }
        public string Msg { get; set; }
        public int Percentage { get; set; }
    }
}