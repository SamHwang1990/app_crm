using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ClientManage.Domain.Entities;

namespace ClientManage.Domain.Abstract
{
    public interface ISaleTrackRepository
    {
        IQueryable<StudentInfoEntity> StudentInfo { get; }
        IQueryable<StudentParentEntity> StudentParent { get; }
        IQueryable<AppRelationsEntity> AppRelation { get; }
        IQueryable<SaleTrackEntity> SaleTrack { get; }
        IQueryable<SaleTrackParticipantsEntity> SaleTrackParticipants { get; }
        IQueryable<UserInfoEntity> UserInfo { get; }
        IQueryable<RoleInfo> RoleInfo { get; }
        IQueryable<EasyChatTimeEntity> EasyChatTime { get; }
        IQueryable<StudentTPInfoEntity> StudentTPInfo { get; }
        IQueryable<ExamResultEntity> ExamResult { get; }
        IQueryable<ExamResultGREGMATEntity> ExamResultGREGMAT { get; }
        IQueryable<ExamResultSATSSATEntity> ExamResultSATSSAT { get; }
        IQueryable<ExamResultTFIELTSEntity> ExamResultTFIELTS { get; }
        IQueryable<StudentSourceItemEntity> StudentSourceItem { get; }
        IQueryable<StudentFromEntity> StudentFrom { get; }

        void SaveSaleTrack(SaleTrackEntity saleTrackItem, IEnumerable<SaleTrackParticipantsEntity> saleTrackParticipants);
        void SaveSaleTrack(SaleTrackEntity saleTrackItem);
        void SaveAppRelation(AppRelationsEntity appRelation);

        void SaveExamResult(ExamResultEntity examResult);
        void SaveExamResultTFIELTS(ExamResultTFIELTSEntity tfIELTSDetail);
        void SaveExamResultSATSSAT(ExamResultSATSSATEntity satSSATDetail);
        void SaveExamResultGREGMAT(ExamResultGREGMATEntity greGMATDetail);

    }
}
