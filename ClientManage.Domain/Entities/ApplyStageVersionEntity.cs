using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace ClientManage.Domain.Entities
{
    [Table("ApplyStageVersion")] 
    public class ApplyStageVersionEntity
    {
        public ApplyStageVersionEntity()
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
        /// 
        /// </summary>
        [Key]
        public Guid VersionID
        {
            set;
            get;
        }
        /// <summary>
        /// 使用该版本的签约日期
        /// </summary>
        public DateTime SignDateBefore
        {
            set;
            get;
        }
        /// <summary>
        /// 版本名
        /// </summary>
        public string VersionName
        {
            set;
            get;
        }
        /// <summary>
        /// 版本备注
        /// </summary>
        public string Remark
        {
            set;
            get;
        }

        #endregion
    }
}
