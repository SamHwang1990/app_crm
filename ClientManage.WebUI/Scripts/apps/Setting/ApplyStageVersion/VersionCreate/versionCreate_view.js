/***************************************
 * Created by samhwang1990@gmail.com on 14-7-25.
 * Setting/ApplyStageVersion/VersionCreate View
 ***************************************/

define([
	'app',
	'text!templates/Setting/ApplyStagesMgr/VersionCreate.html'
],function(ClientManage,VersionCreateTpl){
	ClientManage.module("Setting.ApplyStageVersion.VersionCreate.View",
		function(View,ClientManage,Backbone,Marionette,$,_){
			View.VersionCreateView = Marionette.Layout.extend({
				template:_.template(VersionCreateTpl),
				tagName:"div",
				className:"wrap",
				ui:{
					"TabCreateVersionForm":"#tabCreateVersionForm",
					"TabCreateVersionDetailForm":"#tabCreateVersionDetailForm",
					"NavRegFrom":"#CreateVersionNav"
				},
				events:{
				},
				regions:{
					createVersionWrap:"#tabCreateVersionForm",
					createVersionDetailWrap:"#tabCreateVersionDetailForm"
				},
				onRender:function(){
					this.HandlerVersionCreate();
				},
				HandlerVersionCreate:function(){
					var createView = this;
					require([
						'apps/Setting/ApplyStageVersion/VersionEdit/versionEdit_view',
						'models/Setting/ApplyStagesMgr/ApplyStageVersionModel']
						,function(EditView,VersionModel){
							var versionInfo = new VersionModel({
								url:"/Setting/ApplyStageVersion/GetVersionById"
							});
							versionInfo.fetch({
								success:function(data){
									if(data === false){
										return alert("获取数据失败");
									}
									else{
										var editView = new EditView.VersionEditView({
											model:versionInfo
										});
										createView.createVersionWrap.show(editView);
										//先Unbind 所有事件绑定，避免触发多个handler
										ClientManage.vent.off("VersionEditSuccess");
										ClientManage.vent.on("VersionEditSuccess",function(){
											var curLi = createView.ui.NavRegFrom.find("li:eq(0)");
											var curA = curLi.find("a");
											curLi.addClass("disabled");
											curA.removeAttr("href");
											curA.attr("data-toggle","");

											var nextLi = createView.ui.NavRegFrom.find("li:eq(1)");
											var nextA = nextLi.find("a");
											nextLi.removeClass("disabled");
											nextA.attr("href",nextA.attr("data-href"));
											nextA.attr("data-toggle","tab");
											createView.ui.NavRegFrom.find("li:eq(1) a").tab('show');

											createView.HandlerVersionDetailCreate(versionInfo.get("VersionID"));
										})
									}
								},
								error:function(){
									alert("获取数据失败");
								}
							})

						})
				},
				HandlerVersionDetailCreate:function(versionID){
					var createView = this;

					require([
						'apps/Setting/ApplyStageVersion/VersionDetailEdit/versionDetailEdit_view',
						'collections/Setting/ApplyStagesMgr/VersionDetailWrapCollection']
						,function(VersionDetailEditView,VersionDetailWrapCollection){
							var versionDetailColl = new VersionDetailWrapCollection({
								url:"/Setting/ApplyStageVersion/GetVersionDetail"
							});
							versionDetailColl.fetch({
								data:{
									versionID:versionID
								},
								success:function(data){
									if(data === false){
										return alert("传入的版本ID不能为空");
									}
									else{
										var detailEditView = new VersionDetailEditView.VersionDetailEditView({
											collection:versionDetailColl,
											VersionID:versionID
										})
										createView.createVersionDetailWrap.show(detailEditView);
										ClientManage.vent.off("VersionDetailEditSuccess");
										ClientManage.vent.on("VersionDetailEditSuccess",function(){
											ClientManage.navigate("Setting/ApplyStageVersion/List",{trigger:true});
										})
									}
								},
								error:function(){
									alert("获取数据失败");
								}
							})

						})
				}
			})
		})
	return ClientManage.Setting.ApplyStageVersion.VersionCreate.View;
})
