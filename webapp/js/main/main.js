$(function(){

    function roleMenu(){
    	var curMenu = null;
        if(userName.indexOf('jc')>-1){
        	loadData(menuData.data01);
        }
        else if(userName.indexOf('yy')>-1){
        	loadData(menuData.data02);                    	
        }
        else if((userName.indexOf('jr')>-1)||(userName.indexOf('jg')>-1)||(userName.indexOf('zf')>-1)||(userName.indexOf('bx')>-1)){
        	loadData(menuData.data03);
        }                	
        return curMenu               	
    }
    //roleMenu();//按角色展示菜单
    
    function loadData(data){
            var h = '';
            $.each(data,function(i,item){                            
                     h+='<li><a href="'+item.ref+'" id="'+item.id+'"><i class="'+item.icon+'"></i><span role="title">'+item.title+'</span><span class="ink"></span></a></li>';                                                                             
            })
            $('#menuList').html(h); 
    }
    
    function displayMenu(){
    	if(window.sessionStorage["menuIndex"]){
    		var curIndex = parseInt(window.sessionStorage["menuIndex"]);
    		$('#menuList>li').eq(curIndex).addClass('active').siblings().removeClass('active');
    	}
    }
    
    $('#menuList>li').on('click',function(){
    	window.sessionStorage["menuIndex"] = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        console.log(window.sessionStorage["menuIndex"])
    });
    
    //displayMenu();//存储菜单状态

    //初始化tab
    $('ul[role="tablist"]>li>a').click(function (e) {
      e.preventDefault();
      $(this).tab('show')
    })    

    //千分位分割
    function thousands(num){
        num = num.toString();
        if(/^-?\d+\.?\d+$/.test(num)){
            if(/^-?\d+$/.test(num)){
                num =num + ",00";
            }else{
                num = num.replace(/\./,',');
            }
            while(/\d{4}/.test(num)){
                num = num.replace(/(\d+)(\d{3}\,)/,'$1,$2');
            }
            num = num.replace(/\,(\d*)$/,'.$1');
           return num
        }
    }
    function reSetNum(){
    	var inputCt = $('.panel').find('input[type="text"]');
        var inputNumList = [];
            $.each(inputCt,function(i,item){
            	var v = $(item).val();
            	var curInt = parseInt(v)
            	var type = typeof curInt;            	
        		var afterVal = thousands(curInt); 
        		if(afterVal==undefined){
        			$(item).val(v);
        		}
        		else{
        			$(item).val(afterVal);
        		}            	
            });               	    
    }
    
    reSetNum();
    
})


       