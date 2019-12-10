/**
 * 系统权限配置 / 系统用户相关 / 系统用户列表/用户角色列表弹窗
 */
layui.config({
    	base: '../layuiadmin/' //静态资源所在路径
  	}).extend({
    	index: 'lib/index' //主入口模块
  	}).use(['index', 'table'], function(){
  	    var table = layui.table;
  	  	var $ = layui.$;
  	  	var layer = layui.layer;
  	    table.render({
  	    	id: 'page-table-reload',  			// 页面查询按钮需要table.reload
  	      	elem: '#table-toolbar',				// 表格控制句柄
  	      	url : layui.setter.path + 'sysrole/ajax_system_role_list.do',
  	      	toolbar: '#table-search-toolbar',
  	      	title: '系统角色列表',
  	      	height: 'full-100', 
  	      	cols: [
 	    	  	[
 	  	         	{field:'id', title:'角色ID', width:100,unresize: true, sort: true},  //  fixed: 'left', 
 	  	         	{field:'roleName', title:'角色名称', width:200},
 	  	         	{field:'roleDesc', title:'角色描述'},
 	  	         	{field:'createTime', title:'创建时间', width:180},
 	  	         	{fixed: 'right', title:'操作', toolbar: '#table-btn-toolbar', width:70}
 	    	  	]
  	      	],
  	    	page: true
  	    });

		// 头部工具栏事件
		table.on('toolbar(table-toolbar)', function(o) {
			switch (o.event) {
				case 'search':
					search.reload();
					break;
				case 'reset':
					search.reset();
					break;
			}
		});

		// 监听行工具事件
		table.on('tool(table-toolbar)', function(o) {
			if (o.event === 'del') {
				pageDialog.deleteMcRole(o);
			} else if (o.event === 'edit') {
			}else if (o.event === 'role') {
			}
		});
		
		
		// 查询按钮
		var search = {		
			reload : function() {
				var roleName = $('#role-name').val();
				var type = $('#type').val();
				table.reload('page-table-reload', {
					page : {
						curr : 1  // 重新从第 1 页开始
					},
					where : {
						roleName:roleName
					}
				}, 'data');
				
				$('#role-name').val(roleName);
			},
			
			reset : function(){
				$('#role-name').val('');
				search.reload();
			}
		};
		
		// 页面弹窗对象
		var pageDialog = {
			
			deleteMcRole:function(o){
	        	layer.confirm('您确定要删除这个角色【' + o.data.roleName + '】吗？' , { title:'系统提示', icon:7, skin: 'layui-layer-molv', anim:4 , btn : [ '确定', '取消' ] }, 
					function(index , ele) {  // 确定按钮
						var type_ = 'post';
			            var url_ = layui.setter.path + 'sysrole/ajax_btn_delete_mc_role.do';
			        	var data_ = {
			        			mcRoleId : o.data.id ,
			        			eleValue : o.key
		        			}; 
			        	var obj = JSON.parse(layui.setter.ajaxs.sendAjax(type_ , url_ , data_));
			            if(obj.status == 'success'){
			            	layer.alert( obj.msg , {title:'操作成功 !' , icon:1, skin: 'layui-layer-molv' ,closeBtn:0, anim:4} , function(a){
			            		$(".layui-laypage-btn").click();  // 定位在当前页同时刷新数据
			            		layer.close(a);
			            		layer.close(index);
		            		});
			            }else{
			            	layer.alert( obj.msg , {title:'系统提示 !' , icon:5, skin: 'layui-layer-molv' ,closeBtn:0, anim:4});
			            }
					}, 
					function(index , ele) {  // 取消按钮
						layer.close(index);
					}
				);
	        },
	        
		}

	});










