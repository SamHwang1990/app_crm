/***************************************
 * Created by samhwang1990@gmail.com on 14-5-7.
 * Admin Footer View
 ***************************************/

define(['marionette','text!templates/Common/Footer.html'],function(Marionette,FooterTpl){
	var adminFooter = Marionette.ItemView.extend({
		template:FooterTpl,
		tagName:"div",
		className:"appFooter-Content",
		/*templateHelpers:{
			siteName:this.model.siteName,
			version:this.model.version
		},*/
		onShow:function(){
			console.log("Admin Footer View Show");
		}
	});
	return adminFooter;
});
