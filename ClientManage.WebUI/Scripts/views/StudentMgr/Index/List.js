/***************************************
 * Created by samhwang1990@gmail.com on 14-4-20.
 * 学生信息列表视图
 ***************************************/

define([
	'jquery',
	'underscore',
	'backbone',
	'checkLogin',
	'collections/StudentMgr/Index/StudentList',         //Student List 集合
	'models/StudentMgr/Index/StudentInfo',              //Student Item 模型
	'bootstrap',
	'text!templates/StudentMgr/Index/List.html',        //Student List 模板
	'text!templates/StudentMgr/Index/StudentItem.html'  //Student Item 模板
	],function($,_,Backbone,checkLogin,studentListModel,studentItemModel,Bootstrap,studentListTemplate,studentItemTemplate){

		/*
		* StudentItem 子视图
		* */
		var studentInfoView = Backbone.View.extend({
			template:_.template(studentItemTemplate),   //解析Student Item 模板
			initialize:function(){
				_.bindAll(this,'render');
			},
			render:function(){
				//往集合html中添加Item html
				this.parentView.$el.find('table').append(this.template(this.model.toJSON()));
			}
		});

		/*
		* StudentList 父视图
		* */
		var studentListView = Backbone.View.extend({
			el:'#appBody-content .wrap',
			template:_.template(studentListTemplate),
			collection:new studentListModel,    //初始化集合实例
			initialize:function(){
				_.bindAll(this,'render');
				var listView = this;

				//从服务器上获取集合数据
				this.collection.fetch({
					success:function(){     //获取成功，输出到记录台
						console.log('Student list data fetched from server');

						//渲染初始化状态
						listView.render();
					},
					error:function(){       //获取失败，输出到记录台
						console.log('Unable to fetch user data');
					}
				});
			},
			render:function(){
				//从服务器上获取集合数据
				this.collection.fetch({
					success:function(){     //获取成功，输出到记录台
						console.log('Student list data fetched from server');
					},
					error:function(){       //获取失败，输出到记录台
						console.log('Unable to fetch user data');
					}
				});


				//清空table中的元素
				//this.$el.find('table').empty();

				//进入集合循环前保留this
				var collView = this;

				//先把List的模板给渲染到页面上先
				this.$el.html(this.template({}));

				//循环集合所有元素，为每个元素创建一个视图实例
				this.collection.each(function(studentItem){
					//创建子视图实例，并设置其模型
					var studentItemView = new studentInfoView({
						model:studentItem
					});

					//设置子视图的父视图
					studentItemView.parentView = collView;

					studentItemView.render();
				});
			}
		});
		return studentListView;
	}
);
