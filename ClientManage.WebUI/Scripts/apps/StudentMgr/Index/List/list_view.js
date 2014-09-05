/***************************************
 * Created by samhwang1990@gmail.com on 14-5-13.
 * StudentMgr/Index/List View
 ***************************************/

define([
	'app',
	'text!templates/StudentMgr/Index/List.html',
	'models/StudentMgr/EnumModel/EducationIntention',
	'models/StudentMgr/EnumModel/Grade',
	'models/StudentMgr/EnumModel/Gender',
	'models/StudentMgr/EnumModel/IsSign',
	"assets/RenderBootstrapTable"
	],function(ClientManage,StudentsTpl,EnumEducationIntention,EnumGrade,EnumGender,EnumIsSign,RenderBootstrapTable){
	ClientManage.module('StudentMgr.Index.List.View',function(View,ClientManage,Backbone, Marionette, $, _){
		View.StudentsView = Marionette.ItemView.extend({
			tagName:"div",
			className:"wrap",
			template: _.template(StudentsTpl),
			ui:{
				"tableStudentList":"table#StudentListTable"
			},
			onRender:function(){
				this.CollectionHelpers();
			},
			onShow:function(){
				this.renderBootstrapTable = new RenderBootstrapTable();
				this.renderBootstrapTable.RenderFromData(this.ui.tableStudentList,this.SetTableData(),this.SetTableColumns(),this.TableRenderCallback)
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
					{field: 'studentIsSign', title: '签约状态',
						formatter:function(value){
							if (!value) {
								return '-';
							}
							return EnumIsSign.IsSignInverse[value.IsSign];
						}
					},
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
								execArray.push('<a data-toggle="tooltip" title="销售版本无申请功能" class="btn btn-success btn-mini disabled">进入申请</a>')
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
			TableRenderCallback:function($table){
				var toolTipOption = {
					animation:true,
					html:false,
					placement:'right'
				};
				$table.find('[data-toggle="tooltip"]').tooltip(toolTipOption);
			}
		});
	});
	return ClientManage.StudentMgr.Index.List.View;
});
