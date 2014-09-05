/***************************************
 * Created by samhwang1990@gmail.com on 14-7-28.
 * StudentMgr/ScheduleApply Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('StudentMgr.ScheduleApply',function(ScheduleApply,ClientManage,Backbone, Marionette, $, _){
		ScheduleApply.Controller = {
			ShowSchedule:function(contentRegion,studentID){
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
								studentID:studentID
							},
							success:function(data){
								if(data.GetResult !== undefined && data.GetResult === false){
									return alert(data.Msg);
								}
								else{
									var scheduleApplyView = new ScheduleApplyView.ScheduleView({
										collection:scheduleColl,
										StudentID:studentID
									})
									contentRegion.show(scheduleApplyView);
									ClientManage.vent.off("ScheduleApplySuccess");
									ClientManage.vent.on("ScheduleApplySuccess",function(){
										ClientManage.navigate("StudentMgr/Index/List",{trigger:true});
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
	return ClientManage.StudentMgr.ScheduleApply.Controller;
})
