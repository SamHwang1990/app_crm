using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace ClientManage.Domain.Entities
{
    [Table("ApplyState")]
    public class ApplyStateEntity
    {        
        
        public ApplyStateEntity()
        {
            SetDefaultValues();
        }
        
        /// <summary>
        /// 设置初始化默认值
        /// </summary>
		private void SetDefaultValues()
		{
            _StudentID = Guid.Empty;
            _IsFamiliarDone = false;
            _FamiliarDetail = string.Empty;
            _IsActplanDone = false;
            _ActplanDetail = string.Empty;
            _IsBeginingDone = false;
            _BeginingDetail = string.Empty;
            _IsMiddleDone = false;
            _MiddleDetail = string.Empty;
            _IsLateDone = false;
            _LateDetail = string.Empty;
            _Remark = string.Empty;
		}
        
        
        #region Base Members

        private Guid _StudentID;
        private bool _IsFamiliarDone;
        private string _FamiliarDetail;
        private bool _IsActplanDone;
        private string _ActplanDetail;
        private bool _IsBeginingDone;
        private string _BeginingDetail;
        private bool _IsMiddleDone;
        private string _MiddleDetail;
        private bool _IsLateDone;
        private string _LateDetail;
        private string _CurrentState;
        private string _Remark;
        
        /// <summary>
        /// 
        /// </summary>
        [Key]
        [HiddenInput(DisplayValue=false)]
        public Guid StudentID
        {
            set{_StudentID = value;}
            get{return _StudentID;}
        }
        /// <summary>
        /// bool型
        /// </summary>
        public bool IsFamiliarDone
        {
            set{_IsFamiliarDone = value;}
            get{return _IsFamiliarDone;}
        }
        /// <summary>
        /// 简短描述
        /// </summary>
        public string FamiliarDetail
        {
            set{_FamiliarDetail = value;}
            get{return _FamiliarDetail;}
        }
        /// <summary>
        /// bool型
        /// </summary>
        public bool IsActplanDone
        {
            set{_IsActplanDone = value;}
            get{return _IsActplanDone;}
        }
        /// <summary>
        /// 简短描述
        /// </summary>
        public string ActplanDetail
        {
            set{_ActplanDetail = value;}
            get{return _ActplanDetail;}
        }
        /// <summary>
        /// bool型
        /// </summary>
        public bool IsBeginingDone
        {
            set{_IsBeginingDone = value;}
            get{return _IsBeginingDone;}
        }
        /// <summary>
        /// 简短描述
        /// </summary>
        public string BeginingDetail
        {
            set{_BeginingDetail = value;}
            get{return _BeginingDetail;}
        }
        /// <summary>
        /// bool型
        /// </summary>
        public bool IsMiddleDone
        {
            set{_IsMiddleDone = value;}
            get{return _IsMiddleDone;}
        }
        /// <summary>
        /// 简短描述
        /// </summary>
        public string MiddleDetail
        {
            set{_MiddleDetail = value;}
            get{return _MiddleDetail;}
        }
        /// <summary>
        /// bool型
        /// </summary>
        public bool IsLateDone
        {
            set{_IsLateDone = value;}
            get{return _IsLateDone;}
        }
        /// <summary>
        /// 简短描述
        /// </summary>
        public string LateDetail
        {
            set{_LateDetail = value;}
            get{return _LateDetail;}
        }

        /// <summary>
        /// 当前状态
        /// </summary>
        public string CurrentState
        {
            set { _CurrentState = value; }
            get { return _CurrentState; }
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
