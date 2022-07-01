<template>
  <div class="home">
    <!-- 头部搜索开始 -->
    <div class="search_box">
      <!-- 左边 -->
      <div class="time_user">
        下午好，
        <span>小倩</span>
      </div>
      <!-- 搜索框 -->
      <div class="search">
        <van-search shape="round" placeholder="请输入搜索关键词" />
      </div>
    </div>
    <!-- 头部搜索结束 -->
    <!-- 内容开始 -->
    <div class="home_content">
      <!-- 轮播图开始 -->
      <div class="banner">
        <van-swipe @change="onChange" autoplay="2000">
          <van-swipe-item v-for="item in bannerArr" :key="item.pid">
            <img :src="item.bannerImg" :alt="item.name" />
          </van-swipe-item>
          <template #indicator>
            <div class="dots">
              <div
                class="custom-indicator"
                v-for="(item,index) in bannerArr"
                :key="index"
                :class="{active:current==index}"
                @click="onChange(index)"
              ></div>
            </div>
          </template>
        </van-swipe>
      </div>
      <!-- 轮播图结束 -->
      <!-- 热卖推荐开始 -->
      <div class="hot_recommend">
        <div class="text">热卖推荐</div>
      </div>
      <!-- 热卖推荐结束 -->
      <!-- 产品开始 -->
      <div class="product_box">
        <div class="product_item" v-for="item in productArr" :key="item.pid" @click="toDetail(item.pid)">
          <img :src="item.smallImg" :alt="item.name" />
          <div class="name">{{item.name}}</div>
          <div class="ename">{{item.enname}}</div>

          <div>
            <span>¥{{item.price}}</span>
          </div>
        </div>
      </div>
      <!-- 产品结束 -->
    </div>
  </div>
</template>

<script>
import "../assets/less/home.less";
export default {
  data() {
    return {
      current: 0,
      bannerArr: [],
      productArr: []
    };
  },
  created() {
      this.getBanner();
    this.getProduct();
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    getBanner() {
      this.axios({
        // 请求的方式
        methods: "get",
        // 请求的路径
        url: "/banner",
        // 请求的参数
        params: {
          appkey: this.appkey
        }
      })
        .then(res => {
          console.log("轮播图请求成功", res);
          if (res.data.code == 300) {
            this.bannerArr = res.data.result;
          } else {
            console.log("this", this);
            this.$toast("网络失败");
          }
        })
        .catch(err => {
          console.log("轮播图请求失败", err);
        });
    },
    getProduct() {
      this.axios({
        // 请求的方式
        methods: "get",
        // 请求的路径
        url: "http://www.kangliuyong.com:10002/typeProducts",
        // 请求的参数
        params: {
          appkey: this.appkey,
          key: "isHot",
          value: 1
        }
      })
        .then(res => {
          console.log("商品请求成功", res);
          if (res.data.code == 500) {
            this.productArr = res.data.result;
          } else {
            console.log("this", this);
            this.$toast("网络失败");
          }
        })
        .catch(err => {
          console.log("商品请求失败", err);
        });
    },
    toDetail(pid) {
      console.log(pid);
      this.$router.push({ name: "Detail", query: { pid } });
    }
  }
};
</script>

<style lang="less" scoped>
// scoped 私有 这里面的 样式只有在这个页面才生效
// 如果不加  有可能和别的  页面  样式冲突
</style>