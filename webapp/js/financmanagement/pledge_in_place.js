/**
*@Author Mona
*@date 2016-11-13
*@description 质押物就位
*/

$(function(){ 
    //省市联动
    $.initProv("#cP", "#cC", "请选择", "请先选择");

    var winery_dom = $('[data-pane-id="winery-operater"]');
    var production_time_dom = $('#productionTime');
    $(production_time_dom).datetimepicker({format: 'yyyy-mm-dd'});
    
    //前端验证
    var winery_form = $('#winery-pledge');
    var rules = {
        productionTime:{
            required:true
        },
        baseWineNum:{
            required:true
        },
        baseWinePrice:{
            required:true,
            number:true
        },
        warehouseAddress:{
            required:true
        }
    };
    $('#winery-pledge').validate({rules});
    
    function renderError(){
        $(winery_form).find('input').on('focus',function(){
            $(this).next().remove();
        })
        $(winery_form).find('input').on('blur',function(){
            if($.trim($(this).val())==''){
                if($(this).parent().find('.error').length>0){
                    $(this).parent().find('.error').remove();
                }
               $(this).parent().append('<label class="error">这是必填字段</label>'); 
            }
        });
    }
    renderError();
    function validateTool(form){
        var input_list = $(form).find('input');
        var count = 0;
        var pledges = $('[data-pledge-pane]');
        var count_type_non = 0;
        $.each(pledges,function(i,item){
            var types = getBaseWinInfo(item);
            if(!types.valid){
                if($(item).find('[data-role="base-win-container"]').find('.error').length>0){
                    $(item).find('[data-role="base-win-container"]').find('.error').remove();
                }
                $(item).find('[data-role="base-win-container"]').append('<label class="error" style="position:relative">请选择基酒类型</label>');
                count_type_non = 1;
            }
        })
        

        //遍历input
        $.each(input_list,function(i,item){
            if($.trim($(item).val())==''){
                count++
                if($(item).attr('data-id')=='pledgeTotalPrice'){
                    return true
                }
                if($(item).parent().find('.error').length>0){
                    $(item).parent().find('.error').remove();
                }
                $(item).parent().append('<label class="error">这是必填字段</label>');
            }
        })


        if(count==0 && count_type_non == 0){
            return true
        }
        return false
    }

    function setTotalPrice(){
        getTotalPrice()?$('[data-id="pledgeTotalPrice"]').val(getTotalPrice()):$('[data-id="pledgeTotalPrice"]').val(0);
    } 

    function changeHandle(){
        $('[data-id="baseWineNum"],[data-id="baseWinePrice"]').bind('input propertychange',function(){
            setTotalPrice();
        })
    }

    function getTotalPrice(){
        var pledgeInfo = $('[data-id="pledge-box"] [data-pledge-pane]');
        var pledgeTotalPrice = 0;
        $.each(pledgeInfo,function(i,item){
            pledgeTotalPrice += parseFloat(removeSopt($(item).find('[data-id="baseWinePrice"]').val()));
        })

        return renderNum(pledgeTotalPrice)
    }   

    //点击选择基酒类型
    function selectBaseWin(select,confirm_btn){
        var win_type_box_string = '[data-role="base-win-type-box"]';
        var base_win_container_string = '[data-role="base-win-container"]';
        var select_dom = $(select);
        var all_win_info_string = '[data-role="all-base-win-info"]';
        var confirm_btn_dom = $(confirm_btn);
        //点击选择基酒类型
        select_dom.on('click',function(){
            $(this).parents(win_type_box_string).find(all_win_info_string).toggle();
        });

        //点击选择确认按钮
        confirm_btn_dom.on('click',function(){
            var selected_win_dom = $(this).parents(all_win_info_string).find('input[type="checkbox"]:checked');
            var h = '';
            $.each(selected_win_dom,function(i,item){
                h+='<span class="small-bage">'+$(item).val()+'</span>';
            })
            $(this).parents(win_type_box_string).find(base_win_container_string).html(h);
            $(this).parents(win_type_box_string).find(all_win_info_string).hide();
        });
    }

    selectBaseWin('[data-role="select-base-win"]','[data-role="confirm-base-win"]');

    function baseWinType(){
        var h = '';
        h+='<span><label><input type="checkbox" value="酱香型">酱香型</label></span>'
        h+='<span><label><input type="checkbox" value="浓香型">浓香型</label></span>';
        h+='<span><label><input type="checkbox" value="清香型">清香型</label></span>';
        h+='<span><label><input type="checkbox" value="兼香型">兼香型</label></span>';
        h+='<span><label><input type="checkbox" value="米香型">米香型</label></span>';
        h+='<span><label><input type="checkbox" value="凤香型">凤香型</label></span>';
        h+='<span><label><input type="checkbox" value="芝麻香型">芝麻香型</label></span>';
        h+='<span><label><input type="checkbox" value="豉香型">豉香型</label></span>';
        h+='<span><label><input type="checkbox" value="特香型">特香型</label></span>';
        h+='<span><label><input type="checkbox" value="老白干香型">老白干香型</label></span>';
        h+='<span><label><input type="checkbox" value="馥郁香型">馥郁香型</label></span>';
        h+='<span><label><input type="checkbox" value="药香型">药香型</label></span>';
        h+='<span><label><input type="checkbox" value="其他">其他</label></span>';
        h+='<span class="btn btn-primary" data-role="confirm-base-win">确定</span>';
        return h;
    }

    function renderWinType(data){
        if(!(data && data.length>0)){
            return '';
        }
        var cur_data = data.split(',');
        var h = '';
        $.each(cur_data,function(i,item){
            h+='<span class="small-bage">'+item+'</span>';
        })
        return h
    }
    
    /**
    *@Author Mona
    *@date 2016-11-25
    *@description 添加质押物
    *@param {status} string '0'表示添加新的质押物   '1'表示回显质押物信息
    */
    function addPledge(status,data,update){
        var pledgeLen = $('[data-id="pledge-box"] [data-pledge-pane]').length;
        var nowTime = new Date().getTime();
        var pledgeBox = $("<div>");
        pledgeBox.attr('data-pledge-pane','');

        //质押基酒类型
        var formGroup1 = $("<div>");
        formGroup1.attr('class','form-group clearfix');
        var formGroup1Label = $("<label>");
        formGroup1Label.attr('class','col-md-2 control-label');
        formGroup1Label.html('<b class="red">*</b>质押基酒类型：');
        var formGroup1Ct = $("<div>");
        formGroup1Ct.attr('class','col-md-6');
        

        var win_type_box_dom = $('<div>');
        win_type_box_dom.attr({'class':'base-win-type-box','data-role':'base-win-type-box'});
        var win_type_container_dom = $('<div>');
        win_type_container_dom.attr({'class':'base-win-container','data-role':'base-win-container'});
        status=='1'?win_type_container_dom.html(renderWinType(data.baseWineType)):win_type_container_dom.html('');
        var select_p_dom = $('<p>');
        var select_span_dom = $('<span>');
        status=='1'?select_span_dom.attr({'class':'blue select-base-win pointer','data-role':'select-base-win','style':'display:none'}):select_span_dom.attr({'class':'blue select-base-win pointer','data-role':'select-base-win','id':'select-base-win-'+nowTime});
        update?win_type_container_dom.html(renderWinType(data.baseWineType)):'';
        update?select_span_dom.attr({'style':'display:block','id':'select-base-win-'+nowTime}):'';

        select_span_dom.text('选择基酒类型');
        select_p_dom.append(select_span_dom);
        var all_win_base_type_dom = $('<div>');
        all_win_base_type_dom.attr({'class':'all-base-win-info hide-status','data-role':'all-base-win-info'});
        all_win_base_type_dom.html(baseWinType);

        win_type_box_dom.append(win_type_container_dom);//加入基酒容器
        win_type_box_dom.append(select_p_dom)//加入选择基酒p标签
        win_type_box_dom.append(all_win_base_type_dom)//加入所有基酒       

        //删除按钮
        var deleteIcon = $('<span>');
        deleteIcon.attr({'class':'icon-trash fa fa-trash red','id':'deleteIcon'+pledgeLen+'-'+nowTime});
        status=='1'?deleteIcon.hide():deleteIcon.show();
        update?deleteIcon.show():'';
        formGroup1Ct.append(win_type_box_dom);

        formGroup1.append(formGroup1Label);
        formGroup1.append(formGroup1Ct);
        formGroup1.append(deleteIcon);

        //生产日期
        var formGroup2 = $("<div>");
        formGroup2.attr('class','form-group clearfix');
        var formGroup2Label = $('<label>');
        formGroup2Label.attr('class','col-md-2 control-label');
        formGroup2Label.html('<b class="red">*</b>生产日期：');
        var formGroup2Ct = $("<div>");
        formGroup2Ct.attr('class','col-md-6');
        var formGroup2CtInput = $('<input>');
        formGroup2CtInput.attr({'type':'text','class':'form-control required','data-id':'productionTime','id':'productionTime'+pledgeLen+nowTime,'name':'productionTime','required':'true'});
        status=='1'?formGroup2CtInput.attr({'value':data.productionTime,'disabled':''}):formGroup2CtInput.attr('value','');
        update?formGroup2CtInput.attr({'value':data.productionTime}):'';
        update?formGroup2CtInput.removeAttr('disabled'):'';
        formGroup2Ct.append(formGroup2CtInput);
        formGroup2.append(formGroup2Label);
        formGroup2.append(formGroup2Ct);

        //质押基酒数量
        var formGroup3 = $("<div>");
        formGroup3.attr('class','form-group clearfix');
        var formGroup3Label = $("<label>");
        formGroup3Label.attr('class','col-md-2 control-label');
        formGroup3Label.html('<b class="red">*</b>质押基酒数量：');
        var formGroup3Ct = $("<div>");
        formGroup3Ct.attr('class','col-md-6 col-xs-11');
        var formGroup3CtInput = $("<input>");
        formGroup3CtInput.attr({'type':'text','data-role':'whale-number','class':'form-control required','data-id':'baseWineNum','name':'baseWineNum','required':'true',id:'baseWineNum-'+nowTime});
        status=='1'?formGroup3CtInput.attr({'value':data.baseWineNum,'disabled':''}):formGroup3CtInput.attr('value','');
        update?formGroup3CtInput.attr({'value':data.baseWineNum}):'';
        update?formGroup3CtInput.removeAttr('disabled'):'';
        var formGroup3CtInputPre = $('<div>');
        formGroup3CtInputPre.attr('class','col-md-1 col-xs-1 text-static');
        formGroup3CtInputPre.text('吨');


        formGroup3Ct.append(formGroup3CtInput);
        formGroup3.append(formGroup3Label);
        formGroup3.append(formGroup3Ct);
        formGroup3.append(formGroup3CtInputPre);


        //质押基酒价格
        var formGroup4 = $("<div>");
        formGroup4.attr('class','form-group clearfix');
        var formGroup4Label = $("<label>");
        formGroup4Label.attr('class','col-md-2 control-label');
        formGroup4Label.html('<b class="red">*</b>质押基酒价值：');
        var formGroup4Ct = $("<div>");
        formGroup4Ct.attr('class','col-md-6 col-xs-11');
        var formGroup4CtInput = $("<input>");
        formGroup4CtInput.attr({'type':'text','data-role':'whale-money','class':'form-control required','data-id':'baseWinePrice','value':'20','name':'baseWinePrice','required':'true','id':'baseWinePrice-'+nowTime});
        status=='1'?formGroup4CtInput.attr({'value':renderNum(data.baseWinePrice),'disabled':''}):formGroup4CtInput.attr('value','');  
        update?formGroup4CtInput.attr({'value':renderNum(data.baseWinePrice)}):''; 
        update?formGroup4CtInput.removeAttr('disabled'):'';     
        var formGroup4CtInputPre = $('<div>');
        formGroup4CtInputPre.attr('class','col-md-1 col-xs-1 text-static');
        formGroup4CtInputPre.text('元');


        formGroup4Ct.append(formGroup4CtInput);
        formGroup4.append(formGroup4Label);
        formGroup4.append(formGroup4Ct);
        formGroup4.append(formGroup4CtInputPre);

        //仓库地址
        var formGroup5 = $("<div>");
        formGroup5.attr('class','form-group clearfix');
        var formGroup5Label = $("<label>");
        formGroup5Label.attr('class','col-md-2 control-label');
        formGroup5Label.html('<b class="red">*</b>仓库地址：');

        var formGroup5Ct1 = $("<div>");
        formGroup5Ct1.attr('class','col-md-2');
        var formGroup5Ct1select1 = $("<select>");//省
        formGroup5Ct1select1.attr({'name':'','class':'form-control','data-id':'warehouseProvince','id':'companyProvince'+pledgeLen+'-'+nowTime});
        status=='1'?formGroup5Ct1select1.attr({'disabled':''}):formGroup5Ct1select1.attr('value','-1');
        update?formGroup5Ct1select1.removeAttr('disabled'):'';
        formGroup5Ct1.append(formGroup5Ct1select1);

        var formGroup5Ct2 = $("<div>");
        formGroup5Ct2.attr('class','col-md-2');
        var formGroup5Ct2select = $("<select>");//市
        formGroup5Ct2select.attr({'name':'','class':'form-control','data-id':'warehouseCity','id':'companyCity'+pledgeLen+'-'+nowTime});
        status=='1'?formGroup5Ct2select.attr({'disabled':''}):formGroup5Ct2select.attr('value','-1')
        update?formGroup5Ct2select.removeAttr('disabled'):'';
        formGroup5Ct2.append(formGroup5Ct2select);

        var formGroup5Ct3= $("<div>");
        formGroup5Ct3.attr('class','col-md-2');
        var formGroup5Ct3input = $("<input>");//具体地址
        formGroup5Ct3input.attr({'name':'','class':'form-control required','data-id':'warehouseAddress','name':'warehouseAddress','required':'true'});
        status=='1'?formGroup5Ct3input.attr({'value':data.warehouseAddress,'disabled':''}):formGroup5Ct3input.attr('value','');
        update?formGroup5Ct3input.attr({'value':data.warehouseAddress}):'';
        update?formGroup5Ct3input.removeAttr('disabled'):'';
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

        //数字组件
        $('#baseWineNum-'+nowTime).whaleNumber({type:'number'})
        $('#baseWinePrice-'+nowTime).whaleNumber({type:'money'})

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

        //实例化日期组件
        $(production_time_dom).datetimepicker({format: 'yyyy/mm/dd',language:'zh-CN',startView:'month',todayHighlight:true,minView:'month',autoclose:true});

        //注册选择基酒事件 
        selectBaseWin('[id="select-base-win-'+nowTime+'"]','[data-role="confirm-base-win"]');
        var winery_form = $('#winery-pledge');
        
        //表单动态验证
        renderError()
    }

    changeHandle();

    //提交质押物时获取选取的基酒类型
    function getBaseWinInfo(selector){
        var base_win_type = [];
        var base_type_info = {};
        var type_list = $(selector).find('[data-role="base-win-container"] .small-bage');
        if(type_list.length<1){
            base_type_info["valid"] = false;
            return false
        }
        $.each(type_list,function(i,item){
            base_win_type.push($(item).text());
        });
        base_type_info["nameString"] = base_win_type.join(',');
        base_type_info["valid"] = true
        return base_type_info
    }

    //获取质押物信息
    function getPledgeData(){
        var pledgeInfo = $('[data-id="pledge-box"] [data-pledge-pane]');
        var pledges = [];
        $.each(pledgeInfo,function(i,item){
            var pledgesRecodes = {};
            var types = getBaseWinInfo(item);
            pledgesRecodes["baseWineNum"] = $(item).find('[data-id="baseWineNum"]').val();
            pledgesRecodes["baseWineType"] = types.nameString;
            pledgesRecodes["baseWinePrice"] = removeSopt($(item).find('[data-id="baseWinePrice"]').val());
            pledgesRecodes["productionTime"] = $(item).find('[data-id="productionTime"]').val();
            pledgesRecodes["warehouseAddress"] = $(item).find('[data-id="warehouseAddress"]').val();
            pledgesRecodes["warehouseCity"] = $(item).find('[data-id="warehouseCity"]').find("option:selected").text();
            pledgesRecodes["warehouseProvince"] = $(item).find('[data-id="warehouseProvince"]').find("option:selected").text();
            pledges.push(pledgesRecodes)
        })

        return pledges
    }


    //添加质押物
    $('[data-id="add-pledge"]').on('click',function(){
        addPledge();
        changeHandle();
        setTotalPrice();
        
    });

    //如果机构不是酒厂
    function review(selector){
        $(selector).find('select,textarea,input').attr('disabled','');
        $(selector).find('[data-role="select-base-win"]').hide();
        addSelectPatch();
    }

    if(!is_winery){
        review(winery_dom)
    }

    //提交质押物信息
    $('[data-id="pledge-confirm"]').on('click',function(){
        var _this =this;        
        if(!validateTool(winery_form)||!winery_form.valid()||(typeof $(_this).attr('disabled')!=='undefined')){
            return 
        }
        $(_this).attr('disabled','');
        var alertInfo = $(_this).attr('data-info');
        var param = {};
        param["taskId"] = window.sessionStorage["taskId"];
        param["pledgeTotalPrice"] = removeSopt(getTotalPrice());
        param["pledges"] = getPledgeData();
        param = JSON.stringify(param);

        console.debug('质押物信息');
        console.debug(param)
        HttpUtils.post_pledge_data(param,function(data){
            if(data.statusCode=='200'){
                auditSuccess(alertInfo);
                $(_this).removeAttr('disabled');
            }
        })
    })

    //质押就位回显数据
    HttpUtils.get_pledge_info({businessKey:window.sessionStorage["businessKey"]},function(data){
        console.debug('质押就位回显数据信息');
        console.debug(data);
        var cur_data = data.data;
        var winery_claim = cur_data.needClaim;
        $('[data-id="jg-name"]').val(cur_data.regulatorName); 
        winery_claim?$('[data-operator]').show():'';
        cur_data.pledgeTotalPrice?$('[data-id="pledgeTotalPrice"]').val(renderNum(cur_data.pledgeTotalPrice)):$('[data-id="pledgeTotalPrice"]').val('0');
        if(!cur_data.pledges || cur_data.pledges.length<1){
            return 
        }
        $('[name="wineryName"]').text('('+cur_data.wineryName+')');
        var winery_update = cur_data.UpdateAt;
        var claim_status = winery_claim && winery_update;
        showManageInfo(winery_dom,cur_data)
        if($('[data-pledge-pane]').length>0){ 
           $('[data-pledge-pane]').detach();
           winery_claim||claim_status?$('[data-operator]').show():$('[data-operator]').detach();
        }
        
        $.each(cur_data.pledges,function(i,item){
            addPledge('1',item,claim_status);
        });

        claim_status?(function(){
            var pledge_dom = $('[data-id="pledge-box"]').find('[data-pledge-pane]');
            $.each(pledge_dom,function(i,item){
                if(i==0){
                    $(item).find('.icon-trash').detach();
                    return false
                }
                
            })
        })():'';

        addSelectPatch();


    })


}) 