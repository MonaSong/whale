/*
 * @Author yjx
 * @date 2016-12-12
 * @description 到期解压收货
 * @data object
 * @callback function 
 * @return 
 */
$().ready(function() {
    //判断当前登入身份
    var roleInfo = new Role();
    var roleId = roleInfo.getRoleId();
    var is_system_jc_operator = role.compareTo(roleId, role["jc_system_operator"]);//酒厂业务员
    //添加权限
    function wineryName() {
        if (is_system_jc_operator) { //查看状态时信息为不可写，操作按钮隐藏
            $('[data-operater-bottom]').show();
            $('[data-role="font-length"]').show();
            $('[name=liftingPledge]').hide();
            $('[data-role-name]').hide();
            $('[data-true-name]').hide();
        } else {
            $('select,textarea,input').attr('disabled', '');
            $('.form-group').find('[data-operater-bottom]').hide();
            $('[name=liftingPledge]').show();
            $('[data-role-name]').show();
            $('[data-true-name]').show();
        }
    }
    wineryName();
    
    //点击返回页面跳转
    $('.go_back').on('click',function(){
    	window.location.href = contextPath +'/maturity/maturity_decompression_page';
    });
   $('.btn-operation').on('click',function(){
	   window.location.href = contextPath +'/maturity/maturity_decompression_page';
   });
    //酒厂收货前端验证
    var form_dom = $('#winery-receipt');
    var submit_contract_data_dom = $('[data-id="assistant-audit"]');
    var upload_contract_dom = $('#winery-receipt');
    var contract_rules = {
    		wineryreceipt: {
            required: true
        },

    }
    var contract_msg = {
    		wineryreceipt: {
            required: '请上传附件'
        },
    }
    formValidate(form_dom, contract_rules, contract_msg);

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
    //收货数据回显
    function WineryModule(param) {
        var paramData = param;
        HttpUtils.get_Receipt_delivery(paramData, function(data) {
            var relesaeData = data.data;
            console.debug(relesaeData);
            //判断有没有值
            if(relesaeData.institutionName==null || relesaeData.institutionName==undefined){
            	return
            }else{
                $('[name=liftingPledge]').text('（'+relesaeData.institutionName+'）')
            }
            
            if(relesaeData.userName==null){
            	$('.text-static').hide();
            	$('[name=liftingPledge]').text('');
            }else{
            	$('[data-role-name]').text(relesaeData.roleName);
                $('[data-true-name]').text(relesaeData.userName);
                $('[data-management-time]').text('办理时间：'+relesaeData.time);
                $('[name=liftingPledge]').text('（'+relesaeData.institutionName+'）')
            }
            if(relesaeData.userName!==null){
            	$('.btn-choose').hide();
            }
            
            var need_claim = relesaeData.need_claim;
            need_claim ? claim() : review();
            if (relesaeData.receiptList) {
                var bus_text = relesaeData.receiptList.name;
                var bus_id = relesaeData.receiptList.id;
                var bus_type = relesaeData.receiptList.type;
                setAccessory('[name="wineryreceipt"]', bus_text, bus_id, bus_type, false);
            }
        });
    }
	var maturity_businesskey=window.sessionStorage["maturity-businessKey"];
	if(maturity_businesskey==''||maturity_businesskey == null || maturity_businesskey==undefined ){
	    var businessKey = window.sessionStorage["businessKey"];
	}else{
		var businessKey=maturity_businesskey;
	}
    WineryModule({businessKey});

    //酒厂收货提交数据
    $(".submit-winery").on('click', function() {
        if (!$("#winery-receipt").valid()) {
            return;
        }
        var param = {};
        var maturity_businesskey=window.sessionStorage["maturity-businessKey"];
        var repayment_businessKey=window.sessionStorage["repayment-businessKey"];
        var businessKey=window.sessionStorage["businessKey"];
        if(maturity_businesskey =='' || maturity_businesskey==null ||maturity_businesskey == undefined){
        	var businessKey = window.sessionStorage["businessKey"];
        }else{
        	var businessKey =window.sessionStorage["maturity-businessKey"];
        }
        param.files = ["wineryreceipt"];
        console.debug(param);
        param.inputData = {
            " businessKey": businessKey,
        };
        HttpUtils.get_winery_receipt(param, function(data) {
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