// 路由多维数组变成一维数组
 export default function getRouteList(arr) {
  let routeList = []
  function getRouteData(arr) {
    arr.forEach((item, index) => {
      routeList.push(item)
      if (item.child) {
        getRouteData(item.child)
      }
 
    })
    return routeList
  }
  getRouteData(arr)
  return  routeList
}