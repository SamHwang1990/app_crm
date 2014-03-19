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
        void SaveUserInfo(UserInfoEntity userInfo);

        void DeleteUserInfo(UserInfoEntity userInfo);
    }
}
