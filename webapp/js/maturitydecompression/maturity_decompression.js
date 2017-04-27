$().ready(function() {
    $('[role="tablist"]>li').on('click',function(){
        $(this).tab('show');
    })
        //权限
    function pledgeInsurance() {
        var pledge_Insurance = false;
        var roleInfo = new Role();
        var roleId = roleInfo.getRoleId();
        var pledge_Insurance = role.compareTo(roleId, role["ly_contract_operator"]);
        var pageCount = null;
        return pledge_Insurance
    }
    //添加权限
    function insuranceParty() {
        var pledge_Insurance = pledgeInsurance();
        if (pledge_Insurance) {
            $('.btn-choose').show();
        } else {
            $('.btn-choose').hide();
            $('.form-data-pane').find('input,textarea').attr('disabled', '');
        };
    }
    insuranceParty();
    
    
    //判断当前登入身份
    var roleInfo = new Role();
    var roleId = roleInfo.getRoleId();
    var is_system_jc_operator = role.compareTo(roleId, role["jc_system_operator"]);//酒厂业务员
    //添加权限
    function wineryName() {
    	var html='';
    	html+='<div class="search-bar">'
        html+='<input type="text" class="form-control search_str" placeholder="还款编号/酒厂名称" name="">'
        html+='<i class="w-icon-search"></i>'
        html+='</div>'
        if (is_system_jc_operator) { //查看状态时信息为不可写，操作按钮隐藏

        } else {
           $('.whale-well-footer').append(html);
        }
    }
    wineryName();
    
    
    
    
    
    
    
    //到期解压数据
    var totalCount = null;
    var size = 10;

    function RendermaturityData(param) {
        var paramData = param;
        HttpUtils.get_maturity_management(paramData, function(data) {
            console.debug('到期解押回显数据');
            console.debug(data);
            if (data !== undefined && data !== '' && data.data !== null && data.data !== undefined) {
                var maturityData = data.data.list.content;
                totalCount = data.data.list.totalPages;
                var status_num = data.data;
                $('[data-status="0"]').find('b').text('（' + status_num.audit + '）');
                $('[data-status="1"]').find('b').text('（' + status_num.end + '）');
                var html = '';
                var curClaim = '';
                var cur_needClaim = data.data.needClaim;
                var no_content_dom=$('.no-content-container');
            	if(totalCount>0){
            		no_content_dom.html('');
            		$('#pageBar').show();
            		$('#user_table').find('thead').hide();
            	}else{
            		$('#user_table').find('thead').show();
            		$('#pageBar').hide();
            		no_content_dom.html(no_content_html)
            	}
                
                
                $.each(maturityData, function(i, item) {
                    html += '<div class="data-list clearfix">';
                    var bg_color = '';
                    var text_maturity='';
                    if(item.receiptTime==null){               
                      bg_color = 'bage-blue';
                    }else if(item.receiptTime!==null){
                        bg_color = 'bage-green'; 
                    }
                    html += '<div class="data-list-heading"> <h4 class="data-list-title"> 解押编号：<b>' + item.businessKey + '</b><b class="col-md-offset-1 red">'+text_maturity+'</b></h4> </div>';
                    html += '<div class="data-list-body clearfix"><div class="data-list-left pull-left">';
                    var auditStatus = '';
                    var closematurityRoleName = '';
                    if (item.startTime !== null && item.closePolicyTime == null) {
                        closematurityRoleName = '解除保单',
                        maturity_link= contextPath+'/maturity/release_policy_page';
                            auditStatus = '履约保险方操作员，办理中'
                    }else if (item.startTime !== null && item.closePolicyTime !== null && item.closePledgeTime == null && item.receiptTime == null) {
                        	closematurityRoleName = '解除质押',
                        	maturity_link= contextPath+'/maturity/lifting_of_pledge_page';
                            auditStatus = "监管方操作员，办理中"
                    } else if (item.startTime !== null && item.closePolicyTime !== null && item.closePledgeTime !== null && item.receiptTime == null) {
                        	closematurityRoleName = '收货',
                        	maturity_link= contextPath+'/maturity/winery_receipt_page';
                            auditStatus = "酒厂业务员，办理中"
                    }else if(item.startTime !== null && item.closePolicyTime !== null && item.closePledgeTime !== null && item.receiptTime != null){
                    	 closematurityRoleName = '收货',
                    	 maturity_link = contextPath+'/maturity/winery_receipt_page';
                         auditStatus = "已解押"
                    }
                    var processInstanceId=item.processInstanceId;
                    
                    html += '<a class="whale-bage '+bg_color+(cur_needClaim[item.processInstanceId]?' needclaim':'')+' skip-page skip-bage" href="javascript:void(0)" data-start-businesskey="'+item.repaymentBusinesskey+'" data-ref="'+maturity_link+'" data-businesskey="' + item.businessKey + '" data-history-ref="'+contextPath+'/maturity/maturity_decompression_page" data-matuity="' + closematurityRoleName + '">' + closematurityRoleName + '</a>';
                    html += '<span class="records">' + auditStatus + '</span></div><div class="data-list-right clearfix"> <div class="col-md-6 distillery"> <p>还款编号：' +'<b>'+ item.repaymentBusinesskey + '</b>'+'</p>';
                    html += '<p>融资金额：' + renderNum(item.financeAmount) + '元'+'</p>';
                    if( item.repaymentTotalAmount==''){
                        html += '<p>还款总额：' +'0'+ '元' + '</p>';
                    }else{
                        html += '<p>还款总额：' + renderNum(item.repaymentTotalAmount) + '元' + '</p>';
                    }
                    html += '</div><div class="col-md-6 distillery"> <p>酒厂名称：' + item.wineryName + '</p> <p>融资期限：' + item.financeDeadline + '年期' + '</p> <p>已还总额：' + renderNum(item.hadRepaymentTotalAmount) + '元' + '</p></div></div> </div> </div> </div>'
                });
                $('#maturity_decompression').html(html);
                skipPage();
            }
        })
    }
    //初次加载数据
    function MaturityListData(search_text,status_num,page_num) {
    	 $('#my-work-ct>ul>li[data-status="'+status_num+'"]').addClass('active').siblings().removeClass('active');
        RendermaturityData({
            search: search_text,
            status: status_num,
            page: page_num-1,
            size: size
        });
        new PageBar('#pageBar', totalCount, function(curPageNo) {
            var paramData = {}
            paramData.search = search_text;
            paramData.status = status_num;
            paramData.page = (curPageNo - 1);
            paramData.size = size;
            RendermaturityData(paramData);
        },page_num);
    }
    var init_status = window.sessionStorage["listStatus"]?window.sessionStorage["listStatus"]:'0';
    var init_page_no = window.sessionStorage["listPageNo"]?window.sessionStorage["listPageNo"]:1;
    MaturityListData('',init_status,init_page_no);
    //点击状态加载不同数据
    var data_status = null;
    $('#my-work-ct>ul>li').on('click', function() {
            var status = $(this).attr('data-status');
            window.sessionStorage.clear();
            window.sessionStorage["listStatus"] = status;
            RendermaturityData({
                search: '',
                status: status,
                page: '0',
                size: size
            });
            
            new PageBar('#pageBar', totalCount, function(curPageNo) {
                var paramData = {}
                paramData.search = "";
                paramData.status = status;
                paramData.page = (curPageNo - 1);
                paramData.size = size;
                RendermaturityData(paramData);
            });
        })
        //用户数据模糊查询
    $(".w-icon-search").click(function() {
        var status = $('#my-work-ct>ul>li.active').attr('data-status');
        var search = $.trim($(".search_str").val());
        RendermaturityData({
            search: search,
            status: status,
            page: 0,
            size: size
        });
        var maturity_pageBar=$(".data-list-body").html()===undefined;
        if(maturity_pageBar){
        	$('#pageBar').hide();
        }else{
        	$('#pageBar').show();
        }
        new PageBar('#pageBar', totalCount, function(curPageNo) {
            var paramData = {}
            paramData.search = search;
            paramData.status = status;
            paramData.page = (curPageNo - 1);
            paramData.size = size;
            RendermaturityData(paramData);
        });
    });

    //跳转页面
    function skipPage(){
         $('.skip-page').on('click',function(){
             //记录当前的状态和页码
             var list_status = $('#my-work-ct>ul>li.active').attr('data-status');
             var list_page_no = parseInt($('#pageBar li.active').text());
             window.sessionStorage["listStatus"] = list_status;
             window.sessionStorage["listPageNo"] = list_page_no;
        	 
            var cur_href = $(this).attr('data-ref');
            var historyRef = $(this).attr('data-history-ref');
            window.sessionStorage["businessKey"] = $(this).attr('data-businessKey');
            window.sessionStorage["repayment-businessKey"]=$(this).attr('data-businessKey');
            window.sessionStorage["start-businessKey"] = $(this).attr('data-start-businesskey');
            window.sessionStorage["historyRef"] = historyRef;//历史地址
            window.location.href = cur_href;
         });
    }
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
})