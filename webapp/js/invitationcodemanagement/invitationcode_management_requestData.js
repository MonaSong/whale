/**
 * @Author yugang
 * @Date 2016-11-07
 * @description 邀请码请求接口封装
 */
var HttpUtils = (function () {
    /**
     * 封装基本请求方式
     */
    //所有请求接口对象
    var application = {};

    /**
     * 获取邀请码列表
     */
    application.get_invitationcode_data = function (param,callback) {
    	var url = '/invitationcode/invitationcode_list';
    	BaseRequest.sync_get(param,url,callback);
    }

    /**
    * 获取当前sesson
    */
    application.get_invitationrole_data = function(callback){
        var url = '/session';
        BaseRequest.sync_get(param,url,callback)
           
    }
    
    /**
     * 邀请码统计
     */
    application.get_invitationcount_data = function(callback){
    	var url = '/invitationcode/count';
        BaseRequest.get(param,url,callback)
    }
    
    /**
     * 邀请码新增
     */
    application.get_invitationAdd_data = function(param,callback){
    	var url = '/invitationcode/batch_generate';
        BaseRequest.get(param,url,callback)
    }
    return application;
})();

