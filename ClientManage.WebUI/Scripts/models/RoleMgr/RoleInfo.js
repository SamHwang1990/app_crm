/***************************************
 * Created by samhwang1990@gmail.com on 14-4-22.
 * RoleInfo 模型
 ***************************************/

define(['jquery','underscore','backbone'],function($,_,Backbone){
		var roleInfoModel = Backbone.Model.extend({
			defaults:{
				RoleID:'',
				RoleName:'',
				RoleEN:'',
				RoleRemark:''
			}
		});
		return roleInfoModel;
	}
);
