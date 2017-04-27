$(function(){
    /**
    *@Author Mona
    *@date 2016-11-18
    *@description 资质审核
    */
     var role_info = new Role();
     var role_id = role_info.getRoleId();
     var is_zf_operator = role.compareTo(role_id,role["zf_management_operator"]);
     var is_lvyue_operator = role.compareTo(role_id,role["ly_contract_operator"]);

     var qualify_management_status = false;
     var zf_dom = $('[data-pane-id="zf-zz-audit"]');
     var lvyue_dom = $('[data-pane-id="lvyue-zz-audit"]');

     function review(selector){
        $(selector).find('[data-role="font-length"],[data-operator-bottom]').hide();
        $(selector).find('select,textarea').attr('disabled','');        
     }

     function claim(selector){
        $(selector).show();
        $(selector).find('[data-role="font-length"],[data-operator-bottom]').show();
        addSelectPatch();
     }

     function showAsStatus(){
        if(is_zf_operator){//如果是资方操作员 todo 操作权限
            zf_dom.show();
         }else if(is_lvyue_operator){//如果是履约保险方操作员 todo 操作权限
            lvyue_dom.show();
         }else{
            zf_dom.show();
            lvyue_dom.show();
            review(zf_dom);
            review(lvyue_dom)
         }
     }
     
     showAsStatus()

    //资质审核 资方
    $('[data-id="capital-audit"]').on('click',function(){
        var _this = this;
        if(typeof $(_this).attr('disabled')!=='undefined'){
            return 
        }
        $(_this).attr('disabled','');
        var alertInfo = $(this).attr('data-info');
        var param = {};
        param.taskId = window.sessionStorage["taskId"];
        param.capitalAuditResult = $('[name="capitalAuditResult"]').val();
        param.capitalAuditOpinion = $('[name="capitalAuditOpinion"]').val();
        HttpUtils.post_capital_audit(param,function(data){
            if(data.statusCode=='200'){
                auditSuccess(alertInfo);
                $(_this).removeAttr('disabled');
            }
        })
    })

    //资质审核 履约保险方
    $('[data-id="insurance-audit"]').on('click',function(){
        var _this = this;
        if(typeof $(_this).attr('disabled')!=='undefined'){
            return
        }
        $(_this).attr('disabled','');
        var alertInfo = $(this).attr('data-info');
        var param = {};
        param.taskId = window.sessionStorage["taskId"];
        param.insuranceAuditResult = $('[name="insuranceAuditResult"]').val();
        param.insuranceAuditOpinion = $('[name="insuranceAuditOpinion"]').val();
        HttpUtils.post_insurance_audit(param,function(data){
            if(data.statusCode=='200'){
                auditSuccess(alertInfo);
                $(_this).removeAttr('disabled');
            }
        })
    })

    //填写意见组件实例化
    new controlBtn(0,'[data-pane-id="zf-zz-audit"]',0);//资方操作员
    new controlBtn(0,'[data-pane-id="lvyue-zz-audit"]',0);//履约保险方操作员

    //数据回显
    if(window.sessionStorage["businessKey"]){
        var businessKey = window.sessionStorage["businessKey"];
        
        HttpUtils._get_qulification_echo_data({businessKey:businessKey},function(data){
            if(!data.data){
                return
            }
            var cur_data = data.data;
            console.debug('资质审核回显信息');
            console.debug(data);
            //酒厂
            if(is_winery){
                $('[data-pane-id="zf-zz-audit"],[data-pane-id="lvyue-zz-audit"]').hide();
                var winery_dom = $('[data-pane-id="winery"]');
                var winery_info_result = winery_dom.find('select[name="wineryQualifyResult"]');
                winery_dom.show();
                if(cur_data.AGREE){
                    winery_dom.find('[data-management-time]').text('办理时间：'+data.data.UpdateAt);
                    winery_dom.find('[data-management-info]').show();
                    winery_info_result.find('option[value="agree"]').attr('selected',true);
                    winery_info_result.addClass('agree');
                    addSelectPatch();
                }    
                if(cur_data.refuse){
                    winery_dom.find('[data-management-time]').text('办理时间：'+data.data.UpdateAt);
                    winery_dom.find('[data-management-info]').show();
                    winery_info_result.find('option[value="refuse"]').attr('selected','selected');
                    winery_info_result.addClass('refuse');
                    addSelectPatch();
                }
                if(cur_data.audite){
                    winery_info_result.find('option[value="being-audited"]').attr('selected','selected');
                    addSelectPatch();
                }
                
                return
            }

            /*资方-资质审核信息回显*/
            var zf_audit_info = cur_data.capital_Qua_Audit;            
            if(zf_audit_info){
                var zf_result = zf_audit_info.capital_Qua_Audit_Result;
                var zf_msg = zf_audit_info.capital_Qua_Audit_Result_Msg;
                var zf_claim = zf_audit_info.needClaim;
                var zf_status_class = handleStatus(zf_result);
                zf_claim?claim(zf_dom):'';//办理
                
                if(zf_result){
                    //有数据则渲染回显
                    showManageInfo(zf_dom,zf_audit_info);
                    zf_audit_info.InstitutionName?zf_dom.find('[name="InstitutionName"]').text('('+zf_audit_info.InstitutionName+')'):'';
                    zf_result?$('[name="capitalAuditResult"]').addClass(zf_status_class).find('option[value="'+zf_audit_info.capital_Qua_Audit_Result+'"]').attr('selected',true):'';
                    setOpinionInfo('[name="capitalAuditOpinion"]',zf_msg);             
                    (zf_result && !zf_claim)?review(zf_dom):'';//查看                
                    
                    if(zf_msg){//如果有回显的审核意见               
                       var msg_len = zf_msg.length;
                       new controlBtn(0,zf_dom,msg_len);
                    }
                }               
            }

            /*履约保险方-资质审核信息回显*/
            var insurance_audit_info = cur_data.insurer_Qua_Audit;            
            if(insurance_audit_info){
                var insurance_result = insurance_audit_info.insurer_Qua_Audit_Result;
                var insurance_msg = insurance_audit_info.insurer_Qua_Audit_Result_Msg;
                var insurance_claim = insurance_audit_info.needClaim;
                var insurance_status_class = handleStatus(insurance_result);

                insurance_claim?claim(lvyue_dom):'';//办理
                if(insurance_result){
                    //有数据则渲染回显
                    showManageInfo(lvyue_dom,insurance_audit_info);
                    insurance_audit_info.InstitutionName?lvyue_dom.find('[name="InstitutionName"]').text('('+insurance_audit_info.InstitutionName+')'):'';
                    insurance_result?$('[name="insuranceAuditResult"]').addClass(insurance_status_class).find('option[value="'+insurance_result+'"]').attr('selected',true):'';
                    setOpinionInfo('[name="insuranceAuditOpinion"]',insurance_msg);

                    (insurance_result && !insurance_claim)?review(lvyue_dom):'';//查看 

                    if(insurance_msg){
                        var msg_len = insurance_msg.length;
                        new controlBtn(0,lvyue_dom,msg_len);
                    }

                }        
            }

            addSelectPatch();
        })
    }



    //资质审核是否结束
    function showAll(){
        zf_dom.show();
        lvyue_dom.show();
        review(zf_dom);
        review(lvyue_dom)
    }

    var businessKey = window.sessionStorage["businessKey"];
    var all_node_info = new AllNodeStatus(businessKey);
    var zz_is_finished = all_node_info.curNodeIsFinished('qualification_Aduit');
    zz_is_finished?showAll():'';

})


