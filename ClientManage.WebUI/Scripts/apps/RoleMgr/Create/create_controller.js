/***************************************
 * Created by samhwang1990@gmail.com on 14-6-16.
 * RoleMgr/Create Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('RoleMgr.Create',function(Create,ClientManage,Backbone, Marionette, $, _){
		Create.Controller = {
			ShowCreate:function(contentRegion){
				ClientManage.startSubApp("RoleMgr.Create");
				require([
					'apps/RoleMgr/Create/create_view',
					'models/RoleMgr/RoleInfo']
					,function(CreateView,RoleInfoModel){
						var roleInfo = new RoleInfoModel;
						var createView = new CreateView.RoleCreateView({
							model:roleInfo
						});
						contentRegion.show(createView);
					})
			}
		}
	});
	return ClientManage.RoleMgr.Create.Controller;
})