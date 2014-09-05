/***************************************
 * Created by samhwang1990@gmail.com on 14-8-18.
 * StudentMgrApplyIndex Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('StudentMgr.Apply.Index',function(Index,ClientManage,Backbone, Marionette, $, _){
		Index.Controller = {
			ShowIndex:function(contentRegion,studentId){
				ClientManage.startSubApp("StudentMgr.Apply.Index");
				require([
					'apps/StudentMgr/Apply/Index/index_view',
					'collections/StudentMgr/StudentApplyStageWrapCollection']
					,function(IndexView,StudentApplyStageWrapCollection){
						var stageWrapColl = new StudentApplyStageWrapCollection({
							url:"/StudentMgr/Apply/Index_StageWrapList"
						});
						stageWrapColl.fetch({
							data:{
								studentID:studentId
							},
							success:function(data){
								if(data.GetResult !== undefined && data.GetResult === false){
									return alert(data.Msg);
								}
								else{
									var applyIndexView = new IndexView.ApplyIndexView({
										collection:stageWrapColl,
										StudentID:studentId
									})
									contentRegion.show(applyIndexView);
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
	return ClientManage.StudentMgr.Apply.Index.Controller;
})

