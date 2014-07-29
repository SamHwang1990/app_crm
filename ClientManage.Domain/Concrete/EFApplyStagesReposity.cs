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

        public IQueryable<ApplyStageVersionDetailEntity> ApplyStageVersionDetail
        {
            get { return context.ApplyStageVersionDetail; }
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

            ApplyStageVersionEntity originVersionEntity = context.ApplyStageVersion
                .SingleOrDefault(a => a.VersionID == versionEntity.VersionID || a.VersionName == versionEntity.VersionName);
            if (originVersionEntity == null)
                context.ApplyStageVersion.Add(versionEntity);
            else
                context.Entry(originVersionEntity).CurrentValues.SetValues(versionEntity);

            context.SaveChanges();
        }

        /// <summary>
        /// 删除版本及其阶段信息
        /// </summary>
        /// <param name="versionID">要删除的阶段ID</param>
        public void DeleteApplyStageVersion(Guid versionID)
        {
            //清空版本的VersionDetail
            ClearApplyStageVersionDetail(versionID);

            context.ApplyStageVersion.Remove(context.ApplyStageVersion.SingleOrDefault(a => a.VersionID == versionID));

            context.SaveChanges();
        }

        public void SaveApplyStageVersionDetails(List<ApplyStageVersionDetailEntity> versionDetails)
        {
            Guid versionID = versionDetails.FirstOrDefault().VersionID;
            if (context.ApplyStageVersionDetail.Count(a => a.VersionID == versionID) > 0)
            {
                ClearApplyStageVersionDetail(versionID);
            }
            context.ApplyStageVersionDetail.AddRange(versionDetails);
            context.SaveChanges();

        }

        /// <summary>
        /// 根据阶段版本ID，清空VersionDetail中的数据
        /// </summary>
        /// <param name="versionID"></param>
        public void ClearApplyStageVersionDetail(Guid versionID)
        {
            context.ApplyStageVersionDetail.RemoveRange(context.ApplyStageVersionDetail.Where(a => a.VersionID == versionID));
        }

        #endregion
    }
}
