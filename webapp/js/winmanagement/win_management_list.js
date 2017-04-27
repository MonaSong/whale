/**
 * @Author Mona
 * @date 2016/11/7
 * @description 酒厂管理
 */

//酒厂管理列表
$(function(){
    //判断当前登录身份
    var roleInfo = new Role();
    var roleId = roleInfo.getRoleId();
    var isChannelDirector = role.compareTo(roleId,role["zj_channel_director"]);    
    var pageCount = null;
    var provinceUser = winManagementRequest.get_provinceManagers();

    console.debug('省区经理信息');
    console.debug(provinceUser);

    function renderProvinceUser(provinceUserId){
        var h_province = {};
        h_province.html = '';
        h_province.nameInfo = '';
        $.each(provinceUser,function(k,info){
            if(info.uid==provinceUserId){
                h_province.html+='<option value="'+info.uid+'" selected>'+info.trueName+'</option>';
                h_province.nameInfo = info.trueName;
            }
            else{
                h_province.html+='<option value="'+info.uid+'">'+info.trueName+'</option>';
            }
        })
        return h_province  
    }


    function editProvinceUser(){
        $('.edit-data').on('click',function(){  
            if(typeof $(this).prev().attr('disabled')!=='undefined'){
                $(this).prev().removeAttr('disabled');
            }
            shenqu = $('.shenqu').find('option:selected').attr('value');                  
            if(!shenqu){
                return
            }
            var _this = this;
            var status = $(_this).attr('data-operater');
            if(status=='modify'){
                $(_this).attr('data-operater','sure');
                $(_this).text('保存');
            }
            if(status == 'sure'){
                var businessKey = $(_this).attr('data-businessKey');
                var provinceUserId = shenqu;
                $.ajax({
                    type:'post',
                    url:contextPath+'/winmanage/provinceManager.json?businessKey='+businessKey+'&provinceUserId='+provinceUserId,
                    success:function(jqXHR, textStatus, errorThrown){
                        if(textStatus=='success'){
                            $(_this).attr('data-operater','modify');
                            $(_this).prev().attr('disabled','');
                            $(_this).text('修改');
                        }                       
                    },
                    error:function(jqXHR,textStatus,errorThrown){
                        $(_this).attr('data-operater','modify');
                        $(_this).text('修改');
                        renderErrorMsg(jqXHR,textStatus,errorThrown);
                        console.debug(jqXHR);
                    }
                })
            }
            
        })
    }

    function renderData(status,data){
        console.debug(data);
        if(data.statusCode=='200' && data.data!==null && data.data.result!==''){
            var curData = data.data.result;
            console.debug('酒厂管理列表数据');
            console.debug(data);
            var html = '';
            $.each(curData,function(i,item){
                html+='<div class="data-list clearfix">';                
                html+='<div class="data-list-heading"> <h4 class="data-list-title"> 申请编号：<b>'+item.businessKey+'</b> </h4> </div>';
                html+='<div class="data-list-body clearfix"> <div class="data-list-left pull-left">'; 
                var bg_color = '';
                if(status=='1'){
                    //已激活中的负责人事省区经理
                    bg_color = 'bage-green';
                }else if(status=='2'){
                    bg_color = 'bage-red'; 
                }else{
                    bg_color = 'bage-blue';
                }

                //modifyFlag是否可以修改省区经理
                //taskFlag 是否可以操作当前任务
                html+='<div class="whale-bage '+bg_color+' skip-page '+(item.taskFlag?' needclaim':'')+'" data-business-key="'+item.businessKey+'" data-management-status="'+(item.taskFlag?0:1)+'" data-task-id="'+item.taskId+'" data-history-ref="'+contextPath+'/winmanage/win_manage_page">'+item.taskName+'</div>';
                html+='<span>'+item.auditStatus+'</span> </div> <div class="data-list-right clearfix"> <div class="col-xs-6 distillery"> <p>酒厂名称：'+item.companyName+'</p>';
                html+='<p>联系人：'+item.userName+'</p>';
                var h_province = renderProvinceUser(item.provinceUserId);
                if(status==1){
                    if(isChannelDirector){
                        html+='省区经理：<select class="shenqu  user-define-select" name="" disabled>'+h_province.html+'</select><span data-businessKey="'+item.businessKey+'" data-provinceUserId="'+item.provinceUserId+'" class="edit-data btn btn-primary" data-operater="modify">修改</span>';
                    }else{
                        html+='<p>省区经理：'+h_province.nameInfo+'</p>';
                    }                    
                }              

                html+='</div><div class="col-xs-6 distillery"> <p>申请时间：'+item.createTime+'</p> <p>手机号：'+item.mobile+'</p> </div></div> </div> </div> </div>';

            });
            $('#win-management-list').html(html);

            pageCount = data.data.pageCount;//总页数

            editProvinceUser(); //修改省区经理
            skipPageClick();//跳转页面
        }
    }

    function renderDataAsParam(param){       
        winManagementRequest.get_win_list(param,function(data){
            renderData(param.status,data);
        })
    }

    //渲染数据工具方法
    function renderListData(search,page,status){
        //按照status 渲染tab
        $('#win-management-tab>ul>li[data-status="'+status+'"]').addClass('active').siblings().removeClass('active');


        var no_content_dom = $('.no-content-container');
        renderDataAsParam({status:status,pageNo:page-1});
        if(pageCount<1){
            no_content_dom.html(no_content_html);
            $('#pageBar').html('');
            return 
        }
        no_content_dom.html('');
        new PageBar('#pageBar',pageCount,function(curPage){
            var param = {};
            param.status = status;
            param.pageNo = (curPage-1);
            param.search = search;
            renderDataAsParam(param)
        },page);
    }
    
    //页面初次加载
    var init_status = window.sessionStorage["listStatus"]?window.sessionStorage["listStatus"]:0;
    var init_page_no = window.sessionStorage["listPageNo"]?window.sessionStorage["listPageNo"]:1;
    renderListData('',init_page_no,init_status);
    console.debug('状态=>'+init_status+'页码=>'+init_page_no);

    //点击状态
    $('#win-management-tab>ul>li').on('click',function(){
        var status = $(this).attr('data-status');
        renderListData('',1,status);
        window.sessionStorage.clear();
        window.sessionStorage["listStatus"] = status
    })

    //酒厂状态记录数
    winManagementRequest.get_winery_count(function(data){
        if(data.statusCode=='200'){
            $('#win-management-tab [data-status="0"]>a>b').text(data.data.count0);
            $('#win-management-tab [data-status="1"]>a>b').text(data.data.count1);
            $('#win-management-tab [data-status="2"]>a>b').text(data.data.count2);
        }
    })

    //酒厂信息查询接口
    function searchInterface(param){
        winManagementRequest.get_winery_info_by_search(param,function(data){
            if(data==undefined){
                return
            }
            if(data.data!==undefined && data.data.result!==undefined){
                renderDataAsParam(param);
                if(pageCount<1){
                    $('#pageBar').html('');
                    return 
                }
                new PageBar('#pageBar',pageCount,function(curPage){
                    var param = {};
                    param.keyWord = $.trim($('#search-str').val());
                    param.status = cur_status;
                    param.pageNo = (curPage-1);
                    renderDataAsParam(param)
                });

            }
           
        })
    }


    //酒厂信息查询
    function searchData(){
        var cur_status = $('#win-management-tab li.active').attr('data-status');
        var param = {};
        param.keyWord = $.trim($('#search-str').val());
        param.pageNo = 1;
        param.status =  cur_status;
        searchInterface(param);
    }

    $('#win-search').on('click',function(){
        searchData();
    })

    //查看/办理
    function skipPageClick(){
        $('.skip-page').on('click',function(e){
            e.preventDefault(); 

            //记录当前状态和页码
            var list_status = $('#win-management-tab li.active').attr('data-status');
            var list_page_no = parseInt($('#pageBar li.active').text());

            window.sessionStorage["listStatus"] = list_status;
            console.debug('存储的页码')
            console.debug(list_page_no)
            console.debug('存储的状态')
            console.debug(list_status)

            //跳转页面
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
    

})

