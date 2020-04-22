<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  background: rgba(45,140,240, 1);
  width: 83px;
  height: 30px;
  border-radius: 5px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.ivu-layout-header {
  z-index: 99;
  background: antiquewhite;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: -250px;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.ivu-menu-item {
  font-size: 12px;
  color: pink;
}

.ivu-menu-horizontal{
  background: antiquewhite;
}

.admin {
  position: relative;
  margin: 0 10px;
  color: white;
  line-height: 30px;
  font-size: 16px;
  text-align: center;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header :style="{position: 'fixed', width: '100%'}">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">
            <div class="admin">{{ username }}</div>
          </div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Button type="primary" @click="outLogin">退出登录</Button>
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider
          hide-trigger
          :style="{background: '#fff',
                position: 'fixed', height: '100vh', left: 0, overflow: 'auto',marginTop: '64px',marginBottom: '100px'}"
        >
          <!-- active-name="" , :open-names="['1']" -->
          <Menu theme="light" width="auto">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-bowtie" />用户信息管理
              </template>
              <MenuItem to="/ahome/userlist" name="1-1">查看用户</MenuItem>
              <MenuItem to="/ahome/adduserinfo" name="1-2">添加用户</MenuItem>
              <MenuItem to="/ahome/deleteuser" name="1-3">删除用户</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-bowtie" />手机信息管理
              </template>
              <MenuItem to="/ahome/phonelist" name="2-1">查看手机信息</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-bowtie" />故障信息管理
              </template>
              <MenuItem to="/ahome/troublelist" name="3-1">查看故障信息</MenuItem>
              <MenuItem to="/ahome/addtroubleinfo" name="3-2">添加故障信息</MenuItem>
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                <Icon type="ios-bowtie" />维修订单管理
              </template>
              <MenuItem to="/ahome/orderlist" name="4-1">查看订单</MenuItem>
              <MenuItem to="/ahome/addorderinfo" name="4-2">添加订单</MenuItem>
            </Submenu>
            <Submenu name="5">
              <template slot="title">
                <Icon type="ios-bowtie" />零件管理
              </template>
              <MenuItem to="/ahome/buyparts" name="5-1">购买零件</MenuItem>
              <MenuItem to="/ahome/useparts" name="5-2">使用零件</MenuItem>
            </Submenu>
            <Submenu name="6">
              <template slot="title">
                <Icon type="ios-bowtie" />访问记录
              </template>
              <MenuItem to="/ahome/visitorlist" name="6-1">查看最近访客</MenuItem>
            </Submenu>
            <div style="width: 15px;height: 60px"></div>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px',marginLeft: '200px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: localStorage.getItem("username")
    };
  },
  methods: {
    outLogin() {
      this.$router.push("/");
    }
  }
};
</script>
