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
    [Table("ExamResult")]
    public class ExamResultEntity
    {        
        
        public ExamResultEntity()
        {
            SetDefaultValues();
        }
        
        /// <summary>
        /// 设置初始化默认值
        /// </summary>
		private void SetDefaultValues()
		{
            _ResultID = Guid.Empty;
            _ExamID = Guid.Empty;
            _ExamDate = DateTime.Now.AddMonths(-1);
            _NextExamDate = _ExamDate.AddMonths(1);
            _Times = 1;
            _ExamAddress = string.Empty;
            _ExamType = 0;
            _ExamName = string.Empty ;
            _PointDelivery = string.Empty;
            _Remark = string.Empty;
            _IsBeforeSign = false;
		}
        
        
        #region Base Members

        private Guid _ResultID;
        private Guid _StudentID;
        private Guid _ExamID;
        private DateTime _ExamDate;
        private short _Total;
        private byte _Times;
        private string _ExamAddress;
        private byte _ExamType;
        private string _ExamName;
        private string _PointDelivery;
        private DateTime _NextExamDate;
        private bool _IsBeforeSign;
        private string _Remark;
        
        /// <summary>
        /// 
        /// </summary>
        [Key]
        [HiddenInput(DisplayValue=false)]
        public Guid ResultID
        {
            set{_ResultID = value;}
            get{return _ResultID;}
        }
        public Guid StudentID
        {
            set { _StudentID = value; }
            get { return _StudentID; }
        }
        /// <summary>
        /// 该值为详细的考试类型中的一条考试记录ID
        /// </summary>
        public Guid ExamID
        {
            set{_ExamID = value;}
            get{return _ExamID;}
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime ExamDate
        {
            set{_ExamDate = value;}
            get{return _ExamDate;}
        }
        /// <summary>
        /// 总分
        /// </summary>
        public short Total
        {
            set { _Total = value; }
            get { return _Total; }
        }
        /// <summary>
        /// 
        /// </summary>
        public byte Times
        {
            set{_Times = value;}
            get{return _Times;}
        }
        /// <summary>
        /// 
        /// </summary>
        public string ExamAddress
        {
            set{_ExamAddress = value;}
            get{return _ExamAddress;}
        }
        /// <summary>
        /// 0-TOFEL;1-IELTS;2-SAT;3-SAT2;4-SSAT;5-GRE;6-GMAT;7-AP;8-Other;考试类型，用于从不同考试类型数据表中管理数据。
        /// </summary>
        public ExamType ExamType
        {
            set{_ExamType = (byte)value;}
            get{return (ExamType)_ExamType;}
        }
        /// <summary>
        /// 
        /// </summary>
        public string ExamName
        {
            set{_ExamName = value;}
            get{return _ExamName;}
        }
        /// <summary>
        /// 已送;成绩过低不适宜送;未送;
        /// </summary>
        public string PointDelivery
        {
            set{_PointDelivery = value;}
            get{return _PointDelivery;}
        }

        /// <summary>
        /// 计划考试时间
        /// </summary>
        public DateTime NextExamDate
        {
            set { _NextExamDate = value; }
            get { return _NextExamDate; }
        }

        /// <summary>
        /// 是否是签约前考的
        /// </summary>
        public bool IsBeforeSign
        {
            set { _IsBeforeSign = value; }
            get { return _IsBeforeSign; }
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
