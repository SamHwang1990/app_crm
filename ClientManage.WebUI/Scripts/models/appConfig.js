/**
 * Created by samhwang1990@gmail.com on 14-4-12.
 */

define(['jquery','underscore','backbone','appConfig'],function($,_,Backbone,appConfig){
	var appConfigModel = Backbone.Model.extend({
		defaults:{
			host:appConfig.host,
			port:appConfig.port,
			sitePath:appConfig.sitePath,
			viewPath:appConfig.viewPath,
			modelPath:appConfig.modelPath,
			templatePath:appConfig.templatePath,
			collectionPath:appConfig.collectionPath,
			libPath:appConfig.libPath,
			siteName:appConfig.siteName,
			version:appConfig.version
		},
		initialize:function(){
			_.bind(this.save, this);
		}
	});
	return appConfigModel;
})
