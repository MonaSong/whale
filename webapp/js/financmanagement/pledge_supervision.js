/**
*@Author Mona
*@date 2016-11-30
*@description 质押监管
*/
$(function(){

    var jg_conform_btn_dom = $('[data-operater-bottom]');
    var pledge_upload_btn_dom = $('[data-id="pledge-upload-confirm"]');
    var jg_pledge_dom = $('[data-pane-id="jg-edit-data"]');
    var jg_zhenAn_dom = $('[data-pane-id="zhenAn-audit"]');
    var zhenAn_confirm_btn_dom  =$('[data-id="zhenAn-supervision-confirm"]');

    var managementStatus = window.sessionStorage["managementStatus"];

    function review(selector){
        $(selector).find('[data-operater-bottom],[data-role="font-length"]').hide();
        $(selector).find('select,textarea').attr('disabled','');
        $(selector).show();
        addSelectPatch();
    }

    function claim(selector){
        if(typeof $(selector).find('select,textarea,[data-role="target-btn"]').attr('disabled')!=='undefined'){
            $(selector).find('select,textarea,[data-role="target-btn"]').removeAttr('disabled');
        }
        $(selector).find('[data-operater-bottom]').show();
        $(selector).show();
    }

    
    if(managementStatus=='1'){
        jg_pledge_dom.show();
        review(jg_zhenAn_dom);
    }
    
    //初始化审核意见组件
    new controlBtn(0,jg_zhenAn_dom,0);//真安信审员  

//真安审核质押监管信息
zhenAn_confirm_btn_dom.on('click',function(){
    var _this = this;
    if(typeof $(_this).attr('disabled')!=='undefined'){
        return 
    }
    $(_this).attr('disabled','');
    var alertInfo = $(this).attr('data-info');
    var param = {}
    param.taskId = window.sessionStorage["taskId"];
    param.pledgeResult = $('[name="pledgeResult"]').val();
    param.pledgeResultMsg = $('[name="pledgeResultMsg"]').val();
    console.debug('真安信审员审核质押监管信息')
    console.debug(param);
    HttpUtils.post_zhiya_za_data(param,function(data){
        if(data.statusCode=='200'){
            auditSuccess(alertInfo);
            $(_this).removeAttr('disabled');
        }
    })
})
  
    //回显数据
HttpUtils.get_pledge_echo_data({businessKey:window.sessionStorage["businessKey"]},function(data){
        console.debug('质押监管数据回显');
        console.debug(data);
        var cur_data = data.data;
        if(!cur_data.pledgeSupervision.baseWineNum){
            return 
        }
        is_winery?'':jg_pledge_dom.find('[name="InstitutionName"]').text('('+cur_data.InstitutionName+')');       
        showManageInfo(jg_pledge_dom,cur_data);
        jg_pledge_dom.find('[data-management-time]').text('办理时间：'+cur_data.pledgeSupervision.updateAt);
        cur_data.needClaim?claim(jg_pledge_dom):'';//办理
        cur_data.pledgeSupervision.updateAt && !cur_data.needClaim?review(jg_pledge_dom):'';//查看


        $('[name="baseWineNum"]').val(cur_data.pledgeSupervision.baseWineNum);
        //基酒类型
        if(cur_data.pledgeSupervision.baseWineTypes){
            var base_list = (cur_data.pledgeSupervision.baseWineTypes).split(',');
            var h = '';
            $.each(base_list,function(i,item){
                h+='<span class="small-bage">'+item+'</span>';
            });
            $('[name="baseWineTypes"]').html(h);
        }          

        $('[name="businessKey"]').val(cur_data.pledgeSupervision.businessKey);
        $('[name="evaluationPrice"]').val(renderNum(cur_data.pledgeSupervision.evaluationPrice));

        if(cur_data.pledgeSupervision.pledgeBillAccessory){
            var pledge_b_text = cur_data.pledgeSupervision.pledgeBillAccessory.name;
            var pledge_b_id = cur_data.pledgeSupervision.pledgeBillAccessory.id;
            var pledge_b_type = cur_data.pledgeSupervision.pledgeBillAccessory.type
            setAccessory('[name="pledgeBillAccessory"]',pledge_b_text,pledge_b_id,pledge_b_type,false);
        }
        

        $('[name="pledgeeName"]').val(cur_data.pledgeSupervision.pledgeeName)
        $('[name="pledgorName"]').val(cur_data.pledgeSupervision.pledgorName)
        $('[name="productionTime"]').val(cur_data.pledgeSupervision.productionTime)
        $('[name="propertyInsurer"]').val(cur_data.pledgeSupervision.propertyInsurer)

        if(cur_data.pledgeSupervision.propertyPolicyAccessory){
            var pledge_p_text = cur_data.pledgeSupervision.propertyPolicyAccessory.name;
            var pledge_p_id = cur_data.pledgeSupervision.propertyPolicyAccessory.id;
            var pledge_p_type = cur_data.pledgeSupervision.propertyPolicyAccessory.type
            setAccessory('[name="propertyPolicyAccessory"]',pledge_p_text,pledge_p_id,pledge_p_type,false);
        }

        $('[name="propertyPolicyHolder"]').val(cur_data.pledgeSupervision.propertyPolicyHolder)
        $('[name="propertyPolicyName"]').val(cur_data.pledgeSupervision.propertyPolicyName)
        $('[name="propertyPolicyPeriod"]').val(cur_data.pledgeSupervision.propertyPolicyPeriod)
        $('[name="propertyPolicyPremium"]').val(renderNum(cur_data.pledgeSupervision.propertyPolicyPremium))
        $('[name="qualityDate"]').val(cur_data.pledgeSupervision.qualityDate)
        $('[name="regulatorInsurer"]').val(cur_data.pledgeSupervision.regulatorInsurer)
        $('[name="regulatorName"]').val(cur_data.pledgeSupervision.regulatorName);

        if(cur_data.pledgeSupervision.regulatorPolicyAccessory){
            var pledge_r_text = cur_data.pledgeSupervision.regulatorPolicyAccessory.name;
            var pledge_r_id = cur_data.pledgeSupervision.regulatorPolicyAccessory.id;
            var pledge_r_type = cur_data.pledgeSupervision.regulatorPolicyAccessory.type
            setAccessory('[name="regulatorPolicyAccessory"]',pledge_r_text,pledge_r_id,pledge_r_type,false);
        }

        $('[name="regulatorPolicyHolder"]').val(cur_data.pledgeSupervision.regulatorPolicyHolder)
        $('[name="regulatorPolicyName"]').val(cur_data.pledgeSupervision.regulatorPolicyName)
        $('[name="regulatorPolicyPeriod"]').val(cur_data.pledgeSupervision.regulatorPolicyPeriod)
        $('[name="regulatorPolicyPremium"]').val(renderNum(cur_data.pledgeSupervision.regulatorPolicyPremium))

        //真安信审员审核
        var zhen_an_claim = cur_data.needClaim;
        zhen_an_claim?claim(jg_zhenAn_dom):review(jg_zhenAn_dom);
        
        if(is_winery){
            jg_zhenAn_dom.hide();
            addSelectPatch();
            return 
        }
        var zhen_an_audit_info = cur_data.auditOpinion;
        var zhen_an_audit_result = '';
        var zhen_an_audit_msg = '';
        var zhen_an_role_name = '';
        var zhen_an_mg_time = '';
        var zhen_an_true_name = '';
        var institution_name = '';
        if(cur_data.auditOpinion<1){//如果没有办理信息则不进行回显
            return 
        }
        if(zhen_an_audit_info && zhen_an_audit_info.length>0){
            $.each(zhen_an_audit_info,function(i,item){
                if(item.variableName=="zhenAn_credit_pledge_aduit_result"){
                    zhen_an_audit_result = item.variableValue;
                    zhen_an_role_name = item.roleName;
                    zhen_an_true_name = item.trueName;
                    zhen_an_mg_time = item.updateAt;
                    institution_name = item.institutionName;

                }else if(item.variableName=="zhenAn_credit_pledge_aduit_result_Msg"){
                    zhen_an_audit_msg = item.variableValue;
                }
            })
        }
        if(!zhen_an_audit_result){//如果没有审核信息则不回显真安信审员数据
            return 
        }
        var jg_mg_info = jg_zhenAn_dom.find('[data-management-info]');
        jg_mg_info.find('[data-role-name]').text(zhen_an_role_name);
        jg_mg_info.find('[data-true-name]').text(zhen_an_true_name);
        jg_mg_info.find('[data-management-time]').text('办理时间：'+zhen_an_mg_time);
        jg_mg_info.show();
        jg_zhenAn_dom.find('[name="InstitutionName"]').text('('+institution_name+')');
        var zhen_an_status_class = handleStatus(zhen_an_audit_result);
        $('[name="pledgeResult"]').addClass(zhen_an_status_class).find('option[value="'+zhen_an_audit_result+'"]').attr('selected','selected');
        setOpinionInfo('[name="pledgeResultMsg"]',zhen_an_audit_msg);
        zhen_an_audit_msg?(new controlBtn(0,jg_zhenAn_dom,zhen_an_audit_msg.length)):'';//真安信审员 
        addSelectPatch(); 
    })
})


