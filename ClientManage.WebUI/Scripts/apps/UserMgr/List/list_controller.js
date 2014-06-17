/***************************************
 * Created by samhwang1990@gmail.com on 14-6-17.
 * UserMgr/List Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('UserMgr.List',function(List,ClientManage,Backbone, Marionette, $, _){
		List.Controller = {
			ShowList:function(contentRegion){
				ClientManage.startSubApp('UserMgr.List');
				require(['apps/UserMgr/List/list_view','collections/UserMgr/UserList'],function(ListView,UsersCol){
					var roles = new UsersCol();
					roles.fetch({
						success:function(){
							var listView = new ListView.UserListView({
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
	return ClientManage.UserMgr.List.Controller;
})
