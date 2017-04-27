    $(function(){
            /***
             * 初始化tab
             * @Author Mona
             * @Description 初始化tab
             * @return
             */

            $('ul[role="tablist"]>li>a').click(function (e) {
                e.preventDefault();
                $(this).tab('show')
            });

            /***
             * @初始化表格
             * @Author Mona
             * @Description datatables初始化
             * @return DataTables
             */

            var selector = $('#my-management');
            var coreAjax = {
                'url':'../assets/js/objects.txt'
            };
            var columns = [
                { "data": "no"},
                { "data": "serviceno"},
                { "data": "servicetype"},
                { "data": "handlematters"},
                { "data": "handlestatus"},
                { "data": "arrivaltime"},
                { "data": "handletime"},
                { "data": "operate"}
            ];
            var columnDefs = [{
                orderable: false,
                targets: [0,2]
            },
            {
                render: function(data, type, row) {
                    switch (data){
                        case "2":
                            return '<a href="javascript:void(0)">签收</a>'
                        case "0":
                            return '<a href="javascript:void(0)">办理</a>'
                        case "1":
                            return '<a href="javascript:void(0)">查看</a>'
                    }
                },
                targets: [7]
            },
            {
                "render": function(data,type,row) {
                    return '<p">' + data + "</p><span>00:00</span>"
                },
                "targets":[5,6]
            }];

            function initComplete(data){

            }

            function drawCallBack(settings){

            }
            //初始化dt
            dbs.dbsCore(selector,coreAjax,columns,columnDefs,initComplete,drawCallBack);
            console.log(dbs.table)
        })