/**
 * @Date 2016-10-31
 * @Author Mona
 * @description 登出
 */

$(function(){
    $('#logout,[data-role="top-rgt-logout"]').on('click',function(){
        var url = contextPath+'/logout.json';
        var my_role = new Role();
        var cur_role_id = my_role.getRoleId();
        $.ajax({
            url:url,
            success:function(){
                window.sessionStorage.clear();
                window.localStorage.clear();
                if(role.compareTo(cur_role_id,role["jc_system_operator"])){//酒厂用户退出到酒厂用户登录界面
                    window.location.href = contextPath+'/login_page';
                }else{
                    window.location.href = contextPath+'/no_winery_login_page';//非酒厂用户退出到非酒厂用户的登录界面
                } 
                
            }
        })
    })

    var cur_role_info = new Role();
    $('#institution-name').text(cur_role_info.getInstitutionName())
      
    /**
     * @description 获取当前用户各类消息数量
     * @param {callback} function 请求成功的回调函数，参数是请求成功之后返回的数据
     */
    var MessagemanagementRequestdata = {}

    //获取消息数量
    MessagemanagementRequestdata.get_userCountRequest= function(callback){
        $.ajax({
            type:'get',
            url:contextPath+"/message/station_status_count.json",
            contentType:'application/json',
            success:function(data){
            	if(data=='' || data.statusCode==undefined){
                    return
                }
                if(data.statusCode=='200' && data.data!==undefined){
                    if($.isFunction(callback)){
                        callback(data);
                    }               
                }
            },
            error:function(jqXHR,textStatus,errorThrown){
                renderErrorMsg(jqXHR,textStatus,errorThrown);
            }
        })
    }

    MessagemanagementRequestdata.get_userCountRequest(function(data) {
        var userDataNum = data.data.unreadNum;
        var msg_icon_dom = $('#msg-icon');
        var msg_num_dom = $('.message-bell');
        if(userDataNum>0){
            msg_icon_dom.addClass('icon-animated-bell');
            msg_num_dom.find('b').text(userDataNum);
        }else{
            if(msg_icon_dom.hasClass('icon-animated-bell')){
                msg_icon_dom.removeClass('icon-animated-bell')
            }
            msg_num_dom.find('b').text('0');
        }
        
    });

    //跳转到消息管理页面
    $('#msg-icon,[data-role="top-rgt-msg"]').on('click',function(){
    	window.sessionStorage.clear();
    	 window.location.href = contextPath + "/message/message_remind_page";
    })
})

