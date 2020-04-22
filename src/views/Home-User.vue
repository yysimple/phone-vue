<style scoped>
    /*.ivu-layout-sider-children{
        background: antiquewhite;
    }*/
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
  /*  .ivu-menu {
        background: antiquewhite;
    }*/
/*
    .ivu-layout-sider{

    }*/

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

    .ivu-menu-horizontal{
        background: antiquewhite;
    }

    .ivu-menu-item {
        font-size: 12px;
        color: pink;
    }

    .user {
        position: relative;
        margin: 0 10px;
        color: white;
        line-height: 30px;
        font-size: 18px;
        text-align: center;
    }
</style>
<template>
    <div class="layout">
        <Layout>
            <Header :style="{position: 'fixed', width: '100%'}">
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                        <div class="user">{{ username }}</div>
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Button type="primary" @click="outLogin">退出登录</Button>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger
                       :style="{background: '#fff',
                position: 'fixed', height: '100vh', left: 0, overflow: 'auto',marginTop: '64px',marginBottom: '100px'}">
                    <Menu theme="light" width="auto">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-bowtie"/>
                                我的信息
                            </template>
                            <MenuItem to="/uhome/personinfo" name="1-1">查看个人信息</MenuItem>
                            <MenuItem to="/uhome/updateinfo" name="1-2">修改个人信息</MenuItem>
                            <MenuItem to="/uhome/changepwd" name="1-3">修改密码</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-bowtie"/>
                                手机信息
                            </template>
                            <MenuItem to="/uhome/phoneinfo" name="2-1">查看手机信息</MenuItem>
                            <MenuItem to="/uhome/addphoneinfo" name="2-2">添加手机信息</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-bowtie"/>
                                维修信息
                            </template>
                            <MenuItem to="/uhome/orderinfo" name="3-1">查看维修信息</MenuItem>
                        </Submenu>
                        <Submenu name="4">
                            <template slot="title">
                                <Icon type="ios-bowtie"/>
                                通知信息
                            </template>
                            <MenuItem to="/uhome/noticeinfo" name="4-1">查看通知信息</MenuItem>
                        </Submenu>
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
            }
        },
        methods: {
            outLogin() {
                this.$router.push('/')
            }
        }
    }
</script>
