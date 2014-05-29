using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace ClientManage.Domain.Entities
{
    [Table("StudentTPInfo")]
    public class StudentTPInfoEntity
    {        
        
        public StudentTPInfoEntity()
        {
            SetDefaultValues();
        }
        
        /// <summary>
        /// 设置初始化默认值
        /// </summary>
		private void SetDefaultValues()
		{
            _StudentID = Guid.Empty;
            _IsIB = false;
            _IsAP = false;
            _IsALevel = false;
            _OtherTP1 = string.Empty;
            _OtherTP2 = string.Empty;
            _OtherTP3 = string.Empty;
            _OtherTP4 = string.Empty;
            _IsLangTran = false;
            _LT1CourseName = string.Empty;
            _LT1CourseAddress = string.Empty;
            _LT1DateBegin = DateTime.Now.AddMonths(-1);
            _LT1DateEnd = _LT1DateBegin.AddDays(1);
            _LT2CourseName = string.Empty;
            _LT2CourseAddress = string.Empty;
            _LT2DateBegin = DateTime.Now.AddMonths(-1);
            _LT2DateEnd = _LT2DateBegin.AddDays(1);
            _Remark = string.Empty;
		}
        
        
        #region Base Members

        private Guid _StudentID;
        private bool _IsIB;
        private bool _IsAP;
        private bool _IsALevel;
        private string _OtherTP1;
        private string _OtherTP2;
        private string _OtherTP3;
        private string _OtherTP4;
        private bool _IsLangTran;
        private string _LT1CourseName;
        private string _LT1CourseAddress;
        private DateTime _LT1DateBegin;
        private DateTime _LT1DateEnd;
        private string _LT2CourseName;
        private string _LT2CourseAddress;
        private DateTime _LT2DateBegin;
        private DateTime _LT2DateEnd;
        private string _Remark;

        /// <summary>
        /// 
        /// </summary>
        [Key]
        [HiddenInput(DisplayValue = false)]
        public Guid StudentID
        {
            set{_StudentID = value;}
            get{return _StudentID;}
        }
        /// <summary>
        /// 是否考过ID
        /// </summary>
        public bool IsIB
        {
            set{_IsIB = value;}
            get{return _IsIB;}
        }
        /// <summary>
        /// 是否考过AP
        /// </summary>
        public bool IsAP
        {
            set{_IsAP = value;}
            get{return _IsAP;}
        }
        /// <summary>
        /// 是否考过ALevel
        /// </summary>
        public bool IsALevel
        {
            set{_IsALevel = value;}
            get{return _IsALevel;}
        }
        /// <summary>
        /// 是否考过其他特殊课程1
        /// </summary>
        public string OtherTP1
        {
            set{_OtherTP1 = value;}
            get{return _OtherTP1;}
        }
        /// <summary>
        /// 是否考过其他特殊课程2
        /// </summary>
        public string OtherTP2
        {
            set{_OtherTP2 = value;}
            get{return _OtherTP2;}
        }
        /// <summary>
        /// 是否考过其他特殊课程3
        /// </summary>
        public string OtherTP3
        {
            set{_OtherTP3 = value;}
            get{return _OtherTP3;}
        }
        /// <summary>
        /// 是否考过其他特殊课程4
        /// </summary>
        public string OtherTP4
        {
            set{_OtherTP4 = value;}
            get{return _OtherTP4;}
        }
        /// <summary>
        /// 是否参加过语言课程培训
        /// </summary>
        public bool IsLangTran
        {
            set{_IsLangTran = value;}
            get{return _IsLangTran;}
        }
        /// <summary>
        /// 语言课程培训1 名称
        /// </summary>
        public string LT1CourseName
        {
            set{_LT1CourseName = value;}
            get{return _LT1CourseName;}
        }
        /// <summary>
        /// 语言课程培训1 机构
        /// </summary>
        public string LT1CourseAddress
        {
            set{_LT1CourseAddress = value;}
            get{return _LT1CourseAddress;}
        }
        /// <summary>
        /// 语言课程培训1 开始时间
        /// </summary>
        public DateTime LT1DateBegin
        {
            set{_LT1DateBegin = value;}
            get{return _LT1DateBegin;}
        }
        /// <summary>
        /// 语言课程培训1 结束时间
        /// </summary>
        public DateTime LT1DateEnd
        {
            set{_LT1DateEnd = value;}
            get{return _LT1DateEnd;}
        }
        /// <summary>
        /// 语言课程培训2 名称
        /// </summary>
        public string LT2CourseName
        {
            set{_LT2CourseName = value;}
            get{return _LT2CourseName;}
        }
        /// <summary>
        /// 语言课程培训2 机构
        /// </summary>
        public string LT2CourseAddress
        {
            set{_LT2CourseAddress = value;}
            get{return _LT2CourseAddress;}
        }
        /// <summary>
        /// 语言课程培训2 开始时间
        /// </summary>
        public DateTime LT2DateBegin
        {
            set{_LT2DateBegin = value;}
            get{return _LT2DateBegin;}
        }
        /// <summary>
        /// 语言课程培训2 结束时间
        /// </summary>
        public DateTime LT2DateEnd
        {
            set{_LT2DateEnd = value;}
            get{return _LT2DateEnd;}
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
