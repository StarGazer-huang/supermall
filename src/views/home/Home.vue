<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import HomeSwiper from "./childComponents/HomeSwiper";
  import RecommendView from "./childComponents/RecommendView";
  // import {Swiper,SwiperItem} from "../../components/common/swiper"
  import {getHomeMultidata} from "../../network/home";

  export default {
    name: "Home",
    data(){
      return {
        // result: null
        banners: [],
        recommends: []
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendView
      // SwiperItem,
      // Swiper
    },
    created() {
      //1.请求多个数据
      getHomeMultidata().then(res => {
        console.log(res);
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
  }
</script>

<style scoped>
  .home-nav{
    /*background-color: #ff8198;*/
    background-color: var(--color-tint);
    color: white;
  }
</style>