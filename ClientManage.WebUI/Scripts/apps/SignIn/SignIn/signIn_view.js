/***************************************
 * Created by samhwang1990@gmail.com on 14-5-6.
 * SignIn Form View
 ***************************************/

define(['app','text!templates/Home/SignIn.html'],function(ClientManage,SignInTpl){
	ClientManage.module("SignIn.DoSignIn.View",function(View,ClientManage,Backbone, Marionette, $, _){
		View.SignInForm = Marionette.ItemView.extend({
			template:_.template(SignInTpl),
			templateHelpers: function(){
				return {
					invalid: this.model.get('invalid').toJSON()
				}
			},
			tagName:"div",
			ui:{
				"form":"#form-signin",
				"error":"#signin-error",
				"rememberMe":"#form-signin input[type=checkbox]",
				"input":"input",
				"btnSubmit":"btnSubmit"
			},
			events: {
				"change @ui.input": "inputChange",
				"submit @ui.form":"submitLogin"
			},
			validateForm:function(checkRequired){
				//将模型数据转成JSON
				this.model.get('invalid').unset('errorMsg');    //先把model中的errorMsg 先给全部删掉
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
			inputChange:function(e){    //将视图模板数据反映到UserLogin模型中

				var $input = $(e.target);

				//获取模型中键的名称
				var inputName = $input.attr('name');

				//在模型中设定新值
				this.model.set(inputName,$input.val());
			},
			submitLogin:function(e){
				//阻止直接提交表单
				e.preventDefault();

				//有效性检查
				if(this.validateForm(true)){
					//另存为this
					var that = this;

					//用表单上的URL 设定API 地址
					this.model.set("url",this.$el.find("#form-signin").attr('action'));

					//设置是否记住我
					this.model.set("RememberMe",this.$el.find("#form-signin input[type=checkbox]").is(':checked'));

					//为提交给API 清理数据
					var data = this.model.toJSON();
					delete data.invalid;

					//如果有效，发送模型
					$.ajax({
						type:"POST",
						url:data.url,
						data:data,
						dataType: 'json',
						success: function (data){
							if(data.result){ //登录成功，则设置currentUser并重定向

								require(["models/LoginUser"],function(LoginUserModel){
									var currentUser = new LoginUserModel({
										UserName:that.model.get("UserName")
									});
									ClientManage.CurrentUser = currentUser;
								});

								require(["apps/CM_app"],function(CM){
									ClientManage.trigger("render:frame");       //渲染界面框架
									//ClientManage.navigate("Home/Index",{trigger:true});
									//ClientManage.trigger("home:index");
								});
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
			},
			onRender: function(){
				if(_.size(this.model.get("invalid").toJSON())){
					this.ui.error.css("display","block");
				}
			}
		})
	});
	return ClientManage.SignIn.DoSignIn.View;
});
