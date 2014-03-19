using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using System.Data.Entity;

namespace ClientManage.Domain.Concrete
{
    public class EFUserReposity:IUserInfoRepository
    {
        private EFDbContext context = new EFDbContext();

        public IQueryable<UserInfoEntity> UsersInfo
        {
            get { return context.UsersInfo; }
        }

        public IQueryable<RoleInfo> RolesInfo
        {
            get { return context.RolesInfo; }
        } 

        public void SaveUserInfo(UserInfoEntity userInfo)
        {
            if (userInfo.UserID == Guid.Empty)  //如果传入的Guid全为0，则为添加
            {
                userInfo.UserID = Guid.NewGuid();
            }
            UserInfoEntity originUser = context.UsersInfo.Where(u => u.UserID == userInfo.UserID).SingleOrDefault();  //根据UserID查找到就的UserInfo
            if (originUser == null)
            {
                SetNewUserLastJob(userInfo);
                context.UsersInfo.Add(userInfo);
            }
            else
            {   //传入的Guid有效，则为更新
                context.Entry(originUser).CurrentValues.SetValues(userInfo);
            }
            context.SaveChanges();
        }

        public void DeleteUserInfo(UserInfoEntity userInfo)
        {
            UserInfoEntity originUser = context.UsersInfo.Where(u => u.UserID == userInfo.UserID).SingleOrDefault();  //根据UserID查找到就的UserInfo
            context.UsersInfo.Remove(originUser);
            context.SaveChanges();
        }

        /// <summary>
        /// 设置新的销售的上次出勤时间
        /// </summary>
        /// <param name="newUser"></param>
        /// 该方法有待测试，add by sam, 2014.03.06
        private void SetNewUserLastJob(UserInfoEntity newUser)
        {
            //如果暂时AppRelation中没有添加纪录，或者没有同主角色记录，则把当前用户（即第一个用户）的上次出勤时间设为当前日期
            if (context.AppRelations.Count() == 0 || context.UsersInfo.Where(a => a.UserRole == newUser.UserRole).Select(a => a).Count() == 0)
                newUser.LastJobDate = DateTime.Now;
            else
                //否则，在所有同角色用户中，选择最小的出勤时间，并减去1天
                newUser.LastJobDate = context.UsersInfo.Where(u => u.UserRole == newUser.UserRole).Select(u => u.LastJobDate).Min().AddDays(-1);
        }
    }
}
