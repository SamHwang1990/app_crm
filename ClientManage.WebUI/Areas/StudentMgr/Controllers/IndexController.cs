using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using ClientManage.Domain.Enum;
using ClientManage.WebUI.Areas.StudentMgr.Models;
using ClientManage.WebUI.Areas.Setting.Models;
using ClientManage.WebUI.Models;

namespace ClientManage.WebUI.Areas.StudentMgr.Controllers
{
    public class IndexController : Controller
    {
        private IStudentInfoRepository repository;
        private IUserInfoRepository userRepository;

        public IndexController(IStudentInfoRepository studentInfoRepository,IUserInfoRepository _userRepository)
        {
            repository = studentInfoRepository;
            userRepository = _userRepository;
        }

        
        public JsonResult List(string sort, string keyword)
        {
            IEnumerable<StudentInfoViewModel> StudentsInfo = null;
            if (sort == "学生" && keyword != "")
            {
                StudentsInfo = repository.StudentsInfo
                    .Where(s => s.NameCn == keyword)
                    .Join(repository.AppRelations, s => s.StudentID, a => a.StudentID, (s, a) => new StudentInfoViewModel { StudentInfo = s, AppRelation = a });
            }
            else if (sort == "销售负责人" && keyword != "")
            {
                Guid saleConsultantID = repository.UsersInfo.FirstOrDefault(u => u.UserNameCn.Contains(keyword)).UserID;
                StudentsInfo = repository.AppRelations
                    .Where(a => a.SaleConsultant == saleConsultantID)
                    .Join(repository.StudentsInfo, a => a.StudentID, s => s.StudentID, (a, s) => new StudentInfoViewModel { StudentInfo = s, AppRelation = a });
            }
            else
            {
                StudentsInfo = repository.StudentsInfo
                    .Join(repository.AppRelations, s => s.StudentID, a => a.StudentID, (s, a) => new StudentInfoViewModel { AppRelation = a, StudentInfo = s })   //调用Join函数，连结两个集合，返回一个包对象
                     .OrderByDescending(r => r.AppRelation.IsSign);
            }
            Array students = StudentsInfo.ToArray();        //用来调试时检测获取StudentsInfo内容之用，只是发布时可删除
            return Json(StudentsInfo, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Create(StudentCreateModel ajaxData)
        {
            StudentInfoEntity studentInfo = ajaxData.StudentInfo;
            studentInfo.StudentID = Guid.NewGuid();

            AppRelationsEntity appRelation = ajaxData.AppRelation;
            if (appRelation.IsSign != IsSign.已签约)
            {
                appRelation.SignDate = null;
            }
            appRelation.StudentID = studentInfo.StudentID;
            //appRelation.SaleConsultantName = GetUserName(appRelation.SaleConsultant);

            if (ajaxData.ContactStudent != null)
            {
                studentInfo.Mobile = ajaxData.ContactStudent.ContactIdentity.Mobile;
                studentInfo.Email = ajaxData.ContactStudent.ContactIdentity.Email;
            }
            repository.SaveStudentInfo(studentInfo, appRelation);   //保存StudentInfo以及AppRelation信息

            //更新销售顾问的LastJobData
            UserInfoEntity saleUser = repository.UsersInfo.SingleOrDefault(u => u.UserID == appRelation.SaleConsultant);
            saleUser.LastJobDate = DateTime.Now;
            userRepository.SaveUserInfo(saleUser);

            if (ajaxData.ContactStudent != null && ajaxData.ContactStudent.EasyChatTimes != null)
            {
                foreach (EasyChatTimeEntity item in ajaxData.ContactStudent.EasyChatTimes)
                {
                    item.IfStudentID = studentInfo.StudentID;
                    repository.SaveEasyChatTime(item);      //保存方便联系时间
                }
            }

            if (ajaxData.ContactFather != null)
            {
                AddParentAndChattime(ajaxData.ContactFather, studentInfo.StudentID);
            }
            if (ajaxData.ContactMother != null)
            {
                AddParentAndChattime(ajaxData.ContactMother, studentInfo.StudentID);
            }
            if (ajaxData.ContactOther != null)
            {
                AddParentAndChattime(ajaxData.ContactOther, studentInfo.StudentID);
            }

            return Json(new { CreateReslut = true, StudentID = studentInfo.StudentID });
        }

        /// <summary>
        /// 编辑学生基础信息
        /// </summary>
        /// <param name="studentInfo"></param>
        /// <param name="appRelation"></param>
        /// <param name="EasyChatTimes"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult EditStudent(StudentInfoEntity studentInfo, AppRelationsEntity appRelation, IEnumerable<EasyChatTimeEntity> EasyChatTimes)
        {
            bool editResult = true;
            if (studentInfo != null && appRelation != null)
            {
                //获取学生现在的销售顾问的ID，等下将要与新的销售顾问进行比较
                Guid? currentSaleConsultantID = repository.AppRelations.Single(a => a.StudentID == studentInfo.StudentID).SaleConsultant;

                //保存StudentInfo、AppRelation 信息到数据库中
                repository.SaveStudentInfo(studentInfo, appRelation);

                //只有在销售顾问有变化时才更新新销售顾问的LastJobData
                if (currentSaleConsultantID != appRelation.SaleConsultant)
                {
                    UserInfoEntity saleUser = repository.UsersInfo.SingleOrDefault(u => u.UserID == appRelation.SaleConsultant);
                    saleUser.LastJobDate = DateTime.Now;
                    userRepository.SaveUserInfo(saleUser);
                }

                //删除EasyChatTimes中与学生有关的所有记录
                repository.EmptyStudentEasyChatTimes(studentInfo.StudentID);

                //遍历EasyChatTimes， 并添加到数据库中
                if (EasyChatTimes != null)
                {
                    foreach (EasyChatTimeEntity item in EasyChatTimes)
                    {
                        repository.SaveEasyChatTime(item);
                    }
                }
            }
            else
            {
                editResult = false;
            }
            return Json(new { EditResult = editResult });
        }

        [HttpPost]
        public JsonResult AssignConsultant(AssignConsultantData ajaxData)
        {
            if (ajaxData == null || ajaxData.StudentID == null || ajaxData.StudentID == Guid.Empty)
                return Json(false);

            StudentInfoEntity studentInfo = repository.StudentsInfo.Single(s => s.StudentID == ajaxData.StudentID);
            AppRelationsEntity relation = repository.AppRelations.Single(a => a.StudentID == ajaxData.StudentID);
            relation.ApplyConsultant = ajaxData.ApplyConsultant;
            relation.ApplyConsultantName = ajaxData.ApplyConsultantName;
            relation.EssayConsultant = ajaxData.EssayConsultant;
            relation.EssayConsultantName = ajaxData.EssayConsultantName;
            relation.ActConsultant = ajaxData.ActConsultant;
            relation.ActConsultantName = ajaxData.ActConsultantName;
            relation.ExamConsultant = ajaxData.ExamConsultant;
            relation.ExamConsultantName = ajaxData.ExamConsultantName;
            relation.HasAssignConsultant = true;

            repository.SaveStudentInfo(studentInfo, relation);
            List<UserInfoEntity> userList = new List<UserInfoEntity>();

            UserInfoEntity applyConsultant = userRepository.UsersInfo.Single(u => u.UserID == ajaxData.ApplyConsultant);
            applyConsultant.LastJobDate = DateTime.Now;
            userList.Add(applyConsultant);

            UserInfoEntity essayConsultant = userRepository.UsersInfo.Single(u => u.UserID == ajaxData.EssayConsultant);
            essayConsultant.LastJobDate = DateTime.Now;
            userList.Add(essayConsultant);

            UserInfoEntity actConsultant = userRepository.UsersInfo.Single(u => u.UserID == ajaxData.ActConsultant);
            actConsultant.LastJobDate = DateTime.Now;
            userList.Add(actConsultant);

            UserInfoEntity examConsultant = userRepository.UsersInfo.Single(u => u.UserID == ajaxData.ExamConsultant);
            examConsultant.LastJobDate = DateTime.Now;
            userList.Add(examConsultant);

            userRepository.SaveUserList(userList);

            return Json(true);
        }

        /// <summary>
        /// 编辑学生联系人信息
        /// </summary>
        /// <param name="Contacts">联系人信息列表</param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult EditContacts(EasyChatTimeModel[] Contacts, string studentID)
        {
            bool editResult = true;
            if (studentID == string.Empty || studentID == Guid.Empty.ToString())
            {
                return Json(false);
            }
            Guid id = new Guid(studentID);
            string personIdentity = string.Empty;
            EasyChatTimeModel contactFather = null;
            EasyChatTimeModel contactMother = null;
            EasyChatTimeModel contactOther = null;
            try
            {
                contactFather = Contacts.FirstOrDefault(e => e.ContactIdentity.PersonIdentity == "父亲");
            }
            catch
            {
                contactFather = null;
            }

            try
            {
                contactMother = Contacts.FirstOrDefault(e => e.ContactIdentity.PersonIdentity == "母亲");
            }
            catch
            {
                contactMother = null;
            }

            try
            {
                contactOther = Contacts.FirstOrDefault(e => e.ContactIdentity.PersonIdentity == "其他");
            }
            catch
            {
                contactOther = null;
            }

            EditContact(contactFather, "父亲", id);
            EditContact(contactMother, "母亲", id);
            EditContact(contactOther, "其他", id);
            
            return Json(editResult);
        }

        /// <summary>
        /// 检查StudentParent表中是否有学生的特定联系人
        /// </summary>
        /// <param name="personIdentity">联系人身份</param>
        /// <param name="studentID">学生ID</param>
        /// <returns></returns>
        bool IsHaveContact(string personIdentity, Guid studentID)
        {
            PersonIdentity identity = (PersonIdentity)Enum.Parse(typeof(PersonIdentity), personIdentity);
            StudentParentEntity contact = repository.StudentParent.FirstOrDefault(s => s.StudentID == studentID && s.PersonIdentity == identity);
            if (contact == null)
                return false;
            else
                return true;
        }

        /// <summary>
        /// 添加Parent及其EasyChatTime
        /// </summary>
        /// <param name="contact"></param>
        /// <param name="studentID"></param>
        void AddParentAndChattime(EasyChatTimeModel contact, Guid studentID)
        {
            StudentParentEntity other = new StudentParentEntity
            {
                ParentID = Guid.NewGuid(),
                StudentID = studentID,
                NameCn = contact.ContactIdentity.NameCn,
                Email = contact.ContactIdentity.Email,
                Mobile = contact.ContactIdentity.Mobile,
                PersonIdentity = (PersonIdentity)Enum.Parse(typeof(PersonIdentity), contact.ContactIdentity.PersonIdentity)
            };
            repository.SaveStudentParent(other);    //添加Parent信息

            if (contact.EasyChatTimes != null)
            {
                foreach (EasyChatTimeEntity item in contact.EasyChatTimes)
                {
                    item.IfParentID = other.ParentID;
                    repository.SaveEasyChatTime(item);  //添加EasyChatTime信息
                }
            }
        }

        /// <summary>
        /// 编辑Parent及其EasyChatTime
        /// </summary>
        /// <param name="contact"></param>
        /// <param name="studentID"></param>
        void EditParentAndChattime(EasyChatTimeModel contact, Guid studentID)
        {
            PersonIdentity identity = (PersonIdentity)Enum.Parse(typeof(PersonIdentity), contact.ContactIdentity.PersonIdentity);
            //根据联系人身份和学生ID找出数据库中的Parent记录
            StudentParentEntity parent = repository.StudentParent
                .FirstOrDefault(s => s.StudentID == studentID && s.PersonIdentity == identity);
            
            //联系人信息修改
            parent.NameCn = contact.ContactIdentity.NameCn;
            parent.Mobile = contact.ContactIdentity.Mobile;
            parent.Email = contact.ContactIdentity.Email;

            //保存联系人信息
            repository.SaveStudentParent(parent);

            //清空联系人的联系时间
            repository.EmptyContactEasyChatTimes(parent.ParentID);

            //重新添加联系人的联系时间
            if (contact.EasyChatTimes != null)
            {
                foreach (EasyChatTimeEntity item in contact.EasyChatTimes)
                {
                    item.IfParentID = parent.ParentID;
                    repository.SaveEasyChatTime(item);  //添加EasyChatTime信息
                }
            }

        }

        /// <summary>
        /// 修改联系人
        /// </summary>
        /// <param name="contact">EasyChatTimeModel类型</param>
        /// <param name="contactIdentity">联系人身份</param>
        /// <param name="studentID"></param>
        void EditContact(EasyChatTimeModel contact, string contactIdentity, Guid studentID)
        {
            PersonIdentity identity = (PersonIdentity)Enum.Parse(typeof(PersonIdentity), contactIdentity);
            //联系人身份
            string personIdentity = contactIdentity;
            if (contact == null)
            {
                if (IsHaveContact(personIdentity, studentID))       //如果数据库中对应身份的联系人记录，则删掉
                    repository.RemoveStudentParent(identity, studentID);
            }
            else
            {
                if (IsHaveContact(personIdentity, studentID))       //如果数据库中对应身份的联系人记录，则修改
                    EditParentAndChattime(contact, studentID);
                else
                    AddParentAndChattime(contact, studentID);       //如果数据库中对应身份的联系人记录，则添加
            }
        }

        /// <summary>
        /// 根据用户ID返回用户名
        /// </summary>
        /// <param name="userIDString"></param>
        /// <returns></returns>
        public string GetUserName(Guid? userID)
        {
            var userName = "系统管理员";
            if (userID != Guid.Empty)
            {
                UserInfoEntity user = repository.UsersInfo.FirstOrDefault(u => u.UserID == userID);
                if (user != null)
                {
                    userName = user.UserNameCn;
                }
            }
            return userName;
        }

        //根据学生ID返回StudentInfo和AppRelation
        public JsonResult GetStudentInfoViewModel(string studentID)
        {
            StudentInfoEntity studentInfo = null;
            AppRelationsEntity appRelation = null;
            if (studentID == string.Empty || studentID == Guid.Empty.ToString())
            {
                studentInfo = new StudentInfoEntity();
                appRelation = new AppRelationsEntity { StudentID = studentInfo.StudentID };
            }
            else
            {
                Guid id = new Guid(studentID);
                studentInfo = repository.StudentsInfo.SingleOrDefault(s => s.StudentID == id);
                appRelation = repository.AppRelations.SingleOrDefault(a => a.StudentID == id);
            }
            return Json(new { StudentInfo=studentInfo, AppRelation=appRelation },JsonRequestBehavior.AllowGet);
        }

        //根据联系人ID 返回EasyChatTimeList
        public JsonResult GetEasyChatTimeList(string identity, string contactIDString)
        {
            IEnumerable<EasyChatTimeEntity> list = null;
            if (contactIDString == "" || contactIDString == Guid.Empty.ToString())
            {
                return Json(new { GetResult = false });
            }
            Guid contactID = new Guid(contactIDString);
            if (identity == "学生")
            {
                list = repository.EasyChatTime.Where(e => e.IfStudentID == contactID).Select(e => e);
            }
            else
            {
                list = repository.EasyChatTime.Where(e => e.IfParentID == contactID).Select(e => e);
            }
            Array temp = list.ToArray();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //根据学生ID返回Contacts List
        public JsonResult GetContacts(string studentID)
        {
            List<EasyChatTimeModel> contacts = new List<EasyChatTimeModel>();
            //以数组形式存储所有联系人的联系时间
            IEnumerable<EasyChatTimeEntity>[] chatTimes = null;
            //每个联系人的联系信息
            ContactIdentity contactInfo = null;
            //所有联系人列表，从数据库中读取赋值
            IEnumerable<StudentParentEntity> parents = null;

            if (studentID != null && studentID != string.Empty && studentID != Guid.Empty.ToString())
            {
                Guid id = new Guid(studentID);
                parents = repository.StudentParent.Where(s => s.StudentID == id);
            }
            if (parents.Count() > 0)
            {
                //初始化所有联系人联系时间的数组长度
                chatTimes = new IEnumerable<EasyChatTimeEntity>[parents.Count()];

                for (int i = 0; i < parents.Count(); i++)
                {
                    StudentParentEntity parent = parents.ElementAt(i);
                    contactInfo = new ContactIdentity
                    {
                        PersonIdentity = parent.PersonIdentity.ToString(),
                        NameCn = parent.NameCn,
                        Mobile = parent.Mobile,
                        Email = parent.Email
                    };
                    chatTimes[i] = repository.EasyChatTime.Where(e => e.IfParentID == parent.ParentID).Select(e => e);
                    contacts.Add(new EasyChatTimeModel { ContactIdentity = contactInfo, EasyChatTimes = chatTimes[i] });
                }

                //以下的写法会导致chatTimes始终变成最后赋值的那个
                //foreach (StudentParentEntity parent in parents)
                //{
                //    contactInfo = new ContactIdentity
                //    {
                //        PersonIdentity = parent.PersonIdentity.ToString(),
                //        NameCn = parent.NameCn,
                //        Mobile = parent.Mobile,
                //        Email = parent.Email
                //    };
                //    chatTimes = repository.EasyChatTime.Where(e => e.IfParentID == parent.ParentID).Select(e => e);
                //    contacts.Add(new EasyChatTimeModel { ContactIdentity = contactInfo, EasyChatTimes = chatTimes });
                //}
            }
            return Json(contacts,JsonRequestBehavior.AllowGet);
        }

        //根据学生ID返回ContactIdentity List
        public JsonResult GetContactIdentityList(string studentID)
        {
            List<ContactIdentity> contacts = new List<ContactIdentity>();
            //每个联系人的联系信息
            ContactIdentity contactInfo = null;
            StudentInfoEntity studentInfo = null;
            //所有联系人列表，从数据库中读取赋值
            IEnumerable<StudentParentEntity> parents = null;

            if (studentID != null && studentID != string.Empty && studentID != Guid.Empty.ToString())
            {
                Guid id = new Guid(studentID);
                parents = repository.StudentParent.Where(s => s.StudentID == id);
                studentInfo = repository.StudentsInfo.SingleOrDefault(s => s.StudentID == id);
                contactInfo = new ContactIdentity
                {
                    PersonIdentity = "学生",
                    NameCn = studentInfo.NameCn,
                    Mobile = studentInfo.Mobile,
                    Email = studentInfo.Email
                };
                contacts.Add(contactInfo);
                contactInfo = null;
            }
            if (parents.Count() > 0)
            {

                for (int i = 0; i < parents.Count(); i++)
                {
                    StudentParentEntity parent = parents.ElementAt(i);
                    contactInfo = new ContactIdentity
                    {
                        PersonIdentity = parent.PersonIdentity.ToString(),
                        NameCn = parent.NameCn,
                        Mobile = parent.Mobile,
                        Email = parent.Email
                    };
                    contacts.Add(contactInfo);
                    contactInfo = null;
                }
            }

            return Json(contacts, JsonRequestBehavior.AllowGet);
        }

        //返回所有就读学校列表
        public JsonResult GetStudentSchoolList()
        {
            IEnumerable<StudentSchoolEntity> schoolList = repository.StudentSchool;
            return Json(schoolList, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 返回下一个Sale 的UserID 和 RoleID
        /// </summary>
        /// <returns></returns>
        public JsonResult GetNextJobRoleAndUser()
        {
            IEnumerable<UserInfoEntity> forSaleUser = repository.UsersInfo.Where(s => s.IsForSaleTrack == true);
            object returnResult = null;
            if (forSaleUser == null || forSaleUser.Count() <= 0)
            {
                returnResult = new {CurRoleID = "", CurUserID = ""};
            }
            else
            {
                DateTime minLastJobDate = forSaleUser.Min(u => u.LastJobDate);
                UserInfoEntity nextSaler = forSaleUser.FirstOrDefault(u => u.LastJobDate == minLastJobDate);
                if (nextSaler == null)
                {
                    returnResult = new { CurRoleID = "", CurUserID = "" };
                }
                else
                {
                    returnResult = new { CurRoleID = nextSaler.UserRole, CurUserID = nextSaler.UserID };
                }
            }
            return Json(returnResult,JsonRequestBehavior.AllowGet);
        }

        #region Apply Stage Schedule Module

        /// <summary>
        /// 根据学生ID 返回申请阶段（全新的哦）
        /// </summary>
        /// <param name="versionID"></param>
        /// <returns></returns>
        public JsonResult GetScheduleApply(string studentID)
        {
            if (studentID == null && studentID == string.Empty && studentID == Guid.Empty.ToString())
            {
                return Json(new {GetResult = false, Msg = "不能传入空的学生ID" }, JsonRequestBehavior.AllowGet);
            }

            Guid StudentID = new Guid(studentID);
            AppRelationsEntity appRelation = repository.AppRelations.SingleOrDefault(s => s.StudentID == StudentID);
            DateTime studentSignDate = Convert.ToDateTime(appRelation.SignDate);

            //根据月、日进行筛选，并选出符合条件的第一个Entity，通过比较Month与Day两值相加的值来排序比较
            ApplyStageVersionEntity suitableVersion = GetApplyVersionByStudentID(StudentID);

            if (suitableVersion == null)
            {
                return Json(new { GetResult = false, Msg = "找不到符合条件的申请阶段版本，请先创建符合签约日期范围的版本" }, JsonRequestBehavior.AllowGet);
            }
            if (repository.ApplyStageVersionDetail.Count(a => a.VersionID == suitableVersion.VersionID) <= 0)
            {
                return Json(new { GetResult = false, Msg = "找不到符合条件的申请版本的阶段细节，请先编辑相关版本的阶段细节" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                List<StudentApplyStageWrap> applyStageWrapList = CalApplyStageWrapList(StudentID, studentSignDate, suitableVersion.VersionID);
                return Json(applyStageWrapList.OrderBy(a=>a.ParentStage.StageNo), JsonRequestBehavior.AllowGet);
            }

        }

        /// <summary>
        /// 根据学生ID返回合适的申请版本
        /// </summary>
        /// <param name="StudentID"></param>
        /// <returns></returns>
        ApplyStageVersionEntity GetApplyVersionByStudentID(Guid StudentID)
        {
            StudentInfoEntity studentInfo = repository.StudentsInfo.SingleOrDefault(s => s.StudentID == StudentID);
            AppRelationsEntity appRelation = repository.AppRelations.SingleOrDefault(s => s.StudentID == StudentID);
            DateTime studentSignDate = Convert.ToDateTime(appRelation.SignDate);

            //根据月、日进行筛选，并选出符合条件的第一个Entity，通过比较Month与Day两值相加的值来排序比较
            ApplyStageVersionEntity suitableVersion = repository.ApplyStageVersion
                .Where(a => a.SignDateBefore.Month >= studentSignDate.Month && a.SignDateBefore.Day >= studentSignDate.Day)
                .OrderBy(a => (a.SignDateBefore.Month * 100 + a.SignDateBefore.Day))
                .FirstOrDefault();

            return suitableVersion;
        }

        /// <summary>
        /// 根据版本ID 返回VersionDetailList
        /// </summary>
        /// <param name="versionID">版本ID</param>
        /// <returns></returns>
        List<ApplyStageVersionDetailWrap> GetVersionDetailList(Guid versionID)
        {
            List<ApplyStageVersionDetailWrap> versionDetailList = new List<ApplyStageVersionDetailWrap>();
            ApplyStageVersionDetailEntity parentDetail = null;
            List<ApplyStageVersionDetailEntity> childDetails = null;

            foreach (ApplyStageVersionDetailEntity parent in repository.ApplyStageVersionDetail.Where(a => a.VersionID == versionID && a.StageClass == 1))
            {
                parentDetail = parent;
                childDetails = repository.ApplyStageVersionDetail
                    .Where(a => a.VersionID == versionID && a.ParentNo == parent.StageNo)
                    .OrderBy(a => a.StageNo)
                    .ToList<ApplyStageVersionDetailEntity>();

                //添加到ApplyStageVersionDetailWrap List 中
                versionDetailList.Add(new ApplyStageVersionDetailWrap { ParentVersionDetail = parentDetail, ChildVersionDetails = childDetails });
            }

            return versionDetailList.OrderBy(a => a.ParentVersionDetail.StageNo).ToList();
        }

        /// <summary>
        /// 根据VersionDetailList 计算出ApplySchedule，新的哦！
        /// </summary>
        /// <param name="VersionDetailList"></param>
        /// <returns></returns>
        List<StudentApplyStageWrap> CalApplyStageWrapList(Guid studentID,DateTime signDate, Guid versionID)
        {
            //函数的返回值
            List<StudentApplyStageWrap> applyStageWrapList = new List<StudentApplyStageWrap>();

            //定义函数中会用到的两个局部变量
            StudentApplyStageEntity parentStage = null;
            StudentApplyStageEntity childStage = null;

            //用于暂时性的存储已经完成初始化的ApplyStage的List
            List<StudentApplyStageEntity> resultStageList = new List<StudentApplyStageEntity>();
            //根据版本ID 从数据库中获取IsForbid 为false 的 VersionDetailList
            List<ApplyStageVersionDetailEntity> versionDetailList = 
                repository.ApplyStageVersionDetail
                .Where(a=>a.VersionID == versionID && a.IsForbid == false)
                .ToList();

            //获取StageClass = 1 的StageNo数组
            int[] parentStageArray = versionDetailList.Where(a => a.StageClass == 1).OrderBy(a=>a.StageNo).Select(a=>a.StageNo).ToArray();
            //遍历父阶段
            for (int i = 0; i < parentStageArray.Length; i++)
            {
                //下面初始化两个局部变量
                DateTime refBeginDate = DateTime.Now;
                DateTime refEndDate = DateTime.Now;

                int parentStageNo = parentStageArray[i];
                //根据StageNo 取出VersionDetail
                ApplyStageVersionDetailEntity currentParentDetail = versionDetailList.SingleOrDefault(v => v.StageNo == parentStageNo);

                //如果当前父阶段为同辈阶段的第一个，则基准开始时间设为签约日期
                if (i == 0 || currentParentDetail.IsCalBeginDate == false)
                {
                    refBeginDate = signDate;
                }
                else    //否则，基准开始日期为兄长阶段的结束日期
                {
                    refBeginDate = resultStageList.SingleOrDefault(s => s.StageNo == Convert.ToInt16(parentStageArray[i - 1])).EndDate;
                }
                //父阶段调用该方法时，最后一个参数全为false
                parentStage = CalApplyStage(parentStageNo, refBeginDate, null, currentParentDetail, studentID, false,signDate);
                if (parentStage.BeginDate > parentStage.EndDate)
                {
                    parentStage.EndDate = parentStage.BeginDate.AddMonths(1);
                }

                //获取当前阶段的子阶段的StageNo 数组
                int[] childClass = versionDetailList.Where(a => a.ParentNo == parentStageNo && a.IsForbid == false).OrderBy(a => a.StageNo).Select(a => a.StageNo).ToArray();
                for (int j = 0; j < childClass.Length; j++)
                {
                    //将子阶段的StageNo 由字符串转换为数字
                    int childStageNo = childClass[j];
                    //根据StageNo 取出VersionDetail
                    ApplyStageVersionDetailEntity currentChildDetail = versionDetailList.SingleOrDefault(v => v.StageNo == childStageNo);

                    //如果子阶段的开始结束日期与父阶段一样的话，基准开始结束日期均与父阶段一致
                    if (currentChildDetail.IsDateSameWithParent)
                    {
                        childStage = CalApplyStage(childStageNo, parentStage.BeginDate, parentStage.EndDate, currentChildDetail, studentID, true, signDate);
                    }
                    else
                    {
                        //如果当前子阶段为同辈阶段的第一个，则基准开始时间设为父阶段的开始日期
                        if (j == 0)
                        {
                            refBeginDate = parentStage.BeginDate;
                        }
                        else     //否则，基准开始日期为兄长阶段的结束日期
                        {
                            refBeginDate = resultStageList.SingleOrDefault(s => s.StageNo == childClass[j-1]).EndDate;
                            
                        }
                        childStage = CalApplyStage(childStageNo, refBeginDate, null, currentChildDetail, studentID, false, signDate);
                    }

                    //把当前阶段的信息存储到resultStageList中，同辈间遍历的时候会用到
                    resultStageList.Add(childStage);
                }

                //如果当前父阶段的子阶段有时间限制，则把最后一个子阶段的EndDate值赋给父阶段的EndDate
                if (!currentParentDetail.IsDateSameWithParent && childClass.Length > 0)
                {
                    parentStage.EndDate = resultStageList.SingleOrDefault(s => s.StageNo == childClass.Last()).EndDate;
                }

                //把当前阶段的信息存储到resultStageList中，同辈间遍历的时候会用到
                resultStageList.Add(parentStage);
            }

            //最后，将resultStageList 按封装成StudentApplyStageWrap 对象列表
            foreach (StudentApplyStageEntity parentStageItem in resultStageList.Where(s=>s.ParentNo == 1))
            {
                applyStageWrapList.Add(new StudentApplyStageWrap { 
                    ParentStage = parentStageItem, 
                    ChildStages = resultStageList
                    .Where(s => s.ParentNo == parentStageItem.StageNo)
                    .OrderBy(r => r.StageNo) 
                    .ToList()
                    });
            }

            return applyStageWrapList;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="stageNo">当前阶段ID</param>
        /// <param name="refBeginDate">基准开始日期</param>
        /// <param name="refEndDate">基准结束日期</param>
        /// <param name="currentDetail">当前阶段Detail</param>
        /// <param name="studentID">学生ID</param>
        /// <param name="isDateSameWithParent">是否和父阶段日期一样</param>
        /// <returns></returns>
        StudentApplyStageEntity CalApplyStage(
            int stageNo, 
            DateTime refBeginDate, 
            DateTime? refEndDate, 
            ApplyStageVersionDetailEntity currentDetail, 
            Guid studentID, 
            bool isDateSameWithParent, 
            DateTime signDate)
        {
            StudentApplyStageEntity applyStage = new StudentApplyStageEntity
            {
                ID = Guid.NewGuid(),
                StudentID = studentID,
                StageNo = stageNo,
                StageName = currentDetail.StageName,
                StageClass = currentDetail.StageClass,
                ParentNo = currentDetail.ParentNo,
                IsForbid = currentDetail.IsForbid,
                StatusOption = currentDetail.StatusOption,
                BeginOption = currentDetail.BeginOption,
                EndOption = currentDetail.EndOption,
                CurrentOption = currentDetail.BeginOption,                
                CanForbid = currentDetail.CanForbid,
                CanChangeDate = currentDetail.CanChangeDate,
                CanChangeName = currentDetail.CanChangeName,
                IsDateSameWithParent = currentDetail.IsDateSameWithParent
            };
            //如果当前阶段的日期与父阶段一样，则直接赋值即可
            if (isDateSameWithParent)
            {
                applyStage.BeginDate = refBeginDate;
                applyStage.EndDate = Convert.ToDateTime(refEndDate);
            }
            else
            {
                //如果当前阶段的开始日期需要计算，则在基准开始日期上加上给定天数
                if (Convert.ToBoolean(currentDetail.IsCalBeginDate))
                {
                    applyStage.BeginDate = refBeginDate.AddDays(Convert.ToInt16(currentDetail.BeginDate));
                }
                else    //否则，则拼接年、月、日 来计算日期。下面算法的结果是，计算出给定月份的最后一天的日期值
                {
                    int year = (signDate.Month > currentDetail.BeginDate) ? signDate.Year + 1 : signDate.Year;
                    int month = Convert.ToInt16(currentDetail.BeginDate) + 1;
                    if (month > 12)
                    {
                        year += 1;
                        month = 1;
                    }
                    int day = 1;
                    applyStage.BeginDate = new DateTime(year, month, day).AddDays(-1);
                }

                //如果当前阶段的结束日期需要计算，则在基准结束日期上加上给定天数
                if (Convert.ToBoolean(currentDetail.IsCalEndDate))
                {
                    applyStage.EndDate = applyStage.BeginDate.AddDays(Convert.ToInt16(currentDetail.EndDate));
                }
                else    //否则，则拼接年、月、日 来计算日期。下面算法的结果是，计算出给定月份的最后一天的日期值
                {

                    int year = (signDate.Month > currentDetail.EndDate) ? signDate.Year + 1 : signDate.Year;
                    int month = Convert.ToInt16(currentDetail.EndDate) + 1;
                    if (month > 12)
                    {
                        year += 1;
                        month = 1;
                    }
                    int day = 1;
                    applyStage.EndDate = new DateTime(year, month, day).AddDays(-1);
                }
            }
            return applyStage;
        }

        /// <summary>
        /// 相应ajax 请求
        /// </summary>
        /// <param name="ajaxData"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult ScheduleApply(IEnumerable<StudentApplyStageWrap> ajaxData)
        {
            if (ajaxData == null)
            {
                return Json(new { SaveResult = false });
            }

            Guid studentID = ajaxData.FirstOrDefault().ParentStage.StudentID;
            //根据月、日进行筛选，并选出符合条件的第一个Entity，通过比较Month与Day两值相加的值来排序比较
            ApplyStageVersionEntity suitableVersion = GetApplyVersionByStudentID(studentID);

            List<ApplyStageVersionDetailEntity> versionDetailList = repository.ApplyStageVersionDetail.Where(a => a.VersionID == suitableVersion.VersionID).ToList();
            List<StudentApplyStageEntity> applyStageList = new List<StudentApplyStageEntity>();
            ApplyStageVersionDetailEntity currentStage = null;

            //将列表按父阶段的StageNo进行排序
            ajaxData = ajaxData.OrderBy(w => w.ParentStage.StageNo);
            foreach (StudentApplyStageWrap applyStageWrap in ajaxData)
            {
                if (applyStageWrap.ParentStage.IsForbid)
                    continue;

                currentStage = versionDetailList.Single(a => a.StageNo == applyStageWrap.ParentStage.StageNo);
                applyStageWrap.ParentStage.ID = Guid.NewGuid();
                applyStageWrap.ParentStage.ParentNo = currentStage.ParentNo;
                applyStageWrap.ParentStage.StatusOption = currentStage.StatusOption;
                applyStageWrap.ParentStage.CurrentOption = currentStage.BeginOption;
                applyStageWrap.ParentStage.BeginOption = currentStage.BeginOption;
                applyStageWrap.ParentStage.EndOption = currentStage.EndOption;
                applyStageWrap.ParentStage.CanForbid = currentStage.CanForbid;
                applyStageWrap.ParentStage.CanChangeDate = currentStage.CanChangeDate;
                applyStageWrap.ParentStage.CanChangeName = currentStage.CanChangeName;
                applyStageWrap.ParentStage.IsDateSameWithParent = currentStage.IsDateSameWithParent;

                foreach (StudentApplyStageEntity childStage in applyStageWrap.ChildStages)
                {
                    if (childStage.IsForbid)
                        continue;

                    currentStage = versionDetailList.Single(a => a.StageNo == childStage.StageNo);

                    childStage.ID = Guid.NewGuid();
                    childStage.ParentNo = currentStage.ParentNo;
                    childStage.StatusOption = currentStage.StatusOption;
                    childStage.CurrentOption = currentStage.BeginOption;
                    childStage.BeginOption = currentStage.BeginOption;
                    childStage.EndOption = currentStage.EndOption;
                    childStage.CanForbid = currentStage.CanForbid;
                    childStage.CanChangeDate = currentStage.CanChangeDate;
                    childStage.CanChangeName = currentStage.CanChangeName;
                    childStage.IsDateSameWithParent = currentStage.IsDateSameWithParent;
                }

                applyStageList.Add(applyStageWrap.ParentStage);
                applyStageList.AddRange(applyStageWrap.ChildStages);
            }
            repository.SaveStudentApplyStages(applyStageList);
            AppRelationsEntity appRelation = repository.AppRelations.SingleOrDefault(s => s.StudentID == studentID);
            appRelation.HasScheduleApply = true;
            repository.SaveStudentInfo(repository.StudentsInfo.SingleOrDefault(s => s.StudentID == studentID), appRelation);

            return Json(new { SaveResult = true });
        }

        #endregion
    }
}
