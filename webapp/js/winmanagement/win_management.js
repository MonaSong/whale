/**
 * @Author Mona
 * @data 2016-11-03
 * @description 酒厂入驻申请审核流程
 */


//禁用回退按钮  do nothing

/**
 * @Author Mona
 * @date 2016-11-04
 * @description 获取酒厂入驻信息
 * @return
 */
$(function(){

    //taskId 任务ID
    if(window.sessionStorage["taskId"]){
        var taskId = window.sessionStorage["taskId"];
    }
    //businessKey 业务编号
    if(window.sessionStorage["businessKey"]){
        var businessKey = window.sessionStorage["businessKey"];
    }

    // managementStatus 办理状态  1代表是办理状态 2、代表是查看状态
    if(window.sessionStorage["managementStatus"]){
        var managementStatus = window.sessionStorage["managementStatus"];
    }

    if(managementStatus=="1"||param.management_status=='1'){//查看状态时信息为不可写，操作按钮隐藏
        $('select,textarea').attr('disabled','');
        $('[data-operater-bottom]').hide();
        $('[data-role="font-length"]').hide();
        addSelectPatch();
    }

    var all_node_status = new AllNodeStatus(businessKey);
    var curNodeId = all_node_status.getCurNodeId();
    var curRoleId = new Role().getRoleId();
    businessKey ? new ProcessNodeMenu('ru_zhu',businessKey):'';//入驻申请流程节点渲染


    function handleStatus(result){
        if(result=='agree'){
            return 'agree';
        }
        else{
            return 'refuse';
        }
    }

    /**
     * @Author Mona
     * @date 2016-11-04
     * @description 获取省区经理名单
     * @return
     */

    winManagementRequest.get_provinceManagers();

    //初始化审核结果组件
    new controlBtn(0,'[data-id="assistant-audit-control"]',140);
    new controlBtn(1,'[data-id="functional-distribution-control"]',140);//渠道总监
    new controlBtn(0,'[data-id="manager-audit-control"]',140);
    new controlBtn(0,'[data-id="audit-director-control"]',140);


    //设置显示状态
    function setOpinionStatus(nodeId,selector,valLen){    
        if(managementStatus=="1"||param.management_status=='1'){      
            return
        }

        //当前节点可办理的role信息
        //节点信息
        var roleObjectId = '';
        $(selector).attr('data-handle-role')?roleObjectId = role[$(selector).attr('data-handle-role')].id:roleObjectId='';
        console.debug('session中角色ID==='+curRoleId);
        console.debug('当前页面元素RoleId==='+roleObjectId)
        if(curNodeId==nodeId && curRoleId==roleObjectId){
            $(selector).find('[data-role="font-length"]').show();
            $(selector).find('select,textarea').removeAttr('disabled');
            $(selector).find('[data-operater-bottom]').show(); 
            $(selector).find('[data-role="font-length"]>b').text(140-parseInt(valLen))
        }else{
            $(selector).find('[data-role="font-length"]').hide(); 
            $(selector).find('select,textarea').attr('disabled','');
            $(selector).find('[data-operater-bottom]').hide(); 
        }
    }


    winManagementRequest.get_win_info(businessKey,function(data,textStatus){
        if(data!==undefined && data!=='' && data.data!==undefined && data.data!==null && data.data.winery!==undefined && data.data.winery!==null){
            var curData = data.data;
            var curWinery = curData.winery;
            console.debug('酒厂数据===')
            console.debug(curWinery);
            //酒厂基本信息
            $('[data-id="invitationCode"]').text(curData.invitationCode);
            $('[data-id="mobile"]').text(curData.mobile);
            $('[data-id="trueName"]').text(curData.trueName);
            $('[data-id="userDuty"]').text(curData.userDuty);

            $('[data-id="companyName"]').text(curWinery.companyName);
            $('[data-id="companyAddress"]').text(curWinery.companyAddress);
            if(curWinery.companyCity==="请选择"){
            	$('[data-id="companyCity"]').text('');
            }else{
            	$('[data-id="companyCity"]').text(curWinery.companyCity);
            }
            if(curWinery.companyProvince==="请选择"){
            	 $('[data-id="companyProvince"]').text('');
            }else{
            	 $('[data-id="companyProvince"]').text(curWinery.companyProvince);
            }
            $('[data-id="businessLicenseNum"]').text(curWinery.businessLicenseNum);


            //查看按钮可下载文件
            $('a[data-id]').attr('download',true);

            var url = contextPath+'/accessory/download/';

            //营业执照
            curData.winery&&curData.winery.bussinessLicense?$('a[data-id="bussinessLicense"]').attr('href',url+curData.winery.bussinessLicense.id):'';
            if(curData.winery.bussinessLicense){
                var bus_text = curData.winery.bussinessLicense.name;
                var bus_id = curData.winery.bussinessLicense.id;
                var bus_type = curData.winery.bussinessLicense.type;
                setAccessory('[name="bussinessLicense"]',bus_text,bus_id,bus_type,false);
            }

            //税务登记
            if(curData.winery.taxRegistration){
                var tax_text = curData.winery.taxRegistration.name;
                var tax_id = curData.winery.taxRegistration.id;
                var tax_type = curData.winery.taxRegistration.type;
                setAccessory('[name="taxRegistration"]',tax_text,tax_id,tax_type,false);
            }

            //身份证正面
            if(curData.winery.legalFrontCardPic){
                var legal_f_text = curData.winery.legalFrontCardPic.name;
                var legal_f_id = curData.winery.legalFrontCardPic.id;
                var legal_f_type = curData.winery.legalFrontCardPic.type;
                setAccessory('[name="legalFrontCardPic"]',legal_f_text,legal_f_id,legal_f_type,false);
            }

            //身份证反面
            if(curData.winery.legalBackCardPic){
                var legal_b_text = curData.winery.legalBackCardPic.name;
                var legal_b_id = curData.winery.legalBackCardPic.id;
                var legal_b_type = curData.winery.legalBackCardPic.type;
                setAccessory('[name="legalBackCardPic"]',legal_b_text,legal_b_id,legal_b_type,false);
            }

            //酒厂现场图片
            if(curData.winery.wineryLivePic){
                var winery_text = curData.winery.wineryLivePic.name;
                var winery_b_id = curData.winery.wineryLivePic.id;
                var winery_b_type = curData.winery.wineryLivePic.type;
                setAccessory('[name="wineryLivePic"]',winery_text,winery_b_id,winery_b_type,false);
            }
        }
    })

    var assistant_audit_dom = $('[data-id="assistant-audit-control"]');//中酒事务助理审核总节点
    var functional_distribution_dom = $('[data-id="functional-distribution-control"]');//中酒渠道总监审核总节点
    var manager_audit_dom = $('[data-id="manager-audit-control"]');//经理审核总节点；
    var audit_director_dom = $('[data-id="audit-director-control"]');
    
    //入驻申请数据回显
    winManagementRequest.get_echo_data({businessKey:businessKey},function(data){
        var curData = data.data;
        console.debug('入驻申请数据回显');
        console.debug(data)
        var valLen = null;
        var handle_result = curData.opinions//办理结果
        var handle_result_assistant = handle_result.assistantAuditResult//助理审核结果
        var handle_result_major = curData.provinceUserId//业务分配结果
        var handle_result_manager = handle_result.managerAuditResult//助理审核结果
        var handle_result_director = handle_result.directorAuditResult//总监审核结果

        if(curData && curData!==''){
            /**
             * @description 业务分配数据回显
             * @return
             */

             /***************显示办理角色，时间等信息******************/
            if(curData["助理审核"] && curData["助理审核"].roleName&&handle_result_assistant){
                showManageInfo(assistant_audit_dom,curData["助理审核"]);
            }

            if(curData["业务分配"] && curData["业务分配"].roleName&&handle_result_major){
                showManageInfo(functional_distribution_dom,curData["业务分配"]);
            }

            if(curData["经理审核"] && curData["经理审核"].roleName&&handle_result_manager){
                showManageInfo(manager_audit_dom,curData["经理审核"]);
            }

            if(curData["总监审核"] && curData["总监审核"].roleName&&handle_result_director){
                showManageInfo(audit_director_dom,curData["总监审核"]);
            }

            /***************结束   显示办理角色，时间等信息******************/

            if(curData.provinceUserId){
                $('[name="provinceUserId"]').find('option[value="'+curData.provinceUserId+'"]').attr('selected',true);
                new controlBtn(1,'[data-id="functional-distribution-control"]',valLen);
            }
            if(curData.opinions.majorAuditOpinion){     
                 setOpinionInfo('[name="majorAuditOpinion"]',curData.opinions.majorAuditOpinion);
                 valLen = curData.opinions.majorAuditOpinion.length
                 setOpinionStatus('assignment','[data-id="functional-distribution-control"]',valLen);
                    
            }else{
                 setOpinionStatus('assignment','[data-id="functional-distribution-control"]',0);
                 setOpinionInfo('[name="majorAuditOpinion"]',curData.opinions.majorAuditOpinion);
                 new controlBtn(1,'[data-id="functional-distribution-control"]',0);
            }
        }

        if(curData && curData.opinions !==undefined && curData!==''){

            /**
             * @description 中酒事务助理审核数据回显
             * @return
             */

             var assistant_result = curData.opinions.assistantAuditResult;
             var assistant_opinons = curData.opinions.assistantAuditOpinion;
             var assistant_status_class = handleStatus(assistant_result);
             assistant_result?$('[name="assistantAuditResult"]').addClass(assistant_status_class).find('option[value="'+assistant_result+'"]').attr('selected',true):'';
             setOpinionInfo('[name="assistantAuditOpinion"]',assistant_opinons);
             if(assistant_result && assistant_opinons){
                   valLen =  assistant_opinons.length; 
                   setOpinionStatus('assistantAudit','[data-id="assistant-audit-control"]',valLen)
                   new controlBtn(0,'[data-id="assistant-audit-control"]',valLen);            
             }else{
                   setOpinionStatus('assistantAudit','[data-id="assistant-audit-control"]',0)
                   new controlBtn(0,'[data-id="assistant-audit-control"]',0);
             }
                   
            /**
             * @description 经理审核
             * @return
             */   
             var manager_result = curData.opinions.managerAuditResult;
             var manager_opinion = curData.opinions.managerAuditOpinion;
             var manager_status_class = handleStatus(manager_result);
             manager_result?$('[name="managerAuditResult"]').addClass(manager_status_class).find('option[value="'+manager_result+'"]').attr('selected',true):'';
             //manager_opinion?$('[name="managerAuditOpinion"]').val(manager_opinion):'';
             setOpinionInfo('[name="managerAuditOpinion"]',manager_opinion);
             if(manager_result && manager_opinion){
                valLen = manager_opinion.length;
                setOpinionStatus('managerAudit','[data-id="manager-audit-control"]',valLen)
                new controlBtn(0,'[data-id="manager-audit-control"]',valLen);   
             }else{
                setOpinionStatus('managerAudit','[data-id="manager-audit-control"]',0)
                new controlBtn(0,'[data-id="manager-audit-control"]',0);
             }

 
            /**
             * @description 总监审核
             * @return
             */   
             var director_result =  curData.opinions.directorAuditResult;
             var director_opinions = curData.opinions.directorAuditOpinion;
             var director_status_class = handleStatus(director_result);
             director_result?$('[name="directorAuditResult"]').addClass(director_status_class).find('option[value="'+director_result+'"]').attr('selected',true):'';
             //director_opinions?$('[name="directorAuditOpinion"]').val(director_opinions):'';
             setOpinionInfo('[name="directorAuditOpinion"]',director_opinions);
             if(director_result && director_opinions){
                var valLen = curData.opinions.directorAuditOpinion.length;
                setOpinionStatus('directorAudit','[data-id="audit-director-control"]',valLen);
                new controlBtn(0,'[data-id="audit-director-control"]',valLen);
             }else{
                setOpinionStatus('directorAudit','[data-id="audit-director-control"]',0);
                new controlBtn(0,'[data-id="audit-director-control"]',0);
             }

             addSelectPatch();
            
        }
    })

    /**
     * @Author Mona
     * @date 2016-11-04
     * @description 提交审核信息
     * @return
     */
    function postAuditOpinoin(target,param){
        var alertInfo = $(target).attr('data-info');
        var director_agree = $(target).parents('[data-id="audit-director-control"]').find('select').val()=='agree';

        if(typeof($(target).attr("disabled"))!=="undefined"){
            return 
        }
        winManagementRequest.post_sudit(param,function(data,status){
            if(status=='success'){
                if(director_agree){
                    auditSuccess(alertInfo,director_agree,'酒厂账户已激活，请通知厂家。');
                }else{
                    auditSuccess(alertInfo);
                }  
            } 

        })
    }

    //中酒事务助理审核
    $('[data-id="assistant-audit"]').on('click',function(){
        var param = {
            taskId:taskId,
            assistantAuditOpinion:$('[name="assistantAuditOpinion"]').val(),
            assistantAuditResult:$('[name="assistantAuditResult"]').val()}

        postAuditOpinoin(this,param);
    })

    //业务分配
    $('[data-id="func-distribution"]').on('click',function(){
        var param = {
            taskId:taskId,
            majorAuditOpinion:$('[name="majorAuditOpinion"]').val(),
            assignee:$('[name="provinceUserId"]').val()};
        postAuditOpinoin(this,param);
    })

    //省区经理审核
    $('[data-id="manager-audit"]').on('click',function(){
        var param = {
            taskId:taskId,
            managerAuditOpinion:$('[name="managerAuditOpinion"]').val(),
            managerAuditResult:$('[name="managerAuditResult"]').val()}
        postAuditOpinoin(this,param);
    })

    //总监审核
    $('[data-id="audit-director"]').on('click',function(){
        var param = {
            taskId:taskId,
            directorAuditOpinion:$('[name="directorAuditOpinion"]').val(),
            directorAuditResult:$('[name="directorAuditResult"]').val()}
        postAuditOpinoin(this,param);
    })

})