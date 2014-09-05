using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using ClientManage.Domain.Abstract;
using ClientManage.Domain.Abstract.ISetting;
using ClientManage.Domain.Entities;
using ClientManage.Domain.Enum;
using ClientManage.WebUI.Models;

namespace ClientManage.WebUI.Areas.Setting.Controllers
{
    public class StudentSourceController : Controller
    {
        private IStudentSourceRepository repository;

        public StudentSourceController(IStudentSourceRepository studentSourceRepository)
        {
            this.repository = studentSourceRepository;
        }

        #region Ajax Get Request

        public JsonResult List()
        {
            return Json(repository.StudentSource.OrderBy(s => s.SourceName), JsonRequestBehavior.AllowGet);
        }

        public JsonResult FindOne(string sourceNameEn)
        {
            if (sourceNameEn == "")
                return Json(new { FindResult = false, Msg = "来源名称不能为空!" });

            StudentSourceItemEntity sourceItem = repository.StudentSource.SingleOrDefault(s => s.SourceNameEn == sourceNameEn);
            if(sourceItem == null)
                return Json(new { FindResult = false, Msg = "找不到符合名称的来源记录!" });

            return Json(sourceItem,JsonRequestBehavior.AllowGet);
        }

        public JsonResult GenerateOne()
        {
            return Json(new StudentSourceItemEntity(), JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Ajax Post Request

        [HttpPost]
        public JsonResult Edit(StudentSourceItemEntity ajaxData)
        {
            if (ajaxData.SourceName == "" || ajaxData.SourceNameEn == "")
                return Json(new { SaveResult = false, Msg = "来源名称不能为空!" });

            repository.Save(ajaxData);
            return Json(new { SaveResult = true, Msg = "保存成功" });
        }

        /// <summary>
        /// HttpPost 删除Version 数据
        /// </summary>
        /// <param name="versionID">版本ID 字符串</param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult SourceDelete(string sourceNameEn)
        {
            if (sourceNameEn == null || sourceNameEn == string.Empty)
            {
                return Json(new { DeleteResult = false });
            }
            repository.Delete(sourceNameEn);
            return Json(new { DeleteResult = true });
        }

        #endregion

    }
}
