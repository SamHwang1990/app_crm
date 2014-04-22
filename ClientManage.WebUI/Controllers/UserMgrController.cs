using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using ClientManage.WebUI.Areas.StudentMgr.Models;
using ClientManage.WebUI.Models;

namespace ClientManage.WebUI.Controllers
{
    public class UserMgrController : Controller
    {
        private IUserInfoRepository repository;

        public UserMgrController(IUserInfoRepository userRepository)
        {
            repository = userRepository;
        }

        [HttpGet]
        public JsonResult List(string roleIDString)
        {
            Guid roleID = new Guid(roleIDString);
            IEnumerable<UserInfoEntity> userList = repository.UsersInfo.Where(s => s.UserRole == roleID || s.UserSecondRole == roleID);
            Array tempArr = userList.ToArray();
            return Json(userList, JsonRequestBehavior.AllowGet);
        }

    }
}
