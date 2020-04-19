<template>
  <div style="background:#eee;padding: 20px; width: 600px;">
    <div style="margin-bottom: 10px">
      <Input
        v-show="flag"
        v-model="userName"
        @on-search="getPersonInfo"
        @on-blur="getUserInfo"
        search
        enter-button
        placeholder="Enter username..."
      />
    </div>
    <!-- 通过组件注册 -->
    <!-- <person-info
    :userId="userId"
    :flag="flag"
    ></person-info>-->

    <Card :bordered="true" v-if="!flag">
      <p style="width: 300px" slot="title">
        <Icon type="ios-bowtie" size="20" />PersonInfo
      </p>
      <p href="#" slot="extra">
        <Icon type="md-contact" size="20" />
      </p>
      <div class="card-content" v-if="personInfo !== null"><!-- v-if="personInfo.realName !== ''" -->
        <div class="info">
          <label class="title">姓名:</label>
          <input
            type="text"
            class="value"
            :value="personInfo.realName"
            readonly="readonly"
            style="border: none;"
          />
        </div>
        <div class="info">
          <label class="title">性别:</label>
          <input
            type="text"
            class="value"
            :value="personInfo.sex"
            readonly="readonly"
            style="border: none;"
          />
        </div>
        <div class="info">
          <label class="title">生日:</label>
          <input
            type="text"
            class="value"
            :value="personInfo.birthday | dateFormat"
            readonly="readonly"
            style="border: none;"
          />
        </div>
        <div class="info">
          <label class="title">邮箱:</label>
          <input
            type="text"
            class="value"
            :value="personInfo.email"
            readonly="readonly"
            style="border: none;"
          />
        </div>
        <div class="info">
          <label class="title">地址:</label>
          <input
            type="text"
            class="value"
            :value="personInfo.address"
            readonly="readonly"
            style="border: none;"
          />
        </div>
        <div class="info">
          <label class="title">电话:</label>
          <input
            type="text"
            class="value"
            :value="personInfo.telNum"
            readonly="readonly"
            style="border: none;"
          />
        </div>
        <div class="info">
          <label class="title">简介:</label>
          <input
            type="text"
            class="value"
            :value="personInfo.remark"
            readonly="readonly"
            style="border: none;"
          />
        </div>
      </div>
      <Button type="error" long @click="delUser">删除</Button>
    </Card>
  </div>
</template>
<script>
import qs from "qs";
import personInfo from "../../commom/PersonInfo.vue";
export default {
  data() {
    return {
      flag: true,
      userName: "",
      userId: "",
      personInfo: {}
    };
  },
  components: {
    "person-info": personInfo
  },
  methods: {
    getUserInfo() {
      this.$axios
        .post(
          "http://123.57.190.160:9130/user/findUserByUserName",
          qs.stringify({ userName: this.userName })
        )
        .then(res => {
          let resData = res.data;
          if (resData.code === 1) {
            this.$Message.info({
              content: resData.msg,
              duration: 3,
              closable: true
            })
          }else{
            this.userId = resData.data.userId;
            //console.log(resData.data);
          }
        });
    },
    getPersonInfo() {
      console.log(this.userId);
      if(this.userId !== ""){
        this.$axios
        .post(
          "http://123.57.190.160:9130/personinfo/showPersonInfo",
          qs.stringify({ userId: this.userId })
        )
        .then(res => {
          let resData = res.data;
          console.log(resData);
          if (resData.code === 1) {
            this.flag = !this.flag;
            this.$Message.info({
              content: resData.msg,
              duration: 3,
              closable: true
            })
          }else{
            this.personInfo = resData.data;
            console.log(resData.data);
            this.flag = !this.flag;
          }
        });
      }else{
        this.$Message.info({
              content: '此用户不存在',
              duration: 3,
              closable: true
            })
      }
    },
    delUser() {
      if(this.userId !== ""){
        this.$axios
        .post(
          "http://123.57.190.160:9130/user/delUserByUserId",
          qs.stringify({ userId: this.userId })
        )
        .then(res => {
          let resData = res.data;
          if(resData.code === 0){
            if(this.personInfo !== null){
              this.delPerson();
            }else{
              this.$router.push('/ahome/userlist')
              this.$Message.info({
              content: "删除成功",
              duration: 3,
              closable: true
            });
            }
          }
        });
      }else{
        this.$Message.info({
              content: "该用户不存在",
              duration: 3,
              closable: true
            });
      }

    },
    delPerson() {
      this.$axios
        .post(
          "http://123.57.190.160:9130/personinfo/delUserByUserId",
          qs.stringify({ userId: this.userId })
        )
        .then(res => {
          let resData = res.data;
          if (resData.code === 0) {
            this.$router.push('/ahome/userlist');
            this.$Message.info({
              content: "删除成功",
              duration: 3,
              closable: true
            });
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
