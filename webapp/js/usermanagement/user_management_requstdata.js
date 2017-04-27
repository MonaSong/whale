/**
 * @Author yjx
 * @Date 2016-11-07
 * @description 用户管理请求接口封装
 */

/**
 * @Author yjx
 * @date 2016-11-09
 * @description 用户管理请求对象
 */

var HttpUtils = (function () {
    /**
     * 封装基本请求方式
     */
    //所有请求接口对象
    var application = {};

    /**
     * 用户列表数据
     */
    application.get_managementList_data = function (param,callback) {
    	var url = '/user/all_user_list';
    	BaseRequest.sync_get(param,url,callback);
    }

    /**
    * 检查用户名是否被注册
    */
    application.get_username_data = function(param,callback){
        var url = '/check_user';
        BaseRequest.get(param,url,callback)
           
    }
    
    /**
     * 获取机构
     */
    application.get_institution_data = function(callback){
    	var url = '/user/add_user_institution_list';
        BaseRequest.sync_get(param,url,callback)
    }
    
    /**
     * 用户状态对应的记录数显示
     */
    application.get_userCount_data = function(callback){
    	var url = '/user/getAdminUserListCount';
        BaseRequest.get(param,url,callback)
    }
    
    /**
     * 删除用户表格数据
     */
    application.get_deleteUser_data = function(param,callback){
    	var url = '/delete';
        BaseRequest.get(param,url,callback)
    }
    
    /**
     * 重置密码
     */
    application.get_resetPwd_data = function(param,callback){
    	var url = '/resetpwd';
        BaseRequest.post_form_data(param,url,callback)
    }
    
    /**
     * 获取用户角色
     */
    application.get_userRole_data = function(param,callback){
    	var url = '/user/role_list';
        BaseRequest.get(param,url,callback)
    }
    
    /**
     * 获取机构类型
     */
    application.get_institutionType_data = function(param,callback){
    	var url = '/user/institution_type_find';
        BaseRequest.get(param,url,callback)
    }
    
    /**
     * 保存用户详情
     */
    application.get_savedatail_data = function(param,callback){
    	var url = '/update_other_user';
        BaseRequest.post_string_data(param,url,callback)
    }
    
    /**
     * 保存新增用户数据
     */
    application.get_savenew_data = function(param,callback){
    	var url = '/system_regist';
        BaseRequest.post_string_data(param,url,callback)
    }
    return application;
})();