<template>
  <div class="goods-item" @click="itemClick">
    <img :key="showImage" :src="showImage" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  import mittBus from "../../../mitt";

  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default(){
          return{}
        }
      }
    },
    methods: {
      // imageLoad(){
      //   console.log("imageLoad");
      //   this.$emit('imageLoadFinish')
      // }
      imageLoad(){
        // mittBus.emit('itemImageLoad')

        if (this.$route.path.indexOf('/home') != -1){
          mittBus.emit('homeItemImageLoad')
        }else if(this.$route.path.indexOf('/detail') != -1){
          mittBus.emit('detailItemImageLoad')
          // console.log("这个事件被触发了");
        }
      },
      itemClick(){
        // console.log("跳转到详情页");
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    },
    computed: {
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    /*width: 100px;*/
    width: 48%;
    /*z-index: -1;*/
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>