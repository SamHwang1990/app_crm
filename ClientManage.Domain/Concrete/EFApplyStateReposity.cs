using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using System.Data.Entity;

namespace ClientManage.Domain.Concrete
{
    public class EFApplyStateReposity:IApplyStateRepository
    {
        private EFDbContext context = new EFDbContext();

        public IQueryable<StudentInfoEntity> StudentsInfo 
        {
            get { return context.StudentsInfo; }
        }
        public IQueryable<ApplyStateEntity> ApplyStates
        {
            get { return context.ApplyState; }
        }
        public IQueryable<AssayMaterialEntity> AssayMaterials 
        {
            get { return AssayMaterials; }
        }

        public void SaveApplyState(ApplyStateEntity applyState)
        {
            ApplyStateEntity originApplyState = context.ApplyState.FirstOrDefault(a => a.StudentID == applyState.StudentID);
            if (originApplyState == null)
                context.ApplyState.Add(applyState);
            else
            {
                context.Entry(originApplyState).CurrentValues.SetValues(applyState);
            }
            context.SaveChanges();
        }
        public void DeleteApplyState(Guid studentID)
        {
            ApplyStateEntity applyState = context.ApplyState.FirstOrDefault(a => a.StudentID == studentID);
            if (applyState == null)
                context.ApplyState.Remove(applyState);

            context.SaveChanges();
        }
    }
}
