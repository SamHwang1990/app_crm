/***************************************
 * Created by samhwang1990@gmail.com on 14-5-7.
 * AdminBar View
 ***************************************/

define(['marionette','text!templates/Common/appAdminBar.html'],function(Marionette,AdminBarTpl){
	var adminBar = Marionette.ItemView.extend({
		tagName:"div",
		className:"navbar-inner",
		template: _.template(AdminBarTpl),
		templateHelpers:function(){
			return {
				AppConfig:this.model.get("AppConfig").toJSON(),
				CurrentUser:this.model.get("CurrentUser").toJSON(),
				UserPermission:this.model.get("UserPermission").toJSON()
			}
		},
		onShow:function(){
			console.log("Admin Bar View Show");
		}
	});
	return adminBar;
});
