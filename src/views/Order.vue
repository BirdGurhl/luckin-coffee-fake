<template>
  <div class="order">
    <!-- 头部导航栏开始 -->
    <div class="nav">
      <van-nav-bar
        title="订单结算"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <!-- 头部导航栏结束 -->
    <!-- 地址栏开始 -->
    <div class="address_box" @click="showPopup">
      <div>选择地址 ></div>
      <div class="center">
        <div class="name">爱丽诗</div>
        <div class="phone">18575844505</div>
        <div class="default">默认</div>
      </div>
      <div class="address">广州市东沙街24号仲恺农业工程学院</div>
    </div>
    <!-- 地址栏结束 -->

    <!-- 订单信息开始 -->
    <div class="orderData">
      <div class="title">订单信息</div>
      <div class="orderItem" v-for="(item, index) in productArr" :key="index">
        <div><img :src="item.small_img" alt="" /></div>
        <div class="content">
          <div class="top">
            <div class="name">{{ item.name }}</div>
            <div class="rule">{{ item.rule }}</div>
          </div>
          <div class="enname">{{ item.enname }}</div>
          <div class="bottom">
            <div class="price">￥{{ item.price }}</div>
            <div class="count">x{{ item.count }}</div>
          </div>
        </div>
      </div>
      <!-- 分割线 -->
      <van-divider dashed />
      <!-- 订单日期、数量、价格汇总 -->
      <div class="sum">
        <div class="date">{{ getCurrentTime }}</div>
        <div class="bottom">
          <div class="count">共计{{ getCount }}件</div>
          <div class="price">合计 ￥{{allPrice}}</div>
        </div>
      </div>
    </div>
    <!-- 订单信息结束 -->

    <div class="submit">
      <van-button round block type="info" native-type="submit"
        >立即结算</van-button
      >
    </div>

    <!-- 编辑地址弹出层 -->
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '50%' }"
    >
      <h3>选择地址</h3>
      <div>
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
        />
      </div>
    </van-popup>
    <!-- 弹出层结束 -->
  </div>
</template>

<script>
import "../assets/less/order.less";
export default {
  data() {
    return {
      show: false,
      sids: this.$route.query.sids,
      time: "",
      productArr: [],
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true,
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号",
        },
        {
          id: "3",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号",
        },
        {
          id: "4",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号",
        },
      ],
    };
  },
  computed: {
    getCurrentTime() {
      //获取当前时间并打印
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      _this.gettime = yy + "/" + mm + "/" + dd + " " + hh + ":" + mf + ":" + ss;
      console.log(_this.gettime);
      return _this.gettime;
    },
    getCount() {
      let count = 0;
      this.productArr.map((o) => {
        count += o.count;
      });
      return count;
    },
    allPrice() {
      let price = 0;
      this.productArr.map((o) => {
        price += o.count * Number(o.price);
      });
      return price;
    },
  },
  created() {
    this.getProduct();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    showPopup() {
      this.show = true;
    },
    onAdd() {
      Toast("新增地址");
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
    },
    getProduct() {
      this.axios({
        method: "get",
        url: "/commitShopcart",
        params: {
          appkey: this.appkey,
          tokenString: localStorage.getItem("token"),
          sids: JSON.stringify(this.sids),
        },
      })
        .then((res) => {
          console.log("查询成功", res);
          if (res.data.code == 50000) {
            this.productArr = res.data.result;
          }
        })
        .catch((err) => {
          console.log("查询失败", err);
        });
    },
  },
};
</script>
