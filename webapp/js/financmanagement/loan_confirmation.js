/**
*@Author Mona
*@date 2016-12-02
*@放款确认
*/
$(function(){
    var zf_loan_confirm_btn_dom = $('[data-id="zf-loan-confirm"]');
    var zhen_an_zf_confirm_btn_dom = $('[data-id="zhen-an-zf-confirm"]');
    var zhong_jiu_zf_confirm_btn_dom = $('[data-id="zhong-jiu-confirm"]');
    var zhen_an_zj_confirm_btn_dom = $('[data-id="zhen-an-zj-confirm"]');

    var zf_loan_dom = $('[data-pane-id="zf-loan"]');
    var zhen_an_zf_dom = $('[data-pane-id="zhen-an-zf-loan"]');
    var zhong_jiu_zf_dom = $('[data-pane-id="zhong-jiu-zf"]');
    var zhen_an_zj_dom = $('[data-pane-id="zhen-an-zj-loan"]');

    function review(selector){
        $(selector).show();
        $(selector).find('select,textarea,input').attr('disabled','');
        $(selector).find('[data-operator-bottom],[data-role="font-length"]').hide();
        addSelectPatch();
    }

    function claim(selector){
        $(selector).show();
        if(typeof $(selector).find('input,select,textarea').attr('disabled')!=='undefined'){
            $(selector).find('input,select,textarea').removeAttr('disabled');
        }
        $(selector).find('[data-operator-bottom]').show();
    }

    var managementStatus = window.sessionStorage["managementStatus"];
    
    if(!(is_zf_operator)){
        review(zf_loan_dom);
    }

    //资方操作员 前端验证
    var zf_rules = {
        realLoanAmount:{
            required:true
        },
        annualInterestRate:{
           required:true 
        },
        loanTime:{
          required:true
        },
        dueTime:{
          required:true
        },
        repaymentMethod:{
          required:true  
        },
        financingPeriod:{
          required:true
       },
       loanVoucherAccessory:{
          required:true
       }

    }

    var zf_msg = {
        loanVoucherAccessory:{
          required:'请上传附件'
       }
    }

    formValidate(zf_loan_dom,zf_rules,zf_msg);

    var zj_rules = {
        payeeUnit:{
            required:true
        },
        receiveAmount:{
            required:true
        },
        arrivalTime:{
            required:true
        },
        receiptVoucherAccessory:{
            required:true
        },
        applyFinancingAmount:{
            required:true
        }
    }

    var zj_msg = {
        receiptVoucherAccessory:{
            required:'请上传附件'
        }
    }

    formValidate(zhong_jiu_zf_dom,zj_rules,zj_msg);

    //初始化填写意见组件
    new controlBtn(0,'[data-pane-id="zhen-an-zj-loan"]',0)//真安确认收款
    new controlBtn(0,'[data-pane-id="zhen-an-zf-loan"]',0)//真安确认放款

    var zf_loan_update = false;
    var zj_is_update = false;

    //放款确认数据回显
    HttpUtils.get_loan_confirm_echo_data({businessKey:window.sessionStorage["businessKey"]},function(data){
        console.debug('放款确认回显数据')
        console.debug(data);

        var cur_data = data.data;

        //资方回显信息
        var zf_claim = cur_data.capital_upload_loan_voucher.needClaim;
        zf_claim?claim(zf_loan_dom):''; 

        //回显数据添加只读状态
        if(zf_claim){
            $('[name="wineryName"],[name="financingBankName"],[name="financingAccount"],[name="applyFinancingAmount"],[name="bankInstitutionName"]').attr('disabled','');
        }


        if(zf_claim||cur_data.loan_info){
            $('[name="wineryName"]').val(cur_data.wineryName);
            $('[name="applyFinancingAmount"]').val(cur_data.applyFinancingAmount);
            $('[name="financingBankName"]').val(cur_data.financingBankName);
            $('[name="bankInstitutionName"]').val(cur_data.bankInstitutionName);
            $('[name="financingAccount"]').val(cur_data.financingAccount);
            $('[name="financingPeriod"]').val(cur_data.financingPeriod);
        }

        addSelectPatch()

        if(!cur_data.loan_info){//资方和中酒一起的回显数据
            return 
        }

        //资方机构信息
        is_winery?'':$('[name="span-bankInstitutionName"]').text('('+cur_data.bankInstitutionName+')');
        
        var loan_info = cur_data.loan_info;
        var zf_update_time = cur_data.loan_info.loanVoucherTime;
        zf_update_time && !zf_claim?review(zf_loan_dom):'';
        zf_update_time && zf_claim?zf_loan_update=true:zf_loan_update=false;//资方放款修改

        $('[name="realLoanAmount"]').val(renderNum(loan_info.realLoanAmount));
        $('[name="annualInterestRate"]').val(loan_info.annualInterestRate);
        $('[name="loanTime"]').val(loan_info.loanTime);
        $('[name="dueTime"]').val(loan_info.dueTime);

        $('[name="repaymentMethod"]').find('option[value="'+loan_info.repaymentMethod+'"]').attr('selected','selected');

        $('[name="financingPeriod"]').val(loan_info.financingPeriod);
        var zf_manage_info = zf_loan_dom.find('[data-management-info]');

        if(is_winery){
            zf_manage_info.find('[data-role-name]').hide()
            zf_manage_info.find('[data-true-name]').hide();
        }else{
            zf_manage_info.find('[data-role-name]').text(cur_data.bankRoleName);
            zf_manage_info.find('[data-true-name]').text(cur_data.bankUserName);
        }
        
        zf_manage_info.find('[data-management-time]').text('办理时间：'+loan_info.loanVoucherTime);
        zf_manage_info.show();

        if(loan_info && loan_info.loanVoucherAccessory){//如果有上传过放款凭证
            var zf_loan_text = loan_info.loanVoucherAccessory.name;
            var zf_loan_id = loan_info.loanVoucherAccessory.id;
            var zf_laon_type = loan_info.loanVoucherAccessory.type;
            setAccessory('[name="loanVoucherAccessory"]',zf_loan_text,zf_loan_id,zf_laon_type,zf_claim);
        }

        addSelectPatch();

        //真安审核资方放款
        var zhen_an_confirm_zf = cur_data.zhenAn_credit_loan_aduit;
        var cf_zf_result = zhen_an_confirm_zf.zhenAn_credit_loan_aduit_result;
        var cf_zf_msg = zhen_an_confirm_zf.zhenAn_credit_loan_aduit_result_Msg;
        var cf_zf_claim = zhen_an_confirm_zf.needClaim;
        var cf_zf_msg_dom = $('[name="creditLoanResultMsg"]');
        var cf_zf_result_dom = $('[name="creditLoanResult"]');
        var cf_zf_updateAt = zhen_an_confirm_zf.UpdateAt;
        cf_zf_claim?claim(zhen_an_zf_dom):'';//办理
        if(cf_zf_updateAt && !is_winery){//如果真安确认资方放款有数据则做数据回显
            cf_zf_result&&!cf_zf_claim?review(zhen_an_zf_dom):'';//查看 
            cf_zf_result_dom.find('option[value="'+cf_zf_result+'"]').attr('selected','selected');
            cf_zf_result_dom.addClass(handleStatus(cf_zf_result));      
            setOpinionInfo(cf_zf_msg_dom,cf_zf_msg);
            showManageInfo(zhen_an_zf_dom,zhen_an_confirm_zf);
            setInstitution(zhen_an_zf_dom,zhen_an_confirm_zf.InstitutionName);
            new controlBtn(0,'[data-pane-id="zhen-an-zf-loan"]',cf_zf_msg.length)//真安确认放款
        }

        //中酒风控专员确认收款
        var zj_risk_info = cur_data.zj_risk_upload_receipt_voucher;
        var zj_risk_claim = zj_risk_info.needClaim;
        var zj_update_at = loan_info.receiptVoucherTime;
        zj_is_update = (zj_update_at && zj_risk_claim);
        console.debug('中酒风控办理数据');
        console.debug(zj_risk_claim);
        console.debug(zj_update_at);
        zj_risk_claim?claim(zhong_jiu_zf_dom):'';//办理
        
        //贷款金额设置为只读状态
        if(zj_risk_claim){
           zhong_jiu_zf_dom.find('[name="applyFinancingAmount"]').attr('disabled','');
        }

        addSelectPatch();

        if(!zj_update_at){//如果没有办理过就不做数据回显
           return 
        }

        is_winery?'':setInstitution(zhong_jiu_zf_dom,cur_data.platFormIntitutionName);
        zj_update_at&&!zj_risk_claim?review(zhong_jiu_zf_dom):'';//预览
        $('[name="payeeUnit"]').val(loan_info.payeeUnit);//收款单位

        $('[name="applyFinancingAmount"]').val(renderNum(cur_data.applyFinancingAmount));
        $('[name="receiveAmount"]').val(renderNum(loan_info.receiveAmount));//实收金额       
        $('[name="arrivalTime"]').val(loan_info.arrivalTime);//到账时间
        
        if(loan_info.receiptVoucherAccessory){
            var receipt_id = loan_info.receiptVoucherAccessory.id;
            var receipt_text = loan_info.receiptVoucherAccessory.name;
            var receipt_type = loan_info.receiptVoucherAccessory.type;
            setAccessory('[name="receiptVoucherAccessory"]',receipt_text,receipt_id,receipt_type,zj_risk_claim);
        }

        var zj_manage_info = zhong_jiu_zf_dom.find('[data-management-info]');
        if(is_winery){
            zj_manage_info.find('[data-role-name]').hide();
            zj_manage_info.find('[data-true-name]').hide();
        }else{
            zj_manage_info.find('[data-role-name]').text(cur_data.zj_risk_role_name);
            zj_manage_info.find('[data-true-name]').text(cur_data.zj_risk_user_name);
        }
        
        zj_manage_info.find('[data-management-time]').text('办理时间：'+loan_info.receiptVoucherTime);
        zj_manage_info.show();

        addSelectPatch();

        //真安信审员确认收款回显        
        var zhen_an_recive_info = cur_data.zhenAn_credit_receipt_aduit;
        var zhen_an_recive_claim = zhen_an_recive_info.needClaim;
        var zhen_an_recive_updateAt = zhen_an_recive_info.UpdateAt;
        var zhen_an_recive_result = zhen_an_recive_info.zhenAn_credit_receipt_aduit_result;
        var zhen_an_recive_msg = zhen_an_recive_info.zhenAn_credit_receipt_aduit_result_Msg;
        var zhen_an_zj_msg_len = zhen_an_recive_msg?zhen_an_recive_msg.length:'0';
        var cf_zj_msg_dom = $('[name="creditReceiptResultMsg"]');
        var cf_zj_result_dom = $('[name="creditReceiptResult"]');

        zhen_an_recive_claim?claim(zhen_an_zj_dom):'';
        if(!zhen_an_recive_updateAt || is_winery){//如果没有办理过或者用户是酒厂业务员就不做数据回显
            return
        } 
        zhen_an_recive_updateAt&&!zhen_an_recive_claim?review(zhen_an_zj_dom):'';
        cf_zj_result_dom.find('option[value="'+zhen_an_recive_result+'"]').attr('selected','selected');
        cf_zj_result_dom.addClass(handleStatus(zhen_an_recive_result));
        setOpinionInfo(cf_zj_msg_dom,zhen_an_recive_msg);
        new controlBtn(0,'[data-pane-id="zhen-an-zj-loan"]',zhen_an_zj_msg_len);
        showManageInfo(zhen_an_zj_dom,cur_data.zhenAn_credit_receipt_aduit);
        setInstitution(zhen_an_zj_dom,zhen_an_recive_info.InstitutionName);

        addSelectPatch();

    });   
    
    //确认放款-资方放款
    zf_loan_confirm_btn_dom.on('click',function () {
        var _this = this;
        if(!$(zf_loan_dom).valid()||(typeof $(_this).attr('disabled')!=='undefined')){
            return 
        }
        $(_this).attr('disabled','');
        var alertInfo = $(this).attr('data-info');
        var param = {};
        param.inputData = {
            taskId:window.sessionStorage["taskId"],
            realLoanAmount:removeSopt($('[name="realLoanAmount"]').val()),
            annualInterestRate:$('[name="annualInterestRate"]').val(),
            loanTime:$('[name="loanTime"]').val(),
            dueTime:$('[name="dueTime"]').val(),
            repaymentMethod:$('[name="repaymentMethod"]').val(),
            financingPeriod:$('[name="financingPeriod"]').val()
        }
        console.debug('资方放款确认==')
        console.debug(param)
        if(zf_loan_update){
            if(window.sessionStorage["loan_aduit"] && window.sessionStorage["loan_aduit"]!==''){
                    var fileArray = JSON.parse(window.sessionStorage["loan_aduit"]);
                    param.files = fileArray;
            }
            param["inputData"]["status"] = 1;
            window.sessionStorage["loan_aduit"] = '';
        }else{
            param.files = ['loanVoucherAccessory'];
            param["inputData"]["status"] = 0;
        }
        
        HttpUtils.post_zi_fang_loan_data(param,function(data){
            if(data.statusCode=='200'){
                if(zf_loan_update){
                    auditSuccess(alertInfo);
                }else{
                    whaleModal({
                        successText:'确定',
                        info:'已在还款管理菜单中创建还款计划，请完善并启用还款计划。',
                        type:'operableModal',
                        cancelCallback:function(){
                            //点击取消时跳转到融资列表页
                            window.location.href = window.sessionStorage["historyRef"]?window.sessionStorage["historyRef"]:(contextPath+'/anagement_page');
                        },
                        successCallback:function(){
                            //点击前往办理则进入到还款的具体列表
                            window.location.href = window.sessionStorage["historyRef"]?window.sessionStorage["historyRef"]:(contextPath+'/anagement_page');
                        }
                    });               
                }
                
                window.sessionStorage["loan_aduit"]='';
                $(_this).removeAttr('disabled');
            }
        })
    })

    //确认放款-真安信审员审核资方放款
    zhen_an_zf_confirm_btn_dom.on('click',function(){
        var _this = this;
        if(typeof $(_this).attr('disabled')!=='undefined'){
            return 
        }
        $(_this).attr('disabled','');
        var alertInfo = $(this).attr('data-info');
        var audit_result = $('[name="creditLoanResult"]').val();
        var audit_msg = $('[name="creditLoanResultMsg"]').val();
        var param = {
            taskId:window.sessionStorage["taskId"],
            creditLoanResult:audit_result,
            creditLoanResultMsg:audit_msg
        };
        console.debug('真安信审员确认资方放款，审核结果数据');
        console.debug(param);
        HttpUtils.post_zhen_an_confirm_zi_fang_data(param,function(data){
            if(data.statusCode=='200'){
                auditSuccess(alertInfo);
                $(_this).removeAttr('disabled');
            }
        });

    })


    //确认放款-中酒上传收款凭证
    zhong_jiu_zf_confirm_btn_dom.on('click',function(){
        var _this = this;
        if(!(zhong_jiu_zf_dom).valid()||(typeof $(_this).attr('disabled')!=='undefined')){
            return 
        }
        $(_this).attr('disabled','');
        var alertInfo = $(this).attr('data-info');
        var param = {};
        param.inputData = {
            taskId:window.sessionStorage["taskId"],
            receiveAmount:removeSopt($('[name="receiveAmount"]').val()),
            payeeUnit:$('[name="payeeUnit"]').val(),
            arrivalTime:$('[name="arrivalTime"]').val()
        }

        if(zj_is_update){
            if(window.sessionStorage["loan_aduit"] && window.sessionStorage["loan_aduit"]!==''){
                var fileArray = JSON.parse(window.sessionStorage["loan_aduit"]);
                param.files = fileArray;
            }
            param.inputData["status"] = 1;
            window.sessionStorage["loan_aduit"] = '';
        }else{
            param.files =  ["receiptVoucherAccessory"];
            param.inputData["status"] = 0;
        }
        console.debug('中酒风控确认收款')
        console.debug(param)
        
        HttpUtils.post_zhong_jiu_confirm_zi_zifang_loan_data(param,function(data){
            if(data.statusCode=='200'){
                auditSuccess(alertInfo);
                $(_this).removeAttr('disabled');
            }
        })
    })

    //确认放款-真安确认中酒放款成功
    zhen_an_zj_confirm_btn_dom.on('click',function(){
        var _this = this;
        if(typeof $(_this).attr('disabled')!=='undefined'){
            return 
        }
        $(_this).attr('disabled','');
        var alertInfo = $(this).attr('data-info');
        var param = {
            taskId:window.sessionStorage["taskId"],
            creditReceiptResult:$('[name="creditReceiptResult"]').val(),
            creditReceiptResultMsg:$('[name="creditReceiptResultMsg"]').val()
        }
        console.debug('真安信审员确认中酒收款，审核结果数据');
        console.debug(param);
        HttpUtils.post_zhen_an_confirm_zhongjiu_recive_data(param,function(data){
            if(data.statusCode=='200'){
                auditSuccess(alertInfo);
                $(_this).removeAttr('disabled');
            }
        })

    })


    
    
})
