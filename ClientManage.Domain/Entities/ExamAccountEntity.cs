using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

using ClientManage.Domain.Enum;

namespace ClientManage.Domain.Entities
{
    [Table("ExamAccount")]
    public class ExamAccountEntity
    {        
        
        public ExamAccountEntity()
        {
            SetDefaultValues();
        }
        
        /// <summary>
        /// 设置初始化默认值
        /// </summary>
		private void SetDefaultValues()
		{
            _AccountID = Guid.Empty;
            _StudentID = Guid.Empty;
            _Name = string.Empty;
            _Pass = string.Empty;
            _Passtip = string.Empty;
            _Type = 0;
            _Url = string.Empty;
            _Remark = string.Empty;
		}
        
        
        #region Base Members

        private Guid _AccountID;
        private Guid _StudentID;
        private string _Name;
        private string _Pass;
        private string _Passtip;
        private byte _Type;
        private string _Url;
        private string _Remark;
        
        /// <summary>
        /// 
        /// </summary>
        [Key]
        [HiddenInput(DisplayValue=false)]
        public Guid AccountID
        {
            set{_AccountID = value;}
            get{return _AccountID;}
        }
        /// <summary>
        /// 
        /// </summary>
        public Guid StudentID
        {
            set{_StudentID = value;}
            get{return _StudentID;}
        }
        /// <summary>
        /// 
        /// </summary>
        [Required(ErrorMessage="请输入账户名")]
        public string Name
        {
            set{_Name = value;}
            get{return _Name;}
        }
        /// <summary>
        /// 
        /// </summary>
        [Required(ErrorMessage="请输入账户密码")]
        public string Pass
        {
            set{_Pass = value;}
            get{return _Pass;}
        }
        /// <summary>
        /// 
        /// </summary>
        public string Passtip
        {
            set{_Passtip = value;}
            get{return _Passtip;}
        }
        /// <summary>
        /// 
        /// </summary>
        public ExamType Type
        {
            set{_Type = (byte)value;}
            get{return (ExamType)_Type;}
        }
        /// <summary>
        /// 
        /// </summary>
        public string Url
        {
            set{_Url = value;}
            get{return _Url;}
        }
        /// <summary>
        /// 
        /// </summary>
        [DataType(DataType.MultilineText)]
        public string Remark
        {
            set{_Remark = value;}
            get{return _Remark;}
        }

        #endregion
    }
}
