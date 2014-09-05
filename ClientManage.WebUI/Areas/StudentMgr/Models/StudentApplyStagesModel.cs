using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using ClientManage.Domain.Entities;
using ClientManage.Domain.Enum;

namespace ClientManage.WebUI.Areas.StudentMgr.Models
{
    public class StudentApplyStageWrap
    {
        public StudentApplyStageEntity ParentStage { get; set; }
        public List<StudentApplyStageEntity> ChildStages { get; set; }
    }
}