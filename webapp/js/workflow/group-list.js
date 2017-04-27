$().ready(function() {
    // 类型下拉菜单
    $("#groupTypeSelect").select2({
        language: "zh-CN",
        width: "100%",
        theme: "classic",
        placeholder: "选择一个分类",
    });
});

function fun_createGroup() {
    $('#createGroupModal').modal();
}

function fun_saveGroup() {
    $("#groupEditForm").submit();
}

function fun_gourpDelete(id) {
    bootbox.dialog({
        message: "删除操作确认后，被删除的数据将无法恢复",
        title: "您真的要删除这条信息吗？",
        buttons: {
            success: {
                label: "放弃",
                className: "btn-success",
                callback: function() {
                    return true;
                }
            },
            danger: {
                label: "确认删除",
                className: "btn-danger",
                callback: function() {
                    $.ajax({
                        url: contextPath + "/workflow/group/" + id,
                        dataType: 'json',
                        async: true,
                        type: "DELETE"
                    }).done(function() {
                        console.debug("删除成功");
                        Messenger().post({
                            message: "删除成功",
                            type: "success",
                            showCloseButton: true
                        })
                        // 通过页面重新载入数据的方式刷新,要优化
                        location.reload(true);   

                    }).fail(function(data, textStatus, jqXHR) {
                        console.debug(data);
                        console.debug(textStatus);
                        console.debug(jqXHR);
                        var message_string = "删除时候发生错误!\t(" + data.status + "-" + data.statusText + ")";
                        Messenger().post({
                            message: message_string,
                            type: "error",
                            showCloseButton: true
                        })
                        console.debug("删除发生错误！" + message_string);
                    })
                }
            }
        }
    })
}


function fun_distributeUser(groupID){
    console.debug($("#userID").val());
    $.ajax({
        url: contextPath + "/workflow/group/distribute",
        data: { groupID: groupID, userID : $("#userID").val() } ,
        dataType: 'json',
        async: true,
        type: "POST"
    }).done(function() {
        console.debug("分配成功");
        Messenger().post({
            message: "分配成功",
            type: "success",
            showCloseButton: true
        })
        // 通过页面重新载入数据的方式刷新,要优化
        location.reload(true);   

    }).fail(function(data, textStatus, jqXHR) {
        console.debug(data);
        console.debug(textStatus);
        console.debug(jqXHR);
        var message_string = "分配时候发生错误!\t(" + data.status + "-" + data.statusText + ")";
        Messenger().post({
            message: message_string,
            type: "error",
            showCloseButton: true
        })
        console.debug("分配发生错误！" + message_string);
    })
}


function fun_listUser(groupID){
    $.ajax({
        url: contextPath + "/workflow/group/listUsers",
        data: { groupID: groupID} ,
        dataType: 'json',
        async: true,
        type: "GET"
    }).done(function() {
        // do nothings 
    }).fail(function(data, textStatus, jqXHR) {
        console.debug(data);
        console.debug(textStatus);
        console.debug(jqXHR);
        var message_string = "分配时候发生错误!\t(" + data.status + "-" + data.statusText + ")";
        Messenger().post({
            message: message_string,
            type: "error",
            showCloseButton: true
        })
        console.debug("分配发生错误！" + message_string);
    })
}