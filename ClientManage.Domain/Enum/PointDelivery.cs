using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ClientManage.Domain.Enum
{
    public enum PointDelivery:byte
    {
        已送=0,
        成绩过低不适宜送=1,
        未送=2
    }
}
