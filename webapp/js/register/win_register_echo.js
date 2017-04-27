/**
 * @Date:2017/1/22
 * @Author:yugang
 * @Description:酒厂入驻信息回显
 */
$().ready(function() {
	//地址
	$("#companyProvince").select2({
        width: "150px"
    });
    $("#companyCity").select2({
        width: "150px"
    });
    $('#companyProvince').find('option[value="1"]').attr('selected',true);
    $('.select2-selection').addClass('select2-select-back_color');
    $('.select2-selection__rendered').addClass('select2-select_font');
    $('#companyProvince').attr('disabled','disabled');
    $('#companyCity').attr('disabled','disabled');
    //信息回显
    var wineryId=window.sessionStorage['wineryInfoId'];
    var param={
    		wineryId:wineryId
    }
    HttpUtils.get_windataEcho_data(param,function(data){
    	var returnData=data.data;
    	console.debug(returnData)
    	var type=returnData.winery.wineryLivePic.type;
    	var url=contextPath+'/accessory/download/'
    	$("#username").val(returnData.userName);
    	$("#mobile").val(returnData.mobile);
    	$("#trueName").val(returnData.trueName);
    	$("#userDuty").val(returnData.userDuty);
    	$("#inviteCode").val(returnData.invitationCode);
    	$("#companyName").val(returnData.winery.companyName);
        $.initProv("#companyProvince", "#companyCity", returnData.winery.companyProvince, returnData.winery.companyCity);
    	$("#companyAddress").val(returnData.winery.companyAddress);
    	$("#businessLicenseNum").val(returnData.winery.businessLicenseNum);
    	$('.bussinessLicense').parent().parent().find('#register-view').html('<img class="img" data-name='+returnData.winery.bussinessLicense.name+' src="'+(url+returnData.winery.bussinessLicense.id)+'" onClick="show_img_modal(this)" alt="" width="102" height="102"/>');
    	$('.taxRegistration').parent().parent().find('#register-view').html('<img class="img" data-name='+returnData.winery.taxRegistration.name+' src="'+(url+returnData.winery.taxRegistration.id)+'" onClick="show_img_modal(this)" alt="" width="102" height="102"/>');
    	$('.legalFrontCardPic').parent().parent().find('#register-view').html('<img class="img" data-name='+returnData.winery.legalFrontCardPic.name+' src="'+(url+returnData.winery.legalFrontCardPic.id)+'" onClick="show_img_modal(this)" alt="" width="102" height="102"/>');
    	$('.legalBackCardPic').parent().parent().find('#register-view').html('<img class="img" data-name='+returnData.winery.legalBackCardPic.name+' src="'+(url+returnData.winery.legalBackCardPic.id)+'" onClick="show_img_modal(this)" alt="" width="102" height="102"/>');
    	if(type === 'jpg' || type === 'png' || type === 'gif' || type === 'jpeg' || type === 'bmp'){
    		$('.wineryLivePic').parent().parent().find('#register-view').html('<img class="img" data-name='+returnData.winery.wineryLivePic.name+' src="'+(url+returnData.winery.wineryLivePic.id)+'" onClick="show_img_modal(this)" alt="" width="102" height="102"/>');
    	}else{
    		$('.wineryLivePic').parent().parent().find('#register-view').html('<a class="img filed" href="'+(url+returnData.winery.wineryLivePic.id)+'" download="true">'+returnData.winery.wineryLivePic.name+'</a>')
    	}
    	
    })
    
  //用户退出
	var mobile=window.sessionStorage['login_mobile'];
	if(mobile!==''){
		$('.top_loginbar').html('');
		$('.top_loginbar').html(mobile);
		$('.select_img').show();
		slide('.top-operator','.sign-out')	
	}
	$("body").bind("click", function(){
        $(".sign-out").hide();
    });
	$('.sign-out').on('click',function(ev){
		ev.stopPropagation();
		console.debug(HttpUtils.get_out_data);		
		$.ajax({
			type:'get',
			url:contextPath+'/logout.json',
			data:'',
			success:function(data){						
					var str='';
					str+='<span>请</span>';
					str+='<a href="'+contextPath+'/login_page" class="blue userlogin">登录</a>';
					str+='<a href="javascript:void(0)" class="small-slash">/</a>';
					str+='<a href="'+contextPath+'/user_register_page" class="blue userRegister">注册</a>';
					$('.top_loginbar').html(str);
					window.sessionStorage['login_mobile'] = '';
					window.sessionStorage['auditResult'] = '';
					window.sessionStorage['logined'] = 'false';
					$('.sign-out').css('display','none');
					$('.select_img').hide();
					var cur_contextPath = contextPath || '/';
			    	window.location.href = cur_contextPath;
			}
		})
	})
	//回到首页
		$('.backLogin').on('click',function(){
	    	var cur_contextPath = contextPath || '/';
	    	$(this).attr('href',cur_contextPath)
	    })
})
//查看大图
function show_img_modal(targetName){			
	var cur=$(targetName).attr('src');
	var fileName=$(targetName).attr('data-name');
	var html = '';
    html+='<div class="modal fade" id="repay-pic" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
    html+='<div class="modal-dialog">';
    html+='<div class="modal-content">';
    html+='<div class="modal-header">';
    html+='<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
    html+='<h4 class="modal-title" id="myModalLabel">图片预览</h4>';
    html+='</div>';
    html+='<div class="modal-body center">';
    html+='<img src="'+cur+'" width="300px" height="auto">';
    html+='<p class="center">点击下载图片：<a href="'+cur+'" download="'+fileName+'">'+fileName+'</a></p>';
    html+='</div>';
    html+='<div class="modal-footer">';
    html+= '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>';
    html+='</div>';
    html+='</div>';
    html+='</div>';
    html+='</div>';
    if($('#repay-pic').length>0){
        $('#repay-pic').detach();
    }		        
    $('body').append(html);
    $('#repay-pic').modal('show');
}
//登出
function slide(dom1,dom2){
	var totargle=1;
		$(dom1).click(function(ev){
			ev.stopPropagation();
			if(totargle==1){
				totargle=0;
				$(dom2).slideToggle(10,function(){
					totargle=1;
				})
			}
		})
}