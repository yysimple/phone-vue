<template>
  <div style="background:#eee;padding: 20px;width: 450px">
    <Card :bordered="false">
      <p slot="title">添加订单信息</p>
      <Form :label-width="80">
        <FormItem label="用户名：">
          <Input
            type="text"
            v-model="userName"
            @on-blur="getUserId"
            placeholder="Entry username..."
          ></Input>
        </FormItem>
        <FormItem label="手机编号">
          <Select v-model="phoneNo" style="width:200px">
            <Option
              v-for="item in phones"
              :value="item.phoneNo"
              :key="item.phoneId"
            >{{ item.phoneNo }}</Option>
          </Select>
        </FormItem>
        <FormItem label="故障码：">
          <Select v-model="troubleNo" style="width:200px">
            <Option
              v-for="item in troubles"
              :value="item.troubleNo"
              :key="item.troubleId"
            >{{ item.troubleNo }}</Option>
          </Select>
        </FormItem>
        <FormItem label="联系人：">
          <Input
            type="text"
            @on-blur="getTroubleName"
            v-model="contact"
            placeholder="Entry contact..."
          ></Input>
        </FormItem>
        <FormItem label="联系电话：">
          <Input type="text" v-model="contactWay" placeholder="Entry contact way..."></Input>
        </FormItem>
        <FormItem label="描述：">
          <Input v-model="remark" type="textarea" :rows="4" placeholder="Enter remark..." />
        </FormItem>
        <FormItem>
          <Button type="primary" long @click="handleSubmit()">Submit</Button>
          <br />
          <Button style="margin-top:15px" long @click="handleReset()">Reset</Button>
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
      userId: "",
      userName: "",
      phoneNo: "",
      troubleName: "",
      troubleNo: "",
      contact: "",
      contactWay: "",
      remark: "",
      phones: [],
      troubles: []
    };
  },
  methods: {
    getUserId() {
      let params = {
        userName: this.userName
      };
      this.$axios
        .post(
          "http://123.57.190.160:9130/user/findUserByUserName",
          qs.stringify(params)
        )
        .then(res => {
          let resData = res.data;
          if (resData.code === 0) {
            this.userId = resData.data.userId;
            this.getPhone();
          }
        });
    },
    getPhone() {
      let params = {
        userId: this.userId
      };
      this.$axios
        .post(
          "http://123.57.190.160:9130/phoneinfo/findPhoneInfoByUserId ",
          qs.stringify(params)
        )
        .then(res => {
          let resData = res.data;
          if (resData.code === 0) {
            this.phones = resData.data;
            this.getTrouble();
          }
        });
    },
    getTrouble() {
      let params = {
        currentPage: 1,
        pageSize: 1000
      };
      this.$axios
        .post(
          "http://123.57.190.160:9130/troubleinfo/findAllTrouble ",
          qs.stringify(params)
        )
        .then(res => {
          let resData = res.data;
          if (resData.code === 0) {
            this.troubles = resData.data.list;
            console.log(this.troubles)
          }
        });
    },
    getTroubleName() {
      this.troubles.forEach(item => {
        if (item.troubleNo == this.troubleNo) {
          this.troubleName = item.troubleName;
        }
      });
    },
    handleSubmit() {
      let params = {
        userId: this.userId,
        userName: this.userName,
        phoneNo: this.phoneNo,
        troubleName: this.troubleName,
        troubleNo: this.troubleNo,
        contact: this.contact,
        contactWay: this.contactWay,
        remark: this.remark,
        status: 0
      };
      this.$axios
        .post(
          "http://123.57.190.160:9130/orderinfo/addOrderInfo",
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
    handleReset() {
      (this.userName = ""),
        (this.phoneNo = ""),
        (this.troubleNo = ""),
        (this.contact = ""),
        (this.contactWay = ""),
        (this.remark = "");
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
