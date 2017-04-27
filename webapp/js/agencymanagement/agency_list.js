/**
 * @Date:2016/10/27
 * @Author:yugang
 * @Description:agency_list
 */
$(document).ready(function() {
	var mark_index = null;
	//新增机构跳转
    $(".btn-add").click(function(){
        window.location.href=contextPath+"/agency/agency_new_page";
    });
    
    //机构列表
    var totalCount = null;
    var size = 10;
    
    
    function renderData(param){
        var paramData = param;
        HttpUtils.get_agencylist_data(paramData,function(data){
            if(data!==undefined && data!==''&& data.data!==null && data.data!==undefined){
                var curData = data.data.content;
                console.debug(data.data);
                var html='';
                $.each(curData,function(i,item){
                	html+='<tr data-institutionId="'+item.id+'"><td><input type="checkbox" class="select-use"></td>'
                    html+='<td>'+(i+1)+'</td>';
                    html+='<td data-name="'+item.institutionName+'" data-name-id="'+item.id+'"><a href="javascript:void(0)">'+item.institutionName+'</a></td>';
                    html+='<td data-institution-type-name="'+item.institutionType.institutionTypeName+'" data-institution-type-name-id="'+item.institutionType.id+'">'+item.institutionType.institutionTypeName+'</td>';
                    html+='<td data-institution-contacts="'+item.institutionContact+'">'+item.institutionContact+'</td>';
                    html+='<td data-institution-contactsNums="'+item.institutionContactNums+'">'+item.institutionContactNums+'</td>';
                    html+='<td data-institution-address="'+item.institutionAddress+'">'+item.institutionAddress+'</td>'
                    if(item.institutionStatus===1){
                    	html+='<td class="ani-btn"><span class="animate-checkbox agency-status"><input data-institution-status="'+item.institutionStatus+'" type="checkbox" id="agency_status" checked name="" value="0"><span><b class="on"></b></span><b class="off">OFF</b></span></td>';
    	    		}else{
    	    			html+='<td class="ani-btn"><span class="animate-checkbox agency-status"><input data-institution-status="'+item.institutionStatus+'" type="checkbox" id="agency_status" name="" value="0"><span><b class="on"></b></span><b class="off">OFF</b></span></td>';
    	    		}
                })
                
                if(curData.length>0){
                	$('#agency_table').find('tbody').html(html);
                    getStatus()
                    linkInfo();
                    totalCount = data.data.totalPages;
                    selectAll();
                    batchEnable();
                    batchDisable();
                    console.debug('总页数==='+totalCount);
                    console.debug('当前数据==='+curData);
                }else{
                	$('#agency_table').find('tbody').html('');
                	totalCount = 0;
                }
                
            }
        })
    };
    
  //机构列表
    
    function renderListData(search,page,status_num){
    	//按照status 渲染tab
    	var no_content_dom = $('.no-content-container');
    	renderData({search:search,page:page-1,size:size});
    	if(totalCount<1){
    		no_content_dom.html(no_content_html);
    		$('#pageBar').html('');
    		$('#agency_table').find('thead').hide();
    		return 
    	}
    	no_content_dom.html('');
    	$('#agency_table').find('thead').show();
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
    	$('.agency-list').removeClass('active');
    	$('.agency-type').addClass('active');
    }
    if(find_search!==''){
    	$('.searchStr').val(find_search)
    }
    //机构类型
    function renderTypeData(){
    	HttpUtils.get_agencyType_data(function(data){
        	var typeData = data.data
    		console.debug(typeData)
    		var h='';
    		$.each(typeData,function(i,item){
	    		h+='<tr><td class="col-md-2">'+(i+1)+'</td>';
	    		h+='<td id="'+item.id+'" class="col-md-3"><input disabled="disabled" type="text" value='+item.institutionTypeName+' class="form-control col-md-2"><span class="notice hide red">类型不能为空</span></td>';
	    		h+='<td class="agency-revise"><span class="" data-name="operater" data-status="modify">修改</span></td>'
	    	})
	    	$('#agency_type_table').find('tbody').html(h);
        })
    }
    renderTypeData();
    
    //机构类型跳转
    function type(){
    	$('.agencyType').on('click',function(){
    		$('.batch-disable').css('display','none')
    		$('.batch-enable').css('display','none')
    		$('.btn-add').css('display','none')
    	})
    }
    type()
    //查询
    $(".search").click(function(){
    	var search=$(".searchStr").val();
    	renderListData(search,0)
    });
    //修改机构类型
    $("#agency_type_table").on('click','[data-name="operater"]',function(){
    	var _this = this;
    	var status = $(_this).attr('data-status');
    	if(status=='modify'){
    		$(_this).parent().parent().find('input').removeAttr("disabled");
    		$(_this).attr('data-status','sure');
    		$(_this).text('保存');
    	}
    	if(status=='sure'){
    		var institutionTypeName=$(_this).parent().parent().find('input').val();
        	if(institutionTypeName!==''){
        		$(this).parent().parent().find('.notice').addClass('hide')
        		//$(this).parent().parent().find('input').attr("disabled","disabled");
        		var institutionTypeId=$(this).parent().parent().find('[id]').attr('id');
        		console.debug(institutionTypeId)
        		var url=contextPath+'/agency/update_institutype';
        		var param={
        				institutionTypeId:institutionTypeId,
        				institutionTypeName:institutionTypeName
        		}
        		console.debug(param)
        		HttpUtils.get_agencyModify_data(param,function(data){
        			console.debug(data)
        			$(_this).parent().parent().find('input').attr("disabled","disabled");
        			$(_this).attr('data-status','modify');
                	$(_this).text('修改');
        		})
        	}else{
        		$(this).parent().parent().find('.notice').removeClass('hide')
        	}
    	}	   
    });
    
    //启用和禁用
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
                var institutionId=$(this).parent().parent().find('[data-name-id]').attr('data-name-id')
                console.debug(institutionId);
                var param={
                	"arrayId":institutionId,
                	"status":status
                }
                console.debug(status);
                HttpUtils.get_agencyEnable_data(param,function(data){
                	console.debug(data)
                	$(_this).find('input[type="checkbox"]').attr('data-institution-status',data.data[0].institutionStatus);
                	if(data.statusCode=='200'){
                		if($(_this).find('input[type="checkbox"]').is(':checked')){
                			$(_this).find('input[type="checkbox"]').removeAttr('checked');
                		}else{
                			$(_this).find('input[type="checkbox"]').attr('checked','');
                		}
                	}                	
                })
        	})
    	};
    
    //机构详情跳转
    function linkInfo(){
    	$('#agencylist tr td:nth-child(3) a').on("click",function(){
	    	var _this=this;
	    	//点击获取搜索值
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
	    	var institutionName=$(_this).parent().parent().find('[data-name]').attr('data-name')
	    	var institutionNameId=$(_this).parent().parent().find('[data-name-id]').attr('data-name-id')
	    	var institutionTypeName=$(_this).parent().parent().find('[data-institution-type-name]').attr('data-institution-type-name')
	    	var institutionTypeNameId=$(_this).parent().parent().find('[data-institution-type-name-id]').attr('data-institution-type-name-id')
	    	var institutionContacts=$(_this).parent().parent().find('[data-institution-contacts]').attr('data-institution-contacts')
	    	var institutionContactsNums=$(_this).parent().parent().find('[data-institution-contactsNums]').attr('data-institution-contactsNums')
	    	var institutionStatus=$(_this).parent().parent().find('[data-institution-status]').attr('data-institution-status')
	    	var institutionAdress=$(_this).parent().parent().find('[data-institution-address]').attr('data-institution-address')
	    	window.sessionStorage['institutionName']=institutionName;
	    	window.sessionStorage['institutionNameId']=institutionNameId;
	    	window.sessionStorage['institutionTypeName']=institutionTypeName;
	    	window.sessionStorage['institutionTypeNameId']=institutionTypeNameId;
	    	window.sessionStorage['institutionContacts']=institutionContacts;
	    	window.sessionStorage['institutionContactsNums']=institutionContactsNums;
	    	window.sessionStorage['institutionStatus']=institutionStatus;
	    	window.sessionStorage['institutionAdress']=institutionAdress;
	    	//window.sessionStorage['page']=page;
	    	window.location.href=contextPath+'/agency/agency_detail_page';
    	})
    };
    
    $('#my-work-ct>ul>li').on('click',function(){
    	var status = $(this).attr('data-status');
    	if(status==='001'){
        	$('.btn-add').addClass('hide');
        	$('.batch-enable').addClass('hide');
        	$('.batch-disable').addClass('hide');
        	renderTypeData();
            window.sessionStorage.clear();
            window.sessionStorage["listStatus"] = status
    	}else{
    		renderListData(find_search,1,status);
            window.sessionStorage.clear();
            window.sessionStorage["listStatus"] = status
    		$('.btn-add').removeClass('hide');
        	$('.batch-enable').removeClass('hide');
        	$('.batch-disable').removeClass('hide');
    	}
    })
    
    //批量启用 禁用
    function selectAll(){
    	$('#selectAll').on('click',function(){
        	$(this).is(':checked')?$('.select-use').prop('checked',true):$('.select-use').prop('checked',false)		       	
        })
    }

    function batchEnable(){
    $('.batch-enable').on('click',function(){
    	var checklength = $('.select-use:checked');
    	var arr = [];
    	if(checklength.length<1){
    		$('#start').modal('show');
    		return 
    	}
    	$.each($('.select-use:checked'),function(i,item){
    		arr.push($(item).parent().parent().attr('data-institutionid'));
    	})
    	institutionId = arr.join(',');
    	var param={
    		"arrayId":institutionId,
            "status":1	
    	}
    	HttpUtils.get_agencyEnable_data(param,function(data){
    		$.each($('.select-use:checked'),function(i,item){
    			$(item).parent().parent().find('#agency_status').attr('checked','');
    		})
    	})	
    })
    }
    
    function batchDisable(){
	    $('.batch-disable').on('click',function(){
	    	var checklength = $('.select-use:checked');
	    	var arr = [];
	    	if(checklength.length<1){
	    		$('#start').modal('show');
	    		return 
	    	}
	    	$.each($('.select-use:checked'),function(i,item){
	    		arr.push($(item).parent().parent().attr('data-institutionid'));
	    	})
	    	institutionId = arr.join(',');
	    	var param={
	    		"arrayId":institutionId,
	            "status":0	
	    	}
	    	HttpUtils.get_agencyEnable_data(param,function(data){
	    		$.each($('.select-use:checked'),function(i,item){
	    			$(item).parent().parent().find('#agency_status').removeAttr('checked');
	    		})
	    	})
	    })
    }
})