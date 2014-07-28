/***************************************
 * Created by samhwang1990@gmail.com on 14-7-28.
 * StudentMgr/ScheduleApply Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('StudentMgr.ScheduleApply',function(ScheduleApply,ClientManage,Backbone, Marionette, $, _){
		ScheduleApply.Controller = {
			ShowSchedule:function(contentRegion,versionID){
				ClientManage.startSubApp("StudentMgr.ScheduleApply");
				require([
					'apps/StudentMgr/ScheduleApply/schedule_view',
					'collections/StudentMgr/StudentApplyStageWrapCollection']
					,function(ScheduleApplyView,StudentApplyStageWrapCollection){
						var scheduleColl = new StudentApplyStageWrapCollection({
							url:"/StudentMgr/Index/GetScheduleApply"
						});
						scheduleColl.fetch({
							data:{
								versionID:versionID
							},
							success:function(data){
								if(data.GetResult === false){
									return alert(data.Msg);
								}
								else{
									/*var detailEditView = new VersionDetailEditView.VersionDetailEditView({
										collection:versionDetailColl,
										VersionID:versionID
									})
									contentRegion.show(detailEditView);*/
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
	return ClientManage.StudentMgr.ScheduleApply.Controller;
})
