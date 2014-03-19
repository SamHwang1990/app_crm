using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

using ClientManage.Domain.Entities;
using ClientManage.WebUI.Models;
using ClientManage.Domain.Enum;

namespace ClientManage.WebUI.Areas.Students.Models
{
    public class SaleTrackViewModel
    {
        public StudentInfoEntity StudentInfo { get; set; }
        public SaleTrackEntity SaleTrack { get; set; }
        public IEnumerable<SaleTrackParticipantsEntity> SaleTrackParticipants { get; set; }
        [UIHint("Enum")]
        public SaleParticipantIdentity AdditionalIdentity { get; set; }
    }
}