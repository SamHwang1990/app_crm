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
    [Table("EducationBackground")]
    public class EducationBackgroundEntity
    {        
        
        public EducationBackgroundEntity()
        {
            SetDefaultValues();
        }
        
        /// <summary>
        /// 设置初始化默认值
        /// </summary>
		private void SetDefaultValues()
		{
            _EducationID = Guid.Empty;
            _StudentID = Guid.Empty;
            _PersonIdentity = 0;
            _SchoolCn = string.Empty;
            _SchoolEn = string.Empty;
            _Degree = 0;
            _StartDate = DateTime.Now;
            _EndDate = DateTime.Now;
            _Address = string.Empty;
            _Zip = string.Empty;
            _Specialty = string.Empty;
            _Courses = string.Empty;
            _Remark = string.Empty;
		}
        
        
        #region Base Members

        private Guid _EducationID;
        private Guid _StudentID;
        private byte _PersonIdentity;
        private string _SchoolCn;
        private string _SchoolEn;
        private byte _Degree;
        private DateTime _StartDate;
        private DateTime _EndDate;
        private string _Address;
        private string _Zip;
        private string _Specialty;
        private string _Courses;
        private string _Remark;
        
        /// <summary>
        /// 
        /// </summary>
        [Key]
        [HiddenInput(DisplayValue=false)]
        public Guid EducationID
        {
            set{_EducationID = value;}
            get{return _EducationID;}
        }
        /// <summary>
        /// 
        /// </summary>
        [HiddenInput(DisplayValue = false)]
        public Guid StudentID
        {
            set{_StudentID = value;}
            get{return _StudentID;}
        }
        /// <summary>
        /// 0-学生;1-父亲;2-母亲;3-其他;
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
        public string SchoolCn
        {
            set{_SchoolCn = value;}
            get{return _SchoolCn;}
        }
        /// <summary>
        /// 
        /// </summary>
        public string SchoolEn
        {
            set{_SchoolEn = value;}
            get{return _SchoolEn;}
        }
        /// <summary>
        /// 0-小学;1-初中;2-高中;3-本科;4-硕士;5-博士;6-博士后;7-AP预科
        /// </summary>
        public byte Degree
        {
            set{_Degree = value;}
            get{return _Degree;}
        }
        /// <summary>
        /// 
        /// </summary>
        [DataType(DataType.Date)]
        public DateTime StartDate
        {
            set{_StartDate = value;}
            get{return _StartDate;}
        }
        /// <summary>
        /// 
        /// </summary>
        [DataType(DataType.Date)]
        public DateTime EndDate
        {
            set{_EndDate = value;}
            get{return _EndDate;}
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
        /// 专业
        /// </summary>
        public string Specialty
        {
            set{_Specialty = value;}
            get{return _Specialty;}
        }
        /// <summary>
        /// 课程列表
        /// </summary>
        public string Courses
        {
            set{_Courses = value;}
            get{return _Courses;}
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
