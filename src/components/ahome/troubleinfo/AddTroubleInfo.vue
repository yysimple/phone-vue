<template>
  <div style="background:#eee;padding: 20px;width: 450px">
    <Card :bordered="false">
      <p slot="title">添加故障信息</p>
      <Form :label-width="80">
        <FormItem label="故障码：">
          <Input type="text" v-model="troubleNo" placeholder="trouble no..."></Input>
        </FormItem>
        <FormItem label="故障名：">
          <Input type="text" v-model="troubleName" placeholder="trouble name..."></Input>
        </FormItem>
        <FormItem label="描述：">
          <Input v-model="troubleRemark" type="textarea" :rows="4" placeholder="Enter remark..." />
        </FormItem>
        <FormItem>
          <Button type="primary" long @click="handleSubmit('formCustom')">Submit</Button>
          <br />
          <Button style="margin-top:15px" long @click="handleReset('formCustom')">Reset</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      troubleNo: "",
      troubleName: "",
      troubleRemark: ""
    };
  },
  methods: {
    handleSubmit(name) {
      let params = {
        troubleNo: this.troubleNo,
        troubleName: this.troubleName,
        troubleRemark: this.troubleRemark,
        status: 0
      };
      this.$axios
        .post(
          "http://localhost:8080/troubleinfo/addTroubleInfo",
          qs.stringify(params)
        )
        .then(res => {
          let resData = res.data;
          if (resData.code === 1) {
            this.$Message.info({
              title: "fail",
              content: resData.msg
            });
          } else {
            this.$Message.success({
              content: "添加成功",
              duration: 3,
              closable: true
            });
            this.handleReset();
          }
        });
    },
    handleReset(name) {
      (this.troubleNo = ""), (this.troubleName = ""), (this.troubleRemark = "");
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
