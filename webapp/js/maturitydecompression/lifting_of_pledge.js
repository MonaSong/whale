/*
 * @Author yjx
 * @date 2016-12-12
 * @description 解除质押
 * @data object
 * @callback function 
 * @return 
 */
$().ready(function() {
    
    //判断当前登入身份
    var roleInfo = new Role();
    var roleId = roleInfo.getRoleId();
    var is_jc_operator = role.compareTo(roleId, role["jg_operator"]);//监管方操作员
    //添加权限
    function liftingRender() {
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
    
    liftingRender();
    
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
    //前端验证
    var form_dom = $('[data-id="lifting-pledge-form"]');
    var submit_lifting_dom = $('[data-id="lifting-pledgeList"]');
    var lifiting_pledge_dom = $('[data-id="lifting-pledge-form"]');
    var lifiting_rules = {
        wineryreceipt: {
            required: true
        },
        wineNumber: {
            required: true
        },
        closePledgeDate: {
            required: true
        },
        receiver:{
            required: true
        },
        wineryLivePic: {
            required: true
        }
    }
    var lifiting_msg= {
        wineryreceipt: {
            required: '收货照片必须传'
        },
        wineNumber: {
            required: '基酒数量必须填'
        },
        closePledgeDate: {
            required: '解压日期必须填'
        },
        receiver: {
            required: '签收人必须填'
        },
        wineryLivePic: {
            required: '请上传附件'
        }
    }
    formValidate(form_dom, lifiting_rules, lifiting_msg);

//图片回显方法
    function claim() {
        (typeof $('input,select,textarea').attr('disabled') !== 'undefined') ? $('input,select,textarea').removeAttr('disabled'): ''
        $('[data-operater-bottom]').show();
    }

    function review() {
        $('input,select,textarea').attr({ 'disabled': ''});
        $('[data-operater-bottom]').hide();
    }
//解除质押数据回显
    function liftingPledge(param) {
        var paramData = param;
        HttpUtils.get_maturity_dataEcho(paramData, function(data) {
            if (data !== undefined && data !== '' && data.data !== null && data.data !== undefined) {
                var relesaeData = data.data;
                console.debug(relesaeData);
                $('[name=businessKey]').text(relesaeData.pledgeBusinesske);
                $('[name=wineNumber]').val(relesaeData.wineNumber);
                $('[name=receiver]').val(relesaeData.userName);
                $('[name=closePledgeDate]').val(relesaeData.time);
                //办理结束再次查看不能编辑
                if(relesaeData.userName!==null){
                	$('.btn-choose').hide();
                	$('select,textarea,input').attr('disabled', '');
                }
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
                    setAccessory('[name="wineryLivePic"]', bus_text, bus_id, bus_type, false);
                }
            }
        })
    }
	var maturity_businesskey=window.sessionStorage["maturity-businessKey"];
	if(maturity_businesskey==''||maturity_businesskey == null || maturity_businesskey==undefined ){
	    var businessKey = window.sessionStorage["businessKey"];
	}else{
		var businessKey=maturity_businesskey;
	}
    liftingPledge({
        businessKey
    });
    
    
    
    //解除质押数据提交
    $('.submit-pledge').on('click', function() {
        if (!$("#lifting-pledge").valid()) {
            return;
        }
        var closePledgeDate = $('[name=closePledgeDate]').val();
        var receiver = $('[name=receiver]').val();
        var wineNumber = $('[name=wineNumber]').val();
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
        param.files = ["wineryLivePic"];
        param.inputData = {
            closePledgeDate: closePledgeDate,
            receiver: receiver,
            businessKey: businessKey,
            wineNumber: wineNumber
        }
        console.debug(param);
        HttpUtils.get_lifting_pledge(param, function(data) {
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