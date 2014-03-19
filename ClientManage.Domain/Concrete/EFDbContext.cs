using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Entity;
using ClientManage.Domain.Entities;

namespace ClientManage.Domain.Concrete
{
    public class EFDbContext:DbContext
    {
        public DbSet<RoleInfo> RolesInfo { get; set; }
        public DbSet<UserInfoEntity> UsersInfo { get; set; }
        public DbSet<StudentInfoEntity> StudentsInfo { get; set; }
        public DbSet<AppRelationsEntity> AppRelations { get; set; }
        public DbSet<AssayMaterialEntity> AssayMaterial { get; set; }
        public DbSet<ApplyStateEntity> ApplyState { get; set; }
        public DbSet<EducationBackgroundEntity> EducationBackground { get; set; }
        public DbSet<EasyChatTimeEntity> EasyChatTime { get; set; }
        public DbSet<StudentParentEntity> StudentParent { get; set; }
        public DbSet<SaleTrackEntity> SaleTrack { get; set; }
        public DbSet<SaleTrackParticipantsEntity> SaleTrackParticipants { get; set; }
        public DbSet<ExamAccountEntity> ExamAccount { get; set; }
        public DbSet<ExamResultGREGMATEntity> ExamResult_GRE_GMAT { get; set; }   //这些名字可能会出问题
        public DbSet<ExamResultSATSSATEntity> ExamResult_SAT_SSAT { get; set; }
        public DbSet<ExamResultTFIELTSEntity> ExamResult_TF_IELTS { get; set; }
        public DbSet<ExamResultEntity> ExamResult { get; set; }
        public DbSet<StudentFromEntity> StudentFrom { get; set; }
        public DbSet<StudentSourceItemEntity> StudentSourceItem { get; set; }
        public DbSet<StudentTPInfoEntity> StudentTPInfo { get; set; } 

    }
}
