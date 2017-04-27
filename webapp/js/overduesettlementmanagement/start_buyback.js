/**
* @Author Mona
* @date 2017-01-03
* @description 启动回购
*/

$(function () {
    var back_buy_dom = $('[data-pane-id="back-buy"]');
    var back_buy_btn_dom = $('[data-id="submit-back-buy"]');
    var jg_dom = $('[data-pane-id="jg-operator"]')//监管方可以看到的dom
    
    //前端验证
    var buy_back_rules = {
        buyBackFile:{
          required:true
        },
        paymentFile:{
          required:true
        },
        buyBackAmount:{
          required:true
        }
    }
    var buy_back_msg = {
        buyBackFile:{
          required:'请上传附件'
        },
        paymentFile:{
          required:'请上传附件'
        }
    }
    
    formValidate(back_buy_dom,buy_back_rules,buy_back_msg);

    function claim(selector){
        $(selector).show();
        $(selector).find('[data-operater-bottom]').show();
    }

    function review(selector){
        $(selector).show();
        $(selector).find('input').attr('disabled','');
    }

    HttpUtils.get_buy_back_echo_data({businessKey:my_bus_key},function(data){
        console.debug('启动回购回显数据');
        console.debug(data);
        if(is_jg_operator){
            jg_dom.show();
            return 
        }

        var cur_data = data.data;
        if(!cur_data){
          return 
        }
        
        cur_data.needClaim?claim(back_buy_dom):review(back_buy_dom);
        if(!cur_data.capitalCollectedAmount){
          return 
        }

        //办理信息
        $('[name="institutionName"]').text('('+cur_data.institutionName+')');
        showManageInfo(back_buy_dom,cur_data);

        //回显数据
        $('[name="buyBackAmount"]').val(renderNum(cur_data.capitalCollectedAmount));
        if(cur_data.buyBackFile){
            var buyBack_file_text = cur_data.buyBackFile.name;
            var buyBack_file_id = cur_data.buyBackFile.id;
            var buyBack_file_type = cur_data.buyBackFile.type;
            setAccessory('[name="buyBackFile"]',buyBack_file_text,buyBack_file_id,buyBack_file_type);
        }

        if(cur_data.paymentFile){
            var payment_file_text = cur_data.paymentFile.name;
            var payment_file_id = cur_data.paymentFile.id;
            var payment_file_type = cur_data.paymentFile.type;
            setAccessory('[name="paymentFile"]',payment_file_text,payment_file_id,payment_file_type);
        }
    })

    back_buy_btn_dom.on('click',function(){
        var _this = this;
        if(!back_buy_dom.valid()||(typeof $(_this).attr('disabled')!=='undefined')){
          return 
        }
        $(_this).attr('disabled','');
        var param = {};
        param.inputData = {
          businessKey:window.sessionStorage["businessKey"],
          buyBackAmount:removeSopt($('[name="buyBackAmount"]').val())
        };
        param.files = ["buyBackFile","paymentFile"]
        HttpUtils.post_buy_back_data(param,function(data){
            if(data.statusCode=='200'){
                whaleModal();
                $(_this).removeAttr('disabled');
            }
        })
    })
    

})






