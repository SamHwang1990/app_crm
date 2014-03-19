using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using ClientManage.WebUI.Areas.Admin.Models;
using ClientManage.WebUI.Models;

namespace ClientManage.WebUI.Areas.Admin.Controllers
{
    public class UsersController : Controller
    {
        //
        // GET: /Admin/Users/
        private IUserInfoRepository repository;     //声明存储库
        public int pageSize = 10;                   //定义列表每页量

        public UsersController(IUserInfoRepository userInfoRepository)
        {
            repository = userInfoRepository;
        }

        /// <summary>
        /// 创建
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ViewResult Create()
        {
            return View("Edit",new UserInfoEntity());
        }

        /// <summary>
        /// 编辑
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public ViewResult Edit(Guid id)
        {
            UserInfoEntity user = repository.UsersInfo.FirstOrDefault(u => u.UserID == id);
            return View(user);
        }

        /// <summary>
        /// 处理编辑
        /// </summary>
        /// <param name="userInfo"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult Edit(UserInfoEntity userInfo)
        {
            if (ModelState.IsValid)
            {
                repository.SaveUserInfo(userInfo);
                TempData["message"] = string.Format("{0} has been saved", userInfo.UserNameCn);
                return RedirectToAction("List");
            }
            else
            {
                return View(userInfo);
            }
        }

        /// <summary>
        /// 列表
        /// </summary>
        /// <param name="page"></param>
        /// <returns></returns>
        public ViewResult List(int page = 1)
        {
            UsersInfoViewModel viewModel = new UsersInfoViewModel
            {
                UsersInfo = repository.UsersInfo
                .OrderBy(u => u.UserNameCn)
                .Skip((page - 1) * pageSize)
                .Take(pageSize),
                pagingInfo = new PagingInfo
                {
                    CurrentPage = page,
                    ItemsPerPage = pageSize,
                    TotalItems = repository.UsersInfo.Count()
                }
            };
            return View(viewModel);
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="UserID"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult Delete(Guid UserID)
        {
            UserInfoEntity userInfo = repository.UsersInfo.Where(u => u.UserID == UserID).SingleOrDefault();
            if (userInfo != null)
            {
                repository.DeleteUserInfo(userInfo);
                TempData["message"] = string.Format("{0} was deleted", userInfo.UserNameCn);
            }
            return RedirectToAction("List");
        }

        /// <summary>
        /// 根据ID获取用户名
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public string UserName(Guid id)
        {
            UserInfoEntity userInfo = repository.UsersInfo.Where(u => u.UserID == id).SingleOrDefault();
            return userInfo.UserNameCn;
        }

        /// <summary>
        /// 返回所有用户名及其主次角色
        /// </summary>
        /// <param name="id">当前用户ID</param>
        /// <param name="element">select元素的name属性</param>
        /// <returns></returns>
        [ChildActionOnly]
        public ViewResult UserNameList(Guid id, string element)
        {
            IEnumerable<UserAndRoleViewModel> list = repository.UsersInfo
                .Select(u => 
                    new UserAndRoleViewModel 
                { 
                    UserInfo = u,
                    MainRoleInfo = repository.RolesInfo.FirstOrDefault(r => r.RoleID == u.UserRole),
                    SecondRoleInfo = repository.RolesInfo.FirstOrDefault(r => r.RoleID == u.UserSecondRole) 
                })
                .OrderBy(u=>u.MainRoleInfo.RoleName);
            ViewBag.ElementName = element;
            ViewBag.ID = id;
            return View(list);
        }


    }
}
