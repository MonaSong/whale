/**
 *@Author Mona
 *@date 2016-12-20
 *@description 质押管理网络接口封装
 */
 var HttpUtils = (function () {
	    
	    //质押管理网络接口
	    var application = {};
	    
	    /**
	     * 获取质押管理列表信息
	     */
	    application.get_pledge_list_data = function(param,callback){
	    	var url = '/pledge/pledge_supervision_infos';
	    	BaseRequest.sync_get(param,url,callback)
	    } 
	    /**
	    * 
	    * 获取各个状态数量
	    */
	    application.get_pledge_status_num = function(param,callback){
	    	var url = '/pledge/pledge_supervision_count';
	    	BaseRequest.get(param,url,callback);
	    }

	    /**
	    * 查询巡检记录 param firstDate count pledgeBusinessKey
	    */
	    application.get_records_data = function(param,callback){
	    	var url = '/inspection/find_inspection_records';
	    	BaseRequest.sync_get(param,url,callback);
	    }

	    /**
	    * 更新巡检记录的照片 param pledgeBusinessKey inspectionDate files
	    */
	    application.update_records_pic_data = function(param,callback,error_callback){
	    	var url = contextPath+'/inspection/update_inspection_pic';
	    	var form_data = new FormData();
	    	$.each(param.files,function(i,item){
	    		form_data.append('files',item.value);
	    	})
	    	$.each(param.data,function(j,info){
	    		form_data.append(j,info);
	    	})
	    	$.ajax({
	            type:'post',
	            data:form_data,
	            url:url,
	            contentType:false,
	            dataType:'json',
	            processData:false,
	            success:function(data,textStatus,jqXHR){
	                if($.isFunction(callback)){
	                    callback(data,textStatus,jqXHR);
	                }
	            },
	            error:function(jqXHR,textStatus,errorThrown){
	                renderErrorMsg(jqXHR,textStatus,errorThrown);
	                if($.isFunction(error_callback)){
	                    error_callback();
	                }
	            }
	        })
	    }

	    /**
	    * 删除已经上传的巡检图片
	    */

	    application.delete_records_pic = function(param,callback){
	    	var url = '/inspection/delete_inspection_pic';
	    	BaseRequest.post_form_data(param,url,callback);
	    }

	    return application 
 })()
