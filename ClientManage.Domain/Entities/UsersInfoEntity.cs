using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace ClientManage.Domain.Entities
{
    [Table("UsersInfo")]
    public class UserInfoEntity
    {

        public UserInfoEntity()
        {
            Initialize();
        }

        private void Initialize()
        {
            _LastJobDate = DateTime.Now;
        }

        #region Base Members

        private Guid _UserID;
        private string _UserNameCn;
        private string _UserNameEn;
        private string _UserPass;
        private Guid _UserRole;
        private string _UserRoleName;
        private Guid _UserSecondRole;
        private string _UserSecondRoleName;
        private string _Email;
        private string _Mobile;
        private string _UserRemark;
        private DateTime _LastJobDate;

        /// <summary>
        /// 
        /// </summary>
        [Key]
        [HiddenInput(DisplayValue = false)]
        public Guid UserID
        {
            set{_UserID = value;}
            get{return _UserID;}
        }
        /// <summary>
        /// 
        /// </summary>
        [Required(ErrorMessage="Please enter a user name")]
        public string UserNameCn
        {
            set{_UserNameCn = value;}
            get{return _UserNameCn;}
        }
        /// <summary>
        /// 
        /// </summary>
        public string UserNameEn
        {
            set{_UserNameEn = value;}
            get{return _UserNameEn;}
        }

        /// <summary>
        /// 用户密码
        /// </summary>
        [DataType(DataType.Password)]
        public string UserPass
        {
            set { _UserPass = value; }
            get { return _UserPass; }
        }
        /// <summary>
        /// 
        /// </summary>
        [ScaffoldColumn(false)]      
        public Guid UserRole
        {
            set{_UserRole = value;}
            get{return _UserRole;}
        }

        /// <summary>
        /// 用户主角色名字
        /// </summary>
        public string UserRoleName
        {
            set { _UserRoleName = value; }
            get { return _UserRoleName; }
        }

        /// <summary>
        /// 
        /// </summary>
        [ScaffoldColumn(false)]
        [Required(AllowEmptyStrings=true)]
        public Guid UserSecondRole
        {
            set{_UserSecondRole = value;}
            get{return _UserSecondRole;}
        }

        /// <summary>
        /// 用户辅助角色名
        /// </summary>
        public string UserSecondRoleName
        {
            set { _UserSecondRoleName = value; }
            get { return _UserSecondRoleName; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string Email
        {
            set{_Email = value;}
            get{return _Email;}
        }
        /// <summary>
        /// 
        /// </summary>
        public string Mobile
        {
            set{_Mobile = value;}
            get{return _Mobile;}
        }

        [HiddenInput(DisplayValue=false)]
        [Range(typeof(DateTime), "1970/01/01", "2100/12/12", ErrorMessage = "时间超出范围")]
        public DateTime LastJobDate
        {
            set { _LastJobDate = value; }
            get { return _LastJobDate; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string UserRemark
        {
            set{_UserRemark = value;}
            get{return _UserRemark;}
        }

        public DateTime? CreateTime
        {
            get;
            set;
        }

        public DateTime? LastLoginTime
        {
            get;
            set;
        }

        public bool IsForSaleTrack
        {
            get;
            set;
        }

        public bool IsForApply
        {
            get;
            set;
        }

        public bool IsForEssay
        {
            get;
            set;
        }

        public bool IsForAct
        {
            get;
            set;
        }

        public bool IsForExam
        {
            get;
            set;
        }

        public bool IsForManage
        {
            get;
            set;
        }

        #endregion

    }
}
