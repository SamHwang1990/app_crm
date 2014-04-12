/**
 * Created by samhwang1990@gmail.com on 14-4-12.
 */
define([],function(){
	var require={
		urlArgs: "bust=v2",
		paths: {
			jquery: 'libs/jquery/jquery-1.11.0.min',
			bootstrap:'../Content/bootstrap/js/bootstrap.min',
			underscore: 'libs/underscore/underscore-min',
			backbone: 'libs/backbone/backbone.min',
			text: 'libs/require/text',
			domReady:'libs/require/domReady',
			appConfig:'config',
			checkLogin:'assets/CheckLogin'
		}
	};
	return require;
})


