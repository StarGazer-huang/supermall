<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @load="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends"/>
    </scroll>
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
  import GoodsList from "../../components/content/goods/GoodsList";

  import Scroll from "../../components/common/scroll/Scroll";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail";
  import {debounce} from "../../common/utils";

  import mittBus from "../../mitt";

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
      GoodsList,
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
        recommends: []
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        //1.获取顶部的图片轮播数据
        const data = res.result;
        this.topImages = data.itemInfo.topImages

        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //3.创建店铺信息
        this.shop = new Shop(data.shopInfo);

        //4.保存商品详情数据
        this.detailInfo = data.detailInfo;

        //5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        //6.取出评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      })

      //3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.loadfinish, 200)
      mittBus.on("detailItemImageLoad", () => {
        refresh()
        // console.log("所有图片均已加载完毕");
      })
    },
    methods: {
      imageLoad(){
        this.$refs.scroll.finishPullUp()
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
    height: calc(100% - 44px);
  }
</style>