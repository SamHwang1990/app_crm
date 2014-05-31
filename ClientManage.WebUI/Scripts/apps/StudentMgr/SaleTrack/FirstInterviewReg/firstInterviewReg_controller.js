/***************************************
 * Created by samhwang1990@gmail.com on 14-5-30.
 * StudentMgr/SaleTrack/FirstInterviewReg Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('StudentMgr.SaleTrack.FirstInterviewReg',function(FirstInterviewReg,ClientManage,Backbone, Marionette, $, _){
		FirstInterviewReg.Controller = {
			ShowFirstInterviewReg : function(contentRegion,studentID){
				ClientManage.startSubApp("StudentMgr.SaleTrack.FirstInterviewReg");
				require([
					'apps/StudentMgr/SaleTrack/FirstInterviewReg/firstInterviewReg_view',
					'models/StudentMgr/SaleTrack/FirstInterviewRegModel',
					'models/StudentMgr/ExamResult/ExamResultModels',
					'models/StudentMgr/StudentInfo',
					'models/StudentMgr/AppRelation',
					'models/StudentMgr/SaleTrack/StudentTPInfoModel',
					'collections/StudentMgr/SaleTrack/StudentFromCollection',
					'collections/StudentMgr/SaleTrack/StudentSourceCollection'
					],function(FirstInterviewRegView,
				               FirstInterviewRegModel,
				               ExamResultModels,
				               StudentInfoModel,
				               AppRelationModel,
				               StudentTPInfoModel,
				               StudentFromCollection,
				               StudentSourceCollection)
					{
						var firstInterviewRegModel = new FirstInterviewRegModel({
							StudentInfo:new StudentInfoModel,
							AppRelation:new AppRelationModel,
							StudentTPInfo:new StudentTPInfoModel,
							TFIELTSResult:new ExamResultModels.ExamResultEntity,
							TFIELTSResultDetail:new ExamResultModels.ExamResultTFIELTSEntity,
							SATSSATResult:new ExamResultModels.ExamResultEntity,
							SATSSATResultDetail:new ExamResultModels.ExamResultSATSSATEntity,
							SAT2Result:new ExamResultModels.ExamResultEntity,
							StudentSourceList:new StudentSourceCollection,
							StudentFromList:new StudentFromCollection,
							url:"/StudentMgr/SaleTrack/GetFirstInterviewRegData"
						})

						firstInterviewRegModel.fetch({
							data:{
								studentID:studentID
							},
							success:function(data){
								if(!data){
									return ClientManage.navigate("StudentMgr/Index/List",{trigger:true});
								}
								var regView = new FirstInterviewRegView.FirstInterviewRegView({
									model:firstInterviewRegModel,
									StudentID:studentID
								})

								contentRegion.show(regView);
							},
							error:function(data){
								alert(data);
								console.log("Fetching data from server failed!");
							}
						})
					}
				)
			}
		}
	});
	return ClientManage.StudentMgr.SaleTrack.FirstInterviewReg.Controller;
})