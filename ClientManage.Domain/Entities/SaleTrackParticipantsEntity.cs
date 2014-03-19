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
    [Table("SaleTrackParticipants")]
    public class SaleTrackParticipantsEntity
    {        
        
        public SaleTrackParticipantsEntity()
        {
            SetDefaultValues();
        }
        
        /// <summary>
        /// 设置初始化默认值
        /// </summary>
		private void SetDefaultValues()
		{
            _ParticipantID = Guid.Empty;
            _SaleTrackID = Guid.Empty;
            _ParticipantName = string.Empty;
            _ParticipantIdentity = 0;
            _ParticipantMobile = string.Empty;
            _ParticipantEmail = string.Empty;
		}
        
        
        #region Base Members

        private Guid _ParticipantID;
        private Guid _SaleTrackID;
        private string _ParticipantName;
        private byte _ParticipantIdentity;
        private string _ParticipantMobile;
        private string _ParticipantEmail;
        
        /// <summary>
        /// 
        /// </summary>
        [Key]
        [HiddenInput(DisplayValue=false)]
        public Guid ParticipantID
        {
            set{_ParticipantID = value;}
            get{return _ParticipantID;}
        }
        /// <summary>
        /// 所属的跟踪ID
        /// </summary>
        [HiddenInput(DisplayValue=false)]
        public Guid SaleTrackID
        {
            set{_SaleTrackID = value;}
            get{return _SaleTrackID;}
        }
        /// <summary>
        /// 参与人名称
        /// </summary>
        public string ParticipantName
        {
            set{_ParticipantName = value;}
            get{return _ParticipantName;}
        }
        /// <summary>
        /// 咨询顾问身份；0-咨询顾问,1-顾问助理
        /// </summary>
        [UIHint("Enum")]
        public SaleParticipantIdentity ParticipantIdentity
        {
            set{_ParticipantIdentity = (byte)value;}
            get{return (SaleParticipantIdentity)_ParticipantIdentity;}
        }
        /// <summary>
        /// 参与人电话
        /// </summary>
        [DataType(DataType.PhoneNumber)]
        public string ParticipantMobile
        {
            set{_ParticipantMobile = value;}
            get{return _ParticipantMobile;}
        }
        /// <summary>
        /// 参与人邮箱
        /// </summary>
        [DataType(DataType.EmailAddress)]
        public string ParticipantEmail
        {
            set{_ParticipantEmail = value;}
            get{return _ParticipantEmail;}
        }

        #endregion
    }
}
