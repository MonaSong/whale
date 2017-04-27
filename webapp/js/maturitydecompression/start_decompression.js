/*
 * @Author yjx
 * @date 2016-12-12
 * @description 启动解压
 * @data object
 * @callback function 
 * @return 
 */
$().ready(function() {
    //判断当前登入身份
        var roleInfo = new Role();
        var roleId = roleInfo.getRoleId();
        var zf_management_operator = role.compareTo(roleId, role["zf_management_operator"]); //资方操作员
    //添加权限
    function StratName() {
        //点击跳转到编辑质押物信息页面
        $('.skip-page').on('click', function() {
            window.location.href = contextPath + '/overdue/overdue_detail_page';
        });
        if (zf_management_operator) { //查看状态时信息为不可写，操作按钮隐藏
            $('[data-operater-bottom]').show();
            $('[data-role="font-length"]').show();
        } else {
            $('select,textarea,input').attr('disabled', '');
            $('.form-group').find('[data-operater-bottom]').hide();
        }
    }
    StratName();
    

    
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
    
    //判断当前登入身份
    function startdecompression() {
        var start_decompression = false;
        var roleInfo = new Role();
        var roleId = roleInfo.getRoleId();
        var start_decompression = role.compareTo(roleId, role["jg_operator"]); //监管方操作员
        var pageCount = null;
        return start_decompression
    }
    //添加权限
    function startRender() {
        var start_decompression = startdecompression();
        if (start_decompression) { //查看状态时信息为不可写，操作按钮隐藏
        	$('#stat_pression').hide();
        	$('[data-management-info]').hide();
        	var html='';
        	html+='<span class="start_img"></span>'
        	html+='<div class="no_permissions">'
        	html+='<div class="start_content"><p>本步骤已办理完毕。</p><p>您所在的机构没有权限查看本页内容。</p></div>'
        	html+='</div>'
        	$('.start-content').html(html);
        } else {
        }
    }
    startRender();
    
    
    //点击返回页面跳转
    $('.go_back').on('click',function(){
    	window.location.href = contextPath +'/maturity/maturity_decompression_page';
    });
    $('.btn-operation').on('click',function(){
 	   window.location.href = contextPath +'/repayment/repayment_page';
    });
    //启动解押数据回显
    function startdecompressionData(param) {
        var paramData = param;
        HttpUtils.get_starting_Solution(paramData, function(data) {
            if (data !== undefined && data !== '' && data.data !== null && data.data !== undefined) {
            	
                var startData = data.data;
                if(startData.userName==null){
                	$('.text-static').hide();
                	$('[name=liftingPledge]').text('');
                }else{
                	$('[data-role-name]').text(startData.roleName);
                    $('[data-true-name]').text(startData.userName);
                    $('[data-management-time]').text('办理时间：'+startData.time);
                    $('[name=liftingPledge]').text('（'+startData.capitalName+'）'); 
                }
                $('[name=liftingPledge]').text('（'+startData.capitalName+'）'); 
                var caipitalName=$('[name=liftingPledge]').text()==='（'+undefined+'）';
                if(caipitalName){
                	$('[name=liftingPledge]').text('');
                }
                var startName=$('.startName').text();
                if(startName){
                	$('.btn-choose').hide();
                }else{
                	$('.btn-choose').show();
                }
                if(startData.repaymentTotalAmount=='' || startData.alreadyRepaymentAmount==null){
                	$('[name=repaymentBusinessKey]').text(startData.repaymentBusinessKey);
                	$('[name=wineryCompanyName]').text(startData.wineryCompanyName);
                	$('[name=loanCompanyName]').text(startData.loanCompanyName );
                	$('[name=loanAmoun]').text(renderNum(startData.loanAmoun) + '元')
                	$('[name=alreadyRepaymentAmount]').text( + '0' + '元')
                	$('[name=repaymentTotalAmount]').text(+'0'+ '元')
                }else{
                	$('[name=repaymentBusinessKey]').text(startData.repaymentBusinessKey);
                	$('[name=wineryCompanyName]').text(startData.wineryCompanyName);
                	$('[name=loanCompanyName]').text(startData.loanCompanyName );
                	$('[name=loanAmoun]').text(renderNum(startData.loanAmoun) + '元')
                	$('[name=alreadyRepaymentAmount]').text(renderNum(startData.alreadyRepaymentAmount) + '元')
                	$('[name=repaymentTotalAmount]').text(renderNum(startData.repaymentTotalAmount) + '元' )
                }
                if (startData.repaymentStatus == 1) {
                	$('[name=financingPeriod]').text(startData.financingPeriod + '年期' )
                	$('[name=repaymentStatus]').text('欠息');
                } else if (startData.repaymentStatus == 2) {
                   	$('[name=financingPeriod]').text(startData.financingPeriod + '年期' )
                	$('[name=repaymentStatus]').text('已结清');
                } else if (startData.repaymentStatus == 3) {
                   	$('[name=financingPeriod]').text(startData.financingPeriod + '年期' )
                	$('[name=repaymentStatus]').text('逾期');
                } else {
                   	$('[name=financingPeriod]').text(startData.financingPeriod + '年期' )
                	$('[name=repaymentStatus]').text('正常');
                }
            }
        })
    }
    //判断当前节点是否已经启动了解押
	var maturity_businesskey=window.sessionStorage["maturity-businessKey"];
	var repayment_businessKey=window.sessionStorage["repayment-businessKey"];
	var businessKey=window.sessionStorage["businessKey"];
	if(maturity_businesskey== undefined && businessKey == undefined){
	    var businessKey = window.sessionStorage["repayment-businessKey"];;
	}else if(businessKey != undefined && maturity_businesskey!=undefined){
		var businessKey=maturity_businesskey;
	}else if(maturity_businesskey==undefined && repayment_businessKey==undefined){
		var businessKey=window.sessionStorage["businessKey"];
	}
    startdecompressionData({businessKey});
    
    //启动到期解压流程
    $('.Strat-submit').on('click', function(){
        var businessKey = window.sessionStorage["repayment-businessKey"];
        param = {
                businessKey: businessKey
            },
            HttpUtils.get_Start_expire(param, function(data) {
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