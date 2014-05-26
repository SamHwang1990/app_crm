using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using ClientManage.Domain.Entities;
using ClientManage.WebUI.Models;
using ClientManage.Domain.Enum;

namespace ClientManage.WebUI.Areas.StudentMgr.Models
{
    public class SaleTrackAjaxViewModel
    {
        public SaleTrackEntity SaleTrackItem { get; set; }
        public IEnumerable<SaleTrackParticipantsEntity> SaleTrackParticipant { get; set; }
    }
}