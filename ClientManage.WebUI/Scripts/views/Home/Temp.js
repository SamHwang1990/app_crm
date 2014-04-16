/**
 * Created by samhwang1990@gmail.com on 14-4-16.
 */

define(['jquery','backbone','underscore','text!templates/Home/Temp.html'],function($,Backbone,_,tempTemp){
	var tempView =Backbone.View.extend({
		el:'#appBody-content .wrap',
		events:{
			'click button#tempAdd':'handleAddBtn'
		},
		template:_.template(tempTemp),
		initialize:function(){
			_.bindAll(this,'render','handleAddBtn');
			this.render();
		},
		render:function(){
			this.$el.html(this.template({}));
		},
		handleAddBtn:function(){
			this.$el.html("aha");
		}
	});
	return tempView;
});