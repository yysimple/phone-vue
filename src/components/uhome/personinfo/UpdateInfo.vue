<template>
  <div style="background:#eee;padding: 20px; width: 600px;">
    <Card :bordered="true">
      <p style="width: 300px" slot="title">
        <Icon type="ios-bowtie" size="20" />UpdateInfo
      </p>
      <p slot="extra">
        <Icon type="ios-create-outline" size="20" />
      </p>
      <div class="card-content">
        <div class="info">
          <label class="title">姓名:</label>
          <Input type="text" class="value" clearable v-model="personInfo.realName" />
        </div>
        <div class="info">
          <label class="title">性别:</label>
          <Input type="text" class="value" clearable v-model="personInfo.sex" />
        </div>
        <div class="info">
          <label class="title">生日:</label>
          <br />
          <!-- <Input type="text" class="value" clearable v-model="personInfo.birthday" /> -->
          <DatePicker type="date" placeholder="Select date" v-model="personInfo.birthday"></DatePicker>
        </div>
        <div class="info">
          <label class="title">邮箱:</label>
          <Input type="text" class="value" clearable v-model="personInfo.email" />
        </div>
        <div class="info">
          <label class="title">地址:</label>
          <Input type="text" class="value" clearable v-model="personInfo.address" />
        </div>
        <div class="info">
          <label class="title">电话:</label>
          <Input type="text" class="value" clearable v-model="personInfo.telNum" />
        </div>
        <div class="info">
          <label class="title">简介:</label>
          <Input type="text" class="value" clearable v-model="personInfo.remark" />
        </div>
        <Button type="info" long @click="modal1 = true">Info</Button>
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
export default {
  data() {
    return {
      modal1: false,
      userId: localStorage.getItem("userId"),
      personInfo: {}
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getPersonInfo();
    },
    ok() {
      this.updateInfo();
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
    getPersonInfo() {
      this.$axios
        .post(
          'http://localhost:8080/personinfo/showPersonInfo',
          qs.stringify({ userId: this.userId })
        )
        .then(res => {
          let resData = res.data;
          if (resData.code === 0) {
            this.personInfo = resData.data;
          }
        });
    },
    updateInfo() {
      let params = {
        userId: this.userId,
        realName: this.personInfo.realName,
        sex: this.personInfo.sex,
        birthday: this.personInfo.birthday,
        email: this.personInfo.email,
        address: this.personInfo.address,
        telNum: this.personInfo.telNum,
        remark: this.personInfo.remark
      };
      this.$axios
        .post(
          "http://localhost:8080/personinfo/updatePerson",
          qs.stringify(params)
        )
        .then(res => {
          let resData = res.data;
          if (resData.code === 0) {
            this.handleSpinCustom();
            this.$router.push("/uhome/personinfo");
            setTimeout(() => {
              this.$Message.info({
                content: "修改成功...",
                duration: 3,
                closable: true
              });
            }, 3000);
          }
        });
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
