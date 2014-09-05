/***************************************
 * Created by samhwang1990@gmail.com on 14-8-20.
 * StudentMgr/Apply/Syllabus Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('StudentMgr.Apply.Stages.Syllabus',function(Syllabus,ClientManage,Backbone, Marionette, $, _){
		Syllabus.Controller = {
			ShowSyllabus:function(contentRegion,arg){
				var parentStageNameEn = arg[0];
				var studentId = arg[1];
				ClientManage.startSubApp("StudentMgr.Apply.Stages.Syllabus");
				require([
					'apps/StudentMgr/Apply/Syllabus/syllabus_view',
					'models/StudentMgr/StudentApplyStageWrapModel']
					,function(SyllabusView,StudentApplyStageWrapModel){
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
									var stageSyllabusView = new SyllabusView.StageSyllabusView({
										model:stageWrapItem,
										StudentID:studentId
									})
									contentRegion.show(stageSyllabusView);
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
	return ClientManage.StudentMgr.Apply.Stages.Syllabus.Controller;
})
