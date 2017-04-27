// 设置消息提示窗口的格式
Messenger.options = {
    extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
    theme: 'air'
};

$().ready(function() {
    // 设置消息提示窗口的格式
    Messenger.options = {
        extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
        theme: 'air'
    }
    $("#sMenu").sortable({
        group: 'system_menus',
        pullPlaceholder: true,
        onDrop: function($item, container, _super) {
            // animation on drop
            var $clonedItem = $('<li/>').css({
                "height": "0",
            });
            $item.before($clonedItem);
            $clonedItem.animate({
                'height': $item.height()
            });

            $item.animate($clonedItem.position(), function() {
                $clonedItem.detach();
                _super($item, container);
            })
            // 获取拖拽后的对象信息，重新进行排序，并且调用后台程序接口，持久化到数据库
            var dragItemID = $item.data("id");
            var dropItemID = $item.parent().parent().data("id");
            var brothers = $item.parent().children("li");
            var i = 1;
            var orderHashList = [];
            brothers.each(function(index, element) {
                if (typeof ($(element).data("id")) == "undefined") {
                    // do nothing
                } else {
                    var orderHash = {}
                    orderHash[$(element).data("id")] = i;
                    orderHashList.push(orderHash);
                    i++
                }
            });
            // 处理拖拉后，兄弟节点排序的功能
            var sortHashString = JSON.stringify(orderHashList);
            if (typeof (dropItemID) == "undefined") {
                // 移动到顶级菜单的时候，当前节点的 $item.parent().parent()对象是<ol id="sMenu"
                // class="sMenu"> ,无法获取 data-id 的属性
                dropItemID = 0;
            }

            $.ajax({
                url: contextPath + "/system/systemmenu/sort",
                type: "POST",
                dataType: "json",
                data: {
                    dragItemID: dragItemID,
                    dropItemID: dropItemID,
                    sortHash: sortHashString
                },
                beforeSend: function() {
                    $.isLoading({
                        text: "正在保存...",
                        position: "inside"
                    });
                },
                complete: function() {
                    $.isLoading("hide");
                }
            }).done(function() {
                // do nothing
            }).fail(function(data) {
                var message_string = "移动菜单的时候发生错误!\t(" + data.status + "-" + data.statusText + ")";
                Messenger().post({
                    message: message_string,
                    type: "error",
                    showCloseButton: true
                })
            })
        },
    });
    renderMenus($("#sMenu"), "/system/systemmenu/generateSystemMenuDataJson", {}, true, null);
});

/*
 * @author 徐泽宇 添加一个菜单项
 */
function fun_add_menu() {
    var data = {
        "menuLabel": $("#menuLabel").val(),
        "menuImage": $("#menuImage").val(),
        "menuURL": $("#menuURL").val(),
        "menuTarget": $("#menuTarget").val()
    };
    $.ajax({
        url: contextPath + "/system/systemmenu/addMenuItem",
        type: "POST",
        dataType: "json",
        data: data
    }).done(function() {
        // 重新刷新系统菜单树区域的显示
        cleanMenuContentDiv();
        renderMenus($("#sMenu"), "/system/systemmenu/generateSystemMenuDataJson", {}, true, null);
    }).fail(function(data) {
        var message_string = "添加菜单的时候发生错误!\t(" + data.status + "-" + data.statusText + ")";
        Messenger().post({
            message: message_string,
            type: "error",
            showCloseButton: true
        })
    });
};

/*
 * @author 徐泽宇 删除显示的系统菜单内容
 */
function cleanMenuContentDiv() {
    $("#sMenu").html("");
}

/**
 * 显示菜单编辑区
 * 
 * @author 徐泽宇
 * @param menuItemID
 * @returns
 */
function fun_edit(menuItemID) {
    var edited_dom = $("#" + prefix_for_edit_span_id + menuItemID);
    var target = edited_dom.prev('a.edit_link');
    if (edited_dom.children().length > 0) {
        $(target).removeClass('active');
        // 说明已经点击过了。进行缩回操作
        edited_dom.slideUp(300, function() {
            // 清空编辑区域
            edited_dom.empty();
        });
        return;
    } else {
        $(target).addClass('active');
        // 菜单名称显示
        var div_input_group_dom_for_label = $("<div>");
        div_input_group_dom_for_label.attr("class", "input-group input-group-sm");
        var label_span_dom = $("<span>");
        label_span_dom.attr("class", "input-group-addon");
        label_span_dom.html("菜单名称");
        var label_input_dom = $("<input>");
        label_input_dom.attr("value", systemMenuItemsHashMap[menuItemID].label);
        label_input_dom.attr("id", "edit_label_" + menuItemID);
        label_input_dom.attr("class", "form-control");
        label_input_dom.attr("aria-describedby", "basic-addon1");
        div_input_group_dom_for_label.append(label_span_dom);
        div_input_group_dom_for_label.append(label_input_dom);
        // end
        // 菜单图片路径显示
        var div_input_group_dom_for_image = $("<div>");
        div_input_group_dom_for_image.attr("class", "input-group input-group-sm");
        var image_span_dom = $("<span>");
        image_span_dom.attr("class", "input-group-addon");
        image_span_dom.html("图片路径");
        var image_input_dom = $("<input>");
        image_input_dom.attr("value", systemMenuItemsHashMap[menuItemID].image);
        image_input_dom.attr("id", "edit_image_" + menuItemID);
        image_input_dom.attr("class", "form-control");
        image_input_dom.attr("aria-describedby", "basic-addon1");
        div_input_group_dom_for_image.append(image_span_dom);
        div_input_group_dom_for_image.append(image_input_dom);
        // end

        // 菜单url显示
        var div_input_group_dom_for_url = $("<div>");
        div_input_group_dom_for_url.attr("class", "input-group input-group-sm");
        var url_span_dom = $("<span>");
        url_span_dom.attr("class", "input-group-addon");
        url_span_dom.html("指向URL");
        var url_input_dom = $("<input>");
        url_input_dom.attr("value", systemMenuItemsHashMap[menuItemID].url);
        url_input_dom.attr("id", "edit_url_" + menuItemID);
        url_input_dom.attr("class", "form-control");
        url_input_dom.attr("aria-describedby", "basic-addon1");
        div_input_group_dom_for_url.append(url_span_dom);
        div_input_group_dom_for_url.append(url_input_dom);
        // end

        // 菜单target显示
        var div_input_group_dom_for_target = $("<div>");
        div_input_group_dom_for_target.attr("class", "input-group input-group-sm");
        var target_span_dom = $("<span>");
        target_span_dom.attr("class", "input-group-addon");
        target_span_dom.html("指向目标");
        var target_input_dom = $("<input>");
        target_input_dom.attr("value", systemMenuItemsHashMap[menuItemID].target);
        target_input_dom.attr("id", "edit_target_" + menuItemID);
        target_input_dom.attr("class", "form-control");
        target_input_dom.attr("aria-describedby", "basic-addon1");
        div_input_group_dom_for_target.append(target_span_dom);
        div_input_group_dom_for_target.append(target_input_dom);
        // end

        // 保存和删除
        var div_input_group_dom_for_op = $("<div>");
        var save_button = $("<a>");
        save_button.attr("class", "update_item_button");
        save_button.attr("href", "javascript:fun_update_menu_item(\"" + menuItemID + "\")")
        save_button.html("<span class='glyphicon glyphicon-save'></span>保存");

        var delete_button = $("<a>");
        delete_button.attr("class", "delete_item_button");
        delete_button.attr("href", "javascript:fun_delete_menu_item(\"" + menuItemID + "\")")
        delete_button.html("<span class='glyphicon glyphicon-remove'></span>删除");

        div_input_group_dom_for_op.append(save_button);
        div_input_group_dom_for_op.append(delete_button);

        edited_dom.append(div_input_group_dom_for_label);
        edited_dom.append(div_input_group_dom_for_image);
        edited_dom.append(div_input_group_dom_for_url);
        edited_dom.append(div_input_group_dom_for_target);
        edited_dom.append(div_input_group_dom_for_op);
        // 动画效果
        edited_dom.slideDown(300, function() {

        });

    }
};

/**
 * 删除一个菜单项
 * 
 * @author 徐泽宇
 * @param menuItemID
 * @returns
 */
function fun_delete_menu_item(menuItemID) {
    bootbox.dialog({
        message: "删除这个菜单项后，所有的用户将无法运行到这个菜单功能",
        title: "您真的要删除吗？",
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
                    var edit_menu_item_dom = $("#" + prefix_for_edit_span_id + menuItemID);
                    edit_menu_item_dom.isLoading({
                        text: "正在删除...",
                        position: "overlay"
                    });
                    $.ajax({
                        url: contextPath + "/system/systemmenu/delete",
                        type: "POST",
                        data: {
                            "menuID": menuItemID
                        },
                        complete: function() {
                            edit_menu_item_dom.isLoading("hide");
                        }
                    }).done(function() {
                        // 区域刷新，把当前删除的dom对象从html页面中移除
                        $("#" + menuItemID).remove();
                    }).fail(function(data) {
                        var message_string = "删除菜单的时候发生错误!\t(" + data.status + "-" + data.statusText + ")";
                        Messenger().post({
                            message: message_string,
                            type: "error",
                            showCloseButton: true
                        })
                    })
                }
            }
        }
    })
};

/**
 * 保存一个更新后的菜单项内容
 * 
 * @author 徐泽宇
 * @param menuItemID
 * @returns
 */
function fun_update_menu_item(menuItemID) {
    var edit_menu_item = systemMenuItemsHashMap[menuItemID];
    // 获取当前编辑的 div dom对象
    var edit_menu_item_dom = $("#" + prefix_for_edit_span_id + edit_menu_item.id);
    var new_label = edit_menu_item_dom.find("#edit_label_" + menuItemID).val();
    var new_image = edit_menu_item_dom.find("#edit_image_" + menuItemID).val();
    var new_url = edit_menu_item_dom.find("#edit_url_" + menuItemID).val();
    var new_target = edit_menu_item_dom.find("#edit_target_" + menuItemID).val();
    var data = {
        "menuID": menuItemID,
        "menuLabel": new_label,
        "menuImage": new_image,
        "menuURL": new_url,
        "menuTarget": new_target
    };
    edit_menu_item_dom.isLoading({
        text: "正在保存...",
        position: "overlay"
    });
    $.ajax({
        url: contextPath + "/system/systemmenu/updateMenuItem",
        type: "POST",
        data: data,
        complete: function() {
            edit_menu_item_dom.isLoading("hide");
        }
    }).done(function() {
        // 更新当前变更的菜单项内容
        $("#display_label_for_" + menuItemID).html(new_label);
        // 更新当前变更的菜单项图片
        if (new_image == null || "" === new_image) {
            $("#image_for_" + menuItemID).attr("src", contextPath + "/imgs/menu/menu.png");
        } else {
            $("#image_for_" + menuItemID).attr("src", contextPath + "/imgs/menu/" + new_image);
        }
        // 更新全局变量中被改变的这个对象的内容
        systemMenuItemsHashMap[menuItemID].label = new_label;
        systemMenuItemsHashMap[menuItemID].image = new_image;
        systemMenuItemsHashMap[menuItemID].url = new_url;
        systemMenuItemsHashMap[menuItemID].target = new_target;
        // 清除编辑区域
        var edited_dom = $("#" + prefix_for_edit_span_id + menuItemID);
        edited_dom.slideUp(300, function() {
            edited_dom.empty();
            // 改变三角操作符的样式
            var target = edited_dom.prev('a.edit_link');
            $(target).removeClass('active');
        });

    }).fail(function(data) {
        var message_string = "更新菜单的时候发生错误!\t(" + data.status + "-" + data.statusText + ")";
        Messenger().post({
            message: message_string,
            type: "error",
            showCloseButton: true
        })
    })

}