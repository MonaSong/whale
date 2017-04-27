/**
 * @Author yjx
 * @Date 2016-11-07
 * @description 消息管理
 */
$().ready(function() {
    $('[role="tablist"]>li').on('click',function(){
        $(this).tab('show');
    })
	
    var totalCount = null;
    var size = 10;
    //消息模板数据
    function MessagementData(param) {
        var paramData = param;
        HttpUtils.get_message_management_data(paramData, function(data) {
            if (data !== undefined && data !== '' && data.data !== null && data.data !== undefined) {
                var MessageData = data.data.content;
                totalCount = data.data.totalPages;
                var html = "";
                $.each(MessageData, function(i, item) {
                    html += '<tr>';
                    html += '<td data-group-name="'+ item.messageGroupName+ '" data-content="' + item.messageContent + '">' + '<a href="#" >' + item.messageGroupName + '</a></td>';
                    switch (item.messageTriggerType) {
                        case 0:
                            html += '<td data-node="' + item.messageTriggerType + '" class="TriggerType" data-id="' + item.id + '" data-content="' + item.messageContent + '" data-group-name="' + item.messageGroupName + '" data-notifyTimes="'+item.notifyTimes+'" >' + '触发型' + '</td>';
                            break;
                        case 1:
                            html += '<td data-node="' + item.messageTriggerType + '" data-notifyTimes="'+item.notifyTimes+'" class="TriggerType">' + '定时型' + '</td>';
                            break;
                    }
                    html += '<td data-type="' + item.messageServiceType + '" data-messageTitle="'+item.messageTitle+'" data-messageBusinessRole="'+item.messageBusinessRole+'" data-messageNotifyRole="'+item.messageNotifyRole+'">' + item.messageServiceType + '</td>';
                    html += '<td data-id="' + item.id + '" data-servicenode="' + item.messageServiceNode + '" data-notifyDays="'+item.notifyDays+'" data-messageSendType="'+item.messageSendType+'">' + item.messageServiceNode + '</td>'
                    if (item.messageGroupStatus === 1) {
                        html += '<td class="ani-btn"><span class="animate-checkbox message-status"><input data-groupstatus="' + item.messageGroupStatus +'" type="checkbox" checked name="" value="0"><span><b class=""></b></span><b class=""></b></span></td>'
                    } else {
                        html += '<td class="ani-btn"><span class="animate-checkbox message-status"><input data-groupstatus="' + item.messageGroupStatus +'" type="checkbox" name="" value="0"><span><b class=""></b></span><b class=""></b></span></td>'
                    }
                })
                $("#message_template_table").find('tbody').html(html);
                getStatus();
                messageclick()
            }
        })
    }
    //消息列表数据
    function Messagement_listData(param) {
        var paramData = param;
        HttpUtils.get_list_translation(paramData, function(data) {
            if (data !== undefined && data !== '' && data.data !== null && data.data !== undefined) {
                var MessageData = data.data.result;
                totalCount = data.data.pageCount;
                var html = "";
             	if(totalCount==0){
            		$('#pageBar').hide();
            		$('#message_list').find('thead').hide();
            	}else{
            		$('#message_list').find('thead').show();
            		$('#pageBar').show();
            	}
                $.each(MessageData, function(i, item) {
                    html += '<tr>';
                    html += '<td>' + (i + 1) + '</td>';
                    html += '<td data-node="' + item.smsGroup.messageTitle + '" class="message-title" data-send-id="' + item.id + '">'+'<a href="javascript:void(0)">'+ item.smsGroup.messageTitle + '</a></td>';
                    html += '<td data-type="' + item.smsGroup.messageServiceType + '">' + item.smsGroup.messageServiceType + '</td>';
                    switch (item.smsGroup.messageSendType) {
                        case 0:
                            html += '<td data-send-type="' + item.smsGroup.messageSendType + '">' + '无方式' + '</td>'
                            break;
                        case 1:
                            html += '<td data-send-type="' + item.smsGroup.messageSendType + '">' + '站内信' + '</td>'
                            break;
                        case 2:
                            html += '<td data-send-type="' + item.smsGroup.messageSendType + '">' + '短信' + '</td>'
                            break;
                        case 3:
                            html += '<td data-send-type="' + item.smsGroup.messageSendType + '">' + '短信,站内信' + '</td>'
                            break;
                    }
                    if (item.sendGroupStatus.success == item.sendGroupStatus.total && item.sendGroupStatus.success == 0) {
                        html += '<td data-type="' + item.messageTriggerType + '" class="sending">' + '--' +'</td>'
                    } else if (item.sendGroupStatus.success < item.sendGroupStatus.total && item.sendGroupStatus.success > 0) {
                        html += '<td data-type="' + item.messageTriggerType + '" class="sending">' + '部分成功' +'('+ item.sendGroupStatus.success + '/' + item.sendGroupStatus.total+'）'+'</td>'
                    } else {
                        html += '<td data-type="' + item.messageTriggerType + '" class="sending">' + '成功' +'('+  item.sendGroupStatus.success + '/' + item.sendGroupStatus.total +'）'+'</td>'
                    }
                    html += '<td>' + item.updateAt + '</td></tr>'
                })
                $("#message_list").find('tbody').html(html);
                messageClick();
            }
        })
    }
    //消息列表参数
    $('[role="tablist"]>li>a').on('click',function(){
        $(this).tab('show');
    })
    //分页
/* */
    function show(page){
       if(window.sessionStorage["status"] === '3'){

       }else{
   	    Messagement_listData({
	        page: page-1,
	        size: size
	    });
	    new PageBar('#pageBar', totalCount, function(curPageNo) {
	        var paramData = {}
	        paramData.page = (curPageNo - 1);
	        paramData.size = size;
	        Messagement_listData(paramData);
	    },page);	   
       }
    }
    var init_status = window.sessionStorage["status"]?window.sessionStorage["status"]:'1';
    var init_page_no = window.sessionStorage["listPageNo"]?window.sessionStorage["listPageNo"]:1;
    show(init_page_no);
    
    var data_userStatus=null;
    $('#my-management-ct>ul>li').on('click',function(){
        var status = $(this).attr('data-status');
        if(status==='3'){
        	   MessagementData({
        	        page: 0,
        	        size: size
        	    });
               $('#message_list').hide();
               $('#message_template').show();
        }else{
            Messagement_listData({
                page: 0,
                size: size
            });
            new PageBar('#pageBar', totalCount, function(curPageNo) {
                var paramData = {}
                paramData.page = (curPageNo - 1);
                paramData.size = size;
                Messagement_listData(paramData);
            });
            $('#message_list').show();
            $('#message_template').hide();
        }
    })
    //点击跳转触发型消息模板
    function messageclick(){
    $("#messagefinace tr td a").click(function() {
            var _this = this;
            var status=$('#my-management-ct .nav-tabs li.active').attr('data-status');
            var messageServiceType = $(_this).parent().parent().find('[data-type]').attr('data-type');//节点名称
            var messageContent = $(_this).parent().parent().find('[data-Content]').attr('data-Content');//获取消息内容
            var messageServiceNode = $(_this).parent().parent().find('[data-node]').attr('data-node');//获取消息业务类型
            var messageGroupName = $(_this).parent().parent().find('[data-group-name]').attr('data-group-name');//获取模板名称
            var groupId = $(_this).parent().parent().find('[data-id]').attr('data-id');//获取模板id
            var message_TriggerType= $(_this).parent().parent().find('[data-node]').attr('data-node');//获取消息业务类型
            var messageGroupStatus = $(_this).parent().parent().find('[data-Groupstatus]').attr('data-Groupstatus');//启用禁用状态
            var messagetitle=$(_this).parent().parent().find('[data-messagetitle]').attr('data-messagetitle');//存储消息标题
            var messageBusinessRole=$(_this).parent().parent().find('[data-messageBusinessRole]').attr('data-messageBusinessRole');//存储参与业务流程id
            var messageNotifyRole=$(_this).parent().parent().find('[data-messageNotifyRole]').attr('data-messageNotifyRole');//存储通知角色id
            var notifyDays=$(_this).parent().parent().find('[data-notifyDays]').attr('data-notifyDays');//存储提前发送天数
            var notifyTimes=$(_this).parent().parent().find('[data-notifyTimes]').attr('data-notifyTimes');//存储发送时间
            var messageSendType=$(_this).parent().parent().find('[data-messageSendType]').attr('data-messageSendType');//短信 站内信状态

            window.sessionStorage["messageContent"] = messageContent;//存储消息内容
            window.sessionStorage["messageServiceType"] = messageServiceType;//存储节点名称
            window.sessionStorage["messageServiceNode"] = messageServiceNode;//业务类型
            window.sessionStorage["groupId"] = groupId;//获取模板id
            window.sessionStorage["messageGroupStatus"] = messageGroupStatus;//启用禁用状态
            window.sessionStorage["messageGroupName"] = messageGroupName;//模板名称
            window.sessionStorage["messagetitle"] = messagetitle;    //存储消息标题
            window.sessionStorage["message_TriggerType"]=message_TriggerType;
            window.sessionStorage["messageBusinessRole"] = messageBusinessRole;//存储参与业务流程id
            window.sessionStorage["messageNotifyRole"] = messageNotifyRole; //存储通知角色id
            window.sessionStorage["notifyDays"] = notifyDays; //存储提前发送天数
            window.sessionStorage["notifyTimes"] = notifyTimes;//存储发送时间
            window.sessionStorage["messageSendType"] = messageSendType;//短信 站内信状态
	    	if(status!==null){
	    		window.sessionStorage['status']=status;
	    	}else{
	    		
	    	}
            if (message_TriggerType == 1) {
                window.location.href = contextPath + "/message/message_timter_page";
            } else {
                window.location.href = contextPath + "/message/message_trigger_page";
            }
        })
    }
        //消息列表点击跳转
        function messageClick(){
    $(".message-title a").on("click", function() {
        var _this = this;
        var status=$('#my-management-ct .nav-tabs li.active').attr('data-status');
        var list_page_no = parseInt($('#pageBar li.active').text());
        window.sessionStorage["listPageNo"] = list_page_no;
        var groupId = $(_this).parent().parent().find('[data-send-id]').attr('data-send-id');//消息列表id
        var messageSendType = $(_this).parent().parent().find('[data-send-type]').attr('data-send-type');//
        var messageTitle = $(_this).parent().parent().find('[data-node]').attr('data-node');//模板类型
        var messageServiceType = $(_this).parent().parent().find('[data-type]').attr('data-type');//业务类型
        window.sessionStorage["grouPid"] = groupId;//存储消息列表id
        window.sessionStorage["messageSendType"] = messageSendType;
        window.sessionStorage["messageTitle"] = messageTitle;//模板类型
        window.sessionStorage["messageServiceType"] = messageServiceType;//
    	if(status!==null){
    		window.sessionStorage['status']=status;
    	}else{
    		
    	}
        window.location.href = contextPath + "/message/message_detail_page";
    })
    };
    //消息模板状态修改
    var cur = false
    function getStatus() {
        $(".message-status").on('click', function(e) {
            var status = null;
            if (!$(this).find('input[type="checkbox"]').is(':checked')) {
                status = 1;
            } else {
                status = 0;
            }
            var _this = this;
            var groupId = $(this).parent().parent().find('[data-id]').attr('data-id')
            var param = {
                groupId: groupId,
                status: status
            }
            HttpUtils.get_change_status(param, function(data) {
            	$(_this).find('input[type="checkbox"]').attr('data-groupstatus',data.data.messageGroupStatus);
            if (data.statusCode=='200') {
                if ($(_this).find('input[type="checkbox"]').is(':checked')) {
                    $(_this).find('input[type="checkbox"]').removeAttr('checked');
                } else {
                    $(_this).find('input[type="checkbox"]').attr('checked', '');
                }
              }
            })
        })
    }
    
    
    //pagebar 用户管理从哪里来回哪里去
    function pageList_show(){
    	var status=window.sessionStorage['status'];
			if(status === '3' ){
		        	MessagementData({page: 0,size: size});
					$('#my-management-ct .nav-tabs li').each(function(){
						if($(this).attr('data-status') === status){
							$(this).addClass('active').siblings().removeClass('active');
						}
					})
		            $('#message_list').hide();
		            $('#message_template').show();
			
		}else if(status === '1'){

		}
    }
    pageList_show();
    
    
    
    
    
    

})

 
