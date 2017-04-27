  $().ready(function() {
    //获取消息列表的消息详情
    $('#message_headerid').html(window.sessionStorage["messageTitle"]);
    $('#servicetype').html(window.sessionStorage["messageServiceType"]);
    HttpUtils.get_userCountRequest(function(data) {
      $('.notUsed').html();
    })
    //消息列表消息详情
    function MessageRecipients(param) {
      var paramData = param;
      HttpUtils.get_Message_Recipients(paramData, function(data) {
        if (data !== undefined && data !== '' && data.data !== null && data.data !== undefined) {
          var MessageData = data.data;
          totalCount = data.data.totalPages;
          var html = "";
          console.debug('列表数据');
          console.debug(MessageData);
          $.each(MessageData, function(i, item) {
        	if(item.user.institution==null){
        		  return true 
        	}
            html += '<tr>';
            html += '<td data-id="' + item.id + '">' + item.user.mobile + '</td>';
            html += '<td data-id="' + item.id + '">' + item.user.trueName + '</td>';
            if(item.user.institution.institutionName === null){
            	html += '<td data-id="' + item.id + '">'+ +'</td>'
            }else{
            	html += '<td data-id="' + item.id + '">' + item.user.institution.institutionName +'</td>'
            }
            if (item.smsStatus == '1') {
              html += '<td data-id="' + item.id + '">' + '成功' + '</td>'
            } else {
              html += '<td data-id="' + item.id + '">' + '--' + '</td>'
            }
            html += '<td data-id="' + item.id + '">' + item.createdAt + '</td></tr>'
            $('#messageContent').text(item.messageContent);
          })
          $("#message_list_table").find('tbody').html(html);
        }
      })
    }
    if(window.sessionStorage["messageSendType"]==="1"){
    	var type= 'stationLetter';
    }else if(window.sessionStorage["messageSendType"]==="2"){
    	var type='2'
    }else{
    	var type='3'
    }
    var param = {
      groupId: window.sessionStorage["grouPid"],
      type: type
    }
    MessageRecipients(param);



    //点击确定跳转消息列表界面
    $('.btn-message').click(function() {
      window.location.href = contextPath + "/message/message_list_page";
    })
  })