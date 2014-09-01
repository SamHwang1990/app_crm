/***************************************
 * Created by samhwang1990@gmail.com on 14-6-17.
 * UserMgr/List View
 ***************************************/

define([
	'app',
	'text!templates/UserMgr/List.html',
	'assets/TransformDateString',
	"BootstrapTable"
	],function(ClientManage,UserListTpl,TransformDateString,BootstrapTable){
	ClientManage.module('UserMgr.List.View',function(View,ClientManage,Backbone,Marionette,$,_){
		View.UserListView = Marionette.ItemView.extend({
			tagName:"div",
			className:"wrap",
			template:_.template(UserListTpl),
			ui:{
				"tableUserList":"table#UserListTable"
			},
			initialize:function(){
				this.CollectionHelpers();
			},
			onShow:function(){
				this.RenderBootstrapTable();
			},
			CollectionHelpers:function(){
				var listView = this;
				this.transformDateString = new TransformDateString();
				_.each(this.collection.models,function(userItem){
					userItem.set('IsForSaleTrack',userItem.get('IsForSaleTrack')?'是':'否');
					userItem.set("LastLoginTime",listView.transformDateString.TransMsStringToDate(userItem.get("LastLoginTime")));
				})
			},
			SetTableColumns:function(){
				var columnColumns = [
					{field: 'userName', title: '用户名字', sortable: true},
					{field: 'userRoleName', title: '主角色',sortable: true},
					{field: 'userSecondRoleName', title: '辅助角色',sortable: true},
					{field: 'email', title: '邮箱', sortable: true},
					{field: 'mobile', title: '电话', sortable: true},
					{field: 'isForSaleTrack', title: '是否负责销售', sortable:true},
					{field: 'lastLoginDate', title: '上次登录时间', sortable:true},
					{field: 'exec', title: '操作', formatter: function (value) {
						if (!value) {
							return '-';
						}
						var execArray = [];
						execArray.push('<a href="#UserMgr/Edit-' +
							value.UserID +
							'" title="' +
							value.UserNameCn +
							'">编辑</a>');

						return execArray.join('&emsp;');
					}}
				];
				return columnColumns;
			},
			SetTableData:function(){
				var tableData = [];
				_.each(this.collection.models,function(userItem){
					var dataItem = {};

					dataItem["userName"] = userItem.get("UserNameCn");
					dataItem["userRoleName"] = userItem.get("UserRoleName");
					dataItem["userSecondRoleName"] = userItem.get("UserSecondRoleName");
					dataItem["email"] = userItem.get("Email");
					dataItem["mobile"] = userItem.get("Mobile");
					dataItem["isForSaleTrack"] = userItem.get("IsForSaleTrack");
					dataItem["lastLoginDate"] = userItem.get("LastLoginTime");

					dataItem["exec"] = {
						UserID:userItem.get("UserID"),
						UserNameCn:userItem.get("UserNameCn")
					}
					tableData.push(dataItem);
				})
				return tableData;
			},
			RenderBootstrapTable:function(){
				var listView = this;
				this.ui.tableUserList.bootstrapTable({
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
					},
					formatNoMatches:function(){
						return '没有找到符合条件的记录！'
					}
				});
			}
		})
	});
	return ClientManage.UserMgr.List.View;
})
