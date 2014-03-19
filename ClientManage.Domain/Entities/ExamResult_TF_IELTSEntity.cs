using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace ClientManage.Domain.Entities
{
    [Table("ExamResult_TF_IELTS")]
    public class ExamResultTFIELTSEntity
    {        
        
        public ExamResultTFIELTSEntity()
        {
            SetDefaultValues();
        }
        
        /// <summary>
        /// 设置初始化默认值
        /// </summary>
		private void SetDefaultValues()
		{
            _ExamID = Guid.Empty;
            _Reading = 0;
            _Listening = 0;
            _Speaking = 0;
            _Writing = 0;
            _Total = 0;
            _Remark = string.Empty;
		}
        
        
        #region Base Members

        private Guid _ExamID;
        private byte _Reading;
        private byte _Listening;
        private byte _Speaking;
        private byte _Writing;
        private short _Total;
        private string _Remark;

        /// <summary>
        /// 
        /// </summary>
        [Key]
        [HiddenInput(DisplayValue = false)]
        public Guid ExamID
        {
            set{_ExamID = value;}
            get{return _ExamID;}
        }
        /// <summary>
        /// 
        /// </summary>
        public byte Reading
        {
            set{_Reading = value;}
            get{return _Reading;}
        }
        /// <summary>
        /// 
        /// </summary>
        public byte Listening
        {
            set{_Listening = value;}
            get{return _Listening;}
        }
        /// <summary>
        /// 
        /// </summary>
        public byte Speaking
        {
            set{_Speaking = value;}
            get{return _Speaking;}
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
