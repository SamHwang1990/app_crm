using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using ClientManage.WebUI.Areas.Students.Models;
using ClientManage.WebUI.Models;

namespace ClientManage.WebUI.Areas.Students.Controllers
{
    public class ApplyInfoController : Controller
    {
        //
        // GET: /Students/ApplyInfo/

        private IAssayMaterialRepository assayReposity; //文书材料收集存储库
        private IApplyStateRepository applyStateReposity; //申请状态存储库

        public ApplyInfoController(IAssayMaterialRepository _assayReposity,IApplyStateRepository _applyStateReposity)
        {
            assayReposity = _assayReposity;
            applyStateReposity = _applyStateReposity;
        }

        public ActionResult BeginApply(Guid id)
        {
            ApplyStateEntity applyStateEntity = applyStateReposity.ApplyStates.FirstOrDefault(a => a.StudentID == id);
            if ( applyStateEntity == null)
            {
                applyStateEntity = new ApplyStateEntity { StudentID = id };
                applyStateReposity.SaveApplyState(applyStateEntity);
                return RedirectToAction("Familiar", new { id = id });
            }
            else
            {
                #region swith to current state
                switch (applyStateEntity.CurrentState)
                {
                    case "Familiar":    //检测了解期
                            return RedirectToAction("Familiar", new { id = applyStateEntity.StudentID });

                    case "Actplan":     //检测活动策划期
                        if (applyStateEntity.IsActplanDone == false &&applyStateEntity.IsFamiliarDone)
                            return RedirectToAction("Actplan", new { id = applyStateEntity.StudentID });
                        else
                            return RedirectToAction("Familiar", new { id = applyStateEntity.StudentID });

                    case "ApplyBegin":  //检测申请初期
                        if (applyStateEntity.IsBeginingDone == false &&applyStateEntity.IsFamiliarDone&&applyStateEntity.IsActplanDone)
                            return RedirectToAction("ApplyBegin", new { id = applyStateEntity.StudentID });
                        else
                            return RedirectToAction("Familiar", new { id = applyStateEntity.StudentID });

                    case "ApplyMiddle": //检测申请中期
                        if (applyStateEntity.IsMiddleDone == false && applyStateEntity.IsBeginingDone && applyStateEntity.IsFamiliarDone && applyStateEntity.IsActplanDone)
                            return RedirectToAction("ApplyMiddle", new { id = applyStateEntity.StudentID });
                        else
                            return RedirectToAction("Familiar", new { id = applyStateEntity.StudentID });

                    case "ApplyLast":   //检测申请后期
                        if (applyStateEntity.IsLateDone == false && applyStateEntity.IsMiddleDone && applyStateEntity.IsBeginingDone && applyStateEntity.IsFamiliarDone && applyStateEntity.IsActplanDone)
                            return RedirectToAction("ApplyLast", new { id = applyStateEntity.StudentID });
                        else
                            return RedirectToAction("Familiar", new { id = applyStateEntity.StudentID });

                    default:
                        return RedirectToAction("Familiar", new { id = applyStateEntity.StudentID });
                }

                #endregion
            }
        }


        /// <summary>
        /// 了解期
        /// </summary>
        /// <id>学生ID</id>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Familiar(Guid id)
        {            
            AssayMaterialEntity assayMaterialEntity = assayReposity.AssayMaterials.FirstOrDefault(a => a.StudentID == id);
            if (assayMaterialEntity == null)
            {
                assayReposity.SaveAssayMaterial(new AssayMaterialEntity { StudentID = id });
                assayMaterialEntity = assayReposity.AssayMaterials.FirstOrDefault(a => a.StudentID == id);
            }
            StudentInfoEntity studentInfo = assayReposity.StudentsInfo.FirstOrDefault(s => s.StudentID == id);
            return View(new StudentAssayMaterialViewModel { AssayMaterial = assayMaterialEntity, StudentInfo = studentInfo });
        }

        [HttpPost]
        public ActionResult Familiar(AssayMaterialEntity assay)
        {
            if (assay.StudentID != Guid.Empty && ModelState.IsValid)
            {
                assayReposity.SaveAssayMaterial(assay);
                return RedirectToAction("Familiar", new { id = assay.StudentID });
            }
            else
                return RedirectToAction("List", "StudentInfo", new { page = 1 });
        }

        /// <summary>
        /// 活动策划期
        /// </summary>
        /// <id>学生ID</id>
        /// <returns></returns>
        public ActionResult Actplan()
        {
            return View();
        }

        /// <summary>
        /// 申请初期
        /// </summary>
        /// <id>学生ID</id>
        /// <returns></returns>
        public ActionResult ApplyBegin()
        {
            return View();
        }

        /// <summary>
        /// 申请中期
        /// </summary>
        /// <id>学生ID</id>
        /// <returns></returns>
        public ActionResult ApplyMiddle()
        {
            return View();
        }

        /// <summary>
        /// 申请后期
        /// </summary>
        /// <id>学生ID</id>
        /// <returns></returns>
        public ActionResult ApplyLast()
        {
            return View();
        }

        /// <summary>
        /// 确认申请流程
        /// </summary>
        /// <param name="id">学生ID</param>
        /// <param name="currentState">当前阶段</param>
        /// <param name="nextState">下一个阶段</param>
        /// <returns></returns>
        public ActionResult ApplyStateConfirm(Guid id, string currentState, string nextState)
        {
            ApplyStateEntity applyState = applyStateReposity.ApplyStates.FirstOrDefault(a => a.StudentID == id);
            if (applyState != null)
            {
                #region Save the ApplyState
                switch (currentState)
                {
                    case "Familiar":
                        applyState.IsFamiliarDone = true;
                        applyState.IsActplanDone = false;
                        applyState.IsBeginingDone = false;
                        applyState.IsMiddleDone = false;
                        applyState.IsLateDone = false;
                        break;
                    case "Actplan":
                        applyState.IsFamiliarDone = true;
                        applyState.IsActplanDone = true;
                        applyState.IsBeginingDone = false;
                        applyState.IsMiddleDone = false;
                        applyState.IsLateDone = false;
                        break;
                    case "ApplyBegin":
                        applyState.IsFamiliarDone = true;
                        applyState.IsActplanDone = true;
                        applyState.IsBeginingDone = true;
                        applyState.IsMiddleDone = false;
                        applyState.IsLateDone = false;
                        break;
                    case "ApplyMiddle":
                        applyState.IsFamiliarDone = true;
                        applyState.IsActplanDone = true;
                        applyState.IsBeginingDone = true;
                        applyState.IsMiddleDone = true;
                        applyState.IsLateDone = false;
                        break;
                    case "ApplyLast":
                        applyState.IsFamiliarDone = true;
                        applyState.IsActplanDone = true;
                        applyState.IsBeginingDone = true;
                        applyState.IsMiddleDone = true;
                        applyState.IsLateDone = false;
                        break;
                    default:
                        break;
                }
                #endregion

                applyState.CurrentState = nextState;    //更新当前状态
                applyStateReposity.SaveApplyState(applyState);  //持久化申请状态到数据库中
                return RedirectToAction(nextState, new { id = id });
            }
            else
            {
                return RedirectToAction("BeginApply", new { id = id });
            }
        }

    }
}
