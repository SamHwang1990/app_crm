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
					'apps/StudentMgr/Apply/Index/index_view']
					,function(IndexView){
						contentRegion.show(new IndexView.ApplyIndexView)
					})
			}
		}
	});
	return ClientManage.StudentMgr.Apply.Index.Controller;
})

