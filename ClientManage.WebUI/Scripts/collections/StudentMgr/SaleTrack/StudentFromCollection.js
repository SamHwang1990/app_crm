/***************************************
 * Created by samhwang1990@gmail.com on 14-5-30.
 * StudentMgr/SaleTrack StudentFrom Collection
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'models/StudentMgr/SaleTrack/StudentFromModel'],function($,_,Backbone,StudentFromModel){
	var StudentFromCollection = Backbone.Collection.extend({
		model:StudentFromModel
	});
	return StudentFromCollection;
})
