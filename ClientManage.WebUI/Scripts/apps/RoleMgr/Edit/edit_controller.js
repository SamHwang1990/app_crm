/***************************************
 * Created by samhwang1990@gmail.com on 14-6-16.
 * RoleMgr/Edit Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('RoleMgr.Edit',function(Edit,ClientManage,Backbone, Marionette, $, _){
		Edit.Controller = {
			ShowEdit:function(contentRegion,roleID){
				ClientManage.startSubApp("RoleMgr.Create");
				require([
					'apps/RoleMgr/Create/create_view',
					'models/RoleMgr/RoleInfo']
					,function(CreateView,RoleInfoModel){
						var roleInfo = new RoleInfoModel({
							url:"/RoleMgr/Edit"
						});
						roleInfo.fetch({
							data:{
								roleID:roleID
							},
							success:function(data){
								if(data === false){
									return alert("传入的角色ID不能为空");
								}
								else{
									var createView = new CreateView.RoleCreateView({
										model:roleInfo
									});
									contentRegion.show(createView);
								}
							},
							error:function(){
								alert("获取数据失败");
							}
						})

					})
			}
		}
	});
	return ClientManage.RoleMgr.Edit.Controller;
})
