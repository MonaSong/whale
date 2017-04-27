/**
 * @Author Mona
 * @data 2016-11-03
 * @description 酒厂管理接口封装
 */

var winManagementRequest = {};

winManagementRequest._core_get_data = function(param,url,callback){
    if(param==''||param==null){
        param = new Date().getTime();
    }
    var data = param;
    $.ajax({
        type:'get',
        url:contextPath+url+'.json',
        data:data,
        async:false,
        dataType:'json',
        success:function(data,textStatus,jqXHR){
            if($.isFunction(callback)){
                 callback(data,textStatus);

            }
        },
        error:function(jqXHR,textStatus,errorThrown){
            renderErrorMsg(jqXHR,textStatus,errorThrown)
        }
    })
}

//拿到省区经理数据
winManagementRequest.get_provinceManagers = function(callback){
    var provinceData = null;
    $.ajax({
        type:'get',
        url:contextPath+'/provinceManagers.json',
        async:false,
        success:function(data){
            if(data!==undefined && data.data!==null && data.data.length>0){
                var h = '';
                provinceData = data.data;
                h+='<option value=""></option>';
                $.each(provinceData,function(i,item){
                    h+='<option value="'+item.uid+'">'+item.trueName+'</option>';
                })
                $('[name="provinceUserId"]').html(h);
                if($.isFunction(callback)){
                    callback(provinceData)
                }
            }
        }
    })
    return provinceData;
}

//酒厂信息
winManagementRequest.get_win_info = function(param,callback){
    var url = contextPath+"/winmanage/wineryInfo";
    $.ajax({
        type:"get",
        url:url+'/'+param+'.json',
        success:function(data){
            if($.isFunction(callback)){
                callback(data);
            }            
        },
        error:function(jqXHR,textStatus,errorThrown){
            console.debug('获取酒厂信息出错');
            renderErrorMsg(jqXHR,textStatus,errorThrown)
        }
    })
}

//中酒事务助理审核
winManagementRequest.post_sudit = function(param,callback){
    var url =contextPath+'/winmanage/audit.json';
    $.ajax({
        type:'post',
        url:url,
        data:param,
        success: function (data,textStatus) {
            if($.isFunction(callback)){
                callback(data,textStatus);
            }
        },
        error:function(jqXHR,textStatus,errorThrown){
            renderErrorMsg(jqXHR,textStatus,errorThrown)
        }
    })
}

//审核数据回显
winManagementRequest.get_echo_data = function(param,callback){
    var url = "/winmanage/auditOpinion"
    winManagementRequest._core_get_data(param,url,callback)
}

//酒厂列表信息
winManagementRequest.get_win_list = function(param,callback){
    var url = '/winmanage/wineryInfos/fuzzy';
    winManagementRequest._core_get_data(param,url,callback)
}

//获取酒厂各状态记录数
winManagementRequest.get_winery_count = function(callback){
    var url = contextPath + '/winmanage/wineryCount.json';
    $.ajax({
        type:'get',
        url:url,
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

winManagementRequest.get_winery_info_by_search = function(param,callback){
    var url = contextPath+'/winmanage/wineryInfos/fuzzy.json';
    $.ajax({
        type:'get',
        data:param,
        url:url,
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

function showManageInfo(parentDom,roleAudit){
    parentDom.find('[data-role-name]').html(roleAudit.roleName);
    parentDom.find('[data-true-name]').text(roleAudit.userName);
    parentDom.find('[data-management-time]').text('办理时间：'+roleAudit.endTime);
    parentDom.find('[data-institution-name]').text('('+roleAudit.institutionName+')');
    parentDom.find('[data-management-info]').show();  
}

$(function(){

    //返回按钮渲染 如果有返回地址就进入之前的地址，如果没有就返回我的办理列表
    window.sessionStorage["historyRef"]?$('[data-back-to]').attr({'href':window.sessionStorage["historyRef"]}):$('[data-back-to]').attr({'href':contextPath+'/anagement_page'});
})


function setOpinionInfo(selector,msg){
    msg?$(selector).val(msg):$(selector).attr('placeholder','');
}

$(function(){
    //select
    $('select.form-control').on('change',function(){
        if($(this).hasClass('refuse')||$(this).hasClass('agree')){
            var cur_class = $(this).hasClass('refuse')?'refuse':'agree';
           $(this).removeClass(cur_class); 
        }       
    })
})

var HttpUtils = (function() {

	//酒厂管理接口对象
	var application = {};

    /**
    * 酒厂信息回显
    */
	application.get_message_management_data = function(param, callback) {
			var url = "/winmanage/winery_by_user_id";
			BaseRequest.get(param, url, callback);
	}

    /**
    * 酒厂信息修改
    */
	application.get_wineryinfo_data= function(param, callback) {
		var url = "/winmanage/winery_info_update";
		BaseRequest.post_form_data(param, url, callback);
	}

	return application
})()

