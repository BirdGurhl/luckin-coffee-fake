<template>
  <div class="detail">
    <!-- 头部开始 -->
    <div class="nav">
      <van-nav-bar
        fixed
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="goBack"
      />
    </div>
    <!-- 头部结束 -->
    <!-- banner开始 -->
    <div class="banner">
      <img :src="result.large_img" alt />
    </div>
    <!-- banner结束 -->
    <!-- 具体详情开始 -->
    <div class="all_detail">
      <!-- 标题 -->
      <div class="tittle">
        <div class="left">
          <div class="name">{{ result.name }}</div>
          <div class="enname">{{ result.enname }}</div>
        </div>
        <div class="right">￥{{ result.price }}</div>
      </div>
      <!-- 标题结束 -->
      <!-- 规则开始 -->
      <div class="rules_box">
        <div class="rules_item" v-for="(item, index) in rules" :key="index">
          <!-- 左边 -->
          <div class="type_box">{{ item.type }}</div>
          <!-- 右边 -->
          <div class="chooose_box">
            <div
              class="choose_item"
              :class="{ active: item.rulesIndex == count }"
              v-for="(k, count) in item.choose"
              :key="count"
              @click="item.rulesIndex = count"
            >
              {{ k }}
            </div>
          </div>
        </div>
      </div>
      <!-- 规则结束 -->
      <!-- 分割线 -->
      <van-divider />
      <!-- 选择数量 -->
      <div class="count">
        <div class="choose_num">
          <div class="choose_text">选择数量</div>
          <div class="choose_add">
            <van-stepper
              v-model="count"
              theme="round"
              button-size="22"
              disable-input
            />
          </div>
        </div>
      </div>
      <!-- 分割线 -->
      <van-divider />
      <!-- 商品描述 -->
      <div class="desc_box">
        <h4>商品描述：</h4>
        <p v-for="(item, index) in desc" :key="index">
          {{ index + 1 }}.{{ item }}
        </p>
      </div>
    </div>
    <!-- 具体详情结束 -->
    <!-- 底部开始 -->
    <div class="footer">

    </div>
          <van-goods-action>
        <van-goods-action-icon icon="cart-o" text="购物车" :badge="badge" @click="toCar"/>
        <van-goods-action-icon
          icon="star"
          :text="colletData[colltetIndex].text"
          :color="colletData[colltetIndex].color"
          @click="collet(colltetIndex)"
        />
        <van-goods-action-button
          color="#6a91ec"
          type="warning"
          text="加入购物车"
          @click="addCar"
        />
        <van-goods-action-button
          color="#0c34ba"
          type="danger"
          text="立即购买"
        />
      </van-goods-action>
    <!-- 底部结束 -->
  </div>
</template>

<script>
import "../assets/less/detail.less";
export default {
  data() {
    return {
      result: [],
      pid: this.$route.query.pid,
      // rules:[{{type:选项名称，例如奶油、糖、温度、冰},{rulesIndex:所选项的下标，默认0},{choose:["选项内容","",..]}}，...]
      rules: [],
      count: 1,

      desc: [],
      badge: "",
      badgeNum:0,
      colltetIndex: 0,
      colletData: [
        { text: "收藏", color: "gray" },
        { text: "已收藏", color: "#0c34ba" },
      ],
      // bannerImg: this.result.large_img,
      // name:this.result.name,
      // enname:this.result.enname,
      // price:this.result.price
    };
  },
  created() {
    console.log(this.$route.query.pid);
    this.getDetail(this.pid);
  },
  methods: {
    getDetail(pid) {
      // 加载提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });

      this.axios({
        // 请求的方式
        method: "get",
        // 请求的路径
        url: "http://www.kangliuyong.com:10002/productDetail",
        // 请求的参数
        params: {
          appkey: this.appkey,
          pid,
        },
      })
        .then((res) => {
          console.log("detail请求成功", res);
          if (res.data.code == 600) {
            this.result = res.data.result[0];
            this.data = res.data.result[0];
            this.$toast.clear();
          } else {
            console.log("this", this);
            this.$toast("网络失败");
          }
          this.desc = this.data.desc.split(/\n/);
          // 四种可选类型
          let dataType = ["cream", "milk", "sugar", "tem"];

          dataType.map((o) => {
            // 每次遍历时定义一个空对象
            let obj = {};
            // 开始索引的位置
            obj.rulesIndex = 0;
            // 定义数组
            obj.choose = [];
            // 类型
            obj.type = this.data[o + "_desc"];
            // 字符串分割 返回一个数组 如何 冷/热——>['冷','热']
            let dataChoose = this.data[o].split("/");
            dataChoose.map((k) => {
              if (k != "") {
                obj.choose.push(k);
              }
            });
            //数组不为空则添加到rules中
            if (obj.choose.length > 0) {
              this.rules.push(obj);
            }
          });
          // console.log("对象：", obj);
          console.log("验证：", this.rules);
        })
        .catch((err) => {
          console.log("Detail请求失败", err);
        });
    },
    goBack() {
      // 返回上一页
      this.$router.go(-1);
    },
    collet(index) {
      let url = "";
      if(index == 0){
        url = "/like";
        this.colltetIndex = 1;
      }else{
        url = "/notlike"
        this.colltetIndex = 0;
      }
      this.axios({
        method: "post",
        url: url,
        data: {
          appkey: this.appkey,
          pid: this.pid,
          tokenString: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          console.log("添加收藏成功", res);
        })
        .catch((err) => {
          consolo.log("添加收失败", err);
        });
    },
    addCar() {
      // 判断登录
      if(!localStorage.getItem("token")){
        this.$toast("请登录");
        this.$router.push({name:"Login"});
      }

      let rule = this.rules.map(o=>{
        return o.choose[o.rulesIndex];
      })
      console.log(rule.join("/"));
      this.badgeNum += 1;
      this.badge = String(this.badgeNum);
      this.axios({
        method: "post",
        url: "/addShopcart",
        data: {
          pid: this.pid,
          count: this.count,
          rule: rule.join('/'),
          appkey: this.appkey,
          tokenString: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          console.log("加入购物车成功", res);
          if(res.data.code == 3000){
            this.$toast("加入购物车成功")
          }else{
            this.$toast("加入购物车失败")
          }
        })
        .catch((err) => {
          consolo.log("加入购物车失败", err);
        });
    },
    toCar(){
      this.$router.push({name:"Car"})
    },
  },
};
</script>

<style lang="less" scoped>
</style>