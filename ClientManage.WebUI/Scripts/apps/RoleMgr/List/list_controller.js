/***************************************
 * Created by samhwang1990@gmail.com on 14-6-14.
 * RoleMgr/List Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('RoleMgr.List',function(List,ClientManage,Backbone, Marionette, $, _){
		List.Controller = {
			ShowList:function(contentRegion){
				ClientManage.startSubApp('RoleMgr.List');
				require(['apps/RoleMgr/List/list_view','collections/RoleMgr/RoleList'],function(ListView,RolesCol){
					var roles = new RolesCol();
					roles.fetch({
						success:function(){
							var listView = new ListView.RoleListView({
								collection:roles
							});
							contentRegion.show(listView);
						},
						error:function(){
							console.log('fetch data from server failed');
							alert('获取数据失败');
						}
					});
				})
			}
		}
	});
	return ClientManage.RoleMgr.List.Controller;
})