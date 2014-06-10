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
    [Table("StudentFlashPoint")]
    public class StudentFlashPointEntity
    {        
        
        public StudentFlashPointEntity()
        {
            SetDefaultValues();
        }
        
        /// <summary>
        /// 设置初始化默认值
        /// </summary>
		private void SetDefaultValues()
		{
			
		}
        
        
        #region Base Members
        
        /// <summary>
        /// 闪光点ID
        /// </summary>
        [Key]
        public Guid FlashPointID
        {
            set;
            get;
        }
        /// <summary>
        /// 学生ID
        /// </summary>
        public Guid StudentID
        {
            set;
            get;
        }
        /// <summary>
        /// 闪光点类型
        /// </summary>
        public byte FlashPointType
        {
            set;
            get;
        }
        /// <summary>
        /// 闪光点简介
        /// </summary>
        public string FlashPointIntro
        {
            set;
            get;
        }
        /// <summary>
        /// 闪光点详细内容
        /// </summary>
        public string FlashPointDetail
        {
            set;
            get;
        }
        /// <summary>
        /// 闪光点发生日期
        /// </summary>
        public string FlashPointDate
        {
            set;
            get;
        }
        /// <summary>
        /// 闪光点备注
        /// </summary>
        public string Remark
        {
            set;
            get;
        }

        #endregion
    }
}
