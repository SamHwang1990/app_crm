/***************************************
 * Created by samhwang1990@gmail.com on 14-11-7.
 ***************************************/

define(['marionette','text!templates/Common/prohibit.html'],function(Marionette,ProhibitTpl){
	var ProhibitView = Marionette.ItemView.extend({
		template: _.template(ProhibitTpl),
		tagName:"div",
		className:"wrap"
	});

	var renderView = function(contentRegion){
		var prohibitView = new ProhibitView();
		contentRegion.show(prohibitView);
	};

	return renderView;
})
