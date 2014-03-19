using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace ClientManage.Domain.Entities
{
    [Table("EasyChatTime")]
    public class EasyChatTimeEntity
    {        
        
        public EasyChatTimeEntity()
        {
            SetDefaultValues();
        }
        
        /// <summary>
        /// 设置初始化默认值
        /// </summary>
		private void SetDefaultValues()
		{
            _ItemID = Guid.Empty;
            _TimeBegin = new TimeSpan(0, 0, 0);
            _TimeEnd = new TimeSpan(23, 59, 59);
            _IfStudentID = Guid.Empty;
            _IfParentID = Guid.Empty;
		}
        
        
        #region Base Members

        private Guid _ItemID;
        private TimeSpan _TimeBegin;
        private TimeSpan _TimeEnd;
        private Guid _IfStudentID;
        private Guid _IfParentID;
        
        /// <summary>
        /// 
        /// </summary>
        [Key]
        [HiddenInput(DisplayValue = false)]
        public Guid ItemID
        {
            set{_ItemID = value;}
            get{return _ItemID;}
        }
        /// <summary>
        /// 
        /// </summary>
        public TimeSpan TimeBegin
        {
            set{_TimeBegin = value;}
            get{return _TimeBegin;}
        }
        /// <summary>
        /// 
        /// </summary>
        public TimeSpan TimeEnd
        {
            set{_TimeEnd = value;}
            get{return _TimeEnd;}
        }
        /// <summary>
        /// 如果是学生，ID
        /// </summary>
        public Guid IfStudentID
        {
            set{_IfStudentID = value;}
            get{return _IfStudentID;}
        }
        /// <summary>
        /// 如果是家长，ID
        /// </summary>
        public Guid IfParentID
        {
            set{_IfParentID = value;}
            get{return _IfParentID;}
        }

        #endregion
    }
}
