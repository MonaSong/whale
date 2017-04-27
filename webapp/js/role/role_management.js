/**
 * @Date:2016/11/28
 * @Author:yugang
 * @Description:角色管理
 */
$().ready(function() {
	//获取角色列表
    var totalCount = null;
    var size = 10;
    var mark_index=null;
    function renderData(param){
        var paramData = param;
        roleRequest.get_roleListRequest(paramData,function(data){
            if(data!==undefined && data!==''&& data.data!==null && data.data!==undefined){
                var curData = data.data.result;
                console.debug(curData);
                var html='';
                $.each(curData,function(i,item){
                    html+='<tr><td>'+(i+1)+'</td>';
                    html+='<td data-name="'+item.roleName+'" data-name-id="'+item.roleId+'"><a href="javascript:void(0)">'+item.roleName+'</a></td>';
                    html+='<td data-institution-type-name="'+item.institutionTypeName+'" data-institution-type-name-id="'+item.institutionTypeId+'">'+item.institutionTypeName+'</td></tr>';
                })
                if(curData.length>0){
                	$('#role_table').find('tbody').html(html);
                    linkInfo();
                    totalCount = data.data.pageCount;
                    console.debug('总页数==='+totalCount);
                    console.debug('当前数据==='+curData);
                }else{
                	$('#role_table').find('tbody').html('');
                    totalCount = 0;
                }
                
            }
        })
    };
    //初次加载角色列表    
    function renderListData(page){
    	renderData({page:page-1,size:size});
    	var no_content_dom = $('.no-content-container');
    	if(totalCount<1){
    		no_content_dom.html(no_content_html);
    		$('#pageBar').html('');
    		$('#role_table').find('thead').hide();
    		return 
    	}
    	no_content_dom.html('');
    	$('#role_table').find('thead').show();
        new PageBar('#pageBar',totalCount,function(curPageNo){
            var paramData = {}
            paramData.page = (curPageNo-1);
            paramData.size = size;
            renderData(paramData);
        },page);
    }
    //页面初次加载数据
    var init_page_no = window.sessionStorage["listPageNo"]?window.sessionStorage["listPageNo"]:1;
    renderListData(init_page_no);

    //点击进入详情页
    function linkInfo(){
    	$('.rolelist tr td:nth-child(2) a').on("click",function(){
	    	var _this=this;
            var list_page_no = parseInt($('#pageBar li.active').text());
            window.sessionStorage["listPageNo"] = list_page_no;
	    	var roleName=$(_this).parent().parent().find('[data-name]').attr('data-name');
	    	var roleNameId=$(_this).parent().parent().find('[data-name-id]').attr('data-name-id');
	    	var institutionTypeName=$(_this).parent().parent().find('[data-institution-type-name]').attr('data-institution-type-name');
	    	var institutionTypeNameId=$(_this).parent().parent().find('[data-institution-type-name-id]').attr('data-institution-type-name-id');
	    	window.sessionStorage['roleName']=roleName;
	    	window.sessionStorage['roleNameId']=roleNameId;
	    	window.sessionStorage['institutionTypeName']=institutionTypeName;
	    	window.sessionStorage['institutionTypeNameId']=institutionTypeNameId;
	    	if(mark_index ===null){
	    		window.sessionStorage['flag'] = window.sessionStorage['flag'];
	    	}else{
	    		window.sessionStorage['flag'] = mark_index;
	    	}
	    	
	    	window.location.href=contextPath+'/role/role_detail_page';
    	})
    };
})