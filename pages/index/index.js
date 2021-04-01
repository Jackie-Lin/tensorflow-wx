//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: [
      {
        title: '拍照识别',
        img: 'https://ai.flypot.cn/pocket/images/index-imagenet-bg.jpg',
        url: '/pages/photo/photo'
      },
      {
        title: 'AI识别',
        img: 'https://ai.flypot.cn/pocket/images/index-posenet-bg.jpg',
        url: '/pages/basic/mobilenet/index'
      }
    ]
  },

  onShareAppMessage() {
    return {
      title: '垃圾分类'
    }
  },
 
  handleCardClicked(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  }
})
