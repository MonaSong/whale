/**
 * @Date:2016/11/10
 * @Author:yugang
 * @Description:win_regester_modificat
 */
$().ready(function() {
    $("#companyProvince").select2({
        width: "150px"
    });
    $("#companyCity").select2({
        width: "100px"
    });
    $('#companyProvince').find('option[value="1"]').attr('selected',true);
    $('.select2-selection__rendered').addClass('select2-select_font');
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
    
    //图片回显
    function claim() {
        (typeof $('input,select,textarea').attr('disabled') !== 'undefined') ? $('input,select,textarea').removeAttr('disabled'): ''
        $('[data-operator]').show();
    }

    function review() {
        $('input,select,textarea').attr({
            'disabld': ''
        })
        $('[data-operator]').hide();
    }
    
    //数据回显
    var wineryId=window.sessionStorage['wineryId'];
    $('.detail_reason').html('<p>'+window.sessionStorage['reason']+'</p>')
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
    	$('[data_name="licenseImg"]').parent().find('#register-view').html('<img class="img" data-name='+returnData.winery.bussinessLicense.name+' src="'+(url+returnData.winery.bussinessLicense.id)+'" onClick="show_img_modal(this)" alt="" width="102" height="102"/><span class="sign" data-role="delete-file" onclick="javascript:remove_img(this)">&times;<span>');
    	$('[data_name="taxImg"]').parent().find('#register-view').html('<img class="img" data-name='+returnData.winery.taxRegistration.name+' src="'+(url+returnData.winery.taxRegistration.id)+'" onClick="show_img_modal(this)" alt="" width="102" height="102"/><span class="sign" data-role="delete-file" onclick="javascript:remove_img(this)">&times;<span>');
    	$('[data_name="cardFaceImg"]').parent().find('#register-view').html('<img class="img" data-name='+returnData.winery.legalFrontCardPic.name+' src="'+(url+returnData.winery.legalFrontCardPic.id)+'" onClick="show_img_modal(this)" alt="" width="102" height="102"/><span class="sign" data-role="delete-file" onclick="javascript:remove_img(this)">&times;<span>');
    	$('[data_name="cardBackImag"]').parent().find('#register-view').html('<img class="img" data-name='+returnData.winery.legalBackCardPic.name+' src="'+(url+returnData.winery.legalBackCardPic.id)+'" onClick="show_img_modal(this)" alt="" width="102" height="102"/><span class="sign" data-role="delete-file" onclick="javascript:remove_img(this)">&times;<span>');
    	if(type === 'jpg' || type === 'png' || type === 'gif' || type === 'jpeg' || type === 'bmp'){
    		$('[data_name="liveImg"]').parent().find('#register-view').html('<img class="img" data-name='+returnData.winery.wineryLivePic.name+' src="'+(url+returnData.winery.wineryLivePic.id)+'" onClick="show_img_modal(this)" alt="" width="102" height="102"/><span class="sign" data-role="delete-file" onclick="javascript:remove_img(this)">&times;<span>');
    	}else{
    		$('[data_name="liveImg"]').parent().find('#register-view').html('<a class="img filed" href="'+(url+returnData.winery.wineryLivePic.id)+'" download="true">'+returnData.winery.wineryLivePic.name+'</a><span class="sign" data-role="delete-file" onclick="javascript:remove_img(this)">&times;<span>')
    	}
    	$('.bussinessLicense').attr('data_upload','already_uploaded');
    	$('.taxRegistration').attr('data_upload','already_uploaded');
    	$('.legalFrontCardPic').attr('data_upload','already_uploaded');
    	$('.legalBackCardPic').attr('data_upload','already_uploaded');
    	$('.wineryLivePic').attr('data_upload','already_uploaded');
    });
    
  //自定义validate扩展方法
    $.validator.addMethod("licenseNum", function(value, element) {
        var length = value.length;
        var verify = /^([0-9]{15})$/;
        var Verify = /^([0-9]{18})$/;
        return this.optional(element) || ((length == 15 || length ==18) && (verify.test(value) || Verify.test(value)));
    }, "输入正确的营业执照号码");
    //验证
    var modifyform = $('#register-form');
    var modifyrules = {
    		licenseImg:{
				required: true			
			},
			taxImg:{
				required: true
			},
			cardFaceImg:{
				required: true
			},
			cardBackImag:{
				required: true
			},
			liveImg:{
				required: true
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
            	licenseNum:true
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
        };
    var modifymessages = {
    		licenseImg:{
    			required: '请上传图片',
    		},
    		taxImg:{
    			required: '请上传图片',
    		},
    		cardFaceImg:{
    			required: '请上传图片',
    		},
    		cardBackImag:{
    			required: '请上传图片',
    		},
    		liveImg:{
    			required: '请上传图片或附件',
    		},
    		companyName: {
                required: "输入单位全称，最长30个字符",
                maxlength: "超出输入范围，不超过30个字符"
            },
            companyAddress: {
                required: "输入联系地址，最长30个字符",
                maxlength: "超出输入范围，不超过30个字符"
            },
            businessLicenseNum: {
            	licenseNum: "输入正确的营业执照号码"
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
        };
    formValidate(modifyform,modifyrules,modifymessages);
    
    //数据提交
    $(".submit-file").on('click',function(){
    	if (! $("#register-form").valid()) {
            return;
         }
    	if($(".submit-file").attr('disabled') === 'disabled'){
    		return;
    	}
    		var companyName=$("#companyName").val();
            var companyAddress=$("#companyAddress").val();
            var companyProvince=$("#companyProvince").find(" option:selected").text();
            var companyCity=$("#companyCity").find(" option:selected").text();
            var businessLicenseNum=$("#businessLicenseNum").val();
            var mobile=$('#mobile').val();
            var trueName=$('#trueName').val();
            var userDuty=$('#userDuty').val();
            console.debug(companyProvince);
            var param = {};
        	console.debug(wineryId)
            param.files = [];
        	param.fileNames = [];
        	if($('.licenseImg').val() !== undefined){
        		param.files.push('licenseImg');
        		param.fileNames.push('licenseImg');
        	}
        	if($('.taxImg').val() !== undefined){
        		param.files.push('taxImg');
        		param.fileNames.push('taxImg');
        	}
        	if($('.cardFaceImg').val() !== undefined){
        		param.files.push('cardFaceImg');
        		param.fileNames.push('cardFaceImg');
        	}
        	if($('.cardBackImag').val() !== undefined){
        		param.files.push('cardBackImag');
        		param.fileNames.push('cardBackImag');
        	}
        	if($('.liveImg').val() !== undefined){
        		param.files.push('liveImg');
        		param.fileNames.push('liveImg');
        	}
        	param.inputData = {
                	"mobile":mobile,
                	"trueName":trueName,
                	"userDuty":userDuty,
        			"wineryId":wineryId,
                    "companyName": companyName,
                    "companyAddress": companyAddress,
                    "companyProvince": companyProvince,
                    "companyCity": companyCity,
                    "businessLicenseNum": businessLicenseNum
            };
        	console.debug(param)
        	HttpUtils.get_windataSubmit_data(param,function(data){
            	$("#sucess").modal('show');
            	window.sessionStorage['wineryInfoId']=data.data.wineryInfoId;
            })
    })
    $('#sucess').on('hide.bs.modal',function(){
    	var cur_contextPath = contextPath || '/';
    	window.location.href = cur_contextPath;
    	//window.sessionStorage['mobile']='';
    	window.sessionStorage['logined']='false'
    	window.sessionStorage['auditResult']='agree'
    	
    })
    
  //用户退出
	var mobile=window.sessionStorage['login_mobile'];
	if(mobile!==''){
		$('.top_loginbar').html('');
		$('.top_loginbar').html(mobile)
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

//显示图片
		function readFile(domClick){ 
			//var _this=this
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
		    		$(domClick).parent().parent().find('#register-view').html('<a class="img filed" download="true">'+fileName+'</a><span class="sign" data-role="delete-file" onclick="javascript:remove_img(this)">&times;<span>');
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
			var domName = $(targetName).parent().parent().find('.upfilebox').attr('data_name');
			dom_show(domName,targetName);
			$(targetName).parent().parent().find('.lable').css('opacity',1);
		}
		
		function dom_show(domName,targetName){
			if($(targetName).parent().parent().find('.upfilebox').attr('data_name') === domName){
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
		