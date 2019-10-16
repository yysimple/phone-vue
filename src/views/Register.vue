<template>
  <div class="login-container">
    <div class="login-content">
      <div style="background:#eee;padding: 20px">
        <Card :bordered="false">
          <p slot="title">PHONE---MARKET</p>
          <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
            <FormItem label="用户名" prop="username">
              <Input type="text" v-model="formCustom.username" string></Input>
            </FormItem>
            <FormItem label="输入密码" prop="passwd">
              <Input type="password" v-model="formCustom.passwd"></Input>
            </FormItem>
            <FormItem label="重复密码" prop="passwdCheck">
              <Input type="password" v-model="formCustom.passwdCheck"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" long @click="handleSubmit('formCustom')">Submit</Button>
                <br>
              <Button long @click="handleReset('formCustom')">Reset</Button>
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
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password"));
      } else {
        if (this.formCustom.passwdCheck !== "") {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField("passwdCheck");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password again"));
      } else if (value !== this.formCustom.passwd) {
        callback(new Error("The two input passwords do not match!"));
      } else {
        callback();
      }
    };
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("username cannot be empty"));
      }
      // 模拟异步验证效果
      setTimeout(() => {
        if (!(typeof value === "string")) {
          callback(new Error("Please enter a string value"));
        } else {
          if (value.length < 1) {
            callback(new Error("Must be input"));
          } else {
            callback();
          }
        }
      }, 1000);
    };

    return {
      formCustom: {
        passwd: "",
        passwdCheck: "",
        username: ""
      },
      ruleCustom: {
        passwd: [{ validator: validatePass, trigger: "blur" }],
        passwdCheck: [{ validator: validatePassCheck, trigger: "blur" }],
        username: [{ validator: validateName, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSpinCustom() {
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
            h("div", "正在登陆，请稍等...")
          ]);
        }
      });
      setTimeout(() => {
        this.$Spin.hide();
      }, 3000);
      this.$router.push("/uhome")
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let params = {
            username: this.formCustom.username,
            password: this.formCustom.passwd,
            type: 1
          };
          //console.log(params)
          this.$axios
            .post("http://localhost:8080/user/addUser", qs.stringify(params))
            .then(res => {
              let resData = res.data;
              if (resData.code === 1) {
                this.$Message.info({
                  title: "fail",
                  content: resData.msg
                });
              } else {
                this.$Message.success("Success!");
                this.handleSpinCustom();
              }
            });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
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
    .demo-spin-icon-load {
      animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
      from {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(180deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    .demo-spin-col {
      height: 100px;
      position: relative;
      border: 1px solid #eee;
    }
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
