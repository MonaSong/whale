/**
 * @description 简易table
 * @param {selector} string  dom id
 * @param {url} string 请求接口
 * @param {def_colums} 自定义列
 */
 
 function WhaleTable(selector,url,def_colums){
     var _this = this;
     _this.selector = selector;
     _this.url = url;
     _this.init();
     _this.def_colums = def_colums;

 }
 
 WhaleTable.prototype = {

         init:function(){
             var _this = this;
             _this.getGridData(_this.url);
         },

         getGridData:function(url){
             var _this = this;
             var thead = $(_this.selector).find('thead>tr>th');
             var theadData = [];
             $.each(thead,function(i,item){
                 theadData.push($(item).attr('data-id'));
             });
             console.debug(theadData)
             ajax.getData('',url,function(data){
                 var curData = data.data.result;
                 console.debug(curData)

                 var len = _this.def_colums.length;

                 var html = '';
                 $.each(curData,function(j,n1){
                     html+='<tr>'
                     $.each(theadData,function(i,key){
                         var value = n1[key];
                         $.each(_this.def_colums,function(k,info){
                             if(info.targets==key){
                                 html+='<td>'+info.render(value)+'</td>';
                                 return false;
                             }else if(k==len-1){
                                 html+='<td>'+value+'</td>';
                             }
                         });

                     });
                     html+='</tr>';
                 });
                 $(_this.selector).find('tbody').html(html);

             },function(data){
                 console.debug('errorData=='+data);
             })
         }
     }
 
 //数据结构
 /*{
     "recordNo":"10",
     "data":{"result":[
     {"name":"zhangsan","sex":"man","age":"20","operater":"0"},
     {"name":"zhangsan","sex":"man","age":"20","operater":"1"},
     {"name":"zhangsan","sex":"man","age":"20","operater":"2"},
     {"name":"zhangsan","sex":"man","age":"20","operater":"0"},
     {"name":"zhangsan","sex":"man","age":"21","operater":"1"}

   ]}
   }*/
 
 
 //调用
/* var columns_defined = [{
     render:function(value){
             switch (value){
                 case '0':
                     return '<a href="javascript:void(0)">签收</a>';
                 case '1':
                     return '<a href="javascript:void(0)">办理</a>';
                 case '2':
                     return '<a href="javascript:void(0)">查看</a>';
             }
         },
     targets:"operater"
     },
     {
         render:function(value){
             switch (value){
                 case 'man':
                     return '<a href="javascript:void(0)">男</a>';
                 case 'nv':
                     return '<a href="javascript:void(0)">女</a>';
             }
         },
         targets:"sex"
     },
     {
         render:function(value){
             switch (value){
                 case '20':
                     return '<a href="javascript:void(0)">少年</a>';
                 case '21':
                     return '<a href="javascript:void(0)">青年</a>';
             }
         },
         targets:"age"
     }

 ];

 new WhaleTable('#myTable','../assets/js/testData.json',columns_defined);
 */
 