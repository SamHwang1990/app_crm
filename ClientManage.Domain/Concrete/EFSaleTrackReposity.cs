using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using System.Data.Entity;

namespace ClientManage.Domain.Concrete
{
    public class EFSaleTrackReposity:ISaleTrackRepository
    {
        private EFDbContext context = new EFDbContext();

        #region 数据表
        public IQueryable<StudentInfoEntity> StudentInfo 
        {
            get { return context.StudentsInfo; }
        }
        public IQueryable<StudentParentEntity> StudentParent 
        {
            get { return context.StudentParent; }
        }
        public IQueryable<AppRelationsEntity> AppRelation
        {
            get { return context.AppRelations; }
        }
        public IQueryable<SaleTrackEntity> SaleTrack
        {
            get { return context.SaleTrack; }
        }
        public IQueryable<SaleTrackParticipantsEntity> SaleTrackParticipants
        {
            get { return context.SaleTrackParticipants; }
        }

        public IQueryable<UserInfoEntity> UserInfo 
        {
            get { return context.UsersInfo; }
        }

        public IQueryable<RoleInfo> RoleInfo 
        {
            get { return context.RolesInfo; }
        }

        public IQueryable<EasyChatTimeEntity> EasyChatTime 
        {
            get { return context.EasyChatTime; }
        }

        public IQueryable<StudentTPInfoEntity> StudentTPInfo 
        {
            get { return context.StudentTPInfo; }
        }

        public IQueryable<ExamResultEntity> ExamResult 
        {
            get { return context.ExamResult; }
        }

        public IQueryable<ExamResultGREGMATEntity> ExamResultGREGMAT 
        {
            get { return context.ExamResult_GRE_GMAT; }
        }

        public IQueryable<ExamResultSATSSATEntity> ExamResultSATSSAT
        {
            get { return context.ExamResult_SAT_SSAT; }
        }

        public IQueryable<ExamResultTFIELTSEntity> ExamResultTFIELTS
        {
            get { return context.ExamResult_TF_IELTS; }
        }

        public IQueryable<StudentSourceItemEntity> StudentSourceItem
        {
            get { return context.StudentSourceItem; }
        }

        public IQueryable<StudentFromEntity> StudentFrom
        {
            get { return context.StudentFrom; }
        }

        public IQueryable<StudentFlashPointEntity> StudentFlashPoint 
        {
            get { return context.StudentFlashPoint; }
        }

        #endregion

        #region 数据库交互

        public void SaveSaleTrack(SaleTrackEntity saleTrackItem, IEnumerable<SaleTrackParticipantsEntity> saleTrackParticipants)
        {
            SaleTrackEntity originSaleTrackItem = context.SaleTrack.SingleOrDefault(s => s.TrackItemID == saleTrackItem.TrackItemID);
            if (originSaleTrackItem == null)
            {
                int nextTrackNo = context.SaleTrack.Count(s => s.StudentID == saleTrackItem.StudentID) == 0 ? 1 : context.SaleTrack.Where(s => s.StudentID == saleTrackItem.StudentID).Max(s => s.TrackNo)+1;
                saleTrackItem.TrackNo = (byte)nextTrackNo;
                context.SaleTrack.Add(saleTrackItem);
            }
            else
            {
                context.SaleTrackParticipants.RemoveRange(context.SaleTrackParticipants.Where(s => s.SaleTrackID == originSaleTrackItem.TrackItemID).Select(s => s));
                context.Entry(originSaleTrackItem).CurrentValues.SetValues(saleTrackItem);
            }
            if (saleTrackParticipants != null && saleTrackParticipants.Count() > 0)
            {
                context.SaleTrackParticipants.AddRange(saleTrackParticipants);  //添加参与人
            }

            context.SaveChanges();
        }

        public void SaveSaleTrack(SaleTrackEntity saleTrackItem)
        {
            SaleTrackEntity originSaleTrackItem = context.SaleTrack.SingleOrDefault(s => s.TrackItemID == saleTrackItem.TrackItemID);
            if (originSaleTrackItem == null)
            {
                int nextTrackNo = context.SaleTrack.Count(s => s.StudentID == saleTrackItem.StudentID) == 0 ? 1 : context.SaleTrack.Where(s => s.StudentID == saleTrackItem.StudentID).Max(s => s.TrackNo);
                saleTrackItem.TrackNo = (byte)nextTrackNo;
                context.SaleTrack.Add(saleTrackItem);
            }
            else
            {
                context.Entry(originSaleTrackItem).CurrentValues.SetValues(saleTrackItem);
            }

            context.SaveChanges();
        }

        #region 对AppRelation 进行操作
        public void SaveAppRelation(AppRelationsEntity appRelation)
        {
            AppRelationsEntity originRelation = context.AppRelations.Where(r => r.StudentID == appRelation.StudentID).SingleOrDefault();  //根据StudentID查找到就的AppRelation
            if (originRelation == null)  //如果找不到已有Relation，则为添加
            {
                context.AppRelations.Add(appRelation);
            }
            else
            {   //如果已有Student的信息，则为更新
                context.Entry(originRelation).CurrentValues.SetValues(appRelation);
            }
            context.SaveChanges();
        }
        #endregion

        #region 对ExamResult & ExamResultDetail 进行操作

        public void SaveExamResult(ExamResultEntity examResult)
        {
            ExamResultEntity originResult = context.ExamResult.SingleOrDefault(e => e.ResultID == examResult.ResultID);
            if (originResult == null)
            {
                if (examResult.Total > 0)
                {
                    context.ExamResult.Add(examResult);
                }
                else
                {
                    return;
                }
            }
            else
            {
                if (examResult.Total > 0)
                {
                    context.Entry(originResult).CurrentValues.SetValues(examResult);
                }
                else
                {
                    context.ExamResult.Remove(originResult);
                }
            }
            context.SaveChanges();
        }

        public void SaveExamResultTFIELTS(ExamResultTFIELTSEntity tfIELTSDetail)
        {
            ExamResultTFIELTSEntity originDetail = context.ExamResult_TF_IELTS.SingleOrDefault(e => e.ExamID == tfIELTSDetail.ExamID);
            if (originDetail == null)
            {
                if (tfIELTSDetail.Total > 0)
                    context.ExamResult_TF_IELTS.Add(tfIELTSDetail);
                else
                    return;
            }
            else
            {
                if (tfIELTSDetail.Total > 0)
                    context.Entry(originDetail).CurrentValues.SetValues(tfIELTSDetail);
                else
                    context.ExamResult_TF_IELTS.Remove(originDetail);
            }
            context.SaveChanges();
        }

        public void SaveExamResultSATSSAT(ExamResultSATSSATEntity satSSATDetail)
        {
            ExamResultSATSSATEntity originDetail = context.ExamResult_SAT_SSAT.SingleOrDefault(e => e.ExamID == satSSATDetail.ExamID);
            if (originDetail == null)
            {
                if (satSSATDetail.Total > 0)
                    context.ExamResult_SAT_SSAT.Add(satSSATDetail);
                else
                    return;
            }
            else
            {
                if (satSSATDetail.Total > 0)
                    context.Entry(originDetail).CurrentValues.SetValues(satSSATDetail);
                else
                    context.ExamResult_SAT_SSAT.Remove(originDetail);
            }
            context.SaveChanges();
        }

        public void SaveExamResultGREGMAT(ExamResultGREGMATEntity greGMATDetail)
        {
            ExamResultGREGMATEntity originDetail = context.ExamResult_GRE_GMAT.SingleOrDefault(e => e.ExamID == greGMATDetail.ExamID);
            if (originDetail == null)
            {
                if (greGMATDetail.Total > 0)
                    context.ExamResult_GRE_GMAT.Add(greGMATDetail);
                else
                    return;
            }
            else
            {
                if (greGMATDetail.Total > 0)
                    context.Entry(originDetail).CurrentValues.SetValues(greGMATDetail);
                else
                    context.ExamResult_GRE_GMAT.Remove(originDetail);
            }
            context.SaveChanges();
        }


        #endregion

        #region 对StudentFlashPoint 进行操作
        public void SaveStudentFlashPoint(IEnumerable<StudentFlashPointEntity> studentFlashPoints, Guid studentID)
        {
            if (studentFlashPoints == null || studentFlashPoints.Count() == 0)
                return;

            StudentInfoEntity studentInfo = context.StudentsInfo.FirstOrDefault(s => s.StudentID == studentID);
            if (studentInfo == null)
            {
                throw new Exception("当前学生信息不存在");
            }
            else
            {
                context.StudentFlashPoint.RemoveRange(context.StudentFlashPoint.Where(s => s.StudentID == studentInfo.StudentID).Select(s => s));
                foreach (StudentFlashPointEntity flashPointItem in studentFlashPoints)
                {
                    flashPointItem.FlashPointID = Guid.NewGuid();       //重置ID
                    context.StudentFlashPoint.Add(flashPointItem);   
                }
            }

            context.SaveChanges();
        }
        #endregion

        #endregion
    }
}
