<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %> 
<%@ include file="../common/global.jsp"%>
<%@ include file="../layouts/left.jsp"%>
<link href="<%=request.getContextPath()%>/css/layouts/layouts.css">
<script type="text/javascript">
    var contextPath = "<%=request.getContextPath()%>";
</script>
<link href="<%=request.getContextPath()%>/css/main/main.css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/css/usermanagement/user_management.css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/js/usermanagement/user_management_requstdata.js"></script>
 <script src="<%=request.getContextPath()%>/js/usermanagement/user_management.js"></script>
<script src="<%=request.getContextPath()%>/js/usermanagement/user_detail.js"></script>
<title>用户管理</title>
<body>
	<div class="main-content-container">
		<div class="s-container">
		    <!-- 错误信息提示 -->
            <div name='publicError'></div>
			<!-- 页面主体内容 -->
			<div class="s-page-content">
				<div class="whale-well whale-well-min clearfix">
					<div class="whale-well-headding pull-left">
						<h4 class="whale-well-title">用户管理</h4>
					</div>
					<div class="whale-well-footer pull-right">
						<div class="search-bar">
							<input type="text" class="form-control searchStr" placeholder="用户姓名" /> <i class="w-icon-search"></i>
						</div>
					</div>
				</div>
				<div class="tabbable whale-tab" id="my-work-ct">
					<ul class="nav nav-tabs" role="tablist">
						<li role="presentation" class="active" data-userstatus="1"><a
							href="javascript:void(0)">已激活<b class='notUsed'></b></a></li>
						<li role="presentation" data-userstatus="0"><a
							href="javascript:void(0)">未激活<b class='alread'></b></a></li>
						<li role="presentation" data-userstatus="4" id="delete"><a
							href="javascript:void(0)" class="delete-user">已删除<b class='detele_user'></b></a></li>
						<div class="pull-right btn-choose"><span class="btn btn-primary btn-red invitation">新增用户</span></div>
					</ul>
					<div class="tab-content">
							<table id="user_table" class="table table-striped table-bordered hover">
								<thead>
									<tr>
										<td data-id="">用户编号</td>
										<td data-id="">用户姓名</td>
										<td data-id="">所属机构</td>
										<td data-id="">机构类型</td>
										<td data-id="">所属角色</td>
										<td data-id="">状态</td>
										<td data-id="" id="operation">操作</td>
									</tr>
								</thead>
								<tbody id="userlist">
	
								</tbody>
							</table>
							<div id="pageBar" role="page-bar">
							
							</div>
							<div class="no-content-container"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" id='noticeModal' tabindex="-1" role="dialog"
		aria-labelledby="mySmallModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-md">
			<div class="modal-content forget-password">
                <div class="modal-header main-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <span class="message-img icon-delete"></span> <span class="sr-only">Close</span>
                    </button>
                     <h4 class="modal-title">用户管理</h4>
                </div>
				<div class="modal-body">
					<h4 class="admin_user">删除后该用户无法登录,本操作不能恢复。是否要删除？</h4>
				</div>
                <div class="modal-footer btn-choose">
                    <a  class="btn btn-default btn-gray btn-cancel btn-away" data-dismiss="modal">
                        取消</a>
                    <span class="btn btn-primary btn-red btn-confirm btn-assign" data-dismiss="modal"
                       id="delete_user">确认</span>
                </div>
			</div>
		</div>
	</div>
</body>
<div class="modal fade" id="fail" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-md">
         <div class="modal-content forget-password">
             <div class="modal-header main-header">
                 <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">x</span> <span class="sr-only">Close</span>
                 </button>
             </div>
             <div class="modal-body">
                <h4>该用户在流程中，无法删除</h4>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">确认</button>
            </div>
        </div>
   </div>
</div>

