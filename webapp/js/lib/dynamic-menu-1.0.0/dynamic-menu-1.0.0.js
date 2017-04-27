/**
 * --- Copyright 2016, 徐泽宇 生成动态菜单
 */

/*
 * @author 徐泽宇 使用ajax的方式，从后台获取菜单数据 @parament menuRootDom: 放置菜单的ol DOM对象
 * @parament dataURL : 获取数据的URL @parament canEdit : 是否可以编辑 @parament cbFunName :
 * 渲染完成后回调函数的名字
 */

// 保存当前所有的系统菜单项的hashMap 信息。以方便更改信息的时候进行定位和更新
// 其中key是id。
// value是 MenuItem对象
var systemMenuItemsHashMap = {};

var prefix_for_edit_span_id = "edit_div_for_";

var MenuItem = function(label, id, url, image, target, parent_id, items) {
    this.label = label;
    this.id = id;
    this.url = url;
    this.image = image;
    this.target = target;
    this.parent_id = parent_id
    this.items = items;

};

function renderMenus(menuRootDom, callURL, dataJson, canEdit, cbFunName) {
    $.ajax({
        url: contextPath + callURL,
        data: dataJson,
        dataType: "JSON"
    }).done(function(data) {
        // 渲染出html的dom对象
        parse_data_to_menu(data, menuRootDom, canEdit);
        // 抛出渲染完成的事件
        if (typeof (cbFunName) == "undefined" || cbFunName == null) {

        } else {
            $(document).trigger(cbFunName);
        }
    });
};
/**
 * 把系统菜单的jsong数据转换成dom对象，并且插入到显示菜单的地方
 * 
 * @param dataJsonString
 * @returns
 */
function parse_data_to_menu(dataJson, menuRootDom, canEdit) {
    var rootItem = new MenuItem(dataJson.label, dataJson.id, dataJson.url, dataJson.image, dataJson.target, dataJson.parent_id, dataJson.items);
    for (var i = 0; i < rootItem.items.length; i++) {
        var system_menu_items = objectToMenuItem(rootItem.items[i]);
        // 把数据对象转换成dom对象，并且渲染成html
        menuItmeToDom(menuRootDom, system_menu_items, canEdit);
    }
    ;
};

/**
 * @author 徐泽宇 用递归的方法，把一个标准的js对象转换成MenuItem对象，以方便优雅编程
 * @param
 * @returns
 */
function objectToMenuItem(object) {
    var menu_item = new MenuItem(object.label, object.id, object.url, object.image, object.target, object.parent_id, object.items);
    if (typeof (object.items) == "undefined") {
    } else {
        for (var i = 0; i < object.items.length; i++) {
            menu_item.items[i] = objectToMenuItem(object.items[i]);
        }
    }
    // 把当前转换成功的对象，放置到全局变量 systemMenuItemsHashMap 里面。
    systemMenuItemsHashMap[menu_item.id] = menu_item;
    return menu_item;
};

/**
 * 用递归的方法，把一个MenuItem对象转换成dom对象
 * 
 * @author 徐泽宇
 * @param menuItem
 * @returns
 */
function menuItmeToDom(parentDomObj, menuItem, canEdit) {
    var item_li_dom = $("<li>");
    item_li_dom.attr("id", menuItem.id);
    item_li_dom.attr("data-id", menuItem.id);
    item_li_dom.attr("data-parent_id", menuItem.parent_id);
    var item_li_image_dom = $("<img>");
    if (menuItem.image == null || menuItem.image == "") {
        item_li_image_dom.attr("src", contextPath + "/imgs/menu/menu.png");
    } else {
        item_li_image_dom.attr("src", contextPath + "/imgs/menu/" + menuItem.image);
    }
    item_li_image_dom.attr("id", "image_for_" + menuItem.id);
    item_li_image_dom.attr("class", "menu_item_image");
    item_li_dom.append(item_li_image_dom);
    var item_ol_dom = $("<ol>");
    var menu_label_item = $("<span>");
    menu_label_item.attr("id", "display_label_for_" + menuItem.id);
    menu_label_item.attr("data-menu-id", menuItem.id);
    menu_label_item.attr("class", "menu_label");
    menu_label_item.html(menuItem.label);
    if (canEdit) {
        menu_label_item.attr("onClick", "javascript:fun_edit(\"" + menuItem.id + "\")");
    }
    var edit_button_dom = $("<a>");
    edit_button_dom.attr("class", "edit_link")
    edit_button_dom.attr("href", "javascript:fun_edit(\"" + menuItem.id + "\")");

    var edit_span_dom = $("<div>")
    edit_span_dom.attr("id", prefix_for_edit_span_id + menuItem.id);
    edit_span_dom.css('display', 'none');
    edit_span_dom.attr("data-id", menuItem.id);
    // 增加显示菜单名称的区域
    item_li_dom.append(menu_label_item);
    // 增加编辑按钮的区域
    if (canEdit) {
        item_li_dom.append(edit_button_dom);
    }
    ;
    // 增加编辑内容的区域
    item_li_dom.append(edit_span_dom);
    // 增加子菜单的区域
    item_li_dom.append(item_ol_dom);

    if (typeof (menuItem.items) == "undefined") {
    } else {
        for (var i = 0; i < menuItem.items.length; i++) {
            menuItmeToDom(item_ol_dom, menuItem.items[i], canEdit);
        }
    }
    parentDomObj.append(parentDomObj, item_li_dom);
};