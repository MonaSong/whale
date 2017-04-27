/**
 * @Author Mona
 * @date 2017-01-03
 * @description 解除保单
 */

 $(function () {
        var release_policy_dom = $('[data-pane-id="release-policy"]');
        var release_policy_btn_dom = $('[data-id="submit-release-policy"]');

        //前端验证
        var release_policy_rules = {
            insuranceCollectedAmount:{
              required:true
            },
            insuranceCollectedFile:{
              required:true
            },
            insuranceClosePledgeFile:{
              required:true
            }
        }
        var release_policy_msg = {
            insuranceCollectedFile:{
              required:'请上传附件'
            },
            insuranceClosePledgeFile:{
              required:'请上传附件'
            }
        }
        
        formValidate(release_policy_dom,release_policy_rules,release_policy_msg);

        function claim(selector){
            $(selector).find('[data-operater-bottom]').show();
        }

        function review(selector){
            $(selector).find('input').attr('disabled','');
        }

        HttpUtils.get_close_policy_echo_data({businessKey:my_bus_key},function (data) {
            console.debug('解除保单回显数据');
            console.debug(data);
            var cur_data = data.data;
            if(!cur_data){
                return 
            }
                       
            cur_data.needClaim?claim(release_policy_dom):review(release_policy_dom);
            if(!cur_data.insuranceCollectedAmount){
                return 
            }

            //办理信息
            $('[name="institutionName"]').text('('+cur_data.institutionName+')');
            showManageInfo(release_policy_dom,cur_data);

            //回显数据
            $('[name="insuranceCollectedAmount"]').val(renderNum(cur_data.insuranceCollectedAmount));

            if(cur_data.insuranceClosePledgeFile){
                var closePledge_file_text = cur_data.insuranceClosePledgeFile.name;
                var closePledge_file_id = cur_data.insuranceClosePledgeFile.id;
                var closePledge_file_type = cur_data.insuranceClosePledgeFile.type;
                setAccessory('[name="insuranceCollectedFile"]',closePledge_file_text,closePledge_file_id,closePledge_file_type);
            }

            if(cur_data.insuranceCollectedFile){
                var collected_file_text = cur_data.insuranceCollectedFile.name;
                var collected_file_id = cur_data.insuranceCollectedFile.id;
                var collected_file_type = cur_data.insuranceCollectedFile.type;
                setAccessory('[name="insuranceClosePledgeFile"]',collected_file_text,collected_file_id,collected_file_type);
            }
        })

        release_policy_btn_dom.on('click',function(){
            var _this = this;
            if(!release_policy_dom.valid()||(typeof $(_this).attr('disabled')!=='undefined')){
                return 
            }
            $(_this).attr('disabled','');
            var param = {};
            param.inputData = {
                businessKey:window.sessionStorage["businessKey"],
                insuranceCollectedAmount:removeSopt($('[name="insuranceCollectedAmount"]').val())
            }
            param.files = ["insuranceCollectedFile","insuranceClosePledgeFile"]
            HttpUtils.post_close_policy_data(param,function (data) {
                if(data.statusCode=='200'){
                    whaleModal();
                    $(_this).removeAttr('disabled');
                }
            })
        })

 })

















