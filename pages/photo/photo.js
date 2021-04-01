import * as tf from '@tensorflow/tfjs-core'
import * as tfl from '@tensorflow/tfjs-layers'

//index.js
Page({

  data: {
    showImg:'',
    results:[
      {
        score:0.00,
        label:"其他垃圾",
        img:'https://6a61-jack-lin-cx09t-1254385830.tcb.qcloud.la/imges/%E5%B9%B2%E5%9E%83%E5%9C%BE.png?sign=d0dc7247d44b531ac45632152250ba2d&t=1612967779'
      },
      {
        score:0.00,
        label:"厨余垃圾",
        img:'https://6a61-jack-lin-cx09t-1254385830.tcb.qcloud.la/imges/%E6%B9%BF%E5%9E%83%E5%9C%BE.png?sign=d8cca3c8d8055217cc0bbbff46aedf55&t=1612967788'
      },
      {
        score:0.00,
        label:"可回收物",
        img:'https://6a61-jack-lin-cx09t-1254385830.tcb.qcloud.la/imges/%E5%8F%AF%E5%9B%9E%E6%94%B6%E7%89%A9.png?sign=f685e04c84590222533ed94755952613&t=1612967768'
      },
      {
        score:0.00,
        label:"有害垃圾",
        img:'https://6a61-jack-lin-cx09t-1254385830.tcb.qcloud.la/imges/%E6%9C%89%E5%AE%B3%E5%9E%83%E5%9C%BE.png?sign=94c2fffea2088446b9c2b6e999fe3d54&t=1612967745'
      }
    ]
  },

  async onLoad(options) {
    this.model = this.loadModel();
  },
  async onReady() {
    this.animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
      delay: 100,
      transformOrigin: 'left top 0',
      success: function(res) {
        // console.log(res)
      }
    })
    this.CLASSES = ["其他垃圾","厨余垃圾","可回收物","有害垃圾"];
    this.SHOWIMG = ['https://6a61-jack-lin-cx09t-1254385830.tcb.qcloud.la/imges/%E5%B9%B2%E5%9E%83%E5%9C%BE.png?sign=d0dc7247d44b531ac45632152250ba2d&t=1612967779','https://6a61-jack-lin-cx09t-1254385830.tcb.qcloud.la/imges/%E6%B9%BF%E5%9E%83%E5%9C%BE.png?sign=d8cca3c8d8055217cc0bbbff46aedf55&t=1612967788','https://6a61-jack-lin-cx09t-1254385830.tcb.qcloud.la/imges/%E5%8F%AF%E5%9B%9E%E6%94%B6%E7%89%A9.png?sign=f685e04c84590222533ed94755952613&t=1612967768','https://6a61-jack-lin-cx09t-1254385830.tcb.qcloud.la/imges/%E6%9C%89%E5%AE%B3%E5%9E%83%E5%9C%BE.png?sign=94c2fffea2088446b9c2b6e999fe3d54&t=1612967745']
  },
  // 获取图片
  async getPhoto() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths[0]
        this.setData({
          showImg:tempFilePaths
        })
        this.getImageData(tempFilePaths)
      },fail: err => {
        wx.navigateBack()
      }
    })
  },
  // 获取图片ImgeData
  async getImageData(imgPath) {
    const ctx = wx.createCanvasContext('canvasIn');
      ctx.drawImage(imgPath , 0, 0 , 224 , 224 )
      ctx.draw(false,()=>{
        wx.canvasGetImageData({
          canvasId: 'canvasIn',
          width: 224,
          height: 224,
          x: 0,
          y: 0,
          success:res =>{
            const imgData = {data: new Uint8Array(res.data), width: 224, height: 224}
            this.img2x(imgData).then(res => {
              this.predict(res)
            });           
          },
          fail:res =>{
            console.log("faild",res)
          }
        })
      })
  },
  // 加载模型
  async loadModel() {
    return new Promise(() => {
      this.showLoadingToast()
      tfl.loadLayersModel('https://6a61-jack-lin-cx09t-1254385830.tcb.qcloud.la/output/model.json?sign=291327f0390301eae059fedca5cea16c&t=1612168541').then(model => {
        this.hideLoadingToast()
        this.model = model
        this.getPhoto()
      }).catch(err => {
        console.log(err)
      })
    })
  },
  // 将 imgData 转为 tensor 并归一化
  async img2x(imgData) {
    return tf.tidy(() => {
        return tf.browser.fromPixels(imgData)
            .toFloat()
            .sub(255/2)
            .div(255/2)
            .reshape([1, 224, 224, 3]);
    });
  },
  // 模型预测
  async predict(x){
    this.showPreditToast()
    const pred = this.model.predict(x)
    const results = pred.arraySync()[0]
                .map((score, i) => ({
                    score:Math.floor(score * 100)/100, label: this.CLASSES[i],img:this.SHOWIMG[i]
                }))
                .sort((a, b) => b.score - a.score);
    this.setData({
      results:results
    })
    this.hideLoadingToast()
    this.checkSlide()
  },

  showLoadingToast() {
    wx.showLoading({
      title: '拼命加载模型',
    })
  },

  showPreditToast() {
    wx.showLoading({
      title: '模型预测中',
    })
  },

  hideLoadingToast() {
    wx.hideLoading()
  },

  closeSlide: function() {
    this.animation.translateY(0).step()
    this.setData({
      animation: this.animation.export()
    })
  },

  checkSlide: function() {
    this.animation.translateY(-320).step()
    this.setData({
      animation: this.animation.export()
    })
  }
})
