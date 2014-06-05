using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using ClientManage.Domain.Entities;
using ClientManage.WebUI.Models;
using ClientManage.Domain.Enum;

namespace ClientManage.WebUI.Areas.StudentMgr.Models
{
    //public class SaleTrackListModel
    //{
    //    public IEnumerable<SaleTrackListItemModel> SaleTrackList { get; set; }
    //}

    public class SaleTrackListItemModel
    {
        public StudentInfoEntity StudentInfo { get; set; }
        public AppRelationsEntity AppRelation { get; set; }
        public SaleTrackEntity CurrentSaleTrack { get; set; }
    }
}