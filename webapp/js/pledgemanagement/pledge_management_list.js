/**
* @Author Mona
* @date 2016-12-20
* @description 质押管理
*/

$().ready(function() {
    var totalCount = null;
    var size = 10;
    var roleInfo = new Role();
    var roleId = roleInfo.getRoleId();
    var is_jg_operator = role.compareTo(roleId,role["jg_operator"]); //是否是监管方
    var page_bar_dom = $('#pageBar');
    var pledge_table_dom = $('#pledge_management');
    var search_btn_dom = $('#search'); 
    var status_li_dom = $('#pledge-ct>ul>li');
    var risk_warning_dom =$('[data-role="risk-tip"]');
    var roleId = new Role().getRoleId();
    var is_jc_system_operator = role.compareTo(roleId,role["jc_system_operator"]);//是否是酒厂
    var search_bar_dom = $('.search-bar');

    //模块标题
    var module_title_dom = $('#winery-special-title');
    if(is_jc_system_operator){
    	module_title_dom.text('我的质押');
    }else{
        module_title_dom.text('质押管理');
        search_bar_dom.show();
    }

    function edit_pledge(){
        var edit_pledge_dom = $('[data-role="edit_pledge"]');   
        edit_pledge_dom.on('click', function() {//点击跳转到编辑质押物信息页面
            //记录当前的状态和页码
            var list_status = $('#pledge-ct>ul>li.active').attr('data-status');
            var list_page_no = parseInt($('#pageBar li.active').text());
            window.sessionStorage["listStatus"] = list_status;
            window.sessionStorage["listPageNo"] = list_page_no;

            //跳转页面
            window.sessionStorage["businessKey"] = $(this).attr('data-business-key');
            window.sessionStorage["taskId"] = $(this).attr('data-task-id');
            window.location.href = contextPath + '/pledge/edit_pledge_info_page';

        });
    }

    function viewRecords(){
        var review_records_dom = $('');
    }


    //点击风险提示
    function riskWarn() {              
        var risk_warning_dom =$('[data-role="risk-tip"]');
        if (is_jg_operator) {
            risk_warning_dom.show();       	
            risk_warning_dom.on('click',function(){//点击风险提示跳转到风险提示页面
                if(typeof $(this).attr('disabled')!=='undefined'){
                    alert('请选择具体的质押数据')
                    return 
                }
                var checked_businessKey = '';
                var head_list_dom = $('.data-list .data-list-heading');
                $.each(head_list_dom,function(i,item){
                    if($(item).find('input[type="checkbox"]').is(':checked')){
                        window.sessionStorage["businessKey"] = $(item).attr('data-business-key');
                        window.sessionStorage["risk_warn"] = 'pledge';
                        window.sessionStorage["historyRef"] = contextPath+'/pledge/pledge_management_page';
                        console.debug(window.sessionStorage["businessKey"])
                        return false
                    }
                })

                window.location.href = contextPath + '/riskmanagement/risk_warning_page';
            })
        }
    }
    
    riskWarn();


    /**
    * @description 渲染质押监管数据
    * @param {param} status keyWord pageNo pageSize 四个属性
    */
    function renderPledgeData(param) {
        HttpUtils.get_pledge_list_data(param, function(data) {
            totalCount = data.data.pageCount;
            console.debug('当前数据页数')
            console.debug(data.data.pageCount)
            var cur_status = param.status;
            var cur_status_text = '';
            if(data.data.pageCount<1){
                pledge_table_dom.html('');
                return 
            }
            console.debug('质押管理列表数据')
            console.debug(data)
            var pledgeData = data.data.result;
            var html = '';
            $.each(pledgeData, function(i, item) {
                var risk_status = item.riskStatus;
                var has_task_id = item.taskId?true:false;
                html += '<div class="data-list clearfix">';
                html += '<div class="data-list-heading" data-business-key="'+item.pledgeBusinessKey+'"> <h4 class="data-list-title" >';
                //checkbox出现的条件是可以办理且为监管方且当前的选择条件为质押中
                (is_jg_operator&&risk_status&&(cur_status=='0'))?html += '<input type="checkbox"> ':'';//<b class="col-md-offset-1 red">'+cur_status_text+'</b>
                html += '质押编号：<b>' + item.pledgeBusinessKey + '</b></h4> </div>';
                html += '<div class="data-list-body clearfix"><div class="data-list-left pull-left center">';

                var cur_end_time = '';
                if(cur_status == '2'){
                    cur_end_time = item.overDueCloseDate;
                }else if(cur_status == '1'){
                    cur_end_time = item.expireCloseDate;
                }

                html += '<a class="whale-bage skip-page pledge-img pledge_icon" data-role="view-records" href="'+contextPath+'/pledge/inspection_records_page" data-business-key="'+item.pledgeBusinessKey+'" data-pledge-date="'+item.pledgeCreateAt+'" data-end-time="'+cur_end_time+'"><p class="records">巡检记录</p></a>';
                
                html += ' <a class="btn btn-primary btn-sm btn-red btn-pledge-info'+(has_task_id&&is_jg_operator?' has-task-id':' ')+'" data-role="edit_pledge" data-business-key="'+item.pledgeBusinessKey+'" data-task-id="'+(item.taskId?item.taskId:'')+'">质押物详情</a></div><div class="data-list-right clearfix"> <div class="col-xs-6 distillery"> <p>质权人：' + item.pledgeeName + '</p>';
                html += '<p>出质人：' + item.pledgorName + '</p>';
                html += '<p>质押物总价：' + (item.evaluationPrice?(renderNum(item.evaluationPrice) + '元'):'') + '</p>';
                html += '</div><div class="col-xs-6 distillery"> <p>监管方：' + item.regulatorName + '</p> <p>出质日期：' + (item.qualityDate?item.qualityDate:'') + '</p> <p>质押物数量：' + (item.baseWineNum?(item.baseWineNum + '吨'):'') + '</p></div></div> </div> </div> </div>'
            });
            pledge_table_dom.html(html);
            getCheckedPledgeInfo()
            edit_pledge()//点击编辑质押物

            //存储当前的业务编码和质押时间
            $('[data-role="view-records"]').on('click',function(){
                //记录当前的状态和页码
                var list_status = $('#pledge-ct>ul>li.active').attr('data-status');
                var list_page_no = parseInt($('#pageBar li.active').text());
                window.sessionStorage["listStatus"] = list_status;
                window.sessionStorage["listPageNo"] = list_page_no;


                var search_status = $('.nav.nav-tabs').find('li.active').attr('data-status');
                window.sessionStorage["businessKey"] = $(this).attr('data-business-key');
                window.sessionStorage["pledgeDate"] = $(this).attr('data-pledge-date');
                window.sessionStorage["curEndTime"] = $(this).attr('data-end-time');
                window.sessionStorage["searchStatus"] = search_status;
            })

        })
    }

    /**
    * @param {param} keyWord 关键字 status 当前状态 pageNo 当前页码 
    * @description 渲染pagebar
    */
    function renderListData(key_word,cur_status,page_no) {

        //按照status 渲染tab
        $('#pledge-ct>ul>li[data-status="'+cur_status+'"]').addClass('active').siblings().removeClass('active');

        var param = {
            keyWord: key_word,
            status: cur_status,
            pageNo: page_no-1,
            pageSize: size
        }
        var no_content_dom = $('.no-content-container');
        if(cur_status == '0' && is_jg_operator){
            risk_warning_dom.show();
        }else{
            risk_warning_dom.hide();
        }
        renderPledgeData(param);
        if(totalCount<1){
            no_content_dom.html(no_content_html);
            page_bar_dom.html('');
            return
        }
        no_content_dom.html('');
        new PageBar(page_bar_dom,totalCount,function(curPageNo) {
            var paramData = {}
            paramData.keyWord = key_word;
            paramData.status = cur_status;
            paramData.pageNo = (curPageNo - 1);
            paramData.pageSize = size;
            renderPledgeData(paramData);
        },page_no);
    }

    //页面初次加载数据
    var init_status = window.sessionStorage["listStatus"]?window.sessionStorage["listStatus"]:'0';
    var init_page_no = window.sessionStorage["listPageNo"]?window.sessionStorage["listPageNo"]:1; 
    console.debug('初始加载时的状态=>'+init_status);
    renderListData('',init_status,init_page_no);

    //点击状态加载不同数据
    status_li_dom.on('click', function() {
        var cur_status = $(this).attr('data-status');
        renderListData('',cur_status,1); 
        window.sessionStorage.clear();
        window.sessionStorage["listStatus"] = cur_status;
        console.debug('当前状态=>'+window.sessionStorage["listStatus"])
    })
    
    //搜索
    search_btn_dom.on('click',function() {
        var status = $('#pledge-ct>ul>li.active').attr('data-status');
        var key_word = $.trim($("#search-str").val());
        renderListData(key_word,status,1);
    });

    //获取不同状态的数量
    HttpUtils.get_pledge_status_num('',function(data){
        console.debug('质押管理状态对应数量');
        console.debug(data);
        if(!data){
            return 
        }
        var status_0 = data.data.PLEDGE;
        var status_1 = data.data.DECOMPRESSION;
        var status_2 = data.data.DISPOSED;
        $('[data-status="0"]').find('b').text(status_0);//质押中
        $('[data-status="1"]').find('b').text(status_1);//已解压
        $('[data-status="2"]').find('b').text(status_2);//已处置
    })

    //点击风险提示
    function getCheckedPledgeInfo(){
        var data_head_list_dom = $('.data-list .data-list-heading');
        var checkbox_list_dom = data_head_list_dom.find('input[type="checkbox"]');
        checkbox_list_dom.on('click',function(){
            //设置风险按钮的状态
            var checked_len = data_head_list_dom.find('input[type="checkbox"]:checked').length;
            console.debug(checked_len);
            if(checked_len<1){
                (typeof risk_warning_dom.attr('disabled')=='undefined')?risk_warning_dom.attr('disabled',''):'';
            }else{
                risk_warning_dom.removeAttr('disabled');
            }
            //单选的checkbox
            if($(this).is(':checked')){
                $(this).parents('.data-list').siblings().find('input[type=checkbox]').prop('checked',false);
            }
        })
    }

    

});