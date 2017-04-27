$().ready(function() {
    product_details_table = $("#businesslog_table").DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: contextPath + "/system/businesslog/getDataWithPaged",
            type: 'get'
        },
        "language": {
            "url": contextPath + "/js/lib//DataTables-1.10.12/chinese.lang.json"
        },
        "columns": [{
            "data": "op_time" // 发生时间
        }, {
            "data": "operator" // 操作员
        }, {
            "data": "method_desc" // 事件描述
        }, {
            "data": "remote_ip" // IP地址
        }, {
            "data": "client_os" // 操作系统
        }, {
            "data": "client_browser" // 浏览器
        }, {
            "data": "browser_version" // 浏览器版本
        }, {
            "data": "device_type" // 访问设备
        }, {
            "data": "clazz" // 调用类
        }, {
            "data": "method" // 调用方法
        }, {
            "data": "success" // 调用方法
        }],
        "order": [[0, "desc"]],
        "columnDefs": [{
            "orderable": false,
            "targets": [1, 2, 3, 4, 5, 6, 7, 8, 9]
        }, {
            "render": function(data, type, row) {
                var prompt = "";
                if (data) {
                    prompt = "成功";
                } else {
                    prompt = "失败";
                }
                return prompt;
            },
            "targets": 10
        }],
        "createdRow": function(row, data, index) {
            if (data.success) {
                $('td', row).eq(10).addClass('success_type');
            }else{
                $('td', row).eq(10).addClass('fail_type');
            }
        }

    });
});
