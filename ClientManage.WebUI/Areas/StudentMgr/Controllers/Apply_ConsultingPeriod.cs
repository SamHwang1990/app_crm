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
            StudentApplyStageEntity newEntity = repository.StudentApplyStage.SingleOrDefault(s => s.StudentID == ajaxData.StudentID && s.StageNo == ajaxData.StageNo);
            if (newEntity == null)
                return Json(new { SaveResult = false, Msg = "学生ID 为空，或不存在指定的阶段" }, JsonRequestBehavior.AllowGet);

            newEntity.EndDate = ajaxData.EndDate;
            newEntity.Remark = ajaxData.Remark;
            newEntity.CurrentOption = ajaxData.CurrentOption;
            newEntity.Percentage = UpdateChildPercentage(newEntity);
            repository.SaveStudentApplyStage(newEntity);

            if(newEntity.Percentage < 100)
                return Json(new { SaveResult = true, Percentage = newEntity.Percentage });

            Dictionary<string, object> returnDict = ChildStageFinishHandler(newEntity);
            returnDict.Add("SaveResult", true);

            return Json(ConvertDictToString(returnDict));
        }

    }
}