using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace ClientManage.Domain.Entities
{
    [Table("StudentSourceItem")]
    public class StudentSourceItemEntity
    {        
        
        public StudentSourceItemEntity()
        {
            SetDefaultValues();
        }
        
        /// <summary>
        /// 设置初始化默认值
        /// </summary>
		private void SetDefaultValues()
		{
            _SourceName = string.Empty;
            _SourceNameEn = string.Empty;
            _DetailKeyword = string.Empty;
            _DetailContent = string.Empty;
            _Remark = string.Empty;
		}
        
        
        #region Base Members

        private string _SourceName;
        private string _SourceNameEn;
        private string _DetailKeyword;
        private string _DetailContent;
        private string _Remark;
        
        /// <summary>
        /// 
        /// </summary>
        [Key]
        public string SourceName
        {
            set{_SourceName = value;}
            get{return _SourceName;}
        }

        public string SourceNameEn
        {
            set { _SourceNameEn = value; }
            get { return _SourceNameEn; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string DetailKeyword
        {
            set{_DetailKeyword = value;}
            get{return _DetailKeyword;}
        }
        /// <summary>
        /// 
        /// </summary>
        public string DetailContent
        {
            set{_DetailContent = value;}
            get{return _DetailContent;}
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
