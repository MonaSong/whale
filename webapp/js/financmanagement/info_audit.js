/**
*@Author Mona
*@date 2016-11-17
*@description 信息审核
*/

$(function(){

    //页面初次加载时 将履约保险方 资方 监管方的数据放入
    var zf_list = financManagementRequesData.get_institytions(0);//资方
    var jg_list = financManagementRequesData.get_institytions(1);//监管方
    var lvyue_list = financManagementRequesData.get_institytions(2);//履约保险方

    function renderInstitytion(type,list){
        var h = '';
        var in_name = '';
        var h_content = '';
        switch(type){
            case 0:
            in_name = '资方';
            h_content = '#zf-institytion';
            break;
            case 1:
            in_name = '监管方';
            h_content = '#jg-institytion';
            break;
            case 2:
            in_name = '履约保险方';
            h_content = '#lvyue-institytion';
            break;
        }

        h = '<option value="">请选择'+in_name+'</option>';
        $.each(list,function(i,item){
            h+='<option value="'+item.id+'">'+item.institutionName+'</option>';
        })
        $(h_content).html(h);    
    }

    renderInstitytion(0,zf_list);
    renderInstitytion(1,jg_list);
    renderInstitytion(2,lvyue_list);

    //意见填写组件初始化
    new controlBtn(0,'[data-pane-id="manager_Info_Audit"]',0);//中酒省区经理
    new controlBtn(0,'[data-pane-id="director_Info_Audit"]',0);//中酒渠道总监
    new controlBtn(0,'[data-pane-id="credit_Info_Audit"]',0);//中酒信贷专员
    //中酒信审专员单独写逻辑
    new controlBtn(0,'[data-pane-id="zhenAn_Risk_Info_Aduit"]',0);//真安风控专员

    var manager_dom = $('[data-pane-id="manager_Info_Audit"]');
    var director_dom = $('[data-pane-id="director_Info_Audit"]');
    var credit_dom = $('[data-pane-id="credit_Info_Audit"]');
    var zhenAn_xinshen_dom = $('[data-pane-id="zhenAn_Credit_Info_Aduit"]');
    var zhenAn_risk_dom = $('[data-pane-id="zhenAn_Risk_Info_Aduit"]');

    function review(selector){
        $(selector).find('select,input,textarea').attr('disabled',true);
        $(selector).find('[data-role="font-length"],[data-operator-bottom]').hide();
        addSelectPatch();
    }


    function claim(selector){
        $(selector).show();
    }   

    //真安信审员 选择通过
    $('[name="letterAuditResult"]').on('change',function(){
        if($(this).val()=='agree'){
            $('[data-audit-status="agree"]').show();
        }else{
            $('[data-audit-status="agree"]').hide();
        }
    }) 

    /*提交省区经理意见*/
    $('[data-id="provincial-audit"]').on('click',function(){
        var _this = this;
        if(typeof $(_this).attr('disabled')!=='undefined'){
            return 
        }
        $(_this).attr('disabled','');
        var alertInfo = $(_this).attr('data-info');
        var param = {};
        param.taskId = window.sessionStorage["taskId"];
        param.provincialAuditResult = $('[name="provincialAuditResult"]').val();
        param.provincialAuditOpinion = $('[name="provincialAuditOpinion"]').val();

        HttpUtils.post_audit_province(param,function(data){
            if(data.statusCode=='200'){
                auditSuccess(alertInfo);
                $(_this).removeAttr('disabled','');
            }
        })
    })

    /*提交渠道总监的意见*/
    $('[data-id="channel-audit"]').on('click',function(){
        var _this = this;
        if(typeof $(_this).attr('disabled')!=='undefined'){
            return 
        }
        $(_this).attr('disabled','');
        var alertInfo = $(_this).attr('data-info');
        var param = {};
        param.taskId = window.sessionStorage["taskId"];
        param.channelAuditResult = $('[name="channelAuditResult"]').val();
        param.channelAuditOpinion = $('[name="channelAuditOpinion"]').val();
        HttpUtils.post_audit_director(param,function(data){
            if(data.statusCode=='200'){
                auditSuccess(alertInfo);
                $(_this).removeAttr('disabled');
            }
        })
    })

    /*提交中酒信贷专员的意见*/
    $('[data-id="credit-audit"]').on('click',function(){
        var _this = this;
        if(typeof $(_this).attr('disabled')!=='undefined'){
            return 
        }
        $(_this).attr('disabled','');
        var alertInfo = $(_this).attr('data-info');
        var param = {};
        param.taskId = window.sessionStorage["taskId"];
        param.creditAuditResult = $('[name="creditAuditResult"]').val();
        param.creditAuditOpinion = $('[name="creditAuditOpinion"]').val();
        HttpUtils.post_audit_credit(param,function(data){
            if(data.statusCode=='200'){
                auditSuccess(alertInfo);
                $(_this).removeAttr('disabled');
            }
        })
    })


    //真安信审员意见
    var zhen_an_form_dom = $('[data-pane-id="zhenAn_Credit_Info_Aduit"]');
    var letter_audit_opinion_dom = $('[name="letterAuditOpinion"]');
    var letter_audit_result_dom = $('[name="letterAuditResult"]');
    var letter_audit_btn_dom = $('[data-id="lettertrial-audit"]');
    var letter_audit_b_dom = zhenAn_xinshen_dom.find('[data-role="font-length"]>b');

    function loadInfo(){
        var cur_select_val = letter_audit_result_dom.val();
        var cur_text_val = letter_audit_opinion_dom.val();
        if(cur_select_val == 'agree'){
            if(letter_audit_btn_dom.attr('disabled')!=='undefined'){
                letter_audit_btn_dom.removeAttr('disabled')
            }
        }else{
            if(cur_select_val == ''){
                letter_audit_btn_dom.attr('disabled','');
            }else{
                if(!cur_text_val.length){
                    letter_audit_btn_dom.attr('disabled','');
                }else{
                    letter_audit_btn_dom.removeAttr('disabled');
                }
            }

        }
}

    loadInfo()

    function registSelectChange(){
        letter_audit_result_dom.on('change',function(){
            var cur_select_val = $(this).val();
            var cur_text_val = letter_audit_opinion_dom.val();
            zhen_an_form_dom.find('label.error').remove();
            $('[name="insurerInstitutionId"]').val('')
            $('[name="capitalInstitutionId"]').val('')
            $('[name="regulatorInstitutionId"]').val('')
            $('[name="creditLine"]').val('');
            $('[name="loanTerm"]').val('');
            if(cur_select_val == 'agree'){
                if(letter_audit_btn_dom.attr('disabled')!=='undefined'){
                    letter_audit_btn_dom.removeAttr('disabled');
                }
            }else{
                if(!cur_text_val.length || (cur_text_val.length && cur_select_val == '')){
                    letter_audit_btn_dom.attr('disabled','');
                }
            }
        })
    }

    function registTextChange(){
        letter_audit_opinion_dom.bind('input propertychange',function(){     
            var curTextareaVal = $.trim($(this).val());  
            var curSelectVal = letter_audit_result_dom.val();         
            if(curTextareaVal.length>0){
                if(curSelectVal == 'return' || curSelectVal == 'refuse'){//
                    if(letter_audit_btn_dom.attr('disabled')!=='undefined'){
                        letter_audit_btn_dom.removeAttr('disabled')
                    }
                }
                
                if(curTextareaVal.length>140){
                    letter_audit_b_dom.text(0);
                    $(this).val($(this).val().substring(0,140));
                }else{
                    letter_audit_b_dom.text(140-$(this).val().length);
                }
            }else{
                if(curSelectVal !=='agree'){
                    zhen_an_form_dom.find('[data-id="lettertrial-audit"]').attr('disabled','');
                }
                
                letter_audit_b_dom.text('140');
            }

        });
    }

    registSelectChange();
    registTextChange();
    
    var zhen_an_credit_rules = {
        letterAuditResult:{
            required:true
        },
        creditLine:{
            required:true
        },
        loanTerm:{
            required:true
        },
        capitalInstitutionId:{
            required:true
        },
        regulatorInstitutionId:{
            required:true
        },
        insurerInstitutionId:{
            required:true
        },
    }

    //真安信审员数据前端验证
    
    formValidate(zhen_an_form_dom,zhen_an_credit_rules);

    /*提交真安信审员的意见*/
    letter_audit_btn_dom.on('click',function(){
        var _this = this;
        if(typeof $(this).attr('disabled')!=='undefined'){
            return 
        }
        
        var letterAuditResult = $.trim($('[name="letterAuditResult"]').val());
        var letterAuditOpinion = $.trim($('[name="letterAuditOpinion"]').val());
 
        var insurerInstitutionId = $.trim($('[name="insurerInstitutionId"]').val());
        var capitalInstitutionId = $.trim($('[name="capitalInstitutionId"]').val());
        var regulatorInstitutionId = $.trim($('[name="regulatorInstitutionId"]').val()); 
        var creditLine = removeSopt($.trim($('[name="creditLine"]').val()));//金额发送到后端存入数据库时去掉逗号
        var loanTerm = $.trim($('[name="loanTerm"]').val());

        var agree = $('[name="letterAuditResult"]').val()=='agree';
        
        console.debug((!agree)&&$.trim($('[name="letterAuditOpinion"]').val())=='')

        if((agree && !zhen_an_form_dom.valid())||((!agree)&&$.trim($('[name="letterAuditOpinion"]').val())=='')){
            return 
        }
        
        $(_this).attr('disabled','');

        var alertInfo = $(this).attr('data-info');
        var param = {};
        param.taskId = window.sessionStorage["taskId"];
        param.letterAuditResult = letterAuditResult;
        param.letterAuditOpinion = letterAuditOpinion;
        param.insurerInstitutionId = insurerInstitutionId;
        param.capitalInstitutionId = capitalInstitutionId;
        param.regulatorInstitutionId = regulatorInstitutionId;
        param.loanTerm = $('[name="loanTerm"]').val();
        param.creditLine = creditLine;
         
        console.debug('真安信审员发送给后端的数据');
        console.debug(param);

        HttpUtils.post_audit_lettertrial(param,function(data){
            if(data.statusCode=='200'){
                auditSuccess(alertInfo);
                $(_this).removeAttr('disabled');
            }
        },function(){
            $(_this).removeAttr('disabled');
        })
    })

    /*真安风控的意见*/
    $('[data-id="risk-audit"]').on('click',function(){
        var _this = this;
        if(typeof $(this).attr('disabled')!=='undefined'){
            return 
        }
        $(_this).attr('disabled','');
        var alertInfo = $(this).attr('data-info');
        var param = {};
        param.taskId = window.sessionStorage["taskId"];
        param.riskAuditResult = $('[name="riskAuditResult"]').val();
        param.riskAuditOpinion = $('[name="riskAuditOpinion"]').val();
        HttpUtils.post_audit_risk(param,function(data){
            if(data.statusCode=='200'){
                auditSuccess(alertInfo);
                $(_this).removeAttr('disabled');
            }
         })
    });

/**
*@description 获取对应id的机构名称
*@return {institytionName} string 机构名称
*/
    function getInstitytionName(list,id){
        var institytionName = '';
        $.each(list,function(i,item){
            if(id==item.id){
               institytionName = item.institutionName; 
               return false
            }
        })
        return institytionName
    }

    //酒厂查看信息审核节点的信息
    //如果审核通过则显示风控专员填写的信息
    //如果回退，则只显示省区经理的回退结果和审核意见
    //如果拒绝，则直接显示拒绝融资的审核结果

     HttpUtils.get_info_edit_echo_data({businessKey:window.sessionStorage["businessKey"]},function(data){
            if(!data.statusCode=='200'){
                return
            }
            var nodeInfo = data.data;
            console.debug('信息审核回显数据');
            console.debug(nodeInfo);
            if(is_winery){
                var winery_dom = $('[data-pane-id="winery"]');
                var winery_result_dom = winery_dom.find('select[name="wineryAuditResult"]');
                var winery_msg_dom = $('[data-returned="winery"]');

                var winery_manager_result = nodeInfo.manager_Info_Aduit_Result;
                var winery_manager_msg = nodeInfo.manager_Info_Aduit_Result_Msg;

                var winery_manager_time = nodeInfo.UpdateAt;
                winery_manager_time?(function(){
                    var manage_info = winery_dom.find('[data-management-info]');
                    manage_info.find('[data-management-time]').text('办理时间：'+winery_manager_time);
                    manage_info.show();
                }()):'';

                $('[data-pane-id]').hide();
                $('[data-pane-id="winery"]').show();

                if(nodeInfo.audite){
                    winery_result_dom.find('option[value="being-audited"]').attr('selected',true);
                }else if(nodeInfo.refuse){
                    winery_result_dom.find('option[value="refuse"]').attr('selected',true);
                    winery_result_dom.addClass('refuse');
                }else if(nodeInfo.zhenAn_Credit_Info_Aduit_Result=='agree'){
                    winery_result_dom.find('option[value="agree"]').attr('selected',true);
                    winery_result_dom.addClass('agree');
                    var jg_name = getInstitytionName(jg_list,nodeInfo.regulatorInstitutionId);
                    var lvyue_name = getInstitytionName(lvyue_list,nodeInfo.insurerInstitutionId);
                    var zf_name = getInstitytionName(zf_list,nodeInfo.capitalInstitutionId);
                    $('[name="winery-loanTerm"]').val(nodeInfo.loanTerm);
                    $('[name="winery-zf"]').val(zf_name);
                    $('[name="winery-jg"]').val(jg_name);
                    $('[name="winery-lvyue"]').val(lvyue_name);
                    $('[name="winery-credit"]').val(renderNum(nodeInfo.credit));
                    $('[data-passed="winery"]').show();
                }else if(winery_manager_result=='return'||winery_manager_result=='refuse'){
                    var winery_msg = nodeInfo.manager_Info_Aduit_Result_Msg;
                    if(winery_manager_result=='refuse'){//省区经理拒绝
                        winery_result_dom.find('option[value="refuse"]').attr('selected',true);
                    }
                   
                    if(winery_manager_result=='return' && winery_manager_msg!==''){//省区经理回退
                        winery_result_dom.find('option[value="return"]').attr('selected',true);
                        winery_dom.find('[name="winery-audit-msg"]').val(winery_msg);
                        winery_msg_dom.find('textarea').attr('disabled','');
                        winery_msg_dom.show();
                    } 

                     winery_result_dom.addClass('refuse');
                    
                }
                addSelectPatch()

            return 
        }

        //省区经理
        if(nodeInfo.manager_Info_Audit){
            var manager_result = nodeInfo.manager_Info_Audit.manager_Info_Aduit_Result;
            var manager_msg = nodeInfo.manager_Info_Audit.manager_Info_Aduit_Result_Msg;
            var manager_claim = nodeInfo.manager_Info_Audit.needClaim;
            var manager_institution = nodeInfo.manager_Info_Audit.InstitutionName;
            if(!manager_claim&&!manager_result){//此时是中酒领导查看
                review(manager_dom)
                manager_dom.show();
            }
            
            setInstitution(manager_dom,manager_institution)//机构
            if(manager_result || manager_claim){
                manager_dom.show();
                if(manager_result){//有回显信息
                    showManageInfo(manager_dom,nodeInfo.manager_Info_Audit);     
                    var manager_status_class = handleStatus(manager_result); 
                    $('[name="provincialAuditResult"]').addClass(manager_status_class).find('option[value="'+manager_result+'"]').attr('selected',true)
                    setOpinionInfo('[name="provincialAuditOpinion"]',manager_msg);
                    new controlBtn(0,'[data-pane-id="manager_Info_Audit"]',manager_msg.length);
                }

                (manager_result&&!manager_claim)?review(manager_dom):'';
                
            }
        }
        
        //渠道总监
        if(nodeInfo.director_Info_Audit){
            var director_result = nodeInfo.director_Info_Audit.director_Info_Audit_Result;
            var director_msg = nodeInfo.director_Info_Audit.director_Info_Audit_Result_Msg;
            var director_claim = nodeInfo.director_Info_Audit.needClaim;
            var director_institution = nodeInfo.director_Info_Audit.InstitutionName;
            setInstitution(director_dom,director_institution)
            if(director_result || director_claim){
                director_dom.show();  
                if(director_result){
                    showManageInfo(director_dom,nodeInfo.director_Info_Audit);                                      
                    var director_status_class = handleStatus(director_result);
                    $('[name="channelAuditResult"]').addClass(director_status_class).find('option[value="'+director_result+'"]').attr('selected',true)
                    setOpinionInfo('[name="channelAuditOpinion"]',director_msg);
                    new controlBtn(0,'[data-pane-id="director_Info_Audit"]',director_msg.length);
                }

                (director_result&&!director_claim)?review(director_dom):'';  
            }
        }
        

        //信贷专员
        if(nodeInfo.credit_Info_Audit){
            var credit_result = nodeInfo.credit_Info_Audit.credit_Info_Audit_Result;
            var credit_msg = nodeInfo.credit_Info_Audit.credit_Info_Audit_Result_Msg;
            var credit_claim = nodeInfo.credit_Info_Audit.needClaim;
            var credit_institution = nodeInfo.credit_Info_Audit.InstitutionName
            setInstitution(credit_dom,credit_institution)//机构
            if(credit_result || credit_claim){
                credit_dom.show();               
                if(credit_result){//查看
                    var credit_status_class = handleStatus(credit_result); 
                    $('[name="creditAuditResult"]').addClass(credit_status_class).find('option[value="'+credit_result+'"]').attr('selected',true);
                    setOpinionInfo('[name="creditAuditOpinion"]',credit_msg);//审核意见
                    showManageInfo(credit_dom,nodeInfo.credit_Info_Audit);//办理信息
                    new controlBtn(0,'[data-pane-id="credit_Info_Audit"]',credit_msg.length);//初始化组件  
                } 

                (!credit_claim&&credit_result)?review(credit_dom):'';
            }   
        }
        

        //真安信审员
        if(nodeInfo.zhenAn_Credit_Info_Aduit){
            var zhen_an_info_result = nodeInfo.zhenAn_Credit_Info_Aduit.zhenAn_Credit_Info_Aduit_Result;
            var zhen_an_info_msg = nodeInfo.zhenAn_Credit_Info_Aduit.zhenAn_Credit_Info_Aduit_Result_Msg;
            var zhen_an_info_claim = nodeInfo.zhenAn_Credit_Info_Aduit.needClaim;
            var zhen_an_info_instituion = nodeInfo.zhenAn_Credit_Info_Aduit.InstitutionName;
            setInstitution(zhenAn_xinshen_dom,zhen_an_info_instituion);
            if(zhen_an_info_result || zhen_an_info_claim){//审核过或正在审核
                zhenAn_xinshen_dom.show();
               
                if(zhen_an_info_result){//如果审核过
                    showManageInfo(zhenAn_xinshen_dom,nodeInfo.zhenAn_Credit_Info_Aduit);               
                    if(zhen_an_info_result=='agree'){
                        $('[data-audit-status="agree"]').show();
                        $('[name="creditLine"]').val(renderNum(nodeInfo.zhenAn_Credit_Info_Aduit.credit));
                        $('[name="loanTerm"]').val(nodeInfo.zhenAn_Credit_Info_Aduit.loanTerm);
                        $('#zf-institytion').find('option[value="'+nodeInfo.zhenAn_Credit_Info_Aduit.capitalInstitutionId+'"]').attr('selected',true);
                        $('#jg-institytion').find('option[value="'+nodeInfo.zhenAn_Credit_Info_Aduit.regulatorInstitutionId+'"]').attr('selected',true);
                        $('#lvyue-institytion').find('option[value="'+nodeInfo.zhenAn_Credit_Info_Aduit.insurerInstitutionId+'"]').attr('selected',true);
                    }
                    var letter_status_class = handleStatus(zhen_an_info_result);
                    $('[name="letterAuditResult"]').addClass(letter_status_class).find('option[value="'+zhen_an_info_result+'"]').attr('selected',true);
                    setOpinionInfo('[name="letterAuditOpinion"]',zhen_an_info_msg);
                } 
    
                (!zhen_an_info_claim&&zhen_an_info_result)?review(zhenAn_xinshen_dom):'';
                    
            } 

            loadInfo();
            registSelectChange();
            registTextChange();
        }
         

        //真安风控专员
        if(nodeInfo.zhenAn_Risk_Info_Aduit){
            var zhen_an_risk_result = nodeInfo.zhenAn_Risk_Info_Aduit.zhenAn_Risk_Finance_Aduit_Result;
            var zhen_an_risk_msg = nodeInfo.zhenAn_Risk_Info_Aduit.zhenAn_Risk_Finance_Aduit_Result_Msg;
            var zhen_an_risk_claim = nodeInfo.zhenAn_Risk_Info_Aduit.needClaim;
            var zhen_an_risk_institution = nodeInfo.zhenAn_Risk_Info_Aduit.InstitutionName;
            setInstitution(zhenAn_risk_dom,zhen_an_risk_institution);
            if(zhen_an_risk_result ||zhen_an_risk_claim){
            zhenAn_risk_dom.show();
            zhen_an_risk_result?showManageInfo(zhenAn_risk_dom,nodeInfo.zhenAn_Risk_Info_Aduit):'';
            if(zhen_an_risk_result){                
                var zhen_an_risk_status_class = handleStatus(zhen_an_risk_result);           
                $('[name="riskAuditResult"]').addClass(zhen_an_risk_status_class).find('option[value="'+zhen_an_risk_result+'"]').attr('selected',true);
                setOpinionInfo('[name="riskAuditOpinion"]',zhen_an_risk_msg); 
                new controlBtn(0,'[data-pane-id="zhenAn_Risk_Info_Aduit"]',zhen_an_risk_msg.length);               
            } 
            (!zhen_an_risk_claim&&zhen_an_risk_result)?review(zhenAn_risk_dom):'';
        } 


        }
    });
    


})
