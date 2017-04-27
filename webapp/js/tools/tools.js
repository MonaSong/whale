/**
 * @Date:2016/10/21
 * @Author:Mona
 * @Description:tools
 */ 
 window.console.debug = function(){

};

(function(window) {
    /**
     * @Ajax
     * @网络层封装
     */
    function Ajax() {
        function _coreAjax(type, data, url, async, dataType, contentType, processData, op_suc, op_fail) {
            data = (data === null || data === "" || typeof (data) === "undefined") ? {
                "date": new Date().getTime()
            } : data;
            $.ajax({
                type: type,
                data: data,
                url: url,
                async: async,
                dataType: dataType,
                contentType: contentType,
                processData: processData,
                success: function(data) {
                    if (data.statusCode === "200" || data.statusCode == undefined) {
                        if ($.isFunction(op_suc)) {
                            op_suc(data);
                        }

                    } else {
                        if ($.isFunction(op_fail)) {
                            op_fail(data);
                        }
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                	renderErrorMsg(jqXHR, textStatus, errorThrown);
                }
            })
        }
        this.myCoreAjax = function(type, data, url, async, dataType, contentType, processData, op_suc, op_fail) {
            _coreAjax(type, data, url, async, dataType, contentType, processData, op_suc, op_fail)
        }
        this.getInputData = function(data) {
            var formData = new FormData();
            var sendData = {};
            sendData.key = 'requestBean';
            if (data !== undefined && data !== '') {
                formData.append(sendData.key, new Blob([JSON.stringify(data)], {
                    type: "application/json"
                }))
            }
            return formData
        }
    }
    Ajax.prototype = {
        getData: function(data, url, op_suc, op_fail) {
            this.myCoreAjax("get", data, url, true, "json", 'application/x-www-form-urlencoded', true, op_suc, op_fail);
        },
        postData: function(data, url, op_suc, op_fail) {
            var _this = this;
            var formData = _this.getInputData(data);
            this.myCoreAjax("post", formData, url, true, "json", false, false, op_suc, op_fail)
        },
        transFormData: function(data, url, op_suc, op_fail) {
            var formData = new FormData();
            var files = data.files;
            var key = data.inputData.key;
            var value = data.inputData.value;

            $.each(files, function(i, item) {
                formData.append(item, document.getElementById(item).files[0]);
            })

            formData.append(key, new Blob([JSON.stringify(value)], {
                type: "application/json"
            }))

            this.myCoreAjax("post", formData, url, true, "json", false, false, op_suc, op_fail)
        }
    }

    /**
     * @Description get参数
     * @return param
     */
    window.param = function() {
        var href = window.location.href;
        var param = {};
        if (href.indexOf('?') > -1) {
            var id = href.substring(href.indexOf('?') + 1);
            if (id.indexOf('&&') > -1) {
                $.each(id.split('&&'), function(i, item) {
                    var info = item.split('=');
                    var cur = info[0];
                    param[cur] = info[1];
                })
            } else {
                var list = id.split('=');
                var index = list[0];
                param[index] = list[1];
            }
        }
        return param
    }();

    window.ajax = new Ajax();

    window.formValidate = function(form,rules, messages) {
        $(form).validate({
            rules: rules,
            messages:messages
        })
    }

})(window)

var tools = {};
tools["_isMobile"] = function(value){
		var length = value.length;

        //中国移动
        var cm = /(^1(3[4-9]|4[7]|5[0-27-9]|7[8]|8[2-478])\d{8}$)|(^1705\d{7}$)/;

        //中国联通
        var cu = /(^1(3[0-2]|4[5]|5[56]|7[6]|8[56])\d{8}$)|(^1709\d{7}$)/;

        //中国电信
        var ct = /(^1(33|53|77|8[019])\d{8}$)|(^1700\d{7}$)/;
        return (length == 11 && (cm.test(value) || cu.test(value) || ct.test(value)))
	}	

/**
 * @Author Mona
 * @Date 2016-11-07
 * @param {selector} string  当前要渲染的分页控件的容器
 * @param {totalPage} int  总页数
 * @param {renderDataCallBack} function 分页回调函数，按照当前的分页去获取数据
 * @return 当前分页对象
 */
function PageBar(selector,totalPage,renderDataCallBack,cur_page){
    var _this = this;
    _this.btnCount = 6;
    _this.selector = selector;
    _this.totalPage = totalPage;
    _this.renderDataCallBack = renderDataCallBack;
    _this.cur_page = cur_page||1;
    _this._init();
}

PageBar.prototype = {
    _init:function(){
        var _this = this;
        var start_page = _this.getStartPage(_this.cur_page);
        _this._renderBar(start_page,_this.cur_page);
    },
    getStartPage:function(currentPage){
        var _this = this;
        if(currentPage>6){
            var i=0;
            while(currentPage>_this.btnCount*i-i+1)
            {
                i++;
            };
            return _this.btnCount*(i-1)-i+2;
        }else{
            var cur_page_num = 1;
            if(currentPage==6){
                if(_this.totalPage>6){
                    cur_page_num = 6;
                } 
            }
            return cur_page_num
        }
        
    },
    _renderBar:function(start,curPageNo){
        var _this = this;
        var $ul=$("<ul></ul>");
        var $firstLi=$('<li id="first" relAttr="first">首页</li>');
        var $prevLi=$('<li id="prev" relAttr="prev">上一页</li>');
        var $lastLi=$('<li id="first" relAttr="last">末页</li>');
        var $nextLi=$('<li id="next" relAttr="next">下一页</li>');

        var liArray=new Array();
        liArray.push($firstLi);
        liArray.push($prevLi);
        liArray.push($lastLi);
        liArray.push($nextLi);
        for(var i=0;i<liArray.length;i++)
        {
            var $li=liArray[i];
            $li.click(function(){
                _this.liClick(this,2);
            });
        }
        $ul.append($firstLi)
        $ul.append($prevLi);
        for(var i=0;i<_this.btnCount;i++){
            if(i+start<=_this.totalPage){
                var $li=$('<li relValue='+(i+start)+'>'+(i+start)+'</li>');
                if(i+start==curPageNo)
                {
                    $li.addClass('active');
                 }
                $li.click(function(){
                    _this.liClick(this,1);
                });
                $ul.append($li);
            }
        }
        $ul.append($nextLi);
        $ul.append($lastLi);

        $('#pageBar').empty().append($ul);
        
    },
    liClick:function(li,type){
        var _this = this;
        var curPageNo = parseInt($(li).text());
        var isShowFirst = false;
        var isShowLast = false;
        if(type==2){
            curPageNo = parseInt($(_this.selector).find("li.active").text());
            var relAttr=$(li).attr('relAttr');
            switch(relAttr)
            {
                case "first":
                    curPageNo=1;
                    break;
                case "prev":                   

                    if($(_this.selector).find("ul>li").eq(2).text()==curPageNo)
                    {
                        isShowFirst = true;
                    }else{
                        curPageNo=(curPageNo==1)?1:curPageNo-1;
                        li=$(_this.selector).find("ul>li[relValue='"+curPageNo+"']")[0];
                    }


                    break;
                case "last":
                        curPageNo=_this.totalPage;
                    break;
                case "next":
                    if($(_this.selector).find('ul>li').eq(7).text()==curPageNo){
                        isShowLast = true;
                    }else{
                       curPageNo=(curPageNo==_this.totalPage)?_this.totalPage:curPageNo+1;
                        li=$(_this.selector).find("ul>li[relValue='"+curPageNo+"']")[0]; 
                    }
                    
                    break;
            }

        }
        if(curPageNo==1)//当前页码是第一页
        {
            _this._renderBar(1,1);
        }
        else if(curPageNo==_this.totalPage){//当前页是最后一页
            var start1 = _this.getStartPage(_this.totalPage);
            _this._renderBar(start1,_this.totalPage);
        }
        else if(isShowFirst || $(li).index()==2&&curPageNo!==1){//点第一个翻页        
            var start1 = curPageNo-_this.btnCount+1;
            if(isShowFirst)
            {
                curPageNo = curPageNo-1;
            }
            _this._renderBar(start1,curPageNo);

        }
        else if(isShowLast ||$(li).index()==_this.btnCount+1&&curPageNo<_this.totalPage){//点最后一个翻页
            _this._renderBar(curPageNo,curPageNo);
        }
        else {//点击其他页
            if(type==1)
            {
                $(li).addClass('active').siblings().removeClass('active');
            }
            else{
                $(_this.selector).find("ul>li[relValue='"+curPageNo+"']").addClass('active').siblings().removeClass('active');
            }
        }

        _this.renderDataCallBack(curPageNo);
    }

}


/**
*@Author Mona
*date 2016-11-14
*description ajax请求error回调中错误信息按照dom中请求参数的key对应的dom显示报错信息
*/
function renderErrorMsg(jqXHR,textStatus,errorThrown){
    var jsonObj = JSON.parse(jqXHR.responseText);
    var errors_hashMap = {
        Set: function(key, value) {
            this[key] = value
        },
        Get: function(key) {
            return this[key]
        },
        Contains: function(key) {
            return this.Get(key) == null ? false : true
        },
        Remove: function(key) {
            delete this[key]
        }
    };

    for ( var i in jsonObj.errors) {
        var error = jsonObj.errors[i];
        for ( var j in error.nodesName) {
            var dom_name = (error.nodesName[j]);
            if (errors_hashMap.Contains(dom_name)) {
                errors_hashMap.Set(dom_name, errors_hashMap.Get(dom_name) + "<br>" + error.errorMessage);
            } else {
                errors_hashMap.Set(dom_name, error.errorMessage);
            }
        }
    }
    var keyList = Object.keys(errors_hashMap);
    for ( var i in keyList) {
        var keyName = keyList[i];
        if (typeof (errors_hashMap.Get(keyName)) == "string") {
            var node_name = keyName;
            var dom = $("[name='" + node_name + "']");  
            if(node_name == 'publicError'){//pulicError 后端key未配置的错误信息提示位置
                $(dom).html('');
                var alert_box = $('<div>');
                alert_box.attr({'class':'alert alert-warning alert-dismissible','role':'alert'});
                var alert_box_btn = $('<button>');
                alert_box_btn.attr({'type':'button','class':'close','data-dismiss':'alert'});
                var alert_box_btn_span = $('<span>');
                alert_box_btn_span.attr('aria-hidden','true');
                alert_box_btn_span.html('&times;');
                alert_box_btn.append(alert_box_btn_span);
                var alert_box_strong = $('<strong>');
                alert_box_strong.text('警告！');

                var alert_box_p = $('<p>');
                alert_box_p.text(errors_hashMap.Get(keyName));
                alert_box.append(alert_box_btn)
                alert_box.append(alert_box_strong)
                alert_box.append(alert_box_p)
                dom.append(alert_box);
                $(dom).fadeIn();//显示publicError dom节点

                $('html,body').animate({scrollTop:0},500);//页面回到顶部

                setTimeout(function(){ $(dom).fadeOut();},5000)// 5s后消失也可以点击右上角关闭按钮

            }else{
                var error_len = dom.parent().find('label.error').length>0;
                if(error_len){
                    dom.parent().find('label.error').detach();
                }
                var label_dom = $('<label>');
                label_dom.attr({'id':node_name+'-error','class':'error','for':node_name});
                label_dom.text(errors_hashMap.Get(keyName));
                dom.parent().append(label_dom);

            }
        }
    }
}


  /**
  *Author Mona 2016-11-14
  *description jquery.validate 扩展方法
  */
    $.validator.addMethod("isMobile", function(value, element) {
        return (this.optional(element) || tools._isMobile(value));
    }, "请填写正确的手机号码");

    $.validator.addMethod("isVerificatCode", function(value, element) {
        var length = value.length;
        var verify = /^([0-9]{6})$/;
        return this.optional(element) || (length == 6 && verify.test(value));
    }, "请正确的验证码");
  
    $.validator.addMethod("isZipCode", function(value, element) {   
        var zipCode = /^[0-9]{6}$/;
        return this.optional(element) || (zipCode.test(value));
    }, "请正确填写您的邮政编码");

    //输入固定长度的字符长度
    // 中文字两个字节
    $.validator.addMethod("fixedLength", function(value,element,param) {
       var length = value.length; 
      return this.optional(element) || ( length == param);   
    }, $.validator.format("请输入{0}位字符"));

/**
 * @postMutipleData
 * @Author Mona
 * @date 2016-11-14
 * @description 使用formdate 上传参数包括普通字段和文件
 * @param {req_url} string 请求地址
 * @param {param} object '提交的数据 data.files data.fileNames data.inputData'
 * @param {opt_suc} function '请求成功的回调'
 * @param {opt_fail} function '请求失败的回调'
 */
postMutipleData = function(req_url,param,opt_suc,opt_fail){
    var url = contextPath+req_url;
    var formData = new FormData();

    if(data.fileNames.length<1){
        return
    }
    if(data.files.length<1){
        return
    }

    $.each(data.files,function(k,info_name){
        formData.append('files',document.getElementById(info_name).files[0])
    })

    $.each(data.fileNames,function(i,item){
        formData.append('fileNames',item);
    })

    formData.append('requestBean', new Blob([JSON.stringify(data.inputData)], {
        type: "application/json"
    }));

    $.ajax({
        type:'post',
        data: formData,
        url:url,
        contentType:false,
        processData:false,
        success:function(data){
            if($.isFunction(opt_suc)){
                opt_suc(data)
            }
        },
        error:function(jqXHR,textStatus,errorThrown){
            renderErrorMsg(jqXHR,textStatus,errorThrown)
        }
    });
}

/**
*@Author Mona
*@date 2016-11-14
*@description 获取验证码
*@param {target} string 需要实现获取验证码的dom元素
*@param {url} string  请求地址
*@param {param} object 请求参数
*/
//使用方式  new GetVerifyCode('#get_code','/my_account',{userName:'Mona',mibile:'13052587892'})
function GetVerifyCode(target,cur_url,param){
    var _this = this;
    _this.target = target;
    _this.url = contextPath+cur_url;
    _this.param = param; 
    _this.init();   
}

GetVerifyCode.getCode = function(target,param,url){
	$.ajax({
        type:'get',
        data:param,
        url:contextPath+url,
        success:function(data){
            if(data.statusCode=='200'){
                    var count = 60;
                    var timer = setInterval(function(){
                        count--;
                        if(count>0){
                            $(target).text(count+'秒后重新获取');
                            $(target).attr('disabled',''); 
                        }else{
                            clearInterval(timer);
                             $(target).text('获取验证码');
                             $(target).removeAttr('disabled');
                        }
                    },1000)             
                  }else{
                      $(target).removeAttr('disabled');
                  }
        },
        error:function(jqXHR,textStatus,errorThrown){
            renderErrorMsg(jqXHR,textStatus,errorThrown)
        }
});
}

GetVerifyCode.prototype = {
  init:function(){
      var _this = this;
      $(_this.target).on('click',function(){
          if(typeof $(_this.target).attr('disabled')=='undefined'){
              $(_this).attr('disabled','');
              if(!_this.param){
            	  return
              }
              _this.getCode();   
          }   
      })
  },
  getCode:function(){
      var _this = this;
      $.ajax({
        type:'get',
        data:_this.param,
        url:_this.url,
        success:function(data){
            if(data.statusCode=='200'){
                    var count = 60;
                    var timer = setInterval(function(){
                        count--;
                        if(count>0){
                            $(_this.target).text(count+'秒后重新获取');
                            $(_this.target).attr('disabled',''); 
                        }else{
                            clearInterval(timer);
                             $(_this.target).text('获取验证码');
                             $(_this.target).removeAttr('disabled');
                        }
                    },1000)             
                  }else{
                      $(_this.target).removeAttr('disabled');
                  }
        },
        error:function(jqXHR,textStatus,errorThrown){
            renderErrorMsg(jqXHR,textStatus,errorThrown)
        }
    })
  }

}

/**
 * @Author Mona
 * @date 2016-11-04
 * @description 审核结束提交组件
 * @param selector {string} 组件最大的容器名称
 * @param maxLength {int} 组件中文字输入的最大长度
 */

function controlBtn(type,selector,curValLen){
    var _this = this;
    _this.selector = selector;
    _this.maxlength = 140;
    _this.curValLen = curValLen;
    _this.type = type;

    _this.select_dom = $(_this.selector).find('select[data-role="control-btn"]');
    _this.textarea_dom = $(_this.selector).find('textarea[data-role="control-btn"]');
    _this.btn_dom = $(_this.selector).find('[data-role="target-btn"]');
    _this.b_dom = $(_this.selector).find('[data-role="font-length"]>b');

    _this.selectVal = $.trim(_this.select_dom.val());
    _this.textareaVal = $.trim(_this.textarea_dom.val());

    _this.setOn = function(){
        _this.btn_dom.removeAttr('disabled');
    }

    _this.setOff = function(){
        _this.btn_dom.attr('disabled','');
    }

    if(_this.selectVal!==''){
        (_this.selectVal=='agree'||_this.type=='1' || _this.textareaVal.length>0)?_this.setOn():_this.setOff()
    } else{
        _this.setOff()
    } 
    _this.init();

    curValLen?_this.b_dom.text(_this.maxlength-curValLen):_this.b_dom.text(_this.maxlength);
}


controlBtn.prototype = {    
    init:function(){
        var _this = this;
        var curSelectVal = _this.selectVal || '';
        var curTextareaVal = _this.textareaVal || '';
        
        _this.b_dom.text(_this.maxlength-_this.curValLen); 

        _this.select_dom.on('change',function(){
            curSelectVal = $.trim($(this).val());
            console.debug('意见内容==='+curTextareaVal)
            if(curSelectVal!==''){
                (curSelectVal=='agree'||_this.type=='1' || curTextareaVal.length>0)?_this.setOn():_this.setOff()
            } else{
                _this.setOff()
            }
        })

        _this.textarea_dom.bind('input propertychange',function(){
            curTextareaVal = $.trim($(this).val()); 
            
            if(curSelectVal!==''){
                (curSelectVal=='agree'||_this.type=='1' || curTextareaVal.length>0)?_this.setOn():_this.setOff()
            } else{
                _this.setOff()
            }
            if(curTextareaVal.length>0){
                if(curTextareaVal.length>_this.maxlength){
                    _this.b_dom.text(0);
                    $(this).val($(this).val().substring(0,140));
                }else{
                    _this.b_dom.text(_this.maxlength-$(this).val().length);
                }
            }else{
                _this.b_dom.text('140');
            }

        })

    }
}

/**
*@Author Mona
*@date 2016-11-21
*@description 获取用户信息/机构信息
*/
function Role(){
    var _this = this;
    _this.userInfo = _this.sendReqest();
}
Role.prototype = {
    sendReqest:function(){
        var _this = this;
        var userInfo = {};
        $.ajax({
            type:'get',
            async:false,
            url:contextPath+'/session.json',
            success:function(data){
                if(data.statusCode=='200'){
                    userInfo = data.data;
                }
            },
            error:function(arg0,arg1,arg2){

            }
        })
        return userInfo
    },
    getRoleId:function(){
        var _this = this;
        return _this.userInfo.roleId
    },
    getRoleName:function(){
        var _this = this;
        return _this.userInfo.roleName
    },
    getUserName:function(){
        var _this = this;
        return _this.userInfo.userName
    },
    getUserId:function(){
        var _this = this;
        return _this.userInfo.userId
    },
    getInstitutionId(){
        var _this = this;
        return _this.userInfo.institutionId;
    },
    getInstitutionName(){
        var _this = this;
        return _this.userInfo.institutionName;
    },
    getInstitutionTypeId(){
        var _this = this;
        return _this.userInfo.institutionTypeId;
    },
    getInstitutionTypeName(){
        var _this = this;
        return _this.userInfo.institutionTypeName;
    }
}



/**
*@Author Mona
*@date 2016-11-17
*@description 查询当前办理节点
*@param {businessKey} string
*/

function AllNodeStatus(businessKey){
    var _this = this;
    _this.businessKey = businessKey;
    _this.init();
}

AllNodeStatus.prototype = {
    init:function(){
        var _this = this;
        _this.nodeInfo = null;
        _this.sendRequest();

    },
    sendRequest:function(){
        var _this = this;
        if(!_this.businessKey){
            return 
        }
        $.ajax({
            type:'get',
            data:{businessKey:_this.businessKey},
            url:contextPath+'/activiti/all_node_status',
            async:false,
            success:function(data,textStatus){
                if(textStatus=='success'){
                    _this.nodeInfo = data;
                    console.debug('所有节点信息')
                    console.debug(_this.nodeInfo)
                }
            },
            error:function(jqXHR,textStatus,errorThrown){
                renderErrorMsg(jqXHR,textStatus,errorThrown)
            }
        })
    },
    getNodeInfo:function(){//获取节点信息
        var _this = this;
        if(_this.nodeInfo && _this.nodeInfo.data.nodes){
            return _this.nodeInfo.data.nodes
        }   
    },
    getCurNodeName:function(data){//获取当前正在办理的节点的名称
        var _this = this;
        var curNodeName = '';
            if(_this.nodeInfo.data.length<1){
                return 
            }
            $.each(_this.nodeInfo.data.nodes,function(i,item){
                if(item.currentActiviti){
                    curNodeName = item.name;
                    return false   
                }
            })  
        return curNodeName
    },
    getCurNodeId:function(){//获取当前正在办理的节点的id
        var _this = this;
        var curNodeId = '';
        var abnormalEnd = false;
        var is_filished = _this.isFinished();

        if(!_this.nodeInfo || _this.nodeInfo.data.length<1){
            return 
        }
        

        if(is_filished){
            $.each(_this.nodeInfo.data.nodes,function(k,info){
                if(info.refuse){
                    curNodeId = info.id;
                    abnormalEnd = true;
                    return false
                } 

                if(info.child && info.child.length>0){
                    $.each(info.child,function(i,item){
                        if(item.refuse){
                            curNodeId = info.id;
                            abnormalEnd = true;
                            return false
                        }
                    })
                }
            })
            console.debug('当前节点的id====='+curNodeId)

            if(!abnormalEnd){
                var instanceName = _this.getProcessInstanceName();
                switch(instanceName){
                    case 'settled'://入驻申请流程
                    curNodeId = "directorAudit";
                        break;
                    case 'finance'://融资申请流程
                    curNodeId = "loan_aduit";
                    break;
                    case 'risk'://融资申请流程
                    curNodeId = "capital_risk_audit";
                    break;
                    case 'overdue'://逾期理赔流程
                    curNodeId = "zhongjiu_risk_receipt";
                    break;
                }
            }
              
        }else{
            $.each(_this.nodeInfo.data.nodes,function(i,item){
                if(item.currentActiviti){
                    curNodeId = item.id;
                    return false   
                }
            });
        }

        return curNodeId
    },
    isFinished:function(){//流程有没有结束
        var _this = this;
        if(!_this.nodeInfo||!_this.nodeInfo.data){
            return 
        }
        return _this.nodeInfo.data.isFinished
    },
    getRefusedInfo:function(){//获取被拒绝的节点信息
        var _this = this;
        var nodeData = _this.nodeInfo.data;
        var refusedInfo = {};
            if(nodeData.length<1){
                return 
            }
            $.each(nodeData.nodes,function(i,item){
                if(item.refuse){//找当前节点中是否有拒绝的
                    refusedInfo["isRefused"] = true
                    refusedInfo["id"] = item.id;
                    return false   
                }else if(item.child && item.child.length>0){//找子节点中是否有拒绝的
                    $.each(item.child,function(j,info){
                        if(info.refuse){
                            refusedInfo["isRefused"] = true
                            refusedInfo["id"] = item.id;
                            return false 
                        }
                    })
                }
            })  
        return refusedInfo
    },
    getProcessInstanceName:function(){//获取流程实例的名称
        var _this = this;
        if(!_this.nodeInfo||!_this.nodeInfo.data){
            return 
        }
        return _this.nodeInfo.data.processInstanceName
    },
    curNodeIsFinished:function(nodeId){
        var _this = this;
        var nodesInfo = _this.nodeInfo.data.nodes;
        var cur_isFinished = false;
        $.each(nodesInfo,function(i,item){
            if(nodeId==item.id){
               item.currentActiviti?cur_isFinished=false:cur_isFinished=true;//先currentActiviti,再是refuse,再是complete,
               return false;
            }
        })
        return cur_isFinished
    }
}

function setCurUrl(type,id,processInstanceName){
        function setUrlAsProcessName(processInstanceName){
            if(!processInstanceName){
                return 
            }
            switch(processInstanceName){
                case 'settled'://入驻申请流程
                    curHref = '/winmanage/cooperative_application_page';
                    break;
                case 'finance'://融资申请流程
                    curHref = '/finance/financ_management_page';
                    break;
                case 'risk'://风险管理
                    curHref = '/riskmanagement/risk_warning_page';
                break;
                case 'decompression'://到期解压流程
                    curHref = '/maturity/start_decompression_page';
                break;
                case 'overdue'://逾期理赔流程
                    curHref = '/overdue/overdue_detail_page';
                break;
            }
            return curHref
        }

        switch(id){
            case 'assistantAudit':
                curHref = uiRouter["ru_zhu"]["assistantAudit"].url;//中酒
                break;
            case 'assignment':
                curHref = uiRouter["ru_zhu"]["assignment"].url;//渠道总监审核
                break;
            case 'managerAudit':
                curHref = uiRouter["ru_zhu"]["managerAudit"].url;//经理审核
                break;
            case 'directorAudit':
                curHref = uiRouter["ru_zhu"]["directorAudit"].url;//总监审核
                break;
            case 'information_Audit':
                curHref = uiRouter["rong_zi"]["information_Audit"].url;//信息审核
                break;
            case 'qualification_Aduit':
                curHref = uiRouter["rong_zi"]["qualification_Aduit"].url;//资质审核
            break;
            case 'finance_pledge':
                curHref = uiRouter["rong_zi"]["finance_pledge"].url;//质押物就位
            break; 
            case 'sampling_testing':
                curHref = uiRouter["rong_zi"]["sampling_testing"].url;//取样检测
                break;
            case 'zhenAn_credit_upload_contract':
                curHref = uiRouter["rong_zi"]["zhenAn_credit_upload_contract"].url;//上传合同
                break;
            case 'contract_aduit':
                curHref = uiRouter["rong_zi"]["contract_aduit"].url;//合同审核
                break;               
            case 'regulator_aduit':
                curHref = uiRouter["rong_zi"]["regulator_aduit"].url;//质押监管
                break;
            case 'insurance_aduit':
                curHref = uiRouter["rong_zi"]["insurance_aduit"].url;//履约保险
                break;
            case 'loan_aduit':
                curHref = uiRouter["rong_zi"]["loan_aduit"].url;//放款确认
                break;
            case 'modifyApply':
               curHref = (type=='skip')?setUrlAsProcessName(processInstanceName):'javascript:void(0)';
               break;

            case 'zhenAn_risk_risk_audit':
                curHref = uiRouter["risk"]["zhenAn_risk_risk_audit"].url;//放款确认
                break;
            case 'capital_risk_audit':
               curHref = uiRouter["risk"]["capital_risk_audit"].url;
               break;
            case 'insurer_close_policy':
                (processInstanceName == 'overdue')?curHref = uiRouter["overdue"]["insurer_close_policy"].url:curHref = uiRouter["decompression"]["insurer_close_policy"].url;
                break;
            case 'regulator_close_pledge':
                (processInstanceName == 'overdue')?curHref = uiRouter["overdue"]["regulator_close_pledge"].url:curHref = uiRouter["decompression"]["regulator_close_pledge"].url;
                break;
            case 'winery_receipt':
                curHref = uiRouter["decompression"]["winery_receipt"].url;//收货
                break;

            //逾期理赔
            case 'insurance_claim':
                curHref = uiRouter["overdue"]["insurance_claim"].url;//发起理赔
            break;
            case 'capital_collection':
                curHref = uiRouter["overdue"]["capital_collection"].url;//保险赔付
            break;
            case 'winery_receipt':
                curHref = uiRouter["overdue"]["winery_receipt"].url;//资方收款
            break;
            case 'zhongjiu_risk_start_back':
                curHref = uiRouter["overdue"]["zhongjiu_risk_start_back"].url;//启动回购
            break;
            /*case 'insurer_close_policy':
                curHref = uiRouter["overdue"]["insurer_close_policy"].url;//解除保单
            break;
            case 'regulator_close_pledge':
                curHref = uiRouter["overdue"]["regulator_close_pledge"].url;//解除质押
            break;*/
            case 'zhongjiu_risk_receipt':
                curHref = uiRouter["overdue"]["zhongjiu_risk_receipt"].url;//提货
            break;
        }

        return curHref
    }

//页面跳转
function skipPage(businessKey){
    var curNodeName = '';
    var curHref = '';
    var allNodeStatus = new AllNodeStatus(businessKey);
    //var curNodeName = allNodeStatus.getCurNodeName();
    var curNodeId = allNodeStatus.getCurNodeId();
    var isFinished = allNodeStatus.isFinished()?allNodeStatus.isFinished():false;   
    var processInstanceName = allNodeStatus.getProcessInstanceName();
    //被拒绝的信息
    var refusedInfo = allNodeStatus.getRefusedInfo();

    if(refusedInfo.isRefused){//如果被拒绝就直接跳到被拒绝的节点[被拒绝也是结束了]
       curHref = setCurUrl('skip',refusedInfo.id,processInstanceName);
    }
    else if(isFinished){//如果顺利结束[不是被拒绝]则跳转到当前业务流程的最后一个节点
          switch(processInstanceName){
            case 'settled'://入驻申请流程
                curHref = uiRouter["ru_zhu"]["directorAudit"].url;
                break;
            case 'finance'://融资申请流程
                curHref = uiRouter["rong_zi"]["loan_aduit"].url;
                break;
            case 'expire'://到期解压流程
                curHref = uiRouter["decompression"]["winery_receipt"].url;
                break;
            case 'overdue'://逾期理赔流程
                curHref = uiRouter["overdue"]["zhongjiu_risk_receipt"].url;
                break;
            case 'risk'://逾期理赔流程
                curHref = uiRouter["risk"]["capital_risk_audit"].url;
                break;
        }  
    }else{
       curHref =  setCurUrl('skip',curNodeId,processInstanceName);
    }
    return (contextPath+curHref)
}


/**
*@Author Mona
*@date 2016-11-28
*@description 流程节点渲染工厂方法
*@returns  ul_dom 
*/

function ProcessNodeMenu(type,businessKey){
    var _this = this;
    _this.type = type;
    _this.businessKey = businessKey;
    _this.processInstanceName = null;

    if(!(this instanceof ProcessNodeMenu)){
        return new ProcessNodeMenu(_this.type,_this.businessKey)
    }
    _this.init();
}

ProcessNodeMenu.prototype = {
    ru_zhu:function(id){
        var _this = this;
        var curUrl = '';
        curUrl = setCurUrl('menu',id,_this.processInstanceName);
        return contextPath+curUrl
    },
    rong_zi:function(id){
        var _this = this;
        var curUrl = '';
        curUrl = setCurUrl('menu',id,_this.processInstanceName);
        return contextPath+curUrl
    },
    risk:function(id){
        var _this = this;
        var curUrl = '';
        curUrl = setCurUrl('menu',id,_this.processInstanceName);
        return contextPath+curUrl
    },
    decompression:function(id){
        var _this = this;
        var curUrl = '';
        curUrl = setCurUrl('menu',id,_this.processInstanceName);
        return contextPath+curUrl
    },
    overdue:function(id){
        var _this = this;
        var curUrl = '';
        curUrl = setCurUrl('menu',id,_this.processInstanceName);
        return contextPath+curUrl
    },
    _setFirstTag:function(li,a,status,aHref){
        if(status=='0'){
            li.attr({'class':'active'});
            a.attr({'href':aHref+'?management_status=0'})
        }else if(status=='1'){
            li.attr({'class':'done'});
            a.attr({'href':aHref+'?management_status=1'})
        }
    },
    _coreRenderMethod:function(nodes,isFinished){
        var _this = this;
        var modifyApplyUrl = '';
        if(!nodes || nodes.length<1){
            return
        }
        console.debug('流程类型');
        console.debug(_this.type)
        switch(_this.type){
            case 'ru_zhu':
            modifyApplyUrl = contextPath+'/winmanage/cooperative_application_page';
            modifyApplyName = '入驻申请';
            break;

            case 'rong_zi':
            modifyApplyUrl = contextPath+'/finance/financ_management_page';
            modifyApplyName = '融资申请';
            break;

            case 'risk':
            modifyApplyUrl = contextPath+'/riskmanagement/risk_warning_page';
            modifyApplyName = '风险提示';
            break;

            case 'decompression':
            modifyApplyUrl = contextPath+'/maturity/start_decompression_page';
            modifyApplyName = '启动解押';
            break;

            case 'overdue':
            modifyApplyUrl = contextPath+'/overdue/overdue_detail_page';
            modifyApplyName = '发起理赔';
            break;
        }

        var ul_dom = $('<ul>');
        var li_dom_modify = $('<li>');
        li_dom_modify.attr({'onclick':'javascript:clickCurrentLi(this)','id':'modifyApply'});
        var li_a_dom_modify = $('<a>'); 

        if(_this.type=='risk'){
            var green_node_status = nodes[0].currentActiviti|| nodes[1].currentActiviti||isFinished;
            green_node_status?_this._setFirstTag(li_dom_modify,li_a_dom_modify,1,modifyApplyUrl):_this._setFirstTag(li_dom_modify,li_a_dom_modify,0,modifyApplyUrl)
         }else if(_this.type=='decompression'){
        	 var decompression_green = nodes[0].currentActiviti|| nodes[1].currentActiviti||nodes[2].currentActiviti||isFinished;
        	 decompression_green?_this._setFirstTag(li_dom_modify,li_a_dom_modify,1,modifyApplyUrl):_this._setFirstTag(li_dom_modify,li_a_dom_modify,0,modifyApplyUrl)
         }else if(_this.type=='overdue'){
             var overdue_green = false;
             var cur_over_due = false;
             $.each(nodes,function(j,info){
                if(info.currentActiviti){
                   cur_over_due = true 
                   return false
                }
             });
             (isFinished ||cur_over_due)?(overdue_green = true):'';
             overdue_green?_this._setFirstTag(li_dom_modify,li_a_dom_modify,1,modifyApplyUrl):_this._setFirstTag(li_dom_modify,li_a_dom_modify,0,modifyApplyUrl)
         }
         else{
            $.each(nodes,function(i,item){
                if(item.id=='modifyApply'){                           
                    item.currentActiviti?_this._setFirstTag(li_dom_modify,li_a_dom_modify,0,modifyApplyUrl):_this._setFirstTag(li_dom_modify,li_a_dom_modify,1,modifyApplyUrl)
                    return false
                }     
            });
         }     
        



        li_a_dom_modify.text(modifyApplyName);
        li_dom_modify.append(li_a_dom_modify);
        ul_dom.append(li_dom_modify)

        console.debug('节点信息');
        console.debug(nodes);
        $.each(nodes,function(i,item){
            var url = _this[_this.type](item.id);
            var cur_li_dom = $('<li>');
                cur_li_dom.attr({'onclick':'javascript:clickCurrentLi(this)','id':item.id});
            var cur_li_a_dom = $('<a>');
            if(item.id=='modifyApply'){
                return true
            }
            else if(item.currentActiviti){
               cur_li_dom.attr({'class':'active small-triangle'});
               cur_li_a_dom.attr({'href':url+'?management_status=0'});
               cur_li_a_dom.text(item.name);
               cur_li_dom.append(cur_li_a_dom);
               ul_dom.append(cur_li_dom);
            }
            else if(item.refuse){
               cur_li_dom.attr({'class':'refuse'});
               cur_li_a_dom.attr({'href':url+'?management_status=1'});
               cur_li_a_dom.text(item.name);
               cur_li_dom.append(cur_li_a_dom);
               ul_dom.append(cur_li_dom)
            }
            else if(item.complete){
                var status = 'done';
                if(item.child && item.child.length>0){
                    $.each(item.child,function(j,info){
                        if(info.refuse){
                            status = 'refuse';
                            return false
                        }
                    })
                }
               cur_li_dom.attr({'class':status});
               cur_li_a_dom.attr({'href':url+'?management_status=1'});
               cur_li_a_dom.text(item.name);
               cur_li_dom.append(cur_li_a_dom);
               ul_dom.append(cur_li_dom);                               
            }
            else{
               cur_li_dom.attr({'class':'default-status'});
               cur_li_a_dom.attr({'href':'javascript:void(0)'});
               cur_li_a_dom.text(item.name);
               cur_li_dom.append(cur_li_a_dom);
               ul_dom.append(cur_li_dom)
            }
        });
        console.debug('ul_dom的内容');
        console.debug(ul_dom);
        $('#left-menu').empty().append(ul_dom);
    },
    init:function(){
        var _this = this;
        var all_node_status = new AllNodeStatus(_this.businessKey);
        _this.processInstanceName = all_node_status.getProcessInstanceName();
        var nodeInfo = all_node_status.getNodeInfo();
        var isFinished = all_node_status.isFinished();
        _this._coreRenderMethod(nodeInfo,isFinished);
        //渲染选中的样式
        var cur_id = window.sessionStorage["cur_menu_id"]||all_node_status.getCurNodeId();

        //console.debug('当前节点的名称');
        //console.debug(all_node_status.getCurNodeId()); 

        if(!cur_id){
            return 
        }
        $('#'+cur_id).siblings().removeClass('small-triangle');
        setTimeout(function(){
            $('#'+cur_id).addClass('small-triangle');
        },300);
    }
}

function clickCurrentLi(targetTag){
    var is_void_status = $(targetTag).find('a').attr('href')=='javascript:void(0)';
    if($(targetTag).hasClass('default-status') || is_void_status ){
        console.debug('如果节点是不可跳转状态则不存储节点的id信息')
        return 
    }
    console.debug('当前节点信息');
    console.debug(targetTag);
    var id = $(targetTag).attr('id');
    window.sessionStorage['cur_menu_id'] = id;    
}

/**
* 文件操作工具方法
*/
/**
* 读取文件
* @param {target} 当前 dom
*/
function readFile(target){
    var file = target.files[0];
    var isPic = /image\/\w+/.test(file.type);
    var cur_file_name = file.name;
    var box = $(target).parent();
    var limit_size = (file.size/(1024*1024))>100;//大小限制100m
        if(limit_size){
            $(target).val('');
            alert('请上传小于100M的文件！');
            return 
        }
    if(isPic){
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(){                                                       
            var str= '<img src="'+this.result+'" width="100" height="100" onclick="javascript:reviewBigPic(this)"></img>';
            str+='<span data-role="delete-file" onclick="javascript:deleteFile(this)">&times;</span>';
            $(box).append(str);                                     
        }
    }else{
        var str = '<span class="file-name">'+cur_file_name+'</span>';
        str+='<span data-role="delete-file" onclick="javascript:deleteFile(this)">&times;</span>';
        $(box).append(str);  
    }
         
}

function triggerClickFileInput(target){
    $(target).parent().find('input').trigger('click')
}

/**
* 读取文件
* @param {target} 当前 dom
* @param {inputName} 当前input 的 name属性值
*/
var inputNameStorage = [];
var all_node_status = new AllNodeStatus(window.sessionStorage["businessKey"]);
var cur_node_id = all_node_status.getCurNodeId();
function deleteFile(target,inputName){
    var img_box = $(target).parents('.file-box').find('[data-role="img-box"]');
    img_box.empty().text('请上传文件');
    var file_dom = $('<input>');
    file_dom.attr({'type':'file','onchange':'javascript:readFile(this,"'+inputName+'")','name':inputName,'id':inputName});
    var file_default_img = '<span data-role="default-img" class="common-img submit-file-icon" onclick="javascript:triggerClickFileInput(this)"></span>'
    img_box.append(file_dom);
    img_box.append(file_default_img);
    if(inputName && $.inArray(inputName,inputNameStorage)<0){
        inputNameStorage.push(inputName);
    }
    window.sessionStorage[cur_node_id] = JSON.stringify(inputNameStorage);  
}

/**
* 查看图片文件的大图
* @param {target} 当前 dom
*/
function reviewBigPic(target,text,id){
    var cur_src = $(target).attr('src');
    var html = '';
        html+='<div class="modal fade" id="view-pic" data-role="view-pic-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
        html+='<div class="modal-dialog">';
        html+='<div class="modal-content">';
        html+='<div class="modal-header">';
        html+='<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
        html+='<h4 class="modal-title" id="myModalLabel">图片预览</h4>';
        html+='</div>';
        html+='<div class="modal-body center">';
        html+='<img src="'+cur_src+'" width="300px" height="auto">';
        var ref = contextPath+'/accessory/download/'+id;
        html+='</div>';
        html+='<div class="modal-footer">';
        html+='<a href="'+ref+'" download="true" class="btn btn-download ">下载<i class="common-img whale-download-icon"></i></a>'
        html+='</div>';
        html+='</div>';
        html+='</div>';
        html+='</div>';
        if($('#view-pic').length>0){
            $('#view-pic').detach();
        }
        $('body').append(html);
        $('#view-pic').modal('show');

}

/**
* Author Mona
* Date 2016-12-07
* description 文件的显示和操作
* @param {target} string 目标元素dom
* @param {text} string 文件的名称
* @param {id} 目标元素的地址id
* @param {type} 文件类型 普通文件还是图片文件
* @param {operable} 是否可以操作 进行删除或修改操作
*/
function setAccessory(target,text,id,type,operable){
    var fileExt = /(jpg|jpeg|gif|bmp|png)/;
    var like_pic = fileExt.test(type);
    var url = contextPath+'/accessory/download/';
    var inputName = $(target).attr('name');

    var box_dom = $('<div>');
    box_dom.attr({'class':'file-box'});
    var delete_icon_dom = $('<span>');
    delete_icon_dom.attr({'data-role':'delete-file','onclick':'javascript:deleteFile(this,"'+inputName+'")'});
    delete_icon_dom.html('&times;');
    var img_box_dom = $('<div>');
    img_box_dom.attr({'data-role':'img-box'});

    if(like_pic){//图片文件的渲染方式
        var img_dom = $('<img>');
        img_dom.attr({'src':url+id,'onclick':'javascript:reviewBigPic(this,"'+text+'","'+id+'")'});
        img_dom.text(text);
        img_box_dom.append(img_dom);

    }else{//普通文件的渲染方式
        var a_dom = $('<a>');
        a_dom.attr({'href':url+id,'download':'true'});
        a_dom.text(text);
        img_box_dom.append(a_dom);        
    }

    operable?img_box_dom.append(delete_icon_dom):'';//只有办理状态时才能进行删除操作
    //img_box_dom.append(delete_icon_dom);
    box_dom.append(img_box_dom)
    $(target).parent().empty().append(box_dom);       
}

function Uploadfile(targetTag,option){
    var fileExt = obj.value.substr(obj.value.lastIndexOf(".")).toLowerCase();//文件后缀名
    var fileExp = /.jpg|.jpeg|.gif|.bmp|.word|.pdf|.zip|.rar/;
    fileExp.test(fileExt)?'':alert('请上传正确格式的文件，')

}

/**
*@Author Mona
*@date 2016-11-29
*@description 成功提交时的信息提示
*@param processEnd 流程是否结束 boolean
*/

function auditSuccess(alertInfo,processEnd,endInfo){
        if($('#modal-success').length>0){
            $('#modal-success').detach();
        }
       var modal_dom = $('<div>');//1
       modal_dom.attr({'id':'modal-success','class':'modal fade','tabindex':'-1','style':'display:none','aria-hidden':'true','role':'dialog'});
       var modal_dialog_dom = $('<div>');//2
       modal_dialog_dom.attr({'class':'modal-dialog'});
       var modal_dialog_content_dom = $('<div>');//3
       modal_dialog_content_dom.attr({'class':'modal-content'});
       var modal_dialog_content_header_dom = $('<div>');//4
       modal_dialog_content_header_dom.attr({'class':'modal-header'});
       var modal_dialog_content_header_btn_dom = $('<button>');
       modal_dialog_content_header_btn_dom.attr({'type':'button','class':'close','data-dismiss':'modal'});
       modal_dialog_content_header_btn_dom.html('&times;');
       var modal_dialog_content_header_h4_dom = $('<h4>');
       modal_dialog_content_header_h4_dom.attr({'class':'blue bigger'});
       //modal_dialog_content_header_h4_dom.text(alertInfo);
       modal_dialog_content_header_h4_dom.text('提示');

       modal_dialog_content_header_dom.append(modal_dialog_content_header_btn_dom);
       modal_dialog_content_header_dom.append(modal_dialog_content_header_h4_dom);

       var modal_dialog_content_body_dom = $('<div>');
       modal_dialog_content_body_dom.attr({'class':'modal-body'});
       var modal_dialog_content_body_h4_dom = $('<h4>');
       modal_dialog_content_body_h4_dom.attr({'data-modal-role':'alert-info'});
       modal_dialog_content_body_dom.append(modal_dialog_content_body_h4_dom);

       modal_dialog_content_dom.append(modal_dialog_content_header_dom);
       modal_dialog_content_dom.append(modal_dialog_content_body_dom);

       modal_dialog_dom.append(modal_dialog_content_dom);
       modal_dom.append(modal_dialog_dom);

       $('body').append(modal_dom);

       var cur_modal_dom = $('#modal-success');
       var cur_alert_info_dom = $('[data-modal-role="alert-info"]');
       
       processEnd?cur_alert_info_dom.html(endInfo):cur_alert_info_dom.text('办理成功');
       cur_modal_dom.modal('show');

       var timer = processEnd?5000:2000;
       setTimeout(function(){
            cur_alert_info_dom.modal('hide');
            window.sessionStorage["historyRef"]?window.location.href = window.sessionStorage["historyRef"]:window.location.href = contextPath+'/anagement_page';
        },timer);

}
/**
* @param {option} object
* option.type tip| operableModal 
* option.title 提示的标题 string 
* option.info 提示的内容 string/dom
* option.historyRef 从哪里来回哪里去 string 
* option.timer 停留的时间 int 
* option.cancelText 左侧取消按钮的文案
* option.successText 右侧成功按钮的文案
* option.cancelCallback 取消的回调函数
* option.successCallback 成功的回调函数
*/
function whaleModal(option){
    if($('#whale-modal-form').length>0){
        $('#whale-modal-form').detach();
    }

    if(option && typeof option !=='object'){//如果存在
        alert('请传入正确的参数！');
    }

    var type = (option&&option.type) || 'tip';
    var title = (option&&option.title) || '提示';
    var info = (option&&option.info) || '办理成功！';
    var removeStore = (option&&option.is_remove_store)||false;

    var historyRef = '';
    if(option&&option.historyRef){
       historyRef = contextPath+option.historyRef;
    }else if(window.sessionStorage["historyRef"]){
       historyRef = window.sessionStorage["historyRef"]
    }else{
       historyRef = contextPath+'/anagement_page';
    }

    var timer = (option&&option.timer) || 2000;    
    var cancelText = (option&&option.cancelText) || '取消';
    var successText = (option&&option.successText) || '成功';
    var cancelCallback = option&&option.cancelCallback;
    var successCallback = option&&option.successCallback;
    var is_operable_modal = (type == 'operableModal');
    var cancel_able = (option&&option.cancelAble) || false;


    var h = '';
    h+='<div id="whale-modal-form" class="modal fade" tabindex="-1" style="display: none;" aria-hidden="true" data-role="whale-modal">';
   // h+='<div class="modal-backdrop"></div>';
    h+='<div class="modal-dialog">';
    h+='<div class="modal-content">';
    h+='<div class="modal-header">';
    h+='<span  class="close" data-dismiss="modal">×</span>';
    h+='<h4 class="blue bigger">'+title+'</h4>';
    h+='</div>';
    h+='<div class="modal-body">'+info+'</div>';
    if(is_operable_modal){
        h+='<div class="modal-footer">';
        cancel_able?(h+='<button class="btn btn-sm btn-default" data-dismiss="modal" data-role="cancel">'+cancelText+'</button>'):'';
        h+='<button class="btn btn-sm btn-primary" data-role="success">'+successText+'</button>';
        h+='</div>';
    }
    h+='</div>';
    h+='</div>';
    h+='</div>';
    $('body').append(h);
    var cur_modal = $('#whale-modal-form');
    var cancel_btn_dom = cur_modal.find('[data-role="cancel"]');
    var success_btn_dom = cur_modal.find('[data-role="success"]');
    cur_modal.modal('show');

    //以下是给取消确定按钮注册点击事件
    if(is_operable_modal){//如果不是需要自己去操作的modal 那么是不需要注册按钮的交互事件的
        cancel_btn_dom.on('click',function(){
            if($.isFunction(cancelCallback)){
                cancelCallback();
            }
        });
        success_btn_dom.on('click',function(){
            if($.isFunction(successCallback)){
                successCallback();
            }
        });

        $('[id="whale-modal-form"] [data-dismiss="modal"]').on('click',function(){
            window.location.href = historyRef;
        }) 
    }
    

    //以下是设置自动跳转的逻辑
    if(!is_operable_modal){//如果是需要自己去操作的modal那么就不用自动跳转
        setTimeout(function(){
            cur_modal.modal('hide');
            removeStore?window.sessionStorage.clear():'';
            window.location.href = historyRef;
        },timer); 
    }
    
}


function setWahleNumber(input_number_dom){

    $(input_number_dom).on('input propertychange',function(){
            var _this = input_number_dom;
            var cur_val = $(_this).val();
            var spot_index = cur_val.indexOf('.');
            var integer_length = null;
            var decimal_val = null;
            if(cur_val==''){
                return 
            }
            if(spot_index == -1){//没有小数点
                integer_length = cur_val.length;
                if(integer_length >= 11){
                    $(_this).val((cur_val.substring(0,11)+'.00'));
                }else{
                    $(_this).val((cur_val+'.00'));
                }

            }else{//有小数点
                var integer_val = (cur_val.substring(0,spot_index));
                integer_length = integer_val.length;
                decimal_val = (cur_val.substring(spot_index+1));

                //根据输入的情况给小数部分赋值
                if(decimal_val){
                    if(decimal_val.length > 2){
                        decimal_val = (decimal_val.substring(0,2));
                        $(_this).val((integer_val+'.'+decimal_val));
                        console.debug('小数位长度大于2')
                    }
                    if(decimal_val.length == 1){
                        decimal_val = decimal_val+'0';
                        $(_this).val((integer_val+'.'+decimal_val));
                        console.debug('小数位为长度1')
                    }
                }else{
                    decimal_val = '00';
                }

                //给input重新赋予输入的值
                if(integer_length > 11){//如果整数位大于11位则整数位只显示11位
                    $(_this).val((cur_val.substring(0,11)+'.'+decimal_val));
                }else{
                    if(integer_length == 0 && decimal_val == '00'){
                        $(_this).val('0.00');
                        console.debug('没有整数位');
                    }
                }

            }
        })
    
}  
//数字组件
    $.fn.whaleNumber = function(options) {

        var defaults = {
            max_int: 11,
            max_spot: 2,
            type:'money'
        }

        var settings = $.extend({}, defaults, options);
        return this.each(function() {
            var $this = $(this);
            var is_money = (settings.type=='money');

            //获取焦点时
            $this.on('input propertychange',function(e){
                var _this = this;
                var cur_val = $(_this).val();//当前值
                var spot_index = cur_val.indexOf('.');//当前小数点索引
                var int_val = null//整数值
                var int_len = null;//整数长度
                var decimal_val = null;//小数值
                var decimal_len = null;//小数长度

                //限制只能输入数字逗号和小数点
                for(var index=0;index<this.value.length;index++){
                    if(!/[0-9\.]/.test(this.value.charAt(index))){
                        this.value=this.value.substring(0,index);
                    }
                }

                //没有小数点
                if(spot_index == -1){
                    int_len = cur_val.length;
                    if(int_len >= settings.max_int){
                        $(_this).val(cur_val.substring(0,settings.max_int));
                    }  
                //有小数点
                }else{
                    var sopt_last_index = cur_val.lastIndexOf('.');

                    //有且只有一个小数点
                    if(sopt_last_index == spot_index){
                        int_val = cur_val.substring(0,spot_index);
                        int_len = cur_val.substring(0,spot_index).length;
                        decimal_len = cur_val.substring(spot_index+1).length;
                        if(int_len>11 || decimal_len>2){
                            if(int_len>11){
                                int_val = cur_val.substring(0,11);
                            }  
                            decimal_val = cur_val.substring(spot_index+1,spot_index+3);
                            $(_this).val(int_val+'.'+decimal_val);
                        } 

                    //有多个小数点
                    }else{
                        $(this).val(cur_val.substring(0,spot_index+1));
                    }
                    
                }
            });

            $this.on('focus',function(e){
                var cur_input_val = $(this).val();
                var cur_val_list = cur_input_val.split('');
                if($.inArray(',',cur_val_list)>-1){
                    cur_input_val = cur_input_val.replace(/,/g,'');
                    $(this).val(cur_input_val);
                }
            });

            //失去焦点时
            $this.on('blur',function(e){
                var _this = this;
                var cur_val = $(_this).val();
                var spot_index = cur_val.indexOf('.');
                var int_len = null;
                var decimal_val = null;
                if(spot_index == -1){//没有小数点时失去焦点时补位
                    int_len = cur_val.length;
                    var cur_int_val = null;
                    if(int_len >= settings.max_int){
                        $(_this).val((cur_val.substring(0,settings.max_int)+'.00'));
                    }else{
                        int_len==0?$(_this).val(('0.00')):$(_this).val((cur_val+'.00'));                         
                    }
                    if(is_money){
                        cur_int_val = renderNum($(_this).val());
                        $(_this).val(cur_int_val);
                    }


                }else{
                    var cur_int_val = $(_this).val().substring(0,spot_index);
                    var cur_dec_val = $(_this).val().substring(spot_index+1,spot_index+3);
                    var cur_dec_val_len = cur_dec_val.length;

                    switch(cur_dec_val_len){
                        case 0:
                            cur_dec_val = '00'
                        break;
                        case 1:
                            cur_dec_val = cur_dec_val+'0'
                        break;
                    }
                    if(is_money){
                        var three_val = renderNum(cur_int_val).substring();
                        var three_val_spot_index = three_val.indexOf('.');
                        var cur_three_val = null;
                        cur_three_val = three_val.substring(0,three_val_spot_index);
                        $(_this).val(cur_three_val+'.'+cur_dec_val);
                    }else{
                        $(_this).val(cur_int_val+'.'+cur_dec_val);
                    }
                }

            })

        });

    };        

/**
* @descript 禁用浏览器的返回
*/
function setHistoryDisable(){
    if (window.history && window.history.pushState) {
        $(window).on('popstate', function () {
            window.history.pushState('forward', null, '#');
            window.history.forward(1);
        });
    }
    window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
    window.history.forward(1);
}      

$(function(){

    setHistoryDisable();
    
    $('[data-role="whale-money"]').whaleNumber({type:'money'});

    $('[data-role="whale-number"]').whaleNumber({type:'number'});

    //初始化时间组件
    $('[data-date]').datetimepicker({format: 'yyyy/mm/dd',language:'zh-CN',startView:'month',todayHighlight:true,minView:'month',autoclose:true});
    $('[data-date-time]').datetimepicker({format: 'yyyy/mm/dd hh:ii',language:'zh-CN'});


    $('[data-date]').datetimepicker().on('changeDate',function(e){
        var _this = this;
        if(e.date.valueOf()){
            if($(_this).next().hasClass('error')){
                $(_this).next('.error').remove();
            }   
        }
    })


    //select-search
    $("[data-search-select]").select2({width: "100px"});

})

//隐藏select的下拉符号
function addSelectPatch(){
    var select_arr = [];
    var select_list_dom = $('select');
    $.each(select_list_dom,function(i,item){
        if(typeof $(item).attr('disabled')!=='undefined'){
            select_arr.push(item)
        }
    });

    $.each(select_arr,function(k,info){
        if($(info).parent().find('.sm-bg').length<1){
            var bg_color = $(info).parent().find('select').css('background-color');
            console.debug('颜色=='+bg_color);
            $(info).parent().append('<b class="sm-bg"></b>');
            $(info).parent().find('.sm-bg').css({'background-color':bg_color,'opacity':1});
        }

        if($(info).parent().find('.sm-bg').css('background-color') !== $(info).parent().find('select').css('background-color')){
            var cur_color = $(info).parent().find('select').css('background-color');
            $(info).parent().find('.sm-bg').css({'background-color':cur_color,'opacity':1});
        }
        
   });
}

//千分位分割
function toThousands(num) {
    var result = '', counter = 0;
    num = (num || 0).toString().replace(/,/g,'');
    for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result = num.charAt(i) + result;
        if (!(counter % 3) && i != 0) { result = ',' + result; }
    }
    return result;
}

function renderNum(num){
    var cur_num = null;
    var string_num = (num||0).toString();
    var spot_index = string_num.indexOf('.');

    if(spot_index == -1){
        cur_num = toThousands(num);
        cur_num = cur_num+'.00';
    }else{
        var cur_spot_num = string_num.substring(spot_index);
        num = string_num.substring(0,spot_index);
        cur_num = toThousands(num);
        cur_num = cur_num+cur_spot_num;
    }

    return cur_num
}

//去掉金额中的','
function removeSopt(num){
    var money_str = num.replace(/,/g,'');
    return money_str;
}

//重置menu
function resetMenu(){
    var menu_li_list = $('#menu ul li');
    $.each(menu_li_list,function(i,item){
        $(item).removeClass('active');
    })
}