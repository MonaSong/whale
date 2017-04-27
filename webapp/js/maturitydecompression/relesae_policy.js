/*
 * @Author yjx
 * @date 2016-12-12
 * @description 到期解压 解除保单
 * @data object
 * @callback function 
 * @return 
 */
$().ready(function() {

    var roleInfo = new Role();
    var roleId = roleInfo.getRoleId();
    var is_jc_operator = role.compareTo(roleId, role["ly_contract_operator"]);//酒厂业务员
    
    //添加权限
    function relesaeName() {
        //点击跳转到编辑质押物信息页面
        $('.skip-page').on('click', function() {
            window.location.href = contextPath + '/overdue/overdue_detail_page';
        });
        if (is_jc_operator) { //查看状态时信息为不可写，操作按钮隐藏
            $('[data-operater-bottom]').show();
            $('[data-role="font-length"]').show();
        } else {
            $('select,textarea,input').attr('disabled', '');
            $('.form-group').find('[data-operater-bottom]').hide();
        }
    }
    
    relesaeName();
    
    //判断当前登入身份
    var roleInfo = new Role();
    var roleId = roleInfo.getRoleId();
    var is_system_jc_operator = role.compareTo(roleId, role["jc_system_operator"]);//酒厂业务员
    //添加权限
    function wineryName() {
        if (is_system_jc_operator) { //查看状态时信息为不可写，操作按钮隐藏
            $('[name=liftingPledge]').hide();
            $('[data-role-name]').hide();
            $('[data-true-name]').hide();
        } else {
            $('[name=liftingPledge]').show();
            $('[data-role-name]').show();
            $('[data-true-name]').show();
        }
    }
    wineryName();
    
    //点击返回页面跳转
    $('.go_back').on('click',function(){
    	window.location.href = contextPath +'/maturity/maturity_decompression_page';
    })
    
    $('.btn-operation').on('click',function(){
	  window.location.href = contextPath +'/maturity/maturity_decompression_page';
    });
    
    //解除保单前端验证
    var form_dom = $('[data-id="release-form-form"]');
    var submit_relesae_dom = $('[data-id="release-policy"]');
    var release_policy_dom = $('[data-id="release-form-form"]');
    var release_rules = {
        release_policy: {
            required: true
        }
    }
    var release_msg = {
        release_policy: {
            required: '请上传附件'
        }
    }
    formValidate(form_dom, release_rules, release_msg);
    
    function claim() {
        (typeof $('input,select,textarea').attr('disabled') !== 'undefined') ? $('input,select,textarea').removeAttr('disabled'): ''
        $('[data-operator]').show();
    }

    function review() {
        $('input,select,textarea').attr({'disabld': ''})
        $('[data-operator]').hide();
    }

    function RelesaePolicy(param) {
        var paramData = param;
        HttpUtils.get_Release_policy(paramData, function(data) {
            var relesaeData = data.data;
            console.debug(relesaeData);
            //办理结束再次查看不能编辑
            if(relesaeData.userName!==null){
            	$('.btn-choose').hide();
            }
            $('[name=businessKey]').text(relesaeData.pledgeBusinesske);
            $('[name=liftingPledge]').text('（'+relesaeData.institutionName+'）')
            
            if(relesaeData.userName==null){
            	$('.text-static').hide();
            	$('[name=liftingPledge]').text('');
            }else{
            	$('[data-role-name]').text(relesaeData.roleName);
                $('[data-true-name]').text(relesaeData.userName);
                $('[data-management-time]').text('办理时间：'+relesaeData.time);
                $('[name=liftingPledge]').text('（'+relesaeData.institutionName+'）')
            }
            var need_claim = relesaeData.needClaim;
            need_claim ? claim() : review();
            
            if (relesaeData.file) {
                var bus_text = relesaeData.file.name;
                var bus_id = relesaeData.file.id;
                var bus_type = relesaeData.file.type;
                setAccessory('[name="release_policy"]', bus_text, bus_id, bus_type, need_claim);
            }
            
        });
    }
	var maturity_businesskey=window.sessionStorage["maturity-businessKey"];
	if(maturity_businesskey==''||maturity_businesskey == null || maturity_businesskey==undefined ){
	    var businessKey = window.sessionStorage["businessKey"];
	}else{
		var businessKey=maturity_businesskey;
	}
    RelesaePolicy({
            businessKey
        })
        //提交解除保单数据
    $('.release_policy').on('click', function() {
        if (!$("#release-form").valid()) {
            return;
        }
        var param = {};
        /*判断当前那是从哪个入口传入进来的businesskey*/
        var maturity_businesskey=window.sessionStorage["maturity-businessKey"];
        var repayment_businessKey=window.sessionStorage["repayment-businessKey"];
        var businessKey=window.sessionStorage["businessKey"];
        if(maturity_businesskey =='' || maturity_businesskey==null ||maturity_businesskey==undefined){
        	var businessKey = window.sessionStorage["businessKey"];
        }else{
        	var businessKey =window.sessionStorage["maturity-businessKey"];
        }
        param.files = ["release_policy"];
        param.inputData = {
            businessKey: businessKey
        }
        HttpUtils.get_Close_policy(param, function(data) {
            if (data.statusCode == '200') {
            	whaleModal({historyRef:"/maturity/maturity_decompression_page"});
            }
        })
    })
    //还款管理到到期解压
    var menu_list=[];
    function MaturityList(){
        var menuLi = $('#menu ul').find('li')
        var maturityid=window.sessionStorage["maturityDecompressionMenuId"];
        $(menuLi).each(function(){
        	if($(this).attr('data-user-menu-id') == maturityid){
        		$(this).addClass('active').siblings().removeClass('active');
        	}
        })
    }
    MaturityList();
});