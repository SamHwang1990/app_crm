using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Reflection;

using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using ClientManage.Domain.Enum;
using ClientManage.WebUI.Areas.StudentMgr.Models;
using ClientManage.WebUI.Areas.Setting.Models;
using ClientManage.WebUI.Models;

namespace ClientManage.WebUI.Areas.StudentMgr.Controllers
{
    public partial class ApplyController:Controller
    {
        [HttpPost]
        public JsonResult Post_InformationFormsHandout(StudentApplyStageEntity ajaxData)
        {
            return Json(new { SaveResult = true });
        }

    }
}