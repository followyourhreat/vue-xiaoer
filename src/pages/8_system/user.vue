<template>
  <div>
    <Row :gutter="100">
      <Col span="12">
        <div id="editor-toolbar3" class="editor-toolbar"></div>
        <div id="editor-content3" class="editor-content"></div>
      </Col>
      <Col span="8">
        <div class="preview-phone">
          <div class="preview-html"><span v-html="content"></span></div>
        </div>
      </Col>
      <Col span="24">
        <div class="page-footer">
          <Button type="ghost" @click="handleSubmit()">保存</Button>
          <Button type="text" @click="handleCancel()" style="margin-left: 8px">取消</Button>
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
  import WangeEditor from 'wangeditor';
  export default {
    data () {
      return {
        editor: '',
        content: '',
        copy: ''
      }
    },
    computed: {
      
    }, 
    mounted () {
      this.handleCreate();
    },
    methods: {
      handleCreate() {
        // 富文本配置
        let editor = new WangeEditor('#editor-toolbar3','#editor-content3');
        editor.customConfig.debug = true;
        editor.customConfig.uploadImgServer = '/index.php/admin/upload/upload'; // 服务器地址
        editor.customConfig.uploadFileName = 'image'; // 自定义filename
        editor.customConfig.uploadImgParams = { // 设置图片上传参数
          'target': 'mallbanner'
        };
        editor.customConfig.menus = [ // 富文本显示功能配置
          'head',  // 标题
          'bold',  // 粗体
          'fontSize',  // 字号
          'fontName',  // 字体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          // 'foreColor',  // 文字颜色
          // 'backColor',  // 背景颜色
          'link',  // 插入链接
          // 'list',  // 列表
          'justify',  // 对齐方式
          // 'quote',  // 引用
          // 'emoticon',  // 表情
          'image',  // 插入图片
          // 'table',  // 表格
          // 'video',  // 插入视频
          // 'code' // 插入代码
          'undo',  // 撤销
          'redo'  // 重复
        ]
        // editor.txt.html('<p>请输入正文</p>');
        editor.customConfig.onchange = (html) => {
          this.content = html;
        };
        editor.customConfig.linkImgCallback = function (url) {
          // console.log(url); // url 即插入图片的地址
        };
        editor.customConfig.uploadImgHooks  = {
          customInsert: function (insertImg, result, editor) {
            insertImg(result.data.path)
          }
        };
        editor.create();
        this.editor = editor;
        this.getMessage();
      },
      getMessage() {
        this.$post('configtext/detail',{id: 3}).then( res => {
          this.copy = res.data.content;
          this.content = res.data.content;
          this.editor.txt.html(this.content);
        })
      },
      handleSubmit() {
        this.$post('configtext/edit',
          {
            id: 3,
            content: this.content
          }
        ).then( res => {
          // this.$Message.success('操作成功');
        })
      },
      handleCancel() {
        this.content = this.copy;
        this.editor.txt.html(this.copy);
        this.$Message.success('取消修改');
      }
    },
  };
</script>