
/**
*@Author Mona
*@date 2016-12-01
*@description 履约保险
*/
 
$(function () {
    var insure_confirm_btn_dom = $('[data-id="insurer-confirm"]');//履约保险方提交按钮
    var lvyue_dom = $('[data-pane-id="lvyue-insurance"]');

    var zhen_an_btn_dom = $('[data-id="zhen-an-insurance-confirm"]');//真安提交按钮
    var zhen_an_dom = $('[data-pane-id="zhen-an-insurance"]');

    var managementStatus = window.sessionStorage["managementStatus"];
    function review(selector){
        $(selector).find('input,textarea,select').attr('disabled','');
        $(selector).find('[data-operator-bottom],[data-role="font-length"]').hide();
        $(selector).show();
        addSelectPatch();
    }

    if(managementStatus){
        if(!(is_lvyue_operator)){
            review(lvyue_dom);
        }
    }
    function claim(selector){
        if(typeof $(selector).find('select,textarea').attr('disabled')!=='undefined'){
            $(selector).find('select,textarea').removeAttr('disabled');
        }
        $(selector).show();
        $(selector).find('[data-operator-bottom]').show();
    }

    (managementStatus=='0' && is_lvyue_operator)?claim(lvyue_dom):'';
    (managementStatus=='0' && is_zhen_an_xinshen)?claim(zhen_an_dom):'';

    //履约保险方前端验证
    var lvyue_rules = {
        policyName:{
            required:true
        },
        policyHolder:{
            required:true
        },
        insurer:{
            required:true
        },
        insurancePremium:{
           required:true 
        },
        performancePolicyAccessory:{
           required:true
        },
        validityTerm:{
            required:true
        }
    }
    var lvyue_msg = {
        performancePolicyAccessory:{
           required:'请上传附件'
        }
    }

    formValidate(lvyue_dom,lvyue_rules,lvyue_msg);

    new controlBtn('0',zhen_an_dom,0);
    var lvyue_update = false;

    if(is_winery){
        zhen_an_dom.hide();
    }


    //履约保险回显数据
    HttpUtils.get_insurance_echo_data({businessKey:window.sessionStorage["businessKey"]},function(data){
        console.debug('履约保险回显数据');
        console.debug(data);
        var cur_data = data.data;

        //履约保险信息回显
        if(!cur_data.insurer_upload_insurance_info.UpdateAt){
            return 
        }
        is_winery?'':setInstitution(lvyue_dom,cur_data.InstitutionName);
        showManageInfo(lvyue_dom,cur_data);
        var perforInsurInfo = cur_data.insurer_upload_insurance_info;
        var insurer_update = perforInsurInfo.UpdateAt
        insurer_update?lvyue_update=true:lvyue_update=false;        
        var insurer_claim = perforInsurInfo.needClaim;
        $('[name="policyName"]').val(perforInsurInfo.policyName);
        $('[name="policyHolder"]').val(perforInsurInfo.policyHolder);
        $('[name="insurer"]').val(perforInsurInfo.insurer);
        $('[name="insurancePremium"]').val(renderNum(perforInsurInfo.insurancePremium));
        $('[name="validityTerm"]').val(perforInsurInfo.validityTerm);    
        cur_data.insurer_upload_insurance_info && !cur_data.insurer_upload_insurance_info.needClaim?review(lvyue_dom):'';
        if(cur_data.performancePolicyAccessory){
            var insurer_text = cur_data.performancePolicyAccessory.name;
            var insurer_id = cur_data.performancePolicyAccessory.id; 
            var insurer_type =   cur_data.performancePolicyAccessory.type; 
            setAccessory('[name=performancePolicyAccessory]',insurer_text,insurer_id,insurer_type,insurer_claim);   
        } 

        if(is_winery){ 
            addSelectPatch();
            return
        }
        //真安信审员信息回显 
        var zhen_an_audit = cur_data.zhenAn_credit_insurance_aduit;
        var zhen_an_result = zhen_an_audit.zhenAn_credit_insurance_aduit_result;
        var zhen_an_msg = zhen_an_audit.zhenAn_credit_insurance_aduit_result_Msg;
        var zhen_an_status = handleStatus(zhen_an_result);
        var zhen_an_claim = zhen_an_audit.needClaim;
        (zhen_an_result && !zhen_an_claim)?review(zhen_an_dom):'';
        zhen_an_claim?claim(zhen_an_dom):'';   
        if(!zhen_an_result){//如果没有回显信息则退出
            return 
        }
        showManageInfo(zhen_an_dom,zhen_an_audit);
        setInstitution(zhen_an_dom,zhen_an_audit.InstitutionName);
        $('[name="insuranceResult"]').addClass(zhen_an_status).find('option[value="'+zhen_an_result+'"]').attr('selected','selected'); 
        setOpinionInfo('[name="insuranceResultMsg"]',zhen_an_msg);
        zhen_an_msg &&zhen_an_msg.length ?new controlBtn('0',zhen_an_dom,zhen_an_msg.length):''; 
        addSelectPatch();
    })

    //履约保险方信息提交
    insure_confirm_btn_dom.on('click',function(){
        var _this = this;
        if(!$(lvyue_dom).valid()||(typeof $(_this).attr('disabled')!=='undefined')){
            return 
        }
        $(_this).attr('disabled','');
        var alertInfo = $(this).attr('data-info');
        var param = {};
        param.inputData ={
            taskId:window.sessionStorage["taskId"],
            insurancePremium:removeSopt($('[name="insurancePremium"]').val()),
            insurer:$('[name="insurer"]').val(),
            policyHolder:$('[name="policyHolder"]').val(),
            policyName:$('[name="policyName"]').val(),
            validityTerm:$('[name="validityTerm"]').val()
        } 
        if(lvyue_update){//回退信息
             if(window.sessionStorage["insurance_aduit"] && window.sessionStorage["insurance_aduit"]!==''){
                    var fileArray = JSON.parse(window.sessionStorage["insurance_aduit"]);
                    param.files = fileArray;
                }
            param["inputData"]["status"]=1;
        }else{//直接信息
            param["inputData"]["status"]=0;
            param.files = ['performancePolicyAccessory'];
        }
        
        HttpUtils.post_upload_insuranceinfo(param,function(data){
            if(data.statusCode=='200'){
                auditSuccess(alertInfo);
                $(_this).removeAttr('disabled');
            }
        })

    })

    //真安信审员信息提交
    zhen_an_btn_dom.on('click',function(){
        var _this = this;
        if(typeof $(_this).attr('disabled')!=='undefined'){
            return 
        }
        $(_this).attr('disabled','');
        var alertInfo = $(this).attr('data-info');
        var param = {
            taskId:window.sessionStorage["taskId"],
            insuranceResult:$('[name="insuranceResult"]').val(),
            insuranceResultMsg:$('[name="insuranceResultMsg"]').val()
        }; 
        HttpUtils.post_zhen_an_insurance_audit(param,function(data){
            if(data.statusCode=='200'){
                auditSuccess(alertInfo);
                $(_this).removeAttr('disabled');
            }
        })

    })


    
    
})