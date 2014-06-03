using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace ClientManage.Domain.Entities
{
    [Table("ExamResult_SAT_SSAT")]
    public class ExamResultSATSSATEntity
    {        
        
        public ExamResultSATSSATEntity()
        {
            SetDefaultValues();
        }
        
        /// <summary>
        /// 设置初始化默认值
        /// </summary>
		private void SetDefaultValues()
		{
            _ExamID = Guid.Empty;
            //_MathScore = 0;
            //_Reading = 0;
            //_Vocabulary = 0;
            //_Writing = 0;
            //_Total = 0;
            _Remark = string.Empty;
		}
        
        
        #region Base Members

        private Guid _ExamID;
        private short _MathScore;
        private short _Reading;
        private short _Vocabulary;
        private short _Writing;
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
        public short MathScore
        {
            set { _MathScore = value; }
            get { return _MathScore; }
        }
        /// <summary>
        /// 
        /// </summary>
        public short Reading
        {
            set{_Reading = value;}
            get{return _Reading;}
        }
        /// <summary>
        /// 
        /// </summary>
        public short Vocabulary
        {
            set{_Vocabulary = value;}
            get{return _Vocabulary;}
        }
        /// <summary>
        /// 
        /// </summary>
        public short Writing
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
