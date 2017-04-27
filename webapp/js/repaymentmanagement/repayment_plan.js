/**
 * @Date 2016-12-07
 * @Author yugang
 * @description 还款详情管理列表
 */
    
$(function(){
	//图片能上传数
	var picload=null;
	var url = contextPath+'/accessory/download/';
	var isEnablechange=false;
    var isDisablechange=false;
	//下拉菜单
	$("[data-search-selected]").select2({width: "100%",height:"10%"});
	$('.select2-container').on('click',function(){
		$('.select2-container').find('.select2-search__field').attr('placeholder','重新选择期次数据会被清空,请及时保存');
	})
	//判断角色
	function management_check() {
		var management=false;
        var roleInfo = new Role();
        var roleId = roleInfo.getRoleId();
        management = role.compareTo(roleId, role["zf_management_operator"]); //资方操作员
        return management
    }
	var management=management_check();
	console.debug(management);
	if(management){
		$('#operation').show();
		$('.start_plan').show();
		$('.btn-save').show();
		$('#repayment_period').removeAttr('disabled');
		$('#repayment_total').removeAttr('disabled');
		$('#repayment_date').removeAttr('disabled');
	}
	
	function repay_outside(){
		if(!management){
			$('.sign').hide();
			$('.factory_style').hide();
			$('.repay_date').attr('disabled','disabled');
			$('.repay_money').attr('disabled','disabled');
			$('#paid_total').attr('disabled','disabled');
			$('.repayment_voucher').attr('disabled','disabled');
			$('.receipt_voucher').attr('disabled','disabled');
			$('.normal').addClass('hide');
			$('.Interest').addClass('hide');
			$('.overdue').addClass('hide');
		}else{
			$('.factory_style').hide();
			$('.alreadyOperate').show();
		}
	}
	
	function factory_check() {
		var factory=false;
        var roleInfo = new Role();
        var roleId = roleInfo.getRoleId();
        factory = role.compareTo(roleId, role["jc_system_operator"]); //酒厂
        return factory
    }
	var factory=factory_check();
	console.debug(factory)
	
	function factory_show(){
		if(factory){
			var repay_datetotla=$('.repay_date');
			if(window.sessionStorage["status"]==='2' || window.sessionStorage["listStatus"]==='2'){
				$('#repayment_period').attr('disabled','disabled');
				$('.repayment_voucher').attr('disabled','disabled');//已结清
				$('.normal').addClass('hide');
				$('.Interest').addClass('hide');
				$('.overdue').addClass('hide');
			}else if(window.sessionStorage["status"]==='3' || window.sessionStorage["listStatus"]==='3'){
				$('.btn-save').show();
				$('#repayment_period').attr('disabled','disabled')
				//$('.repayment_voucher').removeAttr('disabled');//逾期
				$('.normal').addClass('hide');
				$('.Interest').addClass('hide');
				$('.overdue').addClass('hide');
			}else{
				$('.btn-save').show();
				$('#repayment_period').attr('disabled','disabled')
				$('.repayment_voucher').removeAttr('disabled');//正常和欠息
				for(i=0;i<picload.length;i++){
            		if(picload[i]===false){
            			$(repay_datetotla[i]).parent().parent().find(".repayment_voucher").attr('disabled','disabled');
            		}
            	}
				$('.normal').addClass('hide');
				$('.Interest').addClass('hide');
				$('.overdue').addClass('hide');
			}
		}
	}
	
	
    //实现联动效果及数据渲染
   function showList(start){  
         var h = '';
         var repayment_list = document.getElementById("repayment_period");
         for(var i=start+1;i<37;i++){
        	var opt = document.createElement ("option");
        	    opt.value = i;
        	    opt.innerText = i;
        	    repayment_list.appendChild (opt);
         }
    }
   
    function renderList(dataInfo,end){
      var h = '';
      
      var cur_len = dataInfo.length;
      //status=window.sessionStorage["repay_status"];//页面自带状态
      $.each(dataInfo,function(i,item){
    	  //alert(222)
    	  h+='<tr class="creatPeriod creat'+(i+1)+'" data-id="'+item.id+'"><td class="period">'+item.repaymentPeriodId+'</td>';
    	  if(status===0){//初始化
    		  //alert(555)
    		  if(item.repaymentStatus===0){
    			  if(item.replaymentDate===null){
    				  h+='<td><input class="form-control repay_date" type="text" value="" data_date></td>';
    			  }else{
    				  h+='<td><input class="form-control repay_date" type="text" value="'+item.replaymentDate+'" data_date></td>';
    			  }
    	          h+='<td><input class="form-control repay_money" data-role="whale-money" type="text" value="'+renderNum(item.repaymentAmount)+'"></td>';
    		  }
    		  if(item.repaymentStatus===0){
    			  h+='<td data-repaystatus="'+item.repaymentStatus+'" class="data-state text-left">-</td>';
    		  }else{
    			  h+='<td data-repaystatus="'+item.repaymentStatus+'" class="data-state text-left">'+item.repaymentStatus+'</td>';
    		  }
    		  h+='<td><div class="repay_div"><div class="upfilebox"><input type="file" disabled="disabled" id="repayment'+i+'" name="repayment'+i+'" class="repayment_voucher"><label class="lable"><img src="'+contextPath+'/imgs/validate/download.png"></label></div><div class="repay-view"></div></div></td>';
          	  h+='<td><div class="repay_div"><div class="upfilebox"><input type="file" disabled="disabled" id="receipt'+i+'" name="receipt'+i+'" class="receipt_voucher"><label class="lable"><img src="'+contextPath+'/imgs/validate/download.png"></label></div><div class="repay-view"></div></div></td>';
          	  h+='<td class="btn_operation  hide-status"><input type="button" class="btn normal text-left" disabled="disabled" value="正常"><input type="button" class="btn Interest text-left" disabled="disabled" value="欠息"><input type="button" class="btn overdue text-left" disabled="disabled" value="逾期"></td>'
    	  }else if(status===2){//禁用
    		  //alert(666)
    		  if(item.repaymentStatus===0){//禁用可编辑
    			  if(item.replaymentDate===null){
    				  h+='<td><input class="form-control repay_date" type="text" value="" data_date></td>';
    			  }else{
    				  h+='<td><input class="form-control repay_date" type="text" value="'+item.replaymentDate+'" data_date></td>';
    			  }
    	          h+='<td><input class="form-control repay_money" data-role="whale-money" type="text" value="'+renderNum(item.repaymentAmount)+'"></td>';
    		  }else{//启用不可编辑
    			  if(item.replaymentDate===null){
    				  h+='<td><input class="form-control repay_date" type="text" disabled="disabled" value="" data_date></td>';
    			  }else{
    				  h+='<td><input class="form-control repay_date" type="text" disabled="disabled" value="'+item.replaymentDate+'" data_date></td>';
    			  }
    	          h+='<td><input class="form-control repay_money" type="text" data-role="whale-money" disabled="disabled" value="'+renderNum(item.repaymentAmount)+'"></td>';
    		  }
    		  if(item.repaymentStatus===0){
    			  h+='<td data-repaystatus="'+item.repaymentStatus+'" class="data-state text-left">-</td>';
    		  }else if(item.repaymentStatus===1){
    			  h+='<td data-repaystatus="'+item.repaymentStatus+'" class="data-state text-left">正常</td>';
    		  }else if(item.repaymentStatus===2){
    			  h+='<td data-repaystatus="'+item.repaymentStatus+'" class="data-state text-left">欠息</td>';
    		  }else if(item.repaymentStatus===3){
    			  h+='<td data-repaystatus="'+item.repaymentStatus+'" class="data-state text-left">逾期</td>';
    		  }
    		  if(item.repaymentVoucherPic!==null && item.receiptVoucherPic!==null){
    			  h+='<td><div class="repay-view"><img class="img" data-name='+item.repaymentVoucherPic.name+' src="'+(url+item.repaymentVoucherPic.id)+'" onClick="showModal(this)" alt="" width="36" height="36"/><span class="sign factory_style" data-role="delete-file" onclick="javascript:remove_img(this)">&times;</span></div><div class="repay_div"><div class="upfilebox"><input type="file" disabled="disabled" id="repayment'+i+'" name="repayment'+i+'" class="repayment_voucher"><label class="lable lable_repayment"><img src="'+contextPath+'/imgs/validate/download.png"></label></div><div class="repay-view"></div></div></td>';
              	  h+='<td><div class="repay-view"><img class="img" data-name='+item.receiptVoucherPic.name+' src="'+(url+item.receiptVoucherPic.id)+'" onClick="showModal(this)" alt="" width="36" height="36"/><span class="sign" data-role="delete-file" onclick="javascript:remove_img(this)">&times;</span><div class="repay_div"></div><div class="upfilebox"><input type="file" disabled="disabled" id="receipt'+i+'" name="receipt'+i+'" class="receipt_voucher"><label class="lable lable_receipt"><img src="'+contextPath+'/imgs/validate/download.png"></label></div><div class="repay-view"></div></div></td>';
    		  }else if(item.repaymentVoucherPic!==null && item.receiptVoucherPic===null){
    			  h+='<td><div class="repay-view"><img class="img" data-name='+item.repaymentVoucherPic.name+' src="'+(url+item.repaymentVoucherPic.id)+'" onClick="showModal(this)" alt="" width="36" height="36"/><span class="sign factory_style" data-role="delete-file" onclick="javascript:remove_img(this)">&times;</span></div><div class="repay_div"><div class="upfilebox"><input type="file" disabled="disabled" id="repayment'+i+'" name="repayment'+i+'" class="repayment_voucher"><label class="lable lable_repayment"><img src="'+contextPath+'/imgs/validate/download.png"></label></div><div class="repay-view"></div></div></td>';
              	  h+='<td><div class="repay_div"><div class="upfilebox"><input type="file" disabled="disabled" id="receipt'+i+'" name="receipt'+i+'" class="receipt_voucher"><label class="lable"><img src="'+contextPath+'/imgs/validate/download.png"></label></div><div class="repay-view"></div></div></td>';
    		  }else if(item.repaymentVoucherPic===null && item.receiptVoucherPic!==null){
    			  h+='<td><div class="repay_div"><div class="upfilebox"><input type="file" disabled="disabled" id="repayment'+i+'" name="repayment'+i+'" class="repayment_voucher"><label class="lable"><img src="'+contextPath+'/imgs/validate/download.png"></label></div><div class="repay-view"></div></div></td>';
    			  h+='<td><div class="repay-view"><img class="img" data-name='+item.receiptVoucherPic.name+' src="'+(url+item.receiptVoucherPic.id)+'" onClick="showModal(this)" alt="" width="36" height="36"/><span class="sign" data-role="delete-file" onclick="javascript:remove_img(this)">&times;</span></div><div class="repay_div"><div class="upfilebox"><input type="file" disabled="disabled" id="receipt'+i+'" name="receipt'+i+'" class="receipt_voucher"><label class="lable lable_receipt"><img src="'+contextPath+'/imgs/validate/download.png"></label></div><div class="repay-view"></div></div></td>';
    		  }else{
    			  h+='<td><div class="repay_div"><div class="upfilebox"><input type="file" disabled="disabled" id="repayment'+i+'" name="repayment'+i+'" class="repayment_voucher"><label class="lable"><img src="'+contextPath+'/imgs/validate/download.png"></label></div><div class="repay-view"></div></div></td>';
              	  h+='<td><div class="repay_div"><div class="upfilebox"><input type="file" disabled="disabled" id="receipt'+i+'" name="receipt'+i+'" class="receipt_voucher"><label class="lable"><img src="'+contextPath+'/imgs/validate/download.png"></label></div><div class="repay-view"></div></div></td>';
    		  }
    		  if(item.repaymentStatus!==0){
    			  h+='<td class="alreadyOperate btn_operation hide-status">已操作</td>'
    		  }else{
    			  h+='<td class="btn_operation hide-status"><input type="button" class="btn normal text-left" disabled="disabled" value="正常"><input type="button" class="btn Interest text-left" disabled="disabled" value="欠息"><input type="button" class="btn overdue text-left" disabled="disabled" value="逾期"></td>'
    		  }
    	  }else if(status===1){//启用
    		  //alert(777)
			  h+='<td><input class="form-control repay_date" type="text" disabled="disabled" value="'+item.replaymentDate+'" data_date></td>';
	          h+='<td><input class="form-control repay_money" data-role="whale-money" type="text" disabled="disabled" value="'+renderNum(item.repaymentAmount)+'"></td>';
	          if(item.repaymentStatus===0){
    			  h+='<td data-repaystatus="'+item.repaymentStatus+'" class="data-state text-left">-</td>';
    		  }else if(item.repaymentStatus===1){
    			  h+='<td data-repaystatus="'+item.repaymentStatus+'" class="data-state text-left">正常</td>';
    		  }else if(item.repaymentStatus===2){
    			  h+='<td data-repaystatus="'+item.repaymentStatus+'" class="data-state text-left">欠息</td>';
    		  }else if(item.repaymentStatus===3){
    			  h+='<td data-repaystatus="'+item.repaymentStatus+'" class="data-state text-left">逾期</td>';
    		  }
	          if(item.repaymentVoucherPic!==null && item.receiptVoucherPic!==null){
    			  h+='<td><div class="repay-view"><img class="img" data-name='+item.repaymentVoucherPic.name+' src="'+(url+item.repaymentVoucherPic.id)+'" onClick="showModal(this)" alt="" width="36" height="36"/><span class="sign factory_style" data-role="delete-file" onclick="javascript:remove_img(this)">&times;</span></div><div class="repay_div"><div class="upfilebox"><input type="file" disabled="disabled" id="repayment'+i+'" name="repayment'+i+'" class="repayment_voucher"><label class="lable lable_repayment"><img src="'+contextPath+'/imgs/validate/download.png"></label></div><div class="repay-view"></div></div></td>';
              	  h+='<td><div class="repay-view"><img class="img" data-name='+item.receiptVoucherPic.name+' src="'+(url+item.receiptVoucherPic.id)+'" onClick="showModal(this)" alt="" width="36" height="36"/><span class="sign" data-role="delete-file" onclick="javascript:remove_img(this)">&times;</span></div><div class="repay_div"><div class="upfilebox"><input type="file" disabled="disabled" id="receipt'+i+'" name="receipt'+i+'" class="receipt_voucher"><label class="lable lable_receipt"><img src="'+contextPath+'/imgs/validate/download.png"></label></div><div class="repay-view"></div></div></td>';
    		  }else if(item.repaymentVoucherPic!==null && item.receiptVoucherPic===null){
    			  h+='<td><div class="repay-view"><img class="img" data-name='+item.repaymentVoucherPic.name+' src="'+(url+item.repaymentVoucherPic.id)+'" onClick="showModal(this)" alt="" width="36" height="36"/><span class="sign factory_style" data-role="delete-file" onclick="javascript:remove_img(this)">&times;</span></div><div class="repay_div"><div class="upfilebox"><input type="file" disabled="disabled" id="repayment'+i+'" name="repayment'+i+'" class="repayment_voucher"><label class="lable lable_repayment"><img src="'+contextPath+'/imgs/validate/download.png"></label></div><div class="repay-view"></div></div></td>';
              	  h+='<td><div class="repay_div"><div class="upfilebox"><input type="file" disabled="disabled" id="receipt'+i+'" name="receipt'+i+'" class="receipt_voucher"><label class="lable"><img src="'+contextPath+'/imgs/validate/download.png"></label></div><div class="repay-view"></div></div></td>';
    		  }else if(item.repaymentVoucherPic===null && item.receiptVoucherPic!==null){
    			  h+='<td><div class="repay_div"><div class="upfilebox"><input type="file" disabled="disabled" id="repayment'+i+'" name="repayment'+i+'" class="repayment_voucher"><label class="lable"><img src="'+contextPath+'/imgs/validate/download.png"></label></div><div class="repay-view"></div></div></td>';
    			  h+='<td><div class="repay-view"><img class="img" data-name='+item.receiptVoucherPic.name+' src="'+(url+item.receiptVoucherPic.id)+'" onClick="showModal(this)" alt="" width="36" height="36"/><span class="sign" data-role="delete-file" onclick="javascript:remove_img(this)">&times;</span></div><div class="repay_div"><div class="upfilebox"><input type="file" id="receipt'+i+'" disabled="disabled" name="receipt'+i+'" class="receipt_voucher"><label class="lable lable_receipt"><img src="'+contextPath+'/imgs/validate/download.png"></label></div><div class="repay-view"></div></div></td>';
    		  }else{
    			  h+='<td><div class="repay_div"><div class="upfilebox"><input type="file" disabled="disabled" id="repayment'+i+'" name="repayment'+i+'" class="repayment_voucher"><label class="lable"><img src="'+contextPath+'/imgs/validate/download.png"></label></div><div class="repay-view"></div></div></td>';
              	  h+='<td><div class="repay_div"><div class="upfilebox"><input type="file" disabled="disabled" id="receipt'+i+'" name="receipt'+i+'" class="receipt_voucher"><label class="lable"><img src="'+contextPath+'/imgs/validate/download.png"></label></div><div class="repay-view"></div></div></td>';
    		  }
	          if(item.repaymentStatus!==0){
    			  h+='<td class="alreadyOperate btn_operation hide-status">已操作</td>'
    		  }else{
    			  h+='<td class="btn_operation hide-status"><input type="button" class="btn normal text-left" value="正常"><input type="button" class="btn Interest text-left" value="欠息"><input type="button" class="btn overdue text-left" value="逾期"></td>'
    		  }
    	  }
    	  
      });
      
      //<a href="" download="true" class="blue" id="bussinessLicense">查看</a>
     /* if(isperiod_change===true){
    	  remove_list();
      }*/
      //console.debug(getPeriod(1))
      if(end!==undefined && end!==''){
    	  var t = new Date().getTime();
    	  
        for(var i=cur_len;i<end;i++){
          h+='<tr class="creatPeriod creat'+(i+1)+'"><td class="period">第'+getPeriod((i+1))+'期</td>';
          h+='<td><input class="form-control repay_date" data_date></td>';
          h+='<td><input id="repay-'+i+t+'" class="form-control repay_money" data-role="whale-money" value="" type="text"></td><td data-repaystatus="0" class="data-state text-left">-</td>';
          h+='<td><div class="repay_div"><div class="upfilebox"><input type="file" class="repayment_voucher" disabled="disabled"><label class="lable"><img src="'+contextPath+'/imgs/validate/download.png"></label></div><div class="repay-view"></div></div></td>'
          h+='<td><div class="repay_div"><div class="upfilebox"><input type="file" disabled="disabled" class="receipt_voucher"><label class="lable"><img src="'+contextPath+'/imgs/validate/download.png"></label></div><div class="repay-view"></div></div></td>'
          h+='<td class="btn_operation hide-status"><input type="button" class="btn normal text-left" disabled="disabled" value="正常"><input type="button" class="btn Interest text-left" disabled="disabled" value="欠息"><input type="button" class="btn overdue text-left" disabled="disabled" value="逾期"></td>'
          h+='</tr>';
        }    
      }
      $('#repaymentlist').html(h);
      
      if(management){
    	  $('.btn_operation').show();
      }else{
    	  $('.btn_operation').hide();
      }  
      
      getdate();
      repay_checkTime();
      repay_fieldShow();
      button_click();
      repay_outside();
      factory_show();
      repay_changeSave();
      disable_operation();
      repay_interest();
      controlColor();
      insterst_color();
      select_pic();
      $('#repay-'+i+t).whaleNumber({type:'money'});
      //repay_totalNum();
      //receiptlength();//上传收款凭证长度
    }
    
    //渲染详情
    var repaymentPlanId=null;
    var status=null;
    var periodchange_Num=null;
    var period_Num=null;
    var isperiod_change=false;
    var remove_filg=null;
    function getDetail(){
	    var param = window.sessionStorage["businessKey"];
	    HttpUtils.get_singe_repayment_echo_data(param,function(data){
	          console.debug('具体还款计划回显数据');
	          console.debug(data);
	          //回显示基本框信息
	          var base_info = data.data.repaymentBaseInfo;
	          $('#win_name').html(base_info.wineryCompanyName);
	          $('[name="lending_time"]').val(base_info.loanTime);
	          $('[name="lending_money"]').val(renderNum(base_info.loanAmoun));
	          $('[name="lending_unit"]').val(base_info.loanCompanyName);  
	          $('[name="repayment_way"]').val(base_info.repaymentMethod); 
	          $('[name="repayment_total"]').val(renderNum(base_info.repaymentTotalAmount)); 
	          $('[name="loan_term"]').val(base_info.financingPeriod); 
	          $('[name="loan_annum"').val(base_info.annualInterestRate);
	          $('[name="repayment_date"').val(base_info.repaymentFirstDate);
	          if(base_info.repaymentPeriod===null){
	        	  $('[name="repayment_period"').append('<option value="0">0</option>')
	          }else{
	        	  $('[name="repayment_period"').append('<option value="'+base_info.repaymentPeriod+'">'+base_info.repaymentPeriod+'</option>')
	          }
	          $('#repayment_num').html(base_info.financeBusinessKey);
	          $('[name="paid_total"').val(renderNum(base_info.alreadyRepaymentAmount));
	          var details = data.data.repaymentDetails;
	          repaymentPlanId=data.data.repaymentBaseInfo.repaymentPlanId;
	          console.debug(repaymentPlanId);
	          status=data.data.enableStatus;
	          console.debug(status)
	          //var start_len = details.length;
	          var start_len = base_info.alreadyRepaymentPeriod;
	          period_Num=$('#repayment_period').find('option:selected').text();
	          console.debug(period_Num);
	          console.debug(start_len)
	          showList(start_len);
	          renderList(details);
	          //picshow(details);//图片回显调用
	          checkStatus();
	         //创建option元素 
	         $('#repayment_period').on('change',function(){
	        	 isperiod_change=true;
	        	 var _this=this
	        	 periodchange_Num=$(this).val();
	     			console.debug(periodchange_Num)
	        	 HttpUtils.get_singe_repayment_echo_data(param,function(data){
	        		var end_len = $(_this).val();
	 	            console.debug($(_this).val())
	 	            status=data.data.enableStatus;
	 	            remove_filg=data.data.repaymentBaseInfo.alreadyRepaymentPeriod;
	        		var details_L = data.data.repaymentDetails;
	        		renderList(details_L,end_len);
	        		$('[data-role="whale-money"]').whaleNumber({type:'money'});
	        		var creat_list=$('.creatPeriod');
	        		console.debug(creat_list);
	        		for(var i=periodchange_Num;i<creat_list.length;i++){
	        			console.debug($(creat_list[i]));
	        			$(creat_list[i]).remove();
	        		}
	        		
	        		//creat(end_len,periodchange_Num)
	        		getdate();
	        		//picshow(details_L,end_len);//图片回显调用
	        	 })
	         })
	    })
    }
	getDetail();
    //日期函数
    function getdate(){
    	$('[data_date]').datetimepicker({format: 'yyyy/mm/dd',language:'zh-CN',startView:'month',todayHighlight:true,minView:'month',autoclose:true})
    	$('.sign').hide();
    }
    
    //控制操作颜色
    function controlColor(){
    	if($('.normal').attr('disabled')===undefined || $('.Interest').attr('disabled')===undefined || $('.overdue').attr('disabled')===undefined){
    		$('.normal').addClass('font_color');
    		$('.Interest').addClass('font_color');
    		$('.overdue').addClass('font_color');
    	}else{
    		$('.normal').addClass('font_disabled_color');
    		$('.Interest').addClass('font_disabled_color');
    		$('.overdue').addClass('font_disabled_color');
    	}
    	if(factory){
    		if(window.sessionStorage["status"]===0 || window.sessionStorage["listStatus"]==='0' || window.sessionStorage["status"]===1 || window.sessionStorage["listStatus"]==='1' || window.sessionStorage["listStatus"]==='null' || window.sessionStorage["status"]==='null'){
    			//$('.repayment_voucher').removeAttr('disabled');
    			var repayment_img=$('.repayment_voucher').parent().parent().parent().find('.img')
				console.debug(repayment_img)
	    		for(var i=0;i<repayment_img.length;i++){
	    			console.debug($(repayment_img[i]).parent().parent().find('.repayment_voucher'))
	    			$(repayment_img[i]).parent().parent().find('.repayment_voucher').attr('disabled','disabled');
	    		}
    		}
    	}
    	if(!management){
    		$('.receipt_voucher').attr('disabled','disabled');
    	}else{
    		$('.repayment_voucher').attr('disabled','disabled');
    		var receipt_img=$('.receipt_voucher').parent().parent().parent().find('.img')
			console.debug(receipt_img)
    		for(var i=0;i<receipt_img.length;i++){
    			//alert(111)
    			$(receipt_img[i]).parent().parent().find('.receipt_voucher').attr('disabled','disabled');
    		}
    	}
    }
    
    //期数转化
    var num = ["一","二","三","四","五","六","七","八","九","十"];
    
    function getPeriod(i){
  	  if(i>99 || i<1){
  		  throw new Error("请输入有效范围内数字")
  	  }
  	  var m = 0;
  	  var n = 0;
  	  var a = [];
  	  var str = '';
  	  do{
  		  n = i % 10;
  		  a.unshift(n);
      	  m = i / 10;
      	  i = Math.floor(m);
      	  if(i<10&&i!=0){
      		  a.unshift(i);
      	  }
  	  }while(i>10);
  	  for(var i=0;i<a.length;i++){
  		  if(a.length==1){
  			  str += num[a[i]-1]
  		  }
  		  if(a.length==2&&(i!=0||a[0]!=1)&&a[i]!=0){
  			  str += num[a[i]-1]
  		  }
  		  if(a.length==2&&i==0){
  			  str+=num[9];
  		  }
  	  }
  	  return str;
    }
    
    //页面初次加载字段显示
    function checkStatus(){
    	//var repay_status=window.sessionStorage["repay_status"];
    	console.debug(status)
    	if(management){
    		if(status===0){
        		$('.start_plan').val('启用还款计划');
        		$('#repayment_period').removeAttr('disabled');
        		$('#repayment_total').removeAttr('disabled');
        		$('#repayment_date').removeAttr('disabled');
        	}else if(status===2){
        		$('.start_plan').val('启用还款计划');
        		$('#repayment_period').removeAttr('disabled');
        		$('#repayment_total').removeAttr('disabled');
        		$('#repayment_date').removeAttr('disabled');
        	}else{
        		$('.start_plan').val('停用还款计划');
        		$('#repayment_period').attr('disabled','disabled');
        		$('#repayment_total').attr('disabled','disabled');
        		$('#repayment_date').attr('disabled','disabled');
        		$('#paid_total').removeAttr('disabled');
        	}
    	}	
    }
    
    //上传按钮切换
    function select_pic(){
    	if(management){
    		if(status===2 || status===0){
    			$('.receipt_voucher').attr('disabled','disabled')
        	}else if(status===1){
        		var pic_url=contextPath+'/imgs/validate/download_b.png'
        		var receipt_picload=$('.receipt_voucher');
        		for(var i=0;i<receipt_picload.length;i++){
        			$(receipt_picload[i]).parent().parent().parent().find('.lable img').attr('src',pic_url)
        		}
    			
        	}
    		var repay_dateTime=$('.receipt_voucher');
    		var dis_pic_url=contextPath+'/imgs/validate/download.png'
    		for(i=0;i<picload.length;i++){
        		if(picload[i]===false){
        			$(repay_dateTime[i]).parent().parent().find(".receipt_voucher").attr('disabled','disabled');
        			$(repay_dateTime[i]).parent().find('.lable img').attr('src',dis_pic_url);
        			$(repay_dateTime[i]).parent().parent().parent().parent().find('.normal').attr('disabled','disabled')
        			$(repay_dateTime[i]).parent().parent().parent().parent().find('.Interest').attr('disabled','disabled')
        			$(repay_dateTime[i]).parent().parent().parent().parent().find('.overdue').attr('disabled','disabled')
        			$(repay_dateTime[i]).parent().parent().parent().parent().find('.normal').addClass('font_disabled_color');
        			$(repay_dateTime[i]).parent().parent().parent().parent().find('.Interest').addClass('font_disabled_color');
        			$(repay_dateTime[i]).parent().parent().parent().parent().find('.overdue').addClass('font_disabled_color');
        		}
        	}
    		
    	}
    	if(factory){
    		if(status===1){
        		var pic_url=contextPath+'/imgs/validate/download_b.png'
        		var repayment_picload=$('.repayment_voucher');
        		for(var i=0;i<repayment_picload.length;i++){
        			$(repayment_picload[i]).parent().parent().parent().find('.lable img').attr('src',pic_url)
        		}
    			
        	}
    		var dis_pic_url=contextPath+'/imgs/validate/download.png'
    		var repayment_dateTime=$('.repayment_voucher');
    		for(i=0;i<picload.length;i++){
        		if(picload[i] === false){
        			$(repayment_dateTime[i]).parent().parent().find(".receipt_voucher").attr('disabled','disabled');
        			$(repayment_dateTime[i]).parent().find('.lable img').attr('src',dis_pic_url)
        		}
        	}
    	}
    }
    //判断初次加载时启用和禁用
    function btnColor(){
    	if(management){
    		if($('.start_plan').val()==='启用还款计划'){
        		$('.select2-selection').addClass('select2-selection_background');
        		$('.start_plan').addClass('start_back_color');
        		$('.sign').hide();
        	}else if($('.start_plan').val()==='停用还款计划'){
        		$('.select2-selection').removeClass('select2-selection_background');
        		$('.start_plan').addClass('disabled_back_color');
        		var show_list = $('.receipt_voucher').parent().parent().parent().find('.sign');
        		$(show_list).each(function(){
        			$(this).show();
        		})
        	}
    	}
    }
    btnColor();
    
    //动态加载可显示字段
    function repay_fieldShow(){
    	//$('.btn-save').attr('enableid',window.sessionStorage['enableSave'])
    	console.debug(status)
    	var repay_dateTime=$('.receipt_voucher');
    	if(status===1){
    		for(i=0;i<picload.length;i++){
        		if(picload[i]===true){
        			console.debug(i)
        			$(repay_dateTime[i]).parent().parent().find(".receipt_voucher").removeAttr('disabled');
        			$(repay_dateTime[i]).parent().parent().find('.normal').removeAttr('disabled','disabled');
        			$(repay_dateTime[i]).parent().parent().find('.Interest').removeAttr('disabled','disabled');
        			$(repay_dateTime[i]).parent().parent().find('.overdue').removeAttr('disabled','disabled');
        		}
        	}
    		//$('.receipt_voucher').removeAttr('disabled');
    	}
    }
    
    //对应modal的显示
    $('.start_plan').on('click',function(){
    	var planData=$('.start_plan').val()
    	//console.debug()
    	//启用时modal判断
    	var repayTotal_date=$('.repay_date');
    	var repayTotal_money=$('.repay_money');
    	var repayment_total = $('#repayment_total').val();
    	var repayment_date = $('#repayment_date').val();
    	var paid_total = $('#paid_total').val();
    	if(planData==='启用还款计划'){
    		if($('#repaymentTotal-error').length <= 0 && $('#repaymentDate-error').length <= 0){
    			if(repayment_total==='' && repayment_date===''){
        			$('#repayment_total').parent().append('<label id="repaymentTotal-error" class="error" for="repayment_total">还款总额不能为空</label>');
    	    		$('#repayment_date').parent().append('<label id="repaymentDate-error" class="error" for="repayment_date">首次还款日期不能为空</label>');
    	    		return;
        		}
    		}
    		if($('#repaymentTotal-error').length <= 0){
    			if(repayment_total===''){
    	    		$('#repayment_total').parent().append('<label id="repaymentTotal-error" class="error" for="repayment_total">还款总额不能为空</label>');
    	    		return;
    	    	}
    		}
    		if($('#repaymentDate-error').length <= 0){
    			if(repayment_date===''){
    	    		$('#repayment_date').parent().append('<label id="repaymentDate-error" class="error" for="repayment_date">首次还款日期不能为空</label>');
    	    		return;
    	    	}
    		}
	    	if($('#repaymentTotal-error').length === 1 || $('#repaymentDate-error').length === 1){
	    		return;
	    	}
	    	
    	}
    	if(planData==='停用还款计划'){
    		if(paid_total===''){
    			$('#paid_total').parent().append('<label id="total-error" class="error" for="paid_total">已还总额不能为空</label>');
    			return
    		}
    		$('#total-error').detach();
    	}
    	for(var i=0;i<repayTotal_date.length;i++){
    		if($(repayTotal_date[i]).val()===''){
    			$('.save_flag').val('unsave');
    		}	
    	}
    	for(var i=0;i<repayTotal_money.length;i++){
    		if($(repayTotal_money[i]).val()===''){
    			$('.save_flag').val('unsave');
    		}	
    	}
    	if(periodchange_Num!==null){
    		if(period_Num!==periodchange_Num || isEnablechange===true){
    			$('.save_flag').val('unsave');
    		}
    	}
    	if(periodchange_Num===null && isEnablechange===true){
    		$('.save_flag').val('unsave');
    	}
    	//停用时modal判断
    	if(isDisablechange===true){
    		$('.dis_saveflag').val('enable_save');
    	}
    	//启用禁用是具体显示对应modal
    	if(planData==='启用还款计划' && $('.save_flag').val()==='save'){
    		$('#start').modal('show');
    	}else if(planData==='启用还款计划' && $('.save_flag').val()==='unsave'){
    		$('#savedata').modal('show');
    	};
    	if(planData==='停用还款计划' && $('.dis_saveflag').val()==='enable_save'){
    		$('#savedata').modal('show');
    	}else if(planData==='停用还款计划' && $('.dis_saveflag').val()==='dis_Save'){
    		$('#forbidden').modal('show');
    	}
    	
    });
    
    //启用计划
    $('.btn-start').on('click',function(){
    		var repay_dateTime=$('.receipt_voucher');
	    	var param={
	    		repaymentPlanId:repaymentPlanId,
	    		repaymentPlanEnableStatus:1	
	    		}
	    	console.debug(param)
	    	HttpUtils.get_repayStatus_data(param,function(data){
	    		if(data.statusCode==='200'){
	    			$('.sign').show();
	    			$('.factory_style').hide();
	    			isEnablechange=false;
	    			$('#start').modal('hide');
	            	$('.start_plan').val('停用还款计划');
	            	var pic_url = contextPath+'/imgs/validate/download_b.png'
	            	var dis_pic_url = contextPath+'/imgs/validate/download.png'
	        		var receipt_picload=$('.receipt_voucher');
	        		for(var i=0;i<receipt_picload.length;i++){
	        			$(receipt_picload[i]).parent().parent().parent().find('.lable img').attr('src',pic_url)
	        		}
	            	$('.start_plan').addClass('disabled_back_color');
	            	$('.start_plan').removeClass('start_back_color');
	            	$('.repay_date').attr('disabled','disabled');
	            	$('.repay_money').attr('disabled','disabled');
	            	$('#repayment_period').attr('disabled','disabled');
	        		$('#repayment_total').attr('disabled','disabled');
	        		$('#repayment_date').attr('disabled','disabled');
	        		$('#paid_total').removeAttr('disabled');
	        		$('.receipt_voucher').removeAttr('disabled');
	        		$('.Interest').removeAttr('disabled');
	        		$('.normal').removeAttr('disabled');
	        		$('.overdue').removeAttr('disabled');
	        		$('.last_Interest').removeAttr('disabled');
	        		$('.last_normal').removeAttr('disabled');
	        		$('.last_overdue').removeAttr('disabled');
	        		$('.normal').addClass('font_color');
	        		$('.Interest').addClass('font_color');
	        		$('.overdue').addClass('font_color');
	        		$('.last_normal').addClass('font_color');
	        		$('.last_Interest').addClass('font_color');
	        		$('.last_overdue').addClass('font_color');
	        		$('.normal').removeClass('font_disabled_color');
	        		$('.Interest').removeClass('font_disabled_color');
	        		$('.overdue').removeClass('font_disabled_color');
	        		$('.last_normal').removeClass('font_disabled_color');
	        		$('.last_Interest').removeClass('font_disabled_color');
	        		$('.last_overdue').removeClass('font_disabled_color');
	        		$('.select2-selection').removeClass('select2-selection_background');
	        		console.debug('加载时表格的长度')
	        		console.debug(picload.length)
	        		console.debug('得到的布尔值的长度')
	        		console.debug(picload.length);
	        		for(i=0;i<picload.length;i++){
	            		if(picload[i]===false){
	            			$(repay_dateTime[i]).parent().parent().find(".receipt_voucher").attr('disabled','disabled');
	            			$(repay_dateTime[i]).parent().find('.lable img').attr('src',dis_pic_url);
	            			$(repay_dateTime[i]).parent().parent().parent().parent().find('.normal').attr('disabled','disabled');
	            			$(repay_dateTime[i]).parent().parent().parent().parent().find('.normal').addClass('font_disabled_color');
	            			$(repay_dateTime[i]).parent().parent().parent().parent().find('.Interest').attr('disabled','disabled');
	            			$(repay_dateTime[i]).parent().parent().parent().parent().find('.Interest').addClass('font_disabled_color');
	            			$(repay_dateTime[i]).parent().parent().parent().parent().find('.overdue').attr('disabled','disabled');
	            			$(repay_dateTime[i]).parent().parent().parent().parent().find('.overdue').addClass('font_disabled_color');
	            		}
	            	}
	    		}
	    	})
    });
    
  //停用计划
    $('.btn-forbidden').on('click',function(){
    	var param={
    			repaymentPlanId:repaymentPlanId,
        		repaymentPlanEnableStatus:2	
        		}
    	HttpUtils.get_repayStatus_data(param,function(data){
    		if(data.statusCode==='200'){
    			$('.sign').hide();
    			$('#forbidden').modal('hide');
    	    	$('.start_plan').val('启用还款计划');
    	    	var pic_url=contextPath+'/imgs/validate/download.png'
        		var receipt_picload=$('.receipt_voucher');
        		for(var i=0;i<receipt_picload.length;i++){
        			$(receipt_picload[i]).parent().parent().parent().find('.lable img').attr('src',pic_url)
        		}
    	    	$('.start_plan').addClass('start_back_color');
    	    	$('.start_plan').removeClass('disabled_back_color');
    	    	$('#repayment_total').removeAttr('disabled');
    	    	$('#repayment_date').removeAttr('disabled');
    	    	$('.Interest').attr('disabled','disabled');
        		$('.normal').attr('disabled','disabled');
        		$('.overdue').attr('disabled','disabled');
        		$('.last_Interest').attr('disabled','disabled');
        		$('.last_normal').attr('disabled','disabled');
        		$('.last_overdue').attr('disabled','disabled');
        		$('.normal').addClass('font_disabled_color');
        		$('.Interest').addClass('font_disabled_color');
        		$('.overdue').addClass('font_disabled_color');
        		$('.last_normal').addClass('font_disabled_color');
        		$('.last_Interest').addClass('font_disabled_color');
        		$('.last_overdue').addClass('font_disabled_color');
        		$('.normal').removeClass('font_color');
        		$('.Interest').removeClass('font_color');
        		$('.overdue').removeClass('font_color');
        		$('.last_normal').removeClass('font_color');
        		$('.last_Interest').removeClass('font_color');
        		$('.last_overdue').removeClass('font_color');
        		$('.receipt_voucher').attr('disabled','disabled');
    	    	$('#repayment_period').removeAttr('disabled');
    	    	$('#paid_total').attr('disabled','disabled');
    	    	$('.select2-selection').addClass('select2-selection_background');
    	    	var data_stateList=$('.data-state');
    	    	console.debug(data_stateList)
    	    	for(var i=0;i<data_stateList.length;i++){
    	    		if($(data_stateList[i]).attr('data-repaystatus')==='0'){
    	    			$(data_stateList[i]).parent().find('.repay_date').removeAttr('disabled');
    	    			$(data_stateList[i]).parent().find('.repay_money').removeAttr('disabled');
        	    	};
    	    	}
    		}
    	})
    });
    
    
    //判断启用是数据是否被保存
    function repay_changeSave(){
    	$('.receipt_voucher').removeAttr('disabled');
    	console.debug(period_Num);
    	console.debug(periodchange_Num);
    	var repay_dateInput=$('.repay_date');
    	console.debug(repay_dateInput);
    	var repay_moneyInput=$('.repay_money');
    	var receipt_voucherInput=$('.receipt_voucher');
    	var rapay_sign = $('.sign');    	
    	for(var i=0;i<repay_dateInput.length;i++){
    		$(repay_dateInput[i]).datetimepicker().on('changeDate', function(ev){
    			isEnablechange=true;
    	    });
    		$(repay_dateInput[i]).bind('input propertychange',function(){
    			isEnablechange=true;
    	    });
    	}
    	for(var i=0;i<repay_moneyInput.length;i++){
    		$(repay_moneyInput[i]).bind('input propertychange',function(){
    			isEnablechange=true;
    	    })
    	}
    	$('#repayment_total').bind('input propertychange',function(){
    		isEnablechange=true;
	    })
	    $('#repayment_date').datetimepicker().on('changeDate', function(ev){
			isEnablechange=true;
	    });
    	$('#repayment_date').bind('input propertychange',function(){
			isEnablechange=true;
	    })
	    for(var i=0;i<rapay_sign.length;i++){
	    	$(rapay_sign[i]).on('click',function(ev){
	    		$(this).attr('data-change','modify')
	    		isDisablechange=true;
	    	})
	    }
    	for(var i=0;i<receipt_voucherInput.length;i++){
    		$(receipt_voucherInput[i]).change(function(){
        			isDisablechange=true;
    	    })
    	}
    	$('#paid_total').bind('input propertychange',function(){
    		isDisablechange=true;
	    })
    }
    
    
    
    //保存数据提交
    function managementSave(){
    	if(management){
		    $('.btn-save').on('click',function(){
		    	if($(".start_plan").val()==='停用还款计划'){
		    		//alert(1111)
		    		var paid_total=$('#paid_total').val();
		    		var receipt_voucherList=$('.receipt_voucher');
		    		var param = {};
		    		param.files=[];
		    		param.fileNames=[];
		    		var repaymentDetailId=[];
		    		for(var i=0;i<receipt_voucherList.length;i++){
		    			if($(receipt_voucherList[i]).val()!==''){
		    				repaymentDetailId.push($(receipt_voucherList[i]).parent().parent().parent().parent().attr('data-id'));
		    				param.files.push($(receipt_voucherList[i]).attr('id'));
		    				param.fileNames.push($(receipt_voucherList[i]).attr('name'));
		    			}
		    		}
		    		param.inputData={
        					repaymentDetailId:repaymentDetailId,
        					alreadyRepaymentAmount:removeSopt(paid_total),
        					repaymentPlanId:repaymentPlanId
                		}	
		    		console.debug(param);
		    		if(paid_total===''){
		    			$('#paid_total').parent().append('<label id="total-error" class="error" for="paid_total">已还总额不能为空</label>');
		    			return
		    		}
		    		$('#total-error').detach();
		    		var data_sign = $('.sign');
		    		for(var i=0;i<data_sign.length;i++){
		    			if($(data_sign[i]).attr('data-change') ==='modify'){
			    			$('#saveVoucher').modal('show');
			    			return
			    		}
		    		}
		    		if(isDisablechange === false){
		    			window.location.href=contextPath+'/repayment/repayment_page';
		    		}
		    		HttpUtils.get_uploadPic_data(param,function(data){
		    			if(data.statusCode==='200'){
		    				isDisablechange=false;
		    				$('.dis_saveflag').val('dis_Save');
		    				$('#save_detial_data').modal('show');
		    				//window.location.href=contextPath+'/repayment/repayment_page';
		    			}
		    		})
		    	}else if($(".start_plan").val()==='启用还款计划'){
		    		//window.sessionStorage['enableSave']='enableSave';
		    		//$('.btn-save').attr('data-enableid','enableSave')
			    	var periodList=$('[data-repaystatus="0"]').parent().parent().find('.creatPeriod');
			    	console.debug(periodList)
			    	//var len=$('.creatPeriod').length;
			        var peldges = [];
			    	$.each(periodList,function(i,item){
			    		if($(item).find('.repay_date').attr('disabled')!=='disabled' && $(item).find('.repay_money').attr('disabled')!=='disabled'){
			    			var peldge = {};
				    		peldge["repaymentPeriodId"] = $(item).find('.period').text();
				    		peldge["replaymentDate"] = $(item).find('.repay_date').val();
				    		peldge["repaymentAmount"] = removeSopt($(item).find('.repay_money').val());
				    		peldges.push(peldge);
			    		}
			    		
			    	});
			    	console.debug(peldges);
			    	var repayment_period=$('#repayment_period').find('option:selected').text();
			    	var repayment_total=$('#repayment_total').val();
			    	var repayment_date=$('#repayment_date').val();
			    	console.debug(repayment_date)
			    	console.debug(repayment_period)
			    	console.debug(repayment_total)
			    	var param={
			    		repaymentPlanId:repaymentPlanId,
			    		repaymentDetails:peldges,
			    		repaymentTotalAmount:removeSopt(repayment_total),
			    		repaymentFirstDate:repayment_date,
			    		repaymentPeriod:repayment_period
			    	}
			    	console.debug(param)
			    	if(repayment_total==='' && repayment_date===''){
			    		$('#repayment_total').parent().append('<label id="repaymentTotal-error" class="error" for="repayment_total">还款总额不能为空</label>');
			    		$('#repayment_date').parent().append('<label id="repaymentDate-error" class="error" for="repayment_date">首次还款日期不能为空</label>');
			    		return;
			    	}
			    	if(repayment_total===''){
			    		$('#repayment_total').parent().append('<label id="repaymentTotal-error" class="error" for="repayment_total">还款总额不能为空</label>');
			    		return;
			    	}
			    	if(repayment_date===''){
			    		$('#repayment_date').parent().append('<label id="repaymentDate-error" class="error" for="repayment_date">首次还款日期不能为空</label>');
			    		return;
			    	}
			    	$('#repaymentTotal-error').detach();
			    	$('#repaymentDate-error').detach();
			    	HttpUtils.get_repaySave_data(param,function(data){
			    		if(data.statusCode==='200'){
			    			window.location.href=contextPath+'/repayment/repayment_page';
			    		}
			    	})
		    	}	
		    })
    	}
    }
    managementSave();
    
    //字段验证
    function check_text(){
    	$('#paid_total').bind('input propertychange',function(){
    		$('#total-error').detach();
    	})
    	$('#repayment_total').bind('input propertychange',function(){
    		$('#repaymentTotal-error').detach();
    	})
    	$('#repayment_date').datetimepicker().on('changeDate', function(ev){
    		$('#repaymentDate-error').detach();
    	})
    }
    check_text()
    
    
    
    //根据还款状态按钮形式
    function button_click(){
    	$('#repaymentlist tr td').find('.normal').on('click',function(){
    		var _this=this;
    		var creatnormal_list=$('.creatPeriod');
    		var repaymentDetailId=$(_this).parent().parent().attr('data-id');
			var param={
				repaymentDetailId:repaymentDetailId,
				repaymentDetailStatus:1
			}
			console.debug(param)
			//console.debug($(_this).parent().find('.Interest'))
			$('#normal_operate').modal('show');
			$('.btn-normalSave').on('click',function(){
				HttpUtils.get_modifyStatus_data(param,function(data){
	    			if(data.statusCode==='200'){
	    				var creatnormal_Index=$(_this).parent().parent().index();
	    				$('#normal_operate').modal('hide');
	    				$(_this).parent().parent().find('.data-state').text('正常');
	    				$(_this).parent().find('.normal').addClass('hide');
	            		$(_this).parent().find('.Interest').addClass('hide');
	            		$(_this).parent().find('.overdue').addClass('hide');
	            		$(_this).parent().html('已操作');
	    				console.debug($(_this).parent().parent().find('.data-state'));
	    				$.each(creatnormal_list,function(i,item){
			    			if(i<creatnormal_Index){
			    				if($(item).find('.Interest')){
			    					$(item).find('.data-state').html('正常');
			    					$(item).find('.normal').addClass('hide');
				    				$(item).find('.Interest').addClass('hide');
				    				$(item).find('.overdue').addClass('hide');
				    				$(item).find('.btn_operation').html('已操作');
			    				}
			    			}
			    		})
	    			}
	    		})
			})
    	});
    	$('.Interest').on('click',function(){
    		var _this=this;
    		var creatInterest_list=$('.creatPeriod');
    		var repaymentDetailId=$(_this).parent().parent().attr('data-id');
			var param={
				repaymentDetailId:repaymentDetailId,
				repaymentDetailStatus:2
			}
			console.debug(param);
			if($(_this).parent().parent().index() === $('.creatPeriod').length-1){
				$('#last_interest_operate').modal('show');
			}else{
				$('#interest_operate').modal('show');
			}
			
			$('.btn-interestSave').on('click',function(){
				HttpUtils.get_modifyStatus_data(param,function(data){
	    			if(data.statusCode==='200'){
	    				var creatInterest_Index=$(_this).parent().parent().index();
	    				if(creatInterest_Index === $('.creatPeriod').length-1){
	    					$('#last_interest_operate').modal('hide');
	    				}else{
	    					$('#interest_operate').modal('hide');
	    				}
	    				$(_this).parent().parent().find('.data-state').html('欠息');
	            		$.each(creatInterest_list,function(i,item){
			    			if(i<creatInterest_Index){
			    				if($(item).find('.Interest')){
			    					$(item).find('.data-state').html('正常');
			    					$(item).find('.normal').addClass('hide');
				    				$(item).find('.Interest').addClass('hide');
				    				$(item).find('.overdue').addClass('hide');
				    				$(item).find('.btn_operation').html('已操作');
			    				}
			    			}
			    		})
	    			}
	    		})
			})
    	});
    	$('.overdue').on('click',function(){
    		var _this=this
    		var creatPeriod_list=$('.creatPeriod');
    		var repaymentDetailId=$(_this).parent().parent().attr('data-id');
			var param={
				repaymentDetailId:repaymentDetailId,
				repaymentDetailStatus:3
			}
			console.debug(param);
			$('#overdue_operate').modal('show');
			$('.btn-overdueSave').on('click',function(){
				HttpUtils.get_modifyStatus_data(param,function(data){
	    			if(data.statusCode==='200'){
	    				$('#overdue_operate').modal('hide');
	    				var creatIndex=$(_this).parent().parent().index();
	    				$(_this).parent().parent().find('.data-state').html("逾期");
	    				$(_this).parent().find('.normal').addClass('hide');
	            		$(_this).parent().find('.Interest').addClass('hide');
	            		$(_this).parent().find('.overdue').addClass('hide');
	            		$(_this).parent().html('已操作');
	            		console.debug(creatIndex);
			    		$.each(creatPeriod_list,function(i,item){
			    			if(i>creatIndex){
			    				$(item).find('.receipt_voucher').attr('disabled','disabled');
			    				$(item).find('.normal').attr('disabled','disabled');
			    				$(item).find('.Interest').attr('disabled','disabled');
			    				$(item).find('.overdue').attr('disabled','disabled');
			    			}else if(i<creatIndex){
			    				if($(item).find('.overdue')){
			    					$(item).find('.data-state').html('正常');
			    					$(item).find('.normal').addClass('hide');
				    				$(item).find('.Interest').addClass('hide');
				    				$(item).find('.overdue').addClass('hide');
				    				$(item).find('.btn_operation').html('已操作');
			    				}
			    			}
			    		})
	    			}
	    		})
			})
    	});
    }
    
    function dateCompare(date1,date2){
    	return parseInt(date2-date1) > 0;
    }
    //图片上传是否开启
    
    function repay_checkTime(){
    	var now = new Date();
    	var repay_dateTime=$('.repay_date');
    	var state_date=[];
    	var dateTime = [];
    	for(var i=0;i<repay_dateTime.length;i++){
    		//var time=$(repay_dateTime[0]).val();
    		//console.debug(time)
    		state_date.push(new Date(Date.parse($(repay_dateTime[i]).val())));
    		//end_date.push(new Date($(repay_dateTime[i+1]).val()));
    	}
    	var result = new Array(state_date.length);
    	for(var i=0;i<state_date.length;i++){
    		result[i] = dateCompare(state_date[i] , now);
    	}
    	console.debug(result)
    	picload=result
    }
    
    //end_str = ("2014-01-01 10:15:00").replace(/-/g,"/");
	//var end_date = new Date(end_str);
	//var sta_date = new Date(sta_str);  
	//var num = (end_date-sta_date)/(1000*3600*24);//求出两个时间的时间差，这个是天数  
	//var days = parseInt(Math.ceil(num));//转化为整天（小于零的话剧不用转了）
    
    
    //酒厂上传凭证
    function upload(){
    	if(factory){
    		$('.btn-save').on('click',function(){
    			var repayment_voucherList=$('.repayment_voucher')
        		var param = {};
        		param.files=[];
        		param.fileNames=[];
        		var repaymentDetailId=[];
        		for(var i=0;i<repayment_voucherList.length;i++){
        			if($(repayment_voucherList[i]).val()!==''){
        				repaymentDetailId.push($(repayment_voucherList[i]).parent().parent().parent().parent().attr('data-id'));
        				param.files.push($(repayment_voucherList[i]).attr('id'));
        				param.fileNames.push($(repayment_voucherList[i]).attr('name'));
        				param.inputData={
        					repaymentDetailId:repaymentDetailId	
                		}
        			}
        		}
        		console.debug(param.files)
        		var data_sign = $('.sign');
	    		for(var i=0;i<data_sign.length;i++){
	    			if($(data_sign[i]).attr('data-change') ==='modify'){
		    			$('#saveVoucher').modal('show');
		    			return
		    		}
	    		}
	    		if(param.files.length === 0 && param.fileNames.length === 0){
        			window.location.href=contextPath+'/repayment/repayment_page'
        		}
        		console.debug(param);
        		HttpUtils.get_repayPic_data(param,function(data){
	    			if(data.statusCode==='200'){
	    				window.location.href=contextPath+'/repayment/repayment_page'
	    			}
	    		})
    		})
    	}
    }
    upload();
    
    //逾期是上传和操作禁用
    function disable_operation(){
    	if(factory || management){
    		if(window.sessionStorage['status'] === '3' || window.sessionStorage['listStatus'] === '3'){
	    		var creatPeriodList=$('.creatPeriod');
	        	for(var i=0;i<creatPeriodList.length;i++){
	        		if($(creatPeriodList[i]).find('.data-state').attr('data-repaystatus')==='3'){
	        			var creat_index=$(creatPeriodList[i]).index();
	        		}
	        	}
	        	$.each(creatPeriodList,function(i,item){
	    			if(i>creat_index){
	    				$(item).find('.receipt_voucher').attr('disabled','disabled');
	    				$(item).find('.repayment_voucher').attr('disabled','disabled');
	    				$(item).find('.normal').attr('disabled','disabled');
	    				$(item).find('.Interest').attr('disabled','disabled');
	    				$(item).find('.overdue').attr('disabled','disabled');
	    			}else{
	    				$(item).find('.receipt_voucher').removeAttr('disabled');
	    				$(item).find('.repayment_voucher').removeAttr('disabled');
	    			}
	    		})
    		}	
    	}
    }
    
    //最后一期是否欠息
    function repay_interest(){
    	var creatPeriod_total=$('.creatPeriod');
    	for(var i=0;i<creatPeriod_total.length;i++){
    		if($(creatPeriod_total[i]).find('.data-state').attr('data-repaystatus')==='2'){
    			var createdflag=$(creatPeriod_total[i]).index();
    			console.debug(createdflag);
    		}
    	}
    	if(($('.creatPeriod').length-1)===createdflag){
    		$(creatPeriod_total[createdflag]).find('.alreadyOperate').html('');
    		$(creatPeriod_total[createdflag]).find('.alreadyOperate').append('<input type="button" class="btn last_normal" value="正常"><input type="button" class="btn last_Interest" value="欠息"><input type="button" class="btn last_overdue" value="逾期">');
    	}
    	$('.last_normal').on('click',function(){
    		var _this=this;
    		var repaymentDetailId=$(_this).parent().parent().attr('data-id');
			var param={
				repaymentDetailId:repaymentDetailId,
				repaymentDetailStatus:1
			}
			console.debug(param)
			//console.debug($(_this).parent().find('.Interest'))
			$('#normal_operate').modal('show');
			$('.data-normalSave').on('click',function(){
				HttpUtils.get_modifyStatus_data(param,function(data){
	    			if(data.statusCode==='200'){
	    				$('#normal_operate').modal('hide');
	    				$(_this).parent().parent().find('.data-state').text('正常');
	    				$(_this).parent().find('.normal').addClass('hide');
	            		$(_this).parent().find('.Interest').addClass('hide');
	            		$(_this).parent().find('.overdue').addClass('hide');
	            		$(_this).parent().html('已操作');
	    			}
	    		})
			})
    	})
    	$('.last_Interest').on('click',function(){
    		var _this=this;
    		var repaymentDetailId=$(_this).parent().parent().attr('data-id');
			var param={
				repaymentDetailId:repaymentDetailId,
				repaymentDetailStatus:2
			}
			console.debug(param)
			//console.debug($(_this).parent().find('.Interest'))
			$('#last_interest_operate').modal('show');
			$('.last_data-interestSave').on('click',function(){
				HttpUtils.get_modifyStatus_data(param,function(data){
	    			if(data.statusCode==='200'){
	    				$('#last_interest_operate').modal('hide');
	    				$(_this).parent().parent().find('.data-state').text('欠息');
	    				/*$(_this).parent().find('.normal').addClass('hide');
	            		$(_this).parent().find('.Interest').addClass('hide');
	            		$(_this).parent().find('.overdue').addClass('hide');
	            		$(_this).parent().html('已操作');*/
	    			}
	    		})
			})
    	})
    	$('.last_overdue').on('click',function(){
    		var _this=this;
    		var repaymentDetailId=$(_this).parent().parent().attr('data-id');
			var param={
				repaymentDetailId:repaymentDetailId,
				repaymentDetailStatus:3
			}
			console.debug(param)
			//console.debug($(_this).parent().find('.Interest'))
			$('#overdue_operate').modal('show');
			$('.data-overdueSave').on('click',function(){
				HttpUtils.get_modifyStatus_data(param,function(data){
	    			if(data.statusCode==='200'){
	    				$('#overdue_operate').modal('hide');
	    				$(_this).parent().parent().find('.data-state').text('欠息');
	    				$(_this).parent().find('.normal').addClass('hide');
	            		$(_this).parent().find('.Interest').addClass('hide');
	            		$(_this).parent().find('.overdue').addClass('hide');
	            		$(_this).parent().html('已操作');
	    			}
	    		})
			})
    	})
    	
    }
    
  //最后一次为欠息时计划里数据操作还可以操作，初次加载状态
    function insterst_color(){
    	if(status===1){
    		$('.last_Interest').removeAttr('disabled');
    		$('.last_normal').removeAttr('disabled');
    		$('.last_overdue').removeAttr('disabled');
    		$('.last_Interest').addClass('font_color');
    		$('.last_normal').addClass('font_color');
    		$('.last_overdue').addClass('font_color');
    		/*$('.Interest').removeAttr('disabled');
    		$('.normal').removeAttr('disabled');
    		$('.overdue').removeAttr('disabled');
    		$('.Interest').addClass('font_color');
    		$('.normal').addClass('font_color');
    		$('.overdue').addClass('font_color');*/
    		if(factory){
    			$('.repayment_voucher').parent().parent().parent().find('.sign').show();
    			$('.repayment_voucher').parent().parent().parent().find('.sign').addClass('factory_style');
    			$('.receipt_voucher').parent().parent().parent().find('.sign').hide();
    		}
    	}else if(status===2){
    		$('.last_Interest').attr('disabled','disabled');
    		$('.last_normal').attr('disabled','disabled');
    		$('.last_overdue').attr('disabled','disabled');
    		$('.last_Interest').addClass('font_disabled_color');
    		$('.last_normal').addClass('font_disabled_color');
    		$('.last_overdue').addClass('font_disabled_color');
    	}
    }

    //资方上传
	var trigger_file_input_dom = $(".receipt_voucher");
	trigger_file_input_dom.on('click',function(){
		var _this = this;
		if(typeof FileReader==='undefined'){ 
		    aaa.innerHTML = "抱歉，你的浏览器不支持 FileReader"; 
		    _this.setAttribute('disabled','disabled'); 
		}else{ 
		    _this.addEventListener('change',readFile,false);
		} 
	})
	
	//酒厂上传
	var trigger_file_inputFactor_dom = $(".repayment_voucher");
	trigger_file_inputFactor_dom.on('click',function(){
		var _this = this;
		if(typeof FileReader==='undefined'){ 
		    aaa.innerHTML = "抱歉，你的浏览器不支持 FileReader"; 
		    _this.setAttribute('disabled','disabled'); 
		}else{ 
		    _this.addEventListener('change',readFile,false);
		} 
	})
	
	//显示图片
	function readFile(){ 
		var _this=this
		console.log($(_this)[0].files[0])
	    var file = $(_this)[0].files[0];
	    var fileName=file.name;
	    var fileSize = (file.size/1024/1024);
	    console.log(fileSize);
	    var fileExt = fileName.substr(fileName.lastIndexOf(".")).toLowerCase();//文件后缀名
	    console.log(fileExt);
		var fileExp = /.jpg|.jpeg|.gif|.bmp|.pdf|.png/;
		fileExp.test(fileExt)?'':alert('请上传图片！');
		if(fileExp.test(fileExt) == false){
			$(_this).val('');
			return
		}
		if(fileSize > 10){
			alert('图片大小已超过限制！');
			return
		}
	    var reader = new FileReader();
	    reader.readAsDataURL(file);
	    console.debug(reader)
	    reader.onload = function(e){
	    	console.debug($(_this).parent().parent().find('.repay-view'))
	    	if(fileExt==='.jpg' || fileExt==='.jpeg' || fileExt==='.gif' || fileExt==='.bmp' || fileExt==='.pdf' || fileExt==='.png'){
	    		$(_this).parent().parent().find('.repay-view').html('<img class="img" data-name='+fileName+' src="'+this.result+'" onClick="showModal(this)" alt="" width="36" height="36"/><span class="sign" data-role="delete-file" onclick="javascript:remove_img(this)">&times;<span>');
	    	}else{
	    		$(_this).parent().parent().find('.repay-view').html('<a class="img blue" href="'+this.result+'" download="true"/>'+fileName+'</a>');
	    	}
	        $(_this).parent().parent().find('.sign').show();
	        $(_this).parent().parent().parent().find('.sign').removeAttr('data-change');
	        if(factory){
	        	$(_this).parent().parent().find('.sign').addClass('factory_style');
			}
	    }
	    console.debug($(_this).attr('class'))
	    $(_this).attr('disabled','disabled')
	    console.debug($(_this).attr('class')==='receipt_voucher')
	    if($(_this).attr('class')==='receipt_voucher'){
	    	$(_this).parent().find('.lable').addClass('lable_receipt')
	    }else if($(_this).attr('class')==='repayment_voucher'){
	    	$(_this).parent().find('.lable').addClass('lable_repayment')
	    }
	}
	
	
    
    //获取总条数
    /*var pagesize=12;
    var totalCount=null;
    function repay_totalNum(){
    	var pageNum=null;
    	var total=$('.creatPeriod').length;
    	console.debug(total)
    	if(total!==0){
    		if(total%pagesize===0){
        		pageNum=total/pagesize;
        	}else{
        		pageNum=Math.ceil(total/pagesize);
        	}
    	}
    	console.debug(pageNum)
    	totalCount=pageNum
    	new PageBar('#pageBar',totalCount,function(curPageNo){
            var paramData = {}
            paramData.page = (curPageNo-1);
            paramData.size = size;
            //renderData(paramData);
        });
    }*/
})
	//判断角色
	function management_check() {
		var management=false;
        var roleInfo = new Role();
        var roleId = roleInfo.getRoleId();
        management = role.compareTo(roleId, role["zf_management_operator"]); //资方操作员
        return management
    }
//资方删除图片
	function remove_img(targetName){
		var management=management_check();
		console.debug(management)
		$(targetName).hide();
		$(targetName).parent().find('.img').remove();
		if($(targetName).parent().parent().parent().find('.repay-view').length>1){
			$(targetName).attr('data-change','modify')
		}
		$(targetName).parent().find('.repay_div').removeClass('hide');
		if($(targetName).parent().parent().find('.receipt_voucher').val() !== ''){
			$(targetName).parent().parent().find('.receipt_voucher').val('');
		}
		if($(targetName).parent().parent().find('.repayment_voucher').val() !== ''){
			$(targetName).parent().parent().find('.repayment_voucher').val('');
		}
		if(management){
			$(targetName).parent().parent().find('.receipt_voucher').removeAttr('disabled');
			console.debug($(targetName).parent().parent().find('.receipt_voucher'))
			$(targetName).parent().parent().find('.lable').removeClass('lable_receipt');
		}else{
			$(targetName).parent().parent().find('.repayment_voucher').removeAttr('disabled');
			$(targetName).parent().parent().find('.lable').removeClass('lable_repayment');
		}
		
	}

//查看大图
function showModal(targetName){			
		var cur=$(targetName).attr('src');
		var fileName=$(targetName).attr('data-name');
		var html = '';
	    html+='<div class="modal fade" id="repay-pic" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
	    html+='<div class="modal-dialog">';
	    html+='<div class="modal-content">';
	    html+='<div class="modal-header">';
	    html+='<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
	    html+='<h4 class="modal-title" id="myModalLabel">图片预览</h4>';
	    html+='</div>';
	    html+='<div class="modal-body center">';
	    html+='<img src="'+cur+'" width="300px" height="auto">';
	    html+='<p class="center">点击下载图片：<a href="'+cur+'" download="'+fileName+'">'+fileName+'</a></p>';
	    html+='</div>';
	    html+='<div class="modal-footer">';
	    html+= '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>';
	    html+='</div>';
	    html+='</div>';
	    html+='</div>';
	    html+='</div>';
	    if($('#repay-pic').length>0){
	        $('#repay-pic').detach();
	    }		        
	    $('body').append(html);
	    $('#repay-pic').modal('show');
	}



















