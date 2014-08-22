/***************************************
 * Created by samhwang1990@gmail.com on 14-8-21.
 * StudentMgr/Apply/Detail Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('StudentMgr.Apply.Stages.Detail',function(Detail,ClientManage,Backbone, Marionette, $, _){
		Detail.Controller = {
			ShowDetail:function(contentRegion,arg){
				var parentStageNameEn = arg[0];
				var currentChildNameEn = arg[1];
				var studentId = arg[2];
				ClientManage.startSubApp("StudentMgr.Apply.Stages.Detail");
				require([
					'apps/StudentMgr/Apply/Detail/detail_view',
					'models/StudentMgr/StudentApplyStageWrapModel']
					,function(DetailView,StudentApplyStageWrapModel){
						var stageWrapItem = new StudentApplyStageWrapModel({
							url:"/StudentMgr/Apply/Syllabus_StageWrap"
						});
						stageWrapItem.fetch({
							data:{
								studentID:studentId,
								parentNameEn:parentStageNameEn
							},
							success:function(data){
								if(data.GetResult !== undefined && data.GetResult === false){
									return alert(data.Msg);
								}
								else{
									var stageDetailView = new DetailView.StageDetailView({
										model:stageWrapItem,
										StudentID:studentId,
										CurrentChildNameEn:currentChildNameEn
									})
									contentRegion.show(stageDetailView);
								}
							},
							error:function(){
								alert("获取数据失败");
							}
						})
					})
			}
		}
	});
	return ClientManage.StudentMgr.Apply.Stages.Detail.Controller;
})
