using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace ClientManage.Domain.Entities
{
    [Table("ApplyStages")] 
    public class ApplyStagesEntity
    {        
        
        public ApplyStagesEntity()
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
        /// 阶段编号
        /// </summary>
        [Key]
        public int StageNo
        {
            set;
            get;
        }
        /// <summary>
        /// 阶段名
        /// </summary>
        public string StageName
        {
            set;
            get;
        }
        /// <summary>
        /// 阶段层级，比如最高级为0
        /// </summary>
        public byte StageClass
        {
            set;
            get;
        }
        /// <summary>
        /// 父级阶段
        /// </summary>
        public int ParentNo
        {
            set;
            get;
        }
        /// <summary>
        /// 是否已禁用
        /// </summary>
        public bool IsForbid
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        public string StatusOption
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        public string BeginOption
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        public string EndOption
        {
            set;
            get;
        }
        /// <summary>
        /// 开始日期，使用字符串存储数据，如果需要计算，则内容为表达式
        /// </summary>
        public byte? BeginDate
        {
            set;
            get;
        }
        /// <summary>
        /// 结束日期，使用字符串存储数据，如果需要计算，则内容为表达式
        /// </summary>
        public byte? EndDate
        {
            set;
            get;
        }
        /// <summary>
        /// 日期是否与父相同
        /// </summary>
        public bool IsDateSameWithParent
        {
            set;
            get;
        }
        /// <summary>
        /// 子阶段
        /// </summary>
        public string ChildStage
        {
            set;
            get;
        }
        /// <summary>
        /// 负责本阶段的角色
        /// </summary>
        public string ResponseRole
        {
            set;
            get;
        }
        /// <summary>
        /// 开始日期是否需要计算
        /// </summary>
        public bool? IsCalBeginDate
        {
            set;
            get;
        }
        /// <summary>
        /// 结束日期是否需要计算
        /// </summary>
        public bool? IsCalEndDate
        {
            set;
            get;
        }
        /// <summary>
        /// 是否能禁用
        /// </summary>
        public bool CanForbid
        {
            set;
            get;
        }
        /// <summary>
        /// 是否能修改日期
        /// </summary>
        public bool CanChangeDate
        {
            set;
            get;
        }
        /// <summary>
        /// 是否能修改阶段名
        /// </summary>
        public bool CanChangeName
        {
            set;
            get;
        }
        /// <summary>
        /// 阶段备注
        /// </summary>
        public string Remark
        {
            set;
            get;
        }

        #endregion
    }
}
