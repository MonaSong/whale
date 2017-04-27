  $().ready(function() { 
	  
	  $('#messageServiceType').html(window.sessionStorage["messageServiceType"])//业务类型
	  $('#textara_content').val(window.sessionStorage["messageContent"]);//消息内容
	  $('#messageTitle').html(window.sessionStorage["messageTitle"]);//消息标题
	  $('#messagetime').html(window.sessionStorage["updateAt"]);//接收时间
	  $('.btn-save').click(function(){
		  window.location.href = contextPath + "/message/message_remind_page";
	  })
  })