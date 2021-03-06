/***************************************
 * Created by samhwang1990@gmail.com on 14-5-5.
 * require 配置
 * Backbone 程序启动
 ***************************************/

//require 配置
requirejs.config({
	baseUrl: "Scripts",
	paths: {
		backbone: "libs/backbone/backbone",
		"backbone.picky": "libs/backbone/backbone.picky",
		"backbone.syphon": "libs/backbone/backbone.syphon",
		jquery: "libs/jquery/jquery-1.11.0",
		marionette: "libs/backbone/backbone.marionette",
		text: 'libs/require/text',
		underscore: "libs/underscore/underscore",
		'bootstrap':'../Content/bootstrap_v3/js/bootstrap.min',
		'Timeline':'libs/timeline/timeliner',
		Bootbox:"libs/bootstrap/bootbox/bootbox.min",
		BootstrapTable:"libs/bootstrap/bootstraptable/bootstrap-table",
		iCheck:"libs/bootstrap/icheck/icheck",
		EventProxy:'libs/eventproxy'
	},
	shim: {
		underscore: {
			exports: "_"
		},
		backbone: {
			deps: ["jquery", "underscore"],
			exports: "Backbone"
		},
		"backbone.picky":{
			deps: ["backbone"]
		},
		"backbone.syphon": {
			deps: ["backbone"]
		},
		'marionette': {
			deps: ["backbone"],
			exports: "Marionette"
		},
		'bootstrap':{
			deps:["jquery"],
			exports:"Bootstrap"
		},
		Timeline:{
			deps:['jquery'],
			exports:"Timeline"
		},
		Bootbox:{
			deps:["bootstrap"]
		}
	}
});

require(["app"], function(ContactManager){
	ContactManager.start();
});