/**
*@Author Mona
*@date 2016-12-01
*@description 合同审核
*/

$(function(){
    var risk_audit_btn_dom = $('[data-id="risk-contract-confirm"]');
    var zf_audit_btn_dom = $('[data-id="zf-contract-confirm"]');


    var risk_dom = $('[data-pane-id="risk-contract"]');
    var zf_dom = $('[data-pane-id="capital-contract"]');
    var winery_dom = $('[data-pane-id="winery"]');

    function review(selector){
        $(selector).find('[data-operator-bottom],[data-role="font-length"]').hide();
        $(selector).find('input,select,textarea').attr('disabled','');
        $(selector).show();
        addSelectPatch();
    }

    function claim(selector){
        $(selector).show();
        $(selector).find('[data-operator-bottom],[data-role="font-length"]').show();
    }

    var managementStatus = window.sessionStorage["managementStatus"];
    if(managementStatus == '1'){
        if(!(is_zj_risk_operator||is_zf_operator)){
            if(is_winery){
              review(winery_dom);
            }            
        }
    }

    (is_zj_risk_operator && managementStatus=='0')?claim(risk_dom):'';
    (is_zf_operator && managementStatus=='0')?claim(zf_dom):'';

    //初始化意见组件
    new controlBtn(0,risk_dom,0);
    new controlBtn(0,zf_dom,0);

    //提交合同审核 真安风控专员
    risk_audit_btn_dom.on('click',function(){
        var _this = this;
        if(typeof $(_this).attr('disabled')!=='undefined'){
            return 
        }
        $(_this).attr('disabled','');
        var alertInfo = $(_this).attr('data-info');
        var taskId = window.sessionStorage["taskId"];
        var riskContractResult = $('[name="riskContractResult"]').val();
        var riskContractOpinion = $('[name="riskContractOpinion"]').val();
        var param = {taskId:taskId,riskContractResult:riskContractResult,riskContractOpinion:riskContractOpinion};
        HttpUtils.post_risk_contract_audit_data(param,function (data) {
            if(data.statusCode=='200'){
                auditSuccess(alertInfo);
                $(_this).removeAttr('disabled');
            }
        })
    })
    
    //提交合同审核 资方
    zf_audit_btn_dom.on('click',function(){
        var _this = this;
        if(typeof $(_this).attr('disabled')!=='undefined'){
            return 
        }
        $(_this).attr('disabled','');
        var alertInfo = $(_this).attr('data-info');
        var taskId = window.sessionStorage["taskId"];
        var capitalContractResult = $('[name="capitalContractResult"]').val();
        var capitalContractOpinion = $('[name="capitalContractOpinion"]').val();
        var param = {taskId:taskId,capitalContractResult:capitalContractResult,capitalContractOpinion:capitalContractOpinion};
        HttpUtils.post_capital_contract_audit_data(param,function(data){
            if(data.statusCode=='200'){
                auditSuccess(alertInfo);
                $(_this).removeAttr('disabled');
            }
        })
    })

    //合同审核数据回显
    if(window.sessionStorage["businessKey"]){
        var businessKey = window.sessionStorage["businessKey"];
        HttpUtils.get_contract_echo_data({businessKey:businessKey},function(data){
            console.debug('合同审核回显数据')
            console.debug(data);
            var cur_data = data.data;
            if(is_winery){
                var winery_result_dom = $('[name="wineryResult"]');
                var update_at = null;
                if(cur_data.AGREE && cur_data.AGREE==true){
                    winery_result_dom.find('option[value="agree"]').attr('selected','selected');
                    winery_result_dom.addClass('agree');
                    update_at = cur_data.UpdateAt;
                }else if(cur_data.refuse && cur_data.refuse==true){  
                    winery_result_dom.find('option[value="refuse"]').attr('selected','selected');
                    winery_result_dom.addClass(handleStatus('refuse'));
                    update_at = cur_data.UpdateAt;                    
                }else if(cur_data.audite && cur_data.audite==true){
                    winery_result_dom.find('option[value="being-audited"]').attr('selected','selected');
                }
                update_at?winery_dom.find('[data-update-at]').text('办理时间：'+update_at):'';
                addSelectPatch();
                return
            }

            var zhen_an_audit_info = cur_data.zhenAn_risk_contract_aduit;
            var zhen_an_risk_needClaim = zhen_an_audit_info.needClaim;
            zhen_an_risk_needClaim?claim(risk_dom):'';//真安办理

            var zf_audit_info = cur_data.capital_contract_aduit;
            var zf_audit_claim = zf_audit_info.needClaim;
            if(!zhen_an_audit_info.UpdateAt && !zhen_an_risk_needClaim){
                review(risk_dom);
                return 
            }
            zf_audit_claim?claim(zf_dom):'';//资方办理
            
            if(!zhen_an_audit_info.UpdateAt){//如果真安风控没有数据则不做数据回显
                return 
            }
            if(zhen_an_audit_info.roleName && zhen_an_audit_info.trueName){
                var cur_role_info = cur_data.zhenAn_risk_contract_aduit;
                showManageInfo(risk_dom,cur_role_info);
            }

            //真安风控数据回显
            var zhen_an_risk_result = zhen_an_audit_info.zhenAn_risk_contract_aduit_result;
            var zhen_an_risk_msg = zhen_an_audit_info.zhenAn_risk_contract_aduit_result_Msg;
            var zhen_an_risk_status_class = handleStatus(zhen_an_risk_result);
            zhen_an_risk_result?$('[name="riskContractResult"]').addClass(zhen_an_risk_status_class).find('option[value="'+zhen_an_risk_result+'"]').attr('selected','selected'):'';
            setOpinionInfo('[name="riskContractOpinion"]',zhen_an_risk_msg);
            setInstitution(risk_dom,zhen_an_audit_info.InstitutionName);
            var risk_msg_len = zhen_an_risk_msg.length;
            new controlBtn(0,risk_dom,risk_msg_len);

            zhen_an_risk_result&&!zhen_an_risk_needClaim?review(risk_dom):'';
            if(!cur_data.capital_contract_aduit.capital_contract_aduit_result){
                return
            }

            //资方数据回显
            $('[name="InstitutionName"]').text('('+cur_data.capital_contract_aduit.InstitutionName+')');
            if(cur_data.capital_contract_aduit.roleName && cur_data.capital_contract_aduit.trueName){
                var cur_zf_role_info = cur_data.capital_contract_aduit;
                showManageInfo(zf_dom,cur_zf_role_info);
            }

            var zf_contract_result = cur_data.capital_contract_aduit.capital_contract_aduit_result;
            var zf_contract_msg = cur_data.capital_contract_aduit.capital_contract_aduit_result_Msg;
            var zf_needClaim = cur_data.capital_contract_aduit.needClaim;
            var zf_msg_len = zf_contract_msg.length;
            var zf_status_class = handleStatus(zf_contract_result);
            new controlBtn(0,zf_dom,zf_msg_len);
            zf_contract_result?$('[name="capitalContractResult"]').addClass(zf_status_class).find('option[value="'+zf_contract_result+'"]').attr('selected','selected'):'';
            setOpinionInfo('[name="capitalContractOpinion"]',zf_contract_msg);
            zf_contract_result&&!zhen_an_risk_needClaim?review(zf_dom):'';
        });
    }
    
})

