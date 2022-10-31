import {debounce} from "@/common/utils";
import mittBus from "@/mitt";
import BackTop from "@/components/content/backTop/BackTop";

export const itemListenerMixin = {
  data(){
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted(){
    this.newRefresh = debounce(this.$refs.scroll.refresh, 1000)

    this.itemImgListener = () => {
      this.newRefresh()
    }
    mittBus.on('itemImgLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data(){
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop(){
      this.$refs.scroll.scrollTo(0, 0, 300)
    }
  }
}