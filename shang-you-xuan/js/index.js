// 所有DOM元素及相关资源全部加载完毕再执行
window.onload = function () {

  // 路径导航数据渲染
  navPathDataBind()
  function navPathDataBind() {
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

  // 放大镜移入移出
  bigGlassMove()
  function bigGlassMove() {
    let smallPicNode = document.querySelector('#content .contentMain .center .left .leftTop .smallPic')
    let bigPicNode = document.querySelector('#content .contentMain .center .left .leftTop .bigPic')
    let maskNode = document.querySelector('#content .contentMain .center .left .leftTop .smallPic .mask')
    let bigPicImg = document.querySelector('#content .contentMain .center .left .leftTop .bigPic img')
    // 鼠标移入，设置蒙版元素可见
    smallPicNode.addEventListener('mouseover', function () {
      maskNode.style.display = 'block'
      bigPicNode.style.display = 'block'
    })
    // 鼠标移出，设置蒙版元素不可见
    smallPicNode.addEventListener('mouseleave', () => {
      maskNode.style.display = 'none'
      bigPicNode.style.display = 'none'
    })
    // 鼠标移动
    smallPicNode.addEventListener('mousemove', (event) => {
      let smallPicNodeX = smallPicNode.getBoundingClientRect().left
      let smallPicNodeY = smallPicNode.getBoundingClientRect().top
      let left = event.clientX - smallPicNodeX - (maskNode.offsetWidth / 2)
      let top = event.clientY - smallPicNodeY - (maskNode.offsetHeight / 2)
      if (left < 0) {
        left = 0
      }
      if (left > smallPicNode.clientWidth - maskNode.offsetWidth) {
        left = smallPicNode.clientWidth - maskNode.offsetWidth
      }
      if (top < 0) {
        top = 0
      }
      if (top > smallPicNode.clientHeight - maskNode.offsetHeight) {
        top = smallPicNode.clientHeight - maskNode.offsetHeight
      }
      maskNode.style.left = `${left}px`
      maskNode.style.top = `${top}px`

      // 移动大图框内图片
      let scale = (smallPicNode.clientWidth- maskNode.offsetWidth) / (bigPicImg.clientWidth - bigPicNode.clientWidth)
      bigPicImg.style.left = `${-left / scale}px`
      bigPicImg.style.top = `${-top / scale}px`
    })
  }
}