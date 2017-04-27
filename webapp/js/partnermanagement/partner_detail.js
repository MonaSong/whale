/**
 * @Date:2016/11/9
 * @Author:yugang
 * @Description:partner_detail
 */
$().ready(function() {
	//回显合作方数据
	$("#partnerName").val(window.sessionStorage['partnerName']);
	$("#partnerName").attr("partnerId",window.sessionStorage['partnerNameId'])
	$("#partnerContacts").val(window.sessionStorage['partnerContacts']);
	$("#partnerContactsNums").val(window.sessionStorage['partnerContactsNums']);
	//var partnerTypeId=window.sessionStorage['parnerTypeNameId']
	$("#partner_type").append('<option partnerTypeId="'+window.sessionStorage['parnerTypeNameId']+'">'+window.sessionStorage['parnerTypeName']+'</option>')
	
	//获取合作方类型
	function renderTypeData(){
		HttpUtils.get_partnertype_data (function(data){
			var typeData = data.data;
			console.debug(typeData);
			var h='';
			$.each(typeData,function(i,item){
				console.debug(item["id"])
				h+='<option partnerTypeId="'+item.id+'">'+item.partnerTypeName+'</option>';
			})
			$("#partner_type").append(h)
			selectRemove();
		});
	}
	renderTypeData();
	
	//合作方去重
	function selectRemove(){
		$("#partner_type option").each(function() {
	        var text = $(this).text();
	        if($("#partner_type option:contains("+text+")").length > 1){
	        	$("#partner_type option:contains("+text+"):gt(0)").remove();
	        }
	            
	    });
	}
	
	//手机号验证
	jQuery.validator.addMethod("isMobile", function(value, element) {
        var length = value.length;
        var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    }, "请正确填写您的手机号码");
	
	//合作方详情字段验证
	var partner_form = $('#partner-form');
    var partner_rules = {
    		partnerName : {
                required : true,
            },
            partnerContacts : {
                required : true,
            },
            partnerContactsNums : {
            	required: true,
                minlength: 11,
                isMobile: true
            }
        }
    var partner_messages = {
    		partnerName : {
                required : "合作方名称不能为空"
            },
            partnerContacts : {
                required : "联系人不能为空"
            },
            partnerContactsNums : {
            	required: "联系方式不能为空",
                minlength: "输入正确的手机号码",
                isMobile: "输入正确的手机号码"
            }
        }
    
    formValidate(partner_form,partner_rules,partner_messages);
    
    //合作方详情数据修改保存
	$(".btn-save").click(function(){
		if (! $("#partner-form").valid()) {
            return;
         };
		var partnerName=$("#partnerName").val();
		var partnerId=$("#partnerName").attr("partnerId");
		var partnerTypeId=$("#partner_type").find(" option:selected").attr("partnerTypeId");
		var partnerContacts=$("#partnerContacts").val();
		var partnerContactsNums=$("#partnerContactsNums").val();
		var param={
				partnerName:partnerName,
				partnerId:partnerId,
				partnerTypeId:partnerTypeId,
				partnerContacts:partnerContacts,
				partnerContactsNums:partnerContactsNums
		}
		if(partnerName!=='' && partnerContacts!=='' && partnerContactsNums!==''){
			HttpUtils.get_partnerdetail_data(param,function(data){
				window.location.href=contextPath+'/partner/partner_list_page';
			})
		}		
	});
	
	//关闭详情界面
	$(".btn-close").click(function(){
		window.location.href=contextPath+'/partner/partner_list_page'
	});
})