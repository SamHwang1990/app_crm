/**
 * Created by samhwang1990@gmail.com on 14-4-11.
 */

// Require.js allows us to configure shortcut alias
require.config({
	urlArgs: "bust=v2",
	paths: {
		jquery: 'libs/jquery/jquery-1.11.0.min',
		bootstrap:'../Content/bootstrap/js/bootstrap.min',
		underscore: 'libs/underscore/underscore-min',
		backbone: 'libs/backbone/backbone.min',
		text: 'libs/require/text',
		domReady:'libs/require/domReady'
	}

});

require(['views/Home/Index'], function (LoginView) {
	var login_view = new LoginView;
});