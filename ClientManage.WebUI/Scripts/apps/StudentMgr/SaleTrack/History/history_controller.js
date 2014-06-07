/***************************************
 * Created by samhwang1990@gmail.com on 14-6-7.
 * StudentMgr/SaleTrack/SaleTrackHistory Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('StudentMgr.SaleTrack.SaleTrackHistory',function(List,ClientManage,Backbone, Marionette, $, _){
		List.Controller = {
			ShowList :function(contentRegion,studentID){
				ClientManage.startSubApp("StudentMgr.SaleTrack.SaleTrackHistory");
				require(['apps/StudentMgr/SaleTrack/History/history_view','models/StudentMgr/SaleTrack/SaleTrackHistoryModel'
				],function(ListView,SaleTrackHistoryModel){
					var saleTrackHistory = new SaleTrackHistoryModel({
						url:'StudentMgr/SaleTrack/GetSaleTrackHistory'
					});
					saleTrackHistory.fetch({
						data:{
							studentID:studentID
						},
						success:function(){
							var listView = new ListView.HistoryView({
								model:saleTrackHistory
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
	return ClientManage.StudentMgr.SaleTrack.SaleTrackHistory.Controller;
});