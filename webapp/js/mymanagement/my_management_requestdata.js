/**
 * @Author Mona
 * @Date 2016-11-01
 * @description 我的办理请求接口封装
 */
var myManagementRequestget = {};

/**
 * @author Mona
 * @Date 2016-11-01
 * @description 获取用户列表
 * @param {data} object 请求参数
 * @param {callback} function 请求成功的回调函数，参数是请求成功之后返回的数据
 */

myManagementRequestget.get_my_magagement_data = function (data,callback){
    $.ajax({
        type:'get',
        data:data,
        url:contextPath+'/activiti/my_work_list',
        async:false,
        dataType:'json',
        success:function(data){
            if($.isFunction(callback)){
                 callback(data);   
            }            
        },
        error:function(jqXHR,textStatus,errorThrown){
            renderErrorMsg(jqXHR,textStatus,errorThrown);
        }
    })
}

myManagementRequestget.get_my_magagement_count = function(callback){
    var url = contextPath+'/activiti/myTaskCount';
    $.ajax({
        type:'get',
        url:url,
        success:function(data){
            if(data==''){
                return
            }
            if(data.statusCode==undefined){
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






