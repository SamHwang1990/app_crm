/***************************************
 * Created by samhwang1990@gmail.com on 14-7-20.
 * StudentMgr Router API
 ***************************************/

define(['app'],function(ClientManage){
	var routerHandler = function(RouterAPI){
		var userPermission = ClientManage.CurrentUserPermission;

		/* region StudentMgr Index Router Controller*/
		RouterAPI.StudentMgrIndexList = function(){
			if(!ClientManage.CurrentUserPermission.get('IsStudentList'))
				return RouterAPI.renderProhibit();

			require(['apps/StudentMgr/Index/List/list_controller'],function(StudentMgrIndexListController){
				RouterAPI.executeAction(StudentMgrIndexListController.ShowList);
			})
		}
		RouterAPI.StudentMgrIndexCreate = function(){
			if(!ClientManage.CurrentUserPermission.get('IsStudentList') || !ClientManage.CurrentUserPermission.get('IsStudentListEdit'))
				return RouterAPI.renderProhibit();

			require(['apps/StudentMgr/Index/Create/create_controller'],function(StudentMgrIndexCreateController){
				RouterAPI.executeAction(StudentMgrIndexCreateController.ShowCreate);
			})
		}
		RouterAPI.StudentMgrIndexEditStudent = function(id){
			if(!ClientManage.CurrentUserPermission.get('IsStudentList') || !ClientManage.CurrentUserPermission.get('IsStudentListEdit'))
				return RouterAPI.renderProhibit();

			require(['apps/StudentMgr/Index/Edit/edit_controller'],function(StudentMgrIndexEditController){
				RouterAPI.executeAction(StudentMgrIndexEditController.EditStudent,id);
			})
		}
		RouterAPI.StudentMgrIndexEditContacts = function(id){
			if(!ClientManage.CurrentUserPermission.get('IsStudentList') || !ClientManage.CurrentUserPermission.get('IsStudentListEdit'))
				return RouterAPI.renderProhibit();

			require(['apps/StudentMgr/Index/Edit/edit_controller'],function(StudentMgrIndexEditController){
				RouterAPI.executeAction(StudentMgrIndexEditController.EditContacts,id);
			})
		}
		RouterAPI.StudentMgrAssignConsultant = function(id){
			if(!ClientManage.CurrentUserPermission.get('IsStudentList') || !ClientManage.CurrentUserPermission.get('IsStudentListEdit'))
				return RouterAPI.renderProhibit();

			require(['apps/StudentMgr/AssignConsultant/assign_controller'],function(StudentMgrAssignConsultantController){
				RouterAPI.executeAction(StudentMgrAssignConsultantController.AssignConsultant,id);
			})
		}
		RouterAPI.StudentMgrScheduleApply = function(id){
			if(!ClientManage.CurrentUserPermission.get('IsStudentList') || !ClientManage.CurrentUserPermission.get('IsStudentListEdit'))
				return RouterAPI.renderProhibit();

			require(['apps/StudentMgr/ScheduleApply/schedule_controller'],function(StudentMgrScheduleApplyController){
				RouterAPI.executeAction(StudentMgrScheduleApplyController.ShowSchedule,id);
			})
		}

		/*endregion*/

		/* region StudentMgr SaleTrack Router Controller*/
		RouterAPI.StudentMgrSaleTrackList = function(){
			if(!ClientManage.CurrentUserPermission.get('IsSaleList'))
				return RouterAPI.renderProhibit();

			require([
				'apps/StudentMgr/SaleTrack/List/list_controller'],
				function(StudentMgrSaleTrackListController){
					RouterAPI.executeAction(StudentMgrSaleTrackListController.ShowList);
				})
		}
		RouterAPI.StudentMgrSaleTrackAppInterview = function(id){
			if(!ClientManage.CurrentUserPermission.get('IsSaleList') || !ClientManage.CurrentUserPermission.get('IsSaleListEdit'))
				return RouterAPI.renderProhibit();

			require([
				'apps/StudentMgr/SaleTrack/Interview/interview_controller'],
				function(StudentMgrSaleTrackInterviewController){
					RouterAPI.executeAction(StudentMgrSaleTrackInterviewController.ShowInterview,id);
				})
		}
		RouterAPI.StudentMgrSaleTrackFirstInterviewReg = function(id){
			if(!ClientManage.CurrentUserPermission.get('IsSaleList') || !ClientManage.CurrentUserPermission.get('IsSaleListEdit'))
				return RouterAPI.renderProhibit();

			require([
				'apps/StudentMgr/SaleTrack/FirstInterviewReg/firstInterviewReg_controller'],
				function(StudentMgrSaleTrackFirstInterviewRegController){
					RouterAPI.executeAction(StudentMgrSaleTrackFirstInterviewRegController.ShowFirstInterviewReg,id);
				})
		}
		RouterAPI.StudentMgrSaleTrackSaleTrackHistory = function(id){
			if(!ClientManage.CurrentUserPermission.get('IsSaleList'))
				return RouterAPI.renderProhibit();

			require([
				'apps/StudentMgr/SaleTrack/History/history_controller'
				],
				function(StudentMgrSaleTrackHistoryController){
					RouterAPI.executeAction(StudentMgrSaleTrackHistoryController.ShowList,id);
				})
		}
		/* endregion*/

		/* region StudentMgr Apply Router Controller */
		RouterAPI.StudentMgrApplyIndex = function(id){
			if(!ClientManage.CurrentUserPermission.get('IsApplyListEdit'))
				return RouterAPI.renderProhibit();

			require([
				'apps/StudentMgr/Apply/Index/index_controller'],
				function(StudentMgrApplyIndexController){
					RouterAPI.executeAction(StudentMgrApplyIndexController.ShowIndex,id);
				})
		}
		RouterAPI.StudentMgrApplyStagesSyllabus = function(parentStageNameEn,id){
			if(!ClientManage.CurrentUserPermission.get('IsApplyListEdit'))
				return RouterAPI.renderProhibit();

			require([
				'apps/StudentMgr/Apply/Syllabus/syllabus_controller'],
				function(StudentMgrStageSyllabusController){
					RouterAPI.executeAction(StudentMgrStageSyllabusController.ShowSyllabus,[parentStageNameEn,id]);
				})
		}
		RouterAPI.StudentMgrApplyStagesResume = function(parentStageNameEn,id){
			if(!ClientManage.CurrentUserPermission.get('IsApplyListEdit'))
				return RouterAPI.renderProhibit();

			require([
				'apps/StudentMgr/Apply/Resume/resume_controller'],
				function(StudentMgrStageResumeController){
					RouterAPI.executeAction(StudentMgrStageResumeController.ResumeRedirect,[parentStageNameEn,id]);
				})
		}
		RouterAPI.StudentMgrApplyStagesDetail = function(parentStageNameEn,stageEn,id){
			if(!ClientManage.CurrentUserPermission.get('IsApplyListEdit'))
				return RouterAPI.renderProhibit();

			require([
				'apps/StudentMgr/Apply/Detail/detail_controller'],
				function(StudentMgrStageDetailController){
					RouterAPI.executeAction(StudentMgrStageDetailController.ShowDetail,[parentStageNameEn,stageEn,id]);
				})
		}
		/* endregion*/
	}
	return routerHandler;
})
