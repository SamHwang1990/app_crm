using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace ClientManage.Domain.Entities
{
    [Table("ApplyStageVersionDetail")] 
    public class ApplyStageVersionDetailEntity
    {        
        public ApplyStageVersionDetailEntity()
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
        /// 阶段细节ID
        /// </summary>
        [Key]
        public Guid DetailID
        {
            set;
            get;
        }
        /// <summary>
        /// 版本ID
        /// </summary>
        public Guid VersionID
        {
            set;
            get;
        }
        /// <summary>
        /// 阶段编号
        /// </summary>
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
        /// 阶段层级
        /// </summary>
        public byte StageClass
        {
            set;
            get;
        }
        /// <summary>
        /// 父阶段
        /// </summary>
        public int ParentNo
        {
            set;
            get;
        }
        /// <summary>
        /// 是否禁用
        /// </summary>
        public bool IsForbid
        {
            set;
            get;
        }
        /// <summary>
        /// 状态选项
        /// </summary>
        public string StatusOption
        {
            set;
            get;
        }
        /// <summary>
        /// 开始状态的选项
        /// </summary>
        public string BeginOption
        {
            set;
            get;
        }
        /// <summary>
        /// 结束状态的选项
        /// </summary>
        public string EndOption
        {
            set;
            get;
        }
        /// <summary>
        /// 开始日期，如果需要计算，则为表达式
        /// </summary>
        public byte? BeginDate
        {
            set;
            get;
        }
        /// <summary>
        /// 结束日期，如果需要计算，则内容为表达式
        /// </summary>
        public byte? EndDate
        {
            set;
            get;
        }
        /// <summary>
        /// 日期是否与父相同；
        /// 父阶段的该字段用来指示子阶段是否与自身日期相同，子阶段的该字段用来指示自身的日期是否与父阶段相同
        /// </summary>
        public bool IsDateSameWithParent
        {
            set;
            get;
        }
        /// <summary>
        /// 子阶段编号
        /// </summary>
        public string ChildStage
        {
            set;
            get;
        }
        /// <summary>
        /// 负责角色
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
        /// 是否可更改可用状态
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
        /// 备注
        /// </summary>
        public string Remark
        {
            set;
            get;
        }

        #endregion
    }
}
