using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using System.Data.Entity;

namespace ClientManage.Domain.Concrete
{
    public class EFAssayMaterialReposity:IAssayMaterialRepository
    {
        private EFDbContext context = new EFDbContext();

        public IQueryable<AssayMaterialEntity> AssayMaterials
        {
            get { return context.AssayMaterial; }
        }

        public IQueryable<StudentInfoEntity> StudentsInfo
        {
            get { return context.StudentsInfo; }
        }

        #region 保存操作
        public void SaveAssayMaterial(AssayMaterialEntity assayMaterial)
        {
            if (context.AssayMaterial.FirstOrDefault(a => a.StudentID == assayMaterial.StudentID) == null)      //如果没有找到该学生StudentID对应的记录，则添加
                context.AssayMaterial.Add(assayMaterial);
            else        //否则，修改该StudentID对应的记录
            {
                AssayMaterialEntity originAssayMaterialEntity = context.AssayMaterial.FirstOrDefault(a => a.StudentID == assayMaterial.StudentID);
                context.Entry(originAssayMaterialEntity).CurrentValues.SetValues(assayMaterial);
            }

            context.SaveChanges();
        }
        #endregion

        #region 删除操作
        public void DeleteAssayMaterial(AssayMaterialEntity assayMaterial)
        {
            //查找是否有该学生
            AssayMaterialEntity originAssayMaterialEntity = context.AssayMaterial.FirstOrDefault(a => a.StudentID == assayMaterial.StudentID);
            if(originAssayMaterialEntity != null)
                context.AssayMaterial.Remove(originAssayMaterialEntity);
            context.SaveChanges();
        }
        #endregion
    }
}
