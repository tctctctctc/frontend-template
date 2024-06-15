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
      let scale = (smallPicNode.clientWidth - maskNode.offsetWidth) / (bigPicImg.clientWidth - bigPicNode.clientWidth)
      bigPicImg.style.left = `${-left / scale}px`
      bigPicImg.style.top = `${-top / scale}px`
    })
  }

  // 缩略图数据动态渲染
  thumbnailDataBind()

  function thumbnailDataBind() {
    // 获取DOM
    let thumbnailList = document.getElementById('thumbnailList')
    // 获取数据
    let pics = goodData.imageSrc
    // 给DOM添加子节点
    pics.forEach((pic) => {
      // 创建li标签
      let liNode = document.createElement('li')
      // 创建img标签
      let imgNode = document.createElement('img')
      imgNode.src = pic.s
      // 添加到li
      liNode.appendChild(imgNode)
      // 添加到picList
      thumbnailList.appendChild(liNode)
    })
  }

  // 缩略图点击事件
  thumbnailClick()
  function thumbnailClick() {
    // 获取DOM
    const thumbnailList = document.getElementById('thumbnailList')
    const smallPic = document.querySelector('#content .contentMain .center .left .leftTop .smallPic img')
    const bigPic = document.querySelector('#content .contentMain .center .left .leftTop .bigPic img')
    // 获取数据
    const pics = goodData.imageSrc
    // 给li绑定事件
    let i = 0
    for (let li of thumbnailList.children) {
      li.addEventListener('click', () => {
        smallPic.src = pics[i].s
        bigPic.src = pics[i].b
        i++
      })
    }
  }

  // 左右按钮点击事件
  thumbnailBtnClick()
  function thumbnailBtnClick() {
    // 获取DOM
    const thumbnailBtnNode = document.querySelector('#content .contentMain .center .left .leftBottom')
    const ulNode = document.querySelector('#content .contentMain .center .left .leftBottom .picList ul')
    // 移动距离
    let distance = 0
    // 步长
    let step = ulNode.firstElementChild?.offsetWidth + 20
    thumbnailBtnNode.firstElementChild.addEventListener('click', () => {
      distance -= step
      if (distance <= -step * (ulNode.children.length - 5)) distance = -step * (ulNode.children.length - 5)
      ulNode.style.transform = `translateX(${distance}px)`
    })
    thumbnailBtnNode.lastElementChild.addEventListener('click', () => {
      distance += step
      if (distance > 0) distance = 0
      ulNode.style.transform = `translateX(${distance}px)`
    })
  }

  // 商品详情数据动态渲染
  goodsDetailDataBind()
  function goodsDetailDataBind() {
    // 获取元素
    let rightTop = document.querySelector('#content .contentMain .center .right .rightTop')
    // 获取数据
    let goodsData = goodData.goodsDetail
    let str = `<h3>${goodsData.title}</h3>
              <p>${goodsData.recommend}</p>
              <div class="priceWrap">
                <div class="priceTop">
                  <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                  <div class="price">
                    <span>￥</span>
                    <p>${goodsData.price}</p>
                    <i>降价通知</i>
                  </div>
                  <p>
                    <span>累计评价</span>
                    <span>${goodsData.evaluateNum}</span>
                  </p>
                </div>
                <div class="priceBottom">
                  <span>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                  <p>
                    <span>${goodsData.promoteSales.type}</span>
                    <span>${goodsData.promoteSales.content}</span>
                  </p>
                </div>
              </div>
              <div class="support">
                <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
                <p>${goodsData.support}</p>
              </div>
              <div class="address">
                <span>配&nbsp;送&nbsp;至</span>
                <p>${goodsData.address}</p>
              </div>`
    // 渲染
    rightTop.innerHTML = str
  }

  // 商品参数选择动态渲染
  goodsParamsDataBind()
  function goodsParamsDataBind() {
    // 获取元素
    let chooseWrap = document.querySelector('#content .contentMain .center .right .rightBottom .chooseWrap')
    // 获取数据
    let goodsParams = goodData.goodsDetail.crumbData
    goodsParams.forEach(params => {
      let dlNode = document.createElement('dl')
      let dtNode = document.createElement('dt')
      dtNode.innerText = params.title
      dlNode.appendChild(dtNode)
      params.data.forEach(item => {
        let ddNode = document.createElement('dd')
        ddNode.innerText = item.type
        dlNode.appendChild(ddNode)
      })
      chooseWrap.appendChild(dlNode)
    })
  }
}