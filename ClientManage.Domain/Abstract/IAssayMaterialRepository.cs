using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ClientManage.Domain.Entities;

namespace ClientManage.Domain.Abstract
{
    public interface IAssayMaterialRepository
    {
        IQueryable<AssayMaterialEntity> AssayMaterials { get; }
        IQueryable<StudentInfoEntity> StudentsInfo { get; }
        void SaveAssayMaterial(AssayMaterialEntity assayMaterial);
        void DeleteAssayMaterial(AssayMaterialEntity assayMaterial);
    }
}
