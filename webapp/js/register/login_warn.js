/**
 * @Date:2017/1/19
 * @Author:yugang
 * @Description:登录成功界面
 */
$().ready(function() {
	//判断有无mobile值
	if(!window.sessionStorage["login_mobile"]){
		window.sessionStorage['login_mobile']='';
	}
	
	//入驻成功后回显页面
	var login_warn_dom=$('.login_warn');
	function echoShow(){
		var h='';
		if(window.sessionStorage['login_mobile'] === ''){
			$('.loan-apply').html('贷款资格申请');
		}else if(window.sessionStorage['auditResult'] === 'agree'){
			$('.loan-apply').html('查看申请记录');
			h+='<p class="text-center">您的申请正在审核中。</p>';
			h+='<p class="text-center">请等待工作人员联系，或咨询客服</p>';
			h+='<p class="text-center">热线：400 000 0000</p>';
			$('.base_liquor_benefit').hide();
			login_warn_dom.html(h);
		}else if(window.sessionStorage['auditResult'] === 'return'){
			$('.loan-apply').html('修改申请');
			h+='<p class="text-center">您的申请没有通过审核。</p>';
			h+='<p class="text-center">您可以修改申请信息,或咨询客服</p>';
			h+='<p class="text-center">热线：400 000 0000</p>';
			$('.base_liquor_benefit').hide();
			login_warn_dom.html(h);
		}else if(window.sessionStorage['auditResult'] === 'refuse'){
			$('.loan-apply').html('重新提交申请');
			h+='<p class="text-center">您的申请被拒绝。</p>';
			h+='<p class="text-center">如需帮助；请咨询客服</p>';
			h+='<p class="text-center">热线：400 000 0000</p>';
			$('.base_liquor_benefit').hide();
			login_warn_dom.html(h);
		}
	}
	echoShow()
	//页面初次加载有没有登录
	if(!window.sessionStorage["logined"]||!window.sessionStorage['logined']=='true'){
		window.sessionStorage['logined']='false';
	}
	$('.loan-apply').on('click',function(){
		var loan_apply = $('.loan-apply').html();
		if(loan_apply === '贷款资格申请'){
			if(window.sessionStorage['logined']==='false'){
				var cur_contextPath = contextPath+'/login_page';
		    	window.location.href = cur_contextPath;
		    	window.sessionStorage["unlogined"] = '1';
			}else if(window.sessionStorage['logined']==='true'){
				window.location.href = contextPath+'/win_regist_page';
			}
		}else if(loan_apply === '查看申请记录'){
			window.location.href = contextPath+'/win_register_echo_page';
		}else if(loan_apply === '修改申请'){
			window.location.href = contextPath+'/winmanage/win_modification_page';
		}else if(loan_apply === '重新提交申请'){
			window.location.href = contextPath+'/win_regist_page';
		}
	})
	//console.debug(mobile!=='')
	//用户退出
	var mobile=window.sessionStorage['login_mobile'];
	if(mobile!==''){
		$('.top_loginbar').html('');
		$('.mobile-show').append('<span>'+mobile+'</span><span class="mobile_border"></span>')
		$('.select_img').show();
		slide('.mobile-show','.sign-out')	
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
					window.sessionStorage['logined'] = 'false';
					$('.sign-out').css('display','none');
					login_warn_dom.html('');
					$('.select_img').hide();
					$('.base_liquor_benefit').show();
					$('.loan-apply').html('贷款资格申请');
					$('.bulletin p').show();
					$('.mobile-show').hide();
			}
		})
	})	
});
//登出方法
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
