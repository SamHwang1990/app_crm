/***************************************
 * Created by samhwang1990@gmail.com on 14-7-20.
 * StudentMgr Router API
 ***************************************/

define(['app'],function(ClientManage){
	var routerHandler = function(RouterAPI){
		/* region StudentMgr Index Router Controller*/
		RouterAPI.StudentMgrIndexList = function(){
			require(['apps/StudentMgr/Index/List/list_controller'],function(StudentMgrIndexListController){
				RouterAPI.executeAction(StudentMgrIndexListController.ShowList);
			})
		}
		RouterAPI.StudentMgrIndexCreate = function(){
			require(['apps/StudentMgr/Index/Create/create_controller'],function(StudentMgrIndexCreateController){
				RouterAPI.executeAction(StudentMgrIndexCreateController.ShowCreate);
			})
		}
		RouterAPI.StudentMgrIndexEditStudent = function(id){
			require(['apps/StudentMgr/Index/Edit/edit_controller'],function(StudentMgrIndexEditController){
				RouterAPI.executeAction(StudentMgrIndexEditController.EditStudent,id);
			})
		}
		RouterAPI.StudentMgrIndexEditContacts = function(id){
			require(['apps/StudentMgr/Index/Edit/edit_controller'],function(StudentMgrIndexEditController){
				RouterAPI.executeAction(StudentMgrIndexEditController.EditContacts,id);
			})
		}
		RouterAPI.StudentMgrAssignConsultant = function(id){
			require(['apps/StudentMgr/AssignConsultant/assign_controller'],function(StudentMgrAssignConsultantController){
				RouterAPI.executeAction(StudentMgrAssignConsultantController.AssignConsultant,id);
			})
		}
		RouterAPI.StudentMgrScheduleApply = function(id){
			require(['apps/StudentMgr/ScheduleApply/schedule_controller'],function(StudentMgrScheduleApplyController){
				RouterAPI.executeAction(StudentMgrScheduleApplyController.ShowSchedule,id);
			})
		}

		/*endregion*/

		/* region StudentMgr SaleTrack Router Controller*/
		RouterAPI.StudentMgrSaleTrackList = function(){
			require([
				'apps/StudentMgr/SaleTrack/List/list_controller'],
				function(StudentMgrSaleTrackListController){
					RouterAPI.executeAction(StudentMgrSaleTrackListController.ShowList);
				})
		}
		RouterAPI.StudentMgrSaleTrackAppInterview = function(id){
			require([
				'apps/StudentMgr/SaleTrack/Interview/interview_controller'],
				function(StudentMgrSaleTrackInterviewController){
					RouterAPI.executeAction(StudentMgrSaleTrackInterviewController.ShowInterview,id);
				})
		}
		RouterAPI.StudentMgrSaleTrackFirstInterviewReg = function(id){
			require([
				'apps/StudentMgr/SaleTrack/FirstInterviewReg/firstInterviewReg_controller'],
				function(StudentMgrSaleTrackFirstInterviewRegController){
					RouterAPI.executeAction(StudentMgrSaleTrackFirstInterviewRegController.ShowFirstInterviewReg,id);
				})
		}
		RouterAPI.StudentMgrSaleTrackSaleTrackHistory = function(id){'apps/StudentMgr/SaleTrack/History/history_controller'
			require([
				],
				function(StudentMgrSaleTrackHistoryController){
					RouterAPI.executeAction(StudentMgrSaleTrackHistoryController.ShowList,id);
				})
		}
		/* endregion*/

		/* region StudentMgr Apply Router Controller */
		RouterAPI.StudentMgrApplyIndex = function(id){
			require([
				'apps/StudentMgr/Apply/Index/index_controller'],
				function(StudentMgrApplyIndexController){
					RouterAPI.executeAction(StudentMgrApplyIndexController.ShowIndex,id);
				})
		}
		RouterAPI.StudentMgrApplyStagesSyllabus = function(parentStageNameEn,id){
			require([
				'apps/StudentMgr/Apply/Syllabus/syllabus_controller'],
				function(StudentMgrStageSyllabusController){
					RouterAPI.executeAction(StudentMgrStageSyllabusController.ShowSyllabus,[parentStageNameEn,id]);
				})
		}
		RouterAPI.StudentMgrApplyStagesResume = function(parentStageNameEn,id){

		}
		RouterAPI.StudentMgrApplyStagesDetail = function(parentStageNameEn,id){

		}
		/* endregion*/
	}
	return routerHandler;
})
