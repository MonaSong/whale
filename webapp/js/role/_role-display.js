// 存放全局的保存选择的角色的ID的变量
var selectedRoleID = ""
$().ready(function() {
    var $select = $("#role_list_select2").select2({
        language: "zh-CN",
        width: "100%",
        allowClear: true,
        placeholder: "选择一个角色"
    /**
     * 这里是使用select2 自己ajax接口方式，但是需要server端实现搜索功能 
     ajax: { 
         url: contextPath +'/role/list_with_institution_type', 
         processResults: function(data) {
             return { results: data };
         }
     }
     */

    });
    // 用ajax的方法获取所有的角色信息,然后渲染select2
    $.ajax({
        type: 'GET',
        url: contextPath + "/role/list_with_institution_type",
        dataType: 'json',
        success: function(data) {
            //这里增加一个空的option，以便fix下拉框第一个条目在第一次没法选的bug
            $select.append( $("<option>"));
            for (var i = 0; i < data.length; i++) {
                var groupDom = $("<optgroup>");
                groupDom.attr("label", data[i].text);
                for (var j = 0; j < data[i].children.length; j++) {
                    var optDom = $("<option>");
                    optDom.val(data[i].children[j].id);
                    optDom.html(data[i].children[j].text);
                    groupDom.append(optDom);
                }
                $select.append(groupDom);
            }
        },
        complete: function() {
        },
        error: function(event, jqxhr, settings, thrownError) {
            console.debug(event);
            console.debug(jqxhr);
            console.debug(settings);
            console.debug(thrownError);
        }
    });

    // 监听角色列表下拉框的变动
    function notchange(){
    	selectedRoleID = $("#role_list_select2").val();
        // 渲染角色菜单项
        $("#rMenu").empty();
        renderMenus($("#rMenu"), "/role/generate_menu", {
            "roleID": selectedRoleID
        }, false, "rMenuRenderComplete");
    }
    notchange()
    $select.on("change", function() {
        selectedRoleID = $("#role_list_select2").val();
        // 渲染角色菜单项
        $("#rMenu").empty();
        renderMenus($("#rMenu"), "/role/generate_menu", {
            "roleID": selectedRoleID
        }, false, "rMenuRenderComplete");
    })
})