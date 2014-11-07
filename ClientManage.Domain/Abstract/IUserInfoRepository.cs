using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ClientManage.Domain.Entities;

namespace ClientManage.Domain.Abstract
{
    public interface IUserInfoRepository
    {
        IQueryable<UserInfoEntity> UsersInfo { get; }
        IQueryable<RoleInfo> RolesInfo { get; }
        IQueryable<PermissionPValueEntity> PermissionPValue { get; }
        void SaveUserInfo(UserInfoEntity userInfo);
        void SaveUserList(List<UserInfoEntity> userList);
        void DeleteUserInfo(UserInfoEntity userInfo);

        UserInfoEntity GetUserInfo(string userName);
        PermissionPValueEntity GetUserPermission(string userName);
    }
}
