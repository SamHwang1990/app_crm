/***************************************
 * Created by samhwang1990@gmail.com on 14-9-2.
 * Setting/StudentSource Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('Setting.StudentSource.List',function(List,ClientManage,Backbone, Marionette, $, _){
		List.Controller = {
			ShowList:function(contentRegion){
				ClientManage.startSubApp('Setting.StudentSource.List');
				require([
					'apps/Setting/StudentSource/List/list_view',
					'collections/StudentMgr/SaleTrack/StudentSourceCollection'],
					function(ListView,SourceCol){
						var sources = new SourceCol({
							url:'Setting/StudentSource/List'
						});
						sources.fetch({
							success:function(){
								var listView = new ListView.SourceListView({
									collection:sources
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
	return ClientManage.Setting.StudentSource.List.Controller;
})

