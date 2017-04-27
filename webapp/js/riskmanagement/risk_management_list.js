$().ready(function() {
   
    //风险列表数据
    var totalCount = null;
    var size = 10;
    var risk_table_dom = $('#risk_management');
    var start_over_due_btn_dom = $('[data-role="start-overdue"]');
    var role_info = new Role();
    var role_id = role_info.getRoleId();
    var is_zf_operator = role.compareTo(role_id,role["zf_management_operator"])//资方操作员

    var status_text = {
        "0":'审核中',
        "1":'已确认',
        "2":'已关闭'
    }

    function renderRiskData(param){
        var paramData = param;
        var cur_status = paramData.status;
        HttpUtils.get_risk_managementData(paramData, function(data) {
            console.debug('风险管理列表数据'); 
            console.debug(data);
            if(!data){
                return 
            }
            var riskData = data.data.list.content; 
            var need_claim_obj = data.data.needClaim;
            var status_num = data.data;          
            totalCount = data.data.list.totalPages;
            $('[data-status="0"]').find('b').text('（'+status_num.not_end+'）');
    	 	$('[data-status="1"]').find('b').text('（'+status_num.agree+'）');
    	 	$('[data-status="2"]').find('b').text('（'+status_num.refuse+'）');

            if(riskData.length<1){
                risk_table_dom.html('')
                return 
            }
            var cur_status_text = status_text[paramData.status];

            var html = '';
            $.each(riskData, function(i, item) {

                //判断当前节点名称和节点链接
                var end_time = item.endTime;//风险流程结束时间
                var risk_audit_result = item.riskAuditResult;//风险审核已经完成
                var risk_confirm = item.riskConfirmResult//风险确认最后节点的审核结果

                var risk_text = '';
                var risk_link = '';
                var risk_des = '';
                var bg_color = '';

                //节点颜色
                if(cur_status=='0'){
                    bg_color = 'bage-blue';
                }else{
                    bg_color = 'bage-green';
                }

                if(cur_status=='1'){//风险已确认
                    risk_text = '风险确认';
                    risk_des = '已确认';
                    risk_link = contextPath+'/riskmanagement/risk_identification_page';
                }else if(cur_status=='0'){//风险审核中
                    if(!end_time && !risk_audit_result){
                        risk_text = '风险审核';
                        risk_des = '真安风控中心，审核中';
                        risk_link = contextPath+'/riskmanagement/risk_audit_page';
                    }
                    if(!end_time && risk_audit_result && !risk_confirm){
                         risk_text = '风险确认';
                         risk_des = '资方操作员，审核中';
                         risk_link = contextPath+'/riskmanagement/risk_identification_page';
                    }
                }else{
                    risk_des = '风险关闭';
                    if(end_time && !risk_confirm){
                        risk_text = '风险审核';
                        risk_link = contextPath+'/riskmanagement/risk_audit_page';
                    }
                    if(end_time && risk_confirm && (risk_confirm=='refuse')){
                        risk_text = '风险确认';
                        risk_link = contextPath+'/riskmanagement/risk_identification_page'
                    }
                }

                html += '<div class="data-list clearfix">';
                html += '<div class="data-list-heading"> <h4 class="data-list-title">风险编号：<b>' + item.businesskey+ '</b></h4> </div>';
                html += '<div class="data-list-body clearfix"><div class="data-list-left pull-left">';                
                html += '<a class="whale-bage skip-page '+bg_color+ ''+(need_claim_obj[item.processInstanceId]?' needclaim':'')+'" href="javascript:void(0)" data-ref="'+risk_link+'" data-business-key="'+item.businesskey+'" data-history-ref="'+contextPath+'/riskmanagement/risk_management_page">' + risk_text + '</a>';
                html += '<span class="records">' + risk_des + '</span></div><div class="data-list-right clearfix"> <div class="col-xs-6 distillery"> <p>酒厂名称：' + item.wineryName + '</p>';
                html += '<p>融资金额：' + renderNum(item.financeAmount) +'元' + '</p>';
                html += '<p>还款总额：' + renderNum(item.repaymentTotalAmount)+ '元' + '</p>';
                html += '</div><div class="col-xs-6 distillery"> <p>资金方：' + item.capitalName + '</p> <p>融资期限：' + item.financeDeadline + '年期</p> <p>已还总额：' + (item.hadRepaymentTotalAmount?(renderNum(item.hadRepaymentTotalAmount)+'元'):'') + '</p></div></div> </div> </div> </div>';
            });
            risk_table_dom.html(html);
            skipPage();
        })
    }
 
    //列表数据方法
    function renderListData(search_text,status_num,page_num){

        //按照status 渲染tab
        $('#my-work-ct>ul>li[data-status="'+status_num+'"]').addClass('active').siblings().removeClass('active');

        var no_content_dom = $('.no-content-container');
    	renderRiskData({search:search_text,status:status_num,page:page_num-1,size:size});
        if(totalCount<1){
            no_content_dom.html(no_content_html);
           $('#pageBar').html('');
           return 
        }
        no_content_dom.html('');
	    new PageBar('#pageBar',totalCount,function(curPageNo){
	        var paramData = {}
	        paramData.search = search_text;
	        paramData.status = status_num;
	        paramData.page = (curPageNo-1);
	        paramData.size = size;
	        renderRiskData(paramData);
	    },page_num);
    }

    //页面初次加载数据
    var init_status = window.sessionStorage["listStatus"]?window.sessionStorage["listStatus"]:'0';
    var init_page_no = window.sessionStorage["listPageNo"]?window.sessionStorage["listPageNo"]:1;
    renderListData('',init_status,init_page_no);
    
    //点击状态加载不同数据
    var data_status = null;
    $('#my-work-ct>ul>li').on('click', function() {
        var status = $(this).attr('data-status');
        renderListData('',status,0);
        window.sessionStorage.clear();
        window.sessionStorage["listStatus"] = status
    })

    //用户数据模糊查询
    $(".w-icon-search").click(function() {
        var status = $('#my-work-ct>ul>li.active').attr('data-status');
        var search = $.trim($(".searchStr").val());
        renderListData(search,status,0);
    });

    //跳转页面
    function skipPage(){
         $('.skip-page').on('click',function(){
            //记录当前的状态和页码
            var list_status = $('#my-work-ct>ul>li.active').attr('data-status');
            var list_page_no = parseInt($('#pageBar li.active').text());
            window.sessionStorage["listStatus"] = list_status;

            //页面跳转
            var cur_href = $(this).attr('data-ref');
            var historyRef = $(this).attr('data-history-ref');
            window.sessionStorage["businessKey"] = $(this).attr('data-business-key');
            window.sessionStorage["historyRef"] = historyRef;//历史地址
            window.location.href = cur_href;
         })
    }

});