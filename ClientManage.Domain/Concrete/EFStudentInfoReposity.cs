﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Entity;

using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using ClientManage.Domain.Enum;

namespace ClientManage.Domain.Concrete
{
    public class EFStudentInfoReposity:IStudentInfoRepository
    {
        private EFDbContext context = new EFDbContext();

        #region DbSet
        public IQueryable<StudentInfoEntity> StudentsInfo   //表StudentInfo
        { get{return context.StudentsInfo;} }

        public IQueryable<AppRelationsEntity> AppRelations  //表AppRelations
        { get { return context.AppRelations; } }

        public IQueryable<AssayMaterialEntity> AssayMaterials //表AssayMaterial
        { get { return context.AssayMaterial; } }

        public IQueryable<UserInfoEntity> UsersInfo          //表UsersInfo
        {
            get { return context.UsersInfo; }
        }
        public IQueryable<RoleInfo> RolesInfo               //表RolesInfo
        {
            get { return context.RolesInfo; }
        }

        public IQueryable<EasyChatTimeEntity> EasyChatTime  //表EasyChatTime
        {
            get { return context.EasyChatTime; }
        }

        public IQueryable<StudentParentEntity> StudentParent 
        {
            get { return context.StudentParent; }
        }

        public IQueryable<StudentFromEntity> StudentFrom
        {
            get { return context.StudentFrom; }
        }

        public IQueryable<SaleTrackEntity> SaleTrack
        {
            get { return context.SaleTrack; }
        }

        public IQueryable<StudentSchoolEntity> StudentSchool
        {
            get { return context.StudentSchool; }
        }

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

        public IQueryable<StudentApplyStageEntity> StudentApplyStage
        {
            get { return context.StudentApplyStage; }
        }

        #endregion

        #region 保存操作
        public void SaveStudentInfo(StudentInfoEntity studentInfo,AppRelationsEntity appRelation)
        {
            if(studentInfo.StudentID == Guid.Empty) //如果传入的学生ID为空，则创建一个新的GUID
                studentInfo.StudentID = appRelation.StudentID = Guid.NewGuid(); //确保StudentInfo和AppRelation会创建同一个StudentID的对象

            if (context.StudentsInfo.Where(u => u.StudentID == studentInfo.StudentID).SingleOrDefault()==null)  //如果数据库不存在传入的Guid，则为添加新记录，否则修改已有对象
            {
                studentInfo.CreateTime = DateTime.Now;
                context.StudentsInfo.Add(studentInfo);
            }
            else
            {
                StudentInfoEntity originStudent = context.StudentsInfo.Where(u => u.StudentID == studentInfo.StudentID).SingleOrDefault();  //根据StudentID查找到就的StudentInfo
                studentInfo.CreateTime = originStudent.CreateTime;
                context.Entry(originStudent).CurrentValues.SetValues(studentInfo);
            }

            SaveAppRelation(appRelation); //同步添加AppRelation

            context.SaveChanges();
        }
        #endregion

        #region 删除操作
        public void DeleteStudentInfo(StudentInfoEntity studentInfo)
        {
            StudentInfoEntity originStudent = context.StudentsInfo.Where(u => u.StudentID == studentInfo.StudentID).SingleOrDefault();  //根据StudentID查找到就的StudentInfo
            context.StudentsInfo.Remove(originStudent);

            //还有很大段删除操作要进行，因为涉及的数据表很多

            //AppRelation
            AppRelationsEntity appRelation = context.AppRelations.Where(a => a.StudentID == studentInfo.StudentID).SingleOrDefault();
            DeleteAppRelation(appRelation);

            //AssayMaterial
            DeleteAssayMaterial(studentInfo.StudentID);

            context.SaveChanges();
        }
        #endregion

        #region 对AppRelation 进行操作
        void SaveAppRelation(AppRelationsEntity appRelation)
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
        }

        public void DeleteAppRelation(AppRelationsEntity appRelation)
        {
            AppRelationsEntity originRelation = context.AppRelations.Where(u => u.StudentID == appRelation.StudentID).SingleOrDefault();  //根据StudentID查找到就的AppRelation
            context.AppRelations.Remove(originRelation);
        }

        #endregion

        #region 对AssayMaterial 进行操作
        public void DeleteAssayMaterial(Guid id)
        {
            //查找是否有该学生
            AssayMaterialEntity originAssayMaterialEntity = context.AssayMaterial.FirstOrDefault(a => a.StudentID == id);
            if (originAssayMaterialEntity != null)
                context.AssayMaterial.Remove(originAssayMaterialEntity);
        }
        #endregion

        #region 对EasyChatTime 进行操作

        public void EmptyStudentEasyChatTimes(Guid studentID)
        {
            context.EasyChatTime.RemoveRange(context.EasyChatTime.Where(e => e.IfStudentID == studentID));
            context.SaveChanges();
        }

        public void EmptyContactEasyChatTimes(Guid contactID)
        {
            context.EasyChatTime.RemoveRange(context.EasyChatTime.Where(e => e.IfParentID == contactID));
            context.SaveChanges();
        }

        public void SaveEasyChatTime(EasyChatTimeEntity item)
        {
            if (item.ItemID == Guid.Empty)
                item.ItemID = Guid.NewGuid();

            if (context.EasyChatTime.SingleOrDefault(e => e.ItemID == item.ItemID) == null)
                context.EasyChatTime.Add(item);
            else
            {
                EasyChatTimeEntity originItem = context.EasyChatTime.SingleOrDefault(e => e.ItemID == item.ItemID);
                context.Entry(originItem).CurrentValues.SetValues(item);
            }

            context.SaveChanges();
        }

        #endregion

        #region 对StudentParent 进行操作
        public void SaveStudentParent(StudentParentEntity parent)
        {
            if (parent.ParentID == Guid.Empty)
                parent.ParentID = Guid.NewGuid();

            if (context.StudentParent.SingleOrDefault(s => s.ParentID == parent.ParentID) == null)
                context.StudentParent.Add(parent);
            else
            {
                StudentParentEntity originParent = context.StudentParent.SingleOrDefault(s => s.ParentID == parent.ParentID);
                context.Entry(originParent).CurrentValues.SetValues(parent);
            }
            context.SaveChanges();
            
        }

        public void RemoveStudentParent(PersonIdentity personIdentity, Guid studentID)
        {
            
            StudentParentEntity originEntity = context.StudentParent
                .FirstOrDefault(s => s.StudentID == studentID && s.PersonIdentity == personIdentity);
            context.StudentParent.Remove(originEntity);
            EmptyContactEasyChatTimes(originEntity.ParentID);

            context.SaveChanges();
        }

        #endregion

        #region 对StudentTPInfo 进行操作
        public void SaveStudentTPInfo(StudentTPInfoEntity studentTPInfo)
        {
            if (studentTPInfo.StudentID == Guid.Empty || context.StudentsInfo.SingleOrDefault(s=>s.StudentID == studentTPInfo.StudentID) == null)
            {
                throw new Exception("不存在相关联的学生，StudentID为空或无该ID");
            }
            StudentTPInfoEntity originTPInfo = context.StudentTPInfo.SingleOrDefault(s => s.StudentID == studentTPInfo.StudentID);
            if (originTPInfo == null)
            {
                context.StudentTPInfo.Add(studentTPInfo);
            }
            else
            {
                context.Entry(originTPInfo).CurrentValues.SetValues(studentTPInfo);
            }
            context.SaveChanges();
        }
        #endregion

        #region 对ExamResult & ExamResultDetail 进行操作
        public void SaveExamResult(ExamResultEntity examResult)
        {
            if (examResult.ResultID == Guid.Empty)
                examResult.ResultID = Guid.NewGuid();
            ExamResultEntity originResult = context.ExamResult.SingleOrDefault(e => e.ResultID == examResult.ResultID);
            if (originResult == null)
            {
                context.ExamResult.Add(examResult);
            }
            else
            {
                context.Entry(originResult).CurrentValues.SetValues(examResult);
            }
            context.SaveChanges();
        }
        public void SaveExamResultTFIELTS(ExamResultTFIELTSEntity tfIELTSDetail)
        {
            if (tfIELTSDetail.ExamID == Guid.Empty)
                tfIELTSDetail.ExamID = Guid.NewGuid();
            ExamResultTFIELTSEntity originDetail = context.ExamResult_TF_IELTS.SingleOrDefault(e => e.ExamID == tfIELTSDetail.ExamID);
            if (originDetail == null)
            {
                context.ExamResult_TF_IELTS.Add(tfIELTSDetail);
            }
            else
            {
                context.Entry(originDetail).CurrentValues.SetValues(tfIELTSDetail);
            }
            context.SaveChanges();
        }
        public void SaveExamResultSATSSAT(ExamResultSATSSATEntity satSSATDetail)
        {
            if (satSSATDetail.ExamID == Guid.Empty)
                satSSATDetail.ExamID = Guid.NewGuid();
            ExamResultSATSSATEntity originDetail = context.ExamResult_SAT_SSAT.SingleOrDefault(e => e.ExamID == satSSATDetail.ExamID);
            if (originDetail == null)
            {
                context.ExamResult_SAT_SSAT.Add(satSSATDetail);
            }
            else
            {
                context.Entry(originDetail).CurrentValues.SetValues(satSSATDetail);
            }
            context.SaveChanges();
        }
        public void SaveExamResultGREGMAT(ExamResultGREGMATEntity greGMATDetail)
        {
            if (greGMATDetail.ExamID == Guid.Empty)
                greGMATDetail.ExamID = Guid.NewGuid();
            ExamResultGREGMATEntity originDetail = context.ExamResult_GRE_GMAT.SingleOrDefault(e => e.ExamID == greGMATDetail.ExamID);
            if (originDetail == null)
            {
                context.ExamResult_GRE_GMAT.Add(greGMATDetail);
            }
            else
            {
                context.Entry(originDetail).CurrentValues.SetValues(greGMATDetail);
            }
            context.SaveChanges();
        }
        #endregion

        #region 对StudentFrom 进行操作
        public void SaveStudentFrom(IEnumerable<StudentFromEntity> studentFroms,Guid studentID)
        {
            StudentInfoEntity studentInfo = context.StudentsInfo.FirstOrDefault(s => s.StudentID == studentID);
            if (studentInfo == null)
            {
                throw new Exception("当前学生信息不存在");
            }
            if (studentFroms == null || studentFroms.Count() == 0)
            {
                context.StudentFrom.RemoveRange(context.StudentFrom.Where(s => s.StudentID == studentInfo.StudentID).Select(s => s));
            }
            else
            {
                context.StudentFrom.RemoveRange(context.StudentFrom.Where(s => s.StudentID == studentInfo.StudentID).Select(s => s));
                foreach (StudentFromEntity fromItem in studentFroms)
                {
                    fromItem.ID = Guid.NewGuid();       //重置ID
                    context.StudentFrom.Add(fromItem);
                }
            }

            context.SaveChanges();
        }

        #endregion

        #region 对StudentApplyStage 进行操作

        /// <summary>
        /// 清空数据库中与指定学生有关的申请阶段，并添加新的申请阶段数据
        /// </summary>
        /// <param name="applyStages"></param>
        public void NewStudentApplyStages(List<StudentApplyStageEntity> applyStages)
        {
            Guid studentID = applyStages.FirstOrDefault().StudentID;
            if (context.StudentApplyStage.Count(a => a.StudentID == studentID) > 0)
            {
                ClearStudentApplyStage(studentID);
            }
            context.StudentApplyStage.AddRange(applyStages);
            context.SaveChanges();
        }

        /// <summary>
        /// 用于部分数据更新
        /// </summary>
        /// <param name="applyStages"></param>
        public void UpdateStudentApplyStages(List<StudentApplyStageEntity> applyStages)
        {
            foreach (StudentApplyStageEntity stageItem in applyStages)
            {
                context.Entry(context.StudentApplyStage.SingleOrDefault(s => s.StudentID == stageItem.StudentID && s.StageNo == stageItem.StageNo))
                    .CurrentValues
                    .SetValues(stageItem);
            }
            context.SaveChanges();
        }

        /// <summary>
        /// 更新一条数据
        /// </summary>
        /// <param name="applyStage"></param>
        public void SaveStudentApplyStage(StudentApplyStageEntity applyStage)
        {
            StudentApplyStageEntity originEntity = context.StudentApplyStage.SingleOrDefault(s => s.StudentID == applyStage.StudentID && s.StageNo == applyStage.StageNo);
            context.Entry(originEntity).CurrentValues.SetValues(applyStage);
            context.SaveChanges();
        }

        public void ClearStudentApplyStage(Guid studentID)
        {
            context.StudentApplyStage.RemoveRange(context.StudentApplyStage.Where(a => a.StudentID == studentID));
        }

        #endregion
    }
}
