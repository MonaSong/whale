/**
 * @Author yjx
 * @Date 2016-11-017
 * @description 消息模板请求接口封装
 */
$().ready(function() {
    //拿到所需要的数据进行回显
    $("#trigger_node").val(window.sessionStorage["messageServiceType"]);
    $("#textara_content").text(window.sessionStorage["messageContent"]); //消息内容
    $("#template_name").val(window.sessionStorage["messageGroupName"]);
    $('#messageTitle').val(window.sessionStorage["messagetitle"]); //消息标题
    $('#advance_notice').val(window.sessionStorage["notifyDays"]);
    $('#send_time').val(window.sessionStorage["notifyTimes"]); //时间
    if (window.sessionStorage["messageServiceNode"] == 0) {
        $("#message_title").val("触发型");
    } else {
        $("#message_title").val("定时型");
    }

    //前端验证
    var registerform = $('#message-form');
    var registerrules = {
        messageTitle: {
            required: true,
            maxlength: 15
        },
        service: {
            required: true,
        },
        messageContent: {
            required: true,
            maxlength: 500
        },
        notifyDays: {
            required: true,
            maxlength: 500
        },

    };

    var registermessages = {
        messageTitle: {
            required: '必填字段',
            maxlength: "超出输入范围，不超过15个字符"
        },
        service_role: {
            required: '必填字段',
        },
        messageContent: {
            required: '必填字段',
            maxlength: 500
        },
        notifyDays: {
            required: '必填字段',
            maxlength: 500
        }
    };

    formValidate(registerform, registerrules, registermessages);
    /**
     * @Author yjx
     * @Date 2016-11-28
     * @description 获取参与流程的所有角色
     */
    function message_viewPage(param) {
        var paramData = param;
        HttpUtils.get_Management_role(paramData, function(data) {
            if (data !== undefined && data !== '' && data.data !== null && data.data !== undefined) {
                var message_roleData = data.data;
                console.debug(message_roleData);
                var html = '';
                $.each(message_roleData, function(i, item) {
                    html += '<tr data-role-name="' + item.roleName + '" data-id="' + item.roleId + '"><td><input type="checkbox" class="select-use"></td>'
                    html += '<td>' + (i + 1) + '</td>';
                    html += '<td data-id="' + item.roleId + '" data-role-name="' + item.roleName + '">' + item.roleName + '</td>';
                    html += '<td>' + item.typeName + '</td></tr>'
                });
                $("#message-send").find('tbody').html(html);
                selectAll();
            }
        })
    }
    message_viewPage();
    //全选checkbox
    function selectAll() {
        $('#selectAll').on('click', function() {
            $(this).is(':checked') ? $('.select-use').prop('checked', true) : $('.select-use').prop('checked', false)
        })
    }
    //全选checkbox
    function selectRole() {
        $('#selectRole').on('click', function() {
            $(this).is(':checked') ? $('.select-Role').prop('checked', true) : $('.select-Role').prop('checked', false)
        })
    }
    // 所有参与流程角色
    $('.audit-sure').on('click', function() {
            //初始化
            $('#service_role').html('');
            var checklength = $('.select-use:checked');
            var arr = [];
            var Role_id = [];
            if (checklength < 1) {
                return
            }
            $.each($('.select-use:checked'), function(i, item) {
                arr.push($(item).parent().parent().attr('data-role-name'));
                Role_id.push($(item).parent().parent().attr('data-id'));
            })

            //增加通知已参与角色
            var Business_role = '';
            for (var i = 0; i < arr.length; i++) {
                Business_role += '<span data-id="' + Role_id[i] + '" class="bage-default">' + arr[i] + '<b class="red img-message icon-close delete_role"></b>' + '</span>';
            }
            $("#service_role").append(Business_role);
            deleteRole();
        })
        //所有角色列表
    $('.message-Role').on('click', function() {
            //初始化
            $('#service').html('');
            var checklength = $('.select-Role:checked');
            var arrrole = [];
            var messagerole = [];
            if (checklength < 1) {
                return
            }
            $.each(checklength, function(i, item) {
                    arrrole.push($(item).parent().parent().attr('data-role-name'));
                    messagerole.push($(item).parent().parent().attr('data-id'));
                })
                //增加通知角色
            var Business_rol = '';
            for (var i = 0; i < arrrole.length; i++) {
                Business_rol += '<span data-id="' + messagerole[i] + '" class="bage-default">' + arrrole[i] + '<b class="red img-message icon-close delete_role"></b>' + '</span>';
            }

            $("#service").append(Business_rol);
            deleteRole();
        })
        //获取所有角色列表
    function message_Participation(param) {
        HttpUtils.get_participation_role(param, function(data) {
            if (data !== undefined && data !== '' && data.data !== null && data.data !== undefined) {
                var message_Participation = data.data;
                var html = '';
                $.each(message_Participation, function(i, item) {
                    html += '<tr data-role-name="' + item.roleName + '" data-id="' + item.roleId + '"><td><input type="checkbox" class="select-Role"></td>'
                    html += '<td>' + (i + 1) + '</td>';
                    html += '<td data-role-name="' + item.roleName + '">' + item.roleName + '</td>';
                    html += '<td>' + item.institutionTypeName + '</td></tr>'
                });
                $("#message-role").find('tbody').html(html);
                selectRole();
                deleteRole()
            }
        })
    }
    message_Participation();
    //保存消息模板修改
    function Message_Translation() {
        $('.btn-message-role').on('click', function() {
            //提交数据进行判断  如果为空则不提交
            if (!$('#message-form').valid()) {
                return;
            }

            //前端验证 对select框的值来进行判断,如果等于请选择则提示是必填字段
            var select_prov = $('#advance_notice').val() === '请选择';
            var select_time = $('#send_time').val() === '请选择';
            if (select_prov) {
                $('[data-role="prov"]').append('<label class="error" for="companyAddress">这是必填字段</label>');
            }
            if (select_time) {
                $('[data-role="time"]').append('<label class="error" for="companyAddress">这是必填字段</label>');
            }

            //获取短信 站内信  状态
            var radio_btn_status = null;
            var status1 = $('[name="mail"]').is(':checked');
            var status2 = $('[name="messageSendType"]').is(':checked');
            if (status1 && status2) {
                radio_btn_status = 3; //短信加站内信
            } else if (status1) {
                radio_btn_status = 1 //站内信
            } else if (status2) {
                radio_btn_status = 2 //短信
            }
            if (!radio_btn_status) {
                $("#messagesendtype").append('<label class="error" for="companyAddress">必填字段</label>');
                return
            }
            //启用禁用按钮
            var messageGroupStatus = null;
            var messageGroupStatus1 = $('[name="messageGroupStatus"]').is(':checked');
            if (messageGroupStatus1) {
                messageGroupStatus = 1
            } else {
                messageGroupStatus = 0
            }
            //获取所选的参与流程id
            var checklength = $('#service_role').find('span')
            var arr = [];
            $.each(checklength, function(i, item) {
                arr.push($(item).attr('data-id'))
            })
            stationLetterIds = arr.join(',');
            console.debug(stationLetterIds);

            //获取通知角色id
            var checklengthRole = $('#service').find('span')
            var arr_Role = [];
            $.each(checklengthRole, function(i, item) {
                arr_Role.push($(item).attr('data-id'))
            })
            messageNotifyRole = arr_Role.join(',');
            console.debug(messageNotifyRole);
            //保存消息模板传入的参数
            var param = {
                messageTitle: $('[name="messageTitle"]').val(), //信息的标题
                messageBusinessRole: stationLetterIds, //参与流程id
                messageNotifyRole: messageNotifyRole, //所有角色id
                messageContent: $('[name="messageContent"]').val(), //消息内容
                messageSendType: radio_btn_status, //信息的发送方式
                messageGroupStatus: messageGroupStatus, //状态
                notifyDays: $('[name="notifyDays"]').val(), //提前通知天数
                notifyTimes: $('[name="notifyTimes"]').val(), //时间
                id: window.sessionStorage["groupId"] //模板id
            }
            var html = '';
            console.debug(param);
            HttpUtils.get_Message_save(param, function(data) {
                if (data.statusCode == '200') {
                    window.location.href = contextPath + "/message/message_list_page";
                }

            })
        })
    }
    Message_Translation();
    //已通知角色回显
    function messageData() {
        var param = {
            roleId: window.sessionStorage["messageBusinessRole"], //获取已参与流程id
        }
        var paramData = {
                roleId: window.sessionStorage["messageNotifyRole"], //获取通知角色id
            }
            //循环遍历数据
        HttpUtils.get_messageRequestdata(param, function(data) {
                var MessageData = data.data;
                var html = '';
                $.each(MessageData, function(i, item) {
                    html += '<span data-id="' + item.roleId + '" class="bage-default">' + item.roleName + '<b class="red img-message delete_role icon-close"></b>' + '</span>'
                })
                $('#service_role').html(html);
                messageTemplate();
                deleteRole();
                
                
            })
            //循环遍历数据
        HttpUtils.get_messageRequestdata(paramData, function(data) {
            var Message = data.data;
            var html = '';
            $.each(Message, function(i, item) {
                html += '<span data-id="' + item.roleId + '" class="bage-default">' + item.roleName + '<b class="red img-message delete_role icon-close"></b>' + '</span>'
                $('#service').html(html);
                messageTemplate();
                deleteRole();
            })
        })
    }
    messageData();


    /*业务办理角色和通知角色内外勾选一致*/
    var arr_check = [];
    function userlength(){
    	/*业务办理角色id*/
        var usercheckbox=$('#service_role').find('span')
        console.debug(usercheckbox);
        var userarr=[];
        var user_id=[];
        $.each(usercheckbox, function(i, item) {
        	user_id.push($(item).attr('data-id'));
        })
        
        /*业务办理角色id*/
         console.debug(user_id);
        var checklength = $('#message-send').find('tbody tr');
        console.debug(checklength);
        var arr = [];
        var Role_id = [];
        $.each(checklength, function(i, item) {
            Role_id.push($(item).attr('data-id'));
        })
        console.debug(Role_id);
        
        /*循环嵌套遍历*/
        $.each(user_id,function(i, item){
        	$.each(Role_id,function(j, item){
        		if(user_id[i] === Role_id[j]){
        			arr_check.push(j)
        		}
        	})
        })
        
    }
    userlength();
    
    var service_arr_check=[];
    function service(){
        /*通知角色id*/
        var service_checkbox=$('#service').find('span')
        console.debug(service_checkbox);
        var servicearr=[];
        var service_id=[];
        $.each(service_checkbox, function(i, item) {
        	service_id.push($(item).attr('data-id'));
        })
        
        /*选择通知角色id*/
        var role_length = $('#message-role').find('tbody tr');
        console.debug(role_length);
        var message_arr = [];
        var message_id = [];
        $.each(role_length, function(i, item) {
        	message_id.push($(item).attr('data-id'));
        })
        console.debug(message_id);
        /*循环嵌套遍历*/
        $.each(service_id,function(i, item){
        	$.each(message_id,function(j, item){
        		if(service_id[i] === message_id[j]){
        			service_arr_check.push(j)
        		}
        	})
        })
    }
    service()
    //启用状态保存
    function messageGroupStatus() {
        var html = '';
        if (window.sessionStorage["messageGroupStatus"] == 1) {
            html += '<label class="animate-checkbox message-status"> <input type="checkbox" checked="" name="messageGroupStatus" id="agency-status"> <span><b class=""></b></span> <b class=""></b></label>'
        } else {
            html += '<label class="animate-checkbox message-status"> <input type="checkbox" name="messageGroupStatus" id="agency-status"> <span><b class=""></b></span> <b class=""></b></label>'
        }
        $('#message-status').append(html);
    }
    messageGroupStatus();
    //checkbox回显短信  站内短信
    function messageSendType() {
        var html = '';
        if (window.sessionStorage["messageSendType"] == 1) {
            html += '<div class="send-out">'
            html += '<input type="checkbox" class="short_message" name="messageSendType"><b class="mode">短信</b></div>'
            html += '<div class="send-out"><input type="checkbox"  checked="" class="short_message" name="mail"><b class="mode">站内消息</b></div>'
        } else if (window.sessionStorage["messageSendType"] == 2) {
            html += '<div class="send-out">'
            html += '<input type="checkbox" class="short_message"  checked=""  name="messageSendType"><b class="mode">短信</b></div>'
            html += '<div class="send-out"><input type="checkbox" class="short_message" name="mail"><b class="mode">站内消息</b></div>'
        } else if (window.sessionStorage["messageSendType"] == 3) {
            html += '<div class="send-out control-label text-left">'
            html += '<input type="checkbox" class="short_message"  checked=""  name="messageSendType"><b class="mode">短信</b></div>'
            html += '<div class="send-out control-label text-left"><input type="checkbox" checked="" class="short_message" name="mail"><b class="mode">站内消息</b></div>'
        } else {
            html += '<div class="col-md-1 control-label">'
            html += '<input type="checkbox" class="short_message" name="messageSendType"><b class="mode">短信</b></label>'
            html += '<div class="col-md-2 control-label"><input type="checkbox" class="short_message" name="mail"><b class="mode">站内消息</b></div>'
        }
        $('#messagesendtype').append(html);
        messageTemplate();
    }
    messageSendType();
    //点击取消页面跳转
    $('.btn-message-call').on('click', function() {
        window.location.href = contextPath + "/message/message_list_page";
    })

    //删除已选择已发送角色和通知角色
    function deleteRole() {
        $('.delete_role').on('click', function() {
            var _this = this;
            $(_this).parents('.bage-default').remove();
            arr_check=[];
            service_arr_check=[];
            userlength();
            service();
        });
    }

    
    function messageTemplate() {
    	var messageStatus=$('[name="messageGroupStatus"]').is(':checked');
        if (messageStatus) {
            $('select,textarea,input').attr('disabled', '');
            $('.red').hide();
            $('.modal-footer').hide();
            $('[name=messageGroupStatus]').removeAttr('disabled', '');
            $('[name=messageSendType]').attr('disabled', '');
        } else {
            $('select,textarea,input').remove('disabled', '');
        }
    }
    
    $('.message-status').on('click',function(){
    	var messageStatus=$('[name="messageGroupStatus"]').is(':checked');
        if (messageStatus) {
            $('select,textarea,input').attr('disabled', '');
            $('.red').hide();
            $('.modal-footer').hide();
            $('[name=messageGroupStatus]').removeAttr('disabled', '');
            $('[name=messageSendType]').attr('disabled', '');
        } else {
            $('select,textarea,input').removeAttr('disabled', '');
            $('.red').show();
            $('.modal-footer').show();
            $('.message').attr('disabled', '');
            $('[name=template_name]').attr('disabled', '');
            $('[name=message_title]').attr('disabled', '');
           
        }
    })
    
/*业务办理角色和通知角色内外勾选一致*/
    function Rolemanagement(){
 	   var messageGroupStatus1 = $('[name="messageGroupStatus"]').is(':checked');
	   if(messageGroupStatus1){
		   console.debug(arr_check);
	        var checklength = $('#message-send').find('tbody tr');
	        console.debug($(checklength))
	        for(var i=0;i<arr_check.length;i++){
	        	$(checklength[arr_check[i]]).find('.select-use').attr('checked','checked')
	        }
	   }else{
		   console.debug(arr_check);
	        var checklength = $('#message-send').find('tbody tr');
	        $('#message-send tbody tr').find('.select-use').removeAttr("checked","checked");
	        console.debug($(checklength))
	        for(var i=0;i<arr_check.length;i++){
	        	$(checklength[arr_check[i]]).find('.select-use').attr('checked','checked')
	        }
	   }
    }
    
   $('.btn-add').on('click',function(){
	   Rolemanagement();
    })
    $('.audit-close').on('click',function(){
    	var _this=this;
    	$(_this).removeAttr("checked","checked");
    	message_viewPage();
        arr_check=[];
        userlength();
        Rolemanagement();
    })
    
    function notificationRole(){
 	   var messageGroupStatus1 = $('[name="messageGroupStatus"]').is(':checked');
	   if(messageGroupStatus1){
	    	console.debug(service_arr_check);
	    	var role_length = $('#message-role').find('tbody tr');
	        console.debug($(role_length))
	        for(var i=0;i<service_arr_check.length;i++){
	        	$(role_length[service_arr_check[i]]).find('.select-Role').attr('checked','checked')
	        }
	   }else{
	    	console.debug(service_arr_check);
	    	var role_length = $('#message-role').find('tbody tr');
	        $('#message-role tbody tr').find('.select-Role').remove('checked');
	        console.debug($(role_length))
	        for(var i=0;i<service_arr_check.length;i++){
	        	$(role_length[service_arr_check[i]]).find('.select-Role').attr('checked','checked')
	        }
	   }
   }

     $('.btn-service').on('click',function(){
    	   notificationRole();
    })
    $('.btn-cancel').on('click',function(){
    	message_Participation();
        service_arr_check=[];
        service();
        notificationRole();
    })
    $('.icon-delete').on('click',function(){
    	var messageStatus=$('[name="messageGroupStatus"]').is(':checked');
    	if(messageStatus){
    		
    	}else{
        	message_viewPage();
            arr_check=[];
            userlength();
            Rolemanagement();
            
        	message_Participation();
            service_arr_check=[];
            service();
            notificationRole();
    	}
    })
})