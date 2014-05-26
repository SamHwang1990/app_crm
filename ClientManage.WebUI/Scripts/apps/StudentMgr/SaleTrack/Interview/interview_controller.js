/***************************************
 * Created by samhwang1990@gmail.com on 14-5-26.
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('StudentMgr.SaleTrack.Interview',function(Interview,ClientManage,Backbone, Marionette, $, _){
		Interview.Controller = {
			ShowFirstInterview :function(contentRegion,studentID){
				ClientManage.startSubApp("StudentMgr.SaleTrack.Interview");
				require([
					'apps/StudentMgr/SaleTrack/Interview/interview_view',
					'models/StudentMgr/SaleTrack/SaleTrackAjaxViewModel',
					'models/StudentMgr/SaleTrack/SaleTrackEntity',
					'collections/StudentMgr/SaleTrack/SaleTrackParticipant'
					]
					,function(InterviewView,SaleTrackModel,SaleTrackEntity,SaleTrackParticipants){
						var saleTrackAjaxViewModel = new SaleTrackModel({
							SaleTrackItem:new SaleTrackEntity,
							SaleTrackParticipant:new SaleTrackParticipants,
							url:"/StudentMgr/SaleTrack/GetInterviewData"
						});
						saleTrackAjaxViewModel.fetch({
							data:{
								studentID:studentID
							},
							success:function(){
								console.log("fetch interview data from server successfully!");
								var interviewView = new InterviewView.FirstInterviewView({
									model:saleTrackAjaxViewModel,
									StudentID:studentID
								});
								contentRegion.show(interviewView);
							},
							error:function(){
								console.log("failed to fetch interview data from server!")
							}
						})
					})
			}
		}
	});
	return ClientManage.StudentMgr.SaleTrack.Interview.Controller;
});