using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace ClientManage.Domain.Entities
{
    [Table("AssayMaterial")]
    public class AssayMaterialEntity
    {        
        
        public AssayMaterialEntity()
        {
            SetDefaultValues();
        }
        
        /// <summary>
        /// 设置初始化默认值
        /// </summary>
		private void SetDefaultValues()
		{
            _StudentID = Guid.Empty;
            _IsFormSend = false;
            _FormRecycleDate = DateTime.Now.AddDays(10) ;
            _IsFormNeedModify = false;
            _Remark = string.Empty;
            _IsAssayMaterialDone = false;
		}
        
        
        #region Base Members

        private Guid _StudentID;
        private bool _IsFormSend;
        private DateTime _FormRecycleDate;
        private string _Form1Url;
        private string _Form2Url;
        private string _Form3Url;
        private string _Form4Url;
        private bool _IsFormNeedModify;
        private string _FormModifyDoc;
        private string _ResumeUrl;
        private string _Character;
        private string _Remark;
        private string _AdditionMaterialDoc;
        private bool _IsAssayMaterialDone;
        
        /// <summary>
        /// 
        /// </summary>
        [Key]
        [HiddenInput(DisplayValue = false)]
        public Guid StudentID
        {
            set{_StudentID = value;}
            get{return _StudentID;}
        }
        /// <summary>
        /// 
        /// </summary>
        [AdditionalMetadata("RenderList", "true")]
        public bool IsFormSend
        {
            set{_IsFormSend = value;}
            get{return _IsFormSend;}
        }
        /// <summary>
        /// 
        /// </summary>
        [DataType(DataType.Date)]
        [Range(typeof(DateTime), "1970/01/01", "2100/12/12", ErrorMessage = "时间超出范围")]
        public DateTime FormRecycleDate
        {
            set{_FormRecycleDate = value;}
            get{return _FormRecycleDate;}
        }
        /// <summary>
        /// 
        /// </summary>
        public string Form1Url
        {
            set{_Form1Url = value;}
            get{return _Form1Url;}
        }
        /// <summary>
        /// 
        /// </summary>
        public string Form2Url
        {
            set{_Form2Url = value;}
            get{return _Form2Url;}
        }
        /// <summary>
        /// 
        /// </summary>
        public string Form3Url
        {
            set{_Form3Url = value;}
            get{return _Form3Url;}
        }
        /// <summary>
        /// 
        /// </summary>
        public string Form4Url
        {
            set{_Form4Url = value;}
            get{return _Form4Url;}
        }
        /// <summary>
        /// 
        /// </summary>
        [AdditionalMetadata("RenderList","true")]
        public bool IsFormNeedModify
        {
            set{_IsFormNeedModify = value;}
            get{return _IsFormNeedModify;}
        }
        /// <summary>
        /// 
        /// </summary>
        public string FormModifyDoc
        {
            set{_FormModifyDoc = value;}
            get{return _FormModifyDoc;}
        }
        /// <summary>
        /// 
        /// </summary>
        [DataType(DataType.Url)]
        public string ResumeUrl
        {
            set{_ResumeUrl = value;}
            get{return _ResumeUrl;}
        }
        /// <summary>
        /// 
        /// </summary>
        [DataType(DataType.MultilineText)]
        public string Character
        {
            set{_Character = value;}
            get{return _Character;}
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
        /// <summary>
        /// 补充材料
        /// </summary>
        public string AdditionMaterialDoc
        {
            set{_AdditionMaterialDoc = value;}
            get{return _AdditionMaterialDoc;}
        }
        /// <summary>
        /// 确认文书材料
        /// </summary>
        public bool IsAssayMaterialDone
        {
            set{_IsAssayMaterialDone = value;}
            get{return _IsAssayMaterialDone;}
        }

        #endregion
    }
}
