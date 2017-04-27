/**
 * @Author yugang
 * @Date 2016-11-17
 * @description 登录管理请求接口封装
 */

var HttpUtils = (function () {
    /**
     * 封装基本请求方式
     */
    //所有请求接口对象
    var application = {};

    /**
     * 登录请求
     */
    application.get_login_data = function (param,callback) {
    	var url = '/login';
    	BaseRequest.post_string_data(param,url,callback);
    }

    /**
    * 忘记密码数据提交
    */
    application.get_forgetpassword_data = function(param,callback){
        var url = '/forgetpwd';
        BaseRequest.post_string_data(param,url,callback)
           
    }
    
    /**
     * 通过用户名取得手机号
     */
    application.get_mobile_data = function(param,callback){
    	var url = '/userinfo_by_name';
        BaseRequest.get(param,url,callback)
    }
    
    /**
     * 发送验证码
     */
    application.get_Code_data = function(param,callback){
    	var url = '/code_by_phone';
        BaseRequest.get(param,url,callback)
    }
    
    /**
     * 获取菜单
     */
    application.get_menu_data = function(callback){
    	var url = '/role/role_menu';
        BaseRequest.sync_get(param,url,callback)
    }
    /**
     * 后台用户登录
     */
    application.get_system_data = function (param,callback) {
    	var url = '/system_login';
    	BaseRequest.post_string_data(param,url,callback);
    }
    /**
     * 运营后台用户登录激活
     */
    application.get_first_data = function (param,callback) {
    	var url = '/first_login';
    	BaseRequest.post_form_data(param,url,callback);
    }
    /**
     * 检查用户名是否被注册
     */
/*     application.get_usermobile_data = function(param,callback){
         var url = '/check_mobile';
         BaseRequest.get(param,url,callback)
            
     }*/
    return application;
})();
