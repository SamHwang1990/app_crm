using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ClientManage.Domain.Enum
{
    //Module 的类型
    public enum ModuleType:byte
    {
        root=0,     //根节点
        Area=1,     //区域
        Controller=2,    //控制器
        Action=3    //动作
    }
}
