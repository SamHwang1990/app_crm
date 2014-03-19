using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using ClientManage.WebUI.Models;

namespace ClientManage.WebUI.HtmlHelpers
{
    public static class PagingHelpers
    {
        /// <summary>
        /// 扩展HtmlHelper
        /// </summary>
        /// <param name="html"></param>
        /// <param name="pagingInfo"></param>
        /// <param name="pageUrl">根据页面索引生成url的委托</param>
        /// <returns>分页链接</returns>
        public static MvcHtmlString PageLinks(this HtmlHelper html, PagingInfo pagingInfo, Func<int, string> pageUrl)
        {
            StringBuilder result = new StringBuilder();
            for (int i = 1; i <= pagingInfo.TotalPage; i++)
            {
                TagBuilder tag = new TagBuilder("a");   //创建一个<a>标签
                tag.MergeAttribute("href", pageUrl(i)); //设置a标签的href属性
                tag.InnerHtml = i.ToString();           //设置a标签的文本节点
                if (i==pagingInfo.CurrentPage)          //设置当前页的Class
                {
                    tag.AddCssClass("selected");
                }
                result.Append(tag.ToString());
            }
            return MvcHtmlString.Create(result.ToString());
        }
    }
}