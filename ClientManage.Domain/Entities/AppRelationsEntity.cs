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
    [Table("AppRelations")]
    public class AppRelationsEntity
    {

        public AppRelationsEntity()
        {
            SetDefaultValues();
        }

        /// <summary>
        /// 设置初始化默认值
        /// </summary>
        private void SetDefaultValues()
        {
            _StudentID = Guid.Empty;
            _IsSign = 0;
            _IsFirstStageFee = false;
            _IsSecondStageFee = false;
            _YearPeriod = DateTime.Now.Year.ToString() + "-" + (DateTime.Now.Year + 1).ToString();  //例子：2014-2015
        }


        #region Base Members

        private Guid _StudentID;
        private byte _IsSign;
        private Nullable<DateTime> _SignDate;
        private bool _IsFirstStageFee;
        private decimal _FirstStageFee;
        private bool _IsSecondStageFee;
        private decimal _SecondStageFee;
        private string _AdviceToApp;
        private string _YearPeriod;
        private string _Remark;

        /// <summary>
        /// 
        /// </summary>
        [Key]
        public Guid StudentID
        {
            set { _StudentID = value; }
            get { return _StudentID; }
        }
        /// <summary>
        /// 是否已签约
        /// </summary>
        [UIHint("Enum")]
        public IsSign IsSign
        {
            set { _IsSign = (byte)value; }
            get { return (IsSign)_IsSign; }
        }
        /// <summary>
        /// 简约时间
        /// </summary>
        [DataType(DataType.Date)]
        [Range(typeof(DateTime), "1970/01/01", "2100/12/12", ErrorMessage = "时间超出范围")]
        public Nullable<DateTime> SignDate
        {
            set { _SignDate = value; }
            get { return _SignDate; }
        }
        /// <summary>
        /// 
        /// </summary>
        public Guid? SignTrackItem
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        public Guid? SaleConsultant
        {
            set;
            get;
        }
        public string SaleConsultantName
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        public Guid? ApplyConsultant
        {
            set;
            get;
        }
        public string ApplyConsultantName
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        public Guid? AssayConsultant
        {
            set;
            get;
        }
        public string AssayConsultantName
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        public Guid? ActConsultant
        {
            set;
            get;
        }
        public string ActConsultantName
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        public Guid? LanguageConsultant
        {
            set;
            get;
        }
        public string LanguageConsultantName
        {
            set;
            get;
        }
        /// <summary>
        /// 
        /// </summary>
        [AdditionalMetadata("RenderList", "true")]
        public bool IsFirstStageFee
        {
            set { _IsFirstStageFee = value; }
            get { return _IsFirstStageFee; }
        }
        /// <summary>
        /// 
        /// </summary>
        public decimal FirstStageFee
        {
            set { _FirstStageFee = value; }
            get { return _FirstStageFee; }
        }
        /// <summary>
        /// 
        /// </summary>
        [AdditionalMetadata("RenderList", "true")]
        public bool IsSecondStageFee
        {
            set { _IsSecondStageFee = value; }
            get { return _IsSecondStageFee; }
        }
        /// <summary>
        /// 
        /// </summary>
        public decimal SecondStageFee
        {
            set { _SecondStageFee = value; }
            get { return _SecondStageFee; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string AdviceToApp
        {
            set { _AdviceToApp = value; }
            get { return _AdviceToApp; }
        }
        /// <summary>
        /// 年届
        /// </summary>
        public string YearPeriod
        {
            set { _YearPeriod = value; }
            get { return _YearPeriod; }
        }
        /// <summary>
        /// 
        /// </summary>
        [DataType(DataType.MultilineText)]
        public string Remark
        {
            set { _Remark = value; }
            get { return _Remark; }
        }

        #endregion
    }
}
