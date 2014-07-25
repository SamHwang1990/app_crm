/***************************************
 * Created by samhwang1990@gmail.com on 14-7-16.
 * Setting/ApplyStageVersion/VersionEdit Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('Setting.ApplyStageVersion.VersionEdit',function(Edit,ClientManage,Backbone, Marionette, $, _){
		Edit.Controller = {
			ShowEdit:function(contentRegion,versionID){
				ClientManage.startSubApp("Setting.ApplyStageVersion.VersionEdit");
				require([
					'apps/Setting/ApplyStageVersion/VersionEdit/versionEdit_view',
					'models/Setting/ApplyStagesMgr/ApplyStageVersionModel']
					,function(EditView,VersionModel){
						var versionInfo = new VersionModel({
							url:"/Setting/ApplyStageVersion/GetVersionById"
						});
						versionInfo.fetch({
							data:{
								versionID:versionID
							},
							success:function(data){
								if(data === false){
									return alert("传入的版本ID不能为空");
								}
								else{
									var editView = new EditView.VersionEditView({
										model:versionInfo
									});
									contentRegion.show(editView);
									ClientManage.vent.off("VersionEditSuccess");
									ClientManage.vent.on("VersionEditSuccess",function(){
										ClientManage.navigate("Setting/ApplyStageVersion/List",{trigger:true});
									})
								}
							},
							error:function(){
								alert("获取数据失败");
							}
						})

					})
			}
		}
	})
	return ClientManage.Setting.ApplyStageVersion.VersionEdit.Controller;
})