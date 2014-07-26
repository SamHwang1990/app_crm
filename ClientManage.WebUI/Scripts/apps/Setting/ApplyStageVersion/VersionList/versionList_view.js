/***************************************
 * Created by samhwang1990@gmail.com on 14-7-16.
 * Setting/ApplyStageVersion/VersionList View
 ***************************************/

define([
	'app',
	'assets/TransformDateString',
	'text!templates/Setting/ApplyStagesMgr/VersionList.html',
	'text!templates/Setting/ApplyStagesMgr/VersionListItem.html',
	'Bootbox'
],function(ClientManage,TransformDateString,VersionListTpl,VersionListItemTpl,Bootbox){
	ClientManage.module('Setting.ApplyStageVersion.VersionList.View',function(View,ClientManage,Backbone,Marionette,$,_){
		View.VersionListItemView = Marionette.ItemView.extend({
			template:_.template(VersionListItemTpl),
			tagName:"tr",
			templateHelpers:function(){
				var transDateHandler = new TransformDateString();
				var signDateBefore = transDateHandler.TransMsStringToDate(this.model.get("SignDateBefore"));
				delete transDateHandler;
				return {
					SignDateBefore:signDateBefore
				}
			},
			ui:{
				"DeleteVersion":"a.deleteVersion"
			},
			events:{
				"click @ui.DeleteVersion":"ClickDeleteVersion"
			},
			ClickDeleteVersion:function(e){
				e.preventDefault();
				var itemView = this;
				bootbox.confirm("确定要删除该版本：<span class='text-warning'><strong>" + this.model.get("VersionName") +"<\/strong><\/span>&nbsp;？","取消","确定", function(result) {
					if (result) {
						var postUrl = $(e.target).attr("href");
						var versionID = itemView.model.get("VersionID");
						var ajaxData = {
							versionID :versionID
						}
						$.ajax({
							type:'POST',
							url:postUrl,
							data:JSON.stringify(ajaxData),
							dataType:'json',
							contentType: 'application/json; charset=utf-8',
							success:function(data){
								if(data.DeleteResult == true){
									itemView.$el.remove();
								}else{
									var box = bootbox.dialog("删除数据失败");

									setTimeout(function() {
										// be careful not to call box.hide() here, which will invoke jQuery's hide method
										box.modal('hide');
									}, 3000);


								}
							},
							error:function(data){
								alert('提交数据失败');
							}
						})
					} else {
						console.log("User declined dialog");
					}
				});
			}
		});
		View.VersionListView = Marionette.CompositeView.extend({
			tagName:"div",
			className:"wrap",
			template:_.template(VersionListTpl),
			itemView:View.VersionListItemView,
			itemViewContainer:"tbody"
		})
	});
	return ClientManage.Setting.ApplyStageVersion.VersionList.View;
})
