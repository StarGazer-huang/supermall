<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <!--导航-->
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!--商品的列表-->
    <cart-list></cart-list>

    <!--底部汇总-->
    <cart-button-bar></cart-button-bar>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartButtonBar from "./childComps/CartButtonBar";

  import {mapGetters} from "vuex"

  export default {
    name: "Shopcart",
    components: {
      NavBar,
      CartList,
      CartButtonBar
    },
    computed: {
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }

  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    /*font-weight: 700;*/
  }
</style>