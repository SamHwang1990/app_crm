/***************************************
 * Created by samhwang1990@gmail.com on 14-5-13.
 * StudentMgr/Index/List View
 ***************************************/

define([
	'app',
	'text!templates/StudentMgr/Index/StudentItem.html',
	'text!templates/StudentMgr/Index/List.html',
	'models/StudentMgr/EnumModel/EducationIntention',
	'models/StudentMgr/EnumModel/Grade',
	'models/StudentMgr/EnumModel/Gender'
	],function(ClientManage,StudentItemTpl,StudentsTpl,EnumEducationIntention,EnumGrade,EnumGender){
	ClientManage.module('StudentMgr.Index.List.View',function(View,ClientManage,Backbone, Marionette, $, _){
		View.StudentItemView = Marionette.ItemView.extend({
			template:_.template(StudentItemTpl),
			tagName:"tr",
			templateHelpers:function(){
				var studentInfo = this.model.get("StudentInfo");

				var originEduIntention = studentInfo.EducationIntention;
				studentInfo.EducationIntention = EnumEducationIntention.EducationIntentionInverse[originEduIntention];

				var originGrade = studentInfo.Grade;
				studentInfo.Grade = EnumGrade.GradeInverse[originGrade];

				var originGender = studentInfo.Gender;
				studentInfo.Gender = EnumGender.GenderInverse[originGender];

				var schoolCn = studentInfo.SchoolCn;
				var otherSchool = studentInfo.OtherSchool;
				var SchoolCn;
				if(schoolCn == null){
					SchoolCn = "";
				}else if(schoolCn.indexOf('其他') >= 0)
					SchoolCn = otherSchool;

				return {
					StudentInfo:studentInfo,
					AppRelation:this.model.get("AppRelation"),
					SchoolCn:SchoolCn
				}
			}
		});
		View.StudentsView = Marionette.CompositeView.extend({
			tagName:"div",
			className:"wrap",
			template: _.template(StudentsTpl),
			itemView:View.StudentItemView,
			itemViewContainer: "tbody",
			/*initialize:function(){
				_.bindAll(this,'SortCommit');
			},*/
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
					//this.ui.btnSubmit.attr('disabled','disabled');      //禁用搜索按钮
					this.ui.searchContent.attr('placeholder','全部无需筛选');     //修改placeholder
				}else{
					this.ui.searchContent.removeAttr('disabled');       //
					//this.ui.btnSubmit.removeAttr('disabled');
					this.ui.searchContent.attr('placeholder','请输入筛选的'+sortName);
				}
			},
			SortCommit:function(event){
				event.preventDefault();
				var listView = this;
				var condition = this.ui.conditionCurrent.text();
				var searchContent = this.ui.searchContent.val();
				if(condition==='全部'){       //如果筛选类型为“全部”
					this.collection.fetch({
						success:function(){
							console.log("fetche data from server successfully");
							//return listView.render();
						},
						error:function(){
							console.log("fetch data from server failed");
							return alert("获取数据失败");
						}
					})
				}else if(searchContent === ""){       //如果筛选内容为空，则刷新一下
					return this.render();
				}else {
					this.collection.fetch({
						data:{
							sort:condition,
							keyword:searchContent
						},
						success:function(){
							console.log("fetche data from server successfully");
							//return listView.render();
						},
						error:function(){
							console.log("fetch data from server failed");
							return alert("获取数据失败");
						}
					})
				}
			}

		});
	});
	return ClientManage.StudentMgr.Index.List.View;
});
