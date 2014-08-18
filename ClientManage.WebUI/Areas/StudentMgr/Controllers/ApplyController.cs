﻿using System;
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
    public class ApplyController : Controller
    {
        private IStudentInfoRepository repository;
        public ApplyController(IStudentInfoRepository studentInfoRepository)
        {
            this.repository = studentInfoRepository;
        }



        #region Get Student Stage From DB

        public IEnumerable<StudentApplyStageEntity> GetStudentApplyStageList(string studentID)
        {
            if (!IsGuidStringValid(studentID))
                return null;
            else
                return repository.StudentApplyStage.Where(s => s.StudentID == new Guid(studentID));
        }

        public List<StudentApplyStageWrap> GetStudentApplyStageWrapList(string studentID)
        {
            if (!IsGuidStringValid(studentID))
                return null;

            Guid _StudentId = new Guid(studentID);
            List<StudentApplyStageWrap> resultList = new List<StudentApplyStageWrap>();
            foreach (StudentApplyStageEntity parentStage in repository.StudentApplyStage.Where(s=>s.StudentID == _StudentId && s.StageClass == 1))
            {
                resultList.Add(new StudentApplyStageWrap { 
                    ParentStage = parentStage, 
                    ChildStages = repository.StudentApplyStage
                    .Where(s => s.StudentID == _StudentId && s.ParentNo == parentStage.StageNo)
                    .OrderBy(s=>s.StageNo)
                    .ToList()});
            }

            //这段排序代码尚需检测，如果不通过，就order by 后再 toList() 
            resultList.Sort(
                delegate(StudentApplyStageWrap wrap1, StudentApplyStageWrap wrap2){
                    Type t = typeof(StudentApplyStageWrap);
                    PropertyInfo pro = t.GetProperty("ParentStage.StageNo");
                    return pro.GetValue(wrap1, null).ToString().CompareTo(pro.GetValue(wrap2, null).ToString());
                });
            return resultList;
        }

        #endregion

        /// <summary>
        /// 根据传入的Guid 字符串，判断其是否为空，为null
        /// </summary>
        /// <param name="_id"></param>
        /// <returns></returns>
        private bool IsGuidStringValid(string _id)
        {
            if (_id == null && _id == string.Empty && _id == Guid.Empty.ToString())
                return false;
            else
                return true;
        }
    }
}
