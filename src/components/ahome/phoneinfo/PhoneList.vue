<template>
  <div class="phoneinfo-container">
    <Card :bordered="false">
      <p slot="title">手机信息</p>
      <div>
        <Select v-model="type" style="width:120px" placeholder="-- 请选择类型 --">
          <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Input
          v-model="keywords"
          placeholder="Enter you want to search..."
          style="width: 300px;margin-left: 10px;margin-right: 10px"
        />
        <Button type="primary" icon="ios-search" @click="search">Search</Button>
      </div>
    </Card>
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
import { formatTimeToStr } from "../../../utils/dateFormat.js";
export default {
  data() {
    return {
      typeList: [
        {
          value: "color",
          label: "-- 颜色 --"
        },
        {
          value: "brand",
          label: "-- 品牌 --"
        },
        {
          value: "userName",
          label: "-- 用户名 --"
        }
      ],
      type: "",
      keywords: "",
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
          title: "所属用户",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    ghost: true
                  },
                  style: {
                    marginRight: "5px",
                    color: "green"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                this.datas[params.index].userName
              )
            ]);
          }
        }
      ],
      datas: [],
      userName: '',
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
      this.getAllPhone();
    },
    getCurrent(current) {
      this.current = current;
      this.getAllUser();
    },
    getPageSize(pageSize) {
      this.pageSize = pageSize;
      this.getAllUser();
    },
    getAllPhone() {
      let params = {
        currentPage: this.current,
        pageSize: this.pageSize
      };
      this.$axios
        .post(
          "http://localhost:8080/phoneinfo/findAllPhoneInfo",
          qs.stringify(params)
        )
        .then(res => {
          let resData = res.data;
          if (resData.code === 0) {
            this.datas = resData.data.list;
            this.datas.forEach(element => {
              element.date = formatTimeToStr(element.date, "yyyy-MM-dd");
            });
          }
        });
    },
    search() {
      let params = {
        currentPage: this.current,
        pageSize: this.pageSize,
        type: this.type,
        keywords: this.keywords
      };
      this.$axios
        .post(
          "http://localhost:8080/phoneinfo/searchPhoneInfo",
          qs.stringify(params)
        )
        .then(res => {
          let resData = res.data;
          if (resData.code === 1) {
            this.$Message.info({
              content: resData.msg,
              duration: 3,
              closable: true
            });
          } else {
            if (resData.data.list !== null) {
              this.datas = resData.data.list;
              this.datas.forEach(element => {
                element.date = formatTimeToStr(element.date, "yyyy-MM-dd");
              });
            }else{
              this.$Message.info({
                content: '无此类型相关的手机',
                duration: 3,
                closable: true
              })
            }
          }
        });
    },
    remove(index) {
      this.datas.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.phoneinfo-container {
  .page {
    text-align: center;
    margin-top: 15px;
  }
}
</style>