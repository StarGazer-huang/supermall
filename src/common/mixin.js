import {debounce} from "@/common/utils";
import mittBus from "@/mitt";

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