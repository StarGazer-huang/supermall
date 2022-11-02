<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button @click.native=checkClick""
                    :is-checked="isSelectAll"
                    class="check-button"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";

  import {mapGetters} from "vuex"

  export default {
    name: "CartButtonBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice(){
        return "￥" + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength(){
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        // return !(this.cartList.filter(item => item.checked).length)
        // return this.cartList.every(item => !item.checked)
        // console.log("选中元素");
        if(this.cartList.length === 0) return false
        return !(this.cartList.find(item => !item.checked))
      }
    },
    methods: {
      checkClick(){
        if(this.isSelectAll) { //全部选中
          this.cartList.forEach(item => item.checked = false)
        }else {
          this.cartList.forEach(item => item.checked = true)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: pink;

  }

  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    /*padding-top: 10px;*/
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price{
    margin-left: 30px;
  }

  .calculate{
    width: 100px;
    background-color: red;
    text-align: center;
    margin-left: auto;
    color: #fff;
  }
</style>