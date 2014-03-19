using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ClientManage.Domain.Entities;

namespace ClientManage.Domain.Abstract
{
    public interface IAppRelationsRepository
    {
        IQueryable<AppRelationsEntity> AppRelations { get; }

        void SaveAppRelation(AppRelationsEntity appRelation);

        void DeleteAppRelation(AppRelationsEntity appRelation);
    }
}
