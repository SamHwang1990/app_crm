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
	'models/StudentMgr/EnumModel/Gender',
	'models/StudentMgr/EnumModel/IsSign',
	"BootstrapTable"
	],function(ClientManage,StudentItemTpl,StudentsTpl,EnumEducationIntention,EnumGrade,EnumGender,EnumIsSign,BootstrapTable){
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

		View.StudentsView = Marionette.ItemView.extend({
			tagName:"div",
			className:"wrap",
			template: _.template(StudentsTpl),
			ui:{
				"formSearch":".form-search",                //form 元素
				"conditionCurrent":".condition-current",    //当前分类元素
				"conditionList":".condition-list",          //分类列表
				"searchContent":".search-content",          //筛选内容元素
				"btnSubmit":"button[type=submit]" ,         //submit 按钮
				"tableStudentList":"table#StudentListTable"
			},
			events:{
				'click @ui.conditionList a':'ConditionSortChange',      //搜索框交互
				'submit':'SortCommit'
			},
			onRender:function(){
				this.CollectionHelpers();
			},
			onShow:function(){
				this.RenderBootstrapTable();
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
			},
			CollectionHelpers:function(){
				_.each(this.collection.models,function(studentItem){
					var studentInfo = studentItem.get("StudentInfo");
					studentInfo.EducationIntention = EnumEducationIntention.EducationIntentionInverse[studentInfo.EducationIntention];
					studentInfo.Grade = EnumGrade.GradeInverse[studentInfo.Grade];
					studentInfo.Gender = EnumGender.GenderInverse[studentInfo.Gender];
				})
			},
			SetTableColumns:function(){
				var columnColumns = [
					{field: 'studentName', title: '名字', sortable: true},
					{field: 'gender', title: '性别',sortable: true},
					{field: 'schoolCn', title: '在读学校',align:"center",formatter:function(value){
						if (!value) {
							return '-';
						}

						if(value.schoolCn == null){
							return "-";
						}else if(value.schoolCn.indexOf('其他') >= 0)
							return value.otherSchool;
						else
							return value.schoolCn;
					}},
					{field: 'educationIntention', title: '年级', sortable:true},
					{field: 'saleConsultantName', title: '销售负责人', sortable:true},
					{field: 'studentIsSign', title: '签约状态',sortable: true,formatter:function(value){
						if (!value) {
							return '-';
						}
						return EnumIsSign.IsSignInverse[value.IsSign];
					}},
					{field: 'exec', title: '操作', formatter: function (value) {
						if (!value) {
							return '-';
						}
						var execArray = [];
						execArray.push('<a href="#StudentMgr/Index/Edit/Student-' +
							value.StudentInfo.StudentID +
							'" title="' +
							value.StudentInfo.NameCn +
							'">修改基本信息</a>');

						execArray.push('<a href="#StudentMgr/Index/Edit/Contacts-' +
							value.StudentInfo.StudentID +
							'" title="' +
							value.StudentInfo.NameCn +
							'">修改联系人信息</a>');

						if (value.AppRelation.IsSign == '4' ) {
							if (!value.AppRelation.HasAssignConsultant && !value.AppRelation.HasScheduleApply) {
								execArray.push('<a href="#StudentMgr/AssignConsultant-'
									+ value.StudentInfo.StudentID
									+ '" title="'
									+ value.StudentInfo.NameCn
									+ '" class="btn btn-info btn-mini">分配顾问</a>')
							} else if (value.AppRelation.HasAssignConsultant && !value.AppRelation.HasScheduleApply){
								execArray.push('<a href="#StudentMgr/ScheduleApply-'
									+ value.StudentInfo.StudentID
									+ '" title="'
									+ value.StudentInfo.NameCn
									+ '" class="btn btn-info btn-mini">安排申请时间表</a>')
							} else {
								execArray.push('<a href="#StudentMgr/Apply/'
									+ value.StudentInfo.StudentID
									+ '" title="'
									+ value.StudentInfo.NameCn
									+ '" class="btn btn-success btn-mini">进入申请</a>')
							}

						} else {
							execArray.push('<a href="#StudentMgr/SaleTrack/AppInterview-'
								+ value.StudentInfo.StudentID
								+ '" title="'
								+ value.StudentInfo.NameCn
								+ '" class="btn btn-info btn-mini">进入销售</a>')
						}

						return execArray.join('&emsp;');
					}}
				];
				return columnColumns;
			},
			SetTableData:function(){
				var tableData = [];
				_.each(this.collection.models,function(studentItem){
					var dataItem = {};
					var studentInfo = studentItem.get("StudentInfo");
					var appRelation = studentItem.get("AppRelation");

					dataItem["studentName"] = studentInfo.NameCn
					dataItem["gender"] = studentInfo.Gender;
					dataItem["schoolCn"] = {
						schoolCn:studentInfo.SchoolCn,
						otherSchool:studentInfo.OtherSchool
					}
					dataItem["educationIntention"] = studentInfo.EducationIntention;
					dataItem["saleConsultantName"] = appRelation.SaleConsultantName;
					dataItem["studentIsSign"] = {
						IsSign:appRelation.IsSign
					};
					dataItem["exec"] = {
						StudentInfo:studentInfo,
						AppRelation:appRelation
					}
					tableData.push(dataItem);
				})
				return tableData;
			},
			RenderBootstrapTable:function(){
				var listView = this;
				this.ui.tableStudentList.bootstrapTable({
					data:listView.SetTableData(),
					columns:listView.SetTableColumns(),
					striped: true,
					pagination: true,
					sidePagination:"client",
					pageSize: 10,
					pageList: [10, 25, 50, 100, 200],
					search: true,
					showColumns: true,
					minimumCountColumns: 2,
					formatLoadingMessage:function(){
						return '数据加载中，请稍后！'
					},
					formatRecordsPerPage:function(pageNumber){
						return pageNumber + '条每页';
					},
					formatShowingRows:function(pageFrom, pageTo, totalRows){
						//Showing %s to %s of %s rows
						return '第&nbsp;' + pageFrom + '&nbsp;条到第&nbsp;' + pageTo + '&nbsp;条共&nbsp;' + totalRows + '&nbsp;条&emsp;';
					}
				});
			}

		});
	});
	return ClientManage.StudentMgr.Index.List.View;
});
