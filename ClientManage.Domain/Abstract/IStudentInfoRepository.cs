using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ClientManage.Domain.Entities;
using ClientManage.Domain.Enum;

namespace ClientManage.Domain.Abstract
{
    public interface IStudentInfoRepository
    {
        IQueryable<StudentInfoEntity> StudentsInfo { get; }
        IQueryable<AppRelationsEntity> AppRelations { get; }
        IQueryable<AssayMaterialEntity> AssayMaterials { get; }
        IQueryable<UserInfoEntity> UsersInfo { get; }
        IQueryable<RoleInfo> RolesInfo { get; }
        IQueryable<EasyChatTimeEntity> EasyChatTime { get; }
        IQueryable<StudentParentEntity> StudentParent { get; }
        IQueryable<StudentFromEntity> StudentFrom { get; }
        IQueryable<SaleTrackEntity> SaleTrack { get; }

        void SaveStudentInfo(StudentInfoEntity studentInfo,AppRelationsEntity appRelation);

        void DeleteStudentInfo(StudentInfoEntity studentInfo);

        #region 对EasyChatTime 进行操作
        void EmptyStudentEasyChatTimes(Guid studentID);
        void EmptyContactEasyChatTimes(Guid contactID);
        void SaveEasyChatTime(EasyChatTimeEntity item);
        #endregion

        #region 对StudentParent 进行操作
        void SaveStudentParent(StudentParentEntity parent);
        void RemoveStudentParent(PersonIdentity personIdentity, Guid studentID);
        #endregion

        #region 对StudentTPInfo 进行操作
        void SaveStudentTPInfo(StudentTPInfoEntity studentTPInfo);
        #endregion

        #region 对ExamResult & ExamResultDetail 进行操作
        void SaveExamResult(ExamResultEntity examResult);
        void SaveExamResultTFIELTS(ExamResultTFIELTSEntity tfIELTSDetail);
        void SaveExamResultSATSSAT(ExamResultSATSSATEntity satSSATDetail);
        void SaveExamResultGREGMAT(ExamResultGREGMATEntity greGMATDetail);
        #endregion

        #region 对StudentFrom 进行操作
        void SaveStudentFrom(IEnumerable<StudentFromEntity> studentFroms,Guid studentID);

        #endregion
    }
}
