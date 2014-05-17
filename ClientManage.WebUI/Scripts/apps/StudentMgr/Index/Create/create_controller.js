/***************************************
 * Created by samhwang1990@gmail.com on 14-5-14.
 * StudentMgr/Index/Create Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('StudentMgr.Index.Create',function(Create,ClientManage,Backbone, Marionette, $, _){
		Create.Controller = {
			ShowCreate :function(contentRegion){
				ClientManage.startSubApp("StudentMgr.Index.Create");
				require([
					'apps/StudentMgr/Index/Create/create_view','models/StudentMgr/Index/StudentCreate']
					,function(CreateView,StudentCreateModel){
						var studentCreateModel = new StudentCreateModel();
						var createView = new CreateView.StudentCreateView({
							model:studentCreateModel
					});
					contentRegion.show(createView);
				})
			}
		}
	});
	return ClientManage.StudentMgr.Index.Create.Controller;
});
