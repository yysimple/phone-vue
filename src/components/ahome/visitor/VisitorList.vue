<template>
  <div class="userlist-container">
    <Table stripe :columns="columns" :data="datas"></Table>
    <div class="page">
      <Page
        :total="total"
        :current="current"
        :placement="placement"
        @on-change="getCurrent"
        :page-size="pageSize"
        @on-page-size-change="getPageSize"
        show-sizer
        show-total
        show-elevator
        :page-size-opts="[10,15,20,25]"
      />
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      columns: [
        {
          title: "用户名",
          key: "visitorName"
        },
        {
          title: "访问时间",
          key: "visitorTime"
        }
      ],
      datas: [],
      current: 1,
      pageSize: 10,
      total: 0,
      placement: "top"
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getAllVisitor();
    },
    getCurrent(current) {
      this.current = current;
      this.getAllVisitor();
    },
    getPageSize(pageSize) {
      this.pageSize = pageSize;
      this.getAllVisitor();
    },
    getAllVisitor() {
      let params = {
        currentPage: this.current,
        pageSize: this.pageSize
      };
      this.$axios
        .post("http://123.57.190.160:9130/visitor/findAll", qs.stringify(params))
        .then(res => {
          let resData = res.data; //{code: 0, msg: "成功", data: {…}}
          console.log(resData);
          if (resData.code === 0) {
            this.datas = resData.data.list;
            this.total = resData.data.total;
          } else {
            this.$Message.info({
              content: "未获取到数据...",
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
.userlist-container {
  .page {
    text-align: center;
    margin-top: 15px;
  }
}
</style>
