<template>
  <div class="car">
    <!-- 头部导航栏开始 -->
    <div class="navbar">
      <van-nav-bar
        title="购物袋"
        left-text="返回"
        :right-text="rightText"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
      <img :src="logo" alt="" />
    </div>
    <!-- 头部导航栏结束 -->
    <!-- 购物车数据开始 -->
    <div class="carData">
      <!-- 商品条目 -->
      <div class="car_item" v-for="item in carItem" :key="item.pid">
        <!-- 复选框 -->
        <div class="checkbox">
          <van-checkbox
            v-model="item.isChoose"
            @click="changeStatus"
          ></van-checkbox>
        </div>
        <!-- 图片 -->
        <div>
          <img :src="item.small_img" alt="" />
        </div>
        <div class="content">
          <!-- 名称与类型 -->
          <div class="top">
            <div>{{ item.name }}</div>
            <div class="rule">{{ item.rule }}</div>
          </div>
          <!-- 英文名称 -->
          <div class="enname">{{ item.enname }}</div>
          <!-- 价格与步进器 -->
          <div class="bottom">
            <div class="price">￥{{ item.price }}</div>
            <div class="step">
              <van-stepper
                v-model="item.count"
                theme="round"
                button-size="22"
                disable-input
                @plus="changeCount(item.sid, item.count + 1)"
                @minus="changeCount(item.sid, item.count - 1)"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- 商品条目结束 -->
      <div class="text">哎呀，没有数据可加载了！</div>
    </div>
    <!-- 购物车数据结束 -->
    <!-- 底部提交订单 -->
    <div class="footer_box">
      <van-submit-bar
        :price="edit ? 0 : allPrice * 100"
        :button-text="edit ? '删除选择' : '提交订单'"
        :button-color="edit ? '' : '#0c34ba'"
        :label="edit ? ' ' : '合计：'"
        @submit="edit ? remove() : submit()"
      >
        <van-checkbox v-model="checked" @click="allChoose">全选</van-checkbox>
      </van-submit-bar>
    </div>
    <!-- 底部结束 -->
  </div>
</template>

<script>
import "../assets/less/car.less";
export default {
  data() {
    return {
      // 是否全选
      checked: false,
      logo: require("../assets/icons/shopbag_bg.png"),
      carItem: [],
      edit: false,
      rightText: "编辑",
      buttonText: "提交订单",
    };
  },
  computed: {
    allPrice() {
      let price = 0;
      this.carItem.map((o) => {
        if (o.isChoose) {
          price += o.count * Number(o.price);
        }
      });
      return price;
    },
  },
  created() {
    this.getcar();
    // this.changeCount();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.edit = !this.edit;
      if (this.edit) {
        this.rightText = "完成";
        this.buttonText = "删除选择";
      } else {
        this.rightText = "编辑";
        this.buttonText = "提交订单";
      }
    },
    getcar() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });

      // 判断登录
      if (!localStorage.getItem("token")) {
        this.$toast("请登录");
        this.$router.push({ name: "Login" });
      }
      this.axios({
        method: "get",
        url: "/findAllShopcart",
        params: {
          appkey: this.appkey,
          tokenString: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          console.log("请求成功", res);
          // 遍历返回的数据集，为每个商品的result对象中添加一个isChoose变量，用来是否在购物车页面勾选
          if (res.data.code == 5000) {
            this.$toast.clear();

            res.data.result.map((o) => {
              o.isChoose = false;
              // 追加到carItem中
              this.carItem.push(o);
            });
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    changeStatus() {
      //每次操作勾选一个商品时，都触发该方法，用以检查是否全选，全选了则讲checked置true
      // 遍历是否勾选，如果有一个商品没有勾选，则ispasss为false
      let ispass = true;
      this.carItem.map((o) => {
        if (o.isChoose == false) {
          this.checked = false;
          ispass = false;
        }
      });
      // 判断是否全选
      if (ispass) {
        this.checked = true;
      }
    },
    allChoose() {
      // 点击全选按钮触发
      this.carItem.map((o) => {
        o.isChoose = this.checked;
      });
    },
    changeCount(sid, count) {
      this.axios({
        method: "POST",
        url: "/modifyShopcartCount",

        data: {
          appkey: this.appkey,
          tokenString: localStorage.getItem("token"),
          sid: sid,
          count: count,
        },
      })
        .then((res) => {
          console.log("修改成功", res);
          if (res.data.code == 6000) {
            this.$toast("修改成功");
          }
        })
        .catch((err) => {
          console.log("修改失败", err);
        });
    },
    remove() {
      let isNull = true;
      let s = [];
      // 将勾选了的商品的id写入到s[]
      this.carItem.map((o) => {
        if (o.isChoose) {
          s.push(o.sid);
          isNull = false;
        }
      });
      if (isNull) {
        this.$toast("请至少选中一个商品");
        return;
      }
      console.log("sids：", s);
      this.axios({
        method: "POST",
        url: "/deleteShopcart",
        data: {
          appkey: this.appkey,
          tokenString: localStorage.getItem("token"),
          sids: JSON.stringify(s),
        },
      })
        .then((res) => {
          console.log("编辑成功", res);
          if (res.data.code == 7000) {
            this.$toast("编辑成功");
            this.$router.go(0);
          }
        })
        .catch((err) => {
          console.log("编辑失败", err);
        });
    },
    submit() {
      let isNull = true;
      let sids = [];
      // 将勾选了的商品的id写入到s[]
      this.carItem.map((o) => {
        if (o.isChoose) {
          sids.push(o.sid);
          isNull = false;
        }
      });
      if (isNull) {
        this.$toast("请至少选中一个商品");
        return;
      }
      console.log("sids：", sids);
      this.$router.push({ name: "Order", query: { sids } });
    },
  },
};
</script>

