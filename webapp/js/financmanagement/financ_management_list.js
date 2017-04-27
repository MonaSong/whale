/**
*@Author Mona
*@date 2016-11-17
*@description 融资管理列表页
*/
var pageCount = null;//总页数
var size = 10;//每一页记录数



$(function(){


var agree_b_dom = $('#finance-management-tab [data-status="AGREE"] b');//通过
var refuse_b_dom = $('#finance-management-tab [data-status="REFUSE"] b');//拒绝
var not_end_b_dom = $('#finance-management-tab [data-status="NOT_END"] b');//未结束
var finace_management_list_dom = $('#finace-management-list');//融资申请列表
var add_new_finance_dom = $('#add-new-finance');
var search_bar_dom = $('.search-bar');

HttpUtils.get_user_institution_status('',function(data){
    console.debug('机构是否被禁用的状态');
    console.debug(data);
    if(!data.data){
        $(add_new_finance_dom).attr('disabled','')
    }
});

//模块主标题
var module_title_dom = $('#winery-special-title');
if(is_winery){
    module_title_dom.text('我的融资');
}else{
    search_bar_dom.show();
    module_title_dom.text('融资管理');
}


function renderFinanceList(search,page,status){
    var param = {};
    param.search = search;
    param.page = page;
    param.size = size;
    param.status = status;
    HttpUtils.get_all_finace_record (param,function(data){
        console.debug('融资管理数据')
        console.debug(data);
        if(data.statusCode=='200'){
            var curData = data.data.content;
            
            var bageColor = ' bage-blue';
            var curNodeUrl = '';
            var curClaim = '';
            if(status=='AGREE'){
               bageColor = ' bage-green';
            }else if(status=='REFUSE'){
               bageColor = ' bage-red';
            }
            var html = '';
            $.each(curData,function(i,item){
                var loan_info = item.loanInfo;
                var winery_name = '';//酒厂名称
                var finance_period = loan_info&&loan_info.financingPeriod;//融资期限
                var finance_rate = loan_info&&loan_info.annualInterestRate;//年化利率
                var loan_amount = loan_info&&loan_info.realLoanAmount;//融资金额
                var due_time = loan_info&&loan_info.dueTime;//到期时间
                var repayment_method = loan_info&&loan_info.repaymentMethod;//还款方式
                var loan_time = loan_info&&loan_info.loanTime;//放款时间

                html+='<div class="data-list clearfix">';                
                html+='<div class="data-list-heading"><span class="pull-right">申请时间：'+(item.startTime?item.startTime:'')+'</span> <h4 class="data-list-title"> 申请编号：<b>'+(item.businessKey?item.businessKey:'')+'</b> </h4></div>';
                html+='<div class="data-list-body clearfix"> <div class="data-list-left pull-left">'; 
                curClaim = item.needClaim?' needclaim':' ';     

                var node_name = '';
                var sub_node_name = '';
                if(status=='AGREE'){
                    node_name = '融资完成';
                    sub_node_name = '放款确认完成'
                }else if(status == 'REFUSE'){
                    node_name = (item.nodeName?item.nodeName:'');
                    sub_node_name = (item.subNodeName?(item.subNodeName+'，拒绝融资'):'拒绝融资');
                }else{
                    node_name = (item.nodeName?item.nodeName:'');
                    if(node_name=='资质审核'){
                        sub_node_name = '办理中';
                    }else{
                        sub_node_name = (item.subNodeName?(item.subNodeName+'，办理中'):'办理中');
                    }
                    
                }

                html+='<div class="whale-bage skip-page'+bageColor+curClaim+'" data-business-key="'+item.businessKey+'" data-management-status="'+(item.needClaim?0:1)+'" data-task-id="'+item.taskId+'" data-history-ref="'+contextPath+'/finance/financ_list_page"><a href="'+curNodeUrl+'" class="white"  >'+node_name+'</a></div>';
                
                html+='<span>'+sub_node_name+'</span> </div> <div class="data-list-right '+(is_winery?'winery-data-lsit-right':'')+' clearfix"> ';

                var winery_dom = '<p>酒厂名称：'+(item.applicantCompany?item.applicantCompany:'')+'</p>';
                html+='<div class="col-xs-4">';
                is_winery?'':html+= winery_dom;
                html+='<p>融资金额：'+(loan_amount?(renderNum(loan_amount)+'元'):'')+'</p><p>放款时间：'+(loan_time?loan_time:'')+'</p></div>';
                html+='<div class="col-xs-4"> <p>贷款期限：'+(finance_period?(finance_period+'年期'):'')+'</p> <p>到期时间：'+(due_time?due_time:'')+'</p> </div>';
                html+='<div class="col-xs-4"> <p>年化利率：'+(finance_rate?(finance_rate+'%'):'')+'</p> <p>还款方式：'+(repayment_method?repayment_method:'')+'</p> </div>';
                html+='</div> </div> </div>';
            });

            finace_management_list_dom.html(html);

            agree_b_dom.text(data.data.AGREE);
            refuse_b_dom.text(data.data.REFUSE);
            not_end_b_dom.text(data.data.NOT_END);

            if(curData.length == 0){
                pageCount = 0;
            }else{
                pageCount = data.data.pageCount;
            }
            

            skipPageClick();
        }
    })
}

//数据列表工具方法
function renderDataInfo(search,page,status){

    //按照status 渲染tab
    $('#finance-management-tab [role="tablist"] li[data-status="'+status+'"]').addClass('active').siblings().removeClass('active');


    var no_content_dom = $('.no-content-container');
    renderFinanceList(search,page-1,status);
    if(pageCount<1){
        no_content_dom.html(no_content_html);
        $('#pageBar').html('');
        return 
    }
    no_content_dom.html('');
    new PageBar('#pageBar',pageCount,function(curPage){
        var page = (curPage-1);
        renderFinanceList(search,page,status);
    },page);
}

//页面初次加载时
var init_status = window.sessionStorage["listStatus"]?window.sessionStorage["listStatus"]:'NOT_END';
var init_page_no = window.sessionStorage["listPageNo"]?window.sessionStorage["listPageNo"]:1;
renderDataInfo('',init_page_no,init_status);

//点击不同的申请状态
$('#finance-management-tab [role="tablist"] li').on('click',function(){
    var status = $(this).attr('data-status');   
    renderDataInfo('','1',status);
    window.sessionStorage.clear();
    window.sessionStorage["listStatus"] = status
})

//融资申请查询
function searchData(){
    var search = $.trim($('#finance-search-str').val());
    var status = $('#finance-management-tab li.active').attr('data-status');
    renderDataInfo(search,1,status);
}


$('#finance-search-btn').on('click',function(){
    searchData();
})

//查看/办理
function skipPageClick(){
    $('.skip-page').on('click',function(e){    
        e.preventDefault();  
        //记录当前状态和页码
        var list_status = $('#finance-management-tab li.active').attr('data-status');
        var list_page_no = parseInt($('#pageBar li.active').text());

        window.sessionStorage["listStatus"] = list_status;

        //页面跳转
        var time = new Date().getTime();               
        var businessKey = $(this).attr('data-business-key');
        var managementStatus = $(this).attr('data-management-status');
        var taskId = $(this).attr('data-task-id');
        var historyRef = $(this).attr('data-history-ref');
        window.sessionStorage["businessKey"] = businessKey;
        window.sessionStorage["managementStatus"] = managementStatus;
        window.sessionStorage["taskId"] = taskId;
        window.sessionStorage["historyRef"] = historyRef;
        var curHref = skipPage(businessKey);
        if(curHref!='' && curHref!=='/whale'){
            window.open(curHref,'newwindow-'+time);
        }
    })
}

//酒厂业务员  role["jc_system_operator"]
var roleId = new Role().getRoleId();
var is_jc_system_operator = role.compareTo(roleId,role["jc_system_operator"]);

if(is_jc_system_operator){
	$('.whale-well-title').html('我的融资');
    add_new_finance_dom.show();  
    if(typeof add_new_finance_dom.attr('disabled') =='undefined'){
        smToolTips(add_new_finance_dom,'您的机构被禁用，不能新增融资！');  
    }      
    //新增融资
    $('#add-new-finance').on('click',function(e){   
        if(typeof $(this).attr('disabled')!=='undefined'){
            e.preventDefault();
            return 
        }
        window.sessionStorage["historyRef"] = contextPath+'/finance/financ_list_page';
        window.sessionStorage["managementStatus"] = 'financeModify';
        window.sessionStorage["businessKey"] = '';
        window.sessionStorage["taskId"] = '';
    }) 
} 
})


