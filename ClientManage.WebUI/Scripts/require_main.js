/***************************************
 * Created by samhwang1990@gmail.com on 14-5-5.
 * require 配置
 * Backbone 程序启动
 ***************************************/

//require 配置
require.config({
	baseUrl: "Scripts",
	paths: {
		backbone: "libs/backbone/backbone",
		"backbone.picky": "libs/backbone/backbone.picky",
		"backbone.syphon": "libs/backbone/backbone.syphon",
		jquery: "libs/jquery/jquery-1.11.0",
		marionette: "libs/backbone/backbone.marionette",
		text: 'libs/require/text',
		underscore: "libs/underscore/underscore-min",
		'bootstrap':'../Content/bootstrap/js/bootstrap.min'
	},

	shim: {
		underscore: {
			exports: "_"
		},
		backbone: {
			deps: ["jquery", "underscore"],
			exports: "Backbone"
		},
		"backbone.picky": ["backbone"],
		"backbone.syphon": ["backbone"],
		marionette: {
			deps: ["backbone"],
			exports: "Marionette"
		},
		'bootstrap':{
			deps:["jquery"],
			exports:"Bootstrap"
		}
	}
});
