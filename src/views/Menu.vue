<template>
  <div class="menu">
    <!-- 头部搜索框开始 -->
    <div class="search_box">
      <van-search shape="round" placeholder="请输入搜索关键词" />
    </div>
    <!-- 头部搜索框结束 -->
    <!-- 商品类型选择开始 -->
    <div class="productType_box">
      <div
        class="type_one"
        v-for="(item, index) in typeData"
        :key="index"
        @click="changeType(index)"
      >
        <img :src="iconIndex == index ? item.active : item.inactive" alt />
        <p :class="{ active: iconIndex == index, latte: 0 == index }">
          {{ item.typeDesc }}
        </p>
      </div>
    </div>
    <!-- 商品类型选择结束 -->
    <!-- 商品栏目开始 -->
    <div class="productList">
      <div
        class="productItem"
        v-for="(item, index) in productArr"
        :key="index"
        @click="toDetail(item.pid)"
      >
        <!-- 商品图片 -->
        <div class="pImg">
          <img :src="item.smallImg" alt />
        </div>
        <!-- 商品名称 -->
        <div class="name">
          <span>{{ item.name }}</span>
          <span>{{ item.enname }}</span>
        </div>
        <!-- 商品价格 -->
        <div class="price">¥{{ item.price }}</div>
      </div>
    </div>
    <!-- 商品栏目结束 -->

    <!-- <ProductItem :title="title" @fchange="fchange($event)"></ProductItem> -->
  </div>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue'
import "../assets/less/menu.less";
export default {
  data() {
    return {
      title: "我是皇族white，我和faker五五开。",
      iconIndex: 0,
      productArr: [],
      typeData: [
        {
          // 选中时
          active: require("../assets/icons/icons_19.gif"),
          //   未选中时
          inactive: require("../assets/icons/icons_05.gif"),
          typeDesc: "拿铁",
          type: "latte",
        },
        {
          active: require("../assets/icons/icons_18.gif"),
          inactive: require("../assets/icons/icons_03.gif"),
          typeDesc: "咖啡",
          type: "coffee",
        },
        {
          active: require("../assets/icons/icons_20.gif"),
          inactive: require("../assets/icons/icons_07.gif"),
          typeDesc: "瑞纳冰",
          type: "rena_ice",
        },
        {
          active: require("../assets/icons/icons_22.png"),
          inactive: require("../assets/icons/icons_11.gif"),
          typeDesc: "水果茶",
          type: "fruit_tea",
        },
      ],
    };
  },
  created() {
    this.getType();
    this.getProduct();
  },
  methods: {
    getType() {
      this.axios({
        // 请求的方式
        methods: "get",
        // 请求的路径
        url: "/type",
        // 请求的参数
        params: {
          appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        },
      })
        .then((res) => {
          console.log("类型请求成功", res);
        })
        .catch((err) => {
          console.log("类型请求失败", err);
        });
    },
    getProduct() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.axios({
        // 请求的方式
        methods: "get",
        // 请求的路径
        url: "/typeProducts",
        // 请求的参数
        params: {
          appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
          key: "type",
          value: this.typeData[this.iconIndex].type,
        },
      })
        .then((res) => {
          console.log("商品请求成功", res);
          if (res.data.code == 500) {
            this.productArr = res.data.result;
            this.$toast.clear();
          } else {
            console.log("this", this);
            this.$toast("网络失败");
          }
        })
        .catch((err) => {
          console.log("商品请求失败", err);
        });
    },
    changeType(index) {
      this.iconIndex = index;
      this.getProduct();
    },
    toDetail(pid) {
      console.log(pid);
      this.$router.push({ name: "Detail", query: { pid } });
    },
    fchange(text) {
      this.title = text;
    },
  },
};
</script>

<style lang="less" scoped>
</style>