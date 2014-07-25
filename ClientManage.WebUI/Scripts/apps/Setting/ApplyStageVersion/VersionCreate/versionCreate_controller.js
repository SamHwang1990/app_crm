/***************************************
 * Created by samhwang1990@gmail.com on 14-7-25.
 * Setting/ApplyStageVersion/VersionCreate Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('Setting.ApplyStageVersion.VersionCreate',function(Create,ClientManage,Backbone, Marionette, $, _){
		Create.Controller = {
			ShowCreate:function(contentRegion){
				ClientManage.startSubApp("Setting.ApplyStageVersion.VersionCreate");
				require([
					'apps/Setting/ApplyStageVersion/VersionCreate/versionCreate_view',
					'models/Setting/ApplyStagesMgr/ApplyStageVersionModel']
					,function(EditView){
						var editView = new EditView.VersionCreateView();
						contentRegion.show(editView);
					})
			}
		}
	})
	return ClientManage.Setting.ApplyStageVersion.VersionCreate.Controller;
})
