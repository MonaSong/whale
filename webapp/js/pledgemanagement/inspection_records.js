/**
* @Author Mona
* @Date 2016-12-23
* @description 巡检记录
*/

/**
* @适用于whale 项目的日历控件
* @param string selector 为想实例化日历控件的dom容器
*/

//是否是监管方
var role_info = new Role();
var role_id = role_info.getRoleId();
var is_jg_operator = role.compareTo(role_id,role["jg_operator"]);


function WhaleCalendar(options){
        var _this = this;
        _this.selector = $(options.selector);
        _this.the_month = $(_this.selector).find('[role="the-month"]');//左上角年
        _this.the_year = $(_this.selector).find('[role="the-year"]');//左上角月

        _this.prev_year = $(_this.selector).find('[role="prev-year"]');//上一年
        _this.next_year = $(_this.selector).find('[role="next-year"]');//下一年

        _this.prev_month = $(_this.selector).find('[role="prev-month"]');//上一月
        _this.next_month = $(_this.selector).find('[role="next-month"]');//下一月

        _this.peldge_date = options.peldge_date;//质押物提交的日期
        _this.cur_end_time = options.cur_end_time;//质押物解压日期，或质押物处置日期，或当前系统时间

        _this.IsLeapYear = function(year){
            if((year%400 == 0)||(year%4==0 && year%100!=0)){
                return true;
            }
            return false;
        }

        _this.prev_year.on('click',function(){
            _this.prevYear();
        })
        _this.next_year.on('click',function(){
            _this.nextYear();
        })
        _this.prev_month.on('click',function(){
            _this.prevMonth();
        })
        _this.next_month.on('click',function(){
            _this.nextMonth();
        })

        _this.init();

}

WhaleCalendar.prototype = {
    init:function(){
        var _this = this;
        _this.renderTable();
    },
    createCalendar:function(year,month,date){
        var _this = this;
        var d = new Date();
        var cur_year = '';
        var cur_mon = '';
        var cur_date = '';
        if(!year || year <= 0){
            cur_year = d.getFullYear();  // 年份
        }else{
            cur_year = year;
        }

        if(!month || month <= 0){
            cur_mon = d.getMonth();  // 月份
        }else{
            cur_mon = month-1;
        }

        if(!date || date<=0){
            cur_date = d.getDate();  // 日期
        }else{
            cur_date = date;
        }
        //默认年月
        var my_year = cur_year;
        var my_month = cur_mon+1;        
        _this.the_year.text(my_year);
        _this.the_month.text(my_month);

        var month_days = new Array(31,28+(_this.IsLeapYear(d.getFullYear())),31,30,31,30,31,31,30,31,30,31); // 月份天数数组
        var month_firstday_date = new Date(cur_year,cur_mon,1);
        var monthDays = month_days[cur_mon];
        var monthFirstday = month_firstday_date.getDay(); // 月份的第一天是星期几
        var lines = Math.ceil((monthDays+monthFirstday)/7);  // 表格所需行数
        var calendarBody = "";
        var time = new Date().getTime();
        for(var i=0;i<lines;i++){
            calendarBody+="<tr class='line'>";
            for(var j = 0;j<7;j++){
                idx = i*7+j; //  单元格自然序列号
                if(i == 0 && idx < monthFirstday){
                    calendarBody+="<td class='empty'></td>";
                }else if(idx < monthDays+monthFirstday){
                    var date = idx+1-monthFirstday;
                    var my_cur_date = my_year+"/"+my_month+"/"+date;
                    if(_this.cur_end_time==''){
                        cur_end_date = new Date();
                    }else{
                        cur_end_date = new Date(Date.parse(_this.cur_end_time));
                    }

                    var is_mid = ((new Date(Date.parse(_this.peldge_date))-new Date(Date.parse(my_cur_date)))<=0) &&(cur_end_date-(new Date(Date.parse(my_cur_date)))>=0);

                    var monkey_icon_cls = is_mid?' common-img canlander-mk-icon':'';
                    if(date == cur_date && cur_mon == d.getMonth() && cur_year == d.getFullYear()){
                        calendarBody+="<td class='today'><div class='img-box"+monkey_icon_cls+"' id='imgbox"+time+i+j+"today' data-is-empty='1' data-cur-date='"+my_year+"/"+my_month+"/"+date+"'></div>";
                        calendarBody+="<p class='cur-day'><span class='y-day'>"+date+"日</span></p></td>";
                    }else{
                        calendarBody+="<td><div class='img-box"+monkey_icon_cls+"' id='imgbox"+time+i+j+"' data-is-empty='0' data-cur-date='"+my_year+"/"+my_month+"/"+date+"'></div>";
                        calendarBody+="<p class='whale-day'><span class='y-day'>"+date+"日</span></p></td>";
                    }
                }else{
                    calendarBody+="<td class='empty'></td>";
                }
            }
            calendarBody+="</tr>";
        }
        
        return calendarBody;
    },
    prevMonth:function(){
        var _this = this;
        var theMonth = eval(_this.the_month.html());
        var theYear = eval(_this.the_year.html());
        if(theMonth<=1){
            _this.the_month.html("12");
            if(theYear<=1){
                _this.the_year.html(1);
            }else{
                _this.the_year.html(theYear-1);
            }
        }else{
            _this.the_month.html(theMonth-1);
        }
        cur_year = eval(_this.the_year.html());
        cur_mon = eval(_this.the_month.html());
        _this.renderTable(cur_year,cur_mon)
    },
    nextMonth:function(){
        var _this = this;
        var theMonth = eval(_this.the_month.html());
        if(theMonth >= 12){
            var theYear = eval(_this.the_year.html());
            if(theYear>=2200){
                _this.the_year.html(2200);
            }else{
                _this.the_year.html(eval(theYear+1));
            }
            _this.the_month.html(1);
        }else{
            _this.the_month.html(eval(theMonth+1));
        }
        cur_year = eval(_this.the_year.html());
        cur_mon = eval(_this.the_month.html());
        _this.renderTable(cur_year,cur_mon)
    },
    prevYear:function(){
        var _this = this;
        var theYear = eval(_this.the_year.html());
        if(theYear <= 1){
            _this.the_year.html(1);
        }else{
            _this.the_year.html(eval(theYear-1));
        }
        cur_year = eval(_this.the_year.html());
        cur_mon = eval(_this.the_month.html());
        _this.renderTable(cur_year,cur_mon)
    },
    nextYear:function(){
        var _this = this;
        var theYear = eval(_this.the_year.html());
        if(theYear >= 2200){
            _this.the_year.html(2200);
        }else{
            _this.the_year.html(eval(theYear+1));
        }
        cur_year = eval(_this.the_year.html());
        cur_mon = eval(_this.the_month.html());
        _this.renderTable(cur_year,cur_mon)  
    },
    renderTable:function(year,month){
        var _this = this;
        if(year&&month){        
            _this.selector.find("table tr").not(".header").remove();
            _this.selector.find("table").append(_this.createCalendar(year,month));  
            _this.selector.find("table tr").not(".header").hide().fadeIn(500);       
        }else{
            _this.selector.find("table").append(_this.createCalendar());
        }

        _this.selector.find("table tr").find('td:eq(0)').css('background-color','#fafafa');
        _this.selector.find("table tr").find('td:eq(6)').css('background-color','#fafafa');

        reRenderData();
        
        $('.img-box').on('click',function(){//点击日历中的图片
            var is_empty_status = $(this).attr('data-is-empty');
            var target_id = $(this).attr('id');
            var cur_date = $(this).attr('data-cur-date');

            //开始时间转换
            var string_date = formatDateToString(cur_date);
            //结束 时间转换
            
            var cur_pics = $(this).attr('data-pics');
            var parse_pics = null;
            var is_mid = (new Date(Date.parse(window.sessionStorage["pledgeDate"]))-new Date(Date.parse(cur_date)))<=0;
            console.debug('质押物提交的时间');
            console.debug(new Date(Date.parse(cur_date)));
            if(!is_mid){
                return 
            }
            if(typeof cur_pics !=='undefined'){
                parse_pics = JSON.parse(cur_pics);
            }else{
                parse_pics = 'empty_pic';
            }
   
            console.debug('图片对象')
            console.debug(parse_pics);
            var imgModal = viewImgObj({target:target_id,is_empty:is_empty_status,date:string_date,pics:parse_pics});
            imgModal.Modal({target:target_id,is_empty:is_empty_status,date:string_date,pics:parse_pics});
        });       
    }
}


/**
* 根据返回的数据渲染
*/

function formatDateToString(date){
    var cur_date_arr = date.split('/');
    var _this_year_data = cur_date_arr[0];
    var _this_mouth_data = cur_date_arr[1];
    var _this_day_data = cur_date_arr[2];
    if(_this_mouth_data.length<2){
        _this_mouth_data = '0'+_this_mouth_data
    }

    if(_this_day_data.length<2){
        _this_day_data = '0'+_this_day_data
    }

    var _this_cur_date = _this_year_data+_this_mouth_data+_this_day_data;

    return _this_cur_date
}

/*20160102
2016/01/02*/
function formatDateAsRules(date) {
    if(date.length<1){
        return 
    }
    date = date.toString();
    var _this_cur_year = date.substring(0,4);
    var _this_cur_mouth = date.substring(4,6);
    var _this_cur_day = date.substring(6,8);

    if(_this_cur_mouth.length==2){
        var mouth_arr = _this_cur_mouth.split('');
        if(mouth_arr[0]==0){
            _this_cur_mouth = mouth_arr[1];
        }
        
    }
    if(_this_cur_day.length==2){
        var day_arr = _this_cur_day.split('');
        if(day_arr[0]==0){
            _this_cur_day = day_arr[1];
        }  
    }
    return (_this_cur_year+'/'+_this_cur_mouth+'/'+_this_cur_day)
}

function reRenderData(){

    function get_echo_data(){ 
        var my_the_year = $('[role="the-year"]').text();
        var my_the_month = $('[role="the-month"]').text();
        var cur_date = my_the_year+'/'+my_the_month+'/'+'1';
        
        //时间格式转换开始
        var string_date = formatDateToString(cur_date)
        //结束时间格式转换

        var echo_data = null;      
        var param = {firstDate:string_date,count:'31',pledgeBusinessKey:window.sessionStorage["businessKey"]}

        //获取巡检记录回显记录
        HttpUtils.get_records_data(param,function(data){
            console.debug('回显巡检记录数据');
            console.debug(data);
            echo_data = data.data;
        })
        return configuratorEchoData(echo_data);
    }

    var my_data = get_echo_data();
    var records_data = my_data.had_records_data;
    
    console.debug('纯净的回显数据');
    console.debug(my_data)



    function rerenderCalendar(){
        var calendar_date = $('[data-cur-date]');
        $.each(calendar_date,function(i,item){
            var cur_dom = $(item);
            var td_date = new Date($(item).attr('data-cur-date'));
            $.each(records_data,function(j,info_date){
                var cur_echo_date = info_date.date //formatDateAsRules(info_date.date)
                var echo_date = new Date(cur_echo_date);
                var echo_pics = info_date.pics;

                if((td_date-echo_date)==0 && echo_pics.length>0){//有上传图片的记录则给他一个点亮的状态
                    if(cur_dom.hasClass('canlander-mk-icon')){
                        cur_dom.removeClass('canlander-mk-icon').addClass('logo-red-icon');
                    }    
                    console.debug('时间：'+cur_echo_date)
                    echo_pics = JSON.stringify(echo_pics);
                    cur_dom.attr('data-pics',echo_pics); 
                }
                if((td_date-echo_date)==0 && echo_pics.length==0){
                    if($(cur_dom).hasClass('logo-red-icon')){
                        $(cur_dom).removeClass('logo-red-icon').addClass('canlander-mk-icon');
                        $(cur_dom).removeAttr('data-pics');
                    }
                }
            })
        })
    }
    rerenderCalendar();
}


/**
* @param object 
* param.target 操作的具体日期的那个缩略图
* param.is_empty 当前上传的缩略图对应的日期中巡检记录是否为空
* param.date 当前巡检日期
*/

function scrollLeftcc(target,width){
    var pic_list_dom = $(target).parent().find('[data-role="pic-list"]');
    var single_width = width;
    pic_list_dom.stop(true,true)
    if(parseInt(pic_list_dom.css('left'))==0){
        return 
    }
    pic_list_dom.animate({'left':'+='+single_width+'px'},300)
}

function scrollRight(target,width){
    var single_width = width;
    var pic_list_dom = $(target).parent().find('[data-role="pic-list"]');
    var list_len = pic_list_dom.find('li').length;
    pic_list_dom.stop(true,true)
    if(parseInt(pic_list_dom.css('left'))==-((list_len-1)*single_width)||list_len==0){
        return 
    }
    pic_list_dom.animate({'left':'-='+single_width+'px'},300)
}


function viewImgObj (settings){//巡检日期   
    var upload_file_dom = '';
    var file_box = []; 
    var pics = (settings&&settings.pics);
    var is_right_status = (window.sessionStorage["searchStatus"]==0);
    function picModal(options){//显示modal
        var _this = this;        
        var target = (options&&options.target);
        var is_empty = parseInt(options&&options.is_empty)?true:false;
        var date = (options&&options.date);
        var size = (options&&options.size)||'0';
        var cur_pics = (options&&options.pics);
        var cur_pic_len = (cur_pics!=='empty_pic')?cur_pics.length:0;

        var h = '';
        h+='<div id="view-records" class="modal fade " tabindex="-1" style="display: none;" aria-hidden="true">';
        h+='<div class="modal-backdrop"></div>';
        h+='<div class="modal-dialog " style="z-index:99999">';
        h+='<div class="modal-content view-records-content">';
        h+='<div class="modal-header">';
        h+='<span  class="close" data-dismiss="modal">×</span>';
        h+='<h4 class="blue bigger">图片预览</h4>';
        h+='</div>';

        h+='<div class="modal-body">';

        var carousel = '<div class="my-carousel-box" data-role="carousel"><span class="left common-img prev-icon" data-role="left" onclick="javascript:scrollLeftcc(this,450)"></span><div class="carousel-box"><ul id="my-carousel" class="my-carousel '+(is_jg_operator?'jg-handlable':'')+'" data-role="pic-list"></ul></div><span class="right common-img next-icon" data-role="right" onclick="javascript:scrollRight(this,450)"></span></div>';
        var thumbnail_img = '<div class="my-thumbnail-box"><ul id="my-thumbnail" class="my-thumbnail"></ul></div>';
        var tip_info = (is_jg_operator&&is_right_status)?'<span class="tip-info" id="tip-info">'+cur_pic_len+'/5</span>':'';
        var upload_img = (is_jg_operator&&is_right_status)?'<span class="upload-file"><b data-role="upload-file"><i class="common-img upload-icon"></i>上传</b><input type="file" data-role="upload"></span>':'';
        var submit_file = (is_jg_operator&&is_right_status)?'<div class="clearfix"><span class="btn btn-primary btn-sm pull-right submit-file" data-role="submit-file">提交</span></div>':'';
        h+=carousel+thumbnail_img+upload_img+tip_info+submit_file;

        h+='</div>';
        h+='</div>';
        h+='</div>';
        h+='</div>';

        if($('#view-records').length>0){
            $('#view-records').remove();
        }
        $('body').append(h);
        var cur_view_pic_modal = $('#view-records');
        var carousel_dom = $('#my-carousel');//轮播图
        var thumbnail_dom = $('#my-thumbnail');//缩略图
        upload_file_dom = $('[data-role="upload-file"]');//上传图片
        var upload_input_dom = upload_file_dom.parent().find('input[data-role="upload"]');
        var submit_file_dom = $('[data-role="submit-file"]');//向后端提交上传的图片
        var tip_info = $('#tip-info');

        // 渲染轮播图
        if(cur_pics && cur_pics!=='empty_pic'){

            //生成轮播图
            carousel_dom.html(renderCarousel(cur_pics));

            //点击大图
            var big_modal_dom = $('[data-role="big-modal"]');
            big_modal_dom.on('click',function(){
                showOriginalImage(this);
            })
            
            //删除数据库的图片
            deleteDbImg();

            //生成小缩略图
            thumbnail_dom.html(renderSmallPic(cur_pics));
            //打开系统选择文件对话框
            if(cur_pic_len==5){
                upload_file_dom.attr('disabled','');
            }
        }
               
        upload_file_dom.on('click',function(){
            if(typeof $(this).attr('disabled')!=='undefined'){
                alert('最多只能上传5张!')
                return 
            }  
            $(this).parent().find('input').trigger('click');
            
        })

        //input change 拿到当前选择的
        upload_input_dom.on('change',function(){
            var _this = this;
            var file = $(this)[0].files[0];
            readFile(file,thumbnail_dom);
            cur_pic_len = $('#my-thumbnail').find('.small-bg').length;
            $('.tip-info').text(cur_pic_len+'/5')
        })

        //上传文件
        submit_file_dom.on('click',function(){
            if(!file_box||file_box.length<1){
                return 
            }
            var param = {};
            param.files = file_box; 
            param.data = {
                pledgeBusinessKey:window.sessionStorage["businessKey"],
                inspectionDate:date
            }
            console.debug('巡检记录上传的参数')
            console.debug(param);
            HttpUtils.update_records_pic_data(param,function(data){
                if(data.statusCode == '200'){
                    console.debug('上传成功！');
                    cur_view_pic_modal.modal('hide');
                    reRenderData()
                }
            })
        })

        //图片轮播
        scrollCarousel('[data-role="carousel"]',450);

        var view_records_dom = $('#view-records');
        view_records_dom.modal({backdrop:false});//点击背景时不关闭modal
        view_records_dom.modal('show');
        view_records_dom.on('hidden.bs.modal',function(){
            $(this).remove();
        })
    };


    //显示原始大图
    function showOriginalImage(target){

        var img_src = $(target).attr('data-img-src');
        var h = '';
        h+='<div id="big-img" class="modal fade big-modal" tabindex="-1" style="display: none;" aria-hidden="true" data-role="whale-modal">';
        h+='<div class="modal-dialog">';
        h+='<span  class="close" data-dismiss="modal" style="display:none">×</span>';
        h+='<div class="modal-content">';
        h+='<div class="modal-body"><img src="'+img_src+'"></div>';
        h+='</div>';
        h+='</div>';
        h+='<div class="modal-backdrop"></div>';
        h+='</div>';
        if($('#big-img').length>0){
            $('#big-img').remove();
        }

        $('body').append(h);
        var big_dom = $('#big-img');
        big_dom.modal();//点击背景时不关闭modal

        big_dom.modal('show');
        //图片原始宽度和高度
        var img_dom = big_dom.find('img');

        big_dom.on('shown.bs.modal',function(){
            var img_width = $(img_dom).width();
            var img_height = $(img_dom).height();
            var parse_w = parseInt(img_width);
            var parse_h = parseInt(img_height);
            var max_w = $(window).width()-100;//1800
            var max_h = $(window).height()-200;//816

            if(parse_w>max_w){
                if(parse_h<max_h){
                   img_width = max_w;
                   img_height = img_height*(max_w/parse_w);
                }else{
                    img_height = max_h;
                    img_width = img_width*(max_h/parse_h);
                }
            }else{
                if(parse_h>max_h){
                   img_height = max_h;
                   img_width = img_width*(max_h/parse_h);;
                }
            }

            var window_h = parseInt($(window).height());
            var modal_top = (window_h-img_height)/2;

            //设置图片显示的宽高
            img_dom.css({'width':img_width,'height':img_height});

            //设置图片容器大小，动画以及关闭按钮
            big_dom.find('.modal-dialog,.modal-content').animate({'width':img_width,'height':img_height,'margin-top':modal_top},300,'linear',function(){
                big_dom.find('.close').show()
            });
            
        })

        big_dom.on('hide.bs.modal',function(){
            $(this).remove();
        })

        big_dom.on('hidden.bs.modal',function(){
            $(this).remove();
        })

    }

    function renderCarousel(cur_pics){
        var h = '';
        var url = contextPath+'/accessory/download/';
        $.each(cur_pics,function(i,item){
            h+='<li id="'+item.ip_id+'"><b data-role="delete-db-img" class="delete-db-img">&times;</b><a data-role="big-modal" data-img-src="'+url+item.accessory_id+'" href="javascript:void(0)"><img src="'+url+item.accessory_id+'" width="450" height="320"></a></li>';
        })
        return h
    }

    function deleteDbImg(){
        var delete_db_img_dom = $('[data-role="delete-db-img"]');
        delete_db_img_dom.on('click',function(){
            var _this = this;
            var picId = $(_this).parent().attr('id');
            var param = {inspectionPicId:picId};
            console.debug('删除图片时的ip_id')
            console.debug(param);
            HttpUtils.delete_records_pic(param,function(data){
                if(data.statusCode == '200'){
                    alert('删除图片成功！');
                    var delete_pic_ip_id = $(_this).parent().attr('id');
                    var small_pic_list = $('.small-bg');
                    $(_this).parent().remove();
                    $.each(small_pic_list,function(i,item){
                        if(delete_pic_ip_id==$(item).attr('data-id')){
                            $(item).remove();
                            return false
                        }
                    });
                    //删除后重新渲染轮播图
                    scrollCarousel('[data-role="carousel"]',450);
                    $('[data-role="carousel"]').css('left',0);
                    var cur_num = (($('.tip-info').text()).split('/'))[0]-1;//删除一张则信息提示少一张
                    $('.tip-info').text(cur_num+'/5');//重新渲染张数
                    reRenderData();
                }
            })
        })
    }

    function renderSmallPic(cur_pics){
        var h = '';
        var url = contextPath+'/accessory/download/';
        $.each(cur_pics,function(i,item){
            h+='<div class="small-bg" data-id="'+item.ip_id+'"><img src="'+url+item.accessory_id+'" width="60" height="60"></div>';
        })
        return h
    }

    function scrollCarousel(selector,width){
        var left_btn_dom = $(selector).find('[data-role="left"]');
        var right_btn_dom = $(selector).find('[data-role="right"]');
        var pic_list_dom = $(selector).find('[data-role="pic-list"]');
        var single_width = width;
        var list_len = pic_list_dom.find('li').length;
        pic_list_dom.css({'width':list_len*single_width+'px'});
    }

    function readFile(file,box){//读取图片
        if($('.small-bg').length==5){
            alert('最多只能上传5张')
            return 
        }
        if(!file || !file.type){
            return 
        }
        var str = '';
        var is_pic = /image\/\w+/.test(file.type); 
        var limit_size = (file.size/(1024*1024))>5;//大小限制5m
        if(limit_size){
            alert('请上传小于5M的图片！');
            return 
        }

        /*if(!is_pic){
            var sm_pic_len = $(box).find('.small-bg').length;
            $('.tip-info').text(sm_pic_len+'/5');
            alert('请上传图片！');
            return 
        }*/

        if(is_pic){
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(){ 
                var time = new Date().getTime();
                var file_obj = {id:"view-img"+time,value:file};  
                file_box.push(file_obj);
                console.debug(file_box);
                str += '<div class="small-bg"><b data-role="delete-img" id="view-img'+time+'">&times;</b><img src="'+this.result+'" width="40" height="40"></img></div>'; 
                $(box).append(str);
                var sm_pic_len = $(box).find('.small-bg').length;
                $('.tip-info').text(sm_pic_len+'/5'); 
                if(sm_pic_len == 5){
                    $('[data-role="upload-file"]').attr('disabled','');
                }               
                removeFile();                                   
            }
        }else{
            var sm_pic_len = $(box).find('.small-bg').length;
            $('.tip-info').text(sm_pic_len+'/5');
            alert('请上传图片！');
        }                
    }

    function removeFile(){//删除图片
        $('[data-role="delete-img"]').on('click',function(){
            var cur_id = $(this).attr('id');
            $.each(file_box,function(i,item){
                var input_file_id = item.id;
                if(cur_id==input_file_id){
                    file_box.splice(i,1);
                    return false
                } 
            })
            console.debug(file_box);
            $(this).parent().remove();
            var cur_sm_pic_len = $('#my-thumbnail').find('.small-bg').length;
            $('.tip-info').text(cur_sm_pic_len+'/5');
            if(typeof $('[data-role="upload-file"]').attr('disabled')!=='undefined'){
               $('[data-role="upload-file"]').removeAttr('disabled'); 
            }
            
        })
    }

    return {Modal:picModal}
}


/**
* @日历回显数据配置器
* @param {data} object 后端返回的数据
*/

function configuratorEchoData(data){
    var clean_echo_data = {};
    clean_echo_data.had_records_data = [];
    $.each(data,function(i,item){
        var clean_data = {};
        //var cur_date = (item.inspectionDate).replace(/-/g,'/');
        var cur_date = formatDateAsRules(item.inspectionDate);
        clean_data["pics"] = [];
        clean_data["date"] = cur_date;
        $.each(item.inspectionPics,function(j,info){
            var picInfo = {};
            picInfo["accessory_id"] = info.picAccessory.id;
            picInfo["ip_id"] = info.id;
            clean_data["pics"].push(picInfo)
        })
        clean_echo_data.had_records_data.push(clean_data);
    })

    return clean_echo_data
}
    
$(function () {
    
    new WhaleCalendar({selector:'[data-role="whale-canlander"]',peldge_date:window.sessionStorage["pledgeDate"],cur_end_time:window.sessionStorage["curEndTime"]})//实例化日历插件
    reRenderData()//根据后端返回的数据渲染日历

})

