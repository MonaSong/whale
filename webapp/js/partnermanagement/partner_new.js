/**
 * @Date:2016/11/9
 * @Author:yugang
 * @Description:partner_news
 */
$().ready(function() {
	
	//获取合作方类型
	//function renderTypeData(){
	HttpUtils.get_partnertype_data(function(data){
			var typeData = data.data;
				console.debug(typeData);
				var h='';
				$.each(typeData,function(i,item){
					h+='<option value="'+(i+1)+'" id="'+item.id+'">'+item.partnerTypeName+'</option>'
				})
				$("#partnerTypeId").append(h)
		})
	//}
	//renderTypeData();
	

	//新增合作方字段验证
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
            },
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
                minlength: "输入正确的联系方式",
                isMobile: "输入正确的联系方式"
            },
        };
    formValidate(partner_form,partner_rules,partner_messages);
    
    //新增合作方数据保存
	$(".btn-save").click(function(){
		if (! $("#partner-form").valid()) {
            return;
         };
		var partnerName=$("#partnerName").val();
		var partnerTypeId=$("#partnerTypeId").find(" option:selected").attr("id");
		var partnerContacts=$("#partnerContacts").val();
		var partnerContactsNums=$("#partnerContactsNums").val();
		var param={
				partnerName:partnerName,
				partnerTypeId:partnerTypeId,
				partnerContacts:partnerContacts,
				partnerContactsNums:partnerContactsNums
		}
		if(partnerName!=='' && partnerContacts!=='' && partnerContactsNums!==''){
			if(partnerName!=='' && partnerContacts!=='' && partnerContactsNums!==''){
				HttpUtils.get_partnerNew_data(param,function(data){
					window.location.href=contextPath+'/partner/partner_list_page';
				})
			}
		}
	});
	
	//关闭新增合作方
	$(".btn-close").click(function(){
		window.location.href=contextPath+'/partner/partner_list_page'
	})
})