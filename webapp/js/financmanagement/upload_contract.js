/**
*@Author Mona
*@date 2016-11-30
*@description 上传合同
*/

$(function () {

    var form_dom = $('[data-pane-id="upload-contract"]');
    var submit_contract_data_dom = $('[data-id="upload-contract-confirm"]');
    var upload_contract_dom = $('[data-pane-id="upload-contract"]');

    var contract_rules = {
        commissionCompany:{
            required:true
        },
        applyFinancingAmount:{
            required:true
        },
        commissionSupervisionContract:{
            required:true
        },
        financingServiceContract:{
            required:true
        },
        foodPurchaseContract:{
            required:true
        },
        loanContract:{
            required:true
        },
        propertyPledgeContract:{
            required:true            
        }
    }
    var contract_messages = {
        commissionCompany:{
            required:'贷款单位是必填项'
        },
        applyFinancingAmount:{
            required:'申请金额是必填项'
        },       
        commissionSupervisionContract:{
            required:'委托监管合同必须上传'
        },
        financingServiceContract:{
            required:'融资服务合同必须上传'
        },
        foodPurchaseContract:{
            required:'粮食采购合同必须上传'
        },
        loanContract:{
            required:'借款合同必须上传'
        },
        propertyPledgeContract:{
            required:'动产质押合同必须上传'
        }
    }

    formValidate(form_dom,contract_rules,contract_messages);
    
    function review(selector){
        $(selector).find('input,select').attr('disabled','');
        $(selector).find('[data-operater-bottom]').hide();
    }
    function claim(selector){
        $(selector).show();
        $(selector).find('[data-operater-bottom]').show();
    }

    //如果不是真安信审员
    if(!is_zhen_an_xinshen){
        review(upload_contract_dom);
    }else{
        claim(upload_contract_dom);
    }

    var xinshen_update = false;
    //合同数据回显
    HttpUtils.get_contract_data({businessKey:window.sessionStorage["businessKey"]},function(data){
        console.debug('上传合同回显数据');
        console.debug(data);
        var cur_data = data.data;
        $('[name="applicantCompany"]').val(cur_data.applicantCompany)//贷款单位
        $('[name="applicantCompany"]').attr('disabled','');
        if(!cur_data.contractInfo){
            return 
        }
        //办理信息
        is_winery?'':$('[name="InstitutionName"]').text('('+cur_data.InstitutionName+')');
        showManageInfo(upload_contract_dom,cur_data);
        upload_contract_dom.find('[data-management-time]').text('办理时间：'+cur_data.contractInfo.updateAt);

        //回显信息
        var xinshen_claim = cur_data.needClaim;
        xinshen_claim?claim(upload_contract_dom):review(upload_contract_dom);
        data.data.contractInfo.updateAt?xinshen_update=true:xinshen_update=false;
        $('[name="applyFinancingAmount"]').val(renderNum(cur_data.contractInfo.applyFinancingAmount));//申请金额

        //委托监管合同
        if(cur_data.contractInfo.commissionSupervisionContract){
            var comm_text = cur_data.contractInfo.commissionSupervisionContract.name;
            var comm_id = cur_data.contractInfo.commissionSupervisionContract.id;
            var comm_type = cur_data.contractInfo.commissionSupervisionContract.type;
            setAccessory('[name="commissionSupervisionContract"]',comm_text,comm_id,comm_type,xinshen_claim);
        }

        //融资服务合同
        if(cur_data.contractInfo.financingServiceContract){
            var finance_text = cur_data.contractInfo.financingServiceContract.name;
            var finance_id = cur_data.contractInfo.financingServiceContract.id;
            var finance_type = cur_data.contractInfo.financingServiceContract.type;
            setAccessory('[name="financingServiceContract"]',finance_text,finance_id,finance_type,xinshen_claim);
        }

        //粮食采购合同
        if(cur_data.contractInfo.foodPurchaseContract){
            var food_text = cur_data.contractInfo.foodPurchaseContract.name;
            var food_id = cur_data.contractInfo.foodPurchaseContract.id;
            var food_type = cur_data.contractInfo.foodPurchaseContract.type;
            setAccessory('[name="foodPurchaseContract"]',food_text,food_id,food_type,xinshen_claim);
        }

        //借款合同
        if(cur_data.contractInfo.loanContract){
            var loan_text = cur_data.contractInfo.loanContract.name;
            var loan_id = cur_data.contractInfo.loanContract.id;
            var loan_type = cur_data.contractInfo.loanContract.type;
            setAccessory('[name="loanContract"]',loan_text,loan_id,loan_type,xinshen_claim);
        }

        //动产质押合同
        if(cur_data.contractInfo.propertyPledgeContract){
            var property_text = cur_data.contractInfo.propertyPledgeContract.name;
            var property_id = cur_data.contractInfo.propertyPledgeContract.id;
            var property_type = cur_data.contractInfo.propertyPledgeContract.type;
            setAccessory('[name="propertyPledgeContract"]',property_text,property_id,property_type,xinshen_claim);
        }
        
    });



    //提交合同数据
    submit_contract_data_dom.on('click',function(){
        var _this = this;
        if(!form_dom.valid()||(typeof $(_this).attr('disabled')!=='undefined')){
            return 
        }
        $(_this).attr('disabled','');
        var alertInfo = $(_this).attr('data-info');        
        var param = {};
        var taskId = window.sessionStorage["taskId"];
        var applyFinancingAmount = removeSopt($('[name="applyFinancingAmount"]').val());        
        param.inputData = {
            taskId:taskId,
            applyFinancingAmount:applyFinancingAmount
        }  
        if(xinshen_update){
            if(window.sessionStorage["zhenAn_credit_upload_contract"] && window.sessionStorage["zhenAn_credit_upload_contract"]!==''){
                var fileArray = JSON.parse(window.sessionStorage["zhenAn_credit_upload_contract"]);
                param.files = fileArray;
                param.fileNames = fileArray;
            }
            param.inputData["status"]=1;

        }else{
            param.inputData["status"]=0;
            param.files = ['commissionSupervisionContract','financingServiceContract','foodPurchaseContract','loanContract','propertyPledgeContract'];
            param.fileNames = ['commissionSupervisionContract','financingServiceContract','foodPurchaseContract','loanContract','propertyPledgeContract'];
        }
                
        console.debug('上传合同提交数据')
        console.debug(param);
        HttpUtils.post_upload_contract_data(param,function(data){
            if(data.statusCode=='200'){
                auditSuccess(alertInfo);
                $(_this).removeAttr('disabled');
            }
        })

    })

})
