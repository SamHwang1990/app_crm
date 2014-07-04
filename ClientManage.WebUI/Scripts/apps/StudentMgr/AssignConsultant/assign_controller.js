/***************************************
 * Created by samhwang1990@gmail.com on 14-7-4.
 ***************************************/
define(['app'],function(ClientManage){
	ClientManage.module('StudentMgr.AssignConsultant',function(AssignConsultant,ClientManage,Backbone, Marionette, $, _){
		AssignConsultant.Controller = {
			AssignConsultant :function(contentRegion,studentID){
				ClientManage.startSubApp("StudentMgr.AssignConsultant");
				require([
					'apps/StudentMgr/AssignConsultant/assign_view'
				]
					,function(AssignConsultantView){
						var assignView = new AssignConsultantView.AssignView({
							StudentID:studentID
						});
						contentRegion.show(assignView);
					})
			}
		}
	});
	return ClientManage.StudentMgr.AssignConsultant.Controller;
});
