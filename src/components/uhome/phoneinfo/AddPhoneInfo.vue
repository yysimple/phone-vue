<template>
    <div style="background:#eee;padding: 20px; width: 600px;">
        <Card :bordered="true">
            <p style="width: 300px" slot="title">
                <Icon type="ios-bowtie" size="20"/>
                AddPhoneInfo
            </p>
            <p slot="extra">
                <Icon type="ios-create-outline" size="20"/>
            </p>
            <div class="card-content">
                <div class="info">
                    <label class="title">手机编号:</label>
                    <Input type="text" class="value" clearable v-model="phoneInfo.phoneNo"/>
                </div>
                <div class="info">
                    <label class="title">品牌:</label>
                    <Select v-model="phoneInfo.brand" :max-tag-count="2">
                        <Option v-for="item in brandList" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                </div>
                <div class="info">
                    <label class="title">型号:</label>
                    <Input type="text" class="value" clearable v-model="phoneInfo.model"/>
                </div>
                <div class="info">
                    <label class="title">颜色:</label>
                    <Input type="text" class="value" clearable v-model="phoneInfo.color"/>
                </div>
                <div class="info">
                    <label class="title">价格:</label>
                    <Input type="text" class="value" clearable v-model="phoneInfo.price"/>
                </div>
                <div class="info">
                    <label class="title">购买日期:</label>
                    <br/>
                    <!-- <Input type="text" class="value" clearable v-model="personInfo.birthday" /> -->
                    <DatePicker type="date" placeholder="Select date" v-model="phoneInfo.date"></DatePicker>
                </div>
                <div class="info">
                    <label class="title">简介:</label>
                    <Input type="text" class="value" clearable v-model="phoneInfo.remark"/>
                </div>
                <Button type="info" long @click="modal1 = true">添加</Button>

                <Modal v-model="modal1" title="添加" @on-ok="ok" @on-cancel="cancel">
                    <p>是否进行添加...</p>
                </Modal>

            </div>
        </Card>
    </div>
</template>
<script>
    import qs from "qs";

    export default {
        data() {
            return {
                brandList: [
                    {
                        value: "华为",
                        label: "华为"
                    },
                    {
                        value: "iphone",
                        label: "iphone"
                    },
                    {
                        value: "小米",
                        label: "小米"
                    },
                    {
                        value: "oppo",
                        label: "oppo"
                    },
                    {
                        value: "vivo",
                        label: "vivo"
                    },
                    {
                        value: "三星",
                        label: "三星"
                    }
                ],
                modal1: false,
                userId: localStorage.getItem("userId"),
                phoneInfo: {}
            };
        },
        methods: {
            ok() {
                this.addPhoneInfo();
            },
            cancel() {
                /* this.$Message.info(""); */
            },
            handleSpinCustom() {
                this.$Spin.show({
                    render: h => {
                        return h("div", [
                            h("Icon", {
                                class: "demo-spin-icon-load",
                                props: {
                                    type: "ios-loading",
                                    size: 18
                                }
                            }),
                            h("div", "Loading")
                        ]);
                    }
                });
                setTimeout(() => {
                    this.$Spin.hide();
                }, 3000);
            },
            addPhoneInfo() {
                let params = {
                    userId: this.userId,
                    userName: localStorage.getItem("username"),
                    phoneNo: this.phoneInfo.phoneNo,
                    brand: this.phoneInfo.brand,
                    model: this.phoneInfo.model,
                    color: this.phoneInfo.color,
                    price: this.phoneInfo.price,
                    date: this.phoneInfo.date,
                    remark: this.phoneInfo.remark
                }
                console.log(this.date);
                this.$axios
                    .post('http://123.57.190.160:9130/phoneinfo/addPhoneInfo', qs.stringify(params))
                    .then(res => {
                        let resData = res.data;
                        console.log(resData)
                        if (resData.code === 0) {
                            this.handleSpinCustom();
                            this.$router.push('/uhome/phoneinfo');
                            this.$Message.info({
                                content: '添加成功',
                                duration: 3,
                                closable: true
                            })
                        }
                    })
            }
        }
    };
</script>

<style lang="scss" scoped>
    .card-content {

    .info {
        margin-bottom: 15px;

    input {
        margin-left: 20px;
    }

    }
    }
</style>
