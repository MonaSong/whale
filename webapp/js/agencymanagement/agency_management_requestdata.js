/**
 * @Author yugang
 * @Date 2016-11-10
 * @description 机构管理请求接口封装
 */

var HttpUtils = (function () {
    /**
     * 封装基本请求方式
     */
    //整个项目的所有请求接口对象
    var application = {};

    /**
     * 机构类型数据
     */
    application.get_agencyType_data = function (callback) {
    	var url = '/agency/institutype_exclude_finance';
    	BaseRequest.get(param,url,callback);
    }

    /**
    * 机构列表数据
    */
    application.get_agencylist_data = function(param,callback){
        var url = '/agency/institu_list_find';
        BaseRequest.sync_get(param,url,callback)
           
    }
    
    /**
     * 机构详情数据保存
     */
    application.get_agencydetail_data = function(param,callback){
    	var url = '/agency/institution_update';
        BaseRequest.post_string_data(param,url,callback)
    }
    
    /**
     * 机构类型数据修改
     */
    application.get_agencyModify_data = function(param,callback){
    	var url = '/agency/update_institutype';
        BaseRequest.post_form_data(param,url,callback)
    }
    
    /**
     * 机构新增数据保存
     */
    application.get_agencyNew_data = function(param,callback){
    	var url = '/agency/institution_add';
    	BaseRequest.post_string_data(param,url,callback)
    }
    
    /**
     * 启用禁用
     */
    application.get_agencyEnable_data = function(param,callback){
    	var url = '/agency/change_status';
        BaseRequest.post_form_data(param,url,callback)
    }
    return application;
})();

