/**
 *@Author Mona
 *@date 2016-12-01
 *@description 编辑质押监管信息
 */
$(function(){

  var edit_pledge_info_btn_dom = $('[data-id="pledge-info-confirm"]');
  var jg_pledge_dom = $('[data-pane-id="edit-pledge-info"]');
  var winery_dom  = $('[id="winery-peledge-info"]');
  var zhen_an_credit_dom = $('[data-pane-id="zhen-an-credit"]');//真安审核的dom内容

  var role_info = new Role();
  var roleId = role_info.getRoleId();
  var is_jg_operator = role.compareTo(roleId,role["jg_operator"]);//是否是监管方

  winery_dom.find('[data-management-info]').show();
  if(window.sessionStorage["managementStatus"]=='0'){
    $('[data-operater-bottom]').show();
  }
  var pledge_rules = {
      baseWineTypes:{
        required:true
      },
      baseWineNum:{
        required:true
      },
      productionTime:{
        required:true
      },
      evaluationPrice:{
        required:true
      },
      pledgeeName:{
        required:true
      },
      pledgorName:{
        required:true
      },
      qualityDate:{
        required:true
      },
      regulatorName:{
        required:true
      },
      pledgeBillAccessory:{
        required:true
      },
      regulatorPolicyHolder:{
        required:true
      },
      regulatorInsurer:{
        required:true
      },
      regulatorPolicyPremium:{
        required:true
      },
      regulatorPolicyAccessory:{
        required:true
      },
      propertyPolicyName:{
        required:true
      },
      propertyPolicyHolder:{
        required:true
      },
      propertyInsurer:{
        required:true
      },
      propertyPolicyPremium:{
        required:true
      },
      propertyPolicyPeriod:{
        required:true
      },
      propertyPolicyAccessory:{
        required:true        
      },
      regulatorPolicyName:{
        required:true 
      },
      regulatorPolicyPeriod:{
        required:true
      }
  }
  var pledge_msg = {
      pledgeBillAccessory:{
        required:'请上传附件'
      },
      regulatorPolicyPremium:{
        required:'请上传附件'
      },
      propertyPolicyAccessory:{
        required:'请上传附件'        
      },
      regulatorPolicyAccessory:{
        required:'请上传附件'
      }
  }
  formValidate(jg_pledge_dom,pledge_rules,pledge_msg);

  function setUIOn(selector){
    $(selector).show();
    $(selector).find('[data-operater-bottom]').show();
  }

  function setUIOff(selector){
    $(selector).show();
    $(selector).find('select,input,textarea').attr('disabled','');
    $(selector).find('[data-operater-bottom]').hide();
    $('[name="baseWineTypes"]').hide();
  }

  if(!is_jg_operator){//如果不是监管方则页面数据不可写
    setUIOff(jg_pledge_dom);
  }

  var all_info_array = [];
  function rendWinTypes(selector,data,echo){
    var h = '';
       selector.empty();
       all_info_array = [];
       $.each(data,function(i,item){
          all_info_array.push($(item).val());
          echo?h+='<span class="sm-win-bage">'+item+'</span>':h+='<span class="sm-win-bage">'+$(item).val()+'</span>';
       });
       selector.append(h);
  }

  //选择基酒类型
    var base_wine_container_dom = $('#baseWineTypesContainer');//已选酒
    var base_wine_info_dom = $('#allBaseWinTypes');//所有酒
    var select_base_win_dom = $('#select-base-wine');//点击显示所有酒
    var select_win_btn_dom = $('#confirm-base-win');//选择后确定按钮
    select_base_win_dom.on('click',function(){
        base_wine_info_dom.show();
    })

    select_win_btn_dom.on('click',function(){
       var selected_dom = base_wine_info_dom.find('input:checked');
       rendWinTypes(base_wine_container_dom,selected_dom);
       base_wine_info_dom.hide();
    });

  var jianguan_update = false;
  //监管回显数据
  HttpUtils.get_regulator_echo_data({businessKey:window.sessionStorage["businessKey"]},function(data){
        console.debug('质押监管数据回显');
        console.debug(data);
        var cur_data = data.data;
        if(!cur_data){
          return 
        }
        $('[name="jgName"],[name="regulatorName"]').val(cur_data.regulatorName);
        
        
        var pledgesList = cur_data.PledgeList;
        if(pledgesList && pledgesList.length>0 && is_jg_operator){

            $.each(pledgesList,function(i,item){
                addPledge('1',item);
            });
            $('[name="pledgeTotalPrice"]').val(cur_data.pledgeInfo.pledgeTotalPrice);

            $('[data-role="winery-name"]').text('('+cur_data.wineryName+')');

            //酒厂办理人员信息回显
            showManageInfo(winery_dom,cur_data);
            $('[data-management-time]').text('办理时间：'+cur_data.pledgeInfo.updateAt);
            winery_dom.show();
        }
        var jg_pledge_aupervisios = cur_data.pledgeSupervision;
        var jg_update = cur_data.pledgeSupervision.updateAt;
        var jg_base_win = cur_data.pledgeSupervision.baseWineTypes;
        if(!jg_pledge_aupervisios){
          return 
        }
        
        $('[name="pledgeeName"]').val(jg_pledge_aupervisios.pledgeeName)//质权人
        $('[name="pledgorName"]').val(jg_pledge_aupervisios.pledgorName)//出质人
        
        var jg_claim = cur_data.needClaim;
        jg_claim?setUIOn(jg_pledge_dom):setUIOff(jg_pledge_dom);

        if(!jg_base_win){
            return 
        }
        
        jg_base_win?jianguan_update=true:jianguan_update=false;

        //监管信息回显
        if(!is_winery){
            $('[data-role="jg-operator"]').text('('+cur_data.regulatorName+')');
            $(jg_pledge_dom).find('[data-role-name]').text(cur_data.regulatorRoleName);
            $(jg_pledge_dom).find('[data-true-name]').text(cur_data.regulatorTrueName);
        }else{
          $(jg_pledge_dom).find('[data-role-name]').css('display','none');
        }
        $(jg_pledge_dom).find('[data-management-time]').text('办理时间：'+jg_update);
        $(jg_pledge_dom).find('[data-management-info]').show();
        
        $('[name="baseWineNum"]').val(jg_pledge_aupervisios.baseWineNum);

        //回显基酒类型数据
        if(jg_pledge_aupervisios.baseWineTypes){
          var win_types = (jg_pledge_aupervisios.baseWineTypes).split(',');
          rendWinTypes(base_wine_container_dom,win_types,true);
        }

        $('[name="businessKey"]').val(jg_pledge_aupervisios.businessKey);
        $('[name="evaluationPrice"]').val(renderNum(jg_pledge_aupervisios.evaluationPrice));

        $('[name="pledgeeName"]').val(jg_pledge_aupervisios.pledgeeName)
        $('[name="pledgorName"]').val(jg_pledge_aupervisios.pledgorName)
        $('[name="productionTime"]').val(jg_pledge_aupervisios.productionTime)
        $('[name="propertyInsurer"]').val(jg_pledge_aupervisios.propertyInsurer)

        $('[name="propertyPolicyHolder"]').val(jg_pledge_aupervisios.propertyPolicyHolder)
        $('[name="propertyPolicyName"]').val(jg_pledge_aupervisios.propertyPolicyName)
        $('[name="propertyPolicyPeriod"]').val(jg_pledge_aupervisios.propertyPolicyPeriod)
        $('[name="propertyPolicyPremium"]').val(renderNum(jg_pledge_aupervisios.propertyPolicyPremium));
        $('[name="qualityDate"]').val(jg_pledge_aupervisios.qualityDate)
        $('[name="regulatorInsurer"]').val(jg_pledge_aupervisios.regulatorInsurer)
        $('[name="regulatorName"]').val(jg_pledge_aupervisios.regulatorName);

        $('[name="regulatorPolicyHolder"]').val(cur_data.pledgeSupervision.regulatorPolicyHolder)
        $('[name="regulatorPolicyName"]').val(cur_data.pledgeSupervision.regulatorPolicyName)
        $('[name="regulatorPolicyPeriod"]').val(cur_data.pledgeSupervision.regulatorPolicyPeriod)
        $('[name="regulatorPolicyPremium"]').val(renderNum(cur_data.pledgeSupervision.regulatorPolicyPremium));

        if(jg_pledge_aupervisios.pledgeBillAccessory){
            var pledge_b_text = jg_pledge_aupervisios.pledgeBillAccessory.name;
            var pledge_b_id = jg_pledge_aupervisios.pledgeBillAccessory.id;
            var pledge_b_type = jg_pledge_aupervisios.pledgeBillAccessory.type;
            setAccessory('[name="pledgeBillAccessory"]',pledge_b_text,pledge_b_id,pledge_b_type,jg_claim);
        }

        if(jg_pledge_aupervisios.propertyPolicyAccessory){
            var pledge_p_text = jg_pledge_aupervisios.propertyPolicyAccessory.name;
            var pledge_p_id = jg_pledge_aupervisios.propertyPolicyAccessory.id;
            var pledge_p_type = jg_pledge_aupervisios.propertyPolicyAccessory.type;
            setAccessory('[name="propertyPolicyAccessory"]',pledge_p_text,pledge_p_id,pledge_p_type,jg_claim);
        }

        if(jg_pledge_aupervisios.regulatorPolicyAccessory){
            var pledge_r_text = jg_pledge_aupervisios.regulatorPolicyAccessory.name;
            var pledge_r_id = jg_pledge_aupervisios.regulatorPolicyAccessory.id;
            var pledge_r_type= jg_pledge_aupervisios.regulatorPolicyAccessory.type;
            setAccessory('[name="regulatorPolicyAccessory"]',pledge_r_text,pledge_r_id,pledge_r_type,jg_claim);
        }


        if(!is_jg_operator){//如果不是监管方则不显示真安信审员的审核结果
          return
        }
        //真安信审员的审核结果
        var credit_audit_info = cur_data.auditOpinion;
        if(credit_audit_info && credit_audit_info.length>0){
            var credit_audit_Msg = '';
            var credit_audit_Result = '';
            var credit_audit_Result_dom = $('[name="zhen-an-credit-result"]');
            var credit_audit_time = '';
            var credit_role_name = '';
            var credit_user_name = '';
           $.each(credit_audit_info,function(i,item){
              if(item.variableName=='zhenAn_credit_pledge_aduit_result_Msg'){
                  credit_audit_Msg = item.variableValue;
              }else if(item.variableName=='zhenAn_credit_pledge_aduit_result'){
                  credit_audit_Result = item.variableValue;
                  credit_role_name = item.roleName;
                  credit_user_name = item.trueName;
                  credit_audit_time = item.updateAt;
              }
           })
           if(!credit_audit_Result){
              return 
           }
           zhen_an_credit_dom.find('[data-role-name]').text(credit_role_name);
           zhen_an_credit_dom.find('[data-true-name]').text(credit_user_name);
           zhen_an_credit_dom.find('[data-management-time]').text('办理时间：'+credit_audit_time);
           credit_audit_Result_dom.find('option[value="'+credit_audit_Result+'"]').attr('selected','selected');
           credit_audit_Result_dom.addClass(credit_audit_Result);
           credit_audit_Msg?$('[name="zhen-an-credit-msg"]').val(credit_audit_Msg):$('[name="zhen-an-credit-msg"]').val('');
           zhen_an_credit_dom.show();
        }

        
    })
  //获取选择的基酒类型
  function getBaseWinType(){
    var base_win_base = $('#baseWineTypesContainer .sm-win-bage');
    var list = [];
    $.each(base_win_base,function(i,item){
        list.push($(item).text());  
    })
    return list.join(',');
  }

  //编辑质押监管信息
  edit_pledge_info_btn_dom.on('click',function(){
        var _this = this;
        if(!testBaseWinInfo()||!jg_pledge_dom.valid()||(typeof $(_this).attr('disabled')!=='undefined')){
          return 
        }
        $(_this).attr('disabled','');
        var alertInfo = $(this).attr('data-info');
        var param = {}
        param.inputData = {
          taskId:window.sessionStorage["taskId"],
          baseWineNum:$('[name="baseWineNum"]').val(),
          //baseWineTypes:$('[name="baseWineTypes"]').val(),
          baseWineTypes:getBaseWinType(),
          evaluationPrice:removeSopt($('[name="evaluationPrice"]').val()),
          pledgeeName:$('[name="pledgeeName"]').val(),
          pledgorName:$('[name="pledgorName"]').val(),
          productionTime:$('[name="productionTime"]').val(),
          propertyInsurer:$('[name="propertyInsurer"]').val(),
          propertyPolicyHolder:$('[name="propertyPolicyHolder"]').val(),
          propertyPolicyName:$('[name="propertyPolicyName"]').val(),
          propertyPolicyPeriod:$('[name="propertyPolicyPeriod"]').val(),
          propertyPolicyPremium:removeSopt($('[name="propertyPolicyPremium"]').val()),
          qualityDate:$('[name="qualityDate"]').val(),
          regulatorInsurer:$('[name="regulatorInsurer"]').val(),
          regulatorName:$('[name="regulatorName"]').val(),
          regulatorPolicyHolder:$('[name="regulatorPolicyHolder"]').val(),
          regulatorPolicyName:$('[name="regulatorPolicyName"]').val(),
          regulatorPolicyPeriod:$('[name="regulatorPolicyPeriod"]').val(),
          regulatorPolicyPremium:removeSopt($('[name="regulatorPolicyPremium"]').val())
        };       
        console.debug('监管方是否修改数据')
        console.debug(jianguan_update);
        if(jianguan_update){//监管方修改监管数据
          console.debug('//监管方修改监管数据');
            if(window.sessionStorage["regulator_aduit"] && window.sessionStorage["regulator_aduit"]!==''){
                var fileArray = JSON.parse(window.sessionStorage["regulator_aduit"]);
                param.files = fileArray;
                param.fileNames = fileArray;
            }
            param["inputData"]["status"]=1;

        }else{//监管方新增监管数据
            console.debug('//监管方新增监管数据');
            param["inputData"]["status"]=0;
            param.files = ["pledgeBillAccessory","propertyPolicyAccessory","regulatorPolicyAccessory"];
            param.fileNames = ["pledgeBillAccessory","propertyPolicyAccessory","regulatorPolicyAccessory"];
        }

        console.debug('质押监管传输给后端的数据');
        console.debug(param);

        HttpUtils.post_pledge_supervision_data(param,function (data,status) {
          console.debug('质押监管数据');
          console.debug(data)
          if(data.statusCode=='200'){
              auditSuccess(alertInfo);
              $(_this).removeAttr('disabled');
          }
        })
    })

function renderPledgeBaseWin(list){
  if (!list || (list.split(',')).length<1){
    return ''
  }
  var h = '';
  var cur_list = list.split(',');
  $.each(cur_list,function(i,item){
      h+='<span class="sm-win-bage">'+item+'</span>';
  })
  return h
}

function testBaseWinInfo(){
  var base_win_list = $('#baseWineTypesContainer').find('.sm-win-bage');
  if(base_win_list.length>0){
    return true
  }
  if($('#baseWineTypesContainer').find('.error').length<1){
    $('#baseWineTypesContainer').append('<label class="error" style="position:relative">这是必填项</label>')
  }
  
  return false
}

/**
*@Author Mona
*@date 2016-11-25
*@description 添加质押物
*@param {status} string '0'表示添加新的质押物   '1'表示回显质押物信息
*/
function addPledge(status,data){
    var pledgeLen = $('[data-id="pledge-box"] [data-pledge-pane]').length;
    var nowTime = new Date().getTime();
    var pledgeBox = $("<div>");
    pledgeBox.attr('data-pledge-pane','');

    //质押基酒类型
    var formGroup1 = $("<div>");
    formGroup1.attr('class','form-group clearfix');
    var formGroup1Label = $("<label>");
    formGroup1Label.attr('class','col-md-2 control-label text-right text-static');
    formGroup1Label.html('质押基酒类型：');
    var formGroup1Ct = $("<div>");
    formGroup1Ct.attr('class','col-md-6');
    var formGroup1Div = $('<div>');
    status=='1'?formGroup1Div.html(renderPledgeBaseWin(data.baseWineType)):formGroup1Div.html('');
    
    var deleteIcon = $('<span>');
    deleteIcon.attr({'class':'icon-trash fa fa-trash red','id':'deleteIcon'+pledgeLen+'-'+nowTime});
    status=='1'?deleteIcon.hide():deleteIcon.show();

    formGroup1Ct.append(formGroup1Div);

    formGroup1.append(formGroup1Label);
    formGroup1.append(formGroup1Ct);
    formGroup1.append(deleteIcon);

    //生产日期
    var formGroup2 = $("<div>");
    formGroup2.attr('class','form-group clearfix');
    var formGroup2Label = $('<label>');
    formGroup2Label.attr('class','col-md-2 control-label text-right text-static');
    formGroup2Label.html('生产日期：');
    var formGroup2Ct = $("<div>");
    formGroup2Ct.attr('class','col-md-6');
    var formGroup2CtInput = $('<input>');
    formGroup2CtInput.attr({'type':'text','class':'form-control','data-id':'productionTime','id':'productionTime'+pledgeLen+nowTime});
    status=='1'?formGroup2CtInput.attr({'value':data.productionTime,'disabled':''}):formGroup2CtInput.attr('value','');
    
    formGroup2Ct.append(formGroup2CtInput);
    formGroup2.append(formGroup2Label);
    formGroup2.append(formGroup2Ct);

    //质押基酒数量
    var formGroup3 = $("<div>");
    formGroup3.attr('class','form-group clearfix');
    var formGroup3Label = $("<label>");
    formGroup3Label.attr('class','col-md-2 control-label text-right text-static');
    formGroup3Label.html('质押基酒数量：');
    var formGroup3Ct = $("<div>");
    formGroup3Ct.attr('class','col-md-6');
    var formGroup3CtInput = $("<input>");
    formGroup3CtInput.attr({'type':'text','class':'form-control','data-id':'baseWineNum'});
    status=='1'?formGroup3CtInput.attr({'value':data.baseWineNum,'disabled':''}):formGroup3CtInput.attr('value','');
       
    var formGroup3CtInputPre = $('<div>');
    formGroup3CtInputPre.attr('class','col-xs-1 text-static');
    formGroup3CtInputPre.text('吨');


    formGroup3Ct.append(formGroup3CtInput);
    formGroup3.append(formGroup3Label);
    formGroup3.append(formGroup3Ct);
    formGroup3.append(formGroup3CtInputPre);


    //质押基酒价格
    var formGroup4 = $("<div>");
    formGroup4.attr('class','form-group clearfix');
    var formGroup4Label = $("<label>");
    formGroup4Label.attr('class','col-md-2 control-label text-right text-static');
    formGroup4Label.html('质押基酒价值：');
    var formGroup4Ct = $("<div>");
    formGroup4Ct.attr('class','col-md-6');
    var formGroup4CtInput = $("<input>");
    formGroup4CtInput.attr({'type':'text','class':'form-control','data-id':'baseWinePrice','value':'20'});
    status=='1'?formGroup4CtInput.attr({'value':renderNum(data.baseWinePrice),'disabled':''}):formGroup4CtInput.attr('value','');       
    var formGroup4CtInputPre = $('<div>');
    formGroup4CtInputPre.attr('class','col-xs-1 text-static');
    formGroup4CtInputPre.text('元');


    formGroup4Ct.append(formGroup4CtInput);
    formGroup4.append(formGroup4Label);
    formGroup4.append(formGroup4Ct);
    formGroup4.append(formGroup4CtInputPre);

    //仓库地址
    var formGroup5 = $("<div>");
    formGroup5.attr('class','form-group clearfix');
    var formGroup5Label = $("<label>");
    formGroup5Label.attr('class','col-md-2 control-label text-right text-static');
    formGroup5Label.html('仓库地址：');

    var formGroup5Ct1 = $("<div>");
    formGroup5Ct1.attr('class','col-md-2');
    var formGroup5Ct1select1 = $("<select>");//省
    formGroup5Ct1select1.attr({'name':'','class':'form-control','data-id':'warehouseProvince','id':'companyProvince'+pledgeLen+'-'+nowTime});
    
    status=='1'?formGroup5Ct1select1.attr({'disabled':''}):formGroup5Ct1select1.attr('value','-1');
    formGroup5Ct1.append(formGroup5Ct1select1);

    var formGroup5Ct2 = $("<div>");
    formGroup5Ct2.attr('class','col-md-2');
    var formGroup5Ct2select = $("<select>");//市
    formGroup5Ct2select.attr({'name':'','class':'form-control','data-id':'warehouseCity','id':'companyCity'+pledgeLen+'-'+nowTime});
    
    status=='1'?formGroup5Ct2select.attr({'disabled':''}):formGroup5Ct2select.attr('value','-1')
    formGroup5Ct2.append(formGroup5Ct2select);

    var formGroup5Ct3= $("<div>");
    formGroup5Ct3.attr('class','col-md-2');
    var formGroup5Ct3input = $("<input>");//具体地址
    formGroup5Ct3input.attr({'name':'','class':'form-control','data-id':'warehouseAddress'});
    status=='1'?formGroup5Ct3input.attr({'value':data.warehouseAddress,'disabled':''}):formGroup5Ct3input.attr('value','');
    formGroup5Ct3.append(formGroup5Ct3input);

    formGroup5.append(formGroup5Label)
    formGroup5.append(formGroup5Ct1);
    formGroup5.append(formGroup5Ct2);
    formGroup5.append(formGroup5Ct3);

   //放入所有的group
    pledgeBox.append(formGroup1);
    pledgeBox.append(formGroup2);
    pledgeBox.append(formGroup3);
    pledgeBox.append(formGroup4);
    pledgeBox.append(formGroup5);

    $('[data-id="pledge-box"]').append(pledgeBox);

    //省市dom、生产日期dom
    var province_dom = $("#companyProvince"+pledgeLen+'-'+nowTime);
    var city_dom = $("#companyCity"+pledgeLen+'-'+nowTime);
    var production_time_dom = $('#productionTime'+pledgeLen+nowTime);
    
    //实例化城市联动组件
    status=='1'?$.initProv(province_dom,city_dom,data.warehouseProvince,data.warehouseCity):$.initProv(province_dom,city_dom,'请选择','请选择');

    //实例化删除质押物组件
    $('#deleteIcon'+pledgeLen+'-'+nowTime).on('click',function(){
        $(this).parents('[data-pledge-pane]').detach();
        setTotalPrice()
    });

}
  

})
  
 