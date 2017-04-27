/*
 * @Author Mona
 * @date 2017-01-03
 * @description 解除质押
 */

 $(function(){
     var release_pledge_dom = $('[data-pane-id="release-pledge"]');
     var release_pledge_btn_dom = $('[data-id="submit-release-pledge"]');

     //前端验证
      var release_pledge_rules = {
          wineNumber:{
            required:true
          },
          closePledgeDate:{
            required:true
          },
          releasePledgeAccessory:{
            required:true
          },
          receiver:{
            required:true
          }

      }
      var release_pledge_msg = {
        releasePledgeAccessory:{
            required:'请上传附件'
          }
      }
      formValidate(release_pledge_dom,release_pledge_rules,release_pledge_msg);

      function claim(selector) {
          $(selector).find('[data-operater-bottom]').show();
      }

      function review(selector) {
          $(selector).find('input').attr('disabled','');
      }

      HttpUtils.get_close_pledge_data({businessKey:my_bus_key},function(data){
           console.debug('解除质押数据回显');
           console.debug(data); 
           var cur_data = data.data;
           $('[name="pledgeBusinessKey"]').text(cur_data.pledgeBusinessKey);
           cur_data.needClaim?claim(release_pledge_dom):review(release_pledge_dom);

           if(!cur_data.closePledgeDate){//如果没有数据就不做数据回显
              return 
           }

           //办理信息
           $('[name="institutionName"]').text('('+cur_data.institutionName+')');
           showManageInfo(release_pledge_dom,cur_data)

           //回显信息
           $('[name="wineNumber"]').val(cur_data.wineNumber);
           $('[name="closePledgeDate"]').val(cur_data.closePledgeDate);
           $('[name="receiver"]').val(cur_data.receiver);
           if(cur_data.file){
              var file_text = cur_data.file.name;
              var file_id = cur_data.file.id;
              var file_type = cur_data.file.type;
              setAccessory('[name="releasePledgeAccessory"]',file_text,file_id,file_type);
           }

      })

      release_pledge_btn_dom.on('click',function(){
        var _this = this;
        if(!release_pledge_dom.valid()||(typeof $(_this).attr('disabled')!=='undefined')){
          return 
        }
        $(_this).attr('disabled','');
        var param = {};
        param.inputData = {
            businessKey:window.sessionStorage["businessKey"],
            wineNumber:$('[name="wineNumber"]').val(),
            closePledgeDate:$('[name="closePledgeDate"]').val(),
            receiver:$('[name="receiver"]').val()
        }

        param.files = ["releasePledgeAccessory"];

        HttpUtils.post_close_pledge_data(param,function(data){
            if(data.statusCode == '200'){
              whaleModal();
              $(_this).removeAttr('disabled');
            }
        })

     })


 })

 













