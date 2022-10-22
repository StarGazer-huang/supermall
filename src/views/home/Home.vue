<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControlOne"
                 class="tab-control"
                 v-show="isTabFixed"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"/>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControlTwo"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "./childComponents/HomeSwiper";
  import RecommendView from "./childComponents/RecommendView";
  import FeatureView from "./childComponents/FeatureView";

  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  import {getHomeMultidata, getHomeGoods} from "../../network/home";
  import {debounce} from "../../components/common/utils";

  import mittBus from "../../mitt";

  export default {
    name: "Home",
    data(){
      return {
        // result: null
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: true,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      BackTop,
      Scroll
      // SwiperItem,
      // Swiper
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    destroyed() {
      console.log('destroyed');
    },
    activated() {
      // console.log('activated');
      this.$refs.scroll.loadfinish()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated() {
      // console.log('deactivated');
      this.saveY = this.$refs.scroll.getScrollY()
    },
    mounted() {
      //1.监听Item中图片加载完成
      const refresh = debounce(this.$refs.scroll.loadfinish, 200)
      mittBus.on("itemImageLoad", () => {
        // this.$refs.scroll && this.$refs.scroll.loadfinish()
        refresh()
      })

      //2.获取tabControl的offsetTop
      //所有的组件都有一个属性$el: 用于获取组件中的元素
      // console.log(this.$refs.tabControl);
    },
    methods: {
      //事件监听相关的代码
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControlOne.currentIndex = index;
        this.$refs.tabControlTwo.currentIndex = index;
      },
      backClick(){
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position){
        //1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000

        //2.判断tabControl是否吸顶(position,fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        // console.log('加载更多');
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControlTwo.$el.offsetTop
      },
      // LoadFinish(){
      //   // this.isLoadFinish = true
      //   this.$refs.scroll.loadfinish()
      //   console.log("所有图片均已加载完成");
      // },
      //网络请求相关的代码
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          console.log(res);
          // this.goods[type].list = res.data.list
          this.goods[type].list.push(...res.data.list)
          this.goods[type].list.page += 1

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }

    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav{
    /*background-color: #ff8198;*/
    background-color: var(--color-tint);
    color: white;

    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .tab-control{
    position: relative;
    z-index: 9;
  }

  .content{
    /*height: 300px;*/
    height: calc(100% - 93px);
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>