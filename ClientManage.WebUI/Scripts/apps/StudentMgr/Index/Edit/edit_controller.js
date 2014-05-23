/***************************************
 * Created by samhwang1990@gmail.com on 14-5-19.
 * StudentMgr Index Edit Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('StudentMgr.Index.Edit',function(Edit,ClientManage,Backbone, Marionette, $, _){
		Edit.Controller = {
			EditStudent:function(contentRegion,studentID){
				ClientManage.startSubApp("StudentMgr.Index.Edit");
				require([
					'apps/StudentMgr/Index/Edit/edit_view',
					'models/StudentMgr/StudentInfoViewModel'],
					function(EditView, StudentInfoViewModel){
						var studentInfoViewModel = new StudentInfoViewModel({
							url:"/StudentMgr/Index/GetStudentInfoViewModel"
						})
						studentInfoViewModel.fetch({
							data:{
								studentID:studentID
							},
							success:function(){
								var editStudentView = new EditView.EditStudentView({
									model:studentInfoViewModel
								})
								contentRegion.show(editStudentView);
							},
							error:function(){
								console.log("fetch StudentInfo, AppRelation failed!");
							}
						})

					})
			},
			EditContacts:function(contentRegion,studentID){
				ClientManage.startSubApp("StudentMgr.Index.Edit");
			}
		}
	});
	return ClientManage.StudentMgr.Index.Edit.Controller;
})
