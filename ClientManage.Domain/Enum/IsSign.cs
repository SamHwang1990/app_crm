using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ClientManage.Domain.Enum
{
    /// <summary>
    /// 签约状态
    /// </summary>
    public enum IsSign:byte
    {
        未签约=0,
        可能性低=1,
        可能性一般=2,
        可能性高=3,
        已签约=4
    }
}
