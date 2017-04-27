/**
 * @Author yjx
 * @Date 2016-12-2
 * @description 消息提醒
 */
$().ready(function() {
    //消息列表数据渲染 未读 已读 已删除
    HttpUtils.get_userCountRequest(param, function(data) {
        var userData = data.data;
        $('.notUsed').html('（' + userData.unreadNum + '）');//未读
        $('.alread').html('（' + userData.readNum + '）');//已读
        $('.detele_user').html('（' + userData.deletedNum + '）');//已删除
    });
    var totalCount = null;
    var size = 10; //分页每页显示数量
    function renderData(param) {
        var paramData = param;
        HttpUtils.get_Receiving_letter(paramData, function(data) {
            var curLiStatus = paramData.status;
            if (data !== undefined && data !== '' && data.data !== null && data.data !== undefined) {
                console.log(data);
                var curData = data.data.content;
                 totalCount = data.data.totalPages;
                 var no_content_dom=$('.no-content-container');
             	if(totalCount>0){
             		no_content_dom.html('');
             		$('#pageBar').show();
             		$('#message_table').find('thead').show();
             	}else{
             		$('#message_table').find('thead').hide();
             		$('#pageBar').hide();
             		$('.delete').hide()
             		no_content_dom.html(no_content_html)
             	}
                var html = '';
                var is_unread = (curLiStatus=='0')
                $.each(curData, function(i, item) {
                    if (item.status == '2') {
                    	 html += '<tr data-id="' + item.id + '" class="chec" >';
                    }else{
                    	 html += '<tr data-id="' + item.id + '" class="chec" ><td><input type="checkbox" class="select-use" name="select-use"></td>';
                    }
                    html += '<td class="message '+(is_unread?'msg-bold':'')+'" data-content="' + item.messageContent + '" data-messageTitle="' + item.smsGroup.messageTitle + '"><a href="javascript:void(0)">' + item.smsGroup.messageTitle + '</a></td>';
                    html += '<td >' + item.businessNum + '</td>';
                    html += '<td data-messageServiceType="' + item.smsGroup.messageServiceType + '">' + item.smsGroup.messageServiceType + '</td>';
                    html += '<td data-time="' + item.updateAt + '">' + item.createdAt + '</td>'
                    if (item.status == '2') {
                        html += '</tr>';
                    } else if (item.status == '0') {
                        html += '<td><button  class="message-img trash_icon" data-toggle="modal" data-toggle="modal"data-target=".bs-example-modal-md" data-id="' + item.id + '" ></button> <button type="button" class="message-img remind_hasread mark_hasread" data-id="' + item.id + '"></button></td></tr>';
                    } else {
                        html += '<td><button class="message-img trash_icon" data-toggle="modal" data-toggle="modal" data-toggle="modal"data-target=".bs-example-modal-md" data-id="' + item.id + '" ></button><b class="read" data-id="' + item.id + '" >已读</b></tr>';
                    }
                                    
                    
                })
                $('#message_management').find('tbody').html(html);
                selectAll();
                deleteData();
                Markhasread();
               
            };
        })
        $(".message a").on("click", function() {
            var _this = this;
            var list_status = $('#my-work-ct>ul>li.active').attr('data-status');
            var list_page_no = parseInt($('#pageBar li.active').text());
            window.sessionStorage["listStatus"] = list_status;
            window.sessionStorage["listPageNo"] = list_page_no;
         	
            if(list_status === '0'){
                //标记已读
             	stationLetterIds = $(_this).parent().parent().attr('data-id');
             	var param = {
             		"stationLetterIds": stationLetterIds,
             		"status": 1
             	}
             	HttpUtils.get_messageRequest(param, function(data) {
             		if (data.statusCode == '200' && data.data !== null && data.data.result !== '') {
             			window.location.reload(true);
             		}
             	})
            }

            var searchData=$(".search_remind").val();
	    	if(searchData!==''){
	    		window.sessionStorage['search']=searchData;
	    	}else{
	    		window.sessionStorage['search']='';
	    	}
            
            var messageContent = $(_this).parent().parent().find('[data-content]').attr('data-content');
            var messageTitle = $(_this).parent().parent().find('[data-messageTitle]').attr('data-messageTitle');
            var messageServiceType = $(_this).parent().parent().find('[data-messageServiceType]').attr('data-messageServiceType');
            var updateAt = $(_this).parent().parent().find('[data-time]').attr('data-time');
            window.sessionStorage["messageContent"] = messageContent;
            window.sessionStorage["messageTitle"] = messageTitle;
            window.sessionStorage["messageServiceType"] = messageServiceType;
            window.sessionStorage["updateAt"] = updateAt;
            window.location.href = contextPath + "/message/message_content_page";
        })
    }
    //消息列表数据
    
    function messageRemind(search_text,status_num,page){
    	$('#my-work-ct>ul>li[data-status="'+status_num+'"]').addClass('active').siblings().removeClass('active');
    	if(window.sessionStorage["search"]== undefined){
    		 renderData({search: search_text,status: status_num,page:page-1,size: size});
    		    new PageBar('#pageBar', totalCount, function(curPageNo) {
    		        var paramData = {}
    		        paramData.search = search_text;
    		        paramData.status = status_num;
    		        paramData.page = (curPageNo - 1);
    		        paramData.size = size;
    		        renderData(paramData);

    		    },page);
    	}else{
    		var search = $.trim(window.sessionStorage["search"]);
    		$('.search_remind').val(search);
    		 renderData({search: search,status: status_num,page:page-1,size: size});
    		    //调用分页方法
    		    new PageBar('#pageBar', totalCount, function(curPageNo) {
    		        var paramData = {}
    		        paramData.search = search;
    		        paramData.status = status_num;
    		        paramData.page = (curPageNo - 1);
    		        paramData.size = size;
    		        renderData(paramData);
    		    },page);
    	}
   
    }
    //页面初次加载数据
    var init_status =window.sessionStorage["listStatus"]?window.sessionStorage["listStatus"]:'0';
    //判断当前的状态是否等于0；
    if(window.sessionStorage["listStatus"] === '0'){
    	var init_page_no = '1';
    }else{
    	var init_page_no = window.sessionStorage["listPageNo"]?window.sessionStorage["listPageNo"]:1;
    }
   
    messageRemind('',init_status,init_page_no);
    //消息数据模糊查询
    $(".w-icon-search").click(function() {
        var status = $('#my-work-ct>ul>li.active').attr('data-status');
        var search = $.trim($(".search_remind").val());
    	 window.sessionStorage["search"]= search ;
        	
        renderData({search: search,status: status,page: 0,size: size});
        if(status === '0'){
        	$('.table tbody tr td').css("font-weight","600");
        }
        new PageBar('#pageBar', totalCount, function(curPageNo) {
            var paramData = {}
            paramData.search = search;
            paramData.status = status;
            paramData.page = (curPageNo - 1);
            paramData.size = size;
            renderData(paramData);
        });
    });
    //点击状态加载对应的数据
    $('#my-work-ct>ul>li').on('click', function() {
        var status = $(this).attr('data-status');
        window.sessionStorage["listStatus"] = status;
     	
        $("#operation").show();
        if (status == '2') {
            $("#operation").hide();
            $('.delete').hide();
            $('.mark_hasread').hide();
            $('[data-id=time]').text('时间');
            $('.checkbox-list').hide();
        } else if (status == '1') {
            $('.mark_hasread').hide();
            $('[data-id=time]').text('接收时间');
            $('.checkbox-list').show();
            
        } else  if(status === '0'){
            $('.delete').show();
            $('.mark_hasread').show();
            $('[data-id=time]').text('接收时间');
            $('.table').addClass('message_remind');
            $('.checkbox-list').show();
        }
        if(window.sessionStorage["search"] == undefined){
        	search='';
        }else{
        	search=$.trim(window.sessionStorage["search"]);
        }
        renderData({search: search,status: status,page: 0,size: size});
        new PageBar('#pageBar', totalCount, function(curPageNo) {
            var paramData = {}
            paramData.search = search;
            paramData.status = status;
            paramData.page = (curPageNo - 1);
            paramData.size = size;
            renderData(paramData);
        });
    })
   //全选checkbox
    function selectAll() {
        $('#selectAll').on('click', function() {
            $(this).is(':checked') ? $('.select-use').prop('checked', true) : $('.select-use').prop('checked', false)
        })
    }
    //标记已读
    $('.mark_hasread').on('click', function() {
            var checklength = $('.select-use:checked');
            var arr = [];
            if (checklength < 1) {
                return
            }
            $.each($('.select-use:checked'), function(i, item) {
                arr.push($(item).parent().parent().attr('data-id'));
            })
            stationLetterIds = arr.join(',');
            var param = {
                "stationLetterIds": stationLetterIds,
                "status": 1
            }
            HttpUtils.get_messageRequest(param, function(data) {
                window.location.reload(true);
            })
        })
        //删除消息提醒内容
    $('.delete').on('click', function() {
            var checklength = $('.select-use:checked');
            var status1 = $('[name="select-use"]').is(':checked');
            if(status1){
            	$('.admin_user').text('是否要删除消息');
            }else{
            	$('.admin_user').text('请勾选具体要删除的消息');
            }
            var arr = [];
            if (checklength < 1) {
                return
            }
            $.each($('.select-use:checked'), function(i, item) {
                arr.push($(item).parent().parent().attr('data-id'));
            })
            stationLetterIds = arr.join(',');
     		$('.delete_message').click(function() {
     			var param = {
     				"stationLetterIds": stationLetterIds,
     				"status": 2
     			}
     			HttpUtils.get_messageRequest(param, function(data) {
     				window.location.reload(true);
     			})
     		})
        })
        
     //删除消息提醒内容{
     function deleteData() {
     	$('.trash_icon').on('click', function() {
     		var _this = this
     		stationLetterIds = $(_this).attr('data-id');
     		$('.delete_message').click(function() {
     			var param = {
     				"stationLetterIds": stationLetterIds,
     				"status": 2
     			}
     			HttpUtils.get_messageRequest(param, function(data) {
     				window.location.reload(true);
     			})
     		})
     	})
     }
//点击标记已读
    function Markhasread(){
     $('.mark_hasread').on('click', function() {
     	var _this = this
     	stationLetterIds = $(_this).attr('data-id');
     	var param = {
     		"stationLetterIds": stationLetterIds,
     		"status": 1
     	}
     	HttpUtils.get_messageRequest(param, function(data) {
     		if (data.statusCode == '200' && data.data !== null && data.data.result !== '') {
     			window.location.reload(true);
     		}
     	})
     })
    }
    
    
    
    
   /*判断当前状态是多少*/
    if (window.sessionStorage['listStatus']==='2') {
            $("#operation").hide();
            $('.delete').hide();
            $('.mark_hasread').hide();
            $('[data-id=time]').text('时间');
            $('.checkbox-list').hide();
        } else if (window.sessionStorage['listStatus'] == '1') {
            $('.mark_hasread').hide();
            $('[data-id=time]').text('接收时间');
            $('.checkbox-list').show();
        } else {
            $('.delete').show();
            $('.mark_hasread').show();
            $('[data-id=time]').text('接收时间');
            $('.table').addClass('message_remind');
            $('.checkbox-list').show();
            
        }
    //重置menu
    resetMenu();
    
})