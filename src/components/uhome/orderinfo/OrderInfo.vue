<template>
    <Table border :columns="columns" :data="datas"></Table>
</template>
<script>
    import qs from 'qs';
    export default {
        data () {
            return {
                columns: [
                    {
                        title: '手机编号',
                        key: 'phoneNo'
                    },
                    {
                        title: '故障',
                        key: 'troubleName'
                    },
                    {
                        title: '联系人',
                        key: 'contact'
                        //sortable: true
                    },
                    {
                        title: '联系电话',
                        key: 'contactWay'
                    },
                    {
                        title: '维修时间',
                        key: 'createTime',
                        sortable: true
                    },
                    {
                        title: '状态',
                        key: 'status'
                    }
                ],
                datas: [],
                userId: localStorage.getItem("userId")
            }
        },
        created(){
            this.init();
        },
        methods: {
            init(){
                this.getOrderInfo()
            },
            getOrderInfo(){
                let params = {
                    userId: this.userId
                };
                this.$axios
                .post('http://123.57.190.160:9130/orderinfo/findPhoneInfoByUserId',qs.stringify(params))
                .then(res => {
                    let resData = res.data;
                    if(resData.code === 0){
                        this.datas = resData.data;
                        this.datas.forEach(item => {
                            if(item.status === 0){
                                item.status = '已处理'
                            }else{
                                item.status = '未处理'
                            }
                        })
                    }
                })
            }
        },
    }
</script>
