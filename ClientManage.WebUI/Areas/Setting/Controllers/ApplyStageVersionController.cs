using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using ClientManage.Domain.Enum;
//using ClientManage.WebUI.Areas.Setting.Models;
using ClientManage.WebUI.Models;

namespace ClientManage.WebUI.Areas.Setting.Controllers
{
    public class ApplyStageVersionController : Controller
    {
        private IApplyStagesRepository repository;

        public ApplyStageVersionController(IApplyStagesRepository applyStagesRepository)
        {
            repository = applyStagesRepository;
        }

        /// <summary>
        /// 返回Version 列表
        /// </summary>
        /// <returns></returns>
        public JsonResult VersionList()
        {
            IEnumerable<ApplyStageVersionEntity> list = null;
            list = repository.ApplyStageVersion.OrderBy(a => a.SignDateBefore);
            return Json(list,JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 修改Version 信息
        /// </summary>
        /// <param name="ajaxData"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult VersionEdit(ApplyStageVersionEntity ajaxData)
        {
            if (ajaxData.SignDateBefore == null)
                return Json(new { PostResult = false });
            else
            {
                repository.SaveApplyStageVersion(ajaxData);
                return Json(new { });
            }
        }
    }
}
