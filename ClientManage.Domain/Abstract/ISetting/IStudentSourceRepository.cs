using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ClientManage.Domain.Entities;

namespace ClientManage.Domain.Abstract.ISetting
{
    public interface IStudentSourceRepository
    {
        IQueryable<StudentSourceItemEntity> StudentSource { get; }
        void Save(StudentSourceItemEntity sourceItem);
        void Delete(StudentSourceItemEntity sourceItem);
    }
}
