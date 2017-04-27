/**
 * @Author yugang
 * @Date 2016-11-07
 * @description 合作伙伴
 */
$().ready(function() {
	
    var totalCount = null;
    var size = 12;
    //合作伙伴列表渲染
    function renderData(param){
    	var paramData = param;
    	HttpUtils.get_cooperativeapplication_data (paramData,function(data){
    		if(data!==undefined && data!==''&& data.data!==null && data.data!==undefined){
    			var curData = data.data.content;
    			console.debug(curData);
    			var h='';
    	    	$.each(curData,function(i,item){
    	    		h+='<tr><td>'+(i+1)+'</td>';
    	    		h+='<td>'+item.partnerName+'</td>';
    	    		h+='<td>'+item.partnerType.partnerTypeName+'</td>';
    	    		h+='<td>'+item.partnerContacts+'</td>';
    	    		h+='<td>'+item.partnerContactsNums+'</td>'
    	    	})
    	    	if(curData.length>0){
    	    		$('#cooperative_application_table').find('tbody').html(h);
        	    	totalCount = data.data.totalPages;
        	    	console.debug('总页数==='+totalCount);
        	    	console.debug('当前数据==='+curData);
    	    	}else{
    	    		$('#cooperative_application_table').find('tbody').html('');
        	    	totalCount = 0;
    	    	}
    	    	
    		}
    	})
    }
    
    
    function rendListData(search,page){
    	var no_content_dom = $('.no-content-container');
    	renderData({search:search,page:page,size:size});
    	if(totalCount<1){
    		no_content_dom.html(no_content_html);
    		$('#pageBar').html('');
    		$('#cooperative_application_table').find('thead').hide();
    		return 
    	}
    	no_content_dom.html('');
    	$('#cooperative_application_table').find('thead').show();
        new PageBar('#pageBar',totalCount,function(curPageNo){
            var paramData = {}
            paramData.search = search;
            paramData.page = (curPageNo-1);
            paramData.size = size;
            renderData(paramData);
        });
    }
    
    rendListData('',0);
    
    //合作伙伴模糊查询
    $(".search").click(function(){
    	var search = $.trim($(".searchStr").val());
    	rendListData(search,0)
    });
})