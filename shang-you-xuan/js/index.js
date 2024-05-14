// 所有DOM元素及相关资源全部加载完毕再执行
window.onload = function () {
  // 获取DOM
  let navPath = document.getElementById('navPath')
  // 获取数据
  let paths = goodData.path
  // 给DOM添加子节点
  paths.forEach((path, index) => {
    // 创建a标签
    let aNode = document.createElement('a')
    aNode.href = path.url
    aNode.innerText = path.title
    // 添加到外层导航元素
    navPath.appendChild(aNode)

    if (index !== paths.length - 1) {
      // 创建i标签
      let iNode = document.createElement('i')
      iNode.innerText = '/'
      navPath.appendChild(iNode)
    }
  })
}