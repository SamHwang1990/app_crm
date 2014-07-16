/***************************************
 * Created by samhwang1990@gmail.com on 14-7-16.
 * Setting/ApplyStageVersion/VersionList Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('Setting.ApplyStageVersion.VersionList',function(List,ClientManage,Backbone, Marionette, $, _){
		List.Controller = {
			ShowList:function(contentRegion){
				ClientManage.startSubApp('Setting.ApplyStageVersion.VersionList');
				require([
					'apps/Setting/ApplyStageVersion/VersionList/versionList_view',
					'collections/Setting/ApplyStagesMgr/VersionCollection'],
					function(ListView,VersionsCol){
					var versions = new VersionsCol();
						versions.fetch({
						success:function(){
							var listView = new ListView.VersionListView({
								collection:versions
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
	return ClientManage.Setting.ApplyStageVersion.VersionList.Controller;
})
