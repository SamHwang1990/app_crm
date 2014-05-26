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
    [Table("SaleTrack")]
    public class SaleTrackEntity
    {        
        
        public SaleTrackEntity()
        {
            SetDefaultValues();
        }
        
        /// <summary>
        /// 设置初始化默认值
        /// </summary>
		private void SetDefaultValues()
		{
            _TrackItemID = Guid.Empty;
            _StudentID = Guid.Empty;
            _Inputor = string.Empty;
            _StateName = string.Empty;
            _TrackPattern = 0;
            _TrackDate = DateTime.Now;
            _ToDo = string.Empty;
            _GetFromTrack = string.Empty;
            _IsGetFromDone = false;
            _TrackNo = 1;
            _ParticipantIDs = string.Empty;
            _IsComplete = 0;
            _Remark = string.Empty;
		}
        
        
        #region Base Members

        private Guid _TrackItemID;
        private Guid _StudentID;
        private string _Inputor;
        private string _StateName;
        private byte _TrackPattern;
        private DateTime _TrackDate;
        private string _ToDo;
        private string _GetFromTrack;
        private bool _IsGetFromDone;
        private byte _TrackNo;
        private string _ParticipantIDs;
        private byte _IsComplete;
        private string _Remark;
        
        /// <summary>
        /// 
        /// </summary>
        [Key]
        [HiddenInput(DisplayValue = false)]
        public Guid TrackItemID
        {
            set{_TrackItemID = value;}
            get{return _TrackItemID;}
        }
        /// <summary>
        /// 
        /// </summary>
        [HiddenInput(DisplayValue = false)]
        public Guid StudentID
        {
            set{_StudentID = value;}
            get{return _StudentID;}
        }
        /// <summary>
        /// 录入者
        /// </summary>
        public string Inputor
        {
            set{_Inputor = value;}
            get{return _Inputor;}
        }
        /// <summary>
        /// 跟踪阶段名称
        /// </summary>
        public string StateName
        {
            set{_StateName = value;}
            get{return _StateName;}
        }
        /// <summary>
        /// 跟踪方式，0-电话,1-面谈,2-邮件等
        /// </summary>
        [UIHint("Enum")]
        public TrackPattern TrackPattern
        {
            set{_TrackPattern = (byte)value;}
            get{return (TrackPattern)_TrackPattern;}
        }
        /// <summary>
        /// 跟踪日期
        /// </summary>
        public DateTime TrackDate
        {
            set{_TrackDate = value;}
            get{return _TrackDate;}
        }
        /// <summary>
        /// 当此跟踪需要完成的事宜
        /// </summary>
        [DataType(DataType.MultilineText)]
        public string ToDo
        {
            set{_ToDo = value;}
            get{return _ToDo;}
        }
        /// <summary>
        /// 这次跟踪获得的信息
        /// </summary>
        [DataType(DataType.MultilineText)]
        public string GetFromTrack
        {
            set{_GetFromTrack = value;}
            get{return _GetFromTrack;}
        }

        public bool IsGetFromDone
        {
            set { _IsGetFromDone = value; }
            get { return _IsGetFromDone; }
        }
        /// <summary>
        /// 所属学生的跟踪顺序
        /// </summary>
        public byte TrackNo
        {
            set{_TrackNo = value;}
            get{return _TrackNo;}
        }
        /// <summary>
        /// 当此跟踪的参与人员ID
        /// </summary>
        public string ParticipantIDs
        {
            set{_ParticipantIDs = value;}
            get{return _ParticipantIDs;}
        }
        /// <summary>
        /// 完成进度；0-是,1-否,2-已致电但没接,3-已约另外时间（时间见备注）,4-其他（见备注）
        /// </summary>
        [UIHint("Enum")]
        public TrackIsComplete IsComplete
        {
            set{_IsComplete = (byte)value;}
            get{return (TrackIsComplete)_IsComplete;}
        }
        /// <summary>
        /// 备注
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
