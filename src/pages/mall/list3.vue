<template>

  <div class="erweima-body">
    <div class="erweima-header">
      批量生成二维码
    </div>
    <div class="dt-search-top">
      <div class="dt-search-cell">
         请输入需要生成二维码的张数
          <Input
              v-model="params.keyword"
              class="dt-search-input"
              style="width: 100px"
              placeholder="数字"
          />
          <Button type="ghost" @click="handleSubmit">提交</Button>
      </div>
      <div class="history-log">
        <!-- <div class="history-log-header">
          历史记录
        </div> -->
         <!-- <dt-table ref="table" url="/qrcodeToZip" :params="params" :columns="columns"></dt-table> -->
        <!-- <Table highlight-row ref="currentRowTable" :columns="columns" :data="data" border></Table> -->
        
      </div>
      
    </div>
  </div>
</template>
<script>
import Vue from "vue"
import Axios from 'axios';
  export default {
    data () {
      return {
        params: {
          keyword: '',
        },
        formInline:{
          num:3
        },
        columns: [   
            { title: '创建时间',key: 'createdTime'},
            { title: '创建人',key: 'createdBy'},
            { title: '二维码数量',key: 'downloadNum'},
            { title: '操作',key: 'operator',width: 120,
                render: (h, params) => {
                    return h("div", [
                    
                      h(
                        "span",
                        {
                          // domProps:{
                          //    href: params.row.qrcodeUrl,
                          // },
                         
                          class: "span-active",
                          on: {
                            click: () => {
                              this.handleDownload(params.row);
                            }
                          }
                        },
                        "下载"
                      ),
                    
                    ]);
                }
            }  
          ],
      data: [
          {
              username: 'John Brown',
              usermobile: "13812345678",
              userbalance: '100',
      
          },
          {
              username: 'John Brown',
              usermobile: "13812345678",
              userbalance: '100',
      
          },
          {
              username: 'John Brown',
              usermobile: "13812345678",
              userbalance: '100',
      
          },
            {
              username: 'John Brown',
              usermobile: "13812345678",
              userbalance: '100',
      
          },
      ],
      }
    },
    computed: {
    
    }, 
    mounted () {
      
    },
    methods: {
      handleSubmit(){
        // let formData = new FormData();
        // formData.append("num", this.params.keyword);
        // let oParams =  formData;
        // console.log(oParams);
        // let config = {
        //   headers: { "Content-Type": "multipart/form-data" }
        // };
      
        this.$http.get("http://www.lizsh.net/bgApi/qrcodeToZipDownload?num="+this.params.keyword ).then(res=>{
          console.log(this.params.keyword);
          window.location.href="http://www.lizsh.net/bgApi/qrcodeToZipDownload?num="+ this.params.keyword;
          this.handleSearch();
        })
      },
      handleDownload(row){
        console.log(row.qrcodeUrl);
        let Turl = row.qrcodeUrl;
        let params = {
          zipFile:row.qrcodeUrl
        } 
        this.$http.post("/downloadFile", params).then(res=>{
       
             this.$toast("开始下载");
             window.location.href="http://www.lizsh.net/bgApi/downloadFile?zipFile="+Turl;

        })
        console.log("123");
      }
    },
  };
</script>
<style lang="less" scoped>
  .erweima-header{
    position: relative;
    background: #093151;
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
    color:#fff;
  }
  .erweima-content{
    position: relative;
    width:100%;
  }
  .history-log-header{
    height: 40px;
    line-height: 40px;
    background: #093151;
    text-align: center;
    color:#fff;
    margin-top:20px;
  }
</style>
