import { axios } from './request';

export function getHomeMultidata() {
  return axios({
    url: "/home/multidata"
  })
}

export function getHomeGoods(type, page) { //这个函数需要传参
  return axios({
    url: "/home/data",
    params: {
      type,
      page
    }
  })
}