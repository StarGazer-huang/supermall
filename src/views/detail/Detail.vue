<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-botton-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
<!--    <toast :message="message" :is-show="isShow"/>-->
  </div>
</template>

<script>
  import DetailNavBar from "./childComponents/DetailNavBar";
  import DetailSwiper from "./childComponents/DetailSwiper";
  import DetailBaseInfo from "./childComponents/DetailBaseInfo";
  import DetailShopInfo from "./childComponents/DetailShopInfo";
  import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
  import DetailParamInfo from "./childComponents/DetailParamInfo";
  import DetailCommentInfo from "./childComponents/DetailCommentInfo";
  import DetailBottonBar from "./childComponents/DetailButtonBar";

  import Scroll from "../../components/common/scroll/Scroll";
  import GoodsList from "../../components/content/goods/GoodsList";
  import BackTop from "../../components/content/backTop/BackTop";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail";
  import {debounce} from "../../common/utils";
  import {mapActions} from "vuex"

  import mittBus from "../../mitt";

  // import Toast from "../../components/common/toast/Toast";

  export default {
    name: "Detail",
    components: {
      DetailGoodsInfo,
      DetailBaseInfo,
      DetailSwiper,
      DetailNavBar,
      DetailShopInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottonBar,
      GoodsList,
      BackTop,
      // Toast,
      Scroll
    },
    data(){
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        isShowBackTop: false,
        // message: "?????????????????????",
        // isShow: false
      }
    },
    created() {
      //1.???????????????iid
      this.iid = this.$route.params.iid

      //2.??????iid??????????????????
      getDetail(this.iid).then(res => {
        // console.log(res);
        //1.?????????????????????????????????
        const data = res.result;
        this.topImages = data.itemInfo.topImages

        //2.??????????????????
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //3.??????????????????
        this.shop = new Shop(data.shopInfo);

        //4.????????????????????????
        this.detailInfo = data.detailInfo;

        //5.??????????????????
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        //6.??????????????????
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }

        //1.???????????????, ?????????.
        //??????????????????: this.$refs.params.$el??????????????????
        // this.themeTopYs = []
        //
        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs);
        //
        // this.$nextTick(() => {
        //   2.???????????????: ?????????
        //   ??????????????????, ????????????????????????
        //   ?????????????????????, ?????????DOM????????????????????????
        //   ????????????????????????????????????(???????????????offsetTop????????????????????????)
        //   offsetTop????????????????????????????????????????????????
        //   this.themeTopYs = []
        //
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //   console.log(this.themeTopYs);
        // })
      })

      //3.??????????????????
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })

      //4.???getThemeTopY??????
      this.getThemeTopY = debounce(() => {
        // console.log("??????????????????????????????");
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      }, 100)
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.loadfinish, 200)
      mittBus.on("detailItemImageLoad", () => {
        refresh()
        // console.log("??????????????????????????????");
      })

    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad(){
        // console.log("image???????????????, ??????????????????????????????????????????");
        this.$refs.scroll.finishPullUp()
        this.getThemeTopY()
      },
      titleClick(index){
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      contentScroll(position) {
        // console.log(position);
        const positionY = -position.y
        let length = this.themeTopYs.length
        for(let i = 0; i < length-1; i++){
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i]
          && this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
          // if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i]
          //   && positionY < this.themeTopYs[i + 1]) || (i == length -1
          //   && positionY >= this.themeTopYs[i]))){
          //   this.currentIndex = i;
          //   console.log(this.currentIndex);
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }
        }
        //3.????????????????????????
        this.isShowBackTop = -position.y > 1000
      },
      backClick(){
        this.$refs.scroll.scrollTo(0, 0)
      },
      addToCart(){
        //1.????????????????????????????????????
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //2.??????????????????????????????
        // this.$store.commit('addCart', product)
        this.addCart(product).then(res => {
          this.$toast.show(res, 2000)
        })
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);
        //   this.isShow = true;
        //   setTimeout(() => {
        //     this.isShow = false
        //   }, 1000)
        // })
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content{
    height: calc(100% - 44px - 58px);
  }
</style>