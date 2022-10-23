<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComponents/DetailNavBar";
  import DetailSwiper from "./childComponents/DetailSwiper";

  import {getDetail} from "../../network/detail";

  export default {
    name: "Detail",
    components: {
      DetailSwiper,
      DetailNavBar
    },
    data(){
      return {
        iid: null,
        topImages: []
      }
    },
    activated() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        console.log(res);
        //1.获取顶部的图片轮播数据
        this.topImages = res.result.itemInfo.topImages
      })
    }
  }
</script>

<style scoped>

</style>