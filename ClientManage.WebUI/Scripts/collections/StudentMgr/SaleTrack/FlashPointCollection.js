/***************************************
 * Created by samhwang1990@gmail.com on 14-6-10.
 * StudentMgr/SaleTrack FlashPoint Collection
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'models/StudentMgr/SaleTrack/FlashPointModel'],function($,_,Backbone,FlashPointModel){
	var FlashPointCollection = Backbone.Collection.extend({
		model:FlashPointModel
	});
	return FlashPointCollection;
})
