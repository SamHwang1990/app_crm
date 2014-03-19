using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ClientManage.Domain.Entities;

namespace ClientManage.Domain.Abstract
{
    public interface IApplyStateRepository
    {
        IQueryable<StudentInfoEntity> StudentsInfo { get; }
        IQueryable<ApplyStateEntity> ApplyStates { get; }
        IQueryable<AssayMaterialEntity> AssayMaterials { get; }

        void SaveApplyState(ApplyStateEntity applyState);
        void DeleteApplyState(Guid studentID);
    }
}
