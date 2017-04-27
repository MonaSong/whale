/**
 * @Author yugang
 * @Date 2016-11-21
 * @description 酒厂入驻管理请求接口封装
 */
var HttpUtils = (function () {
    /**
     * 封装基本请求方式
     */
    //所有请求接口对象
    var application = {};

    /**
     * 检验用户名
     */
    application.get_username_data = function (param,callback) {
    	var url = '/check_user';
    	BaseRequest.get(param,url,callback);
    }

    /**
    * 酒厂入驻申请数据提交
    */
    application.get_winData_data = function(param,callback){
        var url = '/win_regist';
        BaseRequest.post_multipart_form_data(param,url,callback)
           
    }
    
    /**
     * 入驻数据回显
     */
    application.get_windataEcho_data = function(param,callback){
    	var url = '/winmanage/wineryInfo';
        BaseRequest.get(param,url,callback)
    }
    
    /**
     * 入驻数据回显修改
     */
    application.get_windataSubmit_data = function(param,callback){
    	var url = '/winmanage/wineryInfo/update';
        BaseRequest.post_multipart_form_data(param,url,callback)
    }
    
    /**
     * 发送邀请码
     */
    application.get_Code_data = function(param,callback){
    	var url = '/code_by_phone';
        BaseRequest.get(param,url,callback)
    }
    
    /**
     * check机构名称
     */
    
    application.get_conpanyName_data = function (param,callback) {
    	var url = '/check_instition';
    	BaseRequest.get(param,url,callback,'url');
    }
    /**
     * @Author yjx
     * @Date 2017-1-16
     * @description 用户注册
     */
    application.get_userCenter_data = function (param,callback) {
    	var url ="/regsiterInUserCenter";
    	BaseRequest.post_form_data(param,url,callback);
    }
    /**
     * 图片验证码
     */
    application.get_imgcode_data = function (callback) {
    	var url ="/verfiyPic";
    	BaseRequest.get(param,url,callback);
    }
    /**
     * 忘记密码数据提交
     */
     application.get_forgetpassword_data = function(param,callback){
         var url = '/forgetpwd_step_3';
         BaseRequest.post_form_data(param,url,callback)
            
     }
     /**
      * 图片验证码是否正确
      */
      application.get_validatePicCode_data = function(param,callback){
          var url ='/forgetpwd_step_1';
          BaseRequest.post_form_data(param,url,callback)
             
      }
      /**
       * 图片验证码是否正确
       */
       application.get_forgetpwd_data = function(param,callback){
           var url ='/forgetpwd_step_2';
           BaseRequest.post_form_data(param,url,callback)
              
       }
      /**
       *手机验证码是否正确
       */
/*      application.get_identifying_data = function(param,callback){
          var url ='/check_identifying';
          BaseRequest.post_string_data(param,url,callback)
             
      }*/
     /**
      * 登出
      */
     application.get_out_data = function(callback){
     	var url = '/logout';
     	var param = '';
        BaseRequest.get(param,url,callback)
     }
    return application;
})();

