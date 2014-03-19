using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace ClientManage.Domain.Entities
{
    [Table("ExamResult_GRE_GMAT")]
    public class ExamResultGREGMATEntity
    {        
        
        public ExamResultGREGMATEntity()
        {
            SetDefaultValues();
        }
        
        /// <summary>
        /// 设置初始化默认值
        /// </summary>
		private void SetDefaultValues()
		{
            _ExamID = Guid.Empty;
            _MathScore = 0;
            _Verbal = 0;
            _Writing = 0;
            _Total = 0;
            _Remark = string.Empty;
		}
        
        
        #region Base Members

        private Guid _ExamID;
        private byte _MathScore;
        private byte _Verbal;
        private byte _Writing;
        private short _Total;
        private string _Remark;
        
        /// <summary>
        /// 
        /// </summary>
        [Key]
        [HiddenInput(DisplayValue=false)]
        public Guid ExamID
        {
            set{_ExamID = value;}
            get{return _ExamID;}
        }
        /// <summary>
        /// 
        /// </summary>
        public byte MathScore
        {
            set { _MathScore = value; }
            get { return _MathScore; }
        }
        /// <summary>
        /// 
        /// </summary>
        public byte Verbal
        {
            set{_Verbal = value;}
            get{return _Verbal;}
        }
        /// <summary>
        /// 
        /// </summary>
        public byte Writing
        {
            set{_Writing = value;}
            get{return _Writing;}
        }
        /// <summary>
        /// 
        /// </summary>
        public short Total
        {
            set{_Total = value;}
            get{return _Total;}
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
