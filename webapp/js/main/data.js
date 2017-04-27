//菜单
var linkName = {};
	linkName.task = contextPath+'/schedule/task';
	linkName.financ = contextPath+'/financing/list';
	linkName.sysSet = contextPath+'/menu';
	linkName.testView = contextPath+'/test_view'
var menuData = {};
	menuData.data01 = [{"title":"业务总览","icon":"icon icon-home","id":"shouye",ref:"javascript:void(0)"},
				 {"title":"我的办理","icon":"icon icon-eye-open","id":"selfInfo",ref:linkName.task},
				 {"title":"我的融资","icon":"icon icon-signal","id":"selfInfo",ref:linkName.financ},
				 {"title":"我的质押","icon":"icon icon-lock","id":"selfInfo",ref:"javascript:void(0)"},
				 {"title":"我的还款","icon":"icon icon-calendar","id":"selfInfo",ref:"javascript:void(0)"},
				 {"title":"酒厂信息","icon":"icon icon-list","id":"selfInfo",ref:"javascript:void(0)"},
				 {"title":"系统设置","icon":"icon icon-dashboard","id":"selfInfo",ref:linkName.sysSet},
				 {"title":"test_view","icon":"icon icon-dashboard","id":"selfInfo",ref:linkName.testView}];
	
	menuData.data02 = [{"title":"业务总览","icon":"icon icon-home", "id":"shouye","ref":"javascript:void(0)"},
	              {"title":"我的办理","icon":"icon icon-eye-open","id":"selfInfo","ref":linkName.task},
	              {"title":"酒厂管理", "icon":"icon icon-cogs","id":"about","ref":"javascript:void(0)"},
	              {"title":"融资管理","icon":"icon icon-signal","id":"selfInfo","ref":linkName.financ},
	              {"title":"质押管理","icon":"icon icon-lock","id":"selfInfo","ref":"javascript:void(0)"},
	              {"title":"还款管理","icon":"icon icon-calendar","id":"selfInfo","ref":"javascript:void(0)"},
	              {"title":"逾期理赔","icon":"icon icon-signin","id":"selfInfo","ref":"javascript:void(0)"},
	              {"title":"风险管理","icon":"icon icon-sitemap","id":"selfInfo","ref":"javascript:void(0)"},
	              {"title":"邀请码管理","icon":"icon icon-tag","id":"selfInfo","ref":"javascript:void(0)"},
	              {"title":"合作方管理","icon":"icon icon-group","id":"selfInfo","ref":"javascript:void(0)"},
	              {"title":"系统设置","icon":"icon icon-dashboard","id":"selfInfo",ref:linkName.sysSet},
			      {"title":"test_view","icon":"icon icon-dashboard","id":"selfInfo",ref:linkName.testView}];
	
	menuData.data03 = [
	              {"title":"业务总览","icon":"icon icon-home", "id":"shouye","ref":"javascript:void(0)"},
	              {"title":"我的办理","icon":"icon icon-eye-open","id":"selfInfo","ref":linkName.task},
	              {"title":"融资管理","icon":"icon icon-signal","id":"selfInfo","ref":linkName.financ},
	              {"title":"质押管理","icon":"icon icon-lock","id":"selfInfo","ref":"javascript:void(0)"},
	              {"title":"还款管理","icon":"icon icon-calendar","id":"selfInfo","ref":"javascript:void(0)"},
	              {"title":"逾期理赔","icon":"icon icon-signal","id":"selfInfo","ref":"javascript:void(0)"},
	              {"title":"风险管理","icon":"icon icon-sitemap","id":"selfInfo","ref":"javascript:void(0)"},
	              {"title":"合作方管理","icon":"icon icon-group","id":"selfInfo","ref":"javascript:void(0)"},
	              {"title":"系统设置","icon":"icon icon-dashboard","id":"selfInfo",ref:linkName.sysSet},
				  {"title":"test_view","icon":"icon icon-dashboard","id":"selfInfo",ref:linkName.testView}];

//href中的参数对象
var param = (function getParam(){
	        var href = window.location.href;
	        var id = null;
	        var param = {};
	        if(href.indexOf('?')>-1){
	            id = href.substring(href.indexOf('?')+1);
	            if(id.indexOf('&&')>-1){
	                console.log(0)
	                $.each(id.split('&&'),function(i,item){
	                    var info = item.split('=');
	                    var cur = info[0];
	                        param[cur]=info[1];               
	                })
	            }
	            else{
	                var list = id.split('=');
	                var index = list[0];
	                    param[index]=list[1]; 
	            }            
	        }
	        return param
	    })();