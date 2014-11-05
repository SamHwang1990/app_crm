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
    public class EFPermissionValueReposity:IPermissionValueRepository
    {
        private EFDbContext context = new EFDbContext();

        public IQueryable<PermissionPValueEntity> PermissionValue
        {
            get
            {
                return context.PermissionValue;
            }
        }

        public void Save(PermissionPValueEntity permissionValue)
        {
            PermissionPValueEntity originValue = context.PermissionValue.FirstOrDefault(p => p.RoleID == permissionValue.RoleID);
            if (originValue == null)
                context.PermissionValue.Add(permissionValue);
            else
                context.Entry(originValue).CurrentValues.SetValues(permissionValue);
            
            context.SaveChanges();
        }
    }
}
