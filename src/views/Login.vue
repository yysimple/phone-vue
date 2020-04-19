<template>
  <div class="login-container">
    <div class="login-content">
      <div style="background:#eee;padding: 20px">
        <Card :bordered="false">
          <p slot="title">PHONE---MARKET</p>
          <Form :label-width="60">
            <FormItem label="用户名">
              <Input type="text" v-model="username"></Input>
            </FormItem>
            <FormItem label="密码">
              <Input type="password" v-model="password" @keyup.enter.native="login"></Input>
            </FormItem>
            <FormItem>
              <Button type="success" ghost long @click="login">Login</Button>
              <br />
              <Button type="primary" ghost long @click="register">Register</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      username: "",
      password: "",
      flag: false,
      userId: '',
    };
  },
  methods: {
    handleSpinCustom(flag) {
      this.$Spin.show({
        render: h => {
          return h("div", [
            h("Icon", {
              class: "demo-spin-icon-load",
              props: {
                type: "ios-loading",
                size: 18
              }
            }),
            h(
              "div",
              flag ? "正在登陆，请稍等..." : "正在前往注册页面，请稍等..."
            )
          ]);
        }
      });
      setTimeout(() => {
        this.$Spin.hide();
      }, 3000);
    },
    login() {
      if (!this.username) {
        this.$Message.info({
          content: "用户名不能为空...",
          duration: 3,
          closable: true
        });
      } else if (!this.password) {
        this.$Message.info({
          content: "密码不能为空...",
          duration: 3,
          closable: true
        });
      } else {
        let params = {
          username: this.username,
          password: this.password
        };
        this.$axios
          .post('http://123.57.190.160:9130/user/login', qs.stringify(params))
          .then(res => {
            let resData = res.data; //{code: 0, msg: "成功", data: {…}}
            if (resData.code === 1) {
              this.$Message.info({
                content: resData.msg,
                duration: 3,
                closable: true
              });
            } else {
              if (resData.data.type === 0) {
                this.userId = resData.data.userId;
                this.handleSpinCustom(true);
                this.$router.push("/ahome");
                setTimeout(() => {
                  this.$Message.info({
                    content: "登录成功...",
                    duration: 3,
                    closable: true
                  });
                }, 3000);
              } else {
                this.userId = resData.data.userId;
                this.handleSpinCustom(true);
                this.$router.push("/uhome");
                setTimeout(() => {
                  this.$Message.info({
                    content: "登录成功...",
                    duration: 3,
                    closable: true
                  });
                }, 3000);
              }
              localStorage.setItem("userId",this.userId);
              localStorage.setItem("username", this.username);
            }
          });
      }
    },
    register() {
      this.handleSpinCustom(false);
      this.$router.push("/register");
      setTimeout(() => {
        this.$Message.info({
          content: "请输入你的信息...",
          duration: 3,
          closable: true
        });
      }, 3000);
    }
  }
};
</script>

<style lang="scss">
.login-container {
  overflow-x: hidden;
  overflow-y: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgb(233, 182, 191);
  .login-content {
    position: relative;
    width: 400px;
    height: 500px;
    margin: 200px auto;
    p {
      color: red;
      font-size: 28px;
      text-align: center;
      margin-bottom: 20px;
    }
    .ivu-btn {
      margin-bottom: 15px;
    }
  }
}
</style>
