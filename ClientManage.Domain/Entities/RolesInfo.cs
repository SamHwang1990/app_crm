using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace ClientManage.Domain.Entities
{
    [Table("RolesInfo")]
    public partial class RoleInfo
    {
        #region Base Members

        
        private Guid _RoleID;
        
        [Key]
        [HiddenInput(DisplayValue=false)]
        public Guid RoleID
        {
            set { _RoleID = value; }
            get { return _RoleID; }
        }

        private string _RoleName;
        
        [Required(ErrorMessage="Please enter a role name")]
        public string RoleName
        {
            set { _RoleName = value; }
            get { return _RoleName; }
        }
        private string _RoleEN;
        
        public string RoleEN
        {
            set { _RoleEN = value; }
            get { return _RoleEN; }
        }
        private string _RoleRemark;
        
        [DataType(DataType.MultilineText)]
        public string RoleRemark
        {
            set { _RoleRemark = value; }
            get { return _RoleRemark; }
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
