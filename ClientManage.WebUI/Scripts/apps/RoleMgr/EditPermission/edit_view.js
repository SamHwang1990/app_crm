/***************************************
 * Created by samhwang1990@gmail.com on 14-11-5.
 * RoleMgr/EditPermission View
 ***************************************/

define([
	'app',
	'models/RoleMgr/RolePermissionValue',
	'text!templates/RoleMgr/EditPermission.html'
],function(ClientManage,RolePermissionModel,EditPermissionTpl){
	ClientManage.module('RoleMgr.EditPermission.View',function(View,ClientManage,Backbone,Marionette,$,_){
		View.PermissionEditView = Marionette.Layout.extend({
			template:_.template(EditPermissionTpl),
			tagName:"div",
			className:'wrap',
			ui:{
				'EditForm':'#editForm'
			},
			events:{
				'submit @ui.EditForm':'Submit'
			},
			onShow:function(){
				var that = this;
				var setting = {
					check: {
						enable: true
					},
					data: {
						simpleData: {
							enable: true
						}
					}
				};

				var zNodes =[
					{ id:1, pId:0, name:"允许管理系统信息",checked:that.model.get('IsManage')},

					{ id:2, pId:0, name:"允许查看学生列表", checked:that.model.get('IsStudentList'), open:true},
					{ id:21, pId:2, name:"允许查看所有学生",checked:that.model.get('IsStudentListAll')},
					{ id:22, pId:2, name:"允许编辑学生信息", checked:that.model.get('IsStudentListEdit')},

					{ id:3, pId:0, name:"允许查看销售列表", checked:that.model.get('IsSaleList'), open:true},
					{ id:31, pId:3, name:"允许查看所有销售信息",checked:that.model.get('IsSaleListAll')},
					{ id:32, pId:3, name:"允许编辑销售信息", checked:that.model.get('IsSaleListEdit')},

					{ id:4, pId:0, name:"允许查看申请列表", checked:that.model.get('IsApplyList'), open:true},
					{ id:41, pId:4, name:"允许查看所有申请信息",checked:that.model.get('IsApplyListAll')},
					{ id:42, pId:4, name:"允许编辑申请信息", checked:that.model.get('IsApplyListEdit')}
				];

				$.fn.zTree.init($('#permissionTree'), setting, zNodes);
			},
			Submit:function(event){
				event.preventDefault();
				var permissionTree = $.fn.zTree.getZTreeObj("permissionTree");
				var treeNodes = permissionTree.getNodes();
				console.log(treeNodes);

				var isManage = permissionTree.getNodeByParam('id','1',null).checked;

				var isStudentList = permissionTree.getNodeByParam('id','2',null).checked;
				var isStudentListAll = permissionTree.getNodeByParam('id','21',null).checked;
				var isStudentListEdit = permissionTree.getNodeByParam('id','22',null).checked;

				var isSaleList = permissionTree.getNodeByParam('id','3',null).checked;
				var isSaleListAll = permissionTree.getNodeByParam('id','31',null).checked;
				var isSaleListEdit = permissionTree.getNodeByParam('id','32',null).checked;

				var isApplyList = permissionTree.getNodeByParam('id','4',null).checked;
				var isApplyListAll = permissionTree.getNodeByParam('id','41',null).checked;
				var isApplyListEdit = permissionTree.getNodeByParam('id','42',null).checked;

				this.model.set('IsManage',isManage);

				this.model.set('IsStudentList',isStudentList);
				this.model.set('IsStudentListAll',isStudentListAll);
				this.model.set('IsStudentListEdit',isStudentListEdit);

				this.model.set('IsSaleList',isSaleList);
				this.model.set('IsSaleListAll',isSaleListAll);
				this.model.set('IsSaleListEdit',isSaleListEdit);

				this.model.set('IsApplyList',isApplyList);
				this.model.set('IsApplyListAll',isApplyListAll);
				this.model.set('IsApplyListEdit',isApplyListEdit);

				var postUrl = this.ui.EditForm.attr('action');
				var ajaxData = JSON.stringify(this.model);
				$.ajax({
					type:'POST',
					url:postUrl,
					data:ajaxData,
					dataType:'json',
					contentType: 'application/json; charset=utf-8',
					success:function(data){
						if(data.SaveResult == true){
							ClientManage.navigate("RoleMgr/List",{trigger:true});
						}else{
							alert('Post Failed');
						}
					},
					error:function(data){
						alert('提交数据失败');
					}
				})

			}
		})
	});
	return ClientManage.RoleMgr.EditPermission.View;
})
