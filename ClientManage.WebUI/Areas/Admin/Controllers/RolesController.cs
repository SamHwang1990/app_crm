using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Text;

using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using ClientManage.WebUI.Areas.Admin.Models;
using ClientManage.WebUI.Models;

namespace ClientManage.WebUI.Areas.Admin.Controllers
{
    public class RolesController : Controller
    {
        //
        // GET: /Admin/Roles/

        private IRoleInfoRepository repository;
        public int PageSize = 10;

        public RolesController(IRoleInfoRepository roleRepository)
        {
            repository = roleRepository;
        }

        //列表动作
        public ViewResult List(int page=1)
        {
            RolesInfoViewModel viewModel = new RolesInfoViewModel
            {
                RolesInfo = repository.RolesInfo
                .OrderBy(p => p.RoleName)
                .Skip((page - 1) * PageSize)
                .Take(PageSize),
                pagingInfo = new PagingInfo
                {
                    CurrentPage = page,
                    ItemsPerPage = PageSize,
                    TotalItems = repository.RolesInfo.Count()
                }
            };

            return View(viewModel);
        }

        [HttpGet]
        public ViewResult Edit(Guid id)
        {
            RoleInfo role = repository.RolesInfo.FirstOrDefault(p => p.RoleID == id);
            return View(role);
        }

        [HttpPost]
        public ActionResult Edit(RoleInfo roleInfo)
        {
            if (ModelState.IsValid)
            {
                repository.SaveRoleInfo(roleInfo);
                TempData["message"] = string.Format("{0} has been saved", roleInfo.RoleName);
                return RedirectToAction("List");
            }
            else
            {
               return View(roleInfo);
            }
            
        }

        [HttpGet]
        public ViewResult Create()
        {
            return View("Edit", new RoleInfo());
        }

        [HttpPost]
        public ActionResult Delete(Guid roleID)
        {
            RoleInfo role = repository.RolesInfo.FirstOrDefault(r => r.RoleID == roleID);
            if (role != null)
            {
                repository.DeleteRoleInfo(role);
                TempData["message"] = string.Format("{0} was deleted", role.RoleName);
            }
            return RedirectToAction("List");
        }

        [ChildActionOnly]
        public ViewResult RoleList(Guid id,string elementName)
        {
            RoleListViewModel roleListViewModel = new RoleListViewModel { CurrentRole = id, RoleList = repository.RolesInfo.ToArray(),ElementName = elementName };
            return View(roleListViewModel);
        }

        public string RoleName(Guid id)
        {
            string roleName = repository.RolesInfo.Where(r => r.RoleID == id).SingleOrDefault().RoleName;
            return roleName;
        }
    }
}
