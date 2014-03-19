using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace ClientManage.Domain.Entities
{
    [Table("StudentFrom")]
    public class StudentFromEntity
    {        
        
        public StudentFromEntity()
        {
            SetDefaultValues();
        }
        
        /// <summary>
        /// 设置初始化默认值
        /// </summary>
		private void SetDefaultValues()
		{
            _ID = Guid.Empty;
            _StudentID = Guid.Empty;
            _SourceName = string.Empty;
            _SourceDetailKeyword = string.Empty;
            _SourceDetailContent = string.Empty;
            _Remark = string.Empty;
		}
        
        
        #region Base Members

        private Guid _ID;
        private Guid _StudentID;
        private string _SourceName;
        private string _SourceDetailKeyword;
        private string _SourceDetailContent;
        private string _Remark;
        
        /// <summary>
        /// 
        /// </summary>
        [Key]
        [HiddenInput(DisplayValue=false)]
        public Guid ID
        {
            set{_ID = value;}
            get{return _ID;}
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
        public string SourceName
        {
            set{_SourceName = value;}
            get{return _SourceName;}
        }
        /// <summary>
        /// 
        /// </summary>
        public string SourceDetailKeyword
        {
            set{_SourceDetailKeyword = value;}
            get{return _SourceDetailKeyword;}
        }
        /// <summary>
        /// 
        /// </summary>
        public string SourceDetailContent
        {
            set{_SourceDetailContent = value;}
            get{return _SourceDetailContent;}
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
