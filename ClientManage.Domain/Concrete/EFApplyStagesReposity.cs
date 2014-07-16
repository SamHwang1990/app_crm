using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using System.Data.Entity;

namespace ClientManage.Domain.Concrete
{
    public class EFApplyStagesReposity:IApplyStagesRepository
    {
        private EFDbContext context = new EFDbContext();

        public IQueryable<ApplyStagesEntity> ApplyStages
        {
            get { return context.ApplyStages; }
        }

        public IQueryable<ApplyStageVersionEntity> ApplyStageVersion 
        {
            get { return context.ApplyStageVersion; }
        }

        #region 操作ApplyStageVersio

        /// <summary>
        /// 添加或更新ApplyStageVersion 数据
        /// </summary>
        /// <param name="versionEntity"></param>
        public void SaveApplyStageVersion(ApplyStageVersionEntity versionEntity)
        {
            if (versionEntity.VersionID == Guid.Empty)  //如果传入的Guid全为0，则为添加一新Guid
                versionEntity.VersionID = Guid.NewGuid();

            ApplyStageVersionEntity originVersionEntity = context.ApplyStageVersion.Single(a => a.VersionID == versionEntity.VersionID);
            if (originVersionEntity == null)
                context.ApplyStageVersion.Add(versionEntity);
            else
                context.Entry(originVersionEntity).CurrentValues.SetValues(versionEntity);

            context.SaveChanges();
        }

        #endregion
    }
}
