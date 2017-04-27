<%@page import="javax.swing.text.AbstractDocument.Content"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../layouts/left.jsp"%>
<%@ include file="../common/global.jsp"%>
<link href="<%=request.getContextPath()%>/css/main/main.css" rel="stylesheet">

<!-- 首页内容显示区 -->
<div  class="main-content-container">
         <div class="s-container">
            <!-- 步骤图 -->
             <div class="s-nav">
                  <ul>
                    <li data-value="融资申请"><a href="#b1">融资申请</a></li>
                    <li data-value="信息审核"><a href="#b2">信息审核</a></li>
                    <li data-value="资质审核"><a href="#b3">资质审核</a></li>
                    <li data-value="上传合同"><a href="#b4">上传合同</a></li>
                    <li data-value="合同审核"><a href="#b5">合同审核</a></li>
                    <li data-value="质押物就位"><a href="#b6">质押物就位</a></li>
                    <li data-value="取样检测"><a href="#b7">取样检测</a></li>
                    <li data-value="质押物清单"><a href="#b8">质押物清单</a></li>
                    <li data-value="放款"><a href="#b9">放款</a></li>
                    <li data-value="确认到账"><a href="#b10">确认到账</a></li>
                 </ul>
             </div>
             <div class="s-page-content">
                <!-- 步骤内容 -->
                <div class="step-box">
                <div class="panel panel-default" data-user-role="jc21" data-id="b1" data-node-name="融资申请"  data-user-role-index="0">
				    <div class="panel-heading">融资申请表-酒厂</div>
				    <div class="panel-body">					  
		                <div class="col-xs-12">
		                     <form class="col-xs-12" role="search">
		                          <div class="form-group">
		                            <label class="col-xs-2 control-label no-padding-right text-right" for="">申请单位：</label>
		                            <div class="col-xs-7">
		                                <input type="text" class="form-control " placeholder="泸州老窖集团股份有限公司  3" readonly="">
		                            </div>
		                          </div>
		                    </form>                          
		                </div>
		                <div class="col-xs-12">
		                   <form class="col-xs-12" role="search" id="thisForm" action="<%=request.getContextPath()%>/loan/submitDateAndStartProcess" enctype="multipart/form-data" method="post">
		                        <div class="s-panel s-clearfix" id="b1">
		                             <div class="s-hr"><span><b>营业执照信息</b></span></div>
		                             <div class="form-group s-clearfix">
		                               <label class="col-xs-2 control-label no-padding-right text-right" for="">营业执照类型：</label>
		                               <div class="col-xs-7 radio radio-info radio-inline" id="zh-type">
		                                   <label><input type="radio" class="radio" name="zh" id="gs"><span>工商营业执照</span></label>
		                                   <label><input type="radio" class="radio" name="zh" id="three-gs"><span>营业执照（三证合一）</span></label>
		                               </div>
		                             </div>
		                             <div class="form-group" id="yzym">
		                               <label class="col-xs-2 control-label no-padding-right text-right" for="">一照一码：</label>
		                               <div class="col-xs-7 radio radio-info radio-inline">
		                                   <label><input type="radio" class="radio" name="zh"><span>是</span></label>
		                                   <label><input type="radio" class="radio" name="zh"><span>否</span></label>
		                               </div>
		                             </div>
		                             <div class="form-group" id="tydm">
		                               <label class="col-xs-2 control-label no-padding-right text-right" for="">统一社会信用代码：</label>
		                               <div class="col-xs-7">
		                                   <input type="text" class="form-control " placeholder="统一社会信用代码">
		                               </div>
		                             </div>
		                             <div class="form-group">
		                               <label class="col-xs-2 control-label no-padding-right text-right" for="">注册号：</label>
		                               <div class="col-xs-7">
		                                   <input type="text" class="form-control " placeholder="注册号">
		                               </div>
		                             </div>
		                             <div class="form-group">
		                               <label class="col-xs-2 control-label no-padding-right text-right" for="">名称：</label>
		                               <div class="col-xs-7">
		                                   <input type="text" class="form-control "  value="${data[0].busiAppData.certificateName}" placeholder="名称" name="certificateName">
		                               </div>
		                             </div>
		                             <div class="form-group">
		                               <label class="col-xs-2 control-label no-padding-right text-right" for="">公司类型：</label>
		                               <div class="col-xs-7">
		                                   <input type="text" class="form-control " placeholder="公司类型">
		                               </div>
		                             </div>
		                             <div class="form-group">
		                               <label class="col-xs-2 control-label no-padding-right text-right" for="">住所：</label>
		                               <div class="col-xs-7">
		                                   <input type="text" class="form-control " placeholder="住所">
		                               </div>
		                             </div>
		                             <div class="form-group">
		                               <label class="col-xs-2 control-label no-padding-right text-right" for="">法人代表姓名：</label>
		                               <div class="col-xs-7">
		                                   <input type="text" class="form-control " placeholder="法人代表姓名">
		                               </div>
		                             </div>
		                             <div class="form-group">
		                               <label class="col-xs-2 control-label no-padding-right text-right" for="">注册资本：</label>
		                               <div class="col-xs-7">
		                                   <input type="text" class="form-control " placeholder="注册资本">
		                               </div>
		                             </div>
		                             <div class="form-group">
		                               <label class="col-xs-2 control-label no-padding-right text-right" for="">成立日期</label>
		                               <div class="col-xs-7">
		                                   <input type="text" class="form-control " placeholder="成立日期">
		                               </div>
		                             </div>
		                             <div class="form-group">
		                               <label class="col-xs-2 control-label no-padding-right text-right" for="">营业期限：</label>
		                               <div class="col-xs-7">
		                                   <input type="text" class="form-control " placeholder="营业期限">
		                               </div>
		                             </div>
		                             <div class="form-group">
		                               <label class="col-xs-2 control-label no-padding-right text-right" for="">经营范围：</label>
		                               <div class="col-xs-7">
		                                   <textarea class="form-control"></textarea>
		                               </div>
		                             </div>
		                             <div class="form-group s-clearfix">
		                               <label class="col-xs-2 control-label no-padding-right text-right" >营业执照电子版正本：</label>
		                               <div class="col-xs-7">
		                                   <c:if test="${empty data[0].busiAppData.certificatePicture}">
		                                      <input type="file" name="zhfile" class="form-control">
		                                   </c:if>
		                                   <c:if test="${not empty data[0].busiAppData.certificatePicture}">
		                                       <a href="<%=request.getContextPath()%>/schedule/${data[0].busiAppData.certificatePicture}" download="${data[0].busiAppData.certificatePicture}">${data[0].busiAppData.certificatePicture}</a>
		                                   </c:if>
		                               </div>
		                             </div>                                                                                                                                       
		                     </div>
		                     <div class="s-panel s-clearfix" id="b01">
                                 <div class="s-hr"><span><b>组织机构代码证信息</b></span></div>
                                 <div class="form-group">
                                     <label class="col-xs-2 control-label no-padding-right text-right" >代码：</label>
                                     <div class="col-xs-7">
                                         <input type="text" class="form-control "  placeholder="代码">
                                     </div>
                                 </div>
                                 <div class="form-group">
                                     <label class="col-xs-2 control-label no-padding-right text-right" >登记号：</label>
                                     <div class="col-xs-7">
                                         <input type="text" class="form-control " placeholder="登记号">
                                     </div>
                                 </div>
                                 <div class="form-group">
                                     <label class="col-xs-2 control-label no-padding-right text-right" >机构名称：</label>
                                     <div class="col-xs-7">
                                         <input type="text" class="form-control " placeholder="机构名称">
                                     </div>
                                 </div>
                                 <div class="form-group">
                                     <label class="col-xs-2 control-label no-padding-right text-right" >机构类型：</label>
                                     <div class="col-xs-7">
                                         <input type="text" class="form-control " placeholder="机构类型">
                                     </div>
                                 </div>
                                 <div class="form-group">
                                     <label class="col-xs-2 control-label no-padding-right text-right" >地址：</label>
                                     <div class="col-xs-7">
                                         <input type="text" class="form-control " placeholder="地址">
                                     </div>
                                 </div>
                                 <div class="form-group">
                                     <label class="col-xs-2 control-label no-padding-right text-right" >有效期：</label>
                                     <div class="col-xs-7">
                                         <input type="text" name="" class="form-control" placeholder="有效期" >
                                     </div>
                                 </div>
                                 <div class="form-group">
                                     <label class="col-xs-2 control-label no-padding-right text-right" >颁发单位：</label>
                                     <div class="col-xs-7">
                                         <input type="text" name="" class="form-control" placeholder="颁发单位">
                                     </div>
                                 </div>
                                 <div class="form-group">
                                     <label class="col-xs-2 control-label no-padding-right text-right" >组织机构代码证扫描件：</label>
                                     <div class="col-xs-7">
                                         <input type="file" name="" class="form-control" >
                                     </div>
                                 </div>
                             </div>
                             <div class="s-panel s-clearfix" id="b02">
                                 <div class="s-hr"><span><b>税务登记证信息</b></span></div>
                                 <div class="form-group">
                                     <label class="col-xs-2 control-label no-padding-right text-right" >登记号：</label>
                                     <div class="col-xs-7">
                                         <input type="text" class="form-control "  placeholder="登记号">
                                     </div>
                                 </div>
                                 <div class="form-group">
                                     <label class="col-xs-2 control-label no-padding-right text-right" >纳税人名称：</label>
                                     <div class="col-xs-7">
                                         <input type="text" class="form-control " placeholder="纳税人名称">
                                     </div>
                                 </div>
                                 <div class="form-group">
                                     <label class="col-xs-2 control-label no-padding-right text-right" >法定代表人（负责人）姓名：</label>
                                     <div class="col-xs-7">
                                         <input type="text" class="form-control " placeholder="法定代表人（负责人）姓名">
                                     </div>
                                 </div>
                                 <div class="form-group">
                                     <label class="col-xs-2 control-label no-padding-right text-right" >地址：</label>
                                     <div class="col-xs-7">
                                         <input type="text" class="form-control " placeholder="地址">
                                     </div>
                                 </div>
                                 <div class="form-group">
                                     <label class="col-xs-2 control-label no-padding-right text-right" >经营范围：</label>
                                     <div class="col-xs-7">
                                         <input type="text" class="form-control " placeholder="经营范围">
                                     </div>
                                 </div>
                                 <div class="form-group">
                                     <label class="col-xs-2 control-label no-padding-right text-right" >等级注册类型：</label>
                                     <div class="col-xs-7">
                                         <input type="text" name="" class="form-control" placeholder="等级注册类型" >
                                     </div>
                                 </div>
                                 <div class="form-group">
                                     <label class="col-xs-2 control-label no-padding-right text-right" >批准设立机关：</label>
                                     <div class="col-xs-7">
                                         <input type="text" name="" class="form-control" placeholder="批准设立机关">
                                     </div>
                                 </div>
                                 <div class="form-group">
                                     <label class="col-xs-2 control-label no-padding-right text-right" >税务等级扫描证件：</label>
                                     <div class="col-xs-7">
                                         <input type="file" name="" class="form-control" >
                                     </div>
                                 </div>
                             </div>
		                     <div class="s-panel s-clearfix">
		                         <div class="s-hr"><span><b>开户许可证信息</b></span></div>
		                         <div class="form-group">
		                             <label class="col-xs-2 control-label no-padding-right text-right" >编号：</label>
		                             <div class="col-xs-7">
		                                 <input type="text" class="form-control "  placeholder="营业期限">
		                             </div>
		                         </div>
		                         <div class="form-group">
		                             <label class="col-xs-2 control-label no-padding-right text-right" >核准号：</label>
		                             <div class="col-xs-7">
		                                 <input type="text" class="form-control " placeholder="核准号">
		                             </div>
		                         </div>
		                         <div class="form-group">
		                             <label class="col-xs-2 control-label no-padding-right text-right" >法定代表人：</label>
		                             <div class="col-xs-7">
		                                 <input type="text" class="form-control " placeholder="法定代表人">
		                             </div>
		                         </div>
		                         <div class="form-group">
		                             <label class="col-xs-2 control-label no-padding-right text-right" >卡户银行：</label>
		                             <div class="col-xs-7">
		                                 <input type="text" class="form-control " placeholder="开户银行">
		                             </div>
		                         </div>
		                         <div class="form-group">
		                             <label class="col-xs-2 control-label no-padding-right text-right" >账号：</label>
		                             <div class="col-xs-7">
		                                 <input type="text" class="form-control " placeholder="账号">
		                             </div>
		                         </div>
		                         <div class="form-group">
		                             <label class="col-xs-2 control-label no-padding-right text-right" >开户许可证扫描件：</label>
		                             <div class="col-xs-7">
		                                 <input type="file" name="" class="form-control">
		                             </div>
		                         </div>		                         
		                     </div>
		                      <div class="s-panel s-clearfix" id="b03">
                                 <div class="s-hr"><span><b>全国工业品生产许可证信息</b></span></div>
                                 <div class="form-group">
                                     <label class="col-xs-2 control-label no-padding-right text-right" >产品名称：</label>
                                     <div class="col-xs-7">
                                         <input type="text" class="form-control " placeholder="产品名称">
                                     </div>
                                 </div>
                                 <div class="form-group">
                                     <label class="col-xs-2 control-label no-padding-right text-right" >证书编号：</label>
                                     <div class="col-xs-7">
                                         <input type="text" class="form-control " placeholder="证书编号">
                                     </div>
                                 </div>
                                 <div class="form-group">
                                     <label class="col-xs-2 control-label no-padding-right text-right" >住所：</label>
                                     <div class="col-xs-7">
                                         <input type="text" class="form-control " placeholder="住所">
                                     </div>
                                 </div>
                                 <div class="form-group">
                                     <label class="col-xs-2 control-label no-padding-right text-right" >生产地址：</label>
                                     <div class="col-xs-7">
                                         <input type="text" class="form-control " placeholder="生产地址">
                                     </div>
                                 </div>
                                 <div class="form-group">
                                     <label class="col-xs-2 control-label no-padding-right text-right" >检验方式：</label>
                                     <div class="col-xs-7">
                                         <input type="text" class="form-control " placeholder="检验方式">
                                     </div>
                                 </div>
                                 <div class="form-group">
                                     <label class="col-xs-2 control-label no-padding-right text-right" >有效期：</label>
                                     <div class="col-xs-7">
                                         <input type="text" class="form-control " placeholder="有效期">
                                     </div>
                                 </div>
                                 <div class="form-group">
                                     <label class="col-xs-2 control-label no-padding-right text-right" >全国工业生产许可证扫描件：</label>
                                     <div class="col-xs-7">
                                         <input type="file" name="" class="form-control">
                                     </div>
                                 </div>
                             </div>
		                     <div class="s-panel s-clearfix">
		                         <div class="s-hr"><span><b>机构信用代码信息</b></span></div>
		                         <div class="form-group">
		                             <label class="col-xs-2 control-label no-padding-right text-right" >有效期：</label>
		                             <div class="col-xs-7">
		                                 <input type="text" class="form-control " placeholder="有效期">
		                             </div>
		                         </div>
		                         <div class="form-group">
		                             <label class="col-xs-2 control-label no-padding-right text-right" >有效期：</label>
		                             <div class="col-xs-7">
		                                 <input type="text" class="form-control " placeholder="有效期">
		                             </div>
		                         </div>
		                         <div class="form-group">
		                             <label class="col-xs-2 control-label no-padding-right text-right" >名称：</label>
		                             <div class="col-xs-7">
		                                 <input type="text" class="form-control " placeholder="名称">
		                             </div>
		                         </div>
		                         <div class="form-group">
		                             <label class="col-xs-2 control-label no-padding-right text-right" >地址：</label>
		                             <div class="col-xs-7">
		                                 <input type="text" class="form-control " placeholder="地址">
		                             </div>
		                         </div>
		                         <div class="form-group">
		                             <label class="col-xs-2 control-label no-padding-right text-right" >机构信用代码证扫描件：</label>
		                             <div class="col-xs-7">
		                                 <input type="file" name="" class="form-control">
		                             </div>
		                         </div>
		                     </div>
		                     <div class="s-panel s-clearfix">
		                       <div class="s-hr"><span><b>法人代表信息</b></span></div>
		                       <div class="form-group">
		                           <label class="col-xs-2 control-label no-padding-right text-right" >姓名：</label>
		                           <div class="col-xs-7">
		                               <input type="text" class="form-control " placeholder="姓名">
		                           </div>
		                       </div>
		                       <div class="form-group">
		                           <label class="col-xs-2 control-label no-padding-right text-right" >性别：</label>
		                           <div class="col-xs-7 radio radio-info radio-inline">
		                               <label><input type="radio" class="radio" name="sex" id="nan"><span>男</span></label>
		                               <label><input type="radio" class="radio" name="sex" id="nv"><span>女</span></label>
		                           </div>
		                       </div>
		                       <div class="form-group">
		                           <label class="col-xs-2 control-label no-padding-right text-right" >身份证号：</label>
		                           <div class="col-xs-7">
		                               <input type="text" class="form-control " placeholder="身份证号">
		                           </div>
		                       </div>
		                       <div class="form-group">
		                           <label class="col-xs-2 control-label no-padding-right text-right" >婚姻状况：</label>
		                           <div class="col-xs-7">
		                               <select name="hunyin" class="form-control">
		                                   <option value="">选择婚姻状况</option>
		                                   <option value="weihun">未婚</option>
		                                   <option value="yihun">已婚</option>
		                                   <option value="liyi">离异</option>
		                                   <option value="sangou">丧偶</option>
		                               </select>
		                           </div>
		                       </div>
		                       <div class="form-group">
		                             <label class="col-xs-2 control-label no-padding-right text-right" >家庭住址：</label>
		                             <div class="col-xs-7">
		                                 <input type="text" class="form-control " placeholder="家庭住址">
		                             </div>
		                       </div>
		                         <div class="form-group">
		                             <label class="col-xs-2 control-label no-padding-right text-right" >电话：</label>
		                             <div class="col-xs-7">
		                                 <input type="text" class="form-control " placeholder="电话">
		                             </div>
		                         </div>
		                         <div class="form-group">
		                             <label class="col-xs-2 control-label no-padding-right text-right" >邮编：</label>
		                             <div class="col-xs-7">
		                                 <input type="text" class="form-control " placeholder="邮编">
		                             </div>
		                         </div>
		                       <div class="form-group">
		                           <label class="col-xs-2 control-label no-padding-right text-right" >身份证复印件</label>
		                           <div class="col-xs-7">
		                               <input type="file" name="" class="form-control">
		                           </div>
		                       </div>
		                     </div>
		
		                     <div class="s-panel s-clearfix" id="b5">
		                         <div class="s-hr"><span><b>融资意向</b></span></div>
		                         <div class="form-group">
		                            <label class="col-xs-2 control-label no-padding-right text-right" >库存基酒总量：</label>
		                           <div class="col-xs-7">
		                               <input type="text" class="form-control " value="${data[0].busiAppData.stock}" placeholder="库存基酒总量" name="stock">
		                           </div>
		                           <div class="col-xs-1 text-left">
		                                 吨
		                           </div>
		                         </div>
		                         <div class="form-group">
		                             <label class="col-xs-2 control-label no-padding-right text-right" >库存基酒总价值：</label>
		                             <div class="col-xs-7">
		                                 <input type="text" class="form-control " placeholder="库存基酒总价值">
		                             </div>
		                             <div class="col-xs-1 text-left">
		                                 吨
		                             </div>
		                         </div>
		                         <div class="form-group">
		                             <label class="col-xs-2 control-label no-padding-right text-right" >已抵质押库存基酒：</label>
		                             <div class="col-xs-7">
		                                 <input type="text" class="form-control " placeholder="已抵质押库存基酒">
		                             </div>
		                             <div class="col-xs-1 text-left">
		                                 吨
		                             </div>
		                         </div>
		                         <div class="form-group">
		                             <label class="col-xs-2 control-label no-padding-right text-right" >已抵质押库存基酒价值：</label>
		                             <div class="col-xs-7">
		                                 <input type="text" class="form-control " placeholder="已抵质押库存基酒价值">
		                             </div>
		                             <div class="col-xs-1 text-left">
		                                 吨
		                             </div>
		                         </div>
		                         <div class="form-group">
		                             <label class="col-xs-2 control-label no-padding-right text-right" >未抵质押库存基酒：</label>
		                             <div class="col-xs-7">
		                                 <input type="text" class="form-control " placeholder="未抵质押库存基酒">
		                             </div>
		                             <div class="col-xs-1 text-left">
		                                 吨
		                             </div>
		                         </div>
		                         <div class="form-group">
		                             <label class="col-xs-2 control-label no-padding-right text-right" >未抵质押库存基酒价值：</label>
		                             <div class="col-xs-7">
		                                 <input type="text" class="form-control " placeholder="未抵质押库存基酒价值">
		                             </div>
		                             <div class="col-xs-1 text-left">
		                                 吨
		                             </div>
		                         </div>
		                         <div class="form-group">
		                             <label class="col-xs-2 control-label no-padding-right text-right" >融资需求：</label>
		                             <div class="col-xs-7">
		                                 <input type="text" class="form-control " value="${data[0].busiAppData.needs}" placeholder="融资需求" name="needs">
		                             </div>
		                             <div class="col-xs-1 text-left">
		                                 元
		                             </div>
		                         </div>
		                         <div class="form-group">
		                             <label class="col-xs-2 control-label no-padding-right text-right" >开户行：</label>
		                             <div class="col-xs-7">
		                                 <input type="text" class="form-control " placeholder="开户行">
		                             </div>
		                         </div>
		                         <div class="form-group">
		                             <label class="col-xs-2 control-label no-padding-right text-right" >户名：</label>
		                             <div class="col-xs-7">
		                                 <input type="text" class="form-control " placeholder="户">
		                             </div>
		                         </div>
		                         <div class="form-group">
		                             <label class="col-xs-2 control-label no-padding-right text-right" >账号：</label>
		                             <div class="col-xs-7">
		                                 <input type="text" class="form-control " placeholder="账号">
		                             </div>
		                         </div>
		                     </div>
		                     <div class="form-group" data-role-jc="" data-user-submit="">
		                          <label class="col-xs-2 control-label no-padding-right text-right" ></label>
		                          <div class="col-xs-7">
		                              <button type="submit" class="btn btn-primary" id="btnConfirm">确认</button>
		                              <button type="reset" class="btn btn-default">取消</button>
		                          </div>
		                      </div>                   
		               </form>
                     </div>
                  </div>
                </div> 
                <!-- 省区经理 -->
                <div class="panel panel-default" data-info-shenhe-result="0" data-user-role="yy31"  data-id="b2" data-node-name="信息审核" data-user-role-index="1">
                      <div class="panel-heading">
                                                                    信息审核-省区经理
                           <div class="pull-right">
	                            <span>办理人：<b>李明明</b></span>
	                            <span>办理时间：<b>2016-09-20</b></span>
	                        </div>                                         
                      </div>
                      <div class="panel-body">        
                           <form class="col-xs-12" role="" id="thisForm1" action="<%=request.getContextPath()%>/schedule/approved" enctype="multipart/form-data" method="post">
                                <input type="hidden" name="taskId" value="${data[0].taskId}">
                                <div class="form-group">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >审核结果：</label>
	                               <div class="col-xs-7">
	                                   <select name="verify_province_result" class="form-control">
	                                       <option value="" >审核结果</option>
	                                       <option value="2"  <c:if test="${data[0].variable['verify_province_result'] == 2 }"> selected </c:if>  >审核通过</option>
	                                       <option value="1">请修改信息</option>
	                                       <option value="0">拒绝融资</option>
	                                       
	                                   </select>
	                               </div>
	                           </div>
	                           <div class="form-group s-clearfix">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >审核意见：</label>
                                   <div class="col-xs-7">
                                       <textarea name="verify_province_content"  class="form-control"> ${data[0].variable['verify_province_content']} </textarea>
                                   </div>
                               </div>
                               <div class="form-group" data-user-submit="">
                                      <label class="col-xs-2 control-label no-padding-right text-right" ></label>
                                      <div class="col-xs-7">
                                          <button type="submit"  class="btn btn-primary" id="sq-btnConfirm">确认</button>
                                          <button type="reset" class="btn btn-default">取消</button>
                                      </div>
                               </div>
                           </form>
                      </div>
                </div>
                <!--  渠道总监 -->
                <div class="panel panel-default" data-info-shenhe-result="0" data-user-role="yy41" data-id="b2" data-node-name="信息审核" data-user-role-index="2">
                      <div class="panel-heading">
                                                                  信息审核-渠道总监
                           <div class="pull-right">
	                            <span>办理人：<b>李明明</b></span>
	                            <span>办理时间：<b>2016-09-20</b></span>
	                       </div>                                                        
                      </div>
                      <div class="panel-body">        
                           <form class="col-xs-12" role="" id="thisForm2" action="<%=request.getContextPath()%>/schedule/approved" enctype="multipart/form-data" method="post">
                                <input type="hidden" name="taskId" value="${data[0].taskId}">
                                <div class="form-group">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >审核结果：</label>
                                   <div class="col-xs-7">
                                       <select name="verify_channel_result" class="form-control">
                                           <option value="">审核结果</option>
                                           <option value="2" <c:if test="${data[0].variable['verify_channel_result'] == 2 }"> selected </c:if>  >审核通过</option>
                                           <option value="1">请修改信息</option>
                                           <option value="0">拒绝融资</option>
                                       </select>
                                   </div>
                               </div>
                               <div class="form-group s-clearfix">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >审核意见：</label>
                                   <div class="col-xs-7">
                                       <textarea class="form-control" name="verify_channel_content">${data[0].variable['verify_channel_content']}</textarea>
                                   </div>
                               </div>
                               <div class="form-group" data-user-submit="">
                                      <label class="col-xs-2 control-label no-padding-right text-right" ></label>
                                      <div class="col-xs-7">
                                          <button type="submit" class="btn btn-primary" id="qd-btnConfirm">确认</button>
                                          <button type="reset" class="btn btn-default">取消</button>
                                      </div>
                               </div>
                           </form>
                      </div>
                </div> 
                <!-- 真安信审员 -->
                <div class="panel panel-default" data-info-shenhe-result="0" data-user-role="jr31" data-id="b2" data-node-name="信息审核" data-user-role-index="3">
                      <div class="panel-heading">
                                                                真安信审员审核
                        <div class="pull-right">
                            <span>办理人：<b>李明明</b></span>
                            <span>办理时间：<b>2016-09-20</b></span>
                        </div>
                      </div>
                      <div class="panel-body">        
                           <form class="col-xs-12" role="" id="thisForm3" action="<%=request.getContextPath()%>/schedule/approved" enctype="multipart/form-data" method="post">
                                <input type="hidden" name="taskId" value="${data[0].taskId}">
                                <div class="form-group">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >审核结果：</label>
                                   <div class="col-xs-7">
                                       <select name="verify_zhenan_1_result" class="form-control" id="za-shenhe">
                                           <option value="">审核结果</option>
                                           <option value="2" <c:if test="${data[0].variable['verify_zhenan_1_result'] == 2 }"> selected </c:if>  >审核通过</option>
                                           <option value="1">请修改信息</option>
                                           <option value="0">拒绝融资</option>
                                       </select>
                                   </div>
                               </div>
                               <div class="form-group s-clearfix">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >审核意见：</label>
                                   <div class="col-xs-7">
                                       <textarea class="form-control" name="verify_zhenan_1_content"> ${data[0].variable['verify_zhenan_1_content']} </textarea>
                                   </div>
                               </div>
                               <div class="form-group" id="za-ed">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >授信额度：</label>
                                   <div class="col-xs-7">
	                                   <input type="text" class="form-control " name="verify_zhenan_1_amount" value=" ${data[0].variable['verify_zhenan_1_amount']}" placeholder="库存基酒总量" name="verify_zhenan_1_amount">
	                               </div>
	                               <div class="col-xs-1 text-left">元 </div>
                               </div>
                               <div class="form-group" id="za-qx">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >贷款期限：</label>
                                   <div class="col-xs-7">
                                       <input type="text" class="form-control " placeholder="贷款期限" name="">
                                   </div>
                                   <div class="col-xs-1 text-left">年 </div>
                               </div>
                               <div class="form-group" id="za-zf">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >资方：</label>
                                   <div class="col-xs-7">
                                       <select name="zifang" class="form-control">
                                           <option value="">资方1</option>
                                           <option value="tongguo">资方2</option>
                                           <option value="xiugai">资方3</option>
                                           <option value="jujue">资方4</option>
                                       </select>
                                   </div>
                               </div>
                               <div class="form-group" id="za-jg">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >监管方：</label>
                                   <div class="col-xs-7">
                                       <select name="jianguan" class="form-control">
                                           <option value="">监管1</option>
                                           <option value="tongguo">监管2</option>
                                           <option value="xiugai">监管3</option>
                                           <option value="jujue">监管4</option>
                                       </select>
                                   </div>
                               </div>
                               <div class="form-group" id="za-ly">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >履约保险方：</label>
                                   <div class="col-xs-7">
                                       <select name="lvyue" class="form-control">
                                           <option value="">履约保险方1</option>
                                           <option value="tongguo">履约保险方2</option>
                                           <option value="xiugai">履约保险方3</option>
                                           <option value="jujue">履约保险方4</option>
                                       </select>
                                   </div>
                               </div>
                               <div class="form-group" data-user-submit="">
		                              <label class="col-xs-2 control-label no-padding-right text-right" ></label>
		                              <div class="col-xs-7">
		                                  <button type="submit" class="btn btn-primary" id="za-btnConfirm">确认</button>
		                                  <button type="reset" class="btn btn-default">取消</button>
		                              </div>
		                       </div> 
                           </form>
                      </div>                      
                </div> 
                <!--  真安风控中心审核 -->
                <div class="panel panel-default" data-info-shenhe-result="0" data-user-role="jr41" data-id="b2" data-node-name="信息审核" data-user-role-index="4">
                      <div class="panel-heading">
                                                                真安风控中心审核
                          <div class="pull-right">
                            <span>办理人：<b>李明明</b></span>
                            <span>办理时间：<b>2016-09-20</b></span>
                          </div>                                      
                      </div>
                      <div class="panel-body">        
                           <form class="col-xs-12" role="" id="thisForm4" action="<%=request.getContextPath()%>/schedule/approved" enctype="multipart/form-data" method="post">
                                 <input type="hidden" name="taskId" value="${data[0].taskId}">
                                <div class="form-group">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >审核结果：</label>
                                   <div class="col-xs-7">
                                       <select name="verify_risk_result" class="form-control" id="verify_risk_result">
                                           <option value="">审核结果</option>
                                           <option value="2" <c:if test="${data[0].variable['verify_risk_result'] == 2 }"> selected </c:if>  >审核通过</option>
                                           <option value="1">请修改信息</option>
                                           <option value="0">拒绝融资</option>
                                       </select>
                                   </div>
                               </div>
                               <div class="form-group s-clearfix">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >审核意见：</label>
                                   <div class="col-xs-7">
                                       <textarea class="form-control" name="verify_risk_content" > ${data[0].variable['verify_risk_content'] } </textarea>
                                   </div>
                               </div>
                               <div class="form-group" data-user-submit="">
                                      <label class="col-xs-2 control-label no-padding-right text-right" ></label>
                                      <div class="col-xs-7">
                                          <button type="submit" class="btn btn-primary" id="zafk-btnConfirm">确认</button>
                                          <button type="reset" class="btn btn-default">取消</button>
                                      </div>
                               </div>
                           </form>
                      </div>
                </div> 
                
                <!-- jc看到的审核结果 -->
                <!-- data-user-role-index="" -->
                <!-- data-user-role="" -->
                <!-- data-node-name="信息审核" -->
                <div class="panel panel-default" data-info-shenhe-result="1"  data-id="b2"  >
                      <div class="panel-heading">
                                                               信息审核
                        <div class="pull-right">
                            <span>办理时间：<b>2016-10-02</b></span>
                        </div>
                      </div>
                      <div class="panel-body">                                  
                            <div class="form-group">
                                <label class="col-xs-2 control-label no-padding-right text-right" >审核结果：</label>
                                <div class="col-xs-7">
                                   <input type="text" readonly value="" id="xinxi-shenhe" class="form-control input-green">
                                </div>
                            </div>
                            <div id="za-shenhe-result">
	                            <div class="form-group">
	                                <label class="col-xs-2 control-label no-padding-right text-right" >审核意见：</label>
	                                <div class="col-xs-7">
	                                   ${data[0].variable['verify_zhenan_1_content']}
	                                </div>
	                            </div>                            
	                            <div class="form-group">
	                                <label class="col-xs-2 control-label no-padding-right text-right" >授信额度：</label>
	                                <div class="col-xs-7">
	                                   ${data[0].variable['verify_zhenan_1_amount']}
	                                </div>
	                            </div> 
	                            <div class="form-group">
	                                <label class="col-xs-2 control-label no-padding-right text-right" >贷款期限：</label>
	                                <div class="col-xs-7">
	                                   
	                                </div>
	                            </div> 
	                            <div class="form-group">
	                                <label class="col-xs-2 control-label no-padding-right text-right" >资方：</label>
	                                <div class="col-xs-7">
	                                   
	                                </div>
	                            </div> 
	                            <div class="form-group">
	                                <label class="col-xs-2 control-label no-padding-right text-right" >监管方：</label>
	                                <div class="col-xs-7">
	                                                                                             
	                                </div>
	                            </div>
	                            <div class="form-group">
	                                <label class="col-xs-2 control-label no-padding-right text-right" >履约保险方：</label>
	                                <div class="col-xs-7">
	                                     
	                                </div>
	                            </div> 
                            </div>                       
                      </div>
                 </div>
                
                                
                <!--  资质审核履约保险方 -->
                <div class="panel panel-default" data-zizhi-shenhe-result="0" data-user-role="bx21"  data-id="b3" data-node-name="资质审核" data-user-role-index="5">
                      <div class="panel-heading">
                                                                    资质审核-履约保险方
                        <div class="pull-right">
                            <span>办理人：<b>李明明</b></span>
                            <span>办理时间：<b>2016-09-20</b></span>
                        </div>                                        
                      </div>
                      <div class="panel-body">        
                           <form class="col-xs-12" role="" id="thisForm5" action="<%=request.getContextPath()%>/schedule/approved" enctype="multipart/form-data" method="post">
                                <input type="hidden" name="taskId" value="${data[0].taskId}">
                                <div class="form-group">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >审核结果：</label>
                                   <div class="col-xs-7">
                                       <select name="verify_Insurance_result" class="form-control">
                                           <option value="">审核结果</option>
                                           <option value="2" <c:if test="${data[0].variable['verify_Insurance_result'] == 2 }"> selected </c:if> >审核通过</option>
                                           <option value="1">审核不通过</option>
                                       </select>
                                   </div>
                               </div>
                               <div class="form-group s-clearfix">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >审核意见：</label>
                                   <div class="col-xs-7">
                                       <textarea class="form-control" name="verify_Insurance_content" >${data[0].variable['verify_Insurance_content'] }</textarea>
                                   </div>
                               </div>
                               <div class="form-group" data-user-submit="">
                                      <label class="col-xs-2 control-label no-padding-right text-right" ></label>
                                      <div class="col-xs-7">
                                          <button type="submit" class="btn btn-primary" id="ly-btnConfirm">确认</button>
                                          <button type="reset" class="btn btn-default">取消</button>
                                      </div>
                               </div>
                           </form>
                      </div>
                </div>
                <div class="panel panel-default" data-zizhi-shenhe-result="0" data-user-role="zf21" data-id="b3" data-node-name="资质审核"  data-user-role-index="6">
                      <div class="panel-heading">
                                                                    资质审核-资方
                        <div class="pull-right">
                            <span>办理人：<b>李明明</b></span>
                            <span>办理时间：<b>2016-09-20</b></span>
                        </div>                                        
                      </div>
                      <div class="panel-body">        
                           <form class="col-xs-12" role="" id="thisForm01" action="<%=request.getContextPath()%>/schedule/approved" enctype="multipart/form-data" method="post">
                                <input type="hidden" name="taskId" value="${data[0].taskId}">
                                <div class="form-group">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >审核结果：</label>
                                   <div class="col-xs-7">
                                       <select name="verify_bank_result" class="form-control">
                                           <option value="">审核结果</option>
                                           <option value="2" <c:if test="${data[0].variable['verify_bank_result'] == 2 }"> selected </c:if> >审核通过</option>
                                           <option value="1">审核不通过</option>
                                       </select>
                                   </div>
                               </div>
                               <div class="form-group s-clearfix">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >审核意见：</label>
                                   <div class="col-xs-7">
                                       <textarea class="form-control" name="verify_bank_content" >${data[0].variable['verify_bank_content']  }</textarea>
                                   </div>
                               </div>
                               <div class="form-group" data-user-submit="">
                                      <label class="col-xs-2 control-label no-padding-right text-right" ></label>
                                      <div class="col-xs-7">
                                          <button type="submit" class="btn btn-primary" id="ly-btnConfirm">确认</button>
                                          <button type="reset" class="btn btn-default">取消</button>
                                      </div>
                               </div>
                           </form>
                      </div>
                </div> 
                <!-- data-user-role-index="5" -->
                <!-- data-user-role="bx21" -->
               <!-- jc看到的资质审核的结果 -->
                <div class="panel panel-default"   data-id="b3" data-node-name="资质审核" data-zizhi-shenhe-result="1" >
                      <div class="panel-heading">
                                                                   资质审核结果
                        <div class="pull-right">
                            <span>办理时间：<b>2016-09-20</b></span>
                        </div>                                        
                      </div>
                      <div class="panel-body">   
                            <label class="col-xs-2 control-label no-padding-right text-right" >审核结果：</label>
                            <div class="col-xs-7">
                                <input type="text" value="正在审核" class="form-control input-green" id="zizhi-shenhe" readonly>
                            </div>                               
                      </div>
                 </div>
                                
                <!-- 合同提交表 -->
                <div class="panel panel-default" data-user-role="jc21"   data-id="b4" data-node-name="上传合同" data-user-role-index="7">
                      <div class="panel-heading">
                                                            合同提交表-酒厂
                        <div class="pull-right">
                            <span>办理人：<b>李明明</b></span>
                            <span>办理时间：<b>2016-09-20</b></span>
                        </div>
                      </div>
                      <div class="panel-body">        
                           <form class="col-xs-12" role="" id="thisForm5" action="<%=request.getContextPath()%>/schedule/uploadContract" enctype="multipart/form-data" method="post">
                                <div class="form-group">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >贷款单位：</label>
                                   <div class="col-xs-7">
                                       <input type="text" class="form-control" readonly>
                                       <input type="hidden" name="taskId" value="${data[0].taskId}">
                                       <input type="hidden" name="busi_Id" value="${data[0].busiAppData.busiId}" id="busi_Id">
                                   </div>
                               </div>
                               <div class="form-group s-clearfix">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >申请额度金额：</label>
                                   <div class="col-xs-7">
                                       <input type="text" class="form-control" name="amount" value="${data[0].busiAppData.amount}">
                                       
                                   </div>
                                   <div class="col-xs-1">元</div>
                               </div>
                               <div class="form-group s-clearfix">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >粮食采购合同：</label>
                                   <div class="col-xs-7">
                                       <!-- <input type="file" class="form-control" name="htfile" value=""> -->
                                       <c:if test="${empty data[0].busiAppData.contractPicture}">
										     <input type="file" class="form-control" name="htfile" value="" >
										</c:if>
										<c:if test="${not empty data[0].busiAppData.contractPicture}">
										    <a href="<%=request.getContextPath()%>/schedule/${data[0].busiAppData.contractPicture}" download="${data[0].busiAppData.contractPicture}">${data[0].busiAppData.contractPicture}</a>
										</c:if>
                                   </div>
                               </div>
                               <div class="form-group s-clearfix">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >借款合同：</label>
                                   <div class="col-xs-7">
                                       <input type="file" class="form-control">
                                   </div>
                               </div>
                               <div class="form-group s-clearfix">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >质押监管协议：</label>
                                   <div class="col-xs-7">
                                       <input type="file" class="form-control">
                                   </div>
                               </div>
                               <div class="form-group s-clearfix">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >履约保险投保协议：</label>
                                   <div class="col-xs-7">
                                       <input type="file" class="form-control">
                                   </div>
                               </div>
                               <div class="form-group" data-user-submit="">
                                      <label class="col-xs-2 control-label no-padding-right text-right" ></label>
                                      <div class="col-xs-7">
                                          <button type="submit" class="btn btn-primary" id="ly-btnConfirm">确认</button>
                                          <button type="reset" class="btn btn-default">取消</button>
                                      </div>
                               </div>
                           </form>
                      </div>
                </div>
                
                
                <!-- 合同审核表-信审员 -->
                <div class="panel panel-default" data-user-role="jr31"   data-id="b5" data-node-name="合同审核" data-user-role-index="8">
                      <div class="panel-heading">
                                                            合同审核表-信审员
                        <div class="pull-right">
                            <span>办理人：<b>李明明</b></span>
                            <span>办理时间：<b>2016-09-20</b></span>
                        </div>
                      </div>
                      <div class="panel-body">        
                           <form class="col-xs-12" role="" data-id="" action="<%=request.getContextPath()%>/schedule/approved" enctype="multipart/form-data" method="post">
                                <div class="form-group">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >审核结果：</label>
                                   <div class="col-xs-7">
                                       <select name="verify_letter_contract_result" class="form-control">
                                           <option value="">审核结果</option>
                                           <option value="2"  <c:if test="${data[0].variable['verify_letter_contract_result'] == 2 }"> selected </c:if> >审核通过</option>
                                           <option value="1">审核不通过</option>
                                       </select>
                                   </div>
                               </div>
                                <div class="form-group s-clearfix">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >审核意见：</label>
                                   <div class="col-xs-7">
                                       <textarea class="form-control" name="verify_letter_contract_content" >${data[0].variable['verify_letter_contract_content']}</textarea>
                                   </div>
                               </div>
                               <div class="form-group" data-user-submit="">
                                      <label class="col-xs-2 control-label no-padding-right text-right" ></label>
                                      <div class="col-xs-7">
                                      	  <input type="hidden" name="taskId" value="${data[0].taskId}">
                                          <button type="submit" class="btn btn-primary" id="ly-btnConfirm">确认</button>
                                          <button type="reset" class="btn btn-default">取消</button>
                                      </div>
                               </div>
                           </form>
                      </div>
                  </div>
                  
                  <!-- 合同审核-风控中心 -->
                <div class="panel panel-default" data-user-role="jr41"   data-id="b5" data-node-name="合同审核" data-user-role-index="9">
                      <div class="panel-heading">
                                                            合同审核-风控中心
                        <div class="pull-right">
                            <span>办理人：<b>李明明</b></span>
                            <span>办理时间：<b>2016-09-20</b></span>
                        </div>
                      </div>
                      <div class="panel-body">        
                           <form class="col-xs-12" role="" id="" action="<%=request.getContextPath()%>/schedule/approved" enctype="multipart/form-data" method="post">
                                <div class="form-group">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >审核结果：</label>
                                   <div class="col-xs-7">
                                       <select name="verify_risk_contract_result" class="form-control">
                                           <option value="">审核结果</option>
                                           <option value="2" <c:if test="${data[0].variable['verify_risk_contract_result'] == 2 }"> selected </c:if>  >审核通过</option>
                                           <option value="1">审核不通过</option>
                                       </select>
                                   </div>
                               </div>
                                <div class="form-group s-clearfix">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >审核意见：</label>
                                   <div class="col-xs-7">
                                       <textarea class="form-control" name="verify_risk_contract_content" >${data[0].variable['verify_risk_contract_content']} </textarea>
                                   </div>
                               </div>
                               <div class="form-group" data-user-submit="">
                                      <label class="col-xs-2 control-label no-padding-right text-right" ></label>
                                      <div class="col-xs-7">
                                          <input type="hidden" name="taskId" value="${data[0].taskId}">
                                          <button type="submit" class="btn btn-primary" id="ly-btnConfirm">确认</button>
                                          <button type="reset" class="btn btn-default">取消</button>
                                      </div>
                               </div>
                           </form>
                      </div>
                  </div>
                                    
                  <div class="panel panel-default" data-user-role="zf21"   data-id="b5" data-node-name="合同审核" data-user-role-index="10">
                      <div class="panel-heading">
                                                            合同审核表-资方
                        <div class="pull-right">
                            <span>办理人：<b>李明明</b></span>
                            <span>办理时间：<b>2016-09-20</b></span>
                        </div>
                      </div>
                      <div class="panel-body">        
                           <form class="col-xs-12" role="" id="" action="<%=request.getContextPath()%>/schedule/approved" enctype="multipart/form-data" method="post">
                                <div class="form-group">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >审核结果：</label>
                                   <div class="col-xs-7">
                                       <select name="verify_bank_contract_result" class="form-control">
                                           <option value="">审核结果</option>
                                           <option value="2" <c:if test="${data[0].variable['verify_bank_contract_result'] == 2 }"> selected </c:if>  >审核通过</option>
                                           <option value="1">审核不通过</option>
                                       </select>
                                   </div>
                               </div>
                                <div class="form-group s-clearfix">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >审核意见：</label>
                                   <div class="col-xs-7">
                                       <textarea class="form-control" name="verify_bank_contract_content" >${data[0].variable['verify_bank_contract_content']} </textarea>
                                   </div>
                               </div>
                               <div class="form-group" data-user-submit="">
                                      <label class="col-xs-2 control-label no-padding-right text-right" ></label>
                                      <div class="col-xs-7">
                                          <input type="hidden" name="taskId" value="${data[0].taskId}">
                                          <button type="submit" class="btn btn-primary" id="ly-btnConfirm">确认</button>
                                          <button type="reset" class="btn btn-default">取消</button>
                                      </div>
                               </div>
                           </form>
                      </div>
                  </div>
                  
                    <!-- 质押物信息提交表-酒厂 -->
                  <div class="panel panel-default" data-user-role="jc21"   data-id="b6" data-node-name="质押物就位" data-user-role-index="11">
                      <div class="panel-heading">
                                                            质押物信息提交表-酒厂
                        <div class="pull-right">
                            <span>办理人：<b>李明明</b></span>
                            <span>办理时间：<b>2016-09-20</b></span>
                        </div>
                      </div>
                      <div class="panel-body">        
                           <form class="col-xs-12" role="" id="" action="<%=request.getContextPath()%>/schedule/submitCollateral" enctype="multipart/form-data" method="post">
                                <div class="form-group">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >贷款单位：</label>
                                   <div class="col-xs-7">
                                       <input type="text" class="form-control" readonly>
                                   </div>
                               </div>
                               <div class="form-group">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >监管方：</label>
                                   <div class="col-xs-7">
                                       <input type="text" class="form-control" readonly>
                                   </div>
                               </div>
	                           <div class="collateral-material" data-collateral-index="0">
	                               <div class="form-group">
	                                   <label class="col-xs-2 control-label no-padding-right text-right" >质押基酒类型：</label>
	                                   <div class="col-xs-7">
	                                       <input type="text" name="collateralType" class="form-control" value="${data[0].busiAppData.collateralType}">
	                                   </div>
	                               </div>
	                               <div class="form-group">
	                                   <label class="col-xs-2 control-label no-padding-right text-right" >生产日期：</label>
	                                   <div class="col-xs-7">
	                                       <input type="text" class="form-control">
	                                   </div>
	                               </div>
	                               <div class="form-group">
	                                   <label class="col-xs-2 control-label no-padding-right text-right" >质押基酒数量：</label>
	                                   <div class="col-xs-7">
	                                       <input type="text" class="form-control">
	                                   </div>
	                               </div>
	                               <div class="form-group">
	                                   <label class="col-xs-2 control-label no-padding-right text-right" >质押基酒价格：</label>
	                                   <div class="col-xs-7">
	                                       <input type="text" class="form-control">
	                                   </div>
	                               </div>
	                               <div class="form-group">
	                                   <label class="col-xs-2 control-label no-padding-right text-right" >仓库地址：</label>
	                                   <div class="col-xs-7">
	                                       <input type="text" class="form-control">
	                                   </div>
	                               </div>
                               </div>
                               
                               <div class="form-group s-clearfix">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >合计质押酒价格：</label>
                                   <div class="col-xs-7">
                                       <input type="text" class="form-control" readonly>
                                   </div>
                                   <div class="col-xs-1">元</div>
                               </div>
                               
                               
                               <div class="form-group" data-user-submit="">
                                      <label class="col-xs-2 control-label no-padding-right text-right" ></label>
                                      <div class="col-xs-7">
                                          <input type="hidden" name="taskId" value="${data[0].taskId}">
                                          <input type="hidden" name="busi_Id" value="${data[0].busiAppData.busiId}">
                                          <button type="submit" class="btn btn-primary" id="ly-btnConfirm">确认</button>
                                          <button type="reset" class="btn btn-default">取消</button>
                                      </div>
                               </div>
                           </form>
                      </div>
                  </div>
                                            
                  <div class="panel panel-default" data-user-role="yy21"  data-id="b7" data-node-name="取样检测" data-user-role-index="12">
                      <div class="panel-heading">
                                                            押物取样检测评估结果信息表-中酒 
                        <div class="pull-right">
                            <span>办理人：<b>李明明</b></span>
                            <span>办理时间：<b>2016-09-20</b></span>
                        </div>
                      </div>
                      <div class="panel-body">        
                           <form class="col-xs-12" role="" id="" action="<%=request.getContextPath()%>/schedule/testing" enctype="multipart/form-data" method="post">
                                <div class="form-group">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >单位贷款：</label>
                                   <div class="col-xs-7">
                                       <input type="text" class="form-control" readonly>
                                   </div>
                               </div>
                               <div class="form-group">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >委托单位：</label>
                                   <div class="col-xs-7">
                                       <input type="text" class="form-control" name="commissionUnit" value=" ${data[0].busiAppData.commissionUnit} " >
                                   </div>
                               </div>
                                <div class="form-group">
                                    <label class="col-xs-2 control-label no-padding-right text-right" >封样库存时间：</label>
                                    <div class="col-xs-7">
                                        <input type="text" class="form-control" value="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-2 control-label no-padding-right text-right" >检测报告编号：</label>
                                    <div class="col-xs-7">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-2 control-label no-padding-right text-right" >受检产品名称：</label>
                                    <div class="col-xs-7">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-2 control-label no-padding-right text-right" >检验单位：</label>
                                    <div class="col-xs-7">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-2 control-label no-padding-right text-right" >检测类别：</label>
                                    <div class="col-xs-7">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                               <div class="form-group">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >检验时间：</label>
                                   <div class="col-xs-7">
                                       <input type="text" class="form-control">
                                   </div>
                               </div>
                               <div class="form-group">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >检验报告：</label>
                                   <div class="col-xs-7">
                                       <input type="file" class="form-control" >
                                   </div>
                               </div>
                               <div class="form-group">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >评估价格：</label>
                                   <div class="col-xs-7">
                                       <input type="text" class="form-control">
                                   </div>
                               </div>
                               <div class="form-group">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >评估产品名称：</label>
                                   <div class="col-xs-7">
                                       <input type="text" class="form-control">
                                   </div>
                               </div>
                               <div class="form-group">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >评估单位：</label>
                                   <div class="col-xs-7">
                                       <input type="text" class="form-control">
                                   </div>
                               </div>
                               <div class="form-group">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >评估价格：</label>
                                   <div class="col-xs-7">
                                       <input type="text" class="form-control">
                                   </div>
                                   <div class="col-xs-1">元/吨</div>
                               </div>
                               
                               <div class="form-group">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >评估时间：</label>
                                   <div class="col-xs-7">
                                       <input type="text" class="form-control">
                                   </div>
                               </div>
                               <div class="form-group">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >评估报告：</label>
                                   <div class="col-xs-7">
                                       <%-- <input type="file" class="form-control" name="reportFile" value="${data[0].busiAppData.reportPicture}"> --%>
                                        <c:if test="${empty data[0].busiAppData.reportPicture}">
										     <input type="file" name="reportFile" class="form-control">
										</c:if>
										<c:if test="${not empty data[0].busiAppData.reportPicture}">
										    <a href="<%=request.getContextPath()%>/schedule/${data[0].busiAppData.reportPicture}" download="${data[0].busiAppData.reportPicture}">${data[0].busiAppData.reportPicture}</a>
										</c:if>
                                   </div>
                               </div>
                               <div class="form-group">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >检验评估结论：</label>
                                   <div class="col-xs-7">
                                       <select name="" class="form-control">
                                             <option value="">检验评估结论</option>
                                             <option value="">符合融资条件</option>
                                             <option value="">不符合融资条件，追加质押物</option>
                                             <option value="">不符合融资条件，变更质押 物</option>
                                       </select>
                                   </div>
                               </div>
                               <div class="form-group">
                                   <label class="col-xs-2 control-label no-padding-right text-right" >取样过程实况：</label>
                                   <div class="col-xs-7">
                                       <input type="file" class="form-control">
                                   </div>
                               </div>
                               <div class="form-group" data-user-submit="">
                                      <label class="col-xs-2 control-label no-padding-right text-right" ></label>
                                      <div class="col-xs-7">
                                          <input type="hidden" name="taskId" value="${data[0].taskId}">
                                          <input type="hidden" name="busi_Id" value="${data[0].busiAppData.busiId}">
                                          <button type="submit" class="btn btn-primary" id="ly-btnConfirm">确认</button>
                                          <button type="reset" class="btn btn-default">取消</button>
                                      </div>
                               </div>
                           </form>
                      </div>
                  </div>
                  
                  <!-- 质押物清单-监管方 -->
	              <div class="panel panel-default" data-user-role="jg21"   data-id="b8" data-node-name="质押物清单" data-user-role-index="13">
	                      <div class="panel-heading">
	                                                            质押物清单-监管方
	                        <div class="pull-right">
	                            <span>办理人：<b>李明明</b></span>
	                            <span>办理时间：<b>2016-09-20</b></span>
	                        </div>
	                      </div>
	                      <div class="panel-body">        
	                           <form class="col-xs-12" role="" id="" action="<%=request.getContextPath()%>/schedule/collateralList" enctype="multipart/form-data" method="post">
	                                <div class="form-group">
	                                   <label class="col-xs-2 control-label no-padding-right text-right" >基酒类型：</label>
	                                   <div class="col-xs-7">
	                                       <input type="text" name="wineType" class="form-control" value="${data[0].busiAppData.wineType}">
	                                   </div>
	                               </div>
	                               <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >数量：</label>
                                       <div class="col-xs-7">
                                           <input type="text" class="form-control">
                                       </div>
                                       <div class="col-xs-1">吨</div>
                                   </div>
                                   <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >生产日期：</label>
                                       <div class="col-xs-7">
                                           <input type="text" class="form-control">
                                       </div>
                                   </div>
                                   <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >评估价格：</label>
                                       <div class="col-xs-7">
                                           <input type="text" class="form-control">
                                       </div>
                                       <div class="col-xs-1">元</div>
                                   </div>
                                   <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >质权人：</label>
                                       <div class="col-xs-7">
                                           <input type="text" class="form-control">
                                       </div>
                                   </div>
                                   <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >出质人：</label>
                                       <div class="col-xs-7">
                                           <input type="text" class="form-control">
                                       </div>
                                   </div>
                                   <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >出质日期：</label>
                                       <div class="col-xs-7">
                                           <input type="text" class="form-control">
                                       </div>
                                   </div>
                                   <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >质押物清单：</label>
                                       <div class="col-xs-7">
                                          <!--<input type="file" class="form-control" name="collateralListFile"> -->
                                           <c:if test="${empty data[0].busiAppData.collateralListPicture}">
											     <input type="file" name="collateralListFile" class="form-control">
											</c:if>
											<c:if test="${not empty data[0].busiAppData.collateralListPicture}">
											    <a href="<%=request.getContextPath()%>/schedule/${data[0].busiAppData.collateralListPicture}" download="${data[0].busiAppData.collateralListPicture}">${data[0].busiAppData.collateralListPicture}</a>
											</c:if>
                                       </div>
                                   </div>
	                               <div class="form-group" data-user-submit="">
	                                      <label class="col-xs-2 control-label no-padding-right text-right" ></label>
	                                      <div class="col-xs-7">
	                                          <input type="hidden" name="taskId" value="${data[0].taskId}">
                                              <input type="hidden" name="busi_Id" value="${data[0].busiAppData.busiId}">
	                                          <button type="submit" class="btn btn-primary" id="ly-btnConfirm">确认</button>
	                                          <button type="reset" class="btn btn-default">取消</button>
	                                      </div>
	                               </div>
	                           </form>
	                      </div>
	                  </div>
	                  	                  
                     <!-- 保险清单-履约保险方 -->
                     <div class="panel panel-default" data-user-role="bx21"   data-id="b8" data-node-name="质押物清单" data-user-role-index="14">
                          <div class="panel-heading">
                                                                     保险清单-履约保险方
                            <div class="pull-right">
                                <span>办理人：<b>李明明</b></span>
                                <span>办理时间：<b>2016-09-20</b></span>
                            </div>
                          </div>
                          <div class="panel-body">        
                               <form class="col-xs-12" role="" id="" action="<%=request.getContextPath()%>/schedule/submitPolicy" enctype="multipart/form-data" method="post">
                                    <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >保单名称：</label>
                                       <div class="col-xs-7">
                                           <input type="text" class="form-control" name="policyName" value="${data[0].busiAppData.policyName}">
                                       </div>
                                   </div>
                                   <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >投保人：</label>
                                       <div class="col-xs-7">
                                           <input type="text" class="form-control">
                                       </div>
                                   </div>
                                   <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >保险人：</label>
                                       <div class="col-xs-7">
                                           <input type="text" class="form-control">
                                       </div>
                                   </div>
                                   <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >保险费：</label>
                                       <div class="col-xs-7">
                                           <input type="text" class="form-control">
                                       </div>
                                   </div>
                                   <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >有效期：</label>
                                       <div class="col-xs-7">
                                           <input type="text" class="form-control">
                                       </div>
                                   </div>
                                   <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >履约保险单：</label>
                                       <div class="col-xs-7">
                                           <!-- <input type="file" class="form-control" name="policyFile"> -->
                                            <c:if test="${empty data[0].busiAppData.policyPicture}">
											     <input type="file" name="policyFile" class="form-control">
											</c:if>
											<c:if test="${not empty data[0].busiAppData.policyPicture}">
											    <a href="<%=request.getContextPath()%>/schedule/${data[0].busiAppData.policyPicture}" download="${data[0].busiAppData.policyPicture}">${data[0].busiAppData.policyPicture}</a>
											</c:if>
                                       </div>
                                   </div>
                                   <div class="form-group" data-user-submit="">
                                          <label class="col-xs-2 control-label no-padding-right text-right" ></label>
                                          <div class="col-xs-7">
                                              <input type="hidden" name="taskId" value="${data[0].taskId}">
                                              <input type="hidden" name="busi_Id" value="${data[0].busiAppData.busiId}">
                                              <button type="submit" class="btn btn-primary" id="ly-btnConfirm">确认</button>
                                              <button type="reset" class="btn btn-default">取消</button>
                                          </div>
                                   </div>
                               </form>
                          </div>
                      </div>
                                           
                      <!-- 放款通知单 -->         
                      <div class="panel panel-default" data-user-role="zf21"   data-id="b9" data-node-name="放款" data-user-role-index="15">
                          <div class="panel-heading">
                                                                     放款通知单
                            <div class="pull-right">
                                <span>办理人：<b>李明明</b></span>
                                <span>办理时间：<b>2016-09-20</b></span>
                            </div>
                          </div>
                          <div class="panel-body">        
                               <form class="col-xs-12" role="" id="" action="<%=request.getContextPath()%>/schedule/loan" enctype="multipart/form-data" method="post">
                                    <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >收款单位：</label>
                                       <div class="col-xs-7">
                                           <input type="text" class="form-control">
                                       </div>
                                   </div>
                                   <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >贷款单位开户行：</label>
                                       <div class="col-xs-7">
                                           <input type="text" class="form-control">
                                       </div>
                                   </div>
                                   <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >贷款单位账户：</label>
                                       <div class="col-xs-7">
                                           <input type="text" class="form-control">
                                       </div>
                                   </div>
                                   <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >贷款金额：</label>
                                       <div class="col-xs-7">
                                           <input type="text" class="form-control">
                                       </div>
                                   </div>
                                   <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >放款单位：</label>
                                       <div class="col-xs-7">
                                           <input type="text" class="form-control">
                                       </div>
                                   </div>
                                   <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >实际放款金额：</label>
                                       <div class="col-xs-7">
                                           <input type="text" class="form-control" name="loanAmount" value="${data[0].busiAppData.loanAmount}">
                                       </div>
                                   </div>
                                   <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >放款时间：</label>
                                       <div class="col-xs-7">
                                           <input type="text" class="form-control">
                                       </div>
                                   </div>
                                   <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >放款凭证：</label>
                                       <div class="col-xs-7">
                                           <!-- <input type="file" class="form-control" name="loanFile"> -->
                                           <c:if test="${empty data[0].busiAppData.loanPicture}">
											     <input type="file" name="loanFile" class="form-control">
											</c:if>
											<c:if test="${not empty data[0].busiAppData.loanPicture}">
											    <a href="<%=request.getContextPath()%>/schedule/${data[0].busiAppData.loanPicture}" download="${data[0].busiAppData.loanPicture}">${data[0].busiAppData.loanPicture}</a>
											</c:if>
                                       </div>
                                   </div>
                                   <div class="form-group" data-user-submit="">
                                          <label class="col-xs-2 control-label no-padding-right text-right" ></label>
                                          <div class="col-xs-7">
                                              <input type="hidden" name="taskId" value="${data[0].taskId}">
                                              <input type="hidden" name="busi_Id" value="${data[0].busiAppData.busiId}">
                                              <button type="submit" class="btn btn-primary" id="ly-btnConfirm">确认</button>
                                              <button type="reset" class="btn btn-default">取消</button>
                                          </div>
                                   </div>
                               </form>
                          </div>
                      </div>                                                      
	                  <!-- 收款确认表-中酒    -->
	                  <div class="panel panel-default" data-user-role="yy21"  id="" data-node-name="确认到账" data-user-role-index="16">
                          <div class="panel-heading">
                                                                     收款确认表-中酒
                            <div class="pull-right">
                                <span>办理人：<b>李明明</b></span>
                                <span>办理时间：<b>2016-09-20</b></span>
                            </div>
                          </div>
                          <div class="panel-body">        
                               <form class="col-xs-12" role="" id="" action="<%=request.getContextPath()%>/schedule/collectedAmount" enctype="multipart/form-data" method="post">
                                    <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >收款单位：</label>
                                       <div class="col-xs-7">
                                           <input type="text" class="form-control">
                                       </div>
                                   </div>
                                   <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >收款金额：</label>
                                       <div class="col-xs-7">
                                           <input type="text" class="form-control">
                                       </div>
                                       <div class="col-xs-1">元</div>
                                   </div>
                                   <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >实收金额：</label>
                                       <div class="col-xs-7">
                                           <input type="text" class="form-control" name="collectedAmount" value="${data[0].busiAppData.collectedAmount}">
                                       </div>
                                       <div class="col-xs-1">元</div>
                                   </div>
                                   <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >到账时间：</label>
                                       <div class="col-xs-7">
                                           <input type="text" class="form-control">
                                       </div>
                                   </div>     
                                   <div class="form-group">
                                       <label class="col-xs-2 control-label no-padding-right text-right" >收款凭证：</label>
                                       <div class="col-xs-7">
                                           <!-- <input type="file" class="form-control" name="collectedFile"> -->
                                           <c:if test="${empty data[0].busiAppData.collectedPicture}">
											     <input type="file" name="collectedFile" class="form-control">
											</c:if>
											<c:if test="${not empty data[0].busiAppData.collectedPicture}">
											    <a href="<%=request.getContextPath()%>/schedule/${data[0].busiAppData.collectedPicture}" download="${data[0].busiAppData.collectedPicture}">${data[0].busiAppData.collectedPicture}</a>
											</c:if>
                                       </div>
                                   </div>
                                   <div class="form-group" data-user-submit="">
                                          <label class="col-xs-2 control-label no-padding-right text-right" ></label>
                                          <div class="col-xs-7">
                                              <input type="hidden" name="taskId" value="${data[0].taskId}">
                                              <input type="hidden" name="busi_Id" value="${data[0].busiAppData.busiId}">
                                              <button type="submit" class="btn btn-primary" id="ly-btnConfirm">确认</button>
                                              <button type="reset" class="btn btn-default">取消</button>
                                          </div>
                                   </div>
                               </form>
                          </div>
                      </div>                            
              </div>     
         </div>
     </div>
    </div>
