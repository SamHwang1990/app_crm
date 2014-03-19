using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Reflection;
using System.ComponentModel; 

namespace ClientManage.Domain.Enum
{
    public enum TrackIsComplete:byte
    {
        是=0,
        否=1,
        [Description("已致电但没接，另外再致电，见备注")]
        已致电但没接=2,
        [Description("已约另外时间（时间见备注）")]
        已约另外时间=3,
        [Description("其他（见备注）")]
        其他=4

    }
}
