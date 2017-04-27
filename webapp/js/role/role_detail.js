/**
 * @Date:2016/11/28
 * @Author:yugang
 * @Description:角色管理
 */
$().ready(function() {
	//字段验证
	var role_form=$('#role-form')
	var role_rules={
		role_name:{
			required:true
		}
	};
	var role_messages={
			role_name:{
				required:'用户角色不能为空'
			}
		};
	formValidate(role_form,role_rules,role_messages);
	//数据回显
	$('#role_name').val(window.sessionStorage['roleName']);
	$('#role_name').attr('data-roleid',window.sessionStorage['roleNameId']);
	$('#institution_type').val(window.sessionStorage['institutionTypeName']);
	$('#institution_type').attr('data-institutionid',window.sessionStorage['institutionTypeNameId']);
	$("#role_list_select2").append('<option value="'+window.sessionStorage['roleNameId']+'">'+window.sessionStorage['roleName']+'</option>');
	//console.debug($role_list_select2)
	//var selectedRoleID = $("#role_list_select2").val();
	//console.debug(selectedRoleID)

	//菜单渲染
	//("#rMenu").empty();
    //renderMenus($("#rMenu"), "/role/generate_menu", {"roleID": selectedRoleID}, false, "rMenuRenderComplete");
    
    //console.debug($("#role_list_select2").select2('option').text);
    //var select=$("#role_list_select2").find('option:selected').text(roleName);
    /*$('#role_name').blur(function(){
    	var roleName=$('#role_name').val();
    })*/
    var role_name=window.sessionStorage['roleName'];
    console.debug(role_name);
	
    //数据修改保存
    $(".btn-save").on('click',function(){
    	var roleName=$('#role_name').val();
    	var roleId = $("#role_name").attr('data-roleid');
    	var param={
    			roleId:roleId,
    			roleName:roleName,	
    		}
    	console.debug(param)
    	if(role_name===roleName){
    		window.location.href=contextPath+'/role/role_management_page';
    	}else{
    		if (! $('#role-form').valid()) {
                return;
             }
    		roleRequest.get_roledetailRequest(param,function(data){
        		window.location.href=contextPath+'/role/role_management_page'
        	})
    	}
    })
    
    $(window).scroll(function (){
		var scroll_top = $(this).scrollTop();
		console.debug(scroll_top)
		if(scroll_top > 350){
			$(".role_management").addClass('role_management_top');
		}else if(scroll_top < 350){
			$(".role_management").removeClass('role_management_top');
		}
		
	});
    
    //退出详情修改
    $(".btn-close").on('click',function(){
    	window.location.href=contextPath+'/role/role_management_page';
    })
})
