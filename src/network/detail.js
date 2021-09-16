import { axios } from './request';
export function getDetail(iid) {
  return axios({
    url: "/detail",
    params: {
      iid
    }
  })
}
export function getrecommend() {
  return axios({
    url: "/recommend",
  })
}
//重构商品介绍数据
//这里我们几个数据都要从不同的地方获取，我们通过创建一个新的类，来分别保存，那么之后获取起来就会更加方便了
export class GoodsInfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.nowPrice = itemInfo.lowNowPrice;
  }
}
//重构商家信息数据
export class ShopInfo {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}
//重构商品参数数据
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}