/**
* Author Mona
* Date 2016-12-21
* description 启动风险提示
*/
$(function () {
    var start_warn_dom = $('[data-pane-id="risk-start"]');
    var start_btn_dom = $('[data-role="start-warning-process"]');
    var jg_power_dom = $('[data-power="jg"]');
    var other_power_dom = $('[data-power="other"]');

    var repayment_status = {};
    repayment_status["0"] = '正常';
    repayment_status["1"] = '欠息';
    repayment_status["2"] = '已结清';
    repayment_status["3"] = '逾期';
    
    if(window.sessionStorage["risk_warn"] == 'pledge' || is_new_bus){//如果从质押管理进入风险提示可以新增风险提示
        start_warn_dom.find('[operator-bottom]').show();
    }

    //前端验证
    var risk_warn_rules = {
        riskDescription:{
            required:true
        }
    }

    formValidate(start_warn_dom,risk_warn_rules);
    
    //风险提示固定的回显数据

    HttpUtils.get_risk_waring_echo_data({businessKey:my_bus_key},function(data){
        console.debug('启动风险提示回显数据');
        console.debug(data);
        var cur_data = data.data;

        var is_jg_operator = cur_data.pledgeBusinessKey

        if(is_jg_operator){//监管方进入
            $('[name="pledgeBusinessKey"]').text(cur_data.pledgeBusinessKey);
            $('[name="qualityDate"]').text(cur_data.qualityDate);
            $('[name="pledgeeName"]').text(cur_data.pledgeeName);
            $('[name="pledgorName"]').text(cur_data.pledgorName);
            cur_data.evaluationPrice?$('[name="evaluationPrice"]').text(renderNum(cur_data.evaluationPrice)+'元'):'';
            cur_data.baseWineNum?$('[name="baseWineNum"]').text(cur_data.baseWineNum+'吨'):'';
            
            jg_power_dom.show();
        }else{//除监管方之外用户看到的数据
            $('[name="repaymentBusinessKey"]').text(cur_data.repaymentBusinessKey);
            $('[name="wineryCompanyName"]').text(cur_data.wineryCompanyName);
            $('[name="loanCompanyName"]').text(cur_data.loanCompanyName);
            cur_data.loanAmoun?$('[name="loanAmoun"]').text(renderNum(cur_data.loanAmoun)+'元'):'';
            $('[name="financingPeriod"]').text(cur_data.financingPeriod+'年期');

            cur_data.repaymentTotalAmount?$('[name="repaymentTotalAmount"]').text(renderNum(cur_data.repaymentTotalAmount)+'元'):'';
            cur_data.alreadyRepaymentAmount?$('[name="alreadyRepaymentAmount"]').text(renderNum(cur_data.alreadyRepaymentAmount)+'元'):'';
            $('[name="repaymentStatus"]').text(repayment_status[cur_data.repaymentStatus]);
            other_power_dom.show();
        }        

        var risk_warn_institution = cur_data.institutionName;
        var risk_warn_role_name = cur_data.roleName;
        var risk_warn_true_name = cur_data.trueName;
        var risk_warn_handle_time = cur_data.updateAt;
        
        if(!risk_warn_handle_time){//如果没有办理信息则不回显数据
            return 
        }

        setManageInfo(start_warn_dom,risk_warn_role_name,risk_warn_true_name,risk_warn_handle_time);
        $('[name="institutionName"]').text('('+risk_warn_institution+')');
        cur_data.description?(function(){
            $('[name="riskDescription"]').val(cur_data.description);
            $('[name="riskDescription"]').attr('disabled','');
            
        }()):'';
        
        if(cur_data.descriptionFile){
            var des_id = cur_data.descriptionFile.id;
            var des_text = cur_data.descriptionFile.name;
            var des_type = cur_data.descriptionFile.type;
            setAccessory('[name="descriptionFile"]',des_text,des_id,des_type,false);
        }else{
            $('[name="descriptionFile"]').attr('disabled','');
        }
    })

    start_btn_dom.on('click',function(){
        var _this = this;
        if(!start_warn_dom.valid()||(typeof $(_this).attr('disabled')!=='undefined')){
            return 
        }
        $(_this).attr('disabled','');
        var param = {};
        param.files = ["descriptionFile"];
        param.inputData = {
            riskDescription:$('[name="riskDescription"]').val(),
            businessKey:window.sessionStorage["businessKey"]
        }

        HttpUtils.start_risk_process(param,function(data){
            if(data.statusCode == '200'){
                whaleModal({historyRef:"/riskmanagement/risk_management_page"});
                window.sessionStorage["menuId"] = window.sessionStorage["riskManagementMenuId"];
                $(_this).removeAttr('disabled');
            }
        })

    })

})