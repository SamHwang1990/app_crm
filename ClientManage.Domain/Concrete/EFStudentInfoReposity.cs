using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using System.Data.Entity;

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
        public void SaveStudentFrom(StudentFromEntity studentFrom)
        {
            if (studentFrom.ID == Guid.Empty)
                studentFrom.ID = Guid.NewGuid();
            StudentFromEntity originFrom = context.StudentFrom.SingleOrDefault(s => s.SourceName == studentFrom.SourceName && s.StudentID == studentFrom.StudentID);
            if (originFrom == null)
            {
                context.StudentFrom.Add(studentFrom);
            }
            else
                context.Entry(originFrom).CurrentValues.SetValues(studentFrom);

            context.SaveChanges();
        }

        #endregion
    }
}
