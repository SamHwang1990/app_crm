/***************************************
 * Created by samhwang1990@gmail.com on 14-7-20.
 * Setting/ApplyStageVersion/VersionDetailEdit Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('Setting.ApplyStageVersion.VersionDetailEdit',function(Edit,ClientManage,Backbone, Marionette, $, _){
		Edit.Controller = {
			ShowEdit:function(contentRegion,versionID){
				ClientManage.startSubApp("Setting.ApplyStageVersion.VersionDetailEdit");
				require([
					'apps/Setting/ApplyStageVersion/VersionDetailEdit/versionDetailEdit_view',
					'collections/Setting/ApplyStagesMgr/VersionDetailWrapCollection']
					,function(VersionDetailEditView,VersionDetailWrapCollection){
						var versionDetailColl = new VersionDetailWrapCollection({
							url:"/Setting/ApplyStageVersion/GetVersionDetail"
						});
						versionDetailColl.fetch({
							data:{
								versionID:versionID
							},
							success:function(data){
								if(data === false){
									return alert("传入的版本ID不能为空");
								}
								else{
									var detailEditView = new VersionDetailEditView.VersionDetailEditView({
										collection:versionDetailColl,
										VersionID:versionID
									})
									contentRegion.show(detailEditView);
									ClientManage.vent.off("VersionDetailEditSuccess");
									ClientManage.vent.on("VersionDetailEditSuccess",function(){
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
	return ClientManage.Setting.ApplyStageVersion.VersionDetailEdit.Controller;
})
