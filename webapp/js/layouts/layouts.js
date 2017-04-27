/**
 * @Author Mona
 * @Date 2016/10/26
 * @description 结构布局
 */


 function clickMenu(target){
    console.debug('清空存储');
    var cur_menu_data = window.localStorage["allMenuData"];
    window.sessionStorage.clear();
    window.localStorage.clear();
    var menu_id = $(target).attr('data-user-menu-id');
    window.localStorage["menuId"] = menu_id;
    window.localStorage["allMenuData"] = cur_menu_data;
}

$(function(){

    /**
     * @description 加载菜单数据
     * @param data
     * @returns
     */
    function loadData(data,cur_menu_id){       
        if(data!==undefined && data!==''){
        function renderLeftMenu(item){
            var h='<ul class="clearfix">';            
            if(item!==undefined && item.length>0){                
                $.each(item,function(i,value){
                    h+='<li class="clearfix" data-user-menu-id="'+value.id+'" onclick="clickMenu(this)">';
                    h+='<span>';
                    if(value.url!==''){
                        h+= '<a href="'+contextPath+value.url+'" data-user-menu-id="'+value.id+'">';
                    }
                    else{
                        h+= '<a href="'+contextPath+'/404_page" data-user-menu-id="'+value.id+'">'; 
                    } 
                   
                    if(value.image!==''){
                        h+='<img src="'+ contextPath + "/imgs/menu/"+ value.image+'" data-list-img="true"></img>';
                    }
                    else{
                        h+='<img src="'+ contextPath + '/imgs/common/logo.png" data-list-img="true"></img>';
                    }
                   
                    h+='<span role="title" class="title">'+value.label+'</span>';
                    if(value.label == '风险管理'){
                        window.sessionStorage["riskManagementMenuId"] = value.id;
                    }
                    if(value.label == '逾期理赔'){
                        window.sessionStorage["overdueManagementMenuId"] = value.id;
                    }
                    if(value.label == '到期解押'){
                        window.sessionStorage["maturityDecompressionMenuId"] = value.id;
                    }
                    if(value.label == '我的办理'){                        
                        h+='<span class="msg-num hide-status" id="my-management-num"></span>';              
                    }
                    
                    h+= '</a>';
                    h+= '</span>';                                            
                    h+= renderLeftMenu(value.items);                    
                    h+='</li>';
                });
                
                h+="</ul>";
                return h;
            }else{
                h+='</ul>';
                return h;
            }
            
        }
        if(data.items[0] && data.items[0].items[0] && data.items[0].items[0].items){
            $('#menu').html(renderLeftMenu(data.items[0].items[0].items));
            var cur_num_dom = $('#my-management-num');
            var menu_li_list = $('#menu').find('li');
            getMyManagementNum(cur_num_dom);

            $.each(menu_li_list,function(i,item){
                if($(item).attr('data-user-menu-id') == cur_menu_id && !$(item).hasClass('active')){
                    $(item).addClass('active');
                    return false
                }
            })
        }
        
        }

    }

    function getMyManagementNum(target){
        $.ajax({
            type:'get',
            url:contextPath+'/activiti/doing_task_count',
            success:function(data){
                if(data){
                    if($(target).length>0){
                        if(data.data>0){
                            $(target).show();
                            $(target).text(data.data);
                        }else{
                            $(target).remove();
                        }
                    }  
                }
            }
        })
    }

    
    /**
     * @description 渲染菜单数据
     * @returns
     */
    function renderMenu(){
        if(window.localStorage["allMenuData"]){
            var parse_menu_data = JSON.parse(window.localStorage["allMenuData"]);
            loadData(parse_menu_data,window.localStorage["menuId"]);
        }else{
            ajax.getData('',contextPath+'/role/role_menu',function(data){ 
                var cur_menu_data = JSON.stringify(data);
                window.localStorage["allMenuData"] = cur_menu_data;
                loadData(data,window.localStorage["menuId"]);                    
            },'')
        }
    }
    
    renderMenu();
    
    /**
    *@description 初始化 tab
    */
    $('[role="tablist"]>li>a').on('click',function(){
        $(this).tab('show');
    })
    
    function renderUserInfo(){
        $.ajax({
            type:'get',
            url:contextPath+'/session.json',
            success:function(data){
                if(data.statusCode=='200'){
                    if(data.data==''||data.data=='undefined'){
                        return
                    }
                    $('#topLeftUserName').text(data.data.trueName);//用户的真实姓名
                    $('#topLeftRole').text(data.data.roleName);//用户的角色名称
                }
            }
        })
    }
    
    renderUserInfo();  


    //回到顶部
    function backToTop(){
        var back_top_dom = $('[data-role="back-to-top"]');
         $(window).scroll(function(){
             if ($(window).scrollTop()>100){
                 $(back_top_dom).fadeIn(1500);
             }else{
                 $(back_top_dom).fadeOut(1500);
             }
         });

         $(back_top_dom).click(function(){
             $('body,html').animate({scrollTop:0},1000);
             return false;
         });
    } 
    
    backToTop()  
  
})