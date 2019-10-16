<template>
  <div style="background:#eee;padding: 20px; width: 600px;">
    <Card :bordered="true" v-show="flag">
      <p style="width: 300px" slot="title"><Icon type="ios-bowtie" size=20 />PersonInfo</p>
      <p href="#" slot="extra">
            <Icon type="md-contact" size=20 />
        </p>
      <div class="card-content">
        <div class="info">
          <label class="title">姓名:</label>
          <input type="text" class="value" :value="personInfo.realName" readonly="readonly" style="border: none;" />
        </div>
        <div class="info">
          <label class="title">性别:</label>
          <input type="text" class="value" :value="personInfo.sex" readonly="readonly" style="border: none;" />
        </div>
        <div class="info">
          <label class="title">生日:</label>
          <input type="text" class="value" :value="personInfo.birthday | dateFormat" readonly="readonly" style="border: none;" />
        </div>
        <div class="info">
          <label class="title">邮箱:</label>
          <input type="text" class="value" :value="personInfo.email" readonly="readonly" style="border: none;" />
        </div>
        <div class="info">
          <label class="title">地址:</label>
          <input type="text" class="value" :value="personInfo.address" readonly="readonly" style="border: none;" />
        </div>
        <div class="info">
          <label class="title">电话:</label>
          <input type="text" class="value" :value="personInfo.telNum" readonly="readonly" style="border: none;" />
        </div>
        <div class="info">
          <label class="title">简介:</label>
          <input type="text" class="value" :value="personInfo.remark" readonly="readonly" style="border: none;" />
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data() {
    return {
      personInfo: {}
    };
  },
  props: {
      userId: String,
      flag: Boolean
  },
  created() {
    this.init();
  },
  methods: {
    init(){
      this.getPersonInfo();
    },
    getPersonInfo(){
      this.$axios
      .post('http://localhost:8080/personinfo/showPersonInfo',qs.stringify({userId: this.userId}))
      .then(res => {
        let resData = res.data;
        if(resData.code === 0){
          this.personInfo = resData.data;
        }
      })
    }
  },
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
