using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ClientManage.Domain.Abstract;
using ClientManage.Domain.Abstract.ISetting;
using ClientManage.Domain.Entities;
using System.Data.Entity;

namespace ClientManage.Domain.Concrete.EFSetting
{
    public class EFStudentSourceReposity:IStudentSourceRepository
    {
        private EFDbContext context = new EFDbContext();

        public IQueryable<StudentSourceItemEntity> StudentSource 
        {
            get { return context.StudentSourceItem; }
        }

        public void Save(StudentSourceItemEntity sourceItem)
        {
            StudentSourceItemEntity originSource = context.StudentSourceItem.SingleOrDefault(s => s.SourceName == sourceItem.SourceName);
            if (originSource == null)
                context.StudentSourceItem.Add(sourceItem);
            else
                context.Entry(originSource).CurrentValues.SetValues(sourceItem);

            context.SaveChanges();
        }

        public void Delete(string sourceNameEn)
        {
            context.StudentSourceItem.Remove(context.StudentSourceItem.SingleOrDefault(s => s.SourceNameEn == sourceNameEn));
            context.SaveChanges();
        }
    }
}
