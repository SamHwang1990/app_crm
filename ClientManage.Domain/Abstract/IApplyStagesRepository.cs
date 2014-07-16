using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ClientManage.Domain.Entities;

namespace ClientManage.Domain.Abstract
{
    public interface IApplyStagesRepository
    {
        IQueryable<ApplyStagesEntity> ApplyStages { get; }
        IQueryable<ApplyStageVersionEntity> ApplyStageVersion { get; }

        void SaveApplyStageVersion(ApplyStageVersionEntity versionEntity);
    }
}
