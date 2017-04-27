/**
* @Author Mona
* @date 2017-01-03
* @description 发起理赔
*/
$(function () {
    var role_info = new Role();
    var role_id = role_info.getRoleId();
    var is_zf_operator = role.compareTo(role_id,role["zf_management_operator"])//资方操作员
    var start_over_due_dom = $('[data-pane-id="start_over_due"]');
    var submit_new_over_due_btn_dom = $('#submit-new-overdue-data');
    var jg_dom = $('[data-pane-id="jg-operator"]')//监管方可以看到的dom
    function claim(selector){
        $(selector).show();
        $(selector).find('[data-operater-bottom]').show();
    }

    function review(selector){
        $(selector).show();
        $(selector).find('input').attr('disabled','');
    }

    //前端验证
    var start_over_due_rules = {
        compensationAmount:{
            required:true
        },
        receiptAccessory:{
            required:true
        }
    }
    var start_over_due_msg = {
        receiptAccessory:{
            required:'请上传附件'
        }
    }
    formValidate(start_over_due_dom,start_over_due_rules,start_over_due_msg)

    //发起逾期理赔回显数据
    HttpUtils.get_settlementdetail_echo_data({businessKey:my_bus_key},function(data){
        console.debug('发起逾期理赔回显数据');
        console.debug(data);
        if(is_jg_operator){
            jg_dom.show();
            return 
        }

        var cur_data = data.data;
        var need_claim = cur_data.needClaim;
        (is_zf_operator&&need_claim)?claim(start_over_due_dom):review(start_over_due_dom);         
        //发起理赔具体回显数据
        $('[name="repaymentBusinessKey"]').text(cur_data.repaymentBusinessKey);//理赔编号
        $('[name="loanCompanyName"]').text(cur_data.loanCompanyName);//资金方
        $('[name="loanAmoun"]').text(renderNum(cur_data.loanAmoun)+'元');
        $('[name="overdueTimes"]').text(cur_data.overdueTimes);//期次
        $('[name="wineryCompanyName"]').text(cur_data.wineryCompanyName);
        $('[name="insurerInstitutionName"]').text(cur_data.insurerInstitutionName);
        $('[name="financingPeriod"]').text(cur_data.financingPeriod+'年期');//融资期限
        $('[name="repaymentTotalAmount"]').text(renderNum(cur_data.repaymentTotalAmount)+'元');//还款总额
        $('[name="regulatorInstitutionName"]').text(cur_data.regulatorInstitutionName);
        cur_data.alreadyRepaymentAmount?$('[name="alreadyRepaymentAmount"]').text(renderNum(cur_data.alreadyRepaymentAmount)+'元'):$('[name="alreadyRepaymentAmount"]').text('0元');//已还总额
        
        if(!cur_data.compensationFile){
            return 
        }

        //办理信息
        $('[name="institutionName"]').text('('+cur_data.loanCompanyName+')');
        showManageInfo(start_over_due_dom,cur_data)

        //机构名称
        $('[name="institutionName"]').text("("+cur_data.institutionName+")");

        //赔付金额
        $('[name="compensationAmount"]').val(renderNum(cur_data.compensationAmount));

        //收货清单
        if(cur_data.compensationFile){
            var file_text = cur_data.compensationFile.name;
            var file_id = cur_data.compensationFile.id;
            var file_type = cur_data.compensationFile.type;
            setAccessory('[name="receiptAccessory"]',file_text,file_id,file_type);
        }

    })

    submit_new_over_due_btn_dom.on('click',function(){
        var _this = this;
        if(!start_over_due_dom.valid()||(typeof $(_this).attr('disabled')!=='undefined')){
            return 
        }
        $(_this).attr('disabled','');
        var param = {}
        param.inputData = {
            businessKey:window.sessionStorage["businessKey"],
            compensationAmount:removeSopt($('[name="compensationAmount"]').val())
        }
        param.files = ["receiptAccessory"];
        HttpUtils.post_start_oversettlement_data(param,function(data){
            if(data.statusCode=='200'){
                whaleModal();
                $(_this).removeAttr('disabled');
            }
        })
    })

})









