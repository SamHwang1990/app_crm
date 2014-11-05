/***************************************
 * Created by samhwang1990@gmail.com on 14-11-5.
 * RolePermissionValue 模型
 ***************************************/

define(['jquery','underscore','backbone'],function($,_,Backbone){
	var permissionModel = Backbone.Model.extend({
		defaults:{
			RoleID:'00000000-0000-0000-0000-000000000000',
			IsManage:false,
			IsStudentList:false,
			IsStudentListAll:false,
			IsStudentListEdit:false,
			IsApplyList:false,
			IsApplyListAll:false,
			IsApplyListEdit:false,
			IsSaleList:false,
			IsSaleListAll:false,
			IsSaleListEdit:false
		},
		initialize:function(options){
			if(options !== null && options.url !== null)
				this.url = options.url;
		}
	})
	return permissionModel;
})
