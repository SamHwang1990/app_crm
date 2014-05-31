/***************************************
 * Created by samhwang1990@gmail.com on 14-5-30.
 * StudentMgr/SaleTrack/FirstInterviewReg Model
 ***************************************/

define(['jquery','underscore','backbone'],function($,_,Backbone){
	var FirstInterviewRegModel = Backbone.Model.extend({
		initialize:function(options){
			if(options)
				this.url = options.url;
		}
	});
	return FirstInterviewRegModel;
})
