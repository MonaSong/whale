/**
 * @Date 2016-10-24
 * @Description dataTablesCore
 * @param {Array}   'aLengthMenu':[10,20,40,60] //每页显示多少条数据的菜单
 * @param {Boolean} 'Searching':false //搜索
 * @param {Boolean} 'LengthChange':true//改变每页显示数据量
 * @param {Boolean} 'paging':true //翻页功能
 * @param {Boolean} 'bProcessing':true //显示进度信息
 * @param {Boolean} 'bServerSlide':true  //服务端请求数据
 * @param {Boolean} 'bAutoWidth':false   //宽度自适应
 * @param {String}    'sort':'position' //排序功能
 * @param {Boolean} 'deferRender':true //延迟渲染
 * @param {Boolean} 'bStateSave':true //保存翻页状态
 * @param {Boolean} 'iDiplayLength':true //设置datatables的默认显示条数
 * @param {Number}  'iDisplayStart':0
 * @param {String}  'dom':''
 * @param {Object}  'tableTools':{
 * 'sSwfPath':ContentPath+'/js/copy_csv_xls_pdf',
 * 'sRowSelector':'td:not(first-child)',
 * 'aButtons':[{sExtends:'csv',oSelectorOpts:{page:'current'}},'print'],
 * 'sRowSelect':'os',
 * },
 * @param {Boolean} 'ordering':false //排序
 * @param {Object} 'ajax':{
     *  'type':'post',
     *  'url':contextPath+'dept/list.do',
     *  'data':function(d){
     *  d.state = $('#start').val();
     *  d.deptName = $('#depName').val();
     *  d.starTime = $('#startTime').val();
     *  d.endTime = $('#endTime').val();
     *  },
     *  'dataSrc':''//如果有这个属性，则属性值不能为空，否则无法正确加载数据，如果没有这个属性，数据可以正确加载[无论是对象作为根节点还是数组作为根节点都可以]。
 * }
 * @param {Array} 'aoColums':[
 * { 'mData':'id',
 *   'orderable':false,
 *   'sDefaultContent':'',
 *   'sWidth':'2%',
 * },
 * {
 * 'mData':'deptName',
 * 'orderable':false,
 * 'sDefaultContent':'',
 * 'sWidth':'3%'
 * },
 * 'mData':'state',
 * 'orderable':false,
 * 'sDefaultContent':'',
 * 'sWidth':'3%',
 * 'render':function(data,type,full,meta){
 *  if(data == 1){
 *  return data = '无效';
 *  }
 *  else{
 *  return data = '有效';
 *  }
 * }
 * },
 * ]
 * @columnDefs {Array} 'columnDefs':[
 * 
 * ]
 * @param {String} 'sPaginationType':'full_numbers' // 显示最后一页的按钮
 *
 * @param 'sScrollX': '100%',
 * @param 'sScrollXInner': '110%',
 * @param 'bScrollCollapse': true,
 *以上三个参数是设置水平限制宽度
 *
 * "aoColumns": [
 * null,
 * { "asSorting": [ "asc" ] },
 * { "asSorting": [ "desc", "asc", "asc" ] },
 * { "asSorting": [ ] },
 * { "asSorting": [ ] }
 * ]
 * 以上参数设置是排序限制
 *
 * @param {Boolean} "bFilter": false  //不使用过滤功能
 *
 * @param {Boolean} “bInfo”: true  //页脚信息
 */
 

(function(self,$){
        var _this = self;
            _this.dbsCore = function(selector,coreAjax,columns,columnDefs,initComplete,drawCallBack){
            _this.table = $(selector).DataTable({
                'aLengthMenu':[10,20,40,60],
                'searching':true,
                'LengthChange':true,
                'paging':true,
                'bProcessing':true,
                //'bServerSide':true,
                'bAutoWidth':true,
                'sort':true,
                'deferRender':true,
                'bStateSave':true,
                'iDisplayLength':10,
                'iDisplaysStart':0,
                //'sPaginationType': 'full_numbers',
                'tableTools':{
                   // 'sSwfPath':contextPath+'js/copy_csv_xls_pdf.swf',
                   // 'sRowSelector':'td:not(:first-child)',
                   // 'aButtons':[
                       // {sExtends:'csv',oSelectorOpts:{page:'current'}},
                       // 'print'
                    //]
                },
                'ordering':true,
                'ajax':coreAjax,
                'columns':columns,
                'columnDefs':columnDefs,
                'language':{
                        'sProcessing':'正在获取数据，请稍后',
                        'sLengthMenu':'显示 _MENU_ 条',
                        'sZeroRecords':'0条记录',
                        'sInfo':'从 _START_ 到 _END_ 一共 _TOTAL_ 条',
                        'sInfoEmpty':'记录数为0',
                        'sInfoFiltered':'(全部记录数 _MAX_ 条)',
                        'sInfoPostFix':'',
                        'sSearch':'搜索',
                        'sUrl':'',
                        'oPaginate':{
                            'sFirst':'第一页',
                            'sPrevious':'上一页',
                            'sNext':'下一页',
                            'sLast':'最后一页'
                        }
                },
                initComplete:initComplete,
                drawCallBack:drawCallBack

            });
        }
})(window.dbs = {},jQuery)


/**
 * @2016-10-24
 * @Description 初始化datatables示例
 */


/*
$(function(){
	var selector = $('#mydbs');
    var coreAjax = {
        'url':'plugins/data/objects.txt'
        //"dataSrc": ""
    };
    var columns = [
        { "data": "name" },
        { "data": "position" },
        { "data": "office" },
        { "data": "extn" },
        { "data": "start_date" },
        { "data": "salary" },
    ];
    var columnDefs = [{
                        orderable: false,
                        targets: [0,2]
                    },
                    {
                        render: function(data, type, row) {
                            return '<button type="button" id="delete_anchor_' + data + '"  class="btn btn-danger btn-xs" onClick="fun_delete_brand(\''
                                            + data + '\')"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span>删除</button>&nbsp;'                                                                        
                        },
                        targets: [2]
                    },
                    {
                        render:function(data,type,row){
                             return '<label class="ck"><input name="sCheckbox" type="checkbox" class="form-control" value="'+data+'"></label>'
                        },
                        targets:[0]
                    },
                    {
                        "render": function(data,type,row) {
                               return '<a href="javascript:void(0)" onClick="fun_edit_brand_for_modal(\'' + contextPath + "/brand/"
                               + row.id + '/edit\')">' + data + "</a>"
                          },
                           "targets":[1]
                    }];

function initComplete(data){
}

function drawCallBack(settings){
}

  //dbs.dbsCore 初始化datatable核心代码
  //dbs.table初始化之后的table对象
  
  
  
  //初始化dataTables
   dbs.dbsCore(selector,coreAjax,columns,'',initComplete,drawCallBack);

   //datatables 增删改    
	var t = dbs.table;


	//选择当前数据
	$('#mydbs tbody').on('click','tr',function(){
	        if($(this).hasClass('selected')){
	            $(this).removeClass('selected');
	        }
	        else{
	            t.$('tr.selected').removeClass('selected');
	            $(this).addClass('selected');
	        }
	    })

    //删除当前选择的数据
    $('#delete-btn').click(function(){
        t.row('.selected').remove().draw(false);
    })
    

    //编辑当前数据
    $('#edit-btn').click(function(){
        var selectData = t.row('.selected').data();

        $.each(selectData,function(i,tmyData){
            $('#myForms input[name='+i+']').val(tmyData);
        })

        var fields = $("#myForms").serializeArray();
        console.log(JSON.stringify(fields))
    })
})

*/           
                



