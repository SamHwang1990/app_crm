using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using ClientManage.Domain.Entities;
using ClientManage.WebUI.Models;
using ClientManage.Domain.Enum;

namespace ClientManage.WebUI.Areas.StudentMgr.Models
{
    public class ExamResultTFIELTSModel
    {
        public ExamResultEntity ExamResult { get; set; }
        public ExamResultTFIELTSEntity ExamResultDetail { get; set; }
    }

    public class ExamResultSATSSATModel
    {
        public ExamResultEntity ExamResult { get; set; }
        public ExamResultSATSSATEntity ExamResultDetail { get; set; }
    }

    public class ExamResultGREGMATModel
    {
        public ExamResultEntity ExamResult { get; set; }
        public ExamResultGREGMATEntity ExamResultDetail { get; set; }
    }
}