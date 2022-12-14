import {request} from "@/network/request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

//函数调用 -> 压入函数栈(保存函数调用过程中所有变量)
//函数调用结束 -> 弹出函数栈(释放函数所有的变量)
export function getHomeGoods(type, page) {
  return request({
    url: '/Home/data',
    params: {
      type,
      page
    }
  })
}

