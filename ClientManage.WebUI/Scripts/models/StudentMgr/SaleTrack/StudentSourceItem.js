/***************************************
 * Created by samhwang1990@gmail.com on 14-5-30.
 * StudentMgr/SaleTrack StudentSourceItem Model
 ***************************************/

define(['jquery','underscore','backbone'],function($,_,Backbone){
	var StudentSourceItem = Backbone.Model.extend({
		defaults:{
			SourceName:"",
			SourceNameEn:"",
			DetailKeyword:"",
			DetailContent:"",
			Remark:""
		},
		initialize:function(options){
			this.url = options.url;
		}
	});
	return StudentSourceItem;
});
