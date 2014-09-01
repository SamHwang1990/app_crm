/***************************************
 * Created by samhwang1990@gmail.com on 14-6-14.
 * RoleMgr/List View
 ***************************************/

define([
	'app',
	'text!templates/RoleMgr/List.html',
	'assets/TransformDateString',
	"BootstrapTable"
	],function(ClientManage,RoleListTpl,TransformDateString,BootstrapTable){
	ClientManage.module('RoleMgr.List.View',function(View,ClientManage,Backbone,Marionette,$,_){
		View.RoleListView = Marionette.ItemView.extend({
			tagName:"div",
			className:"wrap",
			template:_.template(RoleListTpl),
			ui:{
				"tableRoleList":"table#RoleListTable"
			},
			onShow:function(){
				this.RenderBootstrapTable();
			},
			SetTableColumns:function(){
				var columnColumns = [
					{field: 'RoleName', title: '角色名字', sortable: true},
					{field: 'RoleRemark', title: '角色备注'},
					{field: 'exec', title: '操作', formatter: function (value) {
						if (!value) {
							return '-';
						}
						var execArray = [];
						execArray.push('<a href="#RoleMgr/Edit-' +
							value.RoleID +
							'" title="' +
							value.RoleName +
							'">编辑</a>');

						return execArray.join('&emsp;');
					}}
				];
				return columnColumns;
			},
			SetTableData:function(){
				var tableData = [];
				_.each(this.collection.models,function(roleItem){
					var dataItem = {};

					dataItem["RoleName"] = roleItem.get("RoleName");
					dataItem["RoleRemark"] = roleItem.get("RoleRemark");

					dataItem["exec"] = {
						RoleID:roleItem.get("RoleID"),
						RoleName:roleItem.get("RoleName")
					}
					tableData.push(dataItem);
				})
				return tableData;
			},
			RenderBootstrapTable:function(){
				var listView = this;
				this.ui.tableRoleList.bootstrapTable({
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
	return ClientManage.RoleMgr.List.View;
})
