/***************************************
 * Created by samhwang1990@gmail.com on 14-5-7.
 * AdminBar View
 ***************************************/

define(['marionette','text!templates/Common/appAdminBar.html'],function(Marionette,AdminBarTpl){
	var adminBar = Marionette.ItemView.extend({
		tagName:"div",
		className:"navbar-inner",
		template:AdminBarTpl,
		/*templateHelpers:{
			AppConfig:this.model.AppConfig,
			CurrentUser:this.model.CurrentUser
		},*/
		onShow:function(){
			console.log("Admin Bar View Show");
		}
	});
	return adminBar;
});
