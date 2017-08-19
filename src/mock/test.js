/**
 * Created by caiyuhao on 2017/2/1.
 */
const list1 = [{
  title: '天天特价',
  desc: '美食1折起'
}, {
  title: '霸王餐',
  desc: '领20元红包'
}, {
  title: '暖胃好面',
  desc: '满减享不停'
}, {
  title: '营养快餐',
  desc: '15元吃饱'
}]

const imgList = [
  'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff',
  'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff',
  'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff'
]

const demoList = imgList.map((one, index) => ({
  url: 'javascript:',
  img: one
}))

const list = [{
  src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
  title: '标题一',
  desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
  url: '/component/cell'
}, {
  src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
  title: '标题二',
  desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
  url: {
    path: '/component/radio',
    replace: false
  }
}]

const footer = {
  title: '查看更多',
  url: 'http://vux.li'
}

module.exports = {
  list1,
  demoList,
  list,
  footer
}

