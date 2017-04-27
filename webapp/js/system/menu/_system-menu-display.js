$().ready(function() {
    // 系统菜单
    $("#sMenu").sortable({
        group: 'no-drop',
        drop: false,
        drag: false

    });
    // 角色列表
    $("#role_list").sortable({
        group: 'role_list',
        drag: false
    });
    renderMenus($("#sMenu"), "/system/systemmenu/generateSystemMenuDataJson", {}, false, "sMenuRenderComplete");
});
