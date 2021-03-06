/**
 * Created by samhwang1990@gmail.com on 14-4-12.
 * 系统前端配置信息的交互模型JS
 */

define(['backbone','apps/Config/config'],function(Backbone,config){
	var appConfigModel = Backbone.Model.extend({
		defaults:{
			host:config.host,
			port:config.port,
			sitePath:config.sitePath,
			viewPath:config.framePath,
			modelPath:config.modelPath,
			templatePath:config.templatePath,
			collectionPath:config.collectionPath,
			libPath:config.libPath,
			siteName:config.siteName,
			version:config.version
		},
		initialize:function(){
			//_.bind(this.save, this);
		}
	});
	return new appConfigModel();
})
