    /**
     * @Author yjx
     * @date 2016-11-16
     * @description 到期解压接口封装
     * @data object
     * @callback function 
     * @return 
     */
    var HttpUtils = (function() {

    	//融资申请流程所有请求接口对象
    	var application = {};
    	/**
    	 * 
    	 */
    	application.get_maturity_management = function(param, callback) {
    			var url = "/maturity/list_all";
    			BaseRequest.sync_get(param, url, callback);
    		}
    		//解除质押数据回显
    	application.get_maturity_dataEcho = function(param, callback) {
    			var url = "/maturity/close_peldge_show";
    			BaseRequest.sync_get(param, url, callback);
    		}
    		//解除保单数据回显
    	application.get_Release_policy = function(param, callback) {
    			var url = "/maturity/close_policy_show";
    			BaseRequest.get(param, url, callback);
    		}
    		//酒厂业务员收货回显
    	application.get_Receipt_delivery = function(param, callback) {
    		var url = "/maturity/search_receipt";
    		BaseRequest.get(param, url, callback);
    	}
    	application.get_starting_Solution = function(param, callback) {
    			var url = "/maturity/start_expire_show";
    			BaseRequest.sync_get(param, url, callback);
    		}
    		//酒厂收货
    	application.get_Winery_receipt = function(param, callback) {
    			var url = "/maturity/receipt";
    			BaseRequest.post_multipart_form_data(param, url, callback);
    		}
    		//启动到期解压流程
    	application.get_Start_expire = function(param, callback) {
    			var url = "/maturity/start_expire";
    			BaseRequest.post_form_data(param, url, callback);
    		}
    		//解除保单流程
    	application.get_Close_policy = function(param, callback) {
    			var url = "/maturity/close_policy";
    			BaseRequest.post_multipart_form_data(param, url, callback, '', 'formdata');
    		}
    		//解除质押流程
    	application.get_lifting_pledge = function(param, callback) {
    		var url = "/maturity/close_peldge";
    		BaseRequest.post_multipart_form_data(param, url, callback, '', 'formdata');
    	}
    	application.get_winery_receipt = function(param, callback) {
    		var url = "/maturity/receipt";
    		BaseRequest.post_multipart_form_data(param, url, callback, '', 'formdata');
    	}
    	application.get_maturity_hasexpire = function(param, callback) {
    		var url = "/maturity/hasexpire";
    		BaseRequest.get(param, url, callback);
    	}
    	return application
    })()

$(function(){
	//input type="file"
	$('input[type="file"]').on('change',function(){
        var file = this.files[0];
        var limit_size = (file.size/(1024*1024))>100;//大小限制100m
        if(limit_size){
            this.value = '';
            alert('请上传小于100M的文件！');
            return 
        }
    })
	var maturity_businesskey=window.sessionStorage["maturity-businessKey"];
	if(maturity_businesskey==''||maturity_businesskey == null || maturity_businesskey==undefined ){
	    var businessKey = window.sessionStorage["businessKey"];
	}else{
		var businessKey=maturity_businesskey;
	}
    risk_warn = window.sessionStorage["risk_warn"] == 'pledge';
    (businessKey&&!risk_warn)?new ProcessNodeMenu('decompression',businessKey):'';
})

    