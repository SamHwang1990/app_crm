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
    [Table("StudentInfo")]
    public class StudentInfoEntity
    {
        #region Base Members

        private Guid _StudentID;
        private string _NameCn;
        private string _NamePinyin;
        private string _NameEn;
        private byte _Gender;
        private string _Citizenship;
        private byte _Marital;
        private string _BirthCity;
        private DateTime _Birthday;
        private string _Email;
        private string _Mobile;
        private string _LiveCity;
        private string _SchoolCn;
        private string _SchoolEn;
        private string _OtherSchool;
        private byte _Grade;
        private short _GradeRank;
        private short _GradeScale;
        private string _AverageScore;
        private DateTime _GraduationDate;
        private byte _EducationIntention;
        private string _NationIntention;
        private string _OtherNationIntention;
        private string _SpecialtyIntention;
        private DateTime _CreateTime;
        private string _LiveWith;
        private string _Guardian;
        private decimal _MoneyToAbroad;
        private string _Remark;

        /// <summary>
        /// 
        /// </summary>
        [Key]
        [HiddenInput(DisplayValue = false)]
        public Guid StudentID
        {
            set { _StudentID = value; }
            get { return _StudentID; }
        }
        /// <summary>
        /// 
        /// </summary>
        [Required(ErrorMessage = "Please enter a student name")]
        [StringLength(10,MinimumLength=1)]
        public string NameCn
        {
            set { _NameCn = value; }
            get { return _NameCn; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string NamePinyin
        {
            set { _NamePinyin = value; }
            get { return _NamePinyin; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string NameEn
        {
            set { _NameEn = value; }
            get { return _NameEn; }
        }
        /// <summary>
        /// 
        /// </summary>
        [UIHint("Enum")]
        public Gender Gender
        {
            set { _Gender = (byte)value; }
            get { return (Gender)_Gender; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string Citizenship
        {
            set { _Citizenship = value; }
            get { return _Citizenship; }
        }
        /// <summary>
        /// 
        /// </summary>
        [UIHint("Enum")]
        public Marital Marital
        {
            set { _Marital = (byte)value; }
            get { return (Marital)_Marital; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string BirthCity
        {
            set { _BirthCity = value; }
            get { return _BirthCity; }
        }
        /// <summary>
        /// 
        /// </summary>
        [DataType(DataType.Date)]
        [Range(typeof(DateTime), "1970/01/01", "2100/12/12", ErrorMessage = "时间超出范围")]
        public DateTime Birthday
        {
            set { _Birthday = value; }
            get { return _Birthday; }
        }
        /// <summary>
        /// 
        /// </summary>
        [DataType(DataType.EmailAddress)]
        public string Email
        {
            set { _Email = value; }
            get { return _Email; }
        }
        /// <summary>
        /// 
        /// </summary>
        [DataType(DataType.PhoneNumber)]
        public string Mobile
        {
            set { _Mobile = value; }
            get { return _Mobile; }
        }
        public string QQ
        {
            get;
            set;
        }
        public string Weixin
        {
            get;
            set;
        }
        /// <summary>
        /// 居住城市
        /// </summary>
        public string LiveCity
        {
            set { _LiveCity = value; }
            get { return _LiveCity; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string SchoolCn
        {
            set { _SchoolCn = value; }
            get { return _SchoolCn; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string SchoolEn
        {
            set { _SchoolEn = value; }
            get { return _SchoolEn; }
        }
        public string OtherSchool
        {
            set { _OtherSchool = value; }
            get { return _OtherSchool; }
        }
        /// <summary>
        /// 年级
        /// </summary>
        [UIHint("Enum")]
        public Grade Grade
        {
            set { _Grade = (byte)value; }
            get { return (Grade)_Grade; }
        }
        /// <summary>
        /// 年级排名
        /// </summary>
        public short GradeRank
        {
            set { _GradeRank = value; }
            get { return _GradeRank; }
        }
        /// <summary>
        /// 年级人数
        /// </summary>
        public short GradeScale
        {
            set { _GradeScale = value; }
            get { return _GradeScale; }
        }
        /// <summary>
        /// 平均成绩
        /// </summary>
        public string AverageScore
        {
            set { _AverageScore = value; }
            get { return _AverageScore; }
        }
        /// <summary>
        /// 毕业时间
        /// </summary>
        [DataType(DataType.Date)]
        [Range(typeof(DateTime),"1970/01/01","2100/12/12",ErrorMessage="时间超出范围")]
        public DateTime GraduationDate
        {
            set { _GraduationDate = value; }
            get { return _GraduationDate; }
        }
        /// <summary>
        /// 留学阶段倾向
        /// </summary>

        [UIHint("Enum")]
        public EducationIntention EducationIntention
        {
            set { _EducationIntention = (byte)value; }
            get { return (EducationIntention)_EducationIntention; }
        }
        /// <summary>
        /// 留学国家倾向
        /// </summary>
        public string NationIntention
        {
            set { _NationIntention = value; }
            get { return _NationIntention; }
        }

        /// <summary>
        /// 其他留学国家意向
        /// </summary>
        public string OtherNationIntention
        {
            set { _OtherNationIntention = value; }
            get { return _OtherNationIntention; }
        }

        /// <summary>
        /// 留学专业倾向
        /// </summary>
        public string SpecialtyIntention
        {
            set { _SpecialtyIntention = value; }
            get { return _SpecialtyIntention; }
        }
        /// <summary>
        /// 
        /// </summary>
        [DataType(DataType.Date)]
        [Range(typeof(DateTime), "1970/01/01", "2100/12/12", ErrorMessage = "时间超出范围")]
        public DateTime CreateTime
        {
            set { _CreateTime = value; }
            get { return _CreateTime; }
        }
        /// <summary>
        /// 长期一起居住
        /// </summary>
        public string LiveWith
        {
            set { _LiveWith = value; }
            get { return _LiveWith; }
        }
        /// <summary>
        /// 法定监护人
        /// </summary>
        public string Guardian
        {
            set { _Guardian = value; }
            get { return _Guardian; }
        }
        /// <summary>
        /// 提供出国的资金
        /// </summary>
        public decimal MoneyToAbroad
        {
            set { _MoneyToAbroad = value; }
            get { return _MoneyToAbroad; }
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

        /// <summary>
        /// 初始化部分字段
        /// </summary>
        public StudentInfoEntity()
        {
            StudentID = Guid.Empty;
            Birthday = new DateTime(1995, 01, 01);
            Gender = Enum.Gender.男;
            Citizenship = "中国";
            Grade = Enum.Grade.高二;
            GraduationDate = new DateTime(2015, 06, 07);
            EducationIntention = Enum.EducationIntention.本科;
            OtherNationIntention = "";
        }

    }
}
