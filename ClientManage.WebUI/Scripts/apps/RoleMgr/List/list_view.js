/***************************************
 * Created by samhwang1990@gmail.com on 14-6-14.
 * RoleMgr/List View
 ***************************************/

define([
	'app',
	'text!templates/RoleMgr/List.html',
	'assets/TransformDateString',
	"assets/RenderBootstrapTable"
	],function(ClientManage,RoleListTpl,TransformDateString,RenderBootstrapTable){
	ClientManage.module('RoleMgr.List.View',function(View,ClientManage,Backbone,Marionette,$,_){
		View.RoleListView = Marionette.ItemView.extend({
			tagName:"div",
			className:"wrap",
			template:_.template(RoleListTpl),
			ui:{
				"tableRoleList":"table#RoleListTable"
			},
			onShow:function(){
				this.renderBootstrapTable = new RenderBootstrapTable();
				this.renderBootstrapTable.RenderFromData(this.ui.tableRoleList,this.SetTableData(),this.SetTableColumns())
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
							'">修改角色信息</a>');

						execArray.push('<a href="#RoleMgr/EditPermission-' +
							value.RoleID +
							'" title="' +
							value.RoleName +
							'">修改角色权限</a>');

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
			}
		})
	});
	return ClientManage.RoleMgr.List.View;
})
