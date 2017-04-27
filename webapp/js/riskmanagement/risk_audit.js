/**
* @Author Mona
* @Date 2016-12-22
* @description 真安金服  风险审核
*/

$(function () {
    var submit_warn_btn_dom = $('[data-role="submit-warn-audit"]');
    var risk_audit_dom = $('[data-pane-id="risk-audit"]');

    function review(selector){
        $(selector).find('select,textarea,input').attr('disabled','');
        addSelectPatch();
    }
    function claim(selector){
        $(selector).find('[operator-bottom]').show();
    }

    //风险审核前端验证

    var warn_audit_rules = {
        riskAuditResult:{
            required:true
        },
        riskAuditMsg:{
            required:true
        },
        riskWarnAuditAccessory:{
            required:true
        }
    };
    var warn_audit_msg = {
        riskWarnAuditAccessory:{
            required:'请上传附件'
        }
    }

    formValidate(risk_audit_dom,warn_audit_rules,warn_audit_msg);

    //风险审核数据回显
    HttpUtils.get_risk_audit_echo_data({businessKey:my_bus_key},function(data){
        console.debug('风险审核数据回显')
        console.debug(data);
        var cur_data = data.data;
        var risk_audit_result = cur_data.riskAuditResult;
        var risk_audit_claim = cur_data.needClaim;
        if(risk_audit_claim){//审核
            claim(risk_audit_dom);
            addSelectPatch();
            return 
        }
        if(!risk_audit_result && !risk_audit_claim){//回显
            review(risk_audit_dom);
            addSelectPatch();
            return 
        }
        var risk_audit_msg = cur_data.riskAuditMsg;
        var risk_audit_file = cur_data.riskAuditFile;
        var risk_audit_institution = cur_data.riskAuditInstitutionName;
        if(cur_data.riskAuditFile){
            var risk_audit_id = cur_data.riskAuditFile.id;
            var risk_audit_text = cur_data.riskAuditFile.name;
            var risk_audit_type = cur_data.riskAuditFile.type;
            setAccessory('[name="riskWarnAuditAccessory"]',risk_audit_text,risk_audit_id,risk_audit_type,false);
        }

        risk_audit_result?setManageInfo(risk_audit_dom,cur_data.riskAuditRoleName,cur_data.riskAuditUserName,cur_data.riskAuditTime):'';
        risk_audit_result?review(risk_audit_dom):'';
        $('[name="institutionName"]').text('('+risk_audit_institution+')');
        $('[name="riskAuditResult"]').find('option[value="'+risk_audit_result+'"]').attr('selected','selected');
        $('[name="riskAuditMsg"]').val(risk_audit_msg);
        addSelectPatch();
    })

    //提交风险审核数据
    submit_warn_btn_dom.on('click',function(){
        var _this = this;
        if(!risk_audit_dom.valid()||(typeof $(_this).attr('disabled')!=='undefined')){
            return 
        }
        $(_this).attr('disabled','');
        var param = {}
        param.inputData = {
            businessKey: window.sessionStorage["businessKey"],
            riskAuditResult:$('[name="riskAuditResult"]').val(),
            riskAuditMsg:$('[name="riskAuditMsg"]').val()
        }
        param.files = ["riskWarnAuditAccessory"];
        HttpUtils.post_risk_audit_data(param,function(data){
            if(data.statusCode == '200'){
                whaleModal();
                $(_this).removeAttr('disabled');
            }
        })

    })



})