<template>
  <div class="partsinfo-container" style="background:#eee;padding: 20px">
    <Card :bordered="false">
      <p slot="title">使用零件</p>
      <Table border :columns="columns" :data="datas">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="success" ghost size="small" @click="useParts(index)">使用</Button>
        </template>
      </Table>
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
    </Card>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      columns: [
        {
          title: "名称",
          key: "partsName"
        },
        {
          title: "价格(元)",
          key: "partsPrice"
        },
        {
          title: "库存(件)",
          key: "num"
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center"
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
      this.getParts();
    },
    getCurrent(current) {
      this.current = current;
      this.getParts();
    },
    getPageSize(pageSize) {
      this.pageSize = pageSize;
      this.getParts();
    },
    getParts() {
      let params = {
        currentPage: this.current,
        pageSize: this.pageSize
      };
      this.$axios
        .post(
          "http://localhost:8080/partsinfo/findAllParts",
          qs.stringify(params)
        )
        .then(res => {
          let resData = res.data;
          if (resData.code === 0) {
            this.datas = resData.data.list;
            console.log(this.datas);
          } else {
            this.$Message.info({
              content: "获取失败",
              duration: 3,
              closable: true
            });
          }
        });
    },

    useParts(index) {
      let params = {
        partsId: this.datas[index].partsId
      };
      this.$axios
        .post("http://localhost:8080/partsinfo/useParts", qs.stringify(params))
        .then(res => {
          let resData = res.data;
          if (resData.code === 0) {
              this.getParts();
            this.$Message.info({
              content: "使用成功",
              duration: 1.5,
              closable: true
            });
          } else {
            this.$Message.info({
              content: "获取失败",
              duration: 1.5,
              closable: true
            });
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.partsinfo-container {
  .page {
    text-align: center;
    margin-top: 15px;
  }
}
</style>