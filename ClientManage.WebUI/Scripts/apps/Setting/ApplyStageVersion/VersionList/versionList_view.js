/***************************************
 * Created by samhwang1990@gmail.com on 14-7-16.
 * Setting/ApplyStageVersion/VersionList View
 ***************************************/

define([
	'app',
	'assets/TransformDateString',
	'text!templates/Setting/ApplyStagesMgr/VersionList.html',
	'Bootbox',
	"assets/RenderBootstrapTable"
],function(ClientManage,TransformDateString,VersionListTpl,Bootbox,RenderBootstrapTable){
	ClientManage.module('Setting.ApplyStageVersion.VersionList.View',function(View,ClientManage,Backbone,Marionette,$,_){
		View.VersionListView = Marionette.ItemView.extend({
			tagName:"div",
			className:"wrap",
			template:_.template(VersionListTpl),
			ui:{
				"DeleteVersion":"a.deleteVersion",
				"tableApplyStageVersionList":"table#ApplyStageVersionListTable"
			},
			events:{
				"click @ui.DeleteVersion":"ClickDeleteVersion"
			},
			ClickDeleteVersion:function(e){
				e.preventDefault();
				var parentTr = $(e.target).parents("tr");
				var versionID = $(e.target).attr("data-VersionID");
				var versionName = $(e.target).attr("title");
				bootbox.confirm("确定要删除该版本：<span class='text-warning'><strong>" + versionName +"<\/strong><\/span>&nbsp;？","取消","确定", function(result) {
					if (result) {
						var postUrl = $(e.target).attr("href");
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
									parentTr.remove();
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
			},
			initialize:function(){
				this.CollectionHandler();
			},
			onShow:function(){
				this.renderBootstrapTable = new RenderBootstrapTable();
				this.renderBootstrapTable.RenderFromData(this.ui.tableApplyStageVersionList,this.SetTableData(),this.SetTableColumns())
			},
			CollectionHandler:function(){
				var listView = this;
				this.transformDateString = new TransformDateString();
				_.each(this.collection.models,function(versionItem){
					versionItem.set("SignDateBefore",listView.transformDateString.TransMsStringToDate(versionItem.get("SignDateBefore")));
				})
			},
			SetTableColumns:function(){
				var columnColumns = [
					{field: 'VersionName', title: '版本名称', sortable: true},
					{field: 'SignDateBefore', title: '有效签约时间', sortable: true},
					{field: 'Remark', title: '备注'},
					{field: 'exec', title: '操作', formatter: function (value) {
						if (!value) {
							return '-';
						}
						var execArray = [];
						execArray.push('<a href="#Setting/ApplyStageVersion/Edit/Version-' +
							value.VersionID +
							'" title="' +
							value.VersionName +
							'">修改版本信息</a>');

						execArray.push('<a href="#Setting/ApplyStageVersion/EditDetail/Version-' +
							value.VersionID +
							'" title="' +
							value.VersionName +
							'">修改版本阶段信息</a>');

						execArray.push('<a href="/Setting/ApplyStageVersion/VersionDelete"' +
							'class="deleteVersion"' +
							'title="' + value.VersionName +
							'" data-VersionID="' + value.VersionID +
							'">删除版本信息</a>');

						return execArray.join('&emsp;');
					}}
				];
				return columnColumns;
			},
			SetTableData:function(){
				var tableData = [];
				_.each(this.collection.models,function(versionItem){
					var dataItem = {};

					dataItem["VersionName"] = versionItem.get("VersionName");
					dataItem["SignDateBefore"] = versionItem.get("SignDateBefore");
					dataItem["Remark"] = versionItem.get("Remark");

					dataItem["exec"] = {
						VersionID:versionItem.get("VersionID"),
						VersionName:versionItem.get("VersionName")
					}
					tableData.push(dataItem);
				})
				return tableData;
			}
		})
	});
	return ClientManage.Setting.ApplyStageVersion.VersionList.View;
})
