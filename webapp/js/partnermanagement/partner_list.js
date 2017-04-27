/**
 * @Date:2016/10/31
 * @Author:yugang
 * @Description:partner_list
 */
$().ready(function() {
    $(".btn-addPartner").click(function(){
        window.location.href=contextPath+"/partner/partner_new_page";
    })
    var totalCount = null;
    var size = 10;
    var mark_index = null;
    //合作方列表
    function renderData(param){
    	var paramData = param;
    	HttpUtils.get_partnermanagement_data (paramData,function(data){
    		if(data!==undefined && data!==''&& data.data!==null && data.data!==undefined){
    			var curData = data.data.content;
    			console.debug(data);
    			var h='';
    	    	$.each(curData,function(i,item){
    	    		h+='<tr><td>'+(i+1)+'</td>';
    	    		h+='<td data-name="'+item.partnerName+'" data-name-id="'+item.id+'"><a href="javascript:void(0)">'+item.partnerName+'</a></td>';
    	    		h+='<td data-parner-type-name="'+item.partnerType.partnerTypeName+'" data-parner-type-name-id="'+item.partnerType.id+'">'+item.partnerType.partnerTypeName+'</td>';
    	    		h+='<td data-partner-contacts="'+item.partnerContacts+'">'+item.partnerContacts+'</td>';
    	    		h+='<td data-partner-contactsNums="'+item.partnerContactsNums+'">'+item.partnerContactsNums+'</td>';
    	    		if(item.partnerStatus==1){
    	    			h+='<td class="ani-btn"><span class="animate-checkbox agency-status"><input type="checkbox" checked name="" value="0"><span><b class="on"></b></span><b class="off">OFF</b></span></td>'
    	    		}else{
    	    			h+='<td class="ani-btn"><span class="animate-checkbox agency-status"><input type="checkbox" name="" value="0"><span><b class="on"></b></span><b class="off">OFF</b></span></td>'
    	    		}
    	    	})
    	    	if(curData.length>0){
    	    		$('#partner_list_table').find('tbody').html(h);
        	    	getStatus();
        	    	totalCount = data.data.totalPages;
        	    	linkInfo();
        	    	console.debug('总页数==='+totalCount);
        	    	console.debug('当前数据==='+curData);
    	    	}else{
    	    		$('#partner_list_table').find('tbody').html('');
    	    		totalCount = 0;
    	    	}
    	    	
    		}
    	})
    };
    
    function renderListData(search,page,status_num){
    	var no_content_dom = $('.no-content-container');
    	renderData({search:search,page:page-1,size:size});
    	if(totalCount<1){
    		no_content_dom.html(no_content_html);
    		$('#partner_list_table').find('thead').hide();
    		$('#pageBar').html('');
    		return 
    	}
    	no_content_dom.html('');
    	$('#partner_list_table').find('thead').show();
        new PageBar('#pageBar',totalCount,function(curPageNo){
            var paramData = {}
            paramData.page = (curPageNo-1);
            paramData.size = size;
            paramData.search = search;
            renderData(paramData);
        },page);
    }
  //页面初次加载数据
    var find_search = window.sessionStorage["search"]?window.sessionStorage["search"]:'';
    var init_status = window.sessionStorage["listStatus"]?window.sessionStorage["listStatus"]:'000';
    var init_page_no = window.sessionStorage["listPageNo"]?window.sessionStorage["listPageNo"]:1;
    if(init_status === '000'){
    	$('#my-work-ct>ul>li[data-status="'+init_status+'"]').addClass('active').siblings().removeClass('active');
    	renderListData(find_search,init_page_no,init_status);
    }else{
    	$('#my-work-ct>ul>li[data-status="'+init_status+'"]').addClass('active').siblings().removeClass('active');
    	$('.content-list').removeClass('active');
    	$('.content-type').addClass('active');
    }
    if(find_search!==''){
    	$('.searchStr').val(find_search)
    }
    
    //合作方类型
    function renderTypeData(){
    	HttpUtils.get_partnertype_data(function(data){
    		var typeData = data.data	
        		var h='';
        		$.each(typeData,function(i,item){
    	    		h+='<tr><td class="col-md-2">'+(i+1)+'</td>';
    	    		h+='<td id="'+item.id+'" class="col-md-3"><input disabled="disabled" type="text" value='+item.partnerTypeName+' class="form-control"><span class="notice hide">类型不能为空</span></td>';
    	    		h+='<td class="agency-revise"><span data-name="operater" data-status="modify">修改</span></td>'
    	    	})
    	    	$('#partner_type_table').find('tbody').html(h);
    	})
    }
    
    renderTypeData();
    
    //合作方名称点击进入名称对应的合作方详情
    function linkInfo(){
    	$('#partnerlist tr td:nth-child(2) a').on("click",function(){
        	var _this=this;
        	var searchData=$(".searchStr").val();
	    	if(searchData!==''){
	    		window.sessionStorage['search']=searchData;
	    	}else{
	    		window.sessionStorage['search']='';
	    	}
	    	var list_status = $('#my-work-ct>ul>li.active').attr('data-status');
            var list_page_no = parseInt($('#pageBar li.active').text());
            window.sessionStorage["listStatus"] = list_status;
            window.sessionStorage["listPageNo"] = list_page_no;
        	var partnerName=$(_this).parent().parent().find('[data-name]').attr('data-name')
        	var partnerNameId=$(_this).parent().parent().find('[data-name-id]').attr('data-name-id')
        	var parnerTypeName=$(_this).parent().parent().find('[data-parner-type-name]').attr('data-parner-type-name')
        	var parnerTypeNameId=$(_this).parent().parent().find('[data-parner-type-name-id]').attr('data-parner-type-name-id')
        	var partnerContacts=$(_this).parent().parent().find('[data-partner-contacts]').attr('data-partner-contacts')
        	var partnerContactsNums=$(_this).parent().parent().find('[data-partner-contactsNums]').attr('data-partner-contactsNums')
        	window.sessionStorage['partnerName']=partnerName;
        	window.sessionStorage['parnerTypeName']=parnerTypeName;
        	window.sessionStorage['partnerContacts']=partnerContacts;
        	window.sessionStorage['partnerContactsNums']=partnerContactsNums;
        	window.sessionStorage['partnerNameId']=partnerNameId;
        	window.sessionStorage['parnerTypeNameId']=parnerTypeNameId;
        	window.location.href=contextPath+'/partner/partner_detail_page'
        })
    }
    
    //新增和搜索隐藏
    	$('#my-work-ct>ul>li').on('click',function(){
	    	var status = $(this).attr('data-status');
	    	console.debug(status)
	    	if(status==='001'){
	    		$('.btn-addPartner').hide();
	    		$('.search-bar').hide();
	    		renderTypeData()
	            window.sessionStorage.clear();
	            window.sessionStorage["listStatus"] = status
	    	}else{
	    		renderListData(find_search,1,status);
	            window.sessionStorage.clear();
	            window.sessionStorage["listStatus"] = status
	            $('.btn-addPartner').show();
	    		$('.search-bar').show();
	    		renderListData(find_search,1,status);
	            window.sessionStorage.clear();
	            window.sessionStorage["listStatus"] = status
	    	}
    	})
    //查询
    $(".search").click(function(){
    	var search = $.trim($(".searchStr").val());
    	renderListData(search,0)
    });
    
    //类型修改
    $("#partner_type_table").on('click','[data-name="operater"]',function(){
    	var _this = this;
    	var status = $(_this).attr('data-status');
    	if(status=='modify'){
    		$(_this).parent().parent().find('input').removeAttr("disabled");
    		$(_this).attr('data-status','sure');
    		$(_this).text('保存');
    	}
    	if(status=='sure'){
    		var partnerTypeName=$(_this).parent().parent().find('input').val();
        	if(partnerTypeName!==''){
        		$(this).parent().parent().find('.notice').addClass('hide');
        		var partnerTypeId=$(this).parent().parent().find('[id]').attr('id');
        		console.debug(partnerTypeId)
        		var param={
        				partnerTypeId:partnerTypeId,
        				partnerTypeName:partnerTypeName
        		}
        		HttpUtils.get_partnertypeModify_data(param,function(data){
        			$(_this).parent().parent().find('input').attr("disabled","disabled");
        			$(_this).attr('data-status','modify');
        			$(_this).text('修改');
        		})	
        	}else{
        		$(this).parent().parent().find('.notice').removeClass('hide')
        	}
    	}
    	
    })
  
    
    //状态修改
    var cur = false
    function getStatus(){
    	$(".agency-status").on('click',function(e){
    		    var status = null;
	    		if(!$(this).find('input[type="checkbox"]').is(':checked')){
	    			status = 1;
	    		}else{
	    			status = 0;
	    		}
    		
    			var _this = this;
                var partnerId=$(this).parent().parent().find('[data-name-id]').attr('data-name-id')
                var param={
                	partnerId:partnerId,
                	status:status
                }
                HttpUtils.get_partnerstatus_data(param,function(data){
            		if($(_this).find('input[type="checkbox"]').is(':checked')){
                		$(_this).find('input[type="checkbox"]').removeAttr('checked');
                	}else{
                		$(_this).find('input[type="checkbox"]').attr('checked','');
                	}
                })	
        })
    }
    
})