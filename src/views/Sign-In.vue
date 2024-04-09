<template>
  <div class="sign-in">
    <a-row type="flex" :gutter="[24, 24]" justify="space-around" align="middle">
      <!-- Sign In Form Col-->
      <a-col
        :span="24"
        :md="12"
        :lg="{ span: 12, offset: 0 }"
        :xl="{ span: 6, offset: 2 }"
        class="col-form"
      >
        <h1 class="mb-15">Đăng nhập</h1>
        <h5 class="font-regular text-muted">Nhập email và mật khẩu để đăng nhập</h5>
        <!-- Sign In From -->
        <a-form
          id="form-login"
          :form="form"
          layout="vertical"
          class="login-form"
          @submit="handleSubmit"
          :hideRequiredMark="true"
        >
          <a-form-item class="mb-10" label="Email" labelAlign="" :colon="false">
            <a-input
              v-decorator="[
                'email',
                { rules: [{ required: true, message: 'Please input your email!' }] }
              ]"
              placeholder="Email"
            />
          </a-form-item>
          <a-form-item class="mb-5" label="Mật khẩu" :colon="false">
            <a-input
              v-decorator="[
                'password',
                { rules: [{ required: true, message: 'Please input your password!' }] }
              ]"
              type="password"
              placeholder="Password"
            />
          </a-form-item>

          <a-form-item>
            <a-button type="primary" block html-type="submit" class="login-form-button">
              ĐĂNG NHẬP
            </a-button>
          </a-form-item></a-form
        >
      </a-col>
      <a-col :span="24" :md="12" :lg="12" :xl="12" class="col-img">
        <img src="../../public/images/book.png" alt="" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rememberMe: true
    }
  },
  // beforeCreate() {
  //   this.form = this.$form.createForm(this, { name: 'haha' })
  // },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #ffffff;
}
</style>
