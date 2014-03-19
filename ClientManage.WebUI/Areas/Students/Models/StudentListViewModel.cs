using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using ClientManage.Domain.Entities;
using ClientManage.WebUI.Models;

namespace ClientManage.WebUI.Areas.Students.Models
{
    public class StudentListViewModel
    {
        public IEnumerable<StudentInfoViewModel> StudentsInfo { get; set; }
        public PagingInfo pagingInfo { get; set; }
    }
}