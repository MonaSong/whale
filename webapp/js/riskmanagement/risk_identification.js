/**
 * @Author Mona
 * @Date 2016-12-22
 * @description 风险确认
 */
$(function () {
    var risk_confirm_dom = $('[data-pane-id="risk-confirm"]');
    var risk_confirm_btn_dom = $('[data-role="submit-risk-confirm"]');

    function claim(selector){
        $(selector).find('[operator-bottom]').show();
    }

    function review(selector){
        $(selector).find('input,select,textarea').attr('disabled','');
        addSelectPatch();
    }

    //风险审核前端验证
    var risk_confirm_rules = {
        auditConfirmResult:{
            required:true
        },
        auditConfirmMsg:{
            required:true
        }
    }

    formValidate(risk_confirm_dom,risk_confirm_rules);

    //风险确认回显数据
    HttpUtils.get_risk_confirm_echo_data({businessKey:my_bus_key},function(data){
        console.debug('风险确认回显数据');
        console.debug(data);
        var cur_data = data.data;

        var risk_confirm_result = cur_data.riskConfirmResult;
        var risk_confirm_claim = cur_data.needClaim;
        risk_confirm_claim?claim(risk_confirm_dom):review(risk_confirm_dom);

        if(!risk_confirm_result){
            return 
        }
        var risk_confirm_msg = cur_data.riskConfirmMsg; 
        var risk_confirm_institution = cur_data.riskConfirmInstitutionName;       
        var role_name = cur_data.riskConfirmRoleName;
        var true_name = cur_data.riskConfirmUserName;
        var handle_time = cur_data.riskConfirmTime;

        setManageInfo(risk_confirm_dom,role_name,true_name,handle_time);
        $('[name="institutionName"]').text('('+risk_confirm_institution+')');
        $('[name="auditConfirmResult"]').find('option[value="'+risk_confirm_result+'"]').attr('selected','selected');
        $('[name="auditConfirmMsg"]').val(risk_confirm_msg);
        addSelectPatch();
    })

    //提交风险确认数据
    risk_confirm_btn_dom.on('click',function(){
        var _this = this;
        if(!risk_confirm_dom.valid()||(typeof $(_this).attr('disabled')!=='undefined')){
            return 
        }
        $(_this).attr('disabled','');
        var param = {};
        param.businessKey = window.sessionStorage["businessKey"];
        param.auditConfirmResult = $('[name="auditConfirmResult"]').val();
        param.auditConfirmMsg = $('[name="auditConfirmMsg"]').val()
        HttpUtils.post_risk_confirm_data(param,function(data){
            if(data.statusCode == '200'){
                whaleModal();
                $(_this).removeAttr('disabled');
            }
        })
    })
})
