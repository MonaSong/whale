/**
 * @Date 2016-12-9
 * @Author yugang
 * @description 还款管理列表
 */


var pageCount = null;// 总页数
var pageSize = 10;// 每一页记录数
var repayment_number=null;// 编号
var risk_number=null;
var overdue_number=null;
$(function(){
	// 是否是酒厂
	function factory_check() {
		var factory=false;
        var roleInfo = new Role();
        var roleId = roleInfo.getRoleId();
        factory = role.compareTo(roleId, role["jc_system_operator"]); // 酒厂
        return factory
    }
	var factory=factory_check();
	console.debug(factory)
	if(factory){
		$('.whale-well-title').html('我的还款')
	}else{
		var search_html = '<div class="search-bar"><input type="text" class="form-control searchStr" placeholder="还款编号/企业名称" name=""><i class="w-icon-search search"></i></div>';
			$('.whale-well-footer').html(search_html)
		$('.whale-well-title').html('还款管理')
	}
	function contentshow(){
		if(!factory){
			$('.winerName').show();
			$('.finaceName').show();
		}else{
			$('.repaymentWay').removeClass('hide');
			$('.repaymentDate').removeClass('hide');
			$('.data-repay-money').addClass('data-repayMoney');
			$('.data-repay-dis-money').addClass('data-repayDismoney');
		}
	}
	// 是否是资方
	function management_check() {
		var management=false;
        var roleInfo = new Role();
        var roleId = roleInfo.getRoleId();
        management = role.compareTo(roleId, role["zf_management_operator"]); // 资方操作员
        return management
    }
	var management=management_check();
	console.debug(management)
	
	// 是否是风控专员
	function control_check(){
		var control=false;
		var roleInfo = new Role();
        var roleId = roleInfo.getRoleId();
		control = role.compareTo(roleId,role["za_risk_management_center"]);
		return control
	}
	var control=control_check();
	console.debug(control)
	
	// 是否是资方领导
	function Leader_check(){
		var leader=false;
		var roleInfo = new Role();
        var roleId = roleInfo.getRoleId();
        leader = role.compareTo(roleId,role["zf_leader"]);
		return leader
	}
	var leader=Leader_check();
	console.debug(leader)
	
	function leader_check(){
		if(leader){
			$(".repayList").show();
			$(".repayList").removeClass('hide');
			console.debug($(".repayList").find(".repayStatus"))
			$(".repayList").find(".repayStatus").each(function(){
				if($(this).attr('data-id') === 'Initial_stage'){
					$(this).find('a').attr('href','javascript:vivo()')
				}
			})
		}
	}
	
	// 状态数据
    var repay_management_list_dom = $('#repay_management_list');// 还款管理列表
	
	
	function renderRepayList(param){
	    var param = param;
	    /*
		 * param.keyWord = keyWord; param.pageNo = pageNo; param.pageSize =
		 * pageSize; param.repaymentStatus = repaymentStatus;
		 * console.debug(param)
		 */
	    HttpUtils.get_repayment_echo_data (param,function(data){
	    	if(data.statusCode==='200' && data.data.result.length!==0){
		        console.debug('还款管理数据')
		        console.debug(data);
		        var curData=data.data.result;
	            var html = '';
	            var bageColor ='bage-blue';
	            console.debug(curData)
	            var bageEnable='bage-gray'
	            if(curData[0].repaymentStatus==='0'){
	                bageColor = 'bage-blue';
	             }else if(curData[0].repaymentStatus=='1'){
	                bageColor = ' bage-yellow';
	             }else if(curData[0].repaymentStatus=='2'){
	            	bageColor = ' bage-green'; 
	             }else if(curData[0].repaymentStatus=='3'){
	            	bageColor = ' bage-red'; 
	             }
	            $.each(curData,function(i,item){
	                html+='<div class="data-list clearfix repayList">';                
	                html+='<div class="data-list-heading"><h4 class="data-list-title data-repay-title"><input type="checkbox" class="select_check"> 还款编号：<b class="repayNum">'+item.repaymentBusinessKey+'</b></h4></div>';
	                html+='<div class="data-list-body clearfix data-rapay-body"> <div class="data-list-left pull-left repay_skip">';
	                if(item.enableStatus===0){
	                	if(item.nodeContent==='风险提示'){
	                		html+='<div class="whale-bage '+bageColor+' repayStatus" data-risk-business="'+item.lastRiskWarnBusinessKey+'" data-id="enable" repay_status="1"><a href="javascript:void(0)" class="white">'+item.nodeContent+'</a></div>';
	                	}else{
	                		html+='<div class="whale-bage '+bageEnable+' repayStatus" data-id="Initial_stage" repay_status="0"><a href="'+contextPath+'/repayment/repayment_plan_page" class="white">'+item.nodeContent+'</a></div>';
	                	}
	                }else if(item.enableStatus===2){
	                	if(item.nodeContent==='风险提示'){
	                		if(item.lastRiskWarnBusinessKey===''){
	                			html+='<div class="whale-bage '+bageEnable+' repayStatus" data-id="enable" repay_status="1"><a href="javascript:void(0)" class="white">'+item.nodeContent+'</a></div>';
	                		}else if(item.lastRiskWarnBusinessKey!==''){
	                			html+='<div class="whale-bage '+bageColor+' repayStatus" data-risk-business="'+item.lastRiskWarnBusinessKey+'" data-id="enable" repay_status="1"><a href="javascript:void(0)" class="white">'+item.nodeContent+'</a></div>';
	                		}
	                	}else if(item.nodeContent==='启动解押'){
	                		if(item.startDecompressionBusinessKey===''){
	                			html+='<div class="whale-bage '+bageEnable+' repayStatus" data-id="forbidden" repay_status="2"><a href="javascript:void(0)" class="white">'+item.nodeContent+'</a></div>';
	                		}else if(item.startDecompressionBusinessKey!==''){
	                			html+='<div class="whale-bage '+bageColor+' repayStatus" data-id="enable" repay_status="1"><a href="javascript:void(0)" class="white">'+item.nodeContent+'</a></div>';
	                		}
	                	}else if(item.nodeContent==='逾期理赔'){
	                		if(item.overdueSettlementBusinessKey===''){
	                			html+='<div class="whale-bage '+bageEnable+' repayStatus" data-id="forbidden" repay_status="2"><a href="javascript:void(0)" class="white">'+item.nodeContent+'</a></div>';
	                		}else if(item.overdueSettlementBusinessKey!==''){
	                			html+='<div class="whale-bage '+bageColor+' repayStatus" data-overdue-businesskey="'+item.overdueSettlementBusinessKey+'" data-id="enable" repay_status="1"><a href="javascript:void(0)" class="white">'+item.nodeContent+'</a></div>';
	                		}
	                	}else if(item.nodeContent==='还款' || item.nodeContent==='还款中' || item.nodeContent==='欠息'){
	                		html+='<div class="whale-bage '+bageEnable+' repayStatus" data-id="forbidden" repay_status="2"><a href="javascript:void(0)" class="white">'+item.nodeContent+'</a></div>';
	                	}else{
	                		html+='<div class="whale-bage '+bageEnable+' repayStatus" data-id="forbidden" repay_status="2"><a href="javascript:void(0)" class="white">'+item.nodeContent+'</a></div>';
	                	}
	                	
	                }else if(item.enableStatus===1){
	                	if(item.nodeContent==='风险提示'){
	                		if(item.lastRiskWarnBusinessKey===''){
	                			html+='<div class="whale-bage '+bageEnable+' repayStatus" data-id="enable" repay_status="1"><a href="javascript:void(0)" class="white">'+item.nodeContent+'</a></div>';
	                		}else if(item.lastRiskWarnBusinessKey!==''){
	                			html+='<div class="whale-bage '+bageColor+' repayStatus" data-risk-business="'+item.lastRiskWarnBusinessKey+'" data-id="enable" repay_status="1"><a href="javascript:void(0)" class="white">'+item.nodeContent+'</a></div>';
	                		}
	                	}else if(item.nodeContent==='启动解押'){
	                		if(item.startDecompressionBusinessKey===''){
	                			html+='<div class="whale-bage '+bageEnable+' repayStatus" data-id="forbidden" repay_status="2"><a href="javascript:void(0)" class="white">'+item.nodeContent+'</a></div>';
	                		}else if(item.startDecompressionBusinessKey!==''){
	                			html+='<div class="whale-bage '+bageColor+' repayStatus" data-id="enable" repay_status="1"><a href="javascript:void(0)" class="white">'+item.nodeContent+'</a></div>';
	                		}
	                	}else if(item.nodeContent==='逾期理赔'){
	                		if(item.overdueSettlementBusinessKey===''){
	                			html+='<div class="whale-bage '+bageEnable+' repayStatus" data-id="forbidden" repay_status="2"><a href="javascript:void(0)" class="white">'+item.nodeContent+'</a></div>';
	                		}else if(item.overdueSettlementBusinessKey!==''){
	                			html+='<div class="whale-bage '+bageColor+' repayStatus" data-overdue-businesskey="'+item.overdueSettlementBusinessKey+'" data-id="enable" repay_status="1"><a href="javascript:void(0)" class="white">'+item.nodeContent+'</a></div>';
	                		}
	                	}else if(item.nodeContent==='还款' || item.nodeContent==='还款中' || item.nodeContent==='欠息'){
	                		html+='<div class="whale-bage '+bageColor+' repayStatus" data-id="enable" repay_status="2"><a href="javascript:void(0)" class="white">'+item.nodeContent+'</a></div>';
	                	}else{
	                		html+='<div class="whale-bage '+bageColor+' repayStatus" data-id="forbidden" repay_status="2"><a href="javascript:void(0)" class="white">'+item.nodeContent+'</a></div>';
	                	}
	                }
	                if(item.enableStatus===1){
	                	html+='<p class="data-repay-money text-center gray_money_color">'+format(item.needRepaymentAmount-0)+'元</p>';
	                }else{
	                	html+='<p class="data-repay-money text-center gray_dismoney_color">'+format(item.needRepaymentAmount-0)+'元</p>';
	                }
	                
	                if(item.enableStatus===1){
	                	html+='<div class="data-repay-date text-center"><p class="data-repay-period text-center gray_period_color">'+item.repaymentPeriodId+'</p></div>';
	                }else if(item.enableStatus===2 || item.enableStatus===0){
	                	html+='<div class="data-repay-date text-center"><p class="data-repay-period text-center gray_disperiod_color">'+item.repaymentPeriodId+'</p></div>';
	                }
	                html+='</div>';
	                if(item.enableStatus===1){
	                	html+='<div class="data-list-right data-repay-list gray_color"><div class="col-xs-4 col-md-4 data-repayment-list"><p class="winerName">酒厂名称：'+item.wineryCompanyName+'</p><p class="data-loanAmoun">融资金额：'+format(item.loanAmoun-0)+'元</p><p class="data-totalAmount">还款总额：'+format(item.repaymentTotalAmount-0)+'元</p><p class="repaymentWay hide">还款方式：'+item.repaymentMethod+'</p></div>';
		                html+='<div class="col-xs-4 col-md-4"><p class="finaceName">资金方：'+item.loanCompanyName+'</p><p class="data-financePeriod">融资期限：'+(item.financingPeriod?(item.financingPeriod+'年期'):'')+'</p><p class="data-repaymentAmount">已还总额：'+format(item.alreadyRepaymentAmount-0)+'元</p><p class="repaymentDate hide">还款日期：'+item.repaymentFirstDate+'</p></div>';
		                html+='</div>';
	                }else{
	                	html+='<div class="data-list-right data-repay-list gray_disabled_color"><div class="col-xs-4 col-md-4 data-repayment-list"><p class="winerName">酒厂名称：'+item.wineryCompanyName+'</p><p class="data-loanAmoun">融资金额：'+format(item.loanAmoun-0)+'元</p><p class="data-totalAmount">还款总额：'+format(item.repaymentTotalAmount-0)+'元</p><p class="repaymentWay hide">还款方式：'+item.repaymentMethod+'</p></div>';
		                html+='<div class="col-xs-4 col-md-4"><p class="finaceName">资金方：'+item.loanCompanyName+'</p><p class="data-financePeriod">融资期限：'+(item.financingPeriod?(item.financingPeriod+'年期'):'')+'</p><p class="data-repaymentAmount">已还总额：'+format(item.alreadyRepaymentAmount-0)+'元</p><p class="repaymentDate hide">还款日期：'+item.repaymentFirstDate+'</p></div>';
		                html+='</div>';
	                }
	                html+='</div></div>';
	            });
	            // console.debug(html)
	            repay_management_list_dom.html(html);
	            // console.debug(repay_management_list_dom)
	            /* skipPageClick(); */
	            contentshow();
		    	radioStatus();
	            modify();
	            controlButton();
	            init();
	            buttonshow();
	            page_skip();
	            linkdetail();
		    	pageCount = data.data.pageCount;
		    	console.debug('页数')
		    	console.debug(pageCount);
		    	color_copy();
		    	cancel();
		    	leader_check();
	    	}else{
	    		repay_management_list_dom.html('');
	    		pageCount = 0;
	    	}
	    })
	}
	function renderlist(keyWord,pageNo,pageSize,repaymentStatus){
		renderRepayList({keyWord:keyWord,pageNo:pageNo-1,pageSize:pageSize,repaymentStatus:repaymentStatus});
		var no_content_dom = $('.no-content-container');
		if(pageCount<1){
			no_content_dom.html(no_content_html);
			$('#pageBar').html('');
			return;
		}
		no_content_dom.html('');
		new PageBar('#pageBar',pageCount,function(curPage){
		    var param = {};
		    param.keyWord = keyWord;
		    param.pageNo = (curPage-1);
		    param.pageSize = pageSize;
		    param.repaymentStatus = repaymentStatus;
		    renderRepayList(param);
		},pageNo);
	}
	//页面初次加载数据
    var find_search = window.sessionStorage["search"]?window.sessionStorage["search"]:'';
    var init_status = window.sessionStorage["listStatus"]?window.sessionStorage["listStatus"]:'0';
    var init_page_no = window.sessionStorage["listPageNo"]?window.sessionStorage["listPageNo"]:1;
    $('#repay-management-tab>ul>li[data-status="'+init_status+'"]').addClass('active').siblings().removeClass('active');
    renderlist(find_search,init_page_no,pageSize,init_status);
    
	
	
	// 头部统计数
	 HttpUtils.get_repayCount_data(function(data){
		 var normal_b_dom = $('#repay-management-tab [data-status="0"] b');// 正常
		 var interst_b_dom = $('#repay-management-tab [data-status="1"] b');// 欠息
		 var settle_b_dom = $('#repay-management-tab [data-status="2"] b');// 已结清
		 var overdue_b_dom = $('#repay-management-tab [data-status="3"] b');// 逾期
		 normal_b_dom.text(data.data.NORMAL);
		 interst_b_dom.text(data.data.INTEREST)
		 settle_b_dom.text(data.data.SETTLED)
		 overdue_b_dom.text(data.data.OVERDUE)
	 })
	
	// 点击不同的申请状态
	var status=null
	var listStatus = null
	$('#repay-management-tab [data-status]').on('click',function(){
	    status = $(this).attr('data-status');
	    listStatus = $(this).attr('data-status');
	    if(management || control){
	    	if(status === '0' || status === '1'){
	    		$('#add-new-repay').val('风险提示');
	    		$('#add-new-repay').show();
	    	}else if(status === '2'){
	    		if(management){
	    			$('#add-new-repay').val('启动解押');
	    		}
	    	}else if(status === '3'){
	    		if(management){
	    			$('#add-new-repay').val('发起理赔');
	    		}
	    	}
	    }
	    console.debug('获取不同tab的状态')
	    console.debug(status)
	   $('#add-new-repay').attr('disabled','');
        window.sessionStorage.clear();
        window.sessionStorage["listStatus"] = status;
        renderlist(find_search,1,pageSize,status);
	})
	
	//回显时 按钮状态
	function show_btn_status(){
		 if(management || control){
			 showtatus = window.sessionStorage['listStatus'];
			 if (status === undefined || showtatus ==='0' || showtatus ==='1'){
				 $('#add-new-repay').val('风险提示');
				 $('#add-new-repay').show();
			 }else if(showtatus ==='2'){
				 if(management){
					 $('#add-new-repay').val('启动解押');
				 }else{
					 $('#add-new-repay').hide();
				 }
			 }else if(showtatus ==='3'){
				 if(management){
					 $('#add-new-repay').val('发起理赔');
				 }else{
					 $('#add-new-repay').hide();
				 }
			 }
		 }
	 }
	 show_btn_status();
	// 酒厂更改状态
	function modify(){
		if(factory){
			var factory_status = window.sessionStorage['listStatus']
			console.debug(factory_status);
	    	if(factory_status === '2' || factory_status === '3'){
	    		$('.repayStatus').addClass('hide');
	    		var repay_list=$('.repay_skip')
	    		console.debug(repay_list);
	    		$('.data-repay-money').addClass('repay-settle');
	    		$('.data-repay-date').addClass('repay-overdue');
	    		for(var i=0;i<repay_list.length;i++){
	    			$(repay_list[i]).find('.data-repay-period').on('click',function(){
    					var businessKey=$(this).parent().parent().parent().parent().find('.repayNum').text();
	    				console.debug(businessKey)
		    			window.sessionStorage["businessKey"]=businessKey;
		    			window.location.href=contextPath+'/repayment/repayment_plan_page';
		    			window.sessionStorage["status"]=status;
		    			show_page();
		    		})
	    		}
	    	}
	    }
	}
	
	// 资方更改button状态
	function buttonshow(){
		if(management){
			$('#add-new-repay').show();
			$('.select_check').removeClass("select_check");
			if(status==='0' || status==='1' || status===undefined){
	    		$('#add-new-repay').val('风险提示');
	    		$('#add-new-repay').on('click',function(){
	    			if($('#add-new-repay').val()==='风险提示'){
	    				/*if(risk_number!=='' && risk_number!==undefined){
	    					window.sessionStorage["riskBusinessKey"] = '';
	    					var node_obj = new AllNodeStatus(risk_number);
	    				    var cur_node_id = node_obj.getCurNodeId();
	    				    var risk_url = uiRouter["risk"][cur_node_id].url;
	    				    window.location.href=contextPath+risk_url;
	    				}else{*/
	    					window.sessionStorage["riskBusinessKey"] = '';
	    					window.sessionStorage["menuId"] = window.sessionStorage["riskManagementMenuId"];
	    					/*window.sessionStorage["riskBusinessKey"] = repayment_number;*/
	    					window.location.href=contextPath+'/riskmanagement/risk_warning_page';
	    				/*}*/
	    				window.sessionStorage["businessKey"] = repayment_number;
	    				window.sessionStorage["risk_warn"] = 'repayment';
		    			
		    		}
	    		})
	    	}else if(status==='2'){
	    		$('#add-new-repay').val('启动解押');
	    		$('#add-new-repay').on('click',function(){
	    			if($('#add-new-repay').val()==='启动解押'){

						var param={
							businessKey:repayment_number	
						}
						HttpUtils.get_maturityNum_data(param,function(data){
							if(data.statusCode==='200'){
								if(data.data!==''){
									window.sessionStorage["maturity-businessKey"]=data.data;
									var node_obj = new AllNodeStatus(data.data);
			    				    var cur_node_id = node_obj.getCurNodeId();
			    				    var maturity_url = uiRouter["decompression"][cur_node_id].url;
			    				    window.location.href=contextPath+maturity_url;
								}else{
									window.sessionStorage["repayment-businessKey"]=repayment_number;
									window.location.href=contextPath+'/maturity/start_decompression_page';
								}
								window.sessionStorage["menuId"] = window.sessionStorage["maturityDecompressionMenuId"];
							}
						})
		    		}
	    		})
	    	}else if(status==='3'){
	    		$('#add-new-repay').val('发起理赔');
	    		$('#add-new-repay').on('click',function(){
	    			if($('#add-new-repay').val()==='发起理赔'){
	    				if(overdue_number!=='' && overdue_number!==undefined){
	    					window.sessionStorage["overdueBusinessKey"]=overdue_number;
	    					var node_obj = new AllNodeStatus(overdue_number);
	    				    var cur_node_id = node_obj.getCurNodeId();
	    				    var overdue_url = uiRouter["overdue"][cur_node_id].url;
	    				    window.location.href=contextPath+overdue_url;
	    				    window.sessionStorage["menuId"] = window.sessionStorage["overdueManagementMenuId"];
	    				}else{
	    					window.sessionStorage["overdueBusinessKey"]=repayment_number;
	    					window.location.href=contextPath+'/overdue/overdue_detail_page';
	    					window.sessionStorage["menuId"] = window.sessionStorage["overdueManagementMenuId"];
	    				}
	    				
	    				window.sessionStorage["businessKey"]=repayment_number;
		    		}
	    		})	
	    	}
			var dataList=$('[data-id="Initial_stage"]')
			if(dataList.length>0){
				for(var i=0;i<dataList.length;i++){
					// console.debug($(dataList[i]).parent().parent().parent().addClass('hide'))
					$(dataList[i]).parent().parent().parent().removeClass('hide')
				}
			}
		}
	}
	
	// 中酒风控专员更改button状态
	function controlButton(){
		if(control){
			$('#add-new-repay').show();
			if(status==='0' || status==='1'|| status===null || status===undefined){
				$('.select_check').removeClass("select_check");
	    		$('#add-new-repay').val('风险提示');
	    		$('#add-new-repay').on('click',function(){
	    			if($('#add-new-repay').val()==='风险提示'){
	    				window.sessionStorage["businessKey"]=repayment_number;
	    				window.sessionStorage["riskBusinessKey"]=repayment_number;
	    				window.sessionStorage["risk_warn"] = 'repayment';
		    			window.location.href=contextPath+'/riskmanagement/risk_warning_page';
		    			window.sessionStorage["menuId"] = window.sessionStorage["riskManagementMenuId"];
		    		}	
	    		})
	    	}else if(status==='2' || status==='3'){
	    		$('#add-new-repay').hide();
	    	}
			
		}
	}
	
	// init初始化的数据
	function init(){
		var dataList=$('[data-id="Initial_stage"]')
		if(dataList.length>0){
			for(var i=0;i<dataList.length;i++){
				// console.debug($(dataList[i]).parent().parent().parent().addClass('hide'))
				$(dataList[i]).parent().parent().parent().addClass('hide')
			}
		}
	}
	
	// 跳转页面
	function page_skip(){
		// alert(333)
		var repay_dom=$('.repayStatus');
		console.debug(status)
			listStatus = window.sessionStorage['listStatus']?window.sessionStorage['listStatus']:'0';
			console.debug(listStatus)
			if((status === undefined || status==='0' || status === null) && (listStatus === undefined || listStatus === '0')){
				for(var i=0;i<repay_dom.length;i++){
					if($(repay_dom[i]).find('a').html()==='风险提示'){
						$(repay_dom[i]).on('click',function(){
							if($(this).attr('data-id')!=='forbidden'){
								window.sessionStorage["businessKey"]=$(this).parent().parent().parent().find('.repayNum').text();
								window.sessionStorage["riskBusinessKey"]=$(this).attr('data-risk-business');
								console.debug($(this).parent().parent().parent().find('.repayNum').text());
								var node_obj = new AllNodeStatus($(this).attr('data-risk-business'));
		    				    var cur_node_id = node_obj.getCurNodeId();
		    				    var risk_url = '';
		    				    if(!cur_node_id){
		    				    	risk_url = '/riskmanagement/risk_identification_page';
		    				    }else{
		    				    	risk_url = uiRouter["risk"][cur_node_id].url;
		    				    }
		    				    window.sessionStorage["menuId"] = window.sessionStorage["riskManagementMenuId"];
								window.sessionStorage["risk_warn"] = 'repayment';
								window.location.href=contextPath+risk_url;
								
							}else if(management){
								window.sessionStorage["businessKey"]=$(this).parent().parent().parent().find('.repayNum').text();
								window.sessionStorage["riskBusinessKey"]=$(this).parent().parent().parent().find('.repayNum').text();
								window.sessionStorage["risk_warn"] = 'repayment';
								window.location.href=contextPath+'/riskmanagement/risk_warning_page';
								window.sessionStorage["menuId"] = window.sessionStorage["riskManagementMenuId"];
								
							}
							
						})
						$(repay_dom[i]).parent().find('.data-repay-period').on('click',function(){
							if($(this).parent().parent().find('.repayStatus').attr('data-id')!=='forbidden'){
								window.sessionStorage["businessKey"]=$(this).parent().parent().parent().parent().find('.repayNum').text();
								console.debug($(this).parent().parent().parent().parent().find('.repayNum').text());
								window.location.href=contextPath+'/repayment/repayment_plan_page';
								window.sessionStorage["status"]=status;
								show_page()
							}else if(management){
								window.sessionStorage["businessKey"]=$(this).parent().parent().parent().parent().find('.repayNum').text();
								window.location.href=contextPath+'/repayment/repayment_plan_page';
								window.sessionStorage["status"]=status;
								show_page()
							}
						})
					}else if($(repay_dom[i]).find('a').html()==='还款中'){
						$(repay_dom[i]).on('click',function(){
							if($(this).attr('data-id')!=='forbidden' && $(this).attr('data-id')!=='Initial_stage'){
								console.debug($(this));
								window.location.href=contextPath+'/repayment/repayment_plan_page';
								window.sessionStorage["status"]=status;
								show_page()
							}else if(management){
								window.location.href=contextPath+'/repayment/repayment_plan_page';
								window.sessionStorage["status"]=status;
								show_page()
							}
							
						})
						$(repay_dom[i]).parent().find('.data-repay-period').on('click',function(){
							if($(this).parent().parent().find('.repayStatus').attr('data-id')!=='forbidden' && $(this).parent().parent().find('.repayStatus').attr('data-id')!=='Initial_stage'){
								window.sessionStorage["businessKey"]=$(this).parent().parent().parent().parent().find('.repayNum').text();
								console.debug($(this).parent().parent().parent().parent().find('.repayNum').text());
								window.location.href=contextPath+'/repayment/repayment_plan_page';
								window.sessionStorage["status"]=status;
								show_page()
							}else if(management){
								window.sessionStorage["businessKey"]=$(this).parent().parent().parent().parent().find('.repayNum').text();
								window.location.href=contextPath+'/repayment/repayment_plan_page';
								window.sessionStorage["status"]=status;
								show_page()
							}
						})
					}else if($(repay_dom[i]).find('a').html()==='还款'){
						$(repay_dom[i]).on('click',function(){
							if($(this).attr('data-id')!=='forbidden'){
								console.debug($(this));
								window.location.href=contextPath+'/repayment/repayment_plan_page';
								window.sessionStorage["status"]=status;
								show_page()
							}
						})
						$(repay_dom[i]).parent().find('.data-repay-period').on('click',function(){
							if($(this).parent().parent().find('.repayStatus').attr('data-id')!=='forbidden'){
								window.sessionStorage["businessKey"]=$(this).parent().parent().parent().parent().find('.repayNum').text();
								console.debug($(this).parent().parent().parent().parent().find('.repayNum').text());
								window.location.href=contextPath+'/repayment/repayment_plan_page';
								window.sessionStorage["status"]=status;
								show_page()
							}else if(management){
								window.sessionStorage["businessKey"]=$(this).parent().parent().parent().parent().find('.repayNum').text();
								window.location.href=contextPath+'/repayment/repayment_plan_page';
								show_page()
							}
						})
					}
					
				}
			}else if(status==='1' || listStatus === '1'){
				for(var i=0;i<repay_dom.length;i++){
					if($(repay_dom[i]).find('a').html()==='风险提示'){
						$(repay_dom[i]).on('click',function(){
							if($(this).attr('data-id')!=='forbidden'){
								window.sessionStorage["menuId"] = window.sessionStorage["riskManagementMenuId"];
								window.sessionStorage["businessKey"]=$(this).parent().parent().parent().find('.repayNum').text();
								window.sessionStorage["riskBusinessKey"]=$(this).attr('data-risk-business');
								window.sessionStorage["risk_warn"] = 'repayment';
								var node_obj = new AllNodeStatus($(this).attr('data-risk-business'));
		    				    var cur_node_id = node_obj.getCurNodeId();
		    				    var risk_url = '';
		    				    if(!cur_node_id){
		    				    	risk_url = '/riskmanagement/risk_identification_page';
		    				    }else{
		    				    	risk_url = uiRouter["risk"][cur_node_id].url;
		    				    }
		    				    console.debug(risk_url)
		    				    
								window.location.href = contextPath+risk_url;
		    				    window.sessionStorage["status"]=status;
							}else if(management){
								window.sessionStorage["businessKey"]=$(this).parent().parent().parent().find('.repayNum').text();
								window.sessionStorage["riskBusinessKey"]=$(this).parent().parent().parent().find('.repayNum').text();
								window.sessionStorage["risk_warn"] = 'repayment';
								window.location.href=contextPath+'/riskmanagement/risk_warning_page';
								window.sessionStorage["menuId"] = window.sessionStorage["riskManagementMenuId"];
							}
							
						})
						$(repay_dom[i]).parent().find('.data-repay-period').on('click',function(){
							if($(this).parent().parent().find('.repayStatus').attr('data-id')!=='forbidden'){
								window.sessionStorage["businessKey"]=$(this).parent().parent().parent().parent().find('.repayNum').text();
								console.debug($(this).parent().parent().parent().parent().find('.repayNum').text());
								window.location.href=contextPath+'/repayment/repayment_plan_page';
								window.sessionStorage["status"]=status;
								show_page()
							}else if(management){
								window.sessionStorage["businessKey"]=$(this).parent().parent().parent().parent().find('.repayNum').text();
								window.location.href=contextPath+'/repayment/repayment_plan_page';
								window.sessionStorage["status"]=status;
								show_page()
							}
						})
					}else if($(repay_dom[i]).find('a').html()==='欠息'){
						$(repay_dom[i]).on('click',function(){
							if($(this).attr('data-id')!=='forbidden'){
								window.location.href=contextPath+'/repayment/repayment_plan_page';
								window.sessionStorage["status"]=status;
								show_page()
							}else if(management){
								window.location.href=contextPath+'/repayment/repayment_plan_page';
								window.sessionStorage["status"]=status;
								show_page()
							}
							
						})
						$(repay_dom[i]).parent().find('.data-repay-period').on('click',function(){
							if($(this).parent().parent().find('.repayStatus').attr('data-id')!=='forbidden'){
								window.sessionStorage["businessKey"]=$(this).parent().parent().parent().parent().find('.repayNum').text();
								console.debug($(this).parent().parent().parent().parent().find('.repayNum').text());
								window.location.href=contextPath+'/repayment/repayment_plan_page';
								window.sessionStorage["status"]=status;
								show_page()
							}else if(management){
								window.sessionStorage["businessKey"]=$(this).parent().parent().parent().parent().find('.repayNum').text();
								window.location.href=contextPath+'/repayment/repayment_plan_page';
								window.sessionStorage["status"]=status;
								show_page()
							}
						})
					}else if($(repay_dom[i]).find('a').html()==='还款'){
						$(repay_dom[i]).on('click',function(){
							if($(this).attr('data-id')!=='forbidden'){
								window.location.href=contextPath+'/repayment/repayment_plan_page';
								window.sessionStorage["status"]=status;
								show_page()
							}
						})
						$(repay_dom[i]).parent().find('.data-repay-period').on('click',function(){
							if($(this).parent().parent().find('.repayStatus').attr('data-id')!=='forbidden'){
								window.sessionStorage["businessKey"]=$(this).parent().parent().parent().parent().find('.repayNum').text();
								console.debug($(this).parent().parent().parent().parent().find('.repayNum').text());
								window.location.href=contextPath+'/repayment/repayment_plan_page';
								window.sessionStorage["status"]=status;
								show_page()
							}else if(management){
								window.sessionStorage["businessKey"]=$(this).parent().parent().parent().parent().find('.repayNum').text();
								window.location.href=contextPath+'/repayment/repayment_plan_page';
								window.sessionStorage["status"]=status;
								show_page()
							}
						})
					}
					
				}
			}else if(status==='2' || listStatus === '2'){
				for(var i=0;i<repay_dom.length;i++){
					if($(repay_dom[i]).find('a').html()==='启动解押'){
						$(repay_dom[i]).on('click',function(){
							if($(this).attr('data-id')!=='forbidden'){
								var businessKey=$(this).parent().parent().parent().find('.repayNum').text();
								var param={
									businessKey:businessKey	
								}
								HttpUtils.get_maturityNum_data(param,function(data){
									if(data.statusCode==='200'){
										if(data.data!==''){
											window.sessionStorage["maturity-businessKey"]=data.data;
											var node_obj = new AllNodeStatus(data.data);
					    				    var cur_node_id = node_obj.getCurNodeId();
					    				    var maturity_url=''
					    				    console.debug('当前节点'+cur_node_id)
					    				    if(!uiRouter["decompression"][cur_node_id]){
					    				    	maturity_url = '/maturity/winery_receipt_page'
					    				    }else{
					    				    	maturity_url = uiRouter["decompression"][cur_node_id].url;
					    				    }
					    				    window.location.href=contextPath+maturity_url;
										}else{
											window.sessionStorage["repayment-businessKey"]=businessKey;
											window.location.href=contextPath+'/maturity/start_decompression_page';
										}
										window.sessionStorage["menuId"] = window.sessionStorage["maturityDecompressionMenuId"];
										window.sessionStorage["status"]=status;
									}
								})
							}
						})
						$(repay_dom[i]).parent().find('.data-repay-period').on('click',function(){
							window.sessionStorage["businessKey"]=$(this).parent().parent().parent().parent().find('.repayNum').text();
							console.debug($(this).parent().parent().parent().parent().find('.repayNum').text());
							window.location.href=contextPath+'/repayment/repayment_plan_page';
							window.sessionStorage["status"]=status;
							show_page()
						})
					}
				}
			}else if(status==='3' || listStatus === '3'){
				for(var i=0;i<repay_dom.length;i++){
					if($(repay_dom[i]).find('a').html()==='逾期理赔'){
						$(repay_dom[i]).on('click',function(){
							if($(this).attr('data-id')!=='forbidden'){
								window.sessionStorage["menuId"] = window.sessionStorage["overdueManagementMenuId"];
								window.sessionStorage["businessKey"]=$(this).parent().parent().parent().find('.repayNum').text();
								window.sessionStorage["overdueBusinessKey"]=$(this).attr('data-overdue-businesskey');
								console.debug($(this).attr('data-overdue-businesskey'))
								var node_obj = new AllNodeStatus($(this).attr('data-overdue-businesskey'));
		    				    var cur_node_id = node_obj.getCurNodeId();
		    				    console.debug('当前节点'+cur_node_id)
		    				    if(!uiRouter["overdue"][cur_node_id]){
		    				    	overdue_url = '/overdue/delivery_notes_page'
		    				    }else{
		    				    	overdue_url = uiRouter["overdue"][cur_node_id].url;
		    				    }
		    				    
		    				    window.location.href=contextPath+overdue_url;
		    				    window.sessionStorage["status"]=status;
							}
						})
						$(repay_dom[i]).parent().find('.data-repay-period').on('click',function(){
							window.sessionStorage["businessKey"]=$(this).parent().parent().parent().parent().find('.repayNum').text();
							window.sessionStorage["overdueBusinessKey"]=$(this).parent().parent().parent().parent().find('.repayNum').text();
							console.debug($(this).parent().parent().parent().parent().find('.repayNum').text());
							window.location.href=contextPath+'/repayment/repayment_plan_page';
							window.sessionStorage["status"]=status;
							show_page()
						})
					}
				}
			}	
	}
	
	
	// 保存当前数据至详情页 // 没调用
	function linkdetail(){
		$('#repay_management_list .repayStatus').on('click',function(){
			var businessKey=$(this).parent().parent().parent().find('.repayNum').text();
			var repay_status=$(this).attr('repay_status');
			window.sessionStorage["repay_status"]=repay_status;
			window.sessionStorage["businessKey"]=businessKey;
		})
	}
	
	// 点击单选框时按钮状态
	function radioStatus(){
        // var data_head_list_dom = $('.data-list .data-list-heading');
        // var checkbox_list_dom =
		// data_head_list_dom.find('input[type="checkbox"]');
        $('.select_check').on('click',function(){
            // 设置还款按钮的状态
            var checked_len = $(this).parent().find('input[type="checkbox"]:checked').length;
            console.debug(checked_len);
            if(checked_len<1){
                (typeof $('#add-new-repay').attr('disabled')=='undefined')?$('#add-new-repay').attr('disabled',''):'';
            }else{
            	$('#add-new-repay').removeAttr('disabled');
            }
            if($(this).parent().find('input[type="checkbox"]').is(':checked')){
            	repayment_number=$(this).parent().find('.repayNum').text();
            	risk_number=$(this).parent().parent().parent().find('.repayStatus').attr('data-risk-business');
            	overdue_number=$(this).parent().parent().parent().find('.repayStatus').attr('data-overdue-businesskey');
				console.debug(overdue_number)
            }
            // 单选的checkbox
            if($(this).is(':checked')){
                $(this).parents('.repayList').siblings().find('input[type=checkbox]').prop('checked',false);
            }
        })
    }
	
	function cancel(){
		var selectList=$('.select_check');
		for(var i=0;i<selectList.length;i++){
			if(!$(selectList[i]).attr('disabled')){
				$('#add-new-repay').attr('disabled','disabled');
			}
		}
	}
	
	// 搜索
	$(".search").on('click',function(){
    	var search=$(".searchStr").val();
    	if(status==="0" || status===null || status===undefined){
    		renderlist(search,'0',pageSize,'0')
    	}else if(status==='1'){
    		renderlist(search,'0',pageSize,'1')
    	}else if(status==='2'){
    		renderlist(search,'0',pageSize,'2')
    	}else if(status==='3'){
    		renderlist(search,'0',pageSize,'3')
    	}	
    });
	
	//判断文案颜色来调整字体颜色
	function color_copy(){
		console.debug($('.bage-gray'))
		var graylist=$('.bage-gray');
		for(var i=0;i<graylist.length;i++){
			if(status==='0' || status==='1'|| status===null || status===undefined){
				$(graylist[i]).parent().parent().find('.data-repay-list').addClass('gray_disabled_color');
				$(graylist[i]).parent().find('.data-repay-money').addClass('gray_dismoney_color');
				$(graylist[i]).parent().find('.data-repay-period').addClass('gray_disperiod_color');
			}else{
				$(graylist[i]).parent().parent().find('.data-repay-list').addClass('gray_color');
				$(graylist[i]).parent().find('.data-repay-money').addClass('gray_money_color');
				$(graylist[i]).parent().find('.data-repay-period').addClass('gray_period_color');
			}	
		}
		/*var bluelist=$('.bage-blue');
		for(var i=0;i<bluelist.length;i++){
			$(bluelist[i]).parent().parent().find('.data-repay-list').addClass('gray_color');
			$(bluelist[i]).parent().find('.data-repay-money').addClass('gray_money_color');
			$(bluelist[i]).parent().find('.data-repay-period').addClass('gray_period_color');
		}*/
		/*var yellowlist=$('.bage-yellow');
		for(var i=0;i<yellowlist.length;i++){
			$(yellowlist[i]).parent().parent().find('.data-repay-list').addClass('gray_color');
			$(yellowlist[i]).parent().find('.data-repay-money').addClass('gray_money_color');
			$(yellowlist[i]).parent().find('.data-repay-period').addClass('gray_period_color');
		}*/
		var greenlist=$('.bage-green');
		for(var i=0;i<greenlist.length;i++){
			$(greenlist[i]).parent().parent().parent().find('.data-list-title input').addClass('select_check');
		}
		var redlist=$('.bage-red');
		for(var i=0;i<redlist.length;i++){
			$(redlist[i]).parent().parent().parent().find('.data-list-title input').addClass('select_check');
		}
	}
	//数字转换成千分位
	function format (num) {
	   	 return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
	}
	function show_page(){
		var list_status = $('#repay-management-tab>ul>li.active').attr('data-status');
        var list_page_no = parseInt($('#pageBar li.active').text());
        window.sessionStorage["listStatus"] = list_status;
        window.sessionStorage["listPageNo"] = list_page_no;
	}
})
