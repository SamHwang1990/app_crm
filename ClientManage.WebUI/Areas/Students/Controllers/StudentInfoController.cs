using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using ClientManage.Domain.Enum;
using ClientManage.WebUI.Areas.Students.Models;
using ClientManage.WebUI.Models;

namespace ClientManage.WebUI.Areas.Students.Controllers
{
    public class StudentInfoController : Controller
    {

        //
        // GET: /Students/StudentInfo/

        private IStudentInfoRepository repository;  //声明存储库字段
        public int PageSize = 10;   //定义列表的页面文章数

        public StudentInfoController(IStudentInfoRepository studentInfoRepository)
        {
            repository = studentInfoRepository;
        }

        public ActionResult List(int page = 1)
        {
            StudentListViewModel studentInfoViewModel = new StudentListViewModel
            {
                StudentsInfo = repository.StudentsInfo.Join(repository.AppRelations, s => s.StudentID, a => a.StudentID, (s, a) => new StudentInfoViewModel { StudentInfo = s, AppRelation = a })   //调用Join函数，连结两个集合，返回一个包对象
                .OrderBy(r => r.StudentInfo.NameCn)
                .Skip((page - 1) * PageSize)
                .Take(PageSize),
                pagingInfo = new PagingInfo
                {
                    TotalItems = repository.StudentsInfo.Count(),
                    CurrentPage = page,
                    ItemsPerPage = PageSize
                }
            };

            return View(studentInfoViewModel);
        }

        /// <summary>
        /// 创建
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ViewResult Create()
        {
            return View("Create", new StudentInfoViewModel { StudentInfo = new StudentInfoEntity(), AppRelation = new AppRelationsEntity { IsSign= IsSign.未签约} });
        }

        /// <summary>
        /// 编辑 HttpGet
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public ViewResult Edit(Guid id)
        {
            StudentInfoEntity studentInfo = repository.StudentsInfo.FirstOrDefault(r => r.StudentID == id);
            AppRelationsEntity appRelation = repository.AppRelations.FirstOrDefault(a => a.StudentID == id);
            return View(new StudentInfoViewModel { StudentInfo = studentInfo, AppRelation = appRelation });
        }

        /// <summary>
        /// 预览
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public ViewResult View(Guid id)
        {
            StudentInfoEntity studentInfo = repository.StudentsInfo.FirstOrDefault(r => r.StudentID == id);
            return View(studentInfo);
        }

        /// <summary>
        /// 处理编辑结果
        /// </summary>
        /// <param name="studentInfo"></param>
        /// <param name="appRelation"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult Edit(StudentInfoEntity studentInfo,AppRelationsEntity appRelation)
        {
            if(studentInfo.StudentID == Guid.Empty)
                studentInfo.StudentID = Guid.NewGuid();
            appRelation.StudentID = studentInfo.StudentID;
            if (ModelState.IsValid)
            {
                repository.SaveStudentInfo(studentInfo, appRelation);
                TempData["message"] = string.Format("{0} has been saved", studentInfo.NameCn);
                return RedirectToAction("List");
            }
            else
            {
                return View(new StudentInfoViewModel { StudentInfo = studentInfo, AppRelation = appRelation });
            }
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="StudentID"></param>
        /// <returns></returns>
        public ActionResult Delete(Guid StudentID)
        {
            StudentInfoEntity student = repository.StudentsInfo.FirstOrDefault(r => r.StudentID == StudentID);
            if (student != null)
            {
                repository.DeleteStudentInfo(student);
                TempData["message"] = string.Format("{0} was deleted", student.NameCn);
            }
            return RedirectToAction("List");
        }

        /// <summary>
        /// 根据ID 显示NameCn
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public string StudentName(Guid id)
        {
            StudentInfoEntity student = repository.StudentsInfo.FirstOrDefault(s => s.StudentID == id);
            return student.NameCn;
        }

        /// <summary>
        /// 返回所有用户名及其主次角色
        /// </summary>
        /// <param name="id">当前用户ID</param>
        /// <param name="element">select元素的name属性</param>
        /// <returns></returns>
        [ChildActionOnly]
        public ViewResult UserNameList(Guid id, string element)
        {
            IEnumerable<UserAndRoleViewModel> list = repository.UsersInfo
                .Select(u =>
                    new UserAndRoleViewModel
                    {
                        UserInfo = u,
                        MainRoleInfo = repository.RolesInfo.FirstOrDefault(r => r.RoleID == u.UserRole),
                        SecondRoleInfo = repository.RolesInfo.FirstOrDefault(r => r.RoleID == u.UserSecondRole)
                    })
                .OrderBy(u => u.MainRoleInfo.RoleName);
            ViewBag.ElementName = element;
            ViewBag.ID = id;
            return View(list);
        }

        /// <summary>
        /// 根据目标角色返回对应用户列表
        /// </summary>
        /// <param name="roleID"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult GetUserList(string roleIDString)
        {
            Guid roleID = new Guid(roleIDString);
            IEnumerable<UserAndRoleViewModel> list = repository.UsersInfo
                .Where(u => (u.UserRole == roleID || u.UserSecondRole == roleID))
                .Select(u => new UserAndRoleViewModel
                {
                    UserInfo = u,
                    MainRoleInfo = repository.RolesInfo.FirstOrDefault(r => r.RoleID == u.UserRole),
                    SecondRoleInfo = repository.RolesInfo.FirstOrDefault(r => r.RoleID == u.UserSecondRole)
                })
                .OrderBy(u => u.UserInfo.UserNameCn);
            //根据最小LastJobDate的值找出要派遣的用户
            DateTime theLastJobDate = list.Min(l => l.UserInfo.LastJobDate);
            UserInfoEntity nextUser = list
                .Select(u=>u.UserInfo)
                .FirstOrDefault(u => u.LastJobDate == theLastJobDate);
            return Json(new { UserList = list, NextUser = nextUser });
        }

        /// <summary>
        /// 获取所有角色列表
        /// </summary>
        /// <returns></returns>
        public ViewResult GetRoleList(string elementName)
        {
            IEnumerable<RoleInfo> roleList = repository.RolesInfo
                .Select(r => r)
                .OrderBy(r => r.RoleEN);
            ViewBag.ElementName = elementName;
            return View(roleList);
        }

        [HttpPost]
        public JsonResult Create(StudentCreateModel ajaxData)
        {
            StudentInfoEntity studentInfo = ajaxData.StudentInfo;
            studentInfo.StudentID = Guid.NewGuid();

            AppRelationsEntity appRelation = ajaxData.AppRelation;
            appRelation.SignDate = new DateTime(1990, 1, 1);
            appRelation.StudentID = studentInfo.StudentID;

            if (ajaxData.ContactStudent != null)
            {
                studentInfo.Mobile = ajaxData.ContactStudent.ContactIdentity.Mobile;
                studentInfo.Email = ajaxData.ContactStudent.ContactIdentity.Email; 
            }
            repository.SaveStudentInfo(studentInfo, appRelation);   //保存StudentInfo以及AppRelation信息

            if (ajaxData.ContactStudent!=null)
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

            return Json(new { CreateReslut = true,StudentID = studentInfo.StudentID});
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

            foreach (EasyChatTimeEntity item in contact.EasyChatTimes)
            {
                item.IfParentID = other.ParentID;
                repository.SaveEasyChatTime(item);  //添加EasyChatTime信息
            }
        }



        #region 用户初访信息登记表
        [HttpPost]
        public JsonResult FirstRegFormInfo(StudentCreateModel ajaxData)
        {
            StudentInfoEntity studentInfo = ajaxData.StudentInfo;
            AppRelationsEntity appRelation = repository.AppRelations.SingleOrDefault(a => a.StudentID == studentInfo.StudentID);

            StudentParentEntity parent = null;

            if (ajaxData.ContactStudent != null)
            {
                studentInfo.Mobile = ajaxData.ContactStudent.ContactIdentity.Mobile;
                studentInfo.Email = ajaxData.ContactStudent.ContactIdentity.Email;
            }
            repository.SaveStudentInfo(studentInfo, appRelation);   //保存StudentInfo以及AppRelation信息

            if (ajaxData.ContactStudent.EasyChatTimes != null)
            {
                foreach (EasyChatTimeEntity item in ajaxData.ContactStudent.EasyChatTimes)
                {
                    item.IfStudentID = studentInfo.StudentID;
                    repository.SaveEasyChatTime(item);      //保存方便联系时间
                }
            }

            if (ajaxData.ContactFather != null)
            {
                parent = repository.StudentParent.SingleOrDefault(s => s.StudentID == studentInfo.StudentID && s.PersonIdentity == PersonIdentity.父亲);
                if (parent != null)
                {
                    parent.NameCn = ajaxData.ContactFather.ContactIdentity.NameCn;
                    parent.Mobile = ajaxData.ContactFather.ContactIdentity.Mobile;
                    parent.Email = ajaxData.ContactFather.ContactIdentity.Email;
                    repository.SaveStudentParent(parent);
                    if (ajaxData.ContactFather.EasyChatTimes != null)
                    {
                        foreach (EasyChatTimeEntity item in ajaxData.ContactFather.EasyChatTimes)
                        {
                            item.IfParentID = parent.ParentID;
                            repository.SaveEasyChatTime(item);  //添加EasyChatTime信息
                        }
                    }
                }
                else
                {
                    AddParentAndChattime(ajaxData.ContactFather, studentInfo.StudentID); 
                }
            }
            if (ajaxData.ContactMother != null)
            {
                parent = repository.StudentParent.SingleOrDefault(s => s.StudentID == studentInfo.StudentID && s.PersonIdentity == PersonIdentity.母亲);
                if (parent != null)
                {
                    parent.NameCn = ajaxData.ContactMother.ContactIdentity.NameCn;
                    parent.Mobile = ajaxData.ContactMother.ContactIdentity.Mobile;
                    parent.Email = ajaxData.ContactMother.ContactIdentity.Email;
                    repository.SaveStudentParent(parent);
                    if (ajaxData.ContactMother.EasyChatTimes != null)
                    {
                        foreach (EasyChatTimeEntity item in ajaxData.ContactMother.EasyChatTimes)
                        {
                            item.IfParentID = parent.ParentID;
                            repository.SaveEasyChatTime(item);  //添加EasyChatTime信息
                        }
                    }
                }
                else
                {
                    AddParentAndChattime(ajaxData.ContactMother, studentInfo.StudentID);
                }
            }
            if (ajaxData.ContactOther != null)
            {
                parent = repository.StudentParent.SingleOrDefault(s => s.StudentID == studentInfo.StudentID && s.PersonIdentity == PersonIdentity.其他);
                if (parent != null)
                {
                    parent.NameCn = ajaxData.ContactOther.ContactIdentity.NameCn;
                    parent.Mobile = ajaxData.ContactOther.ContactIdentity.Mobile;
                    parent.Email = ajaxData.ContactOther.ContactIdentity.Email;
                    repository.SaveStudentParent(parent);
                    if (ajaxData.ContactOther.EasyChatTimes != null)
                    {
                        foreach (EasyChatTimeEntity item in ajaxData.ContactOther.EasyChatTimes)
                        {
                            item.IfParentID = parent.ParentID;
                            repository.SaveEasyChatTime(item);  //添加EasyChatTime信息
                        }
                    }
                }
                else
                {
                    AddParentAndChattime(ajaxData.ContactOther, studentInfo.StudentID);
                }
            }

            return Json(new { InfoResult = true,StudentID = studentInfo.StudentID });
        }

        [HttpPost]
        public JsonResult FirstRegTPInfo(FirstInterviewTPModel ajaxData)
        {
            StudentInfoEntity studentInfo = repository.StudentsInfo.SingleOrDefault(s=>s.StudentID == ajaxData.StudentInfo.StudentID);

            StudentTPInfoEntity studentTPInfo = ajaxData.StudentTPInfo;
            studentTPInfo.StudentID = studentInfo.StudentID;
            repository.SaveStudentTPInfo(studentTPInfo);
            

            ExamResultEntity _TFIELTSResult = ajaxData.TFIELTSResult;
            if (_TFIELTSResult != null)
            {
                if (_TFIELTSResult.ResultID == Guid.Empty)
                    _TFIELTSResult.ResultID = Guid.NewGuid();
                _TFIELTSResult.StudentID = studentInfo.StudentID;
                repository.SaveExamResult(_TFIELTSResult);
            }


            ExamResultEntity _SATSSATResult = ajaxData.SATSSATResult;
            ExamResultSATSSATEntity _SATSSATResultDetail = ajaxData.SATSSATResultDetail;
            if (_SATSSATResult != null)
            {
                if (_SATSSATResultDetail != null)
                {
                    if (_SATSSATResultDetail.ExamID == Guid.Empty)
                        _SATSSATResultDetail.ExamID = Guid.NewGuid();

                    repository.SaveExamResultSATSSAT(_SATSSATResultDetail);

                    _SATSSATResult.ExamID = _SATSSATResultDetail.ExamID;
                }
                else
                {
                    _SATSSATResult.ExamID = Guid.Empty;
                }

                if (_SATSSATResult.ResultID == Guid.Empty)
                    _SATSSATResult.ResultID = Guid.NewGuid();

                _SATSSATResult.StudentID = studentInfo.StudentID;
                repository.SaveExamResult(_SATSSATResult);
            }

            ExamResultEntity _SAT2Result = ajaxData.SAT2Result;
            if (_SAT2Result != null)
            {
                if (_SAT2Result.ResultID == Guid.Empty)
                    _SAT2Result.ResultID = Guid.NewGuid();
                _SAT2Result.StudentID = studentInfo.StudentID;
                repository.SaveExamResult(_SAT2Result);
            }

            return Json(new
            {
                TPInfo=true,
                StudentId = studentInfo.StudentID
            });
        }

        [HttpPost]
        public JsonResult FirstRegFormFrom(Guid studentID, IEnumerable<StudentFromEntity> fromList)
        {
            bool fromResult = true;
            if (repository.StudentsInfo.SingleOrDefault(s => s.StudentID == studentID) != null)
            {
                foreach (StudentFromEntity fromItem in fromList)
                {
                    fromItem.ID = Guid.NewGuid();
                }
                repository.SaveStudentFrom(fromList,studentID);
            }
            else
            {
                fromResult = false;
            }
            return Json(new {FromResult=fromResult,StudentID=studentID});
        }
        #endregion
    }
}
