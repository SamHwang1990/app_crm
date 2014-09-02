/***************************************
 * Created by samhwang1990@gmail.com on 14-9-2.
 * Setting/StudentSource/Edit Controller
 ***************************************/

define(['app'],function(ClientManage){
	ClientManage.module('Setting.StudentSource.Edit',function(Edit,ClientManage,Backbone, Marionette, $, _){
		Edit.Controller = {
			ShowEdit:function(contentRegion,arg){
				var action = arg[0];
				var sourceNameEn = arg[1];
				ClientManage.startSubApp("Setting.StudentSource.Edit");
				require([
					'apps/Setting/StudentSource/Edit/edit_view',
					'models/StudentMgr/SaleTrack/StudentSourceItem']
					,function(EditView,StudentSourceModel){
						var url;
						if(action == 'Add')
							url = "/Setting/StudentSource/GenerateOne";
						if(action == 'Edit')
							url = "/Setting/StudentSource/FindOne"

						var sourceInfo = new StudentSourceModel({
							url:url
						});
						sourceInfo.fetch({
							data:{
								sourceNameEn:sourceNameEn
							},
							success:function(data){
								if(data.FindResult && data.FindResult === false){
									return alert(data.Msg);
								}
								else{
									var editView = new EditView.SourceEditView({
										model:sourceInfo
									});
									contentRegion.show(editView);
								}
							},
							error:function(){
								alert("获取数据失败");
							}
						})

					})
			}
		}
	})
	return ClientManage.Setting.StudentSource.Edit.Controller;
})
