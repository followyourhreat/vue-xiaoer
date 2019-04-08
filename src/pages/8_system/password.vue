<template>
  <div>
    <div class="page-form">
      <Form ref="form" :model="formData" :rules="rule" :label-width="100">
        <FormItem label="原密码" prop="old_password">
          <Input
            v-model="formData.old_password"
            autocomplete="off"
            placeholder="请输入原密码"
            :maxlength="18"
          ></Input>
        </FormItem>
        <FormItem label="新密码" prop="new_password">
          <Input
            v-model="formData.new_password"
            placeholder="请输入新密码"
            type="password"
            autocomplete="off"
            :maxlength="18"
          ></Input>
        </FormItem>
        <FormItem label="确认密码" prop="renew_password">
          <Input
            v-model="formData.renew_password"
            placeholder="请输入确认密码"
            type="password"
            :maxlength="18"
          ></Input>
        </FormItem>
        <FormItem label prop>
          <Button type="ghost" @click="handleSubmit()">保存</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        old_password: "",
        new_password: "",
        renew_password: ""
      },
      rule: {}
    };
  },
  computed: {},
  mounted() {
    // this.formData.old_password = localStorage.getItem("password");
  },
  methods: {
    handleSubmit() {
      if (this.formData.new_password != this.formData.renew_password) {
        this.$Message.warning("2次输入密码不一致");
        return;
      }
      this.$post("admin/editpwd", {
        old_password: this.formData.old_password,
        new_password: this.formData.new_password
      }).then(res => {
        this.$router.push({ name: "login" });
        // this.$Message.success('操作成功');
      });
    }
  }
};
</script>