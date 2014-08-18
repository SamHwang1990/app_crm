/***************************************
 * Created by samhwang1990@gmail.com on 14-8-18.
 * StudentMgrApplyIndex View
 ***************************************/

define([
	'app',
	'text!templates/StudentMgr/Apply/index.html'
],function(ClientManage,ApplyIndexTpl){
	ClientManage.module('StudentMgr.Apply.Index.View',function(View,ClientManage,Backbone,Marionette,$,_){
		View.ApplyIndexView = Marionette.ItemView.extend({
			tagName:"div",
			className:"wrap",
			ui:{
				"SyllabusTab":"#tab-body .tab"
			},
			events:{
				"click @ui.SyllabusTab":"ClickSyllabusTab"
			},
			template:_.template(ApplyIndexTpl),
			onRender:function(){
				//切换#appContent的float为none，.wrap的margin设为0
				$("#appContent").addClass("app-apply-Wrap");
			},
			onClose:function(){
				//恢复#appContent的float为left，恢复.wrap的margin
				$("#appContent").removeClass("app-apply-Wrap");
			},
			ClickSyllabusTab:function(e){
				e.preventDefault();
				var tab = e.target;
				var dataType = $(tab).attr("data-type");
				var dataState = $(tab).attr("data-state");
				if(dataState == "active")
					return ;
				else{
					$(tab).siblings().attr("data-state","inactive");
					$(tab).attr("data-state","active");
					var tabBodyClass = dataType + "-body";
					$(".tab-body").each(function(index){
						if($(this).hasClass(tabBodyClass)){
							$(this).attr("data-state-body","active");
						}else{
							$(this).attr("data-state-body","inactive");
						}
					})

				}
			}
		});
	});
	return ClientManage.StudentMgr.Apply.Index.View;
})


