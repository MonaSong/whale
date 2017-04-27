/**
* @Author Mona
* @Date 2017-01-04
* @description 逾期理赔列表
*/

var pageCount = null;//总页数
var size = 10;//每一页记录数
var taskUrl = {};
taskUrl["发起理赔"] = contextPath+'/overdue/overdue_detail_page';
taskUrl["保险赔付"] = contextPath+'/overdue/insurance_claim_page';
taskUrl["资方收款"] = contextPath+'/overdue/capital_collection_page';
taskUrl["启动回购"] = contextPath+'/overdue/start_buyback_page';
taskUrl["解除保单"] = contextPath+'/overdue/release_policy_page';
taskUrl["解除质押"] = contextPath+'/overdue/release_pedge_page';
taskUrl["提货"] = contextPath+'/overdue/delivery_notes_page';

var taskSubName = {};
taskSubName["发起理赔"] = '';
taskSubName["保险赔付"] = '履约保险方操作员,办理中';
taskSubName["资方收款"] = '资方操作员,办理中';
taskSubName["启动回购"] = '中酒风控专员,办理中';
taskSubName["解除保单"] = '履约保险方操作员,办理中';
taskSubName["解除质押"] = '监管方操作员,办理中';
taskSubName["提货"] = '中酒风控专员,办理中';


$(function(){
var overdue_settlement_dom = $('#overdue-settlement');
var search_btn_dom = $('#search-overdue-data');

function renderOverdueData(search,page,status){
    var param = {};
    param.search = search;
    param.page = page;
    param.size = size;
    param.status = status;
    HttpUtils.get_overdue_list_data (param,function(data){
        console.debug('逾期理赔数据')
        console.debug(data);
        $('[data-status="0"]').find('b').text('('+data.data.not_end+')');
        $('[data-status="1"]').find('b').text('('+data.data.agree+')');
        if(!data.data||!data.data.list){
            return
        }
        var curData = data.data.list.content; 
        var need_claim_obj = data.data.needClaim;          
        var bageColor = (param.status=='1')?' bage-green':' bage-blue';
        var html = '';
        $.each(curData,function(i,item){
            html+='<div class="data-list clearfix">';                
            html+='<div class="data-list-heading"><h4 class="data-list-title"> 理赔编号：<b>'+item.businessKey+'</b> </h4></div>';
            html+='<div class="data-list-body clearfix"> <div class="data-list-left pull-left">'; //<a href="'+taskUrl[item.taskName]+'" class="white">'+item.taskName+'</a>                              
            html+='<a class="whale-bage skip-page '+bageColor+' '+(need_claim_obj[item.processInstanceId]?'needclaim':'')+'" data-business-key="'+item.businessKey+'"  data-task-id="" data-history-ref="'+contextPath+'/overdue/overdue_settlement_page" href="'+taskUrl[item.taskName]+'">'+item.taskName+'</a>';
            html+='<span>'+((param.status=='0')?taskSubName[item.taskName]:'已完成')+'</span> </div> <div class="data-list-right clearfix">';
            html+='<div class="col-xs-4">';
            html+= '<p>酒厂名称：'+item.wineryName+'</p>';
            html+='<p>融资金额：'+(item.financeAmount?(renderNum(item.financeAmount)+'元'):'')+'</p><p>还款总额：'+(item.repaymentAmount?(renderNum(item.repaymentAmount)+'元'):'')+'</p></div>';
            html+='<div class="col-xs-4"> <p>资金方：'+item.capitalName+'</p> <p>融资期限：'+(item.financeDeadline?(item.financeDeadline+'年期'):'')+'</p><p>已还总额：'+(item.hadRepaymentAmount?(item.hadRepaymentAmount+'元'):'0元')+'</p> </div>';
            html+='</div> </div> </div>';
        });
        overdue_settlement_dom.html(html);
        pageCount = data.data.list.totalPages;

        //页面跳转存储信息
        $('.skip-page').on('click',function () {
            //记录当前的状态和页码
            var list_status = $('#overdue-list [role="tablist"] li.active').attr('data-status');
            var list_page_no = parseInt($('#pageBar li.active').text());
            window.sessionStorage["listStatus"] = list_status;

            //页面跳转
            var businessKey = $(this).attr('data-business-key');
            window.sessionStorage["historyRef"] = contextPath +'/overdue/overdue_settlement_page';
            window.sessionStorage["businessKey"] = businessKey;
        })
    })
}

//列表数据方法
function renderlistPage(search,pageNo,status) {
    //按照status 渲染tab
    $('#overdue-list [role="tablist"] li[data-status="'+status+'"]').addClass('active').siblings().removeClass('active');

    var no_content_dom = $('.no-content-container');
    renderOverdueData(search,pageNo-1,status);
    if(pageCount=='0'){
        no_content_dom.html(no_content_html);
        $('#pageBar').html('');
        return
    }
    no_content_dom.html('');
    new PageBar('#pageBar',pageCount,function(curPage){
        var page = (curPage-1);
        renderOverdueData(search,page,status);
    },pageNo);
}

//页面初次加载数据
var init_status = window.sessionStorage["listStatus"]?window.sessionStorage["listStatus"]:'0';
var init_page_no = window.sessionStorage["listPageNo"]?window.sessionStorage["listPageNo"]:1;
renderlistPage('',init_page_no,init_status)

//点击不同的申请状态
$('#overdue-list [role="tablist"] li').on('click',function(){
    var status = $(this).attr('data-status');   
    renderlistPage('','1',status);
    window.sessionStorage.clear();
    window.sessionStorage["listStatus"] = status
})

//融资申请查询
function searchData(){
    var search = $.trim($('#overdue-searchstr').val());
    var status = $('#overdue-list li.active').attr('data-status');
    renderlistPage(search,'0',status);
}

search_btn_dom.on('click',function(){
    searchData();
})


})



















