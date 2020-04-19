<template>
  <div class="userlist-container">
    <div style="background:#eee;padding: 20px">
      <Card :bordered="false">
        <p slot="title">故障信息</p>
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
      </Card>
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
          title: "故障码",
          key: "troubleNo"
        },
        {
          title: "故障名",
          key: "troubleName"
        },
        {
          title: "状态",
          key: "status"
        },
        {
          title: "Action",
          key: "action",
          fixed: "right",
          width: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "large"
                  },
                  on: {
                    click: () => {
                      this.changeStatus(params.index);
                    }
                  }
                },
                "切换状态"
              )
            ]);
          }
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
      this.getAllTrouble();
    },
    getCurrent(current) {
      this.current = current;
      this.getAllTrouble();
    },
    getPageSize(pageSize) {
      this.pageSize = pageSize;
      this.getAllTrouble();
    },
    getAllTrouble() {
      let params = {
        currentPage: this.current,
        pageSize: this.pageSize
      };
      this.$axios
        .post(
          "http://123.57.190.160:9130/troubleinfo/findAllTrouble",
          qs.stringify(params)
        )
        .then(res => {
          let resData = res.data; //{code: 0, msg: "成功", data: {…}}
          if (resData.code === 0) {
            this.datas = resData.data.list;
            this.datas.forEach(item => {
              if (item.status === 0) {
                item.status = "可维修";
              } else {
                item.status = "不可维修";
              }
            });
            this.total = resData.data.total;
          } else {
            this.$Message.info({
              content: "未获取到数据...",
              duration: 3,
              closable: true
            });
          }
        });
    },
    changeStatus(index) {
      this.$axios
        .post(
          "http://123.57.190.160:9130/troubleinfo/changStatus",
          qs.stringify({ troubleId: this.datas[index].troubleId })
        )
        .then(res => {
          let resData = res.data;
          if (resData.code === 0) {
            this.getAllTrouble();
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
