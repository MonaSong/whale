/**
 * @Date:2016/11/11
 * @Author:yugang
 * @Description:机构新增
 */
$().ready(function() {
	
	//获取机构类型
	HttpUtils.get_agencyType_data(function(data){
		var typeData = data.data;
			console.debug(typeData);
			var h='';
			$.each(typeData,function(i,item){
				h+='<option value='+(i+1)+' id="'+item.id+'">'+item.institutionTypeName+'</option>'
			})
			$("#institutionTypeId").append(h)
	});
	
	//状态更改
	$(".agency-status").on('change',function(){
		if($(this).prop("checked")){
			$(this).attr('status','1');
		}else{
			$(this).attr('status','0');
		}
		
	});
	
	//新增机构字段验证
	var agency_form = $('#agency-form')
	var agency_rules = {
		institutionName : {
			required : true,
		},
		institutionAddress : {
            required : true,
        },
        institutionContact : {
            required : true,
        },
        institutionContactNums : {
        	required: true,
            minlength: 11,
            isMobile: true
        },
        institutionTypeId:{
        	required:true,
        	min:1
        }
	};
	var agency_messages = {
			institutionName : {
			required : "机构名称不能为空"
		},
		institutionAddress : {
            required : "机构地址不能为空"
        },
        institutionContact : {
            required : "联系人不能为空"
        },
        institutionContactNums : {
        	required: "联系电话不能为空",
            minlength: "输入正确的手机号码",
            isMobile: "输入正确的手机号码"
        },
        institutionTypeId:{
        	required:"机构类型不能为空",
        	min:"机构类型不能为空"
        }
	};
	formValidate(agency_form,agency_rules,agency_messages)
	
	//存储新增机构
	$(".btn-save").click(function(){
		if (! $('#agency-form').valid()) {
            return;
         }
		var institutionName=$("#institutionName").val();
		var institutionAddress=$("#institutionAddress").val();
		var institutionTypeId=$("#institutionTypeId").find(" option:selected").attr("id");
		var institutionContact=$("#institutionContact").val();
		var institutionContactNums=$("#institutionContactNums").val();
		var institutionStatus=$(".agency-status").attr('status');
		console.debug(institutionStatus)
		var param={
			institutionName:institutionName,
			institutionAddress:institutionAddress,
			institutionTypeId:institutionTypeId,
			institutionContact:institutionContact,
			institutionContactNums:institutionContactNums,
			institutionStatus:institutionStatus
		}
		if(institutionName!=='' && institutionAddress!=='' && institutionContact!=='' && institutionContactNums!=='' && institutionTypeId!==undefined){
			HttpUtils.get_agencyNew_data(param,function(data){
	        	console.debug(data)
	        	window.location.href=contextPath+'/agency/agency_list_page';
	        })
		}
	});
	
	//新增取消
	$(".btn-close").click(function(){
		window.location.href=contextPath+'/agency/agency_list_page';
	})
})