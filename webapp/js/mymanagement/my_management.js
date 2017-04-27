/**
 * @Author Mona
 * @Date 2016-11-02
 * @description 我的办理
 */

var role_Info = new Role();
var institutionTypeId = role_Info.getInstitutionTypeId();
var isWinery = institutionType.compareTo(institutionTypeId,institutionType["finace_operrator"]);
var is_jg_institution = institutionType.compareTo(institutionTypeId,institutionType["supervise_operator"]);

var totalCount = null;

function clickSkipPage(){
    $('.skip-page').on('click',function(e){
        e.preventDefault(); 
        var time = new Date().getTime();                
        var taskId = $(this).attr('data-task-id');
        var businessKey = $(this).attr('data-business-key');
        var managementStatus = $(this).attr('data-management-status');
        var historyRef = $(this).attr('data-history-ref');
        var instanceKey = $(this).attr('data-instance-key');
        window.sessionStorage["taskId"] = taskId;
        window.sessionStorage["businessKey"] = businessKey;
        window.sessionStorage["managementStatus"] = managementStatus;
        window.sessionStorage["historyRef"] = historyRef;
        var curHref = skipPage(businessKey);
        window.sessionStorage["curHref"] = curHref;
        if(is_jg_institution && instanceKey=='finance'){
           curHref = contextPath + '/pledge/edit_pledge_info_page';
        }
        if(curHref!='' && curHref!=='/whale'){

            window.open(curHref,'newwindow-'+time)//跳转页面
            //window.open('container','newwindow')//跳转页面
        }
    })

}

function renderData(param){
    var paramData = param;
    myManagementRequestget.get_my_magagement_data (paramData,function(data){
        console.debug('我的办理数据');
        console.debug(data);
        if(data!==undefined && data!==''&& data.data!==null && data.data!==undefined){
            var curData = data.data.result;
            if(curData.length>0){
                var h = '';
                $.each(curData,function(i,item){
                    h+='<tr data-task-id="'+item.taskId+'" data-business-key="'+item.businessKey+'"><td>'+(i+1)+'</td>';
                    h+='<td>'+item.businessKey+'</td>';
                    if(!isWinery){
                        h+='<td>'+item.companyName+'</td>';
                    }
                    h+='<td>'+item.businessType+'</td>';
                    h+='<td>'+item.taskName+'</td>';
                    h+='<td>'+item.taskStatus+'</td>';
                    h+='<td>'+item.createTime+'</td>';
                    if(item.endDate){
                         h+='<td>'+item.endDate+'</td>';
                     }else{
                         h+='<td></td>';
                     }

                    //待办理，已办理，办理中
                    switch(item.taskStatus){
                        case "待办理":
                            h+='<td><a href="javascript:void(0)" class="my-task blue" data-task-id="'+item.taskId+'">签收</a></td></tr>'
                            break;
                        case "已办理":
                            h+='<td><a href=" " class="skip-page" data-task-id="'+item.taskId+'" data-business-key="'+item.businessKey+'" data-management-status="1" data-history-ref="'+contextPath+'/anagement_page" data-instance-key="'+item.instanceKey+'">查看</a></td></tr>'
                            break;
                        case "办理中":
                            h+='<td><a href=" " class="skip-page" data-task-id="'+item.taskId+'" data-business-key="'+item.businessKey+'" data-management-status="0" data-history-ref="'+contextPath+'/anagement_page" data-instance-key="'+item.instanceKey+'">办理<a></td></tr>'
                            break;
                    }

                })

                $('#my-work').find('thead').show();
                $('#my-work').find('tbody').html(h);

                //签收
                $('.my-task').on('click',function(e){
                    e.preventDefault();
                    var _this = this;
                    var taskId = $(_this).attr('data-task-id');
                    window.sessionStorage.setItem('taskId',taskId);

                    $.ajax({
                        type:'get',
                        url:contextPath+"/activiti/claim/"+taskId,
                        success:function(){
                            window.location.reload(true);
                        }
                    })
                })

                //查看/办理
                clickSkipPage()    
            }
            else{
                $('#my-work').find('thead').hide();
                $('#my-work').find('tbody').html('');
            }

            if(data.data.totalCount!=='' && data.data.totalCount!==undefined){
                $('[role="presentation"][data-status="'+paramData.status+'"]').find('b').text(data.data.totalCount);
                totalCount = data.data.pageCount;
            }
        }
    })
}


$(function(){

    if(isWinery){
        $('#my-work').find('[data-id="winery-name"]').hide();
    }
    
    function renderEchoData(pageNo,status){
        var no_content_dom = $('.no-content-container');
        renderData({pageNo:pageNo,status:status});
        if(totalCount>0){  
            no_content_dom.html('');
            new PageBar('#pageBar',totalCount,function(curPageNo){
                var paramData = {}
                paramData.status = status;
                paramData.pageNo = (curPageNo-1);
                renderData(paramData);
            });
        }else{
            no_content_dom.html(no_content_html);
            $('#pageBar').html('');
            $('#my-work').find('thead').hide();

        }
    }

    renderEchoData(0,0);    

    //点击tab按钮时显示
    $('#my-work-ct>ul>li').on('click',function(){
        var cur_status = $(this).attr('data-status');
        renderEchoData(0,cur_status)
    })

    //我的办理各种状态显示
    myManagementRequestget.get_my_magagement_count(function(data){
        $('[data-status="0"]>a>b').text(data.data.status0);
        $('[data-status="1"]>a>b').text(data.data.status1);
        $('[data-status="2"]>a>b').text(data.data.status2);
    });


})





