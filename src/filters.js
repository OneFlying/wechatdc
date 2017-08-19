/**
 * Created by caiyuhao on 2017/1/31.
 */

const _filters = {}

_filters.fmtSrc = (_src) => {
  return 'https://fuss10.elemecdn.com/4/77/09a9a37b39d3b3d651d15cc1edaaejpeg.jpeg?imageMogr/thumbnail/140x140/format/webp/quality/85'
}

_filters.fmtLocation = (_location) => {
  if (_location.length > 3) {
    return _location.substring(0, 2) + '...'
  } else {
    return _location
  }
}

export default (Vue) => {
  Object.keys(_filters).forEach(key => {
    Vue.filter(key, _filters[key])
  })
}
