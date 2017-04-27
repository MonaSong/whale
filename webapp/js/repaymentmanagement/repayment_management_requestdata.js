/**
 * @Date 2016-12-9
 * @Author yugang
 * @description 还款管理网络层封装
 */


/**
 * 封装项目的所有网络请求
 */
var HttpUtils = (function () {
    /**
     * 封装基本请求方式
     */

    //还款管理的所有请求接口对象
    var application = {};
    
    /*
     * 拿到角色
     */
    
    application.get_repay_data = function(callback){
        var url = '/session';
        BaseRequest.sync_get(param,url,callback)
           
    }
    
    /*
     * 还款头部统计数  
     */
    application.get_repayCount_data = function(callback){
        var url = '/repayment/repayment_plan_count';
        BaseRequest.get(param,url,callback);
    }
    
   /*
    * 拿到还款管理列表信息 
    */
    
    application.get_repayment_echo_data = function(param,callback){
        var url ='/repayment/repayment_plan_list';
        BaseRequest.sync_get(param,url,callback)
    }
    
    /**
    * 具体的还款计划
    */
    application.get_singe_repayment_echo_data = function(param,callback){
        var url  ='/repayment/repaymentinfo/';
        BaseRequest.sync_get(param,url,callback,'url');
    }
    
    /**
     * 资方启用还款计划
     */
    application.get_repayStatus_data = function(param,callback){
    	var url='/repayment/update_repaymentplan_status'
    	BaseRequest.post_form_data(param,url,callback)	
    }
    
    /**
     * 资方保存数据
     */
    
    application.get_repaySave_data = function(param,callback){
    	var url='/repayment/update_repayment_details'
    	BaseRequest.post_string_data(param,url,callback)	
    }
    
    /**
     * 修改还款期次状态
     */
    application.get_modifyStatus_data = function(param,callback){
    	var url='/repayment/update_repayment_status'
    	BaseRequest.post_form_data(param,url,callback)	
    }
    
    /**
     * 上传收款凭证
     */
    
    application.get_uploadPic_data = function(param,callback){
    	var url='/repayment/upload_receipt_pic'
    	BaseRequest.post_multipart_form_data(param,url,callback,"","formdata")	
    }
    
    /**
     * 上传还款凭证
     */
    
    application.get_repayPic_data = function(param,callback){
    	var url='/repayment/upload_repayment_pic'
    	BaseRequest.post_multipart_form_data(param,url,callback,"","formdata");	
    }
    
    /**
     * 启动解押流程
     */
    
    application.get_maturityNum_data = function(param,callback){
    	var url='/maturity/hasexpire'
    	BaseRequest.get(param,url,callback);	
    }
    
    return application;
})();

$(function(){
	$('[data-date]').datetimepicker({format: 'yyyy-mm-dd',language:'zh-CN'});
})

