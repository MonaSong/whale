$().ready(function() {
	
	function processDefinition(){
		HttpUtils.get_process_definition(function(data) {
			if (data !== undefined && data !== '' && data.data !== null && data.data !== undefined) {
			
			}
		})
	}
	processDefinition();
	
	var messageGroupName=window.sessionStorage["messageGroupName"];
	if(messageGroupName==='理赔通知模板'){
		$('[name=news_node]').val('发起理赔');
		$('[name=trigger_condition]').val('当前节点通过');
	}else if(messageGroupName==='解押通知模板'){
		$('[name=news_node]').val('启动解押');
		$('[name=trigger_condition]').val('当前节点通过');
	}else if(messageGroupName==='还款提醒模板'){
		$('[name=news_node]').val('还款计划');
		$('[name=trigger_condition]').val('每一期还款日前X天');
	}else if(messageGroupName==='放款完成通知模板'){
		$('[name=news_node]').val('放款确认-资方办理完毕');
		$('[name=trigger_condition]').val('当前节点通过');
	}else if(messageGroupName==='合同审核通过模板'){
		$('[name=news_node]').val('合同审核-资方办理完毕');
		$('[name=trigger_condition]').val('当前节点通过');
	}else if(messageGroupName==='资质审核未通过通知模板'){
		$('[name=news_node]').val('资质审核');
		$('[name=trigger_condition]').val('资方或履约保险方当前节点拒绝融资');
	}else if(messageGroupName==='融资申请提交通知模板'){
		$('[name=news_node]').val('融资申请');
		$('[name=trigger_condition]').val('当前节点通过');
	}else if(messageGroupName==='入驻申请通过通知模板'){
		$('[name=news_node]').val('总监审核');
		$('[name=trigger_condition]').val('当前节点通过');
	}
});