/**
 * @Date:2016/10/31
 * @Author:yugang
 * @Description:user_new
 */
$().ready(function() {
    var user_form_rules = {
        mobile:{
            required:true,
            isMobile : true
        },
        trueName:{
            required:true,
            maxlength:10
        },
        password: {
            required: true,
            rangelength: [6, 16]
        }
    }
    var user_form_messages = {
        mobile:{
            required:"手机号码不能为空",
            isMobile:"输入正确的手机号码"
        },
        trueName:{
            required:"姓名不能为空",
            maxlength:"超出输入范围，不超过10个字符"
        },
        password: {
            required: "密码不能为空",
            rangelength: "6-16个字符、支持数字、大小写字母、符号"
        }
    }    
    //前端验证
    formValidate('#user-form',user_form_rules,user_form_messages);

  //检验用户名是否被注册(手机号是否被注册)
    $("#mobile").blur(function(){
        var mobile=$("#mobile").val();
        var param={
        		mobile:mobile
        }
        if(mobile===''){
        	return;
        }
        HttpUtils.get_username_data(param,function(data){
        	console.debug(data);
        })
      });
    
    //机构列表
    function institutionList(){
    	HttpUtils.get_institution_data(function(data){
    		var institutiondata=data.data;
            var institutiontemp='';
            var id = null;
            $.each(institutiondata,function(i,item){    	   	   
         	   institutiontemp+='<option value="'+item["id"]+'">'+item["institutionName"]+'</option>';
            })
            $("#institutionId").append(institutiontemp);
            //renderRole(id);
    	})
    };
    institutionList()
    
    //获取所属角色和机构类型
    function renderRole(institutionId){
    	var param = {
    			institutionId:institutionId
    		}
    	HttpUtils.get_userRole_data(param,function(data){
    		var roledata=data.data;                 
            if(roledata!==undefined && roledata.length>0 && roledata!==null){
                var temp = '';           
                for(i in roledata){
                    temp+='<option role_Id="'+roledata[i].id+'">'+roledata[i].name+'</option>'                    
                }
                $("#user_role").empty().html(temp);
            }
    	})
    	HttpUtils.get_institutionType_data(param,function(data){
    		$("#institutionTypeId").attr("data-id",data.data.id);
            $("#institutionTypeId").val(data.data.institutionTypeName)
    	})
    }
    
    //所属机构change时，对应角色和类型的改变
    $('#institutionId').on('change',function(){
    	var id = $(this).val();
        renderRole(id);
    })
    
    //取消新增
    $(".btn-close").click(function(){
    	window.location.href=contextPath+"/user/user_management_page";
    })
    
    //保存新增用户
    $(".btn-save").click(function(){
    	if(!$('#user-form').valid()){
    		return
    	} 
        var param = {
                username: $("#username").val(),
                password: $("#password").val(),
                mobile:$("#mobile").val(),
                roleId:$("#user_role").find("option:selected").attr("role_Id"),
                trueName:$("#trueName").val(),
                institutionId:$("#institutionId").find(" option:selected").attr("value"),
                institutionTypeId: $('#institutionTypeId').attr("data-id"),
            };
        console.log(param);
        HttpUtils.get_savenew_data(param,function(data){
        	window.location.href=contextPath+"/user/user_management_page";
        })
    }) 
})
