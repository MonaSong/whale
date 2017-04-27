/**
 * @Author Mona
 * @date 2016-12-21
 * @description 风险管理接口封装
 */
var HttpUtils = (function () {
	    
	    //风险提示网络接口
	    var application = {};

	    application.get_risk_managementData = function(param,callback){
	        var url = "/riskmanagement/list_all";
	        BaseRequest.sync_get(param,url,callback);
	    }

	    /**
        * 风险提示数据回显
        */
	    application.get_risk_waring_echo_data = function(param,callback){
	        var url = "/riskmanagement/show_risk_warn";
	        BaseRequest.get(param,url,callback);
	    }

        /**
        * 启动风险流程
        */
        application.start_risk_process = function(param,callback){
            var url = '/riskmanagement/new_risk_warn';
            BaseRequest.post_multipart_form_data(param,url,callback,'','formdata');
        }

        /**
        * 风险审核回显数据
        */
        application.get_risk_audit_echo_data = function(param,callback){
            var url = '/riskmanagement/find_risk_warn';
            BaseRequest.get(param,url,callback)
        }

        /**
        * 风险审核 真安金服审核
        */
	    
        application.post_risk_audit_data = function(param,callback){
            var url = '/riskmanagement/risk_audit';
            BaseRequest.post_multipart_form_data(param,url,callback,'','formdata');
        }

        /**
        * 风险确认 回显数据
        */
        application.get_risk_confirm_echo_data = function(param,callback){
            var url = '/riskmanagement/find_risk_confirm';
            BaseRequest.get(param,url,callback);
        }

        /**
        * 风险确认 资方确认风险
        */
        application.post_risk_confirm_data = function(param,callback){
            var url = '/riskmanagement/risk_confirm';
            BaseRequest.post_form_data(param,url,callback)
        }

	    return application 
 })()

var roleInfo = new Role();
var roleId = roleInfo.getRoleId();
var is_jg_operator = role.compareTo(roleId,role["jg_operator"]); //是否是监管方

function setManageInfo(selector,role_name,true_name,handle_time){
    var manage_info_dom = $(selector).find('[data-management-info=""]');
    manage_info_dom.find('[data-role-name]').text(role_name);
    manage_info_dom.find('[data-true-name]').text(true_name);
    manage_info_dom.find('[data-management-time]').text('办理时间：'+handle_time);
    manage_info_dom.show();
}

var businessKey = window.sessionStorage["businessKey"];
var risk_warn = window.sessionStorage["risk_warn"] == 'pledge';

/**
* @description 拿到风险提示的businesskey
* @return object 是否是新的风险业务，当前的风险业务编码
*/
function getBusFromOtherModules(){
    var my_bus_key = '';
    var cur_bus_key = window.sessionStorage["businessKey"];
    var cur_risk_bus_key = window.sessionStorage["riskBusinessKey"];
    var is_new_risk_key = (cur_bus_key==cur_risk_bus_key)||(cur_risk_bus_key=='');

    var risk_warn = window.sessionStorage["risk_warn"];//从还款进来
    if(cur_risk_bus_key){
        if(is_new_risk_key){
            my_bus_key = cur_bus_key;
        }else{
            my_bus_key = cur_risk_bus_key;
        }
    }else{
        my_bus_key = cur_bus_key
    }
    
    return {'is_new_risk_key':is_new_risk_key,'my_bus_key':my_bus_key}
}

var is_new_bus = false;//是否是新的风险提示业务
var my_bus_key = '';//当前风险业务编号有可能是新增编号也有可能是浏览编号

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

    setMenuStatus(window.sessionStorage["riskManagementMenuId"]);

    
    //返回按钮渲染 如果有返回地址就进入之前的地址，如果没有就返回我的办理列表
    window.sessionStorage["historyRef"]?$('[data-back-to]').attr({'href':window.sessionStorage["historyRef"]}):$('[data-back-to]').attr({'href':contextPath+'/anagement_page'});

    //从还款过来的业务编号  
    var cur_bus_key_obj = getBusFromOtherModules();
    is_new_bus = cur_bus_key_obj.is_new_risk_key;
    my_bus_key = cur_bus_key_obj.my_bus_key;

    console.debug('当前bus'+my_bus_key);

    new ProcessNodeMenu('risk',my_bus_key);

})
