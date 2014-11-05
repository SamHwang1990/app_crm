using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace ClientManage.Domain.Entities
{
    [Table("Permission_PValue")]
    public class PermissionPValueEntity
    {
        public PermissionPValueEntity()
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
        /// 角色ID
        /// </summary>
        [Key]
        public Guid RoleID
        {
            set;
            get;
        }
        /// <summary>
        /// 是否允许管理系统信息，包括用户管理、角色管理、权限设置
        /// </summary>
        public bool IsManage
        {
            set;
            get;
        }
        /// <summary>
        /// 是否允许查看学生列表
        /// </summary>
        public bool IsStudentList
        {
            set;
            get;
        }
        /// <summary>
        /// 是否允许查看所有学生列表，是-查看所有学生,否-查看自己负责的学生
        /// </summary>
        public bool IsStudentListAll
        {
            set;
            get;
        }
        /// <summary>
        /// 是否开放学生列表上的编辑链接
        /// </summary>
        public bool IsStudentListEdit
        {
            set;
            get;
        }
        /// <summary>
        /// 是否允许查看申请列表
        /// </summary>
        public bool IsApplyList
        {
            set;
            get;
        }
        /// <summary>
        /// 是否允许查看申请列表的所有学生，是-查看所有学生,否-只能查看自己负责的学生
        /// </summary>
        public bool IsApplyListAll
        {
            set;
            get;
        }
        /// <summary>
        /// 是否开放申请列表上的编辑链接
        /// </summary>
        public bool IsApplyListEdit
        {
            set;
            get;
        }
        /// <summary>
        /// 是否允许查看销售列表
        /// </summary>
        public bool IsSaleList
        {
            set;
            get;
        }
        /// <summary>
        /// 是否允许查看销售列表的所有学生，是-查看所有学生,否-只能查看自己负责的学生
        /// </summary>
        public bool IsSaleListAll
        {
            set;
            get;
        }
        /// <summary>
        /// 是否开放销售列表上的编辑链接
        /// </summary>
        public bool IsSaleListEdit
        {
            set;
            get;
        }

        #endregion
    }
}
