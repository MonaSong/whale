/**
 * @Date:2016/10/24
 * @Author:yugang
 * @Description:酒厂入驻申请
 */


$().ready(function() {
    $("#companyProvince").select2({
        width: "150px"
    });
    $("#companyCity").select2({
        width: "150px"
    });
    
    //省市联动
    $.initProv("#companyProvince", "#companyCity", "请选择", "请先选择");
    
    //手机号回显
    $('#mobile').val(window.sessionStorage['login_mobile']);
    
    //checkbox按钮的切换
    $(".check-input").each(function() {
        $(this).click(function() {
            if ($(this).prop("checked") === false) {
            	$(this).removeAttr("checked")
                $(".submit-file").removeClass("btn-type");
                $(".submit-file").attr("disabled", true);
            } else {
            	$(this).attr("checked", "checked")
                $(".submit-file").addClass("btn-type");
                $(".submit-file").removeAttr("disabled");
            }
        })
    })
    //自定义validate扩展方法
    $.validator.addMethod("licenseNum", function(value, element) {
        var length = value.length;
        var verify = /^([0-9]{15})$/;
        var Verify = /^([0-9]{18})$/;
        return this.optional(element) || ((length == 15 || length ==18) && (verify.test(value) || Verify.test(value)));
    }, "输入正确的营业执照号码");
    var registerform = $('#user-register');
    var registerrules = {
    		bussinessLicense:{
				required: true			
			},
			taxRegistration:{
				required: true
			},
			legalFrontCardPic:{
				required: true
			},
			legalBackCardPic:{
				required: true
			},
			wineryLivePic:{
				required: true
			},
            mobile:{
            	required: true,
            	isMobile:true
            },
            trueName: {
                required: true,
                maxlength: 10
            },
            userDuty: {
                maxlength: 15
            },
            inviteCode: {
                required: false,
            },
            companyName: {
                required: true,
                maxlength: 30
            },
            companyAddress: {
                required: true,
                maxlength: 30
            },
            businessLicenseNum: {
            	required:true,
            	licenseNum:true
            }
        };
    
    var registermessages = {
    		bussinessLicense:{
    			required: '请上传图片',
    		},
    		taxRegistration:{
    			required: '请上传图片',
    		},
    		legalFrontCardPic:{
    			required: '请上传图片',
    		},
			legalBackCardPic:{
    			required: '请上传图片',
    		},
    		wineryLivePic:{
    			required: '请上传图片或附件',
    		},
    		mobile:{
            	required: "手机号码不能为空",
            	isMobile: "请填写正确的手机号码"
            },
            trueName: {
                required: "姓名不能为空",
                maxlength: "超出输入范围，不超过10个字符"
            },
            userDuty: {
                maxlength: "超出输入范围，不超过15个字符"
            },
            inviteCode: {
                required: "输入邀请码可以为空",
            },
            companyName: {
                required: "单位全称不能为空",
                maxlength: "超出输入范围，不超过30个字符"
            },
            companyAddress: {
                required: "联系地址不能为空",
                maxlength: "超出输入范围，不超过30个字符"
            },
            businessLicenseNum: {
            	required: "营业执照号码不能为空",
            	licenseNum: "输入正确的营业执照号码"
            }
        };
    
    formValidate(registerform,registerrules,registermessages);
    //cheeck机构
    $("#companyName").blur(function(){
        var companyName=$("#companyName").val();
        if(companyName===''){
        	return
        }
        var param = companyName
        HttpUtils.get_conpanyName_data(param,function(data){
        	console.debug(data);
        	//$('.popover').attr('style','top: -18.5px;left: -129px;display: block')
        })
      });
    
    //提交申请
    $(".submit-file").click(function() {
    	if (! $("#user-register").valid()) {
    		return;
         }else if($(".check-input").attr('checked') === "checked"){
            var param = {};
            param.files = ["bussinessLicense", "taxRegistration", "legalFrontCardPic", "legalBackCardPic", "wineryLivePic"];
            param.fileNames = ["bussinessLicense", "taxRegistration", "legalFrontCardPic", "legalBackCardPic", "wineryLivePic"];
            param.inputData = {
                    "mobile": $("#mobile").val(),
                    "userDuty": $("#userDuty").val(),
                    "trueName": $("#trueName").val(),
                    "inviteCode": $("#inviteCode").val(),
                    "companyName": $("#companyName").val(),
                    "companyAddress": $("#companyAddress").val(),
                    "companyProvince": $("#companyProvince").find(" option:selected").text(),
                    "companyCity": $("#companyCity").find(" option:selected").text(),
                    "businessLicenseNum": $("#businessLicenseNum").val()
            };
            var bussinessLicensefile=$("#bussinessLicense").attr('data_upload');
            var taxRegistrationfile=$("#taxRegistration").attr('data_upload');
            var legalFrontCardPicfile=$("#legalFrontCardPic").attr('data_upload');
            var legalBackCardPicfile=$("#legalBackCardPic").attr('data_upload');
            var wineryLivePicfile=$("#wineryLivePic").attr('data_upload');
            HttpUtils.get_winData_data(param,function(data){
            	if(data.statusCode==='200'){
            		console.debug(data);
            		$("#sucess").modal('show');
            		window.sessionStorage['auditResult']='agree';
            		window.sessionStorage['wineryInfoId']=data.data.wineryInfoId;
            	}
            });
    	}
    });
    
    //提交申请信息确认
    $(".audit-btn").on('click',function(){
    	$("#sucess").modal('hide');
    })
    
    //modal关闭时跳转页面
    $('#sucess').on('hide.bs.modal',function(){
    	console.debug(contextPath);
        var cur_contextPath = contextPath || '/';
    	window.location.href = cur_contextPath;
    	//window.sessionStorage['mobile']='';
    	window.sessionStorage['logined']='false';
    })
		//登出
		if(!window.sessionStorage["login_mobile"]){
			window.sessionStorage['login_mobile']='';
		}
		var mobile=window.sessionStorage['login_mobile']
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
						$('.top-operator').html(str);
						window.sessionStorage['login_mobile'] = '';
						window.sessionStorage['auditResult'] = '';
						window.sessionStorage['logined']='false';
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
//显示图片
function readFile(domClick){ 
	//var _this=this
	console.debug($(domClick))
	console.log($(domClick)[0].files[0])
    var file = $(domClick)[0].files[0];
	var fileSize = (file.size/1024/1024);
    var fileName=file.name;
    var fileExt = fileName.substr(fileName.lastIndexOf(".")).toLowerCase();//文件后缀名
    var dom_id=$(domClick).attr('id');
    if(dom_id === 'bussinessLicense' || dom_id === 'taxRegistration' || dom_id === 'legalFrontCardPic' || dom_id === 'legalBackCardPic'){
    	var fileExp = /.jpg|.jpeg|.gif|.bmp|.pdf|.png/;
		fileExp.test(fileExt)?'':alert('请上传图片文件')
		if(fileExp.test(fileExt)===false){
			return
		}
    }else{
    	var fileExp = /.jpg|.jpeg|.gif|.bmp|.pdf|.png|.rar|.zip/;
		fileExp.test(fileExt)?'':alert('请上传正确格式文件')
		if(fileExp.test(fileExt)===false){
	    	return
	    }
    }
    if(fileSize > 10){
		alert('图片大小已超过限制！');
		return
	}
    var reader = new FileReader();
    reader.readAsDataURL(file);
    console.debug(reader)
    reader.onload = function(e){
    	console.debug($(domClick).parent().parent().find('#repay-view'))
    	if(fileExt==='.jpg' || fileExt==='.jpeg' || fileExt==='.gif' || fileExt==='.bmp' || fileExt==='.png'){
    		$(domClick).parent().parent().find('#register-view').html('<img class="img" data-name='+fileName+' src="'+this.result+'" onClick="show_img_modal(this)" alt="" width="102" height="102"/><span class="sign" data-role="delete-file" onclick="javascript:remove_img(this)">&times;<span>');
    	}else{
    		$(domClick).parent().parent().find('#register-view').html('<a target="_blank" class="img filed" download="true">'+fileName+'</a><span class="sign" data-role="delete-file" onclick="javascript:remove_img(this)">&times;</span>');
    	}
        $(domClick).parent().parent().find('.sign').show();
    } 
    console.log($(this).parent().find('lable'))
    $(domClick).attr('disabled','disabled')
    $(domClick).attr('data_upload','already_uploaded')
    if($(domClick).parent().find('.error').attr("class") === "error"){
    	$(domClick).parent().find('.error').detach();
    }
    $(domClick).parent().find('.lable').css("opacity",0);
}
//删除图片
		function remove_img(targetName){
			$(targetName).hide();
			$(targetName).parent().find('.img').detach();
			var domName = $(targetName).parent().parent().find('input').attr('id');
			dom_show(domName,targetName)		
			$(targetName).parent().parent().find('.lable').css('opacity',1);
		}

		function dom_show(domName,targetName){
			if($(targetName).parent().parent().find('input').attr('id') === domName){
				var h='';
				$(targetName).parent().parent().find('input').detach();
				$(targetName).parent().parent().find('label').remove();
				h+='<input class="form-control '+domName+'" type="file" id="'+domName+'" name="'+domName+'" onchange="readFile(this)">';
				h+='<label class="lable lable-pic"></label>'
				$(targetName).parent().parent().find('.upfilebox').append(h);
			}	
		}
		//查看大图下载
		function show_img_modal(targetName){			
				var cur=$(targetName).attr('src');
				console.debug(cur);
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
