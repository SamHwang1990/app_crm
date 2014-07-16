/***************************************
 * Created by samhwang1990@gmail.com on 14-7-16.
 * Setting/ApplyStagesMgr/ApplyStageVersionModel
 ***************************************/

define(['jquery','underscore','backbone'],function($,_,Backbone){
		var versionModel = Backbone.Model.extend({
			defaults:{
				VersionID:'00000000-0000-0000-0000-000000000000',
				SignDateBefore:new Date(),
				VersionName:'',
				Remark:''
			},
			initialize:function(options){
				if(options != null){
					this.url = options.url;
				}
			}
		});
		return versionModel;
	}
);

