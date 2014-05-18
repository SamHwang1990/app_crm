/***************************************
 * Created by samhwang1990@gmail.com on 14-5-13.
 * StudentMgr/Index/List View
 ***************************************/

define([
	'app',
	'text!templates/StudentMgr/Index/StudentItem.html',
	'text!templates/StudentMgr/Index/List.html'],function(ClientManage,StudentItemTpl,StudentsTpl){
	ClientManage.module('StudentMgr.Index.List.View',function(View,ClientManage,Backbone, Marionette, $, _){
		View.StudentItemView = Marionette.ItemView.extend({
			template:_.template(StudentItemTpl),
			tagName:"tr",
			templateHelpers:function(){
				return {
					StudentInfo:this.model.get("StudentInfo")
				}
			}
		});
		View.StudentsView = Marionette.CompositeView.extend({
			tagName:"div",
			className:"wrap",
			template: _.template(StudentsTpl),
			itemView:View.StudentItemView,
			itemViewContainer: "tbody",
			ui:{
				"formSearch":".form-search",                //form 元素
				"conditionCurrent":".condition-current",    //当前分类元素
				"conditionList":".condition-list",          //分类列表
				"searchContent":".search-content",          //筛选内容元素
				"btnSubmit":"button[type=submit]"           //submit 按钮
			},
			events:{
				'click @ui.conditionList a':'ConditionSortChange',      //搜索框交互
				'submit':'SortCommit'
			},
			ConditionSortChange:function(event){
				event.preventDefault();
				var sortName = event.target.text;                       //获取分类名字
				this.ui.conditionCurrent.html(sortName);                //修改当前分类显示
				if($(event.target).hasClass('condition-all')){          //修改“全部分类”
					this.ui.searchContent.attr('disabled','disabled');  //禁用输入框
					this.ui.btnSubmit.attr('disabled','disabled');      //禁用搜索按钮
					this.ui.searchContent.attr('placeholder','全部无需筛选');     //修改placeholder
				}else{
					this.ui.searchContent.removeAttr('disabled');       //
					this.ui.btnSubmit.removeAttr('disabled');
					this.ui.searchContent.attr('placeholder','请输入筛选的'+sortName);
				}
			}

		});
	});
	return ClientManage.StudentMgr.Index.List.View;
});
