/**
 * @Author yugang
 * @date 2016-11-14
 * @description 机构详情
 */
$().ready(function() {
	//机构详情数据回显
	$('#agency_type').val(window.sessionStorage['institutionTypeName']);
	$('#agency_type').attr("institutionTypeId",window.sessionStorage['institutionTypeNameId']);
	$('#agency_name').val(window.sessionStorage['institutionName']);
	$('#agency_name').attr("institutionId",window.sessionStorage['institutionNameId']);
	$('#institutionContact').val(window.sessionStorage['institutionContacts']);
	$('#institutionContactNums').val(window.sessionStorage['institutionContactsNums']);
	$('#institutionAddress').val(window.sessionStorage['institutionAdress'])
	$('#agency_status').attr("status",window.sessionStorage['institutionStatus'])
	//console.debug(window.sessionStorage['institutionStatus'])
	if($('#agency_status').attr('status')==='1'){
		$('#agency_status').attr('checked','checked');
	}else{
		$('#agency_status').removeAttr('checked');
	}
	if($('#agency_type').val()==='融资方'){
		$('#institutionContact').attr('disabled','disabled');
		$('#institutionContactNums').attr('disabled','disabled');
	}
	
	//验证
	var agency_form = $('#agency-form')
	var agency_rules = {
		agency_address : {
            required : true,
        },
        agency_contact : {
            required : true,
        },
        agency_phone : {
        	required: true,
            minlength: 11,
            isMobile: true
        }
	};
	var agency_messages = {
		agency_address : {
            required : "机构地址不能为空"
        },
        agency_contact : {
            required : "联系人不能为空"
        },
        agency_phone : {
        	required: "联系电话不能为空",
            minlength: "输入正确的手机号码",
            isMobile: "输入正确的手机号码"
        }
	};
	formValidate(agency_form,agency_rules,agency_messages);
	
	//状态更改
	$("#agency_status").on('change',function(){
		if($(this).prop("checked")){
			$(this).attr('status','1');
		}else{
			$(this).attr('status','0');
		}
		
	});
	//机构详情数据修改保存
	$('.btn-save').on('click',function(){
		if (! $('#agency-form').valid()) {
            return;
         }
		var institutionName = $('#agency_name').val();
		var institutionTypeId = $('#agency_type').attr('institutionTypeId');
		var institutionId = $('#agency_name').attr('institutionId');
		var institutionAddress = $('#institutionAddress').val();
		var institutionContact = $('#institutionContact').val();
		var institutionContactNums = $('#institutionContactNums').val();
		var institutionStatus = $('#agency_status').attr('status');
		//console.debug(institutionStatus);
		var param={
			institutionId:institutionId,
			institutionAddress:institutionAddress,
			institutionContact:institutionContact,
			institutionContactNums:institutionContactNums,
			institutionName:institutionName,
			institutionTypeId:institutionTypeId,
			institutionStatus:institutionStatus
		}
		HttpUtils.get_agencydetail_data(param,function(data){
			window.location.href=contextPath+'/agency/agency_list_page';
		})
	})
	
	//取消详情修改
	$('.btn-close').on('click',function(){
		window.location.href=contextPath+'/agency/agency_list_page';
	})
	
})