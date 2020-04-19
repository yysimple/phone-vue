<template>
  <div style="background:#eee;padding: 20px; width: 600px;">
    <Card :bordered="true">
      <p style="width: 300px" slot="title">
        <Icon type="ios-bowtie" size="20" />UpdatePwd
      </p>
      <p slot="extra">
        <Icon type="ios-create-outline" size="20" />
      </p>
      <div class="card-content">
        <Form :label-width="80">
            <FormItem label="用户名" prop="username">
              <Input type="text" v-model="username" string></Input>
            </FormItem>
            <FormItem label="输入原密码" prop="passwd">
              <Input type="password" v-model="passwd"></Input>
            </FormItem>
            <FormItem label="输入新密码" prop="passwdCheck">
              <Input type="password" v-model="passwdCheck"></Input>
            </FormItem>
            <FormItem>
              <Button type="info" long @click="modal1 = true">Info</Button>
             <!--  <Button type="primary" long @click="handleSubmit('formCustom')">Submit</Button>
                <br>
              <Button long @click="handleReset('formCustom')">Reset</Button> -->
            </FormItem>

          </Form>
        <Modal
          v-model="modal1"
          title="Update"
          @on-ok="ok"
          @on-cancel="cancel"
        >
          <p>是否进行修改...</p>
        </Modal>
      </div>
    </Card>
  </div>
</template>
<script>
import qs from "qs";
import { log } from 'util';
export default {
  data() {
    return {
      username: localStorage.getItem("username"),
      passwd: '',
      passwdCheck: '',
      modal1: false,
      userId: localStorage.getItem("userId"),
    };
  },
  methods: {
    ok() {
      this.changePwd();
    },
    cancel() {
      /* this.$Message.info(""); */
    },
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
            h("div", "Loading")
          ]);
        }
      });
      setTimeout(() => {
        this.$Spin.hide();
      }, 3000);
    },
    changePwd(){
      let params = {
        userId: this.userId,
        oldPwd: this.passwd,
        newPwd: this.passwdCheck
      };
      this.$axios
      .post('http://123.57.190.160:9130/user/changePwd',qs.stringify(params))
      .then(res => {
        let resData = res.data;
        if(resData.code === 1){
          this.$Message.info({
            title: 'Fail',
            content: resData.msg
          })
        }else{
          this.handleSpinCustom();
          this.$router.push('/');
          setTimeout(() => {
            this.$Message.info({
            content: '修改成功，请从新登录！'
          })
          },3000)
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.card-content {
  .info {
    margin-bottom: 15px;
    input {
      margin-left: 20px;
    }
  }
}
</style>
