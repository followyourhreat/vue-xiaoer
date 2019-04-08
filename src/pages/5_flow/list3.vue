<template>
  <div>
    <div class="dt-search-top">
      <div class="dt-search-cells">
        <div class="dt-search-cell">
          <Input v-model="params.keyword" class="dt-search-input" style="width: 350px" placeholder="工单号、工单主题、工单内容、代理商、发起人" />
        </div>
      </div>
      <div class="dt-search-operation">
        <Button type="ghost" @click="handleSearch">查询</Button>
        <Button type="success" @click="handleAdd">录入</Button>
      </div>
    </div>
    <dt-table ref="table" url="order/list" :params="params" :columns="columns"></dt-table>
    <Modal v-model="modal1" title="录入" :mask-closable="false">
      <Form ref="form" :model="formData" :rules="rule" :label-width="100">
        <FormItem label="流程名称" prop="flow_id">
          <Select v-model="formData.flow_id" @on-change="selectChangeModal">
            <Option v-for="item in flowList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="流程描述">
          <Input type="textarea" v-model="formData.descr" placeholder="请输入流程描述" disabled></Input>
        </FormItem>
        <FormItem label="主题" prop="topic">
          <Input v-model="formData.topic" placeholder="请输入主题"></Input>
        </FormItem>
        <FormItem label="内容" prop="content">
          <Input type="textarea" v-model="formData.content" placeholder="请输入内容"></Input>
        </FormItem>
        <FormItem label="省市区" prop="code">
          <al-selector ref="code" data-type="name" level="2" v-model="formData.code" style="display: flow-root"  @on-change="areaChangeModal"/>
        </FormItem>
        <FormItem label="详细地址" prop="address">
          <Input v-model="formData.address" placeholder="请输入详细地址"></Input>
        </FormItem>
        <FormItem label="客户名称" prop="sponsor_realname">
          <Input v-model="formData.sponsor_realname" placeholder="请输入客户名称"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="sponsor_phone">
          <Input v-model="formData.sponsor_phone" placeholder="请输入联系电话"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="handleSubmit()">保存</Button>
        <Button type="text" @click="modal1 = false" style="margin-left: 8px">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        params: {
          by_admin: '1',
          keyword: '',
        },
        columns: [
          { title: '工单号', key: 'num' },
          { title: '工单主题', key: 'topic' },
          { title: '工单内容', key: 'content' },
          { title: '代理商',
            key: 'agent_realname',
            width: 200,
            render: (h, params) => {
              const label = `${params.row.agent_realname}/${params.row.agent_phone}`
              return h('span', {}, label)
            }
          },
          { title: '发起人',
            key: 'sponsor_realname',
            width: 200,
            render: (h, params) => {
              const label = `${params.row.sponsor_realname}/${params.row.sponsor_phone}`
              return h('span', {}, label)
            }
          },
          { title: '发起时间',
            key: 'ctime',
            width: 200,
            render: (h, params) => {
              const label = new Date(params.row.ctime*1000).Format("yyyy-MM-dd hh:mm")
              return h('span', {}, label)
            }
          },
        ],
        itemId: 0,
        modal1: false,
        flowList: [],
        formData: {
          flow_id: '',
          topic: '',
          content: '',
          code: ['北京市','市辖区','东城区'],
          address: '',
          sponsor_realname: '',
          sponsor_phone: '',
        },
        rule: {
          
        },
      }
    },
    computed: {
      modelTitle(){
        return this.itemId?'编辑':'新增'
      }
    }, 
    mounted () {
      this.getFlowList();
    },
    methods: {
      getFlowList() {
        this.$post('flow/list',{page: 0}).then( res => {        
          this.flowList = res.data.list;
        })
      },
      selectChangeModal(val) {
        const result = this.flowList.filter( item => item.id == val)
        console.log(result)
        this.formData.descr = result[0].descr;
      },
      areaChangeModal(val) {
        // let [province = '',city = '',district = ''] = val
        // this.formData.province = province
        // this.formData.city = city
        // this.formData.district = district
        if (val.length == 1) {
          this.formData.province = val[0];
        }
        if (val.length == 2) {
          this.formData.province = val[0];
          this.formData.city = val[1];
        }
        if (val.length == 3) {
          this.formData.province = val[0];
          this.formData.city = val[1];
          this.formData.district = val[2];
        }
      },
      handleAdd() {
        this.modal1 = true;
        this.itemId = 0;
        this.$refs.form.resetFields();
        this.$refs.code.isInit = true;
        this.formData.code = ['北京市','市辖区','东城区'];
      },
      handleEdit(item) {
        this.modal1 = true;
        this.itemId = item.id;
      },
      handleSubmit() {
        let params = {}
        if(this.itemId){
          params = Object.assign({},this.formData)
          this.$post('order/add',params).then( res => {
            this.modal1 = false;
            this.handleSearch()
          })
        }else{
          params = Object.assign({},this.formData)
          this.$post('order/add',params).then( res => {
            this.modal1 = false;
            this.handleSearch()
          })
        }
      },
    },
  };
</script>