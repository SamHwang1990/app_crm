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
					'apps/StudentMgr/Index/Create/create_view',
					'models/StudentMgr/Index/StudentCreate',
					'collections/StudentMgr/SaleTrack/StudentSourceCollection']
					,function(CreateView,StudentCreateModel,StudentSourceCollection){
						var studentSourceList = new StudentSourceCollection({
							url:"StudentMgr/SaleTrack/GetAjaxStudentSourceList"
						});
						studentSourceList.fetch({
							success:function(){
								var studentCreateModel = new StudentCreateModel();
								var createView = new CreateView.StudentCreateView({
									model:studentCreateModel,
									StudentSourceList:studentSourceList
								});
								contentRegion.show(createView);
							}
					});

				})
			}
		}
	});
	return ClientManage.StudentMgr.Index.Create.Controller;
});
