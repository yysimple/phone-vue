<template>
  <div class="userlist-container">
    <div style="background:#eee;padding: 20px">
      <Card :bordered="false">
        <p slot="title">用户信息</p>
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
          title: "姓名",
          key: "userName"
        },
        {
          title: "身份",
          key: "type"
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
      placement: "top",
      userId: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getAllUser();
    },
    getCurrent(current) {
      this.current = current;
      this.getAllUser();
    },
    getPageSize(pageSize) {
      this.pageSize = pageSize;
      this.getAllUser();
    },
    getAllUser() {
      let params = {
        currentPage: this.current,
        pageSize: this.pageSize
      };
      this.$axios
        .post("http://localhost:8080/user/findAll", qs.stringify(params))
        .then(res => {
          let resData = res.data; //{code: 0, msg: "成功", data: {…}}
          if (resData.code === 0) {
            this.datas = resData.data.list;
            this.datas.forEach(item => {
              if (item.type === 0) {
                item.type = "管理员";
              } else {
                item.type = "用户";
              }
              if (item.status === 0) {
                item.status = "正常用户";
              } else {
                item.status = "禁用用户";
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
          "http://localhost:8080/user/changeStatus",
          qs.stringify({ userId: this.datas[index].userId })
        )
        .then(res => {
          let resData = res.data;
          if (resData.code === 0) {
            this.getAllUser();
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
