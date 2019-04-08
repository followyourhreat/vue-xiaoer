<template>
  <div>
    <Tabs type="card">
      <TabPane label="引导页设置">
        <div class="startUp-box">
          <ul class="startUp-ul">
            <li class="startUp-li" v-for="(item,index) in imageList" :key="item.id" :name="index">
              <img :src="item" alt>
              <Icon class="delImg" type="close" @click.native="delImg2(imageList, index)"/>
            </li>
          </ul>
        </div>
        <Form ref="form" :model="formData" :rules="rule" :label-width="100">
          <FormItem label prop="startup">
            <div v-for="(item,index) in uploadList" class="formListImg" :key="item.id">
              <img class="formItemImg" :src="item">
              <Icon class="delImg" type="close" @click.native="delImg(uploadList, index)"/>
            </div>
            <Upload
              type="drag"
              action="http://120.24.55.58:8146//upload/upload"
              :show-upload-list="false"
              :default-file-list="defaultList"
              :data="uploadData"
              name="image"
              accept=".png, .jpg, .jpeg, .gif"
              :before-upload="beforeUpload"
              :on-success="onSuccess"
            >
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>上传图片</p>
              </div>
            </Upload>
          </FormItem>
        </Form>
        <div class="footer">
          <Button type="ghost" @click="handleSubmit5()">确定</Button>
        </div>
      </TabPane>
      <TabPane label="用户协议">
        <Form :model="formItem2" :label-width="0">
          <FormItem label>
            <Input
              v-model="formItem2.content"
              type="textarea"
              :autosize="{minRows: 10,maxRows: 30}"
              placeholder="Enter something..."
            ></Input>
          </FormItem>
          <FormItem>
            <Button style="margin-left: 8px">取消</Button>
            <Button type="primary" @click="handleSubmit2()">保存</Button>
          </FormItem>
        </Form>
      </TabPane>
      <TabPane label="公司信息">
        <Form :model="formItem3" :label-width="0">
          <FormItem label>
            <Input
              v-model="formItem3.content"
              type="textarea"
              :autosize="{minRows: 10,maxRows: 20}"
              placeholder="Enter something..."
            ></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit3()">保存</Button>
            <Button style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>
      </TabPane>
      <TabPane label="常见问题">
        <Form :model="formItem4" :label-width="0">
          <FormItem label>
            <Input
              v-model="formItem4.content"
              type="textarea"
              :autosize="{minRows: 10,maxRows: 20}"
              placeholder="Enter something..."
            ></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit4()">保存</Button>
            <Button style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgName: "",
      visible: false,
      uploadData: {
        target: "startup"
      },
      defaultList: [],
      rule: {},
      formData: {
        type: "1",
        name: "",
        startup: "",
        file: ""
      },
      AdsList: [],
      formItem: {
        itemId: "1",
        content: ""
      },
      formItem2: {
        itemId: "2",
        content: ""
      },
      formItem3: {
        itemId: "3",
        content: ""
      },
      formItem4: {
        itemId: "4",
        content: ""
      },
      uploadList: [],
      imageList: []
    };
  },
  computed: {
    // uploadlist: function() {
    //   console.log(this.uploadlist);
    //   return this.$refs.upload.fileList;
    // }
  },
  mounted() {
    this.getAdsList();
    this.getAgreement();
    this.getCompany();
    this.getQuestion();
  },
  methods: {
    getAdsList() {
      this.$post("appsetting/detail", { id: 1 }).then(res => {
        this.AdsList = res.data.content;
        this.imageList = res.data.content.split(",");
        console.log(this.imageList);
      });
    },
    getAgreement() {
      this.$post("appsetting/detail", { id: 2 }).then(res => {
        this.formItem2 = res.data;
      });
    },
    getCompany() {
      this.$post("appsetting/detail", { id: 3 }).then(res => {
        this.formItem3 = res.data;
      });
    },
    getQuestion() {
      this.$post("appsetting/detail", { id: 4 }).then(res => {
        this.formItem4 = res.data;
      });
    },
    handleSubmit2() {
      this.$post("appsetting/edit", {
        content: this.formItem2.content,
        id: 2
      }).then(res => {
        // this.$Message.success("操作成功");
      });
    },
    handleSubmit3() {
      this.$post("appsetting/edit", {
        content: this.formItem3.content,
        id: 3
      }).then(res => {
        // this.$Message.success("操作成功");
      });
    },
    handleSubmit4() {
      this.$post("appsetting/edit", {
        content: this.formItem4.content,
        id: 4
      }).then(res => {
        // this.$Message.success("操作成功");
      });
    },
    handleSubmit5() {
      this.$post("appsetting/edit", {
        content: this.imageList.join(","),
        id: 1
      }).then(res => {
        // this.$Message.success("操作成功");
      });
    },
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    beforeUpload() {
      if (this.imageList.length < 9) {
        return true;
      } else {
        return false;
      }
    },
    delImg(list, index) {
      list.splice(index, 1);
    },
    delImg2(list, index) {
      list.splice(index, 1);
      this.$post("appsetting/edit", {
        content: list.join(","),
        id: 1
      }).then(res => {
        // this.$Message.success("操作成功");
      });
    },
    // 上传图片
    onSuccess(response, file, fileList) {
      // this.formData.startup = response.data.path;

      this.imageList.push(response.data.path);
      // console.log(typeof this.uploadList);
    },

    handleUpload(file) {
      // 上传文件前的事件钩子
      // 选择文件后 这里判断文件类型 保存文件 自定义一个keyid 值 方便后面删除操作
      let keyID = Math.random()
        .toString()
        .substr(2);
      file["keyID"] = keyID;
      // 保存文件到总展示文件数据里
      this.file.push(file);
      // 保存文件到需要上传的文件数组里
      this.uploadFile.push(file);
      // 返回 falsa 停止自动上传 我们需要手动上传
      return false;
    },
    delectFile(keyID) {
      // 删除文件
      // 删除总展示文件里的当前文件
      this.file = this.file.filter(item => {
        return item.name != name;
      });
      // 删除需要上传文件数据里的当前文件
      this.uploadFile = this.uploadFile.filter(item => {
        return item.KeyID != keyID;
      });
    },
    upload() {
      // 上传文件
      for (let i = 0; i < this.uploadFile.length; i++) {
        let item = this.file[i];
        this.$refs.upload.post(item);
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "Up to five pictures can be uploaded."
        });
      }
      return check;
    },

    getLogList() {
      this.$post("log/login", { page: 0 }).then(res => {
        this.logList = res.data.list;
      });
    },
    //接收子组件emit的事件
    getImgUrl(data) {
      //data  得到的就是返回的图片路径的相关参数
    },

    handleSubmit() {
      // 自定义验证规则
      // let vArr = [
      //   [this.formData.username, '账号', 'empty'],
      //   [this.formData.real_name, '姓名', 'empty'],
      // ];
      // this.$validate(vArr).then(valid => {

      // });
      console.log(this.formData);
      // if (!/^1[0-9]{10}$/.test(this.formData.phone)) {
      //   this.$Message.destroy();
      //   this.$Message.warning("请输入正确格式的手机号");
      //   return;
      // }
      var params = {};
      if (this.itemId) {
        params = Object.assign({}, this.formData, { id: this.itemId });
        this.$post("appsetting/detail", params).then(res => {
          this.modal1 = false;
          this.handleSearch();
          // this.$post('agent/detail', {}).then( res => {
          //   this.$store.dispatch('setUserInfoAction',res.data)
          // })
        });
      } else {
        params = Object.assign({}, this.formData);
        this.$post("appsetting/add", params).then(res => {
          this.modal1 = false;
          this.handleSearch();
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.pickerMap {
  width: 100%;
  height: 388px;
  margin-top: 10px;
}
.title {
  padding-left: 8px;
  border-left: 10px solid #093151;
}
.cell {
  display: flex;
  justify-content: space-between;
  padding: 5px 0px;
}
.btn {
  border-radius: 5px;
  padding: 5px 10px;
  margin: 0px 10px 10px 0px;
  color: #ffffff;
  background: #d8d8d8;
  display: inline-block;
}
.formItemImg {
  width: 150px;
  height: 150px;
}
.formListImg {
  position: relative;
  float: left;
}
.ivu-upload {
  clear: both;
  width: 150px;
  display: block;
}
.startUp-ul {
  position: relative;
  overflow: hidden;
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: 100px;
}
.startUp-li {
  position: relative;
  float: left;
  border: 3px solid #f6f8fc;
  margin: 5px 10px;
  list-style-type: none;
  transition: ease in all 0.2s;
}
.startUp-li:hover {
  // border: 3px solid #093151;
}
.startUp-li img {
  width: 150px;
  height: auto;
}
.ivu-tabs-tabpane .footer {
  margin-left: 100px;
}
.startUp-li .ivu-icon {
  position: absolute;
  top: 0px;
  right: 0;
  cursor: pointer;
}
</style>