/***************************************
 * Created by samhwang1990@gmail.com on 14-4-22.
 * StudentMgr中的RoleList 视图
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'checkLogin',
	'collections/RoleMgr/RoleList',
	'models/RoleMgr/RoleInfo',
	'bootstrap',
	'text!templates/StudentMgr/Index/RoleItem.html'
	],function($,_,Backbone,CheckLogin,RolesCollection,RoleInfo,Bootstrap,RoleInfoTemp){
		/*
		* RoleInfo 子视图
		* */
		var roleInfoView = Backbone.View.extend({
			template:_.template(RoleInfoTemp),
			initialize:function(){
				_.bindAll(this,'render');
			},
			render:function(){
				//往父视图中添加数据
			}
		});

 		/*
		* RolesCollection 父视图
		* */
		var rolesCollView = Backbone.View.extend({
			el:'#RoleList',
			collection:new RolesCollection(),
			initialize:function(){      //TODO: fetch data from server
			},
			render:function(){          //TODO: Connect the son view with parent view

			}
		})
 	}
);
