using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using System.Data.Entity;

namespace ClientManage.Domain.Concrete
{
    public class EFRoleReposity:IRoleInfoRepository
    {
        private EFDbContext context = new EFDbContext();
        private const string basicRoleString = "e8d6033a-d2d9-4192-9004-894faac44484";
        private const string saleRoleString = "d1ebd9b7-83b4-402e-bfb3-4a9181f4d9f6";

        public IQueryable<RoleInfo> RolesInfo
        {
            get { return context.RolesInfo; }
        }
        public IQueryable<PermissionPValueEntity> PermissionValue
        {
            get { return context.PermissionValue; }
        }

        #region RoleInfo
        public void SaveRoleInfo(RoleInfo roleInfo)
        {
            if (roleInfo.RoleID == Guid.Empty)  //如果传入的Guid全为0，则为添加一新Guid
                roleInfo.RoleID = Guid.NewGuid();

            RoleInfo originRole = context.RolesInfo.Where(r => r.RoleID == roleInfo.RoleID).SingleOrDefault();

            if (originRole == null)
                context.RolesInfo.Add(roleInfo);
            else
            {   //传入的Guid有效，则为更新
                context.Entry(originRole).CurrentValues.SetValues(roleInfo);
            }
            context.SaveChanges();
        }

        public void DeleteRoleInfo(RoleInfo roleInfo)
        {
            if (roleInfo.RoleID.ToString() == basicRoleString || roleInfo.RoleID.ToString()== saleRoleString)   //当要删除的用户是“基础人员”以及“留学顾问”时，直接返回
                return;

            RoleInfo originRole = context.RolesInfo.Where(r => r.RoleID == roleInfo.RoleID).SingleOrDefault();  //根据RoleID查找到就的RoleInfo
            context.RolesInfo.Remove(originRole);

            //修改符合该角色的User中UserRole信息
            UserInfoEntity newUser;
            IEnumerable<UserInfoEntity> users = context.UsersInfo.Where(u => u.UserRole == roleInfo.RoleID).Select(u => u);
            foreach (UserInfoEntity user in users)
            {
                newUser = user;
                newUser.UserRole = new Guid(basicRoleString);
                context.Entry(user).CurrentValues.SetValues(newUser);
            }

            //修改符合该角色的User中的UserSecondRole信息
            users = context.UsersInfo.Where(u => u.UserSecondRole == roleInfo.RoleID).Select(u => u);
            foreach (UserInfoEntity user in users)
            {
                newUser = user;
                newUser.UserRole = new Guid(basicRoleString);
                context.Entry(user).CurrentValues.SetValues(newUser);
            }

            context.SaveChanges();
        }
        #endregion

        #region Role_PermissionValue
        public void SavePermissionValue(PermissionPValueEntity permissionValue)
        {
            PermissionPValueEntity originValue = context.PermissionValue.FirstOrDefault(p => p.RoleID == permissionValue.RoleID);
            if (originValue == null)
                context.PermissionValue.Add(permissionValue);
            else
                context.Entry(originValue).CurrentValues.SetValues(permissionValue);

            context.SaveChanges();
        }
        #endregion
    }
}
