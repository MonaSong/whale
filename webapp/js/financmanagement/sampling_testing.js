/**
*@Author Mona
*@date 2016-10-12
*@description 取样检测
*/

$(function(){

    var manager_dom = $('[data-pane-id="sampling-testing-manager"]');
    var credit_dom = $('[data-pane-id="sampling-testing-credit"]');
    var credit_cancel_dom = $('[data-pane-id="sampling-testing-cancel-credit"]');

    var managementStatus = '';
    window.sessionStorage["managementStatus"]!==undefined?managementStatus=window.sessionStorage["managementStatus"]:'';
 
    function review(selector){
        $(selector).find('select,textarea,input').attr('disabled','');
        $(selector).find('[data-operater-bottom],[data-role="font-length"]').hide();
        $(selector).show();
        addSelectPatch();       
    }

    function claim(selector){
        $(selector).show();
        $(selector).find('[data-operater-bottom]').show();
    }

    new controlBtn(0,credit_dom,0);//中酒信贷专员填写意见组件实例化


    new controlBtn(0,manager_dom,0);//中酒省区经理填写意见组件实例化
    //省区经理的按钮
    function setManagerBtn(status){
        var btn_dom = $('[data-id="confirm-provincial-testing"]');

        if(typeof btn_dom.attr('disabled')!=='undefined' && status==0){
            btn_dom.removeAttr('disabled');
        }
    }
    setManagerBtn(0);
    
    
    if(managementStatus=='1' && !(is_zj_shen_qu||is_zj_credit)){
        review(manager_dom);
    }   

    if(is_winery){//如果是酒厂则不显示真安信审员审核省区经理的取样结果
        credit_cancel_dom.hide();
        credit_dom.hide();
    }

    //检测方列表数据
    HttpUtils.get_partner_as_type(0,function(data){
        console.debug('检测方数据')
        console.debug(data)
        if(data.data){
            var h = '<option value="">请选择检测单位</option>';
            $.each(data.data,function(i,item){
                h+='<option value="'+item.id+'">'+item.partnerName+'</option>'
            })
            $('[name="inspectCompanyId"]').html(h);
        }
    })

    //评估方列表数据 
    HttpUtils.get_partner_as_type(1,function(data){
        console.debug('评估方数据')
        console.debug(data)
        //$('#assessmentCompanyId').val('');
        if(data){
            var h = '<option value="">请选评估测单位</option>';
            $.each(data.data,function(i,item){
                h+='<option value="'+item.id+'">'+item.partnerName+'</option>'
            })
            $('[name="assessmentCompanyId"]').html(h);
        }
    });

    //验证规则
    var manager_rules = {
        sealSampleTime:{
            required:true
        },
        inspectReportNum:{
            required:true
        },
        caryProductName:{
            required:true
        },
        inspectCompanyId:{
            required:true
        },
        inspectType:{
            required:true
        },
        inspectTime:{
            required:true
        },
        inspectReportAccessory:{
            required:true
        },
        assessmentReportNum:{
            required:true
        },
        assessmentReportNum:{
            required:true
        },
        assessmentProductName:{
            required:true
        },
        assessmentCompanyId:{
            required:true
        },
        assessmentPrice:{
            required:true
        },
        assessmentTime:{
            required:true
        },
        assessmentReportAccessory:{
            required:true
        },
        protocolAccessory:{
            required:true
        },
        inspectionResult:{
            required:true
        },
        samplePicAccessory:{
            required:true
        },
        simpleVideoAccessory:{
            required:true
        }
    }

    var manager_msg = {
        inspectReportAccessory:{
            required:'请上传附件'
        },
        assessmentReportAccessory:{
            required:'请上传附件'
        },
        protocolAccessory:{
            required:'请上传附件'
        },
        samplePicAccessory:{
            required:'请上传图片'
        },
        simpleVideoAccessory:{
            required:'请上传视频'
        }
    }

    //前端验证
    formValidate($(manager_dom),manager_rules,manager_msg);

    var shengqu_update = false;
    var xindai_update = false;

    var manager_claim = false;
    var credit_claim = false;

    //取样检测数据回显
    HttpUtils.get_testing_info({businessKey:window.sessionStorage["businessKey"]},function(data){
        console.debug('取样检测回显数据')
        console.debug(data)

        if(data.statusCode=='200'){
            var cur_data = data.data;
            cur_data.audite?$('[name="winery-sample-testing-result"]').find('option[value="being-audit"]').attr('selected','selected'):'';//酒厂审核中
            cur_data.refuse?$('[name="winery-sample-testing-result"]').find('option[value="refuse"]').attr('selected','selected'):'';//酒厂融资被拒绝

            $('[name="commissionCompany"]').val(data.data.wineryName)//委托单位

            //办理时 设置ui状态
            cur_data.needClaim?claim(manager_dom):'';

            var manager_audit_info = cur_data.manager_sampling_testing_audit;
            manager_claim = manager_audit_info.needClaim;
            (manager_audit_info.manager_sampling_testing_audit_result && !manager_audit_info.needClaim)?review(manager_dom):'';
            manager_claim?claim(manager_dom):'';
            if(manager_claim){
                $('[data-role="upload-pic"],[data-role="upload-video"]').show();
            }

            //省区经理取样检测回显示数据
            var shen_qu_audit = cur_data.manager_sampling_testing_audit;
            shen_qu_audit.UpdateAt?shengqu_update=true:shengqu_update=false;
            if(!shen_qu_audit.UpdateAt){
                return 
            }
            showManageInfo(manager_dom,shen_qu_audit);//显示办理信息
            is_winery?'':setInstitution(manager_dom,shen_qu_audit.InstitutionName);

            $('[name="sealSampleTime"]').val(cur_data.samplingInspection.sealSampleTime)//取样封库时间

            //检验报告
            $('[name="inspectReportNum"]').val(cur_data.samplingInspection.inspectReportNum)//检测报告编号
            $('[name="caryProductName"]').val(cur_data.samplingInspection.caryProductName)//受检产品名称
            $('[name="inspectCompanyId"]').find('option[value="'+cur_data.samplingInspection.inspectCompanyId+'"]').attr('selected','selected')//检验单位
            $('[name="inspectType"]').val(cur_data.samplingInspection.inspectType)//检测类别
            $('[name="inspectTime"]').val(cur_data.samplingInspection.inspectTime);//检验时间
                       
            if(cur_data.samplingInspection.inspectReportAccessory){//检验报告
                var inspectionAccessoryText = cur_data.samplingInspection.inspectReportAccessory.name;
                var inspectionAccessoryId = cur_data.samplingInspection.inspectReportAccessory.id;
                var inspectionAccessoryType = cur_data.samplingInspection.inspectReportAccessory.type;
                setAccessory('[name="inspectReportAccessory"]',inspectionAccessoryText,inspectionAccessoryId,inspectionAccessoryType,manager_claim);
            }

            //评估报告
            $('[name="assessmentReportNum"]').val(cur_data.samplingInspection.assessmentReportNum);//评估报告编号
            $('[name="assessmentProductName"]').val(cur_data.samplingInspection.assessmentProductName)//评估产品名称
            $('[name="assessmentCompanyId"]').find('option[value="'+cur_data.samplingInspection.assessmentCompanyId+'"]').attr('selected','selected')//评估单位
            $('[name="assessmentPrice"]').val(renderNum(cur_data.samplingInspection.assessmentPrice))//评估价值
            $('[name="assessmentTime"]').val(cur_data.samplingInspection.assessmentTime)//评估时间

            if(!cur_data.samplingInspection  || !cur_data.manager_sampling_testing_audit){
                return 
            }

            var accessory_info =  cur_data.samplingInspection;

            if(accessory_info.assessmentReportAccessory){//评估报告
                var assessmentAccessoryText = accessory_info.assessmentReportAccessory.name;//评估报告名称
                var assessmentAccessoryId = accessory_info.assessmentReportAccessory.id;//评估报告路径 
                var assessmentAccessoryType = accessory_info.assessmentReportAccessory.type;
                setAccessory('[name="assessmentReportAccessory"]',assessmentAccessoryText,assessmentAccessoryId,assessmentAccessoryType,manager_claim);
            }
             
            //三方协议
            if(accessory_info.protocolAccessory){
                var protocolAccessoryText = accessory_info.protocolAccessory.name;//三方协议名称
                var protocolAccessoryId = accessory_info.protocolAccessory.id;//三方协议路径 
                var protocolAccessoryType = accessory_info.protocolAccessory.type;
                setAccessory('[name="protocolAccessory"]',protocolAccessoryText,protocolAccessoryId,protocolAccessoryType,manager_claim);
            }


            //检测评估结论
            var manager_audit_result = manager_audit_info.manager_sampling_testing_audit_result;
            var manager_msg = manager_audit_info.manager_sampling_testing_audit_result_Msg;
            var manager_audit_result_dom = $('[name="inspectionResult"]');
            manager_audit_result_dom.find('option[value="'+manager_audit_result+'"]').attr('selected','selected');
            $('[name="inspectionResultMsg"]').val(manager_msg);
            manager_audit_result_dom.addClass(handleStatus(manager_audit_result));
            
            addSelectPatch();

            //数据回显示再次实例化省区经理填写意见插件
            new controlBtn(0,manager_dom,manager_msg.length);

            var manager_refuse = manager_audit_result=="refuse_apply";
            if(is_zj_credit){//如果是中酒信贷专员
                //当省区经理的审核结果是拒绝融资时出现中酒信贷专员的拒绝办理的dom,如果不是则出现正常的融资审核dom
                manager_refuse?claim(credit_cancel_dom):claim(credit_dom);
            }            

            //取样过程实况
            if(accessory_info.samplePicAccessory){//图片
                var samplePicAccessoryText = accessory_info.samplePicAccessory.name;
                var samplePicAccessoryId = accessory_info.samplePicAccessory.id;
                var samplePicAccessoryType = accessory_info.samplePicAccessory.type;
                setAccessory('[name="samplePicAccessory"]',samplePicAccessoryText,samplePicAccessoryId,samplePicAccessoryType,manager_claim);
            }

            if(accessory_info.simpleVideoAccessory){//视频
                var simpleVideoAccessoryText = accessory_info.simpleVideoAccessory.name;
                var simpleVideoAccessoryId = accessory_info.simpleVideoAccessory.id;
                var simpleVideoAccessoryType = accessory_info.simpleVideoAccessory.type;
                setAccessory('[name="simpleVideoAccessory"]',simpleVideoAccessoryText,simpleVideoAccessoryId,simpleVideoAccessoryType,manager_claim);
            }


            //中酒信贷专员审核结果回显
            if(is_winery){
                credit_cancel_dom.hide();
                credit_dom.hide();
                addSelectPatch();
                return
            }
            

            if(manager_refuse){//信贷专员审核省区经理拒绝
                var credit_refuse_info = cur_data.credit_sampling_testing_refuse_apply_audit;
                var credit_refuse_result = credit_refuse_info.credit_sampling_testing_refuse_apply_audit_result;
                var credit_refuse_msg =  credit_refuse_info.credit_sampling_testing_refuse_apply_audit_result_Msg;
                var credit_audit_claim = credit_refuse_info.needClaim;
                var credit_refuse_result_dom = $('[name="creditFinanceEndResult"]');
                var credit_refuse_msg_len = credit_refuse_msg && credit_refuse_msg.length;
                renderAuditComponent(credit_cancel_dom);
                if(!credit_refuse_result){
                    return 
                }
                showManageInfo(credit_cancel_dom,credit_refuse_info);               
                setInstitution(credit_cancel_dom,credit_refuse_info.InstitutionName);
                credit_refuse_result_dom.find('option[value="'+credit_refuse_result+'"]').attr('selected','selected');
                credit_refuse_result_dom.addClass(handleStatus(credit_refuse_result));
                $('[name="creditFinanceEndOpinion"]').val(credit_refuse_msg);
                credit_refuse_result&&!credit_audit_claim?review(credit_cancel_dom):'';
                credit_cancel_dom.find('[data-role="font-length"] b').text(140-credit_refuse_msg.length);
                renderAuditComponent(credit_cancel_dom);
            }else{//信贷专员审核省区经理通过
                
                var credit_audit_info = cur_data.credit_sampling_testing_audit;
                var credit_result = credit_audit_info.credit_sampling_testing_audit_result;
                var credit_msg = credit_audit_info.credit_sampling_testing_audit_result_Msg;
                var credit_result_dom = $('[name="creditSamplingResult"]');
                var credit_claim = credit_audit_info.needClaim;
                (!credit_audit_info.credit_sampling_testing_audit_result && !credit_audit_info.needClaim)?credit_dom.css({'display':'none'}):'';//回退时隐藏
                (credit_audit_info.needClaim)?claim(credit_dom):'';
                (credit_audit_info.credit_sampling_testing_audit_result && !credit_audit_info.needClaim)?review(credit_dom):'';//回显数据
                if(!credit_result){
                    return
                }
                showManageInfo(credit_dom,credit_audit_info)//显示办理信息
                setInstitution(credit_dom,credit_audit_info.InstitutionName);//显示机构信息
                credit_audit_info.UpdateAt?xindai_update=true:xindai_update=false;//是否是修改状态
                credit_result_dom.find('option[value="'+credit_result+'"]').attr('selected','selected');//审核结果
                credit_result_dom.addClass(handleStatus(credit_result));
                $('[name="creditSamplingOpinion"]').val(credit_msg);//审核意见
                var risk_msg_len = credit_msg?credit_msg.length:0;
                new controlBtn(0,credit_dom,risk_msg_len);//省区经理同意时，真安风控专员填写意见组件实例化
            }

            addSelectPatch()
        }
    })

    /**
    * 省区经理申请融资终止后真安信审审核意见
    */

    function renderAuditComponent(selector){
        var control_select_dom = $(selector).find('[name="creditFinanceEndResult"]');
        var control_textarea_dom = $(selector).find('[name="creditFinanceEndOpinion"]');
        var control_btn_dom = $(selector).find('[data-id="cancel-credit-testing"]');

        var select_val = control_select_dom.val();
        var textarea_val = control_textarea_dom.val();
        if(!(select_val&&textarea_val)){
            setOff()
        }else{
            setOn()
        }
        
        function setOn(){
            if(typeof control_btn_dom.attr('disabled')!=='undefined'){
                control_btn_dom.removeAttr('disabled');
            }
        }

        function setOff(){
            if(typeof control_btn_dom.attr('disabled')=='undefined'){
                control_btn_dom.attr('disabled','disabled');
            }
        }

        control_select_dom.on('change',function(){
            select_val = $.trim($(this).val());
            if(!(select_val&&textarea_val)){
                setOff()
            }else{
                setOn()
            }

        })

        control_textarea_dom.on('input propertychange',function(){
            textarea_val = $.trim($(this).val());
            if(!(select_val&&textarea_val)){
                setOff()
            }else{
                setOn()
            }
        })


    }


    var provincial_result = $('[name="inspectionResult"]').val();
    var provincial_msg = $.trim($('[name="inspectionResultMsg"]').val());


    
    //取样检测-省区经理数据提交
    $('[data-id="confirm-provincial-testing"]').on('click',function(){
        var _this = this;
        var provincial_result_is_agree = ($('[name="inspectionResult"]').val()=='agree');//agree
        var provincial_msg = $.trim($('[name="inspectionResultMsg"]').val());

        if(manager_dom.valid()){
            $('[data-role="upload-pic"],[data-role="upload-video"]').show();
        }else{
            $('[data-role="upload-pic"],[data-role="upload-video"]').hide();
        }

        if(!provincial_result_is_agree&&!provincial_msg){//如果不是同意，又没有填写意见那么就返回
            return 
        }

        if(!$(manager_dom).valid()||(typeof $(_this).attr('disabled')!=='undefined')){//前端验证没有通过则返回
            return 
        }
        $(_this).attr('disabled','');
        var alertInfo = $(this).attr('data-info');
        var param = {};
        param["inputData"] = {
            taskId:window.sessionStorage["taskId"],
            commissionCompany:$('[name="commissionCompany"]').val(),
            sealSampleTime:$('[name="sealSampleTime"]').val(),
            inspectReportNum:$('[name="inspectReportNum"]').val(),
            caryProductName:$('[name="caryProductName"]').val(),
            inspectCompanyId:$('[name="inspectCompanyId"]').val(),
            inspectType:$('[name="inspectType"]').val(),
            inspectTime:$('[name="inspectTime"]').val(),
            assessmentReportNum:$('[name="assessmentReportNum"]').val(),
            assessmentProductName:$('[name="assessmentProductName"]').val(),
            assessmentCompanyId:$('[name="assessmentCompanyId"]').val(),
            assessmentPrice:removeSopt($('[name="assessmentPrice"]').val()),
            assessmentTime:$('[name="assessmentTime"]').val(),
            inspectionResult:$('[name="inspectionResult"]').val(),
            inspectionResultMsg:$('[name="inspectionResultMsg"]').val()
        };
        if(shengqu_update){//省区经理修改取样检测数据
            if(window.sessionStorage["sampling_testing"] && window.sessionStorage["sampling_testing"]!==''){
                var fileArray = JSON.parse(window.sessionStorage["sampling_testing"]);
                param.files = fileArray;
                param.fileNames = fileArray;
            }
            param["inputData"]["status"]=1;

        }else{//省区经理直接提交取样检测数据
            param["inputData"]["status"]=0;
            param["files"] = ['assessmentReportAccessory','inspectReportAccessory','protocolAccessory','samplePicAccessory','simpleVideoAccessory'];
            param["fileNames"] = ['assessmentReportAccessory','inspectReportAccessory','protocolAccessory','samplePicAccessory','simpleVideoAccessory']; 
        }

        console.debug('中酒省区经理取样检测提交数据')
        console.debug(param);

        HttpUtils.post_provincial_testing_info(param,function (data) {
            if(data.statusCode=='200'){
                auditSuccess(alertInfo);
                $(_this).removeAttr('disabled');
            }
        });       
                 
    })

    //取样检测-中酒信贷专员
    $('[data-id="confirm-redit-testing"]').on('click',function(){
        var _this = this;
        if(typeof $(_this).attr('disabled')!=='undefined'){
            return
        }
        $(_this).attr('disabled','')
        var alertInfo = $(this).attr('data-info');
        var param = {};
        param["taskId"] = window.sessionStorage["taskId"];
        param["creditSamplingResult"] = $('[name="creditSamplingResult"]').val();
        param["creditSamplingOpinion"] = $('[name="creditSamplingOpinion"]').val();
        param = JSON.stringify(param)
        console.debug('中酒信贷专员-取样检测数据')
        console.debug(param)
        HttpUtils.post_credit_testing_info(param,function(data){
            if(data.statusCode=='200'){
                auditSuccess(alertInfo);
                $(_this).removeAttr('disabled');
            }
        })
    })

    //当省区经理申请拒绝融资后，中酒信贷再注册填写信息的事件
    credit_cancel_dom.find('textarea').on('input propertychange',function(){
        var _this = this;
        var cur_val = $.trim($(_this).val());
        var cur_text_len = cur_val.length;
        if(cur_val.length>140){
            $(_this).val(cur_val.substring(0,140)); 
            $(_this).next('[data-role="font-length"]').find('b').text(0);   
        }else{
            $(_this).next('[data-role="font-length"]').find('b').text(140-cur_text_len)
        }    
    })

    //取样检测-中酒信贷专员-融资终止
    $('[data-id="cancel-credit-testing"]').on('click',function(){
        var _this = this;
        var is_insert_info = credit_cancel_dom.find('select').val() && credit_cancel_dom.find('textarea').val();
        if((typeof $(_this).attr('disabled')!=='undefined')||!is_insert_info){
            return
        }
        var alertInfo = $(_this).attr('data-info');
        $(_this).attr('disabled','');
        var taskId = window.sessionStorage["taskId"];
        var param = {
            taskId:taskId,
            creditFinanceEndResult:$('[name="creditFinanceEndResult"]').val(),
            creditFinanceEndOpinion:$.trim($('[name="creditFinanceEndOpinion"]').val())
        }   
        HttpUtils.post_credit_finance_end(param,function(data){
            auditSuccess(alertInfo);
            $(_this).removeAttr('disabled');
        })
    })
})
