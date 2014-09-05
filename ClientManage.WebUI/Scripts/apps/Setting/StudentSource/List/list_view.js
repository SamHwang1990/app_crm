/***************************************
 * Created by samhwang1990@gmail.com on 14-9-2.
 * Setting/StudentSource View
 ***************************************/

define([
	'app',
	'text!templates/Setting/StudentSource/List.html',
	'Bootbox',
	"assets/RenderBootstrapTable"
],function(ClientManage,SourceListTpl,Bootbox,RenderBootstrapTable){
	ClientManage.module('Setting.StudentSource.List.View',function(View,ClientManage,Backbone,Marionette,$,_){
		View.SourceListView = Marionette.ItemView.extend({
			tagName:"div",
			className:"wrap",
			template:_.template(SourceListTpl),
			ui:{
				"DeleteSource":"a.deleteSource",
				"tableSourceList":"table#StudentSourceListTable"
			},
			events:{
				"click @ui.DeleteSource":"ClickDeleteSource"
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

			},
			onShow:function(){
				this.renderBootstrapTable = new RenderBootstrapTable();
				this.renderBootstrapTable.RenderFromData(this.ui.tableSourceList,this.SetTableData(),this.SetTableColumns())
			},
			SetTableColumns:function(){
				var columnColumns = [
					{field: 'SourceName', title: '来源名称', sortable: true},
					{field: 'SourceNameEn', title: '来源英文名称', sortable: true},
					{field: 'DetailKeyword', title: '附加信息', sortable: true,align:'center', formatter:function(value){
						if(!value){
							return '-';
						}
						return value;
					}},
					{field: 'Remark', title: '备注'},
					{field: 'exec', title: '操作',align:"center", formatter: function (value) {
						if (!value) {
							return '-';
						}
						var execArray = [];
						execArray.push('<a href="#Setting/StudentSource/Edit/' +
							value.SourceNameEn +
							'" title="' +
							value.SourceNameEn +
							'">修改来源信息</a>');

						//ToDo:Hide the delete temporary
						/*execArray.push('<a href="/Setting/StudentSource/Delete"' +
							'class="deleteSource"' +
							'title="' + value.SourceNameEn +
							'" data-SourceNameEn="' + value.SourceNameEn +
							'">删除版本信息</a>');*/

						return execArray.join('&emsp;');
					}}
				];
				return columnColumns;
			},
			SetTableData:function(){
				var tableData = [];
				_.each(this.collection.models,function(sourceItem){
					var dataItem = {};

					dataItem["SourceName"] = sourceItem.get("SourceName");
					dataItem["SourceNameEn"] = sourceItem.get("SourceNameEn");
					dataItem["DetailKeyword"] = sourceItem.get("DetailKeyword");
					dataItem["Remark"] = sourceItem.get("Remark");

					dataItem["exec"] = {
						SourceNameEn:sourceItem.get("SourceNameEn")
					}
					tableData.push(dataItem);
				})
				return tableData;
			}
		})
	});
	return ClientManage.Setting.StudentSource.List.View;
})
