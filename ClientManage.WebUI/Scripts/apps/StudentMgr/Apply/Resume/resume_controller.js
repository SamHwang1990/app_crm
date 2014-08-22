/***************************************
 * Created by samhwang1990@gmail.com on 14-8-21.
 * StudentMgr/Apply/Resume Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('StudentMgr.Apply.Stages.Resume',function(Resume,ClientManage,Backbone, Marionette, $, _){
		Resume.Controller = {
			ResumeRedirect:function(contentRegion,arg){
				ClientManage.startSubApp("StudentMgr.Apply.Stages.Resume");
				var parentStageNameEn = arg[0];
				var studentId = arg[1];
				var resumeUrl = "/StudentMgr/Apply/Resume_CurrentChildStage";
				$.ajax({
					type:'GET',
					url:resumeUrl,
					data:"studentID=" + studentId + "&parentNameEn=" + parentStageNameEn,
					dataType:'json',
					contentType: 'application/json; charset=utf-8',
					success:function(data){
						if(data.GetResult !== undefined && data.GetResult === false){
							return alert(data.Msg);
						}else{
							/*
							* data json对象包含三个属性：GetResult、CurrentChildNameEn、CurrentChildNo
							* */
							return ClientManage.navigate("StudentMgr/Apply/Stages/" +
								parentStageNameEn +
								"/detail/" + data.CurrentChildNameEn + "/" + studentId,{trigger:true,replace:true});
						}
					},
					error:function(data){
						alert('获取数据失败');
					}
				})
			}
		}
	});
	return ClientManage.StudentMgr.Apply.Stages.Resume.Controller;
})
