/**
 * @Date:2016/11/28
 * @Author:yugang
 * @Description:角色管理接口封装
 */

var roleRequest = {};

/**
 * @description 获取角色管理列表数据
 * @param {param} 请求参数
 * @param {callback} function 请求成功的回调函数，参数是请求成功之后返回的数据
 */
roleRequest.get_roleListRequest=function (param,callback){
	$.ajax({
        type:'get',
        data:param,
        url:contextPath+'/role/role_institutiontype_all.json',
        async:false,
        dataType:'json',
        success:function(data){
        	if(data=='' || data.statusCode==undefined){
                return
            }
            if(data.statusCode=='200' && data.data!==undefined){
                if($.isFunction(callback)){
                    callback(data);
                }               
            }
        },
        error:function(jqXHR,textStatus,errorThrown){
            renderErrorMsg(jqXHR,textStatus,errorThrown);
        }
    })
}

/**
 * @description 获取角色管理详情数据保存
 * @param {param} 请求参数
 * @param {callback} function 请求成功的回调函数，参数是请求成功之后返回的数据
 */
roleRequest.get_roledetailRequest=function (param,callback){
	$.ajax({
        type:'post',
        data:param,
        url:contextPath+'/role/role_info_update.json',
        async:false,
        dataType:'json',
        success:function(data){
        	if(data=='' || data.statusCode==undefined){
                return
            }
            if(data.statusCode=='200' && data.data!==undefined){
                if($.isFunction(callback)){
                    callback(data);
                }               
            }
        },
        error:function(jqXHR,textStatus,errorThrown){
            renderErrorMsg(jqXHR,textStatus,errorThrown);
        }
    })
}