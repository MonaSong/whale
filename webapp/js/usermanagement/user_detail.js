/**
 * @Author yjx
 * @Date 2016-11-07
 * @description 拿到用户详情数据
 */
$().ready(function() {
	/*已删除用户*/
	if(window.sessionStorage['status_user']==='4'){
		$('.password').hide();
		$('[name=mobile]').attr('disabled', '');
		$('[data-user-detail]').hide();
		$('[name=institutionId]').attr('disabled', '');
		$('[name=user_role]').attr('disabled', '');
		$('[name=trueName]').attr('disabled', '');
	}else{
		$('.password').show();
		$('[name=mobile]').removeAttr('disabled', '');
		$('[data-user-detail]').show();
		$('[name=institutionId]').removeAttr('disabled', '');
		$('[name=user_role]').removeAttr('disabled', '');
		$('[name=trueName]').removeAttr('disabled', '');
	}
	//判断角色
    function super_administrator_check() {
		var administrator=false;
        var roleInfo = new Role();
        var roleId = roleInfo.getRoleId();
        administrator = role.compareTo(roleId, role["super_administrator"]); //超级管理员data_userStatus
        return administrator
    }
    var administrator = super_administrator_check()
    console.debug(administrator)
    
    function system_management_check(){
    	var system = false;
    	var capital_management = false;
    	var supervisor_management = false;
    	var insurer_management = false;
    	var finance_management = false;
    	var operator_management = false;
    	var investment_management = false;
    	var roleInfo = new Role();
    	var roleId = roleInfo.getRoleId();
    	capital_management = role.compareTo(roleId, role["zf_system_administrator"]);//资方系统操作员
        var supervisor_roleId = roleInfo.getRoleId();
    	supervisor_management = role.compareTo(supervisor_roleId, role["jg_system_administrator"]);//监管方系统操作员
        var insurer_roleId = roleInfo.getRoleId();
    	insurer_management = role.compareTo(insurer_roleId, role["ly_system_administrator"]);//履约保险方系统操作员
        var finance_roleId = roleInfo.getRoleId();
    	finance_management = role.compareTo(finance_roleId, role["jr_finace_system_administrator"]);//金融服务方系统操作员
        var operator_roleId = roleInfo.getRoleId();
    	operator_management = role.compareTo(operator_roleId, role["yy_operation_party_administrator"]);//运营方系统操作员
        var investment_roleId = roleInfo.getRoleId();
    	investment_management = role.compareTo(investment_roleId, role["rz_system_administrator"]);//融资方系统操作员
    	console.debug(operator_management)
    	if(capital_management === true || supervisor_management === true || insurer_management === true || finance_management === true || operator_management === true || investment_management === true){
    		system = true;
    	}
    	return system
    }
	var system_management = system_management_check();
	console.debug(system_management)
	
	//判断已激活和未激活用户
	function check_status(){
		var status = window.sessionStorage['userStatus'];
		if(status === null || status === '1'){
			$('#mobile').attr('disabled','disabled');
			$('#institutionId').attr('disabled','disabled');
			$('#user_role').attr('disabled','disabled');
		}else if(status === '0'){
			if(administrator){
				/*$('#institutionId').removeAttr('disabled');
				$('#user_role').removeAttr('disabled');*/
			}else if(system_management){
				$('#institutionId').attr('disabled','disabled');
				$('#user_role').on('click',function(){
					var id = $('#institutionId').attr('data-institution-id');
					console.debug(id);
			        renderRole(id);
			    });
			}
		}
	}
	check_status()
	//表单进行验证
        var user_detail_rules = {
            username: {
                required: true,
                rangelength: [4, 20]
            },
            name:{
                required:true,
                maxlength:10
            },
            mobile:{
            	required:true,
            	rangelength:[11,11],
            	isMobile:true
            }
        };
        var user_detail_messages = {
            username: {
                required: "中英文、数字组合，区分大小写，长度为4-20个字符",
                rangelength: "中英文、数字组合，区分大小写，长度为4-20个字符"
            },
            name:{
                required:"联系人姓名",
                maxlength:"超出输入范围，不超过10个字符"
            },
            mobile:{
            	required:'手机号不能为空',
            	rangelength:'输入正确的手机号码',
            	isMobile:'输入正确的手机号码'
            }
        }
    
    formValidate('#user-form1',user_detail_rules,user_detail_messages);
    //表单验证结束

    //用户信息数据渲染 
    $('#userId').val(window.sessionStorage["userId"]);
    $('#userId').attr("userId",window.sessionStorage['userId']);
    
    //var institutionId = window.sessionStorage['institutionId'];
    $('#institutionId').append('<option value = '+window.sessionStorage["institutionId"]+' data-institution-id = '+window.sessionStorage["institutionId"]+'>'+window.sessionStorage["institutionContact"]+'</option>');
    $('#institutionId').attr('data-institution-id',window.sessionStorage["institutionId"]);
    
    $('#user_role').append('<option value = '+window.sessionStorage["roleId"]+' data-user-id = '+window.sessionStorage["roleId"]+'>'+window.sessionStorage["roleName"]+'</option>');
    $('#user_role').attr('data-roleId',window.sessionStorage["roleId"])
    
    $('#institutionTypeId').val(window.sessionStorage["institutionTypeName"]);
    
    $('#trueName').val(window.sessionStorage["userName"]);
    $('#mobile').val(window.sessionStorage["mobile"]);
    
    //重置密码
    $('#forget').on("click",function(){
    	var userId=window.sessionStorage["userId"];
    	var param={
    		userId:userId	
    		}
    	HttpUtils.get_resetPwd_data(param,function(data){
    		$('#sucess').modal('show');
         	$('.modify').html("密码已重置为：111111");
    	})
    });
    
  //用户查询所属机构
    function institutionType(){
    	HttpUtils.get_institution_data(function(data){
    		var institutiondata=data.data;
    		console.debug(institutiondata)
 	       var institutiontemp='';
 	       $.each(institutiondata,function(i,item){
 	    		  institutiontemp+='<option value="'+item.id+'" data-institution-id="'+item.id+'">'+item.institutionName+'</option>';  
 	    	})
 	       $('#institutionId').append(institutiontemp);
    	})
    	var institutionId=$('#institutionId').find('option:selected').attr('data-institution-id')
    	renderRole(institutionId)
    }
    institutionType()
    
    //去重
    function selectRemove(){
		$("#institutionId option").each(function() {
	        var val = $(this).val();
	        console.debug(val)
	        if($("#institutionId option[value="+val+"]").length > 1){
	            $("#institutionId option[value="+val+"]:gt(0)").remove();
	        }
	    });
	}
	selectRemove()
	
    //用户所属角色
    function renderRole(institutionId){
    	var param={
    			institutionId:institutionId
    		}
		HttpUtils.get_userRole_data(param,function(data){
    		var roledata=data.data;
    		console.debug(roledata)
    		if(isinstitutionChange === true){
    			$('#user_role').empty();
    			isinstitutionChange=false;
    		}
            //$('#user_role').empty();        
            if(roledata!==undefined && roledata.length>0 && roledata!==null){
                var temp = ''
                $.each(roledata,function(i,item){
                    temp+='<option value='+item.id+' data-user-id="'+item.id+'">'+item.name+'</option>'
                })
                //$('#user_role').append('<option value="'+window.sessionStorage['roleId']+'" data-user-id="'+window.sessionStorage['roleId']+'">'+window.sessionStorage["roleName"]+'</option>');
                $("#user_role").append(temp);
                roleSelectRemove();
            }
    	})
    };
    
  //角色去重
	function roleSelectRemove(){
		$("#user_role option").each(function() {
	        text = $(this).text();
	        if($("#user_role option:contains("+text+")").length > 1);
	            $("#user_role option:contains("+text+"):gt(0)").remove();
	    });
	};
	var isinstitutionChange=false
    //获取用户机构类型数据
     $('#institutionId').on('change',function(){
    	 isinstitutionChange = true;
    	var institutionId=$(this).val();
        var param={
        		institutionId:institutionId
        	}
        HttpUtils.get_institutionType_data(param,function(data){
        	$('#institutionTypeId').attr('data-id',data.data.id);
            $('#institutionTypeId').val(data.data.institutionTypeName)
        })
        renderRole(institutionId);
    });
     
    //提交修改用户信息
    $(".btn-save").click(function(){
    //手机验证
    	var mobile=$("#mobile").val();
    	var userId=$("#userId").attr("userId");
    	var username=$("#userId").val();
    	var institutionId=$("#institutionId").find('option:selected').attr('data-institution-id');
    	var roleId = $("#user_role").find('option:selected').attr('data-user-id');
    	var trueName=$("#trueName").val();
    	var param={
    			userId:userId,              //用户ID
    			institutionId:institutionId,//新机构ID	
    			roleId:roleId,             //新角色ID	
    			trueName:trueName,         //新姓名	
    			mobile:mobile              //手机号
		}
    	console.debug(param);
    	if (! $("#user-form1").valid()) {
            return;
    	}
    	HttpUtils.get_savedatail_data(param,function(data){
    		//isChange = false;
    		window.location.href=contextPath+'/user/user_management_page';
    	})
    })
    	//退出修改
        $(".btn-close").click(function(){
        	window.location.href=contextPath+"/user/user_management_page";
        });
})

