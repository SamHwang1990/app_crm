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
					'models/Setting/ApplyStagesMgr/ApplyStageVersionDetailWrapModel']
					,function(VersionDetailWrapModel){
						var versionDetailInfo = new VersionDetailWrapModel({
							url:"/Setting/ApplyStageVersion/GetVersionDetail"
						});
						versionDetailInfo.fetch({
							data:{
								versionID:versionID
							},
							success:function(data){
								if(data === false){
									return alert("传入的版本ID不能为空");
								}
								else{
									console.log(JSON.stringify(versionDetailInfo));
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
