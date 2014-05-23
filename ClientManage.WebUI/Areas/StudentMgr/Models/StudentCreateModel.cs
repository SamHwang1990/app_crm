using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using ClientManage.Domain.Entities;
using ClientManage.WebUI.Models;

namespace ClientManage.WebUI.Areas.StudentMgr.Models
{
    public class StudentCreateModel
    {
        public EasyChatTimeModel ContactFather { get; set; }
        public EasyChatTimeModel ContactMother { get; set; }
        public EasyChatTimeModel ContactStudent { get; set; }
        public EasyChatTimeModel ContactOther { get; set; }
        public AppRelationsEntity AppRelation { get; set; }
        public StudentInfoEntity StudentInfo { get; set; }
    }

    public class EasyChatTimeModel
    {
        public IEnumerable<EasyChatTimeEntity> EasyChatTimes { get; set; }
        public ContactIdentity ContactIdentity { get; set; }
    }

    public class ContactIdentity
    {
        public string PersonIdentity { get; set; }	//联系人身份
        public string NameCn { get; set; }	//联系人名字
        public string Mobile { get; set; }		//联系人电话
        public string Email { get; set; }
    }
}