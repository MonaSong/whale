/**
 * @Author Mona
 * @date 2016-11-07
 * @description 酒厂业务员  融资申请信息填写
 */

$(function(){
    function review() {
       $('input,select,textarea').attr({'disabled':''})
       $('[data-operator]').hide();
       addSelectPatch();
    }

    function claim(){
        (typeof $('input,select,textarea').attr('disabled')!=='undefined')?$('input,select,textarea').removeAttr('disabled'):''
        $('[data-operator]').show();
        $('[name="applicantCompany"]').attr('disabled','');
    }

    //如果当前的办理状态为financeModify，就可以直接办理新增融资事项
    (window.sessionStorage["managementStatus"]=='financeModify'||(window.sessionStorage["managementStatus"]=='0' && is_winery))?claim():review();
    $('[name="applicantCompany"]').attr('disabled','');

    var form = $('#finance-application-form');
    var rules = {
        //营业执照信息
        unifiedSocialCredit:{
            required:true,
            fixedLength:18
        },
        organizationCodeLicenseNum:{
            required:true,
            maxlength:20
        },
        businessRegistNum:{
            required:true,
            number:true,
            fixedLength:15
        },
        companyName:{
            required:true,
            maxlength:30
        },
        companyType:{
            required:true,
            maxlength:30
        },
        residence:{
            required:true,
            maxlength:50,
        },
        businessLegalRepresentative:{
            required:true,
            maxlength:10
        },
        registeredCapital:{
            required:true,
            maxlength:20
        },
        establishDate:{
            required:true
        },
        businessTerm:{
            required:true,
            maxlength:30
        },
        businessRange:{
            required:true,
            maxlength:500
        },
        businessPic:{
            required:true
        },

        //组织机构代码证信息
        organizationCode:{
            required:true,
            maxlength:20
        },
        organizationRegistNum:{
            required:true,
            maxlength:20
        },
        organizationName:{
            required:true,
            maxlength:30
        },
        organizationType:{
            required:true,
            maxlength:20
        },
        organizationAddress:{
            required:true,
            maxlength:50
        },
        organizationTerm:{
            required:true,
            maxlength:30
        },
        issuingUnit:{
            required:true,
            maxlength:30
        },
        organizationCodePic:{
            required:true
        },

        //税务登记证信息
        taxWord:{
            required:true,
            maxlength:10
        },
        taxNum:{
            required:true,
            fixedLength:15
        },
        noTaxWord:{
            required:true,
            maxlength:10
        },
        noTaxNum:{
            required:true,
            fixedLength:15
        },
        taxpayerName:{
            required:true,
            maxlength:30
        },
        taxLegalRepresentative:{
            required:true,
            maxlength:10
        },
        taxAddress:{
            required:true,
            maxlength:50
        },
        taxRange:{
            required:true,
            maxlength:500
        },
        taxType:{
            required:true,
            maxlength:30
        },
        taxApprovedUnit:{
            required:true,
            maxlength:30
        },
        taxRegistPic:{
            required:true
        },
        //开户许可证信息
        accountLicenseNum:{
            required:true,
            maxlength:15
        },
        accountCheckNum:{
            required:true,
            maxlength:20
        },
        accountLegalRepresentative:{
            required:true,
            maxlength:10
        },
        accountBankName:{
            required:true,
            maxlength:50
        },
        bankAccount:{
            required:true,
            maxlength:25
        },
        accountLicensePic:{
            required:true
        },
        //全国工业产品生产许可证信息
        productLicenseName:{
            required:true,
            maxlength:30
        },
        productLicenseNum:{
            required:true,
            maxlength:20
        },
        productLicenseAddress:{
            required:true,
            maxlength:50
        },
        producingArea:{
            required:true,
            maxlength:50
        },
        productQuarantineMethod:{
            required:true,
            maxlength:20
        },
        productTerm:{
            required:true,
            maxlength:30
        },
        productLicensePic:{
            required:true
        },
        //机构信用代码证信息

        institutionCreditCode:{
        required:true,
            maxlength:20
        },
        institutionCreditTerm:{
            required:true,
            maxlength:30
        },
        institutionName:{
            required:true,
            maxlength:30
        },
        institutionAddress:{
            required:true,
            maxlength:50
        },
        institutionCreitPic:{
            required:true
        },
        //法人代表信息

        corporationName:{
        required:true,
            maxlength:10
        },
        corporationIdNum:{
            required:true,
            fixedLength:18
        },
        corporationMaritalStatus:{
            required:true
        },
        corporationAddress:{
            required:true,
            maxlength:50
        },
        corporationPhone:{
            required:true,
            isMobile:true
        },
        corporationZipCode:{
            required:true,
            isZipCode:true
        },
        corporationFrontPic:{
            required:true
        },
        corporationBackPic:{
            required:true
        },
        //酒厂现场照片
        wineryLivePic:{
            required:true
        },
        //融资意向
        stockWineNum:{
            required:true,
            maxlength:14
        },
        stockWinePrice:{
            required:true,
            maxlength:30
        },
        mortgageWineNum:{
            required:true,
            maxlength:14
        },
        mortgageWinePrice:{
            required:true,
            maxlength:30
        },
        surplusWineNum:{
            required:true,
            maxlength:14
        },
        surplusWinePrice:{
            required:true,
            maxlength:30
        },
        financingNeed:{
            required:true,
            maxlength:17
        },
        financingBankName:{
            required:true,
            maxlength:50
        },
        financingUserName:{
            required:true,
            maxlength:30
        },
        financingAccount:{
            required:true,
            maxlength:25
        }
    }  

    var finance_msg = {
        businessPic:{
            required:'请上传附件'
        },
        accountLicensePic:{
            required:'请上传附件'
        },
        productLicensePic:{
            required:'请上传附件'
        },
        institutionCreitPic:{
            required:'请上传附件'
        },
        corporationFrontPic:{
            required:'请上传附件'
        },
        corporationBackPic:{
            required:'请上传附件'
        },
        wineryLivePic:{
            required:'请上传附件'
        },
        organizationCodePic:{
            required:'请上传附件'
        },
        taxRegistPic:{
            required:'请上传附件'
        }
    }  
    
    formValidate(form,rules,finance_msg);

    var save_status = null;

    //页面初次加载  默认加载第一种情况 选择工商营业执照
    function setOneStatus(update){
        $('[name="businessLicenseType"][value="1"]').prop('checked',true);
        $('[data-id="businessRegistNum"],[data-pane-zuzhi],[data-pane-tax]').show();
        $('[data-tongyi],[data-zuzhicode],[data-tax],[data-yizhaoyima]').hide();
        update?'':$('[data-tongyi],[data-zuzhicode],[data-tax]').find('input').val('');
        save_status = 1
    }

    setOneStatus();

    //第二种营业执照类型 默认选择一照一码的是   
    function setSecondeStatus(update){
        $('[name="yiZhaoYiMa"][value="1"]').prop('checked',true);
        $('[data-tongyi],[data-yizhaoyima]').show();
        $('[data-id="businessRegistNum"]').hide();
        $('[data-tax],[data-pane-zuzhi],[data-pane-tax],[data-zuzhicode]').hide();
        update?'':$('[data-tax],[data-pane-zuzhi],[data-pane-tax]').find('input').val('');
    }

    //第二种营业执照类型 选择一照一码的 否
    function setThreeStatus(update){
        $('[data-id="businessRegistNum"]').show();       
        $('[data-zuzhicode],[data-tax],[data-yizhaoyima]').show();
        $('[data-tongyi],[data-pane-zuzhi],[data-pane-tax]').hide();
        update?'':$('[data-tongyi],[data-pane-zuzhi],[data-pane-tax]').find('input').val('');
    }

    //点击 营业执照类型
    $('#chose-businessLicense-type label').on('click',function(){
        var curBusinessLicenseType = $('[name="businessLicenseType"]:checked').val();

        if(curBusinessLicenseType=='1'){
            setOneStatus()
        }else if(curBusinessLicenseType=='2'){//此时默认选中 一照一码的 是
            setSecondeStatus();
        }

        console.debug('status=='+save_status)
    })

    //点击一照一码是否
    $('#yi-zhao-yi-ma label').on('click',function(){
        var curYizhaoYima = $(this).find('[name="yiZhaoYiMa"]:checked').val();
        console.log(curYizhaoYima)
        if(curYizhaoYima=='1'){
            setSecondeStatus();
            save_status = 2;
        }else if(curYizhaoYima=='0'){
            setThreeStatus();
            save_status = 3;
        }
    })

    //融资申请传输的参数
    var finance_param = {};
    finance_param.files = ['businessPic','accountLicensePic','productLicensePic','institutionCreitPic','corporationFrontPic','corporationBackPic','wineryLivePic','organizationCodePic','taxRegistPic'];
    finance_param.fileNames = ['businessPic','accountLicensePic','productLicensePic','institutionCreitPic','corporationFrontPic','corporationBackPic','wineryLivePic','organizationCodePic','taxRegistPic'];
    

    $('[data-role="submit-form"]').on('click',function(){
        var _this = this;
        //内容最多的情况下  开户许可证和工业生产许可证，businessType为1的时候有
        //字段  第三种情况 比第二种情况多了  businessRegistNum  organizationCodeLicenseNum taxWord taxNum
        var param = {};  
        param.inputData = {
            //营业执照信息
            applicantCompany:$('[name="applicantCompany"]').val(),//申请单位
            businessLicenseType:$('[name="businessLicenseType"]:checked').val(),//营业执照类型
            businessRegistNum:$('[name="businessRegistNum"]').val(),//注册号
            yiZhaoYiMa:$('[name="yiZhaoYiMa"]:checked').val(),//一照一码
            unifiedSocialCredit:$('[name="unifiedSocialCredit"]').val(),//统一社会信用代码
            organizationCodeLicenseNum:$('[name="organizationCodeLicenseNum"]').val(),//组织机构代码

            //注意此处取值
            taxWord : $('[name="taxWord"]').val(),//税务登记字
            taxNum : $('[name="taxNum"]').val(),//税务登记号


            companyName:$('[name="companyName"]').val(),//公司名称
            companyType:$('[name="companyType"]').val(),//公司类型
            residence:$('[name="residence"]').val(),//住所
            businessLegalRepresentative:$('[name="businessLegalRepresentative"]').val(),//法人代表
            registeredCapital:$('[name="registeredCapital"]').val(),//注册资本
            establishDate:$('[name="establishDate"]').val(),//成立日期
            businessTerm:$('[name="businessTerm"]').val(),//营业期限
            businessRange:$('[name="businessRange"]').val(),//经营范围
            //组织机构代码证信息
            organizationCode:$('[name="organizationCode"]').val(),//代码   
            organizationRegistNum:$('[name="organizationRegistNum"]').val(),//登记号         
            organizationName: $('[name="organizationName"]').val(),//机构名称
            organizationType:$('[name="organizationType"]').val(),//机构类型
            organizationAddress: $('[name="organizationAddress"]').val(),//地址
            organizationTerm: $('[name="organizationTerm"]').val(),//有效期
            issuingUnit:$('[name="issuingUnit"]').val(), //颁发单位
            //税务登记
            taxpayerName: $('[name="taxpayerName"]').val(),//纳税人名称
            taxLegalRepresentative : $('[name="taxLegalRepresentative"]').val(),//法定代表人
            taxAddress: $('[name="taxAddress"]').val(),//地址
            taxRange: $('[name="taxRange"]').val(),//经营范围
            taxType: $('[name="taxType"]').val(),//登记类型
            taxApprovedUnit: $('[name="taxApprovedUnit"]').val(),//批准设立机关
            //开户许可证信息
            accountLicenseNum:$('[name="accountLicenseNum"]').val(),//编号
            accountCheckNum:$('[name="accountCheckNum"]').val(),//核准号
            accountLegalRepresentative:$('[name="accountLegalRepresentative"]').val(),//法定代表人
            accountBankName:$('[name="accountBankName"]').val(),//开户银行
            bankAccount:$('[name="bankAccount"]').val(),//账号
            //全国工业品生产许可证信息
            productLicenseName:$('[name="productLicenseName"]').val(),//产品名称
            productLicenseNum:$('[name="productLicenseNum"]').val(),//证书编号
            productLicenseAddress:$('[name="productLicenseAddress"]').val(),//住所
            producingArea:$('[name="producingArea"]').val(),//生成地址
            productQuarantineMethod:$('[name="productQuarantineMethod"]').val(),//检验方式
            productTerm:$('[name="productTerm"]').val(),//有效期
            //机构信用代码证信息
            institutionCreditCode:$('[name="institutionCreditCode"]').val(),//代码
            institutionCreditTerm:$('[name="institutionCreditTerm"]').val(),//有效期
            institutionName:$('[name="institutionName"]').val(),//名称
            institutionAddress:$('[name="institutionAddress"]').val(),//地址
            //法人代表信息
            corporationName:$('[name="corporationName"]').val(),//姓名
            corporationSex:$('[name="corporationSex"]:checked').val(),//性别
            corporationIdNum:$('[name="corporationIdNum"]').val(),//身份证号
            corporationMaritalStatus:$('[name="corporationMaritalStatus"]').val(),//婚姻状况
            corporationAddress:$('[name="corporationAddress"]').val(),//家庭住址
            corporationPhone:$('[name="corporationPhone"]').val(),//电话
            corporationZipCode:$('[name="corporationZipCode"]').val(),//邮编
            //融资意向
            stockWineNum:$('[name="stockWineNum"]').val(),//库存酒总量
            stockWinePrice:removeSopt($('[name="stockWinePrice"]').val()),//库存基酒总价值
            mortgageWineNum:$('[name="mortgageWineNum"]').val(),//已抵押库存基酒
            mortgageWinePrice:removeSopt($('[name="mortgageWinePrice"]').val()),//已抵押库存基酒价值
            surplusWineNum:$('[name="surplusWineNum"]').val(),//未抵押库存基酒
            surplusWinePrice:removeSopt($('[name="surplusWinePrice"]').val()),//为抵押库存基酒价值
            financingNeed:removeSopt($('[name="financingNeed"]').val()),//融资需求
            financingBankName:$('[name="financingBankName"]').val(),//开户行
            financingUserName:$('[name="financingUserName"]').val(),//户名
            financingAccount:$('[name="financingAccount"]').val()//账号                                
        } 

        if(!$(form).valid()||(typeof $(_this).attr('disabled')!=='undefined')){//如果前端没有通过验证则返回
            return 
        }

        $(_this).attr('disabled','');
        if(is_winery&&is_winery_cur_node){//修改融资申请数据
            if(window.sessionStorage["modifyApply"] && window.sessionStorage["modifyApply"]!==''){
                var fileArray = JSON.parse(window.sessionStorage["modifyApply"]);
                param.files = fileArray;
                param.fileNames = fileArray;
            }            
            console.debug('修改融资申请数据');
            console.debug(param);
            param.inputData["businessKey"] = window.sessionStorage["businessKey"];
            param.inputData["taskId"] = window.sessionStorage["taskId"];
            HttpUtils.update_finance_info(param,function(data){
                if(data.statusCode=='200'){
                    var alertInfo = '修改融资申请数据成功';
                    auditSuccess(alertInfo);
                    $(_this).removeAttr('disabled');
                }
            })
            window.sessionStorage["modifyApply"] = '';

        }else{//新增融资申请数据
            if($('[name="businessLicenseType"]:checked').val()==1){//工商营业执照
                save_status = 1;
                /*最多*/
                param.files = ["businessPic","organizationCodePic","productLicensePic","taxRegistPic","accountLicensePic","institutionCreitPic","corporationBackPic","corporationFrontPic","wineryLivePic"];
                param.fileNames = ["businessPic","organizationCodePic","productLicensePic","taxRegistPic","accountLicensePic","institutionCreitPic","corporationBackPic","corporationFrontPic","wineryLivePic"];
            }

            if($('[name="businessLicenseType"]:checked').val()==2 && $('[name="yiZhaoYiMa"]:checked').val()==1){//营业执照  是
                save_status = 2;
                param.files = ["businessPic","accountLicensePic","productLicensePic","institutionCreitPic","corporationBackPic","corporationFrontPic","wineryLivePic"];
                param.fileNames = ["businessPic","accountLicensePic","productLicensePic","institutionCreitPic","corporationBackPic","corporationFrontPic","wineryLivePic"];
            }
            if($('[name="businessLicenseType"]:checked').val()==2 && $('[name="yiZhaoYiMa"]:checked').val()==0){//营业执照  否
                save_status = 3;
                /*最少*/
                param.inputData["taxWord"] = $('[data-name="taxWord"]').val();//税务登记字
                param.inputData["taxNum"] = $('[data-name="taxNum"]').val();//税务登记号
                param.files = ["businessPic","accountLicensePic","productLicensePic","institutionCreitPic","corporationBackPic","corporationFrontPic","wineryLivePic"];
                param.fileNames = ["businessPic","accountLicensePic","productLicensePic","institutionCreitPic","corporationBackPic","corporationFrontPic","wineryLivePic"];
            }

            console.debug('融资申请传输给后端的数据');
            console.debug(param)
            HttpUtils.post_financ_data(param,function(data){
               if(data.statusCode=='200'){
                    var alertInfo = $(_this).attr('data-info');
                    auditSuccess(alertInfo);
                    $(_this).removeAttr('disabled');
                }
            })
        }                    

    })




    //回显酒厂数据
    HttpUtils.get_finance_info_echo_data({businessKey:window.sessionStorage["businessKey"]},function(data){
            console.debug('融资申请回显数据');
            console.debug(data);
            var cur_data = data.data.financeInfo;
            var cur_company_name = cur_data && cur_data.applicantCompany?cur_data.applicantCompany:data.data.InstitutionName;
            $('[name="InstitutionName"]').text(cur_company_name);
            $('[name="applicantCompany"]').val(cur_company_name);

            if(!cur_data){
                return 
            }

            var winery_update = is_winery&&is_winery_cur_node;
            //办理信息回显
            showManageInfo(form,data.data);
            $('[data-management-time]').text('办理时间：'+cur_data.updateAt);

            //营业执照信息

            var bus_type = cur_data.businessLicenseType;
            var yi_zhao_yi_ma = cur_data.yiZhaoYiMa;
            $('[name="applicantCompany"]').val(cur_data.applicantCompany);//申请单位
            $('[name="businessLicenseType"][value="'+bus_type+'"]').prop('checked','checked');//营业执照类型
            if(bus_type=='2'){
                if(yi_zhao_yi_ma=='1'){
                    setSecondeStatus(winery_update);
                }else if(yi_zhao_yi_ma=='0'){
                    setThreeStatus(winery_update);
                    $('[data-name="taxWord"]').val(cur_data.taxWord);
                    $('[data-name="taxNum"]').val(cur_data.taxNum);
                }   
            }

            $('[name="businessRegistNum"]').val(cur_data.businessRegistNum);//注册号
            $('[name="yiZhaoYiMa"][value="'+cur_data.yiZhaoYiMa+'"]').prop('checked','checked');//一照一码
            
            $('[name="unifiedSocialCredit"]').val(cur_data.unifiedSocialCredit),//统一社会信用代码
            $('[name="organizationCodeLicenseNum"]').val(cur_data.organizationCodeLicenseNum);//组织机构代码

            //注意此处取值
            $('[name="taxWord"]').val(cur_data.taxWord);//税务登记字
            $('[name="taxNum"]').val(cur_data.taxNum);//税务登记号

            $('[name="companyName"]').val(cur_data.companyName);//公司名称
            $('[name="companyType"]').val(cur_data.companyType);//公司类型
            $('[name="residence"]').val(cur_data.residence);//住所
            $('[name="businessLegalRepresentative"]').val(cur_data.businessLegalRepresentative);//法人代表
            $('[name="registeredCapital"]').val(cur_data.registeredCapital);//注册资本
            $('[name="establishDate"]').val(cur_data.establishDate);//成立日期
            $('[name="businessTerm"]').val(cur_data.businessTerm);//营业期限
            $('[name="businessRange"]').val(cur_data.businessRange);//经营范围
            //组织机构代码证信息
            $('[name="organizationCode"]').val(cur_data.organizationCode);//代码   
            $('[name="organizationRegistNum"]').val(cur_data.organizationRegistNum);//登记号         
            $('[name="organizationName"]').val(cur_data.organizationName);//机构名称
            $('[name="organizationType"]').val(cur_data.organizationType);//机构类型
            $('[name="organizationAddress"]').val(cur_data.organizationAddress);//地址
            $('[name="organizationTerm"]').val(cur_data.organizationTerm);//有效期
            $('[name="issuingUnit"]').val(cur_data.issuingUnit); //颁发单位
            //税务登记
            $('[name="taxpayerName"]').val(cur_data.taxpayerName),//纳税人名称
            $('[name="taxLegalRepresentative"]').val(cur_data.taxLegalRepresentative);//法定代表人
            $('[name="taxAddress"]').val(cur_data.taxAddress);//地址
            $('[name="taxRange"]').val(cur_data.taxRange);//经营范围
            $('[name="taxType"]').val(cur_data.taxType);//登记类型
            $('[name="taxApprovedUnit"]').val(cur_data.taxApprovedUnit);//批准设立机关
            //开户许可证信息
            $('[name="accountLicenseNum"]').val(cur_data.accountLicenseNum);//编号
            $('[name="accountCheckNum"]').val(cur_data.accountCheckNum);//核准号
            $('[name="accountLegalRepresentative"]').val(cur_data.accountLegalRepresentative);//法定代表人
            $('[name="accountBankName"]').val(cur_data.accountBankName);//开户银行
            $('[name="bankAccount"]').val(cur_data.bankAccount);//账号
            //全国工业品生产许可证信息
            $('[name="productLicenseName"]').val(cur_data.productLicenseName);//产品名称
            $('[name="productLicenseNum"]').val(cur_data.productLicenseNum),//证书编号
            $('[name="productLicenseAddress"]').val(cur_data.productLicenseAddress);//住所
            $('[name="producingArea"]').val(cur_data.producingArea);//生成地址
            $('[name="productQuarantineMethod"]').val(cur_data.productQuarantineMethod);//检验方式
            $('[name="productTerm"]').val(cur_data.productTerm);//有效期
            //机构信用代码证信息
            $('[name="institutionCreditCode"]').val(cur_data.institutionCreditCode);//代码
            $('[name="institutionCreditTerm"]').val(cur_data.institutionCreditTerm);//有效期
            $('[name="institutionName"]').val(cur_data.institutionName);//名称
            $('[name="institutionAddress"]').val(cur_data.institutionAddress);//地址
            //法人代表信息
            $('[name="corporationName"]').val(cur_data.corporationName);//姓名
            $('[name="corporationSex"][value="'+cur_data.corporationSex+'"]').prop('checked',true);//性别
            $('[name="corporationIdNum"]').val(cur_data.corporationIdNum),//身份证号
            $('[name="corporationMaritalStatus"]').val(cur_data.corporationMaritalStatus);//婚姻状况
            $('[name="corporationAddress"]').val(cur_data.corporationAddress);//家庭住址
            $('[name="corporationPhone"]').val(cur_data.corporationPhone),//电话
            $('[name="corporationZipCode"]').val(cur_data.corporationZipCode);//邮编
            //融资意向
            $('[name="stockWineNum"]').val(cur_data.stockWineNum);//库存酒总量

            /*money*/
            $('[name="stockWinePrice"]').val(renderNum(cur_data.stockWinePrice));//库存基酒总价值

            $('[name="mortgageWineNum"]').val(cur_data.mortgageWineNum);//已抵押库存基酒

            /*money*/
            $('[name="mortgageWinePrice"]').val(renderNum(cur_data.mortgageWinePrice));//已抵押库存基酒价值

            
            $('[name="surplusWineNum"]').val(cur_data.surplusWineNum);//未抵押库存基酒

            /*money*/
            $('[name="surplusWinePrice"]').val(renderNum(cur_data.surplusWinePrice));//为抵押库存基酒价值

            /*money*/
            $('[name="financingNeed"]').val(renderNum(cur_data.financingNeed));//融资需求


            $('[name="financingBankName"]').val(cur_data.financingBankName);//开户行
            $('[name="financingUserName"]').val(cur_data.financingUserName);//户名
            $('[name="financingAccount"]').val(cur_data.financingAccount)//账号


            var need_claim = data.data.needClaim
            need_claim?claim():review();
            //文件回显

            if(cur_data.businessPic){
                var bus_text = cur_data.businessPic.name;
                var bus_id = cur_data.businessPic.id;
                var bus_type = cur_data.businessPic.type;
                setAccessory('[name="businessPic"]',bus_text,bus_id,bus_type,need_claim);
            }

            if(cur_data.corporationBackPic){
                var cor_back_text = cur_data.corporationBackPic.name;
                var cor_back_id = cur_data.corporationBackPic.id;
                var cor_back_type = cur_data.corporationBackPic.type;
                setAccessory('[name="corporationBackPic"]',cor_back_text,cor_back_id,cor_back_type,need_claim);
            }

            if(cur_data.corporationFrontPic){
                var acc_front_text = cur_data.corporationFrontPic.name;
                var acc_front_id = cur_data.corporationFrontPic.id;
                var acc_front_type = cur_data.corporationFrontPic.type;
                setAccessory('[name="corporationFrontPic"]',acc_front_text,acc_front_id,acc_front_type,need_claim);
            }

            if(cur_data.institutionCreitPic){
                var ins_text = cur_data.institutionCreitPic.name;
                var ins_id = cur_data.institutionCreitPic.id;
                var ins_type = cur_data.institutionCreitPic.type;
                setAccessory('[name="institutionCreitPic"]',ins_text,ins_id,ins_type,need_claim);
            }

            if(cur_data.organizationCodePic){
                var org_text = cur_data.organizationCodePic.name;
                var org_id = cur_data.organizationCodePic.id;
                var org_type = cur_data.organizationCodePic.type;
                setAccessory('[name="organizationCodePic"]',org_text,org_id,org_type,need_claim);
            }

            if(cur_data.productLicensePic){
                var prod_text = cur_data.productLicensePic.name;
                var prod_id = cur_data.productLicensePic.id;
                var prod_type = cur_data.productLicensePic.type;
                setAccessory('[name="productLicensePic"]',prod_text,prod_id,prod_type,need_claim);
            }

            if(cur_data.accountLicensePic){
                var acc_text = cur_data.accountLicensePic.name;
                var acc_id = cur_data.accountLicensePic.id;
                var acc_type = cur_data.accountLicensePic.type;
                setAccessory('[name="accountLicensePic"]',acc_text,acc_id,acc_type,need_claim);
            }
            if(cur_data.taxRegistPic){
                var tax_text = cur_data.taxRegistPic.name;
                var tax_id = cur_data.taxRegistPic.id;
                var tax_type = cur_data.taxRegistPic.type;
                setAccessory('[name="taxRegistPic"]',tax_text,tax_id,tax_type,need_claim);
            }
            if(cur_data.wineryLivePic){
                var win_text = cur_data.wineryLivePic.name;
                var win_id = cur_data.wineryLivePic.id;
                var win_type = cur_data.wineryLivePic.type;
                setAccessory('[name="wineryLivePic"]',win_text,win_id,win_type,need_claim);
            }    

        });


})