
/**
 * @Author Mona
 * @date 2017-01-03
 * @description 保险赔付
 */
  $(function(){
    var insurance_payment_dom = $('[data-pane-id="Insurance-claim"]');
    var insurance_confirm_btn_dom = $('[data-id="submit-insurance-claim"]');
    var jg_dom = $('[data-pane-id="jg-operator"]')//监管方可以看到的dom

    function claim(selector){
        $(selector).show();
        $(selector).find('[data-operater-bottom]').show();
    }

    function review(selector) {
        $(selector).show();
        $(selector).find('input').attr('disabled','');
    }

    //前端验证
    var insurance_claim_rules = {
        actualPaymentAmount:{
            required:true
        },
        actualPaymentTime:{
            required:true
        },
        paymentAccessory:{
            required:true
        }
    }
    
    var insurance_claim_msg = {
        paymentAccessory:{
            required:'请上传附件'
        }
    }

    formValidate(insurance_payment_dom,insurance_claim_rules,insurance_claim_msg)
    //保险赔付回显数据
    HttpUtils.get_insurance_payment_echo_data({businessKey:my_bus_key},function(data){
        console.debug('保险赔付回显数据');
        console.debug(data)

        if(is_jg_operator){
            jg_dom.show();
            return 
        }
        var cur_data = data.data;
        var need_claim = cur_data.needClaim;
        
        $('[name="compensationAmount"]').text(renderNum(cur_data.compensationAmount)+'元');//应付金额
        need_claim?claim(insurance_payment_dom):review(insurance_payment_dom);

        if(!cur_data.file){
            return 
        }

        //办理信息
        showManageInfo(insurance_payment_dom,cur_data);
         
        //回显信息
        $('[name="institutionName"]').text("("+cur_data.institutionName+")");//机构名称
        $('[name="actualPaymentTime"]').text(cur_data.actualPaymentTime);//付款时间        
        
        if(cur_data.file){
            var payment_file_text = cur_data.file.name;
            var payment_file_id = cur_data.file.id;
            var payment_file_type = cur_data.file.type;
            setAccessory('[name="paymentAccessory"]',payment_file_text,payment_file_id,payment_file_type);
        }
        $('[name="actualPaymentAmount"]').val(renderNum(cur_data.actualPaymentAmount));
        $('[name="actualPaymentTime"]').val(cur_data.actualPaymentTime);
    })

    insurance_confirm_btn_dom.on('click',function(){
        var _this = this;
        if(!insurance_payment_dom.valid()||(typeof $(_this).attr('disabled')!=='undefined')){
          return 
        } 
        $(_this).attr('disabled','')
        var param = {};
        param.inputData = {
            businessKey:window.sessionStorage["businessKey"],
            actualPaymentAmount:removeSopt($('[name="actualPaymentAmount"]').val()),
            actualPaymentTime:$('[name="actualPaymentTime"]').val()
        }
        param.files = ["paymentAccessory"];
        HttpUtils.post_insurance_payment_data(param,function(data){
            if(data.statusCode == '200'){
                whaleModal();
                $(_this).removeAttr('disabled');
            }
        })
    })



  })
    







