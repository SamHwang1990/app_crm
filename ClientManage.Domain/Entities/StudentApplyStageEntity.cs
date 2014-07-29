using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace ClientManage.Domain.Entities
{
    [Table("StudentApplyStage")] 
    public class StudentApplyStageEntity
    {
        public StudentApplyStageEntity()
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
        public Guid ID
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
        /// 阶段编号，与ApplyStages的对应
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
        /// 父阶段编号，从本表中寻找
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
        /// 开始日期
        /// </summary>
        public DateTime BeginDate
        {
            set;
            get;
        }
        /// <summary>
        /// 结束日期
        /// </summary>
        public DateTime EndDate
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
        /// 当前状态
        /// </summary>
        public string CurrentOption
        {
            set;
            get;
        }
        /// <summary>
        /// 开始状态
        /// </summary>
        public string BeginOption
        {
            set;
            get;
        }
        /// <summary>
        /// 结束状态
        /// </summary>
        public string EndOption
        {
            set;
            get;
        }
        /// <summary>
        /// 负责的顾问ID
        /// </summary>
        public Guid? ResponseConsultant
        {
            set;
            get;
        }
        /// <summary>
        /// 负责的顾问名
        /// </summary>
        public string ResponseConsultantName
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
