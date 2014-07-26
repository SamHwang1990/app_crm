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
        IQueryable<ApplyStageVersionDetailEntity> ApplyStageVersionDetail { get; }

        void SaveApplyStageVersion(ApplyStageVersionEntity versionEntity);
        void DeleteApplyStageVersion(Guid versionID);

        void SaveApplyStageVersionDetails(IList<ApplyStageVersionDetailEntity> versionDetails);
        void ClearApplyStageVersionDetail(Guid versionID);
    }
}
