/**
 * Created by samhwang1990@gmail.com on 14-4-10.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/LoginUser',
    'text!templates/Home/LoginUser.html'],function($,_,Backbone,model,loginTemplate){
        var LoginView = Backbone.View.extend({
            el:"#container",
            model:new model(),
            template: _.template(loginTemplate),
            events:{
	            'change input':'inputChange',
                'click #btnSubmit':'checkLogin'
            },
            initialize:function(){
                _.bindAll(this, 'render');
                this.render();
            },
            render:function(){
	            //将模型数据转成JSON
                var modelData = this.model.toJSON();
	            modelData.invalid = modelData.invalid.toJSON();

	            //将模型数据传入模板
                this.$el.html(this.template(modelData));

	            //如果模型中有错误的验证信息，则显示
	            if(_.size(modelData.invalid)){
		            this.$el.find("#login-error").css("display","block");
	            }
            },
            validateForm:function(checkRequired){
                //将模型数据转成JSON
	            this.model.get('invalid').unset('errorMsg');
                var data = this.model.toJSON();
                data.invalid = data.invalid.toJSON();

                //为必填项保存一个消息
                var  requiredMsg = '请填写该字段';

                //检查必填项
                if(checkRequired){
                    //确保所有输入域已填写
                    _.each(data,function(value,key){
                       //检查除invalid 模型之外的所有东西
                        if(key=='invalid') return false;

                        //如果输入域为空
                        if((typeof value !== "boolean") && ! value.length){
                            //将它添加到invalid 模型中
                            this.model.get('invalid').set(key,requiredMsg);
                        }
                        else{
                            //否则移除invalid 标记，仅在该字段为必填项时移除
                            if(data.invalid[key] == requiredMsg){
                                this.model.get('invalid').unset(key);
                            }
                        }
                    },this);
                };

                //如果有invalid 的输入域，返回false，否则返回true
                if(_.size(this.model.get('invalid').toJSON())){
	                this.model.get('invalid').set('errorMsg',requiredMsg);
                    return false;
                }
                else{
                    return true;
                }
            },
	        inputChange:function(e){

				var $input = $(e.target);

				//获取模型中键的名称
				var inputName = $input.attr('name');

				//在模型中设定新值
				this.model.set(inputName,$input.val());
			},
            checkLogin:function(e){
                //防止以老式办法提交表单
                e.preventDefault();

                //有效性检查
                if(this.validateForm(true)){
	                //另存为this
	                var that = this;

                    //用表单上的URL 设定API 地址
                    this.model.url = this.$el.attr('action');

                    //为提交给API 清理数据
                    var data = this.model.toJSON();
                    delete data.invalid;

                    //如果有效，发送模型
	                $.ajax({
		                type:"POST",
		                url:this.model.url,
		                data:data,
		                dataType: 'json',
		                success: function (data){
			                if(data.result){ //登录成功，则重定向
				                window.location.href="/Home/Index";
			                }else{  //当登录失败时

				                //判断是否用户名不存在
				                that.model.get("invalid").set("errorMsg",data.loginMsg);
				                that.render();
			                }
		                },
		                error:function(data,err){
			                console.log(err);
		                }
                    });
                }
                else{
                    //否则重新渲染错误消息
                    this.render();
                }
            }
        });

        return LoginView;
    }
);