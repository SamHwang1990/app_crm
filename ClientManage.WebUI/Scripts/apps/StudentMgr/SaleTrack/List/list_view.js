/***************************************
 * Created by samhwang1990@gmail.com on 14-6-5.
 * StudentMgr/SaleTrack/List View
 ***************************************/

define([
	'app',
	'text!templates/StudentMgr/SaleTrack/List.html',
	'models/StudentMgr/EnumModel/TrackIsComplete',
	'models/StudentMgr/EnumModel/IsSign',
	'assets/TransformDateString',
	"assets/RenderBootstrapTable"
	],function(ClientManage,SaleTrackListTpl,EnumTrackIsComplete,EnumIsSign,TransformDateString,RenderBootstrapTable){
	ClientManage.module('StudentMgr.SaleTrack.List.View',function(View,ClientManage,Backbone, Marionette, $, _){
		View.StudentTrackListView = Marionette.ItemView.extend({
			tagName:"div",
			className:"wrap",
			template: _.template(SaleTrackListTpl),
			ui:{
				"tableSaleTrack":"table#SaleTrackTable"
			},
			onRender:function(){
				this.CollectionHelpers();
				//this.RenderBootstrapTable();
			},
			onShow:function(){
				this.renderBootstrapTable = new RenderBootstrapTable();
				this.renderBootstrapTable.RenderFromData(this.ui.tableSaleTrack,this.SetTableData(),this.SetTableColumns(),this.TableRenderCallback)
			},
			CollectionHelpers:function(){
				var transDate = new TransformDateString();

				_.each(this.collection.models,function(trackItem){
					var saleTrackEntity = trackItem.get("CurrentSaleTrack");
					saleTrackEntity.IsComplete = EnumTrackIsComplete.TrackIsCompleteInverse[saleTrackEntity.IsComplete];
					saleTrackEntity.TrackDate = transDate.TransMsStringToDate(saleTrackEntity.TrackDate);

					var appRelation = trackItem.get("AppRelation");
					appRelation.IsSign = EnumIsSign.IsSignInverse[appRelation.IsSign];
				})
			},
			SetTableColumns:function(){
				var columnColumns = [
					{field: 'studentName', title: '名字', sortable: true},
					{field: 'stateName', title: '当前销售阶段',sortable: true},
					{field: 'stateIsComplete', title: '阶段进度'},
					{field: 'lastTrackDate', title: '最近跟踪日期', sortable:true},
					{field: 'saleConsultantName', title: '销售负责人', sortable:true},
					{field: 'studentFrom', title: '客户来源', sortable:true},
					{field: 'studentIsSign', title: '签约状态'},
					{field: 'exec', title: '操作', formatter: function (value) {
						if (!value) {
							return '-';
						}

						if(!ClientManage.CurrentUserPermission.get('IsSaleListEdit')){
							return '-';
						}

						var execArray = [];
						execArray.push('<a href="#StudentMgr/SaleTrack/FirstInterviewReg-' +
							value.StudentInfo.StudentID +
							'" title="' +
							value.StudentInfo.NameCn +
							'">初访登记表</a>');

						execArray.push('<a href="#StudentMgr/SaleTrack/SaleTrackHistory-' +
							value.StudentInfo.StudentID +
							'" title="' +
							value.StudentInfo.NameCn +
							'">历史销售记录</a>');

						if (value.AppRelation.IsSign == '已签约' ) {
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
				var reBuildFromData = function(fromDataList){
					if(!fromDataList){
						return '-';
					}

					var fromArray = [];
					_.each(fromDataList,function(fromItem){
						fromArray.push([fromItem.SourceName,fromItem.SourceDetailKeyword,fromItem.SourceDetailContent].join('-'));
					})
					return fromArray.join('、');
				}
				_.each(this.collection.models,function(trackItem){
					var dataItem = {};
					var studentInfo = trackItem.get("StudentInfo");
					var appRelation = trackItem.get("AppRelation");
					var currentTrackEntity = trackItem.get("CurrentSaleTrack");

					dataItem["studentName"] = studentInfo.NameCn
					dataItem["stateName"] = currentTrackEntity.StateName;
					dataItem["stateIsComplete"] = currentTrackEntity.IsComplete;
					dataItem["lastTrackDate"] = currentTrackEntity.TrackDate;
					dataItem["saleConsultantName"] = appRelation.SaleConsultantName;
					dataItem["studentFrom"] = reBuildFromData(trackItem.get("FromCollection"));
					dataItem["studentIsSign"] = appRelation.IsSign;
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
	return ClientManage.StudentMgr.SaleTrack.List.View;
})
