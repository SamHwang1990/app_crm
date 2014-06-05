/***************************************
 * Created by samhwang1990@gmail.com on 14-6-5.
 * StudentMgr/SaleTrack/List View
 ***************************************/

define([
	'app',
	'text!templates/StudentMgr/SaleTrack/SaleTrackItem.html',
	'text!templates/StudentMgr/SaleTrack/List.html',
	'models/StudentMgr/EnumModel/TrackIsComplete',
	'models/StudentMgr/EnumModel/IsSign'
	],function(ClientManage,SaleTrackItemTpl,SaleTrackListTpl,EnumTrackIsComplete,EnumIsSign){
	ClientManage.module('StudentMgr.SaleTrack.List.View',function(View,ClientManage,Backbone, Marionette, $, _){
		View.SaleTrackItemView = Marionette.ItemView.extend({
			template:_.template(SaleTrackItemTpl),
			tagName:"tr",
			templateHelpers:function(){
				var saleTrackEntity = this.model.get("CurrentSaleTrack");
				saleTrackEntity.IsComplete = EnumTrackIsComplete.TrackIsCompleteInverse[saleTrackEntity.IsComplete];

				var appRelation = this.model.get("AppRelation");
				appRelation.IsSign = EnumIsSign.IsSignInverse[appRelation.IsSign];
				return {
					StudentInfo:this.model.get("StudentInfo"),
					AppRelation:appRelation,
					SaleTrackEntity:saleTrackEntity
				}
			}
		});

		View.StudentsView = Marionette.CompositeView.extend({
			tagName:"div",
			className:"wrap",
			template: _.template(SaleTrackListTpl),
			itemView:View.SaleTrackItemView,
			itemViewContainer: "tbody",
			/*initialize:function(){
			 _.bindAll(this,'SortCommit');
			 },*/
			ui:{
				"formSearch":".form-search",                //form 元素
				"conditionCurrent":".condition-current",    //当前分类元素
				"conditionList":".condition-list",          //分类列表
				"searchContent":".search-content",          //筛选内容元素
				"btnSubmit":"button[type=submit]"           //submit 按钮
			},
			events:{
				'click @ui.conditionList a':'ConditionSortChange',      //搜索框交互
				'submit':'SortCommit'
			},
			ConditionSortChange:function(event){
				event.preventDefault();
				var sortName = event.target.text;                       //获取分类名字
				this.ui.conditionCurrent.html(sortName);                //修改当前分类显示
				if($(event.target).hasClass('condition-all')){          //修改“全部分类”
					this.ui.searchContent.attr('disabled','disabled');  //禁用输入框
					//this.ui.btnSubmit.attr('disabled','disabled');      //禁用搜索按钮
					this.ui.searchContent.attr('placeholder','全部无需筛选');     //修改placeholder
				}else{
					this.ui.searchContent.removeAttr('disabled');       //
					//this.ui.btnSubmit.removeAttr('disabled');
					this.ui.searchContent.attr('placeholder','请输入筛选的'+sortName);
				}
			},
			SortCommit:function(event){
				event.preventDefault();
				var listView = this;
				var condition = this.ui.conditionCurrent.text();
				var searchContent = this.ui.searchContent.val();
				if(condition==='全部'){       //如果筛选类型为“全部”
					this.collection.fetch({
						success:function(){
							console.log("fetche data from server successfully");
							return listView.render();
						},
						error:function(){
							console.log("fetch data from server failed");
							return alert("获取数据失败");
						}
					})
				}
				if(searchContent === ""){       //如果筛选内容为空，则刷新一下
					return this.render();
				}
				this.collection.fetch({
					/*data:{
						sort:condition,
						keyword:searchContent
					},*/
					success:function(){
						console.log("fetche data from server successfully");
						return listView.render();
					},
					error:function(){
						console.log("fetch data from server failed");
						return alert("获取数据失败");
					}
				})
			}

		});
	});
	return ClientManage.StudentMgr.SaleTrack.List.View;
})
