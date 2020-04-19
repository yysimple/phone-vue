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
        <Button type="success" ghost style="margin-left: 15px" @click="getByTime">按时间排序</Button>
        <Button type="success" ghost style="margin-left: 15px" @click="showDeal">显示已处理</Button>
        <Button type="success" ghost style="margin-left: 15px" @click="showUnDeal">显示未处理</Button>
      </div>
    </Card>
    <Table stripe :columns="columns" :data="datas">
      <template slot-scope="{ row, index }" @on-row-click="getIndex" slot="action">
        <Button
          v-if="row.status === 0"
          type="success"
          size="small"
          ghost
          style="margin-right: 5px"
          @click="changeStatus(index)"
        >
          <Icon type="md-build" />处理
        </Button>
        <Button type="error" size="small" ghost @click="remove(index)">
          <Icon type="ios-trash" size="15" />删除
        </Button>
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
  </div>
</template>

<script>
import qs from "qs";
import { formatTimeToStr } from "../../../utils/dateFormat.js";
export default {
  data() {
    return {
      flag: true,
      typeList: [
        {
          value: "troubleNo",
          label: "-- 故障编号 --"
        },
        {
          value: "troubleName",
          label: "-- 故障名称 --"
        },
        {
          value: "contact",
          label: "-- 联系人 --"
        },
        {
          value: "userName",
          label: "-- 所属用户 --"
        }
      ],
      type: "",
      keywords: "",
      index: "",
      columns: [
        {
          title: "手机编号",
          key: "phoneNo"
        },
        {
          title: "故障名",
          key: "troubleName"
        },
        {
          title: "所属用户",
          key: "userName"
        },
        {
          title: "联系人",
          key: "contact"
        },
        {
          title: "联系方式",
          key: "contactWay"
        },
        {
          title: "创建时间",
          key: "createTime"
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      datas: [],
      userName: "",
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
      this.getAllOrder();
    },
    getCurrent(current) {
      this.current = current;
      this.getAllOrder();
    },
    getPageSize(pageSize) {
      this.pageSize = pageSize;
      this.getAllOrder();
    },
    getIndex(index){
        this.index = index;
    },
    getAllOrder() {
      let params = {
        currentPage: this.current,
        pageSize: this.pageSize
      };
      this.$axios
        .post(
          "http://123.57.190.160:9130/orderinfo/findAllOrderInfo",
          qs.stringify(params)
        )
        .then(res => {
          let resData = res.data;
          if (resData.code === 0) {
            this.datas = resData.data.list;
            this.datas.forEach(element => {
              /* if (element.status == 0) {
                this.flag = true;
              } else {
                this.flag = false;
              } */
              element.date = formatTimeToStr(
                element.date,
                "yyyy-MM-dd hh:mm:ss"
              );
            });
          }
        });
    },
    changeStatus(index) {
      this.$axios
        .post(
          "http://123.57.190.160:9130/orderinfo/changeStatus",
          qs.stringify({ orderId: this.datas[index].orderId })
        )
        .then(res => {
          let resData = res.data;
          if (resData.code === 0) {
            this.getAllOrder();
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
          "http://123.57.190.160:9130/orderinfo/searchOrderInfo",
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
            } else {
              this.$Message.info({
                content: "无此类型相关的故障",
                duration: 3,
                closable: true
              });
            }
          }
        });
    },
    getByTime() {
      this.$axios
        .post("http://123.57.190.160:9130/orderinfo/findBySort")
        .then(res => {
          let resData = res.data;
          //console.log(resData);
          if (resData.code === 0) {
            this.datas = resData.data;
          }
        });
    },
    showDeal() {
      this.$axios
        .post("http://123.57.190.160:9130/orderinfo/findDealOrder")
        .then(res => {
          let resData = res.data;
          //console.log(resData);
          if (resData.code === 0) {
            this.datas = resData.data;
          }
        });
    },
    showUnDeal() {
      this.$axios
        .post("http://123.57.190.160:9130/orderinfo/findUndealOrder")
        .then(res => {
          let resData = res.data;
          //console.log(resData);
          if (resData.code === 0) {
            this.datas = resData.data;
          }
        });
    },
    remove(index) {
      let params = {
        orderId: this.datas[index].orderId
      }
      this.$axios
      .post('http://123.57.190.160:9130/orderinfo/delOrderInfo',qs.stringify(params))
      .then(res => {
        let resData = res.data;
        if(resData.code === 0){
          this.$Message.info({
            content: '删除成功',
            duration: 3,
            closable: true
          })
        }else{
          this.$Message.info({
            content: '删除失败',
            duration: 3,
            closable: true
          })
        }
      })
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
