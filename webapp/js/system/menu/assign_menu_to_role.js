$().ready(function() {
    /*
     * 监听 rMenuRenderComplete 事件
     * rMenu下的所有的class="menu_label"的对象加上dbClick的事件，用于删除角色菜单项的功能
     */
    $(document).on('rMenuRenderComplete', function() {
        $("#rMenu .menu_label").dblclick(function() {
            $.ajax({
                url: contextPath + "/role/delete_menu",
                type: "POST",
                data: {
                    menuId: $(this).data("menu-id"),
                    roleId: selectedRoleID
                },
                dataType: "JSON"
            }).done(function(data) {
                // 清空 并且 渲染出html的dom对象
                $("#rMenu").empty();
                renderMenus($("#rMenu"), "/role/generate_menu", {"roleID": selectedRoleID}, false, "rMenuRenderComplete");
            }).fail(function(data, textStatus, jqXHR) {
                var message_string = "删除菜单的时候发生错误!\t(" + data.status + "-" + data.statusText + ")";
                Messenger().post({
                    message: message_string,
                    type: "error",
                    showCloseButton: true
                })
            });
        })
    });

    /*
     * 监听 sMenuRenderComplete 事件
     * sMenu下的所有的class="menu_label"的对象加上dbClick的事件，用于激活点击菜单项分配给角色的功能
     */
    $(document).on('sMenuRenderComplete', function() {
        // 渲染完成后，sMenu下的所有的class="menu_label"的对象加上dbClick的事件
        $("#sMenu .menu_label").dblclick(function() {
            // 如果
            if (selectedRoleID == null || selectedRoleID == "") {
                var message_string = "请选择一个具体的角色";
                Messenger().post({
                    message: message_string,
                    type: "error",
                    showCloseButton: true
                })
                return;
            }
            $.ajax({
                url: contextPath + "/system/systemmenu/assign_to_role",
                type: "post",
                data: {
                    "menuID": $(this).data("menu-id"),
                    "roleID": selectedRoleID
                },
                dataType: "JSON"
            }).done(function(data) {
                // 清空 并且 渲染出角色拥有的菜单的 html的dom对象
                $("#rMenu").empty();
                renderMenus($("#rMenu"), "/role/generate_menu", {
                    "roleID": selectedRoleID
                }, false, "rMenuRenderComplete");
            }).fail(function(data, textStatus, jqXHR) {
                var message_string = "分配菜单的时候发生错误!\t(" + data.status + "-" + data.statusText + ")";
                Messenger().post({
                    message: message_string,
                    type: "error",
                    showCloseButton: true
                })
            });
        });
    });
})