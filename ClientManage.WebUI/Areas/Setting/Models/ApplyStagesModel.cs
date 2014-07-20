using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using ClientManage.Domain.Entities;
using ClientManage.Domain.Enum;

namespace ClientManage.WebUI.Areas.Setting.Models
{
    /// <summary>
    /// 打包过的申请阶段
    /// ParentStage为大模块的申请阶段
    /// ChildStages为ParentStage的所有子申请阶段
    /// </summary>
    public class ApplyStageWrap
    {
        public ApplyStagesEntity ParentStage { get; set; }
        public List<ApplyStagesEntity> ChildStages { get; set; }
    }

    public class ApplyStageVersionDetailWrap
    {
        public ApplyStageVersionDetailEntity ParentVersionDetail { get; set; }
        public List<ApplyStageVersionDetailEntity> ChildVersionDetails { get; set; }
    }
}