using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using ClientManage.Domain.Entities;
using ClientManage.WebUI.Models;
using ClientManage.Domain.Enum;

namespace ClientManage.WebUI.Areas.StudentMgr.Models
{
    /// <summary>
    /// APP 初访客户登记表数据模型
    /// </summary>
    public class FirstInterviewRegModel
    {
        public StudentInfoEntity StudentInfo { get; set; }
        public AppRelationsEntity AppRelation { get; set; }
        public StudentTPInfoEntity StudentTPInfo { get; set; }
        public ExamResultEntity TFIELTSResult { get; set; }
        public ExamResultTFIELTSEntity TFIELTSResultDetail { get; set; }
        public ExamResultEntity SATSSATResult { get; set; }
        public ExamResultSATSSATEntity SATSSATResultDetail { get; set; }
        public ExamResultEntity SAT2Result { get; set; }
        public ExamResultEntity GREGMATResult { get; set; }
        public ExamResultGREGMATEntity GREGMATResultDetail { get; set; }
        public ExamResultEntity APResult { get; set; }
        public IEnumerable<StudentSourceItemEntity> StudentSourceList { get; set; }
        public IEnumerable<StudentFromEntity> StudentFromList { get; set; }
        public IEnumerable<StudentFlashPointEntity> StudentFlashPointList { get; set; }
    }
}