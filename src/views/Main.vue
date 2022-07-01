<template>
  <div>
    <router-view />
    <van-tabbar v-model="active" route>
      <van-tabbar-item
        v-for="(item, index) in iconArr"
        :key="index"
        :to="item.path"
      >
        <span>{{item.text}}</span>
        <template #icon="props">
          <img :src="props.active ? item.active : item.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      icon: {
        // 被选中时
        active: require("../assets/icons/home_active.png"),
        //没有选中时
        inactive: require("../assets/icons/home.png"),
      },
      iconArr: [
        {
          text: "首页",
          path: "/home",
          active: require("../assets/icons/home_active.png"),
          inactive: require("../assets/icons/home.png"),
        },
        {
          text: "菜单",
          path: "/menu",
          active:require("../assets/icons/menu_active.png") ,
          inactive: require("../assets/icons/menu.png"),
        },
        {
          text: "购物车",

          path: "/car",
          active: require("../assets/icons/shopbag_active.png"),
          inactive: require("../assets/icons/shopbag.png"),
        },
        {
          text: "我的",
          path: "/my",
          active: require("../assets/icons/my_active.png"),
          inactive: require("../assets/icons/my.png"),
        },
      ],
    };
  },
};
</script>

<style>
</style>