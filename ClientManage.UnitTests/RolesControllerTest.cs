using ClientManage.WebUI.Areas.Admin.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting.Web;
using ClientManage.Domain.Abstract;
using ClientManage.Domain.Entities;
using System.Web.Mvc;
using Moq;

using ClientManage.WebUI.Areas.Admin.Models;
using ClientManage.WebUI.Models;

namespace ClientManage.UnitTests
{
    
    
    /// <summary>
    ///这是 RolesControllerTest 的测试类，旨在
    ///包含所有 RolesControllerTest 单元测试
    ///</summary>
    [TestClass()]
    public class RolesControllerTest
    {


        private TestContext testContextInstance;

        /// <summary>
        ///获取或设置测试上下文，上下文提供
        ///有关当前测试运行及其功能的信息。
        ///</summary>
        public TestContext TestContext
        {
            get
            {
                return testContextInstance;
            }
            set
            {
                testContextInstance = value;
            }
        }

        #region 附加测试特性
        // 
        //编写测试时，还可使用以下特性:
        //
        //使用 ClassInitialize 在运行类中的第一个测试前先运行代码
        //[ClassInitialize()]
        //public static void MyClassInitialize(TestContext testContext)
        //{
        //}
        //
        //使用 ClassCleanup 在运行完类中的所有测试后再运行代码
        //[ClassCleanup()]
        //public static void MyClassCleanup()
        //{
        //}
        //
        //使用 TestInitialize 在运行每个测试前先运行代码
        //[TestInitialize()]
        //public void MyTestInitialize()
        //{
        //}
        //
        //使用 TestCleanup 在运行完每个测试后运行代码
        //[TestCleanup()]
        //public void MyTestCleanup()
        //{
        //}
        //
        #endregion

        [TestMethod]
        public void Can_Send_Pagination_View_Model()
        {
            //布置——创建模仿存储库
            Mock<IRoleInfoRepository> mock = new Mock<IRoleInfoRepository>();
            mock.Setup(m => m.RolesInfo).Returns(new RoleInfo[]{    //使用Setup更改RolesInfo的结果，不适用DI，而是用后续的Return返回结果
                new RoleInfo{RoleID = new Guid(), RoleName = "R1",RoleEN="REN1"},
                new RoleInfo{RoleID = new Guid(), RoleName = "R2",RoleEN="REN2"},
                new RoleInfo{RoleID = new Guid(), RoleName = "R3",RoleEN="REN3"},
                new RoleInfo{RoleID = new Guid(), RoleName = "R4",RoleEN="REN4"},
                new RoleInfo{RoleID = new Guid(), RoleName = "R5",RoleEN="REN5"},
                new RoleInfo{RoleID = new Guid(), RoleName = "R6",RoleEN="REN6"}
            }.AsQueryable());

            //布置——创建一个控制器，设置页面大小为3
            RolesController controller = new RolesController(mock.Object) { PageSize = 3 };

            //动作
            RolesInfoViewModel result = (RolesInfoViewModel)controller.List(2).Model;

            //断言
            PagingInfo pageInfo = result.pagingInfo;
            Assert.AreEqual(pageInfo.CurrentPage, 2);
            Assert.AreEqual(pageInfo.ItemsPerPage, 3);
            Assert.AreEqual(pageInfo.TotalItems, 6);
            Assert.AreEqual(pageInfo.TotalPage, 2);
        }


        [TestMethod]
        public void Can_Paginate()
        {
            //布置
            //——创建模仿存储库
            Mock<IRoleInfoRepository> mock = new Mock<IRoleInfoRepository>();
            mock.Setup(m => m.RolesInfo).Returns(new RoleInfo[]{    //使用Setup更改RolesInfo的结果，不适用DI，而是用后续的Return返回结果
                new RoleInfo{RoleID = new Guid(), RoleName = "R1",RoleEN="REN1"},
                new RoleInfo{RoleID = new Guid(), RoleName = "R2",RoleEN="REN2"},
                new RoleInfo{RoleID = new Guid(), RoleName = "R3",RoleEN="REN3"},
                new RoleInfo{RoleID = new Guid(), RoleName = "R4",RoleEN="REN4"},
                new RoleInfo{RoleID = new Guid(), RoleName = "R5",RoleEN="REN5"},
                new RoleInfo{RoleID = new Guid(), RoleName = "R6",RoleEN="REN6"}
            }.AsQueryable());

            RolesController controller = new RolesController(mock.Object);
            controller.PageSize = 3;

            //动作
            RolesInfoViewModel result = (RolesInfoViewModel)controller.List(2).Model;

            //断言
            RoleInfo[] roleArray = result.RolesInfo.ToArray();
            Assert.IsTrue(roleArray.Length == 3);
            Assert.AreEqual(roleArray[0].RoleName, "R4");
            Assert.AreEqual(roleArray[1].RoleName, "R5");
        }

        [TestMethod]
        public void Can_Edit_Role()
        {
            //布置
            //——创建模仿存储库
            RoleInfo[] roles =  new RoleInfo[]{    
                new RoleInfo{RoleID = Guid.NewGuid(), RoleName = "R1",RoleEN="REN1"},
                new RoleInfo{RoleID = Guid.NewGuid(), RoleName = "R2",RoleEN="REN2"},
                new RoleInfo{RoleID = Guid.NewGuid(), RoleName = "R3",RoleEN="REN3"},
                new RoleInfo{RoleID = Guid.NewGuid(), RoleName = "R4",RoleEN="REN4"},
                new RoleInfo{RoleID = Guid.NewGuid(), RoleName = "R5",RoleEN="REN5"},
                new RoleInfo{RoleID = Guid.NewGuid(), RoleName = "R6",RoleEN="REN6"}
            };

            Mock<IRoleInfoRepository> mock = new Mock<IRoleInfoRepository>();
            mock.Setup(m => m.RolesInfo).Returns(roles.AsQueryable());  //使用Setup更改RolesInfo的结果，不适用DI，而是用后续的Return返回结果
            
            //布置——创建控制器
            RolesController controller = new RolesController(mock.Object);

            //动作
            RoleInfo r1 = controller.Edit(roles[1].RoleID).Model as RoleInfo;
            RoleInfo r2 = controller.Edit(roles[2].RoleID).Model as RoleInfo;
            RoleInfo r3 = controller.Edit(roles[3].RoleID).Model as RoleInfo;

            //断言
            Assert.AreEqual(r1.RoleName, "R2");
            Assert.AreEqual(r2.RoleName, "R3");
            Assert.AreEqual(r3.RoleName, "R4");
        }

        [TestMethod]
        public void Cannot_Edit_Nonexistent_Product()
        {
            //布置
            //——创建模仿存储库
            RoleInfo[] roles = new RoleInfo[]{    
                new RoleInfo{RoleID = Guid.NewGuid(), RoleName = "R1",RoleEN="REN1"},
                new RoleInfo{RoleID = Guid.NewGuid(), RoleName = "R2",RoleEN="REN2"},
                new RoleInfo{RoleID = Guid.NewGuid(), RoleName = "R3",RoleEN="REN3"}
            };

            Mock<IRoleInfoRepository> mock = new Mock<IRoleInfoRepository>();
            mock.Setup(m => m.RolesInfo).Returns(roles.AsQueryable());

            //布置——创建控制器
            RolesController controller = new RolesController(mock.Object);

            //动作
            RoleInfo r1 = controller.Edit(Guid.NewGuid()).Model as RoleInfo;

            //断言
            Assert.IsNull(r1);
        }

        [TestMethod]
        public void Can_Save_Valid_Changes()
        {
            //布置——创建模仿存储库
            Mock<IRoleInfoRepository> mock = new Mock<IRoleInfoRepository>();

            //布置——创建控制器
            RolesController controller = new RolesController(mock.Object);

            //布置——创建一个产品
            RoleInfo role = new RoleInfo {RoleID=Guid.NewGuid(), RoleName = "测试顾问" };

            //动作——试着保存这个产品
            ActionResult result = controller.Edit(role);

            //断言——检查，调用了存储库
            mock.Verify(m => m.SaveRoleInfo(role));

            //断言——检查方法的结果类型
            Assert.IsNotInstanceOfType(result, typeof(ViewResult));

        }

        [TestMethod]
        public void Cannot_Save_Invalid_Changes()
        {
            //布置——创建模仿存储库
            Mock<IRoleInfoRepository> mock = new Mock<IRoleInfoRepository>();

            //布置——创建控制器
            RolesController controller = new RolesController(mock.Object);

            //布置——创建一个产品
            RoleInfo role = new RoleInfo { RoleID = Guid.NewGuid(), RoleName = "测试顾问" };

            //布置——把一个错误添加到模型状态
            controller.ModelState.AddModelError("error", "error");

            //动作——试着保存这个产品
            ActionResult result = controller.Edit(role);

            //断言——检查，调用了存储库
            mock.Verify(m => m.SaveRoleInfo(It.IsAny<RoleInfo>()),Times.Never());

            //断言——检查方法的结果类型
            Assert.IsInstanceOfType(result, typeof(ViewResult));
        }

        [TestMethod]
        public void Can_Delete_Valid_Roles()
        {
            //布置——创建一个角色
            RoleInfo role = new RoleInfo { RoleID = Guid.NewGuid(), RoleName = "R1" };

            //布置——创建模仿存储库
            Mock<IRoleInfoRepository> mock = new Mock<IRoleInfoRepository>();
            RoleInfo[] roles = new RoleInfo[]{    
                new RoleInfo{RoleID = Guid.NewGuid(), RoleName = "R1",RoleEN="REN1"},
                role,
                new RoleInfo{RoleID = Guid.NewGuid(), RoleName = "R3",RoleEN="REN3"}
            };
            mock.Setup(m => m.RolesInfo).Returns(roles.AsQueryable());

            //布置——创建控制器
            RolesController controller = new RolesController(mock.Object);

            //动作——删除产品
            controller.Delete(role.RoleID);

            //断言
            mock.Verify(m => m.DeleteRoleInfo(role));
        }

        [TestMethod]
        public void Cannot_Delete_Invalid_Products()
        {
            //布置——创建模仿存储库
            Mock<IRoleInfoRepository> mock = new Mock<IRoleInfoRepository>();
            RoleInfo[] roles = new RoleInfo[]{    
                new RoleInfo{RoleID = Guid.NewGuid(), RoleName = "R1",RoleEN="REN1"},
                new RoleInfo { RoleID = Guid.NewGuid(), RoleName = "R1" },
                new RoleInfo{RoleID = Guid.NewGuid(), RoleName = "R3",RoleEN="REN3"}
            };

            //布置——创建控制器
            RolesController controller = new RolesController(mock.Object);

            //动作——用一个不存在的ID进行删除
            controller.Delete(Guid.NewGuid());

            //断言
            mock.Verify(m => m.DeleteRoleInfo(It.IsAny<RoleInfo>()),Times.Never());
        }
    }
}
