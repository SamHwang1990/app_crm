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
    [Table("StudentSchool")]
    public class StudentSchoolEntity
    {        
        
        public StudentSchoolEntity()
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
        /// 就读学校ID
        /// </summary>
        [Key]
        public Guid SchoolID
        {
            set;
            get;
        }
        /// <summary>
        /// 学校中文名
        /// </summary>
        public string SchoolCn
        {
            set;
            get;
        }
        /// <summary>
        /// 学校英文名
        /// </summary>
        public string SchoolEn
        {
            set;
            get;
        }
        /// <summary>
        /// 学校类型：0-高中,1-大学,2-初中
        /// </summary>
        public SchoolType SchoolType
        {
            set;
            get;
        }
        /// <summary>
        /// 学校所在国家
        /// </summary>
        public string SchoolNation
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        public string Remark
        {
            set;
            get;
        }

        #endregion
    }
}
