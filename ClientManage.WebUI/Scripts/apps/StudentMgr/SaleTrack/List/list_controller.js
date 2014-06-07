/***************************************
 * Created by samhwang1990@gmail.com on 14-6-5.
 * StudentMgr/SaleTrack/List Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('StudentMgr.SaleTrack.List',function(List,ClientManage,Backbone, Marionette, $, _){
		List.Controller = {
			ShowList :function(contentRegion){
				ClientManage.startSubApp("StudentMgr.SaleTrack.List");
				require(['apps/StudentMgr/SaleTrack/List/list_view','collections/StudentMgr/SaleTrack/SaleTrackList'],function(ListView,SaleTrackCol){
					var saleTrackList = new SaleTrackCol();
					saleTrackList.fetch({
						success:function(){
							var listView = new ListView.StudentsView({
								collection:saleTrackList
							});
							contentRegion.show(listView);
						},
						error:function(){
							console.log("fetch data from server failed");
							alert("获取数据失败")
						}
					});
				})
			}
		}
	});
	return ClientManage.StudentMgr.SaleTrack.List.Controller;
});