/**
 * @Author yugang
 * @Date 2016-11-08
 * @description 合作方管理请求接口封装
 */
var HttpUtils = (function () {
    /**
     * 封装基本请求方式
     */
    //整个项目的所有请求接口对象
    var application = {};

    /**
     * 合作方类型数据
     */
    application.get_partnertype_data = function (callback) {
    	var url = '/partner/find_all_partnertype';
    	BaseRequest.get(param,url,callback);
    }

    /**
    * 合作方列表数据
    */
    application.get_partnermanagement_data = function(param,callback){
        var url = '/partner/partner_find_all';
        BaseRequest.sync_get(param,url,callback)
           
    }
    
    /**
     * 合作方详情数据保存
     */
    application.get_partnerdetail_data = function(param,callback){
    	var url = '/partner/partner_update';
        BaseRequest.post_string_data(param,url,callback)
    }
    
    /**
     * 合作方类型数据修改
     */
    application.get_partnertypeModify_data = function(param,callback){
    	var url = '/partner/partner_type_update';
        BaseRequest.post_form_data(param,url,callback)
    }
    
    /**
     * 合作方新增数据保存
     */
    application.get_partnerNew_data = function(param,callback){
    	var url = '/partner/partner_new_add';
    	BaseRequest.post_string_data(param,url,callback)
    }
    
    /**
     * 启用禁用
     */
    application.get_partnerstatus_data = function(param,callback){
    	var url = '/partner/change_partner_status';
        BaseRequest.post_form_data(param,url,callback)
    }
    return application;
})();
