<template>
  <div>
    上传图片
    <!-- <div class="item" v-for="(item,index) in type" :key="index">
      <div>{{item.type}}</div>
      <div
        :class="{active:item.first==count}"
        v-for="(k,count) in item.choose"
        @click="item.first=count"
        :key="count"
      >{{k}}</div>
    </div>-->

    <button >提交</button>

    <van-uploader :after-read="afterRead" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: [
        // { first: 0, type: "糖", choose: ["全糖", "半糖"] },
        // { first: 0, type: "糖", choose: ["全糖", "半糖"] }
      ]
    };
  },
  created() {
    console.log(this.$route);
  },
  methods: {
    afterRead(e) {
      console.log(e);

    let type = e.file.type.split('/')[1]

    let content = e.content.replace('data:image/jpeg;base64,','')

    // console.log(content);
    // console.log(type);

 
      this.axios({
        // 请求的方式  get  post
        method: "POST",
        // 请求的路径
        url: "/updateAvatar",
        // get时候用的传递参数的格式  post  data
        data: {
          appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
          tokenString: localStorage.getItem("__tk"),
          imgType: type,
          serverBase64Img: content
        }
        // then表示请求成功的意思
      })
        .then(res => {
          console.log(888, res);
        })
        .catch(err => {
          console.log("请求失败", err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.active {
  background: pink;
}
</style>