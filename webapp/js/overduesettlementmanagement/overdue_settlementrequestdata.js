 /**
 *@Author Mona
 *@date 2017-01-03
 *@description 逾期理赔接口封装
 */

 var HttpUtils = (function () {    
	
    //逾期理赔网络接口对象
	var application = {};	

    /**
    *发起理赔
    */
    application.post_start_oversettlement_data = function(param,callback){
        var url='/overdue/new_overdue';
        BaseRequest.post_multipart_form_data(param,url,callback,'','formdata')
    }

    /**
    *发起理赔回显
    */
    application.get_settlementdetail_echo_data = function(param,callback){
        var url='/overdue/compensation_data_show';
        BaseRequest.get(param,url,callback)
    }
     
    /**
    * 保险赔付
    */
    application.post_insurance_payment_data = function(param,callback){
      var url='/overdue/insurance_payment';
      BaseRequest.post_multipart_form_data(param,url,callback,'','formdata')
    }


    /**
    * 保险赔付回显
    */
    application.get_insurance_payment_echo_data = function(param,callback){
        var url='/overdue/insurance_payment_show';
        BaseRequest.get(param,url,callback)
    }  

    /**
    * 资方收款
    */
    application.post_capital_collected_data = function(param,callback){
       var url='/overdue/capital_collected';
       BaseRequest.post_multipart_form_data(param,url,callback,'','formdata');
    }

    /**
    * 资方收款回显
    */
    application.get_capital_collected_echo_data = function(param,callback){
        var url='/overdue/capital_collected_show';
        BaseRequest.get(param,url,callback);
    }

    /**
    * 启动回购
    */
    application.post_buy_back_data = function(param,callback){
        var url='/overdue/buy_back';
        BaseRequest.post_multipart_form_data(param,url,callback,'','formdata');
    }

    /**
    * 启动回购回显
    */
    application.get_buy_back_echo_data = function(param,callback){
        var url='/overdue/buy_back_show';
        BaseRequest.get(param,url,callback);
    }


    /**
    * 解除保单
    */
    application.post_close_policy_data = function(param,callback){
        var url='/overdue/close_policy';
        BaseRequest.post_multipart_form_data(param,url,callback,'','formdata');
    } 

    /**
    * 解除保单回显
    */  
    application.get_close_policy_echo_data = function(param,callback){
        var url='/overdue/close_policy_show';
        BaseRequest.get(param,url,callback)
    }  

    /**
    * 解除质押
    */  
    application.post_close_pledge_data = function(param,callback){
        var url='/overdue/close_pledge';
        BaseRequest.post_multipart_form_data(param,url,callback,'','formdata');
    } 

    /**
    * 解除质押回显
    */  
    application.get_close_pledge_data = function(param,callback){
        var url='/overdue/close_pledge_show';
        BaseRequest.get(param,url,callback);
    }  

    /**
    * 提货
    */  
    application.post_delivery_data = function(param,callback){
        var url='/overdue/delivery';
        BaseRequest.post_multipart_form_data(param,url,callback,'','formdata');
    }

    /**
    * 提货回显
    */  
    application.get_delivery_echo_data = function(param,callback){
        var url='/overdue/delivery_show';
        BaseRequest.get(param,url,callback)
    }  

    /**
    * 逾期理赔列表
    */

    application.get_overdue_list_data = function(param,callback){
        var url = '/overdue/list_all';
        BaseRequest.sync_get(param,url,callback);
    }


	return application 
 })()

function showManageInfo(parentDom,roleAudit){
    parentDom.find('[data-role-name]').text(roleAudit.roleName);
    parentDom.find('[data-true-name]').text(roleAudit.userName);
    parentDom.find('[data-management-time]').text('办理时间：'+roleAudit.time);
    parentDom.find('[data-management-info]').show();  
}

/**
* @description 拿到风险提示的businesskey
* @return object 是否是新的风险业务，当前的风险业务编码
*/
function getBusFromOtherModules(){
    var my_bus_key = '';
    var cur_bus_key = window.sessionStorage["businessKey"];
    var cur_overdue_bus_key = window.sessionStorage["overdueBusinessKey"];
    var is_new_overdue_key = (cur_bus_key == cur_overdue_bus_key);

    var risk_warn = window.sessionStorage["risk_warn"];//从还款进来
    if(cur_overdue_bus_key){
        if(is_new_overdue_key){
            my_bus_key = cur_bus_key;
        }else{
            my_bus_key = cur_overdue_bus_key;
        }
    }else{
        my_bus_key = cur_bus_key
    }
    
    return {'is_new_overdue_key':is_new_overdue_key,'my_bus_key':my_bus_key}
}

var is_new_bus = false;//是否是新的逾期理赔业务
var my_bus_key = '';//当前逾期理赔编号有可能是新增编号也有可能是浏览编号

//当前用户信息
var role_info = new Role();
var role_id = role_info.getRoleId();
var is_jg_operator = role.compareTo(role_id,role["jg_operator"]);

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
    

    function setMenuStatus(id){
        var menu_li_list_dom = $('#menu ul li');
        $.each(menu_li_list_dom,function(i,item){
            if($(item).attr('data-user-menu-id')==id){
                $(item).addClass('active')
            }else{
               $(item).removeClass('active'); 
            }
            
        })

    }

    setMenuStatus(window.sessionStorage["overdueManagementMenuId"]);
    


    //从还款过来的业务编号  
    var cur_bus_key_obj = getBusFromOtherModules();
    is_new_bus = cur_bus_key_obj.is_new_overdue_key;
    my_bus_key = cur_bus_key_obj.my_bus_key;
    
    new ProcessNodeMenu('overdue',my_bus_key);
    
    //返回按钮渲染 如果有返回地址就进入之前的地址，如果没有就返回我的办理列表
    window.sessionStorage["historyRef"]?$('[data-back-to]').attr({'href':window.sessionStorage["historyRef"]}):$('[data-back-to]').attr({'href':contextPath+'/anagement_page'});
})