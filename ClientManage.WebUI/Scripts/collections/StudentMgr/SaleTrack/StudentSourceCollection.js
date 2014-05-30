/***************************************
 * Created by samhwang1990@gmail.com on 14-5-30.
 * StudentMgr/SaleTrack StudentSourceCollection
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'models/StudentMgr/SaleTrack/StudentSourceItem'
	],function($,_,Backbone,StudentSourceItem){
		var StudentSourceCollection = Backbone.Collection.extend({
			model:StudentSourceItem
		});
		return StudentSourceCollection;
	}
);
