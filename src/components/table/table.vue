<template>
  <div class="table-wrap">
    <Table
      ref="table"
      :data="arrList"
      :columns="currColumns"
      :loading="loading"
      no-data-text="暂时没有数据"
      @on-selection-change="handleSelectChange"
    ></Table>

    <div class="table-page" v-show="pageable">
      <!-- <span>{{ page.currPageSize }}</span> -->
      <Page
        :total="page.currTotal"
        :page-size="page.currPageSize"
        :current="page.currCurrent"
        show-total
        show-elevator 
        @on-change="pageChange"
      >
        <span>{{ pageNum }} 条 / 页  共{{page.currTotal}}页</span>
      </Page>
    </div>
  </div>
</template>

<script>
export default {
  name: "dtTable",
  props: {
    url: String,
    params: {
      type: Object,
      default() {
        return {};
      }
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    pageable: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      loading: false,
      currUrl: this.url,
      currParams: this.params,
      currColumns: this.columns,
      arrList: [],
      page: {
        currTotal: 0,
        currCurrent: 1,
        currPageSize: 10
      },
      selection: [],
      pageNum: ""
    };
  },
  watch: {
    arrList(val) {
      this.pageNum = val.length;
    },
    params(val) {
      this.currParams = val;
      this.page.currCurrent = 1;
      this.getList();
    }
  },
  computed: {},
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.selection = [];
      this.loading = true;
      var param = Object.assign({}, this.currParams, {
        pageNo: this.page.currCurrent
      });
      this.$http.post(this.currUrl, param).then(res => {
        this.loading = false;
      
     
        // if(res.data.list[0].qrcodeUrl !== undefined){
        //   for(var i= 0;i<res.data.list.length;i++){
        //     res.data.list[i].qrcodeUrl = "http://192.168.2.117:8080/LZCloudPlatform"+res.data.list[i].qrcodeUrl;
        //   }
        //   this.arrList = res.data.list;
        // }else{
          this.arrList = res.data.list;
        // }
        
          
          console.log(this.arrList);
        //  this.arrList = res.data;
        if( Number(res.data.totalPageCount) == "NaN"){
          this.page.currTotal = 0;
        }else{
           this.page.currTotal = Number(res.data.totalPageCount);
        }
       
        this.page.currPageSize = Number(res.data.list.length);
        
      });
    },
    pageChange(num) {
      this.page.currCurrent = num;
      this.getList();
    },
    handleSelectChange(selection) {
      this.selection = selection;
    },
    // 返回选中数组,默认是id
    getSelect(key = "id") {
      return this.selection.map(item => item[key]);
    }

  }
};
</script>

<style lang="less" scoped>
.table-wrap {
  padding: 0px 20px;
  .table-page {
    text-align: right;
    padding: 20px 0px;
  }
}
</style>
