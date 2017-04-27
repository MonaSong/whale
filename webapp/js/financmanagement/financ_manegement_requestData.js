/**
 * @Author Mona
 * @date 2016-11-08
 * @description 融资申请
 */

/**
 * 封装项目的所有网络请求
 */
var HttpUtils = (function () {
    
    //融资申请流程所有请求接口对象
    var application = {};

    /**
    * 获取用户是否被禁用
    */
    application.get_user_institution_status = function(param,callback){
        var url = '/user/user_institution_status';
        BaseRequest.get(param,url,callback);
    }

    /**
    * 获取融资申请列表
    */
    application.get_all_finace_record = function(param,callback){
        var url = '/finance/all_finance_list';
        BaseRequest.sync_get(param,url,callback);
    }

    /**
    * 获取融资申请回显信息
    */
    application.get_finance_info_echo_data = function(param,callback){
        var url = '/finance/finance_info';
        BaseRequest.get(param,url,callback);
    }


    /**
     * 新增融资申请
     */
    application.post_financ_data = function (param,callback,opt_error) {
        var url = '/finance/save_financeinfo';
        BaseRequest.post_multipart_form_data(param,url,callback,opt_error);
    }
    /**
    * 融资申请回显数据
    */
    application.get_finance_info_echo_data = function(param,callback){
        var url = '/finance/finance_info';
        BaseRequest.get(param,url,callback)
    }

    /**
    * 修改融资申请信息
    */
    application.update_finance_info = function(param,callback,opt_error){
        var url = '/finance/finance_info_update';
        BaseRequest.post_multipart_form_data(param,url,callback,'',opt_error);
    }

    /**
    * 提交信息审核数据-省区经理
    */
    application.post_audit_province = function(param,callback){
        var url  = '/finance/save_province';
        BaseRequest.post_string_data(param,url,callback)
    }

    /**
    * 提交信息审核数据-渠道总监
    */
    application.post_audit_director = function(param,callback){
        var url  = '/finance/save_director';
        BaseRequest.post_string_data(param,url,callback)
    }

    /**
    * 提交信息审核数据-中酒信贷专员
    */
    application.post_audit_credit = function(param,callback){
        var url  = '/finance/save_credit';
        BaseRequest.post_string_data(param,url,callback)
    }

    /**
    * 提交信息审核数据-真安信审员
    */
    application.post_audit_lettertrial = function(param,callback,opt_error){
        var url  = '/finance/save_lettertrial';
        BaseRequest.post_string_data(param,url,callback,'',opt_error) 
    }

    /**
    * 信息审核回显数据
    */
    application.get_info_edit_echo_data = function(param,callback){
        var url = '/finance/aduit_info_result';
        BaseRequest.get(param,url,callback)
    }

    /**
    * 提交信息审核数据-真安风控中心
    */
    application.post_audit_risk = function(param,callback){
        var url  = '/finance/save_risk';
        BaseRequest.post_string_data(param,url,callback)
    }
    
    /**
    * 资质审核-资方
    */
    application.post_capital_audit = function(param,callback){
        var url  = '/finance/save_capital';
        BaseRequest.post_string_data(param,url,callback)
    }

    /**
    * 资质审核-履约保险方
    */
    application.post_insurance_audit = function(param,callback){
        var url = '/finance/save_insurance';
        BaseRequest.post_string_data(param,url,callback);
    }

    /**
    * 资质审核-数据回显
    */
    application._get_qulification_echo_data = function(param,callback){
        var url = '/finance/aduit_qualification';
        BaseRequest.get(param,url,callback);
    }

    /**
    * 提交质押就位信息
    */
    application.post_pledge_data = function(param,callback){
        var url = '/finance/save_pledge';
        BaseRequest.post(param,url,callback);
    }

    /**
    * 回显质押就位信息
    */
    application.get_pledge_info = function(param,callback){
        var url = '/finance/find_pledge_info';
        BaseRequest.get(param,url,callback);
    }

    /**
    * 取样检测-省区经理提交数据
    */
    application.post_provincial_testing_info = function(param,callback){
        var url = '/finance/save_province_sampling';
        BaseRequest.post_multipart_form_data(param,url,callback)
    }

    /**
    * 取样检测-中酒信贷专员提交数据
    */
    application.post_credit_testing_info = function(param,callback){
        var url = '/finance/save_credit_sampling';
        BaseRequest.post(param,url,callback);
    }

    /**
    * 取样检测-中酒信贷专员终止融资提交数据
    */
    application.post_credit_finance_end = function(param,callback){
        var url = '/finance/save_credit_finance_end';
        BaseRequest.post_form_data(param,url,callback);
    }

    /**
    * 根据合作方类型Id查询没有被禁用的合作方列表
    */
    application.get_partner_as_type = function(param,callback){
        var url = '/partner/all';
        BaseRequest.sync_get(param,url,callback,'url');
    }

    /**
    * 取样检测数据回显
    */
    application.get_testing_info = function(param,callback){
        var url = '/finance/sampling_info_show';
        BaseRequest.sync_get(param,url,callback);
    }
    /**
    * 取样检测修改数据
    */
    application.update_sampling_testing = function(param,callback){
        var url = '';
        BaseRequest.post_multipart_form_data(param,url,callback)
    }
    /**
    * 上传合同信息
    */
    application.post_upload_contract_data = function(param,callback){
        var url = '/finance/save_contract';
        BaseRequest.post_multipart_form_data(param,url,callback,'','formdata');
    }

    /**
    * 回显合同信息
    */
    application.get_contract_data = function(param,callback){
        var url = '/finance/contract_info_show';
        BaseRequest.sync_get(param,url,callback);
    }

    /**
    * 合同审核-资方
    */
    application.post_capital_contract_audit_data = function(param,callback){
        var url = '/finance/save_capital_contract';
        BaseRequest.post_form_data(param,url,callback);
    }

    /**
    * 合同审核-真安风控
    */
    application.post_risk_contract_audit_data = function(param,callback){
        var url = '/finance/save_risk_contract';
        BaseRequest.post_form_data(param,url,callback);
    }

    /**
    * 合同审核回显数据
    */
    application.get_contract_echo_data = function(param,callback){
        var url = '/finance/contract_audit_show';
        BaseRequest.get(param,url,callback);

    }

    /**
    * 质押监管 真安信审员审核
    */
    application.post_zhiya_za_data = function(param,callback){
        var url = '/finance/save_pledgesupervision_audit';
        BaseRequest.post_form_data(param,url,callback);
    }

    /**
    * 上传质押监管数据
    */
    application.post_pledge_supervision_data = function(param,callback){
        var url = '/finance/upload_pledge_regulatorinfo';
        BaseRequest.post_multipart_form_data(param,url,callback);
    }

    /**
    * 质押监管回显-非监管方
    */
    application.get_pledge_echo_data = function(param,callback){
        var url = '/finance/regulator_aduit_result';
        BaseRequest.get(param,url,callback);
    }

    /**
    * 质押监管回显-监管方
    */

    application.get_regulator_echo_data = function(param,callback){
        var url = '/finance/regulator_info_show';
        BaseRequest.sync_get(param,url,callback);
    }


    /**
    * 履约保险-履约保险方操作员上传信息
    */

    application.post_upload_insuranceinfo = function(param,callback){
        var url = '/finance/upload_insuranceinfo';
        BaseRequest.post_multipart_form_data(param,url,callback)
    }

    /**
    * 履约保险-真安信审员审核
    */
    application.post_zhen_an_insurance_audit = function(param,callback){
        var url = '/finance/save_insuranceinfo_audit';
        BaseRequest.post_form_data(param,url,callback)
    }
    

    /**
    * 履约保险回显数据 
    */
    
    application.get_insurance_echo_data = function(param,callback){
        var url = '/finance/insurance_aduit_result';
        BaseRequest.sync_get(param,url,callback)
    }

    /**
    * 放款确认-资方
    */

    application.post_zi_fang_loan_data = function(param,callback){
        var url = '/finance/upload_loanvoucher';
        BaseRequest.post_multipart_form_data(param,url,callback);
    }

    /**
    * 放款确认-真安信审员-确认资方
    */
    application.post_zhen_an_confirm_zi_fang_data = function(param,callback){
        var url = '/finance/save_loan_audit';
        BaseRequest.post_form_data(param,url,callback);
    }

    /**
    * 放款确认-中酒风控确认资方放款
    */
    application.post_zhong_jiu_confirm_zi_zifang_loan_data = function(param,callback){
       var url = '/finance/upload_receiptvoucher';
       BaseRequest.post_multipart_form_data(param,url,callback); 
    }

    /**
    * 放款确认-真安信审员-确认中酒收款
    */
    application.post_zhen_an_confirm_zhongjiu_recive_data = function(param,callback){
        var url = '/finance/save_receipt_audit';
        BaseRequest.post_form_data(param,url,callback);
    }

    /**
    * 放款确认-数据回显
    */

    application.get_loan_confirm_echo_data = function(param,callback){
        var url = '/finance/loan_confirm_result';
        BaseRequest.sync_get(param,url,callback);
    }

    return application;
})();

//HttpUtils
//auditSuccess
//showManageInfo

//请求融资申请的接口对象
var financManagementRequesData = {};

//获取机构类型列表
financManagementRequesData.get_institytions = function(type){
    var institytions = null;
    $.ajax({
        type:'get',
        data:{type:type},
        async:false,
        url:contextPath+'/agency/findInstitytions.json',
        success:function(data){
            if(data.statusCode=='200'&& data.data.length>0){
                institytions = data.data; 
            }
        },
        error:function(jqXHR,textStatus,errorThrown){
            renderErrorMsg(jqXHR,textStatus,errorThrown)
        }
    })

    return institytions
}


/*前端验证*/
$.extend($.validator.messages, {
        required: "这是必填字段",
        remote: "请修正此字段",
        email: "请输入有效的电子邮件地址",
        url: "请输入有效的网址",
        date: "请输入有效的日期",
        dateISO: "请输入有效的日期 (YYYY-MM-DD)",
        number: "请输入有效的数字",
        digits: "只能输入数字",
        creditcard: "请输入有效的信用卡号码",
        equalTo: "你的输入不相同",
        extension: "请输入有效的后缀",
        maxlength: $.validator.format("最多可以输入 {0} 个字符"),
        minlength: $.validator.format("最少要输入 {0} 个字符"),
        rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
        range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
        max: $.validator.format("请输入不大于 {0} 的数值"),
        min: $.validator.format("这是必填字段")
    });


/*以下是工具方法*/

//回显文件数据
//办理信息显示
function showManageInfo(parentDom,roleAudit){
    if(is_winery){
        parentDom.find('[data-role-name]').hide();
        parentDom.find('[data-true-name]').hide();
    }else{
       parentDom.find('[data-role-name]').text(roleAudit.roleName);
       parentDom.find('[data-true-name]').text(roleAudit.trueName); 
    }
    
    parentDom.find('[data-management-time]').text('办理时间：'+roleAudit.UpdateAt);
    parentDom.find('[data-management-info]').show();  
}

var role_info = new Role();
var role_id = role_info.getRoleId();
var role_institution_id = role_info.getInstitutionTypeId();
var is_winery = institutionType.compareTo(role_institution_id,institutionType["finace_operrator"]);
var is_zj_shen_qu = role.compareTo(role_id,role["zj_region_manager"]);//中酒省区经理
var is_zj_credit = role.compareTo(role_id,role["zj_credit_commissioner"]);//中酒信贷专员
var is_zhen_an_xinshen = role.compareTo(role_id,role["za_letter_trial"]);//真安信审员
var is_zf_operator = role.compareTo(role_id,role["zf_management_operator"])//资方操作员
var is_zj_risk_operator = role.compareTo(role_id,role["zj_risk_management_commissioner"])//中酒风控专员
var is_lvyue_operator = role.compareTo(role_id,role["ly_contract_operator"])//履约保险方操作员
var is_jg_operator = role.compareTo(role_id,role["jg_operator"]);
//获取当前正在办理节点为酒厂修改数据
var all_node_info = new AllNodeStatus(window.sessionStorage["businessKey"]);
var is_winery_cur_node = 'modifyApply'==all_node_info.getCurNodeId();

//显示提示信息
function smToolTips(target,info){
    /*<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="left" title="Tooltip on left">Tooltip on left</button>*/
    $(target).attr({'data-toggle':'tooltip','data-placement':'left','title':info});
}

//办理状态
function handleStatus(result){
    var cur_result = '';
    switch(result){
        case 'agree':
        cur_result = 'agree';
        break;
        case 'refuse':
        cur_result = 'refuse';
        break;
        case 'being-audit':
        cur_result = 'being-audit';
        break;
        default:
        cur_result = 'refuse';
        break;
    }
    return cur_result
}
//办理意见
function setOpinionInfo(selector,msg){
    msg?$(selector).val(msg):$(selector).attr('placeholder','');
}

//显示机构
function setInstitution(selector,institutionName){
    institutionName?(function(){
        selector.find('[name="institutionName"]').text('('+institutionName+')');
        selector.find('[name="institutionName"]').show();
    })():'';
}

$(function(){
    //businessKey 业务编号
    if(window.sessionStorage["businessKey"]){
        var businessKey = window.sessionStorage["businessKey"];
    }

    //业务流程节点渲染
    !is_jg_operator ? new ProcessNodeMenu('rong_zi',businessKey):'';

    //返回按钮渲染 如果有返回地址就进入之前的地址，如果没有就返回我的办理列表
    window.sessionStorage["historyRef"]?$('[data-back-to]').attr({'href':window.sessionStorage["historyRef"]}):$('[data-back-to]').attr({'href':contextPath+'/anagement_page'});


    //focus时错误信息消失
    $('input').on('focus',function(){
        $(this).parent().find('label.error').detach();
    });

    //select
    $('select.form-control').on('change',function(){
        if($(this).hasClass('refuse')||$(this).hasClass('agree')){
            var cur_class = $(this).hasClass('refuse')?'refuse':'agree';
           $(this).removeClass(cur_class); 
        }
        
    })

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

})

