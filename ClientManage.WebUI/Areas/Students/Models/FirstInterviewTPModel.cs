using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using ClientManage.Domain.Entities;
using ClientManage.WebUI.Models;

namespace ClientManage.WebUI.Areas.Students.Models
{
    public class FirstInterviewTPModel
    {
        public StudentInfoEntity StudentInfo { get; set; }
        public StudentTPInfoEntity StudentTPInfo { get; set; }
        public ExamResultEntity TFIELTSResult { get; set; }
        public ExamResultTFIELTSEntity TFIELTSResultDetail { get; set; }
        public ExamResultEntity SATSSATResult { get; set; }
        public ExamResultSATSSATEntity SATSSATResultDetail { get; set; }
        public ExamResultEntity SAT2Result { get; set; }
    }
}