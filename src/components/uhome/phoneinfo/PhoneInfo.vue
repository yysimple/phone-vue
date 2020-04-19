<template>
  <Table border :columns="columns" :data="datas">
    <template slot-scope="{ row }" slot="name">
      <strong>{{ row.name }}</strong>
    </template>
    <template slot-scope="{row,index}" slot="action">
      <Button type="error" size="small" ghost @click="remove(index)">
        <Icon type="ios-trash" size="15" />删除
      </Button>
    </template>
  </Table>
</template>
<script>
import qs from "qs";
import { formatTimeToStr } from "../../../utils/dateFormat.js";
export default {
  data() {
    return {
      columns: [
        {
          title: "编号",
          key: "phoneNo"
        },
        {
          title: "品牌",
          key: "brand"
        },
        {
          title: "型号",
          key: "model"
        },
        {
          title: "颜色",
          key: "color"
        },
        {
          title: "价格",
          key: "price"
        },
        {
          title: "购买日期",
          key: "date"
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      datas: [],
      userId: localStorage.getItem("userId"),
      userName: localStorage.getItem("userName")
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getPhoneInfoByUserId();
    },
    getPhoneInfoByUserId() {
      this.$axios
        .post(
          "http://123.57.190.160:9130/phoneinfo/findPhoneInfoByUserId",
          qs.stringify({ userId: this.userId })
        )
        .then(res => {
          let resData = res.data; //{code: 0, msg: "成功", data: Array(3)}
          if (resData.code === 0) {
            this.datas = resData.data;
            this.datas.forEach(element => {
              element.date = formatTimeToStr(element.date,"yyyy-MM-dd");
            });
          }
        });
    },
    remove(index) {
      let params = {
        phoneId: this.datas[index].phoneId
      };
      this.$axios
        .post(
          "http://123.57.190.160:9130/phoneinfo/delPhoneInfo",
          qs.stringify(params)
        )
        .then(res => {
          let resData = res.data;
          if (resData.code === 0) {
            this.$Message.info({
              content: "删除成功！",
              duration: 3,
              closable: true
            });
          }
        });
      this.datas.splice(index, 1);
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
