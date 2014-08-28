/***************************************
 * Created by samhwang1990@gmail.com on 14-6-5.
 * StudentMgr/SaleTrack/List View
 ***************************************/

define([
	'app',
	'text!templates/StudentMgr/SaleTrack/SaleTrackItem.html',
	'text!templates/StudentMgr/SaleTrack/List.html',
	'models/StudentMgr/EnumModel/TrackIsComplete',
	'models/StudentMgr/EnumModel/IsSign',
	'assets/TransformDateString',
	"BootstrapTable"
	],function(ClientManage,SaleTrackItemTpl,SaleTrackListTpl,EnumTrackIsComplete,EnumIsSign,BootstrapTable){
	ClientManage.module('StudentMgr.SaleTrack.List.View',function(View,ClientManage,Backbone, Marionette, $, _){
		View.SaleTrackItemView = Marionette.ItemView.extend({
			template:_.template(SaleTrackItemTpl),
			tagName:"tr",
			templateHelpers:function(){
				var saleTrackEntity = this.model.get("CurrentSaleTrack");
				saleTrackEntity.IsComplete = EnumTrackIsComplete.TrackIsCompleteInverse[saleTrackEntity.IsComplete];

				var appRelation = this.model.get("AppRelation");
				appRelation.IsSign = EnumIsSign.IsSignInverse[appRelation.IsSign];
				return {
					StudentInfo:this.model.get("StudentInfo"),
					AppRelation:appRelation,
					SaleTrackEntity:saleTrackEntity
				}
			}
		});

		View.StudentTrackListView = Marionette.ItemView.extend({
			tagName:"div",
			className:"wrap",
			template: _.template(SaleTrackListTpl),
			/*itemView:View.SaleTrackItemView,
			itemViewContainer: "tbody",*/
			/*initialize:function(){
			 _.bindAll(this,'SortCommit');
			 },*/
			ui:{
				"formSearch":".form-search",                //form 元素
				"conditionCurrent":".condition-current",    //当前分类元素
				"conditionList":".condition-list",          //分类列表
				"searchContent":".search-content",          //筛选内容元素
				"btnSubmit":"button[type=submit]",          //submit 按钮
				"tableSaleTrack":"table.SaleTrackTable"
			},
			events:{
				'click @ui.conditionList a':'ConditionSortChange',      //搜索框交互
				'submit':'SortCommit'
			},
			onRender:function(){
				this.CollectionHelpers();
				//this.RenderBootstrapTable();
			},
			onShow:function(){
				this.RenderBootstrapTable();
			},
			ConditionSortChange:function(event){
				event.preventDefault();
				var sortName = event.target.text;                       //获取分类名字
				this.ui.conditionCurrent.html(sortName);                //修改当前分类显示
				if($(event.target).hasClass('condition-all')){          //修改“全部分类”
					this.ui.searchContent.attr('disabled','disabled');           //禁用输入框
					this.ui.searchContent.val("");
					this.ui.searchContent.attr('placeholder','全部无需筛选');     //修改placeholder
					this.ui.formSearch.trigger("submit");
				}
				else if($(event.target).hasClass('condition-HasSign') || $(event.target).hasClass('condition-NoSign')){
					this.ui.searchContent.attr('disabled','disabled');           //禁用输入框
					this.ui.searchContent.attr('placeholder','全部无需筛选');     //修改placeholder
					this.ui.searchContent.val("");
					this.ui.formSearch.trigger("submit");
				}
				else{
					this.ui.searchContent.removeAttr('disabled');
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
						},
						error:function(){
							console.log("fetch data from server failed");
							return alert("获取数据失败");
						}
					})
				}
				else{
					this.collection.fetch({
						data:{
							sort:condition,
							keyword:searchContent
						},
						success:function(){
							console.log("fetche data from server successfully");

						},
						error:function(){
							console.log("fetch data from server failed");
							return alert("获取数据失败");
						}
					})
				}
			},
			CollectionHelpers:function(){
				_.each(this.collection.models,function(trackItem){
					var saleTrackEntity = trackItem.get("CurrentSaleTrack");
					saleTrackEntity.IsComplete = EnumTrackIsComplete.TrackIsCompleteInverse[saleTrackEntity.IsComplete];

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
					{field: 'studentIsSign', title: '签约状态'},
					{field: 'exec', title: '操作', formatter: function (value) {
						if (!value) {
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
					dataItem["studentIsSign"] = appRelation.IsSign;
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
				this.$el.find("table.SaleTrackTable").bootstrapTable({
					data:listView.SetTableData(),
					columns:listView.SetTableColumns(),
					height: 600,
					striped: true,
					pagination: true,
					sidePagination:"client",
					pageSize: 10,
					pageList: [10, 25, 50, 100, 200],
					search: true,
					showColumns: true,
					showRefresh: true,
					showToggle:true,
					minimumCountColumns: 2
				})
			}
		});
	});
	return ClientManage.StudentMgr.SaleTrack.List.View;
})
