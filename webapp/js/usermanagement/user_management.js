/**
 * @Author yjx
 * @Date 2016-11-07
 * @description 用户管理
 */
$().ready(function() {
    $('[role="tablist"]>li').on('click',function(){
        $(this).tab('show');
    })
    var totalCount = null;
    var size = 10;
  //用户状态对应的记录数显示
    HttpUtils.get_userCount_data(function(data){
    	var userData=data.data[0];
        $('.notUsed').html('（'+userData.normalUserNum+'）');
	 	$('.alread').html('（'+userData.inactiveUserNum+'）');
	 	$('.detele_user').html('（'+userData.deletedUserNum+'）');
        if(userData.normalUserNum=='0' && userData.inactiveUserNum=='0' && userData.deletedUserNum=='0'){
        	$('#pageBar').hide();
        	$('#user_table').find('thead').hide();
        }
    });
		
    //新增用户
    $(".invitation").click(function(){
    window.location.href=contextPath+"/user/user_new_page";
    });

    //已激活用户数据和未激活数据渲染
    function renderData(param){
        var paramData = param;
        HttpUtils.get_managementList_data(paramData,function(data){
        	var curLiStatus = paramData.status;
            if(data!==undefined && data!==''&& data.data!==null && data.data!==undefined){
            	console.log(data);
                var curData = data.data.content;
                totalCount = data.data.totalPages;
                var no_content_dom=$('.no-content-container');
            	if(totalCount>0){
            		no_content_dom.html('');
            		$('#pageBar').show();
            		$('#user_table').find('thead').show();
            	}else{
            		$('#user_table').find('thead').hide();
            		$('#pageBar').hide();
            		no_content_dom.html(no_content_html)
            	}
                var html='';
                $.each(curData,function(i,item){
                  html+='<tr data-username="'+item.userName+'" data-usermobile="'+item.mobile+'" data-id="'+item["id"]+'" data-role-id="'+item.role.id+'" data-role-name="'+item.role.name+'">';
                  html+='<td>'+(i+1)+'</td><td data-name="'+item.trueName+'" data-id="'+item["id"]+'"><a href="javascript:void(0)">'+item["trueName"]+'</a></td>';
                  html+='<td data-institution-name="'+item["institution"]["institutionName"]+'" data-institution-id="'+item["institution"]["id"]+'" >'+item["institution"]["institutionName"]+'</td>';
                  html+='<td data-institution-type-name="'+item["institution"]["institutionType"]["institutionTypeName"]+'" data-institution-type-id="'+item["institution"]["institutionType"]["id"]+'">'+item["institution"]["institutionType"]["institutionTypeName"]+'</td>';
                  html+='<td data-user-name="'+item["role"]["name"]+'" data-user-id="'+item["id"]+'" >'+item["role"]["name"]+'</td>'
                  switch(item["userStatus"]){
                      case 1:
                      html+= '<td>已激活</td>'
                      break;
                      case 0:
                     html+= '<td>未激活</td>'
                      break;
                      case 4:
                      html+= '<td>已删除</td>'
                      break;                      
                  }
                  if(curLiStatus=='4'){
                	  html+='</tr>';
                  }else{
                	  html+='<td data-id="'+item["id"]+'" data-user-name="'+item["role"]["name"]+'" class="delete"> <button class="message-img trash_icon" data-toggle="modal" data-target=".bs-example-modal-md"></button></td></tr>';
                	 
                  }
                  
                })
                $('#user_table').find('tbody').html(html);
                clickName();
                delData();
            };
            
            //删除用户表格的数据
            function delData(){
            	$(".delete").on("click",function(){
            		//初始化
            		$('#noticeModal').modal('show')
            		$(".admin_user").html('删除后该用户无法登录,本操作不能恢复。是否要删除？')
                    var _this = this;
                    var userName=$(_this).attr("data-user-name");
                    var userId = $(_this).attr('data-id');
                   if(userName=="超级管理员"){
                	   $(".admin_user").html('您是超级管理员不能删除自己');
                   }else{
                       $("#delete_user").click(function(){
                    	   var param={
                    			userId:userId   
                    	   	}
                    	   HttpUtils.get_deleteUser_data(param,function(data){
                    		   if(data.statusCode == '200'){
                    			   renderdeleteData();
                    		   }
                    	   })
                       })  
                   }
                })
            }
        })
    }
    //用户列表数据
    function renderListData(search_text,status_num,page_num){
    	
    	 $('#my-work-ct>ul>li[data-userstatus="'+status_num+'"]').addClass('active').siblings().removeClass('active');
    	    if(window.sessionStorage["listStatus"] === '4'){
    	    	 $("#operation").addClass('hide');
    	    }else{
    	    	$("#operation").removeClass('hide');
    	    }
    	 console.debug(status_num);
    	 
    	 if(window.sessionStorage["search"]== undefined){
    			renderData({search:search_text,status:status_num,page:page_num-1,size:size});
    		    new PageBar('#pageBar',totalCount,function(curPageNo){
    		        var paramData = {}
    		        paramData.search=search_text;
    		        paramData.status = status_num;
    		        paramData.page = (curPageNo-1);
    		        paramData.size = size;
    		        renderData(paramData);
    		    },page_num); 
    	 }else{
     		var search = $.trim(window.sessionStorage["search"]);
    		$('.searchStr').val(search);
 			renderData({search:search,status:status_num,page:page_num-1,size:size});
		    new PageBar('#pageBar',totalCount,function(curPageNo){
		        var paramData = {}
		        paramData.search=search;
		        paramData.status = status_num;
		        paramData.page = (curPageNo-1);
		        paramData.size = size;
		        renderData(paramData);
		    },page_num); 
    	 }

    }
    var init_status = window.sessionStorage["listStatus"]?window.sessionStorage["listStatus"]:'1';
    var init_page_no = window.sessionStorage["listPageNo"]?window.sessionStorage["listPageNo"]:1;
    renderListData('',init_status,init_page_no)

    //用户列表删除数据停留原来节点
    function renderdeleteData(){
		renderData({search:"",status:"0",page:0,size:size});
	    new PageBar('#pageBar',totalCount,function(curPageNo){
	        var paramData = {}
	        paramData.search="";
	        paramData.status = '0';
	        paramData.page = (curPageNo-1);
	        paramData.size = size;
	        renderData(paramData);
	    });
    }
    
    //用户数据模糊查询
	$(".w-icon-search").click(function(){
		var status = $('#my-work-ct>ul>li.active').attr('data-userstatus');
        var search=$.trim($(".searchStr").val());
        window.sessionStorage["search"]= search ;
        renderData({search:search,status:status,page:0,size:size});
        new PageBar('#pageBar',totalCount,function(curPageNo){
            var paramData = {}
            paramData.search=search;
            paramData.status = status;
            paramData.page = (curPageNo-1);
            paramData.size = size;          
            renderData(paramData);     
        });
    });
	
  //点击状态加载数据
    var data_userStatus=null;
    $('#my-work-ct>ul>li').on('click',function(){
        var status = $(this).attr('data-userstatus');
        window.sessionStorage.clear();
        window.sessionStorage["listStatus"] = status;
        var search=$('.searchStr').val();
        console.debug(status);
        data_userStatus=status;
        $("#operation").show();
        if(status=='4'){
        	$("#operation").addClass('hide');
        }else{
        	$("#operation").removeClass('hide');
        }
        	renderData({search:search,status:status,page:0,size:size});        
            new PageBar('#pageBar',totalCount,function(curPageNo){
                var paramData = {}
                paramData.search="";
                paramData.status = status;
                paramData.page = (curPageNo-1);
                paramData.size = size;
                renderData(paramData);
            });
    })
    
	//点击用户名称跳转页面
    function clickName(){
        $("#userlist tr td:nth-child(2) a").on("click",function(){
            var _this = this;
            var searchData=$(".searchStr").val();
	    	if(searchData!==''){
	    		window.sessionStorage['search']=searchData;
	    	}else{
	    		window.sessionStorage['search']='';
	    	}
	    	var pagrList = $('#pageBar ul li');
    	    $.each(pagrList,function(i,item){
    	    	if($(item).attr('class') === 'active'){
    	    		mark_index = $(item).text();
    	    	}
    	    })
    	    
    	    var status_user=$('#my-work-ct .nav-tabs li.active').attr('data-userstatus');
/*    	     
 * 
	    	var userStatus=data_userStatus;
	    	console.debug(userStatus)*/
            //记录当前的状态和页码
            var list_status = $('#my-work-ct>ul>li.active').attr('data-userstatus');
            var list_page_no = parseInt($('#pageBar li.active').text());
            window.sessionStorage["listStatus"] = list_status;
            window.sessionStorage["listPageNo"] = list_page_no;
            
            
	    	if(status_user!==null){
	    		window.sessionStorage['status_user']=status_user;
	    	}else{
	    		window.sessionStorage['status_user']='1';
	    	}
	    	
        	   var username=$(_this).parent().parent().find('[data-name]').attr('data-name');
        	   var userId=$(_this).parent().parent().find('[data-id]').attr('data-id');
        	   
        	   
               var institutionContact=$(_this).parent().parent().find('[data-institution-name]').attr('data-institution-name');
               var institutionId=$(_this).parent().parent().find('[data-institution-id]').attr('data-institution-id');
               
               
               var institutionTypeName=$(_this).parent().parent().find('[data-institution-type-name]').attr('data-institution-type-name');
               var institutionTypeNameId=$(_this).parent().parent().find('[data-institution-type-id]').attr('data-institution-type-id');
               
              
               var roleId = $(_this).parent().parent().attr('data-role-id');
               var roleName = $(_this).parent().parent().attr('data-role-name');
               
               var user_mobile=$(_this).parent().parent().attr('data-usermobile');
               var user_username=$(_this).parent().parent().attr('data-username');
               //存储用户信息
               window.sessionStorage["userName"]=username;
               window.sessionStorage["userId"]=userId;
               
               window.sessionStorage["institutionContact"]=institutionContact;
               window.sessionStorage["institutionId"]=institutionId;
               
               window.sessionStorage["institutionTypeName"]=institutionTypeName;
               window.sessionStorage["institutionTypeNameId"]=institutionTypeNameId;
               
               window.sessionStorage["roleId"]=roleId;
               window.sessionStorage["roleName"]=roleName;
               
               window.sessionStorage["mobile"]=user_mobile;
               window.sessionStorage["username"]=user_username;
               if(mark_index ===null){
   	    		window.sessionStorage['flag'] = window.sessionStorage['flag'];
   	    	}else{
   	    		window.sessionStorage['flag'] = mark_index;
   	    	}  
               window.location.href = contextPath+'/user/user_detail_page';
        });
    };
  //隐藏删除操作
    function deleteUser() {
        var status = $('#my-work-ct>ul>li.active').attr('data-userstatus');
        if (status == 4) {
          $('#operation').hide();
        } else {
          $('#operation').show();
        }
      }
      deleteUser();
      
      if(window.sessionStorage['status_user']==='4'){
          $("#operation").hide();
      }else{
          $("#operation").show();
      }
})
