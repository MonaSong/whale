$().ready(function() {
	$("#companyProvince").select2({
		width: "100px"
	});
	$("#companyCity").select2({
		width: "100px"
	});
	//省市联动
	$.initProv("#companyProvince", "#companyCity", "请选择", "请先选择");
	var registerform = $('#winery-mation');
	var registerrules = {
		userDuty: {
			required: true,
			maxlength: 15
		},
		companyAddress: {
			required: true,
			maxlength: 15
		},
	};

	var registermessages = {
		userDuty: {
			required: '必填字段',
			maxlength: "超出输入范围，不超过15个字符"
		},
		companyAddress: {
			required: '必填字段',
			maxlength: 15
		},
	};

	formValidate(registerform, registerrules, registermessages);

	function claim() {
		(typeof $('input,select,textarea').attr('disabled') !== 'undefined') ? $('input,select,textarea').removeAttr('disabled'): ''
		$('[data-operator]').show();
	}

	function review() {
		$('input,select,textarea').attr({
			'disabld': ''
		})
		$('[data-operator]').hide();
	}

	function MessagementData() {
		var paramData = param;
		HttpUtils.get_message_management_data(paramData, function(data) {
			if (data !== undefined && data !== '' && data.data !== null && data.data !== undefined) {
				var wineryData = data.data[0];
				console.debug(wineryData);
				$('#mobile').val(wineryData.mobile);
				$('[name=username]').val(wineryData.trueName);
				$('[name=userDuty]').val(wineryData.userDuty);
				$('[name=companyName').val(wineryData.companyName);
				$('[name=companyAddress]').val(wineryData.companyAddress);
				$('#select2-companyProvince-container').html(wineryData.companyProvince);
				$('#select2-companyCity-container').html(wineryData.companyCity);
				$('[name=businessLicenseNum]').val(wineryData.businessLicenseNum);
				var wineryInfoId = wineryData.wineryInfoId;
				window.sessionStorage["wineryInfoId"] = wineryInfoId;
				var need_claim = false;
				need_claim ? claim() : review();
				if (wineryData.bussinessLicense) {
					var bus_text = wineryData.bussinessLicense.name;
					var bus_id = wineryData.bussinessLicense.id;
					var bus_type = wineryData.bussinessLicense.type;
					setAccessory('[name="bussinessLicense"]', bus_text, bus_id, bus_type, need_claim);
				}
				if (wineryData.legalBackCardPic) {
					var bus_text = wineryData.legalBackCardPic.name;
					var bus_id = wineryData.legalBackCardPic.id;
					var bus_type = wineryData.legalBackCardPic.type;
					setAccessory('[name="legalBackCardPic"]', bus_text, bus_id, bus_type, need_claim);
				}
				if (wineryData.legalFrontCardPic) {
					var bus_text = wineryData.legalFrontCardPic.name;
					var bus_id = wineryData.legalFrontCardPic.id;
					var bus_type = wineryData.legalFrontCardPic.type;
					setAccessory('[name="legalFrontCardPic"]', bus_text, bus_id, bus_type, need_claim);
				}
				if (wineryData.taxRegistration) {
					var bus_text = wineryData.taxRegistration.name;
					var bus_id = wineryData.taxRegistration.id;
					var bus_type = wineryData.taxRegistration.type;
					setAccessory('[name="taxRegistration"]', bus_text, bus_id, bus_type, need_claim);
				}
				if (wineryData.wineryLivePic) {
					var bus_text = wineryData.wineryLivePic.name;
					var bus_id = wineryData.wineryLivePic.id;
					var bus_type = wineryData.wineryLivePic.type;
					setAccessory('[name="wineryLivePic"]', bus_text, bus_id, bus_type, need_claim);
				}
			}
		})
	}
	MessagementData();

	//修改酒厂信息
	function wineryinfoData() {
		$('.btn-message-role').on('click', function() {
			//判断数据是否为空,如果为空则
			var select_pro = $('#select2-companyProvince-container').text() == '请选择';
			var select_city = $('#select2-companyCity-container').text() == '请选择';
			if (select_pro) {
				//<label id="companyAddress-error" class="error" for="companyAddress">这是必填字段</label>
				$('[data-role="prov"]').append('<label class="error" for="companyAddress">这是必填字段</label>');
			}
			if (select_city) {
				$('[data-role="city"]').append('<label class="error" for="companyAddress">这是必填字段</label>');
			}
			if (!$('#winery-mation').valid() || select_pro || select_city) {
				return;
			}
			var wineryId = window.sessionStorage["wineryInfoId"];
			var userDuty = $('[name=userDuty]').val();
			var companyProvince = $('#select2-companyProvince-container').html();
			var companyCity = $('#select2-companyCity-container').html();
			var companyAddress = $('[name=companyAddress]').val();
			var param = {
				wineryId: wineryId,
				userDuty: userDuty,
				companyProvince: companyProvince,
				companyCity: companyCity,
				companyAddress: companyAddress
			}
			HttpUtils.get_wineryinfo_data(param, function(data) {
				var alertInfo = '信息修改成功';
				if (data.statusCode == '200') {
					auditSuccess(alertInfo);
				}
			})
		})
	}
	wineryinfoData();
	//点击取消跳转页面
	$('.btn-message-call').on('click', function() {
		window.location.href = contextPath + "/winmanage/winery_information_page";
	})
});