webpackJsonp([23],{Bl9u:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("34v0"),l=a.n(s),n={data:function(){return{params:{keyword:"",source:"",agent_level:"",start_time:"",end_time:""},sum:null,columns:[{title:"分润单号",key:"order_num"},{title:"代理商级别",key:"agent_level",render:function(t,e){return t("span",{},{1:"一级",2:"二级"}[e.row.agent_level])}},{title:"代理商姓名",key:"realname"},{title:"代理商账号",key:"username"},{title:"代理商手机",key:"phone"},{title:"分润金额",key:"amount"},{title:"分润来源",key:"source",render:function(t,e){return t("span",{},{1:"推广费用",2:"装机费用",3:"售后服务费用",4:"续费费用",5:"达标奖励",6:"好评返现",7:"延期罚款",8:"差评罚款"}[e.row.source])}},{title:"分润时间",key:"ctime",width:150,render:function(t,e){return t("span",{},new Date(1e3*e.row.ctime).Format("yyyy-MM-dd hh:mm"))}}],itemId:0,modal1:!1,formData:{role_name:""},rule:{},menuList:[]}},computed:{modelTitle:function(){return this.itemId?"编辑":"新增"}},mounted:function(){this.getList()},methods:{handleDateSelect:function(t){console.log(t),this.params.start_time=t[0],this.params.end_time=t[1]},getList:function(){var t=this;this.$post("profit/list",this.params).then(function(e){var a=e.data;t.sum=a.sum})},handleAdd:function(){this.modal1=!0,this.itemId=0,this.$refs.form.resetFields()},handleEdit:function(t){this.modal1=!0,this.itemId=t.id},handleSubmit:function(){var t=this,e=this.$refs.tree.getCheckedNodes().map(function(t){return t.id});this.itemId?this.$post("role/edit",{id:this.itemId,role_name:this.formData.role_name,url_ids:e.join()}).then(function(e){t.modal1=!1,t.handleSearch(),t.$post("admin/detail",{}).then(function(e){t.$store.dispatch("setUserInfoAction",e.data)})}):this.$post("role/add",{role_name:this.formData.role_name,url_ids:e.join()}).then(function(e){t.modal1=!1,t.handleSearch()})},handleExport:function(){var t=this;this.$Modal.confirm({title:"温馨提示",content:"确定导出数据 ?",onOk:function(){t.$post("profit/list",l()({},t.params,{export:1})).then(function(t){window.location.href=t.data.filename})},onCancel:function(){}})}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"dt-search-top"},[a("h2",[t._v("分润金额： "+t._s(t.sum))])]),t._v(" "),a("div",{staticClass:"dt-search-top"},[a("div",{staticClass:"dt-search-cells"},[a("div",{staticClass:"dt-search-cell"},[a("Input",{staticClass:"dt-search-input",staticStyle:{width:"350px"},attrs:{placeholder:"分润单号、代理商姓名、代理商账号、代理商手机"},model:{value:t.params.keyword,callback:function(e){t.$set(t.params,"keyword",e)},expression:"params.keyword"}})],1),t._v(" "),a("div",{staticClass:"dt-search-cell"},[t._v("\n        分润来源：\n        "),a("dt-select",{staticClass:"dt-search-select",attrs:{url:"financeSource"},model:{value:t.params.source,callback:function(e){t.$set(t.params,"source",e)},expression:"params.source"}})],1),t._v(" "),a("div",{staticClass:"dt-search-cell"},[t._v("\n        等级：\n        "),a("dt-select",{staticClass:"dt-search-select",attrs:{url:"userLevel"},model:{value:t.params.agent_level,callback:function(e){t.$set(t.params,"agent_level",e)},expression:"params.agent_level"}})],1),t._v(" "),a("div",{staticClass:"dt-search-cell"},[t._v("\n        分润时间：\n        "),a("dt-selectDate",{staticClass:"dt-search-date",on:{"on-select":t.handleDateSelect}})],1)]),t._v(" "),a("div",{staticClass:"dt-search-operation"},[a("Button",{attrs:{type:"ghost"},on:{click:t.handleSearch}},[t._v("查询")]),t._v(" "),a("Button",{attrs:{type:"info"},on:{click:t.handleExport}},[t._v("导出")])],1)]),t._v(" "),a("dt-table",{ref:"table",attrs:{url:"profit/list",params:t.params,columns:t.columns}}),t._v(" "),a("Modal",{attrs:{title:t.modelTitle,"mask-closable":!1},model:{value:t.modal1,callback:function(e){t.modal1=e},expression:"modal1"}},[a("Form",{ref:"form",attrs:{model:t.formData,rules:t.rule,"label-width":100}},[a("FormItem",{attrs:{label:"角色名称",prop:"role_name"}},[a("Input",{attrs:{placeholder:"请输入角色名称",maxlength:10},model:{value:t.formData.role_name,callback:function(e){t.$set(t.formData,"role_name",e)},expression:"formData.role_name"}})],1),t._v(" "),a("FormItem",{attrs:{label:"角色权限",prop:"form2"}},[a("div",{staticStyle:{height:"300px","overflow-y":"auto",border:"1px solid #dddee1"}},[a("Tree",{ref:"tree",attrs:{data:t.menuList,"show-checkbox":""}})],1)])],1),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{type:"ghost"},on:{click:function(e){t.handleSubmit()}}},[t._v("保存")]),t._v(" "),a("Button",{staticStyle:{"margin-left":"8px"},attrs:{type:"text"},on:{click:function(e){t.modal1=!1}}},[t._v("取消")])],1)],1)],1)},staticRenderFns:[]},o=a("Mz/3")(n,r,!1,null,null,null);e.default=o.exports}});
//# sourceMappingURL=23.a43b04451601bb973109.js.map