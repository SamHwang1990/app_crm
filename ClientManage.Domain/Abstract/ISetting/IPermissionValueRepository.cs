using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ClientManage.Domain.Entities;

namespace ClientManage.Domain.Abstract.ISetting
{
    public interface IPermissionValueRepository
    {
        IQueryable<PermissionPValueEntity> PermissionValue { get; }
        void Save(PermissionPValueEntity permissionValue);
    }
}
