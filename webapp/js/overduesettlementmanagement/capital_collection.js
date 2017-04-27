/**
 * @Author Mona
 * @date 2017-01-03
 * @description 资方收款 
 */

 $(function(){

  var capital_collection_dom = $('[data-pane-id="capital-collection"]');
  var capital_collection_btn_dom = $('[data-id="submit-capital-collection"]');
  var jg_dom = $('[data-pane-id="jg-operator"]')//监管方可以看到的dom
  
  //前端验证
  var capital_collection_rules = {
      collectedAmount:{
        required:true
      },
      collectAccessory:{
        required:true
      }
  }

  var capital_collection_msg = {
    collectAccessory:{
        required:'请上传附件'
      }
  }

  formValidate(capital_collection_dom,capital_collection_rules,capital_collection_msg);

  function claim(selector){
    $(selector).show();
    $(selector).find('[data-operater-bottom]').show();
  }

  function review(selector){
    $(selector).show();
    $(selector).find('input').attr('disabled','');
  }

  HttpUtils.get_capital_collected_echo_data({businessKey:my_bus_key},function(data){
      console.debug('资方收款回显');
      console.debug(data);

      if(is_jg_operator){
            jg_dom.show();
            return 
        }

      var cur_data = data.data;
      if(!cur_data){ //如果没有回调数据则不作下一步操作
        return 
      }
      cur_data.needClaim?claim(capital_collection_dom):review(capital_collection_dom);
      
      if(!cur_data.capitalCollectedAmount){
        return 
      }

      //办理信息
      showManageInfo(capital_collection_dom,cur_data)
      //回显数据
      $('[name="institutionName"]').text('('+cur_data.institutionName+')');
      $('[name="collectedAmount"]').val(renderNum(cur_data.capitalCollectedAmount));
      if(cur_data.file){
          var capital_file_text = cur_data.file.name;
          var capital_file_id = cur_data.file.id;
          var capital_file_type = cur_data.file.type;
          setAccessory('[name="collectAccessory"]',capital_file_text,capital_file_id,capital_file_type);
      }
  })

  capital_collection_btn_dom.on('click',function(){
      var _this = this;
      if(!capital_collection_dom.valid()||(typeof $(_this).attr('disabled')!=='undefined')){
          return 
      }
      $(_this).attr('disabled','')
      var param = {};
      param.inputData = {
        businessKey:window.sessionStorage["businessKey"],
        collectedAmount:removeSopt($('[name="collectedAmount"]').val())
      }
      param.files = ["collectAccessory"];      
      HttpUtils.post_capital_collected_data(param,function(data){
          if(data.statusCode == '200'){
            whaleModal();
            $(_this).removeAttr('disabled');
          }
      })
  })


 })
 





