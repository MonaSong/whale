/**
 * @Author yugang
 * @Date 2016-11-07
 * @description 邀请码管理
 */
$().ready(function() {
    //获取所属角色；
	function isShenqu(){
		var is_shenqu = false;
		HttpUtils.get_invitationrole_data(function(data){
			var id = data.data.roleId;
			is_shenqu = role.compareTo(id,role["zj_region_manager"]);
		})
		return is_shenqu
	}
	var is_shenqu=isShenqu();
	if(is_shenqu){
		$('.addcode').show();
		$('.lose').addClass('lose')
	}else{
		$('.creat-person').show();
		$('.lose').removeClass('lose')
	};
	
	//列表渲染
	var data_status = '000';
    var totalCount = null;
    var size = 10;
    function renderData(param){
    	var paramData = param;
    	HttpUtils.get_invitationcode_data (paramData,function(data){
    		if(data!==undefined && data!==''&& data.data!==null && data.data!==undefined){
    			var curData = data.data.content;
    			console.debug(curData);
    			var h='';
    	    	$.each(curData,function(i,item){
    	    		h+='<tr><td>'+item.id+'</td>';
    	    		if(!is_shenqu){
    	    			h+='<td>'+item.generateUser.trueName+'</td>';
    	    		}
    	    		h+='<td>'+item.createdAt+'</td>';
    	    	})
    	    	if(curData.length>0){
    	    		$('#invitation_code_table').find('tbody').html(h);
        	    	totalCount = data.data.totalPages;
        	    	console.debug('总页数==='+totalCount);
        	    	console.debug('当前数据==='+curData);
    	    	}else{
    	    		$('#invitation_code_table').find('tbody').html('');
        	    	totalCount = 0;
    	    	}
    		}
    	})
    }
    function renderData1(param){
    	var paramData = param;
    	HttpUtils.get_invitationcode_data (paramData,function(data){
    		$('.company').show();
    		$('.user-time').show();
    		if(data!==undefined && data!==''&& data.data!==null && data.data!==undefined){
    			var curData = data.data.content;
    			console.debug(curData);
    			var h='';
    	    	$.each(curData,function(i,item){
    	    		h+='<tr><td>'+item.id+'</td>';
    	    		h+='<td>'+item.compayName+'</td>';
    	    		if(!is_shenqu){
    	    			h+='<td>'+item.generateUser.trueName+'</td>';
    	    		}
    	    		h+='<td>'+item.createdAt+'</td>';
    	    		h+='<td>'+item.updateAt+'</td>';
    	    	})
    	    	if(curData.length>0){
    	    		$('#invitation_code_table').find('tbody').html(h);
        	    	totalCount = data.data.totalPages;
        	    	console.debug('总页数==='+totalCount);
        	    	console.debug('当前数据==='+curData);
    	    	}else{
    	    		$('#invitation_code_table').find('tbody').html('');
        	    	totalCount = 0;
    	    	}
    	    	
    		}
    	})
    }
    function renderData2(param){
    	var paramData = param;
    	HttpUtils.get_invitationcode_data (paramData,function(data){
    		if(data!==undefined && data!==''&& data.data!==null && data.data!==undefined){
    			var curData = data.data.content;
    			console.debug(curData);
    			var h='';
    	    	$.each(curData,function(i,item){
    	    		h+='<tr><td>'+item.id+'</td>';
    	    		if(!is_shenqu){
    	    			h+='<td>'+item.generateUser.trueName+'</td>';
    	    		}
    	    		h+='<td>'+item.createdAt+'</td>';
    	    		h+='<td>'+item.updateAt+'</td>';
    	    	})
    	    	if(curData.length>0){
    	    		$('#invitation_code_table').find('tbody').html(h);
        	    	totalCount = data.data.totalPages;
        	    	console.debug('总页数==='+totalCount);
        	    	console.debug('当前数据==='+curData);
    	    	}else{
    	    		$('#invitation_code_table').find('tbody').html('');
        	    	totalCount = 0;
    	    	}
    		}
    	})
    }   
    
    function rendListData(search,page,status){
    	if(status=='000'){
    		renderData({search:search,page:page-1,status:status,size:size});
    	}else if(status=='001'){
    		renderData1({search:search,page:page-1,status:status,size:size});
    	}else if(status=='010'){
    		renderData2({search:search,page:page-1,status:status,size:size});
    	}
    	var no_content_dom = $('.no-content-container');
    	if(totalCount<1){
    		no_content_dom.html(no_content_html);
    		$('#pageBar').html('');
    		$('#invitation_code_table').find('thead').hide();
    		return 
    	} 
    	no_content_dom.html('');
    	$('#invitation_code_table').find('thead').show();
        new PageBar('#pageBar',totalCount,function(curPageNo){
            var paramData = {}
            paramData.search=search;
            paramData.page = (curPageNo-1);
            paramData.status = status;
            paramData.size = size;
            if(status=='000'){
            	renderData(paramData);
            }else if(status=='001'){
            	renderData1(paramData);
            }else if(status=='010'){
            	renderData2(paramData);
            }
            
        },page);
    }
  //页面初次加载数据
    var find_search = window.sessionStorage["search"]?window.sessionStorage["search"]:'';
    var init_status = window.sessionStorage["listStatus"]?window.sessionStorage["listStatus"]:'000';
    var init_page_no = window.sessionStorage["listPageNo"]?window.sessionStorage["listPageNo"]:1;
    if(init_status === '000'){
    	$('#my-work-ct>ul>li[data-status="'+init_status+'"]').addClass('active').siblings().removeClass('active');
    	rendListData(find_search,init_page_no,init_status);
    }else if(init_status === '001'){
    	$('#my-work-ct>ul>li[data-status="'+init_status+'"]').addClass('active').siblings().removeClass('active');
    	rendListData(find_search,init_page_no,init_status);
    }else{
    	$('#my-work-ct>ul>li[data-status="'+init_status+'"]').addClass('active').siblings().removeClass('active');
    	rendListData(find_search,init_page_no,init_status);
    }
    
    //查询
    $(".search").click(function(){
    	var search = $.trim($(".searchStr").val());
    	rendListData(search,0,data_status);
    });
    
    //切换已激活和未激活
    
    $('#my-work-ct>.nav-tabs>li').on('click',function(){
        var status = $(this).attr('data-status');
        data_status = status;
        var curRenderData = null;
        if(status=='001'){
        	rendListData('',1,status);
            window.sessionStorage.clear();
            window.sessionStorage["listStatus"] = status
        }else if(status=='000'){
        	rendListData('',1,status);
            window.sessionStorage.clear();
            window.sessionStorage["listStatus"] = status
        	$('.company').hide();
    		$('.user-time').hide();
    		$('.user-time').html('使用时间');
        }else{
        	rendListData('',1,status);
            window.sessionStorage.clear();
            window.sessionStorage["listStatus"] = status
        	$('.company').hide();
        	$('.user-time').show();
        	$('.user-time').html('失效时间');
        }
        
        rendListData('',0,status);
    });
    
    //邀请码统计
    HttpUtils.get_invitationcount_data(function(data){
    	var countData=data.data;
    		console.debug(countData)
    		$(".notUsed").html(countData.NOT_USED);
    		$(".alreadyUsed").html(countData.USED);
    		$(".allcode").html(countData.ALL);
    		$(".usercode").html(countData.USED);
    		$(".surpluscode").html(countData.NOT_USED);
    		$(".invalid").html(countData.INVALID);
    });

    //邀请码新增
    $(".addcode").click(function(){
    	var needInvitation=20-$(".notUsed").html();
    	var html='';
    	for(var i=1;i<=needInvitation;i++){
    		html+='<option>'+i+'</option>'
    	}
    	$(".invitation_num").empty();
    	$(".invitation_num").append(html);
    	$("#code").modal('show')
    })
    $(".btn-save").click(function(){	
    	var num=$(".creat").find(" option:selected").text();
    	var param={
    			num:num
    	}
    	console.debug(param);
    	HttpUtils.get_invitationAdd_data(param,function(data){
    		location.reload();
    	})
    })
    
})

