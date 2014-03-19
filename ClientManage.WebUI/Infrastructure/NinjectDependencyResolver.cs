using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Ninject;
using Ninject.Parameters;
using Ninject.Syntax;
using ClientManage.Domain.Entities;
using ClientManage.Domain.Abstract;
using ClientManage.Domain.Concrete;
using System.Configuration;

namespace ClientManage.WebUI.Infrastructure
{
    public class NinjectDependencyResolver:IDependencyResolver
    {
        private IKernel kernel;

        public NinjectDependencyResolver()
        {
            kernel = new StandardKernel();
            AddBindings();
        }

        public object GetService(Type serviceType)
        {
            return kernel.TryGet(serviceType);
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            return kernel.GetAll(serviceType);
        }

        public IBindingToSyntax<T> Bind<T>()
        {
            return kernel.Bind<T>(); 
        }

        public IKernel Kernel
        {
            get { return kernel; }
        }

        private void AddBindings()
        {
            //throw new NotImplementedException();
            kernel.Bind<IRoleInfoRepository>().To<EFRoleReposity>();
            kernel.Bind<IUserInfoRepository>().To<EFUserReposity>();
            kernel.Bind<IStudentInfoRepository>().To<EFStudentInfoReposity>();
            kernel.Bind<IAssayMaterialRepository>().To<EFAssayMaterialReposity>();
            kernel.Bind<IApplyStateRepository>().To<EFApplyStateReposity>();
            kernel.Bind<ISaleTrackRepository>().To<EFSaleTrackReposity>();
        }
    }
}