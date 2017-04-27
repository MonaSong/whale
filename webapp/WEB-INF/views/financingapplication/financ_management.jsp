<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %> 
<%@ include file="../layouts/left.jsp"%>
<link href="<%=request.getContextPath()%>/css/financmanagement/financ_management.css" rel="stylesheet">
    <script src="<%=request.getContextPath()%>/js/financmanagement/financ_manegement_requestData.js"></script>
<script src="<%=request.getContextPath()%>/js/financmanagement/financ_management.js"></script>
<title>融资申请</title>
<!-- 首页内容显示区 -->
<div  class="main-content-container">
         <div class="s-container">
            <div name="publicError"></div>
            <!-- 页面主体内容 -->             
             <div class="s-page-content">
                   <div class="whale-well whale-well-min clearfix">
                      <div class="whale-well-headding pull-left">
                          <h4 class="whale-well-title">融资申请</h4>
                      </div>                     
                   </div>
                   <div id="left-menu" class="left-menu">
                        <%@ include file="../layouts/finance_menu.jsp"%>
                   </div>
                   <div class="form-container">
                            <div class="container whale-container">    
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="min-height-500-box clearfix">
                                            <form role="form" action="" class="clearfix bg-white" id="finance-application-form">
                		                           <div class="form-horizontal form-data-pane clearfix">
                                                        <div class="col-md-12">
                                                            <div class="form-group ">
                                                                <span class="pull-right hide-status text-static" data-management-info="">
                                                                    <b data-role-name=""></b>
                                                                    <b data-true-name=""></b>
                                                                    <b data-management-time=""></b>
                                                                </span>
                                                                <h4 class="col-md-5 black finance-title">融资申请（<span name="InstitutionName"></span>）</h4>
                                                            </div>
                                                            <div class="form-group ">
                                                                <label class="col-md-3 text-right control-label ">申请单位：</label>
                                                                <div class="col-md-7">
                                                                    <input class="form-control" disabled name="applicantCompany" value="">
                                                                </div>
                                                            </div>
                                                        </div>
                		                                
                		                                <!-- 营业执照信息 -->
                		                                <div class="whale-pane col-md-12">
                		                                     <div class="whale-pane-heading">
                		                                           <h4 class="whale-pane-title">营业执照信息</h4>
                		                                     </div>
                		                                     <div class="whale-pane-body">
                		                                            <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label">营业执照类型：</label>
                                                                        <div class="col-md-7 no-padding-right no-padding-left license-type-info" id="chose-businessLicense-type">
                		                                                        <label class="col-md-3 control-label text-left no-padding-left"><input  type="radio" name="businessLicenseType" value="1" >工商营业执照 </label>
                		                                                        <label class="col-md-3 control-label text-left"><input  type="radio" name="businessLicenseType" value="2" checked >营业执照(三证合一)</label>
                                                                        </div>
                                                                    </div>

                                                                    <div class="form-group" data-yizhaoyima="">
                                                                        <label class="col-md-3 text-right control-label">一照一码：</label>
                                                                        <div class="col-md-7 static-text" id="yi-zhao-yi-ma">
                                                                            <label><input type="radio" class="" name="yiZhaoYiMa" value="1" checked>是</label>
                                                                            <label><input type="radio" class="" name="yiZhaoYiMa" value="0">否</label>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div class="form-group" data-id="businessRegistNum">
                                                                            <label class="col-md-3 text-right control-label "><b class="red">*</b>注册号：</label>
                                                                            <div class="col-md-7">
                                                                                <input type="text" class="form-control" name="businessRegistNum" value="">
                                                                            </div>
                                                                        </div>

                                                                        <div class="form-group" data-tongyi="">
                                                                            <label class="col-md-3 text-right control-label "><b class="red">*</b>统一社会信用代码：</label>
                                                                            <div class="col-md-7">
                                                                            <input type="text" class="form-control" name="unifiedSocialCredit" value="">
                                                                            </div>
                                                                        </div>
                                                                        <div class="form-group" data-zuzhicode="">
                                                                            <label class="col-md-3 text-right control-label "><b class="red">*</b>组织机构代码证：</label>
                                                                            <div class="col-md-7">
                                                                            <input type="text" class="form-control" name="organizationCodeLicenseNum" value="">
                                                                            </div>
                                                                        </div>
                                                                        <div class="form-group" data-tax="">
                                                                            <label class="col-md-3 text-right control-label "><b class="red">*</b>税务登记号：</label>
                                                                            <div class="col-md-3">
                                                                                <input type="text" class="form-control" data-name="taxWord" name="noTaxWord" value=""> 
                                                                            </div>
                                                                            <span class="col-md-1 text-static">字</span>
                                                                            <div class="col-md-3">
                                                                                <input type="text" class="form-control" data-name="taxNum" name="noTaxNum" value="">
                                                                            </div>
                                                                            <span class="col-md-1 text-static">号</span>

                                                                        </div>                                                        
                                                                    </div>

                                                                   <span class="clearfix"></span>
                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>名称：</label>
                                                                        <div class="col-md-7">
                                                                            <input class="form-control" placeholder="" name="companyName" value="">
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>公司类型：</label>
                                                                        <div class="col-md-3">
                                                                            <input class="form-control" placeholder="" name="companyType" value="">
                                                                        </div>
                                                                    </div>  
                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>住所：</label>
                                                                        <div class="col-md-7">
                                                                            <input class="form-control" placeholder="" name="residence" value="">
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        
                                                                            <label class="col-md-3 text-right control-label"><b class="red">*</b>法定代表人：</label>
                                                                            <div class="col-md-3">
                                                                                <input class="form-control" placeholder="" name="businessLegalRepresentative" value="">
                                                                            </div>
                                                                        
                                                                        
                                                                        
                                                                            <label class="col-md-1 text-right control-label "><b class="red">*</b>注册资本：</label>
                                                                            <div class="col-md-3">
                                                                                <input class="form-control" placeholder="" name="registeredCapital" value="">
                                                                            </div>
                                                                        
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>成立日期：</label>
                                                                        <div class="col-md-3">
                                                                            <input class="form-control" placeholder="" name="establishDate" value="" data-date>
                                                                        </div>
                                                                        <label class="col-md-1 text-right control-label "><b class="red">*</b>营业期限：</label>
                                                                        <div class="col-md-3">
                                                                            <input class="form-control" placeholder="" name="businessTerm" value="">
                                                                        </div>
                                                                    </div> 
                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>经营范围：</label>
                                                                        <div class="col-md-7">
                                                                            <textarea class="form-control" placeholder="" name="businessRange" value="室内装修、物流"></textarea>
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>营业执照电子版正本：</label>
                                                                        <div class="col-md-7">
                                                                            <input class="form-control" type="file" accept="image/jpg,image/jpeg,image/gif,image/bmp,image/png"  placeholder="" name="businessPic" id="businessPic">
                                                                        </div>
                                                                    </div>
                		                                     </div>
                		                                </div>
                		                                
                		                                <!-- 组织机构代码证信息 -->
                		                                <div class="whale-pane col-md-12" data-pane-zuzhi="">
                                                             <div class="whale-pane-heading">
                                                                   <h4 class="whale-pane-title">组织机构代码证信息</h4>
                                                             </div>
                                                             <div class="whale-pane-body">
                                                                   <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>代码：</label>
                                                                        <div class="col-md-3">
                                                                            <input class="form-control" placeholder="" name="organizationCode" value="">
                                                                        </div>
                                                                        <label class="col-md-1 text-right control-label "><b class="red">*</b>登记号：</label>
                                                                        <div class="col-md-3">
                                                                            <input class="form-control" placeholder="" name="organizationRegistNum" value="">
                                                                        </div>
                                                                    </div>  

                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>机构名称：</label>
                                                                        <div class="col-md-7">
                                                                            <input class="form-control" placeholder="" name="organizationName" value="">
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>机构类型：</label>
                                                                        <div class="col-md-3">
                                                                            <input class="form-control" placeholder="" name="organizationType" value="">
                                                                        </div>
                                                                    </div>  
                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>地址：</label>
                                                                        <div class="col-md-7">
                                                                            <input class="form-control" placeholder="" name="organizationAddress" value="">
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>有效期：</label>
                                                                        <div class="col-md-3">
                                                                            <input class="form-control" placeholder="" name="organizationTerm" value="">
                                                                        </div>
                                                                        <label class="col-md-1 text-right control-label "><b class="red">*</b>颁发单位：</label>
                                                                        <div class="col-md-3">
                                                                            <input class="form-control" placeholder="" name="issuingUnit" value="">
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>组织机构代码证：</label>
                                                                        <div class="col-md-7">
                                                                            <input type="file" accept="image/jpg,image/jpeg,image/gif,image/bmp,image/png" class="form-control" placeholder="" name="organizationCodePic" id="organizationCodePic">
                                                                        </div>
                                                                    </div>                                                     
                                                             </div>
                                                        </div>
                                                        
                                                        <!-- 税务登记证信息 -->
                                                        <div class="whale-pane col-md-12" data-pane-tax>
                                                             <div class="whale-pane-heading">
                                                                   <h4 class="whale-pane-title">税务登记证信息</h4>
                                                             </div>
                                                             <div class="whale-pane-body">
                                                                   <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>税务登记号：</label>
                                                                        <div class="col-md-9">
                                                                            <div class="col-md-4 no-padding-left">
                                                                                <input class="form-control" placeholder="" name="taxWord" value="">
                                                                            </div>   
                                                                            <div class="col-md-1 text-static">字</div>
                                                                            <div class="col-md-4">
                                                                                <input class="form-control" placeholder="" name="taxNum" value="">
                                                                            </div>   
                                                                            <div class="col-md-1 text-static">号</div>
                                                                        </div>
                                                                    </div>  
                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>纳税人名称：</label>
                                                                        <div class="col-md-7">
                                                                            <input class="form-control" placeholder="" name="taxpayerName" value="">
                                                                        </div>
                                                                    </div> 
                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>法定代表人：</label>
                                                                        <div class="col-md-3">
                                                                            <input class="form-control" placeholder="" name="taxLegalRepresentative" value="">
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>地址：</label>
                                                                        <div class="col-md-7">
                                                                            <input class="form-control" placeholder="" name="taxAddress" value="">
                                                                        </div>
                                                                    </div>  
                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>经营范围：</label>
                                                                        <div class="col-md-7">
                                                                            <textarea class="form-control" placeholder="" name="taxRange" value=""></textarea>
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>登记注册类型：</label>
                                                                        <div class="col-md-3">
                                                                            <input class="form-control" placeholder="" name="taxType" value="">
                                                                        </div>
                                                                        <label class="col-md-1 text-right control-label long-text"><b class="red">*</b>批准设立机关：</label>
                                                                        <div class="col-md-3">
                                                                            <input class="form-control" placeholder="" name="taxApprovedUnit" value="">
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>税务登记证：</label>
                                                                        <div class="col-md-7">
                                                                            <input class="form-control" accept="image/jpg,image/jpeg,image/gif,image/bmp,image/png" type="file" placeholder="" name="taxRegistPic" id="taxRegistPic" value="">
                                                                        </div>
                                                                    </div>                                                     
                                                             </div>
                                                        </div>
                                                        
                                                        
                                                        <!-- 开户许可证信息 -->
                                                        <div class="whale-pane col-md-12">
                                                             <div class="whale-pane-heading">
                                                                   <h4 class="whale-pane-title">开户许可证信息</h4>
                                                             </div>
                                                             <div class="whale-pane-body">
                                                                   <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>编号：</label>
                                                                        <div class="col-md-3">
                                                                            <input class="form-control" placeholder="" name="accountLicenseNum" value="">
                                                                        </div>
                                                                        <label class="col-md-1 text-right control-label "><b class="red">*</b>核准号：</label>
                                                                        <div class="col-md-3">
                                                                            <input class="form-control" placeholder="" name="accountCheckNum" value="">
                                                                        </div>
                                                                    </div>  

                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>法定代表人：</label>
                                                                        <div class="col-md-3">
                                                                            <input class="form-control" placeholder="" name="accountLegalRepresentative" value="">
                                                                        </div>
                                                                        <label class="col-md-1 text-right control-label "><b class="red">*</b>开户银行：</label>
                                                                        <div class="col-md-3">
                                                                            <input class="form-control" placeholder="" name="accountBankName" value="">
                                                                        </div>
                                                                    </div>

                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>账号：</label>
                                                                        <div class="col-md-3">
                                                                            <input class="form-control" placeholder="" name="bankAccount" value="">
                                                                        </div>
                                                                    </div> 
                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>开户许可证扫描件：</label>
                                                                        <div class="col-md-7">
                                                                            <input type="file" accept="image/jpg,image/jpeg,image/gif,image/bmp,image/png" class="form-control" placeholder="" name="accountLicensePic" id="accountLicensePic">
                                                                        </div>
                                                                    </div>                                                                                                       
                                                             </div>
                                                        </div>
                                                        
                                                        
                                                        <!-- 全国工业品生产许可证信息 -->
                                                        <div class="whale-pane col-md-12">
                                                             <div class="whale-pane-heading">
                                                                   <h4 class="whale-pane-title">全国工业产品生产许可证信息</h4>
                                                             </div>
                                                             <div class="whale-pane-body">
                                                                   <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>产品名称：</label>
                                                                        <div class="col-md-3">
                                                                            <input class="form-control" placeholder="" name="productLicenseName" value="">
                                                                        </div>
                                                                        <label class="col-md-1 text-right control-label "><b class="red">*</b>证书编号：</label>
                                                                        <div class="col-md-3">
                                                                            <input class="form-control" placeholder="" name="productLicenseNum" value="">
                                                                        </div>
                                                                    </div>  

                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>住所：</label>
                                                                        <div class="col-md-7">
                                                                            <input class="form-control" placeholder="" name="productLicenseAddress" value="">
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>生产地址：</label>
                                                                        <div class="col-md-7">
                                                                            <input class="form-control" placeholder="" name="producingArea" value="">
                                                                        </div>
                                                                    </div>  
                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>检验方式：</label>
                                                                        <div class="col-md-3">
                                                                            <input class="form-control" placeholder="" name="productQuarantineMethod" value="">
                                                                        </div>
                                                                        <label class="col-md-1 text-right control-label "><b class="red">*</b>有效期：</label>
                                                                        <div class="col-md-3">
                                                                            <input class="form-control" placeholder="" name="productTerm" value="">
                                                                        </div>
                                                                    </div> 

                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>全国工业产品生产许可证扫描件：</label>
                                                                        <div class="col-md-7">
                                                                            <input class="form-control" accept="image/jpg,image/jpeg,image/gif,image/bmp,image/png" type="file" name="productLicensePic" id="productLicensePic">
                                                                        </div>
                                                                    </div>                                                                                                      
                                                             </div>
                                                        </div>
                                                        
                                                        <!-- 机构信用代码证信息 -->
                                                        <div class="whale-pane col-md-12">
                                                             <div class="whale-pane-heading">
                                                                   <h4 class="whale-pane-title">机构信用代码证信息</h4>
                                                             </div>
                                                             <div class="whale-pane-body">
                                                                   <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>代码：</label>
                                                                        <div class="col-md-3">
                                                                            <input class="form-control" placeholder="" name="institutionCreditCode" value="">
                                                                        </div>
                                                                        <label class="col-md-1 text-right control-label "><b class="red">*</b>有效期：</label>
                                                                        <div class="col-md-3">
                                                                            <input class="form-control" placeholder="" name="institutionCreditTerm" value="">
                                                                        </div>
                                                                    </div>  

                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>名称：</label>
                                                                        <div class="col-md-7">
                                                                            <input class="form-control" placeholder="" name="institutionName" value="">
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>地址：</label>
                                                                        <div class="col-md-7">
                                                                            <input class="form-control" placeholder="" name="institutionAddress" value="">
                                                                        </div>
                                                                    </div>  
                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>机构信用代码证扫描件：</label>
                                                                        <div class="col-md-7">
                                                                            <input class="form-control" accept="image/jpg,image/jpeg,image/gif,image/bmp,image/png" type="file" name="institutionCreitPic" id="institutionCreitPic">
                                                                        </div>
                                                                    </div>                                                                                                      
                                                             </div>
                                                        </div>
                                                        
                                                        <!-- 法人代表信息 -->
                                                        <div class="whale-pane col-md-12">
                                                             <div class="whale-pane-heading">
                                                                   <h4 class="whale-pane-title">法人代表信息</h4>
                                                             </div>
                                                             <div class="whale-pane-body">
                                                                   <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>姓名：</label>
                                                                        <div class="col-md-3">
                                                                            <input class="form-control" placeholder="" name="corporationName" value="">
                                                                        </div>
                                                                        <label class="col-md-1 text-right control-label ">性别:</label>
                                                                        <div class="col-md-3 static-text sex-info-container">
                                                                           <label><input type="radio" name="corporationSex"  value="0">男</label>
                                                                           <label><input type="radio" name="corporationSex" checked value="1">女</label>
                                                                        </div>
                                                                    </div>  

                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>身份证号：</label>
                                                                        <div class="col-md-3">
                                                                            <input class="form-control" placeholder="" name="corporationIdNum" value="">
                                                                        </div>
                                                                        <label class="col-md-1 text-right control-label "><b class="red">*</b>婚姻状况：</label>
                                                                        <div class="col-md-3">
                                                                            <select name="corporationMaritalStatus" class="form-control" required>
                                                                                 <option value=""></option>
                                                                                 <option value="1">已婚</option>
                                                                                 <option value="0">未婚</option>
                                                                                 <option value="2">离异</option>
                                                                                 <option value="-1">丧偶</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>  

                                                                    <div class="form-group">
                                                                    <label class="col-md-3 text-right control-label"><b class="red">*</b>家庭住址：</label>
                                                                    <div class="col-md-7">
                                                                    <input type="" name="corporationAddress" class="form-control" value="">
                                                                    </div>
                                                                    </div>

                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label"><b class="red">*</b>电话：</label>
                                                                        <div class="col-md-3">
                                                                        <input type="text" name="corporationPhone" class="form-control" value="">
                                                                        </div>
                                                                        <label class="col-md-1 text-right control-label"><b class="red">*</b>邮编：</label>
                                                                        <div class="col-md-3">
                                                                        <input type="text" name="corporationZipCode" class="form-control" value="">
                                                                        </div>
                                                                    </div>

                                                                    <div class="form-group">
                                                                    <label class="col-md-3 text-right control-label "><b class="red">*</b>身份证正面复印件：</label>
                                                                    <div class="col-md-7">
                                                                    <input type="file" accept="image/jpg,image/jpeg,image/gif,image/bmp,image/png" name="corporationFrontPic" id="corporationFrontPic" class="form-control">
                                                                    </div>
                                                                    </div>

                                                                    <div class="form-group">
                                                                    <label class="col-md-3 text-right control-label "><b class="red">*</b>身份证反面复印件：</label>
                                                                    <div class="col-md-7">
                                                                    <input type="file" accept="image/jpg,image/jpeg,image/gif,image/bmp,image/png" name="corporationBackPic" id="corporationBackPic" class="form-control">
                                                                    </div>
                                                                    </div>

                                                        </div>
                                                        </div>
                                                        
                                                        <!-- 酒厂现场信息 -->
                                                        <div class="whale-pane col-md-12">
                                                             <div class="whale-pane-heading">
                                                                   <h4 class="whale-pane-title">酒厂现场信息</h4>
                                                             </div>
                                                             <div class="whale-pane-body">
                                                                    <div class="form-group">
                                                                        <label class="col-md-3 text-right control-label "><b class="red">*</b>酒厂现场图片：</label>
                                                                        <div class="col-md-7">
                                                                        <input class="form-control" accept="image/jpg,image/jpeg,image/gif,image/bmp,image/png" placeholder="" type="file" name="wineryLivePic" id="wineryLivePic">
                                                                        </div>
                                                                    </div>
                                                             </div>
                                                        </div>
                                                        <!--融资意向-->
                                                        <div class="whale-pane col-md-12">
                                                        <div class="whale-pane-heading">
                                                        <h4 class="whale-pane-title">融资意向</h4>
                                                        </div>
                                                        <div class="whale-pane-body">

                                                            <div class="form-group">
                                                            <label class="col-md-3 text-right control-label "><b class="red">*</b>库存基酒总量：</label>
                                                            <div class="col-md-2">
                                                            <input  type="text"  data-role="whale-number" class="form-control" name="stockWineNum" value="" placeholder="">                                            
                                                            </div>
                                                            <div class="col-md-1 text-static">
                                                                吨
                                                            </div>
                                                            <label class="col-md-1 text-right control-label lg-long-text"><b class="red">*</b>库存基酒总价值：</label>
                                                            <div class="col-md-2">
                                                            <input type="text"  data-role="whale-money" placeholder="" class="form-control" name="stockWinePrice" value="">
                                                            </div>
                                                            <div class="col-md-1 text-static">
                                                                元
                                                            </div>

                                                            </div>

                                                            <div class="form-group">
                                                            <label class="col-md-3 text-right control-label "><b class="red">*</b>已抵质押库存基酒：</label>
                                                            <div class="col-md-2">
                                                            <input type="text"  data-role="whale-number" class="form-control" placeholder="" name="mortgageWineNum" value="">
                                                            </div>
                                                            <div class="col-md-1 text-static">
                                                                吨
                                                            </div>
                                                            <label class="col-md-1 text-right control-label lg-long-text"><b class="red">*</b>已抵质押库存基酒价值：</label>
                                                            <div class="col-md-2">
                                                            <input type="text"  data-role="whale-money" class="form-control" placeholder="" name="mortgageWinePrice" value="">
                                                            </div>
                                                            <div class="col-md-1 text-static">
                                                                元
                                                            </div>

                                                            </div>

                                                            <div class="form-group">
                                                                <label class="col-md-3 text-right control-label "><b class="red">*</b>未抵质押库存基酒：</label>
                                                                <div class="col-md-2">
                                                                <input type="text"  data-role="whale-number" class="form-control" name="surplusWineNum" value="">
                                                                </div>
                                                                <div class="col-md-1 text-static">
                                                                        吨
                                                                </div>

                                                                <label class="col-md-1 text-right control-label lg-long-text"> <b class="red">*</b>未抵质押库存基酒价值：</label>
                                                                <div class="col-md-2">
                                                                <input  type="text"  data-role="whale-money" class="form-control" name="surplusWinePrice" value="">
                                                                </div>
                                                                <div class="col-md-1 text-static">
                                                                    元
                                                                </div>
                                                            </div>
        
                                                            <div class="form-group">
                                                            <label class="col-md-3 text-right control-label "> <b class="red">*</b>融资需求：</label>
                                                            <div class="col-md-2">
                                                            <input type="text"  data-role="whale-money" class="form-control" name="financingNeed" value="">
                                                            </div>
                                                            <div class="col-md-1 text-static">
                                                                元
                                                            </div>
                                                            </div>

                                                            <div class="form-group">
                                                            <label class="col-md-3 text-right control-label "> <b class="red">*</b>开户行：</label>
                                                            <div class="col-md-7">
                                                            <input type="text" class="form-control" name="financingBankName" value="">
                                                            </div>
                                                            </div>

                                                            <div class="form-group">
                                                            <label class="col-md-3 text-right control-label "> <b class="red">*</b>户名：</label>
                                                            <div class="col-md-7">
                                                            <input type="text" class="form-control" name="financingUserName" value="">
                                                            </div>
                                                            </div>

                                                            <div class="form-group">
                                                            <label class="col-md-3 text-right control-label "><b class="red">*</b>账号：</label>
                                                            <div class="col-md-3">
                                                            <input type="text" class="form-control" name="financingAccount" value="">
                                                            </div>
                                                            </div>
                                                            <div class="form-group" data-operator>
                                                                <div class="col-md-12 col-md-offset-3 btn-choose">
                                                                <a href="" class="btn btn-default btn-gray btn-cancel" data-back-to>取消</a>
                                                                <span class="btn btn-primary btn-red btn-confirm col-md-offset-1" data-role="submit-form" data-info="融资申请成功">确定</span>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                                       		                                
                		                           </div>
                                            </form>
                                       </div>
                                    </div>
                               </div>
                        </div>
                   </div>                            
             </div>
         </div>
    </div>