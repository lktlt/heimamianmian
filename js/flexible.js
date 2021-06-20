(function flexible(window, document) {
  // 获取html根元素
  var docEl = document.documentElement
  // devicePixelRatio =>dpr 物理像素比
  var dpr = window.devicePixelRatio || 1

  // adjust body font size 设置body字体大小
  function setBodyFontSize() {
    if (document.body) {// 有body时
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
    else { // 有body时，等待页面只要元素加载完毕再设置body字体大小
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10  设置html元素的文字大小
  function setRemUnit() {
    var rem = docEl.clientWidth / 20
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize  当页面尺寸发生变化时，重新设置页面大小
  window.addEventListener('resize', setRemUnit)
  // pageshow 重新加载页面，在load事件后触发，无论页面是否来自缓存都可以刷新，
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {// 判断是否是缓存中的页面触发的，true-缓存取过来的也要重新计算大小
      setRemUnit()
    }
  })

  // detect 0.5px supports 有些移动端浏览器不支持0.5像素的写法
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))
