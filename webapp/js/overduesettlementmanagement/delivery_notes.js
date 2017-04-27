/*
 * @Author Mona
 * @date 2017-01-04
 * @description 提货
 */

 $(function(){

        var delivery_notes_dom = $('[data-pane-id="delivery-notes"]');
        var delivery_notes_btn_dom = $('[data-id="submit-delivery-notes"]');
        //前端验证
        var delivery_notes_rules = {
          deliveryAccessory:{
            required:true
          }
        }

        var delivery_notes_msg = {
          deliveryAccessory:{
            required:'请上传附件'
          }
        }

        formValidate(delivery_notes_dom,delivery_notes_rules,delivery_notes_msg);

        function claim(selector){
            $(selector).find('[data-operater-bottom]').show();
        }

        function review(selector){
            $(selector).find('input').attr('disabled','');
        }

        HttpUtils.get_delivery_echo_data({businessKey:my_bus_key},function(data){
            console.debug('提货回显数据');
            console.debug(data);
            var cur_data = data.data;
            cur_data.needClaim?claim(delivery_notes_dom):review(delivery_notes_dom);
            if(!cur_data.file){
                return 
            }
            //办理信息
            $('[name="institutionName"]').text('('+cur_data.institutionName+')');
            showManageInfo(delivery_notes_dom,cur_data);

            //回显数据
            if(cur_data.file){
              var delivery_file_text = cur_data.file.name;
              var delivery_file_id = cur_data.file.id;
              var delivery_file_type = cur_data.file.type;
              setAccessory('[name="deliveryAccessory"]',delivery_file_text,delivery_file_id,delivery_file_type); 
            }

        })

        delivery_notes_btn_dom.on('click',function(){
            var _this = this;
            if(!delivery_notes_dom.valid() ||(typeof $(_this).attr('disabled')!=='undefined')){
                return 
            }

            $(_this).attr('disabled','')
            var param = {}
            param.inputData = {
                businessKey:window.sessionStorage["businessKey"]
            }
            param.files = ["deliveryAccessory"];
            HttpUtils.post_delivery_data(param,function (data) {
                if(data.statusCode == '200'){
                    whaleModal();
                    $(_this).removeAttr('disabled');
                }
            })
      })
 })
