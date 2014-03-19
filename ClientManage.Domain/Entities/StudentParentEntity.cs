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
    [Table("StudentParent")]
    public class StudentParentEntity
    {        
        
        public StudentParentEntity()
        {
            SetDefaultValues();
        }
        
        /// <summary>
        /// 设置初始化默认值
        /// </summary>
		private void SetDefaultValues()
		{
            _ParentID = Guid.Empty;
            _StudentID = Guid.Empty;
            _PersonIdentity = 0;
            _NameCn = string.Empty;
            _NamePinyin = string.Empty;
            _Birthday = DateTime.Now;
            _DeadDate = new DateTime(1900,1,1);
            _Address = string.Empty;
            _Zip = string.Empty;
            _Email = string.Empty;
            _Mobile = string.Empty;
            _Job = string.Empty;
            _MonthIncome = 0;
            _YearIncome = 0;
            _CompanyName = string.Empty;
            _CompanyAddress = string.Empty;
            _Position = string.Empty;
            _EducationIDs = string.Empty;
            _ParentMarital = 0;
		}
        
        
        #region Base Members

        private Guid _ParentID;
        private Guid _StudentID;
        private byte _PersonIdentity;
        private string _NameCn;
        private string _NamePinyin;
        private DateTime _Birthday;
        private DateTime _DeadDate;
        private string _Address;
        private string _Zip;
        private string _Email;
        private string _Mobile;
        private string _Job;
        private decimal _MonthIncome;
        private decimal _YearIncome;
        private string _CompanyName;
        private string _CompanyAddress;
        private string _Position;
        private string _EducationIDs;
        private byte _ParentMarital;
        
        /// <summary>
        /// 
        /// </summary>
        [Key]
        [HiddenInput(DisplayValue = false)]
        public Guid ParentID
        {
            set{_ParentID = value;}
            get{return _ParentID;}
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
        /// 0-父亲;1-母亲
        /// </summary>
        [UIHint("Enum")]
        public PersonIdentity PersonIdentity
        {
            set{_PersonIdentity = (byte)value;}
            get{return (PersonIdentity)_PersonIdentity;}
        }
        /// <summary>
        /// 
        /// </summary>
        public string NameCn
        {
            set{_NameCn = value;}
            get{return _NameCn;}
        }
        /// <summary>
        /// 
        /// </summary>
        public string NamePinyin
        {
            set{_NamePinyin = value;}
            get{return _NamePinyin;}
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime Birthday
        {
            set{_Birthday = value;}
            get{return _Birthday;}
        }
        /// <summary>
        /// 
        /// </summary>
        [HiddenInput(DisplayValue = false)]
        public DateTime DeadDate
        {
            set{_DeadDate = value;}
            get{return _DeadDate;}
        }
        /// <summary>
        /// 
        /// </summary>
        public string Address
        {
            set{_Address = value;}
            get{return _Address;}
        }
        /// <summary>
        /// 
        /// </summary>
        public string Zip
        {
            set{_Zip = value;}
            get{return _Zip;}
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
        /// <summary>
        /// 
        /// </summary>
        public string Job
        {
            set{_Job = value;}
            get{return _Job;}
        }
        /// <summary>
        /// 
        /// </summary>
        public decimal MonthIncome
        {
            set{_MonthIncome = value;}
            get{return _MonthIncome;}
        }
        /// <summary>
        /// 
        /// </summary>
        public decimal YearIncome
        {
            set{_YearIncome = value;}
            get{return _YearIncome;}
        }
        /// <summary>
        /// 
        /// </summary>
        public string CompanyName
        {
            set{_CompanyName = value;}
            get{return _CompanyName;}
        }
        /// <summary>
        /// 
        /// </summary>
        public string CompanyAddress
        {
            set{_CompanyAddress = value;}
            get{return _CompanyAddress;}
        }
        /// <summary>
        /// 
        /// </summary>
        public string Position
        {
            set{_Position = value;}
            get{return _Position;}
        }
        /// <summary>
        /// 
        /// </summary>
        public string EducationIDs
        {
            set{_EducationIDs = value;}
            get{return _EducationIDs;}
        }
        /// <summary>
        /// 0-正常;1-离异;2-单方过世
        /// </summary>
        public byte ParentMarital
        {
            set{_ParentMarital = value;}
            get{return _ParentMarital;}
        }

        #endregion
    }
}
