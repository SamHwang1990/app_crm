using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ClientManage.Domain.Entities;

namespace ClientManage.Domain.Abstract
{
    public interface IRoleInfoRepository
    {
        IQueryable<RoleInfo> RolesInfo { get;}
        IQueryable<PermissionPValueEntity> PermissionValue { get; }

        #region RoleInfo
        void SaveRoleInfo(RoleInfo roleInfo);

        void DeleteRoleInfo(RoleInfo roleInfo);
        #endregion

        #region Role_PermissionValue
        void SavePermissionValue(PermissionPValueEntity permissionValue);
        #endregion
    }
}
