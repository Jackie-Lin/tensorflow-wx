Page({

  data: {
    titles:[
      '瓜子壳',
      '塑料盒',
      '药品外包装盒',
      '卫生纸',
      '鸡蛋壳',
      '指甲油',
      '酸奶玻璃瓶',
      '牙刷'
    ],
    answers:[
      '厨余垃圾',
      '可回收物',
      '有害垃圾',
      '其他垃圾',
      '厨余垃圾',
      '有害垃圾',
      '可回收物',
      '其他垃圾'
    ],
    class:['可回收物','有害垃圾','厨余垃圾','其他垃圾'],
    titleLeng:1,
    titleNum:1,
    title:'瓜子壳属于什么垃圾？',
    answer:'厨余垃圾',
    selectButton:['','','',''],
    noneAnswer:'display-none',
    noneButton:'display-none',
    CLICKLOCK:'false'
  },

  onLoad: function () {
    this.onloadTitle();
  },

  onReady: function () {

  },

  // 加载题目
  onloadTitle: function() {
    let titles = this.data.titles
    let answers = this.data.answers
    let titleNum = this.data.titleNum
    this.setData({
      title:titles[titleNum-1]+'属于什么垃圾？',
      answer:answers[titleNum-1],
      titleLeng:titles.length
    })
  },

  // 选择题目
  btnclick: function (e) {

    // 已经选择了 就不能再选择
    if(this.data.CLICKLOCK == 'ture')
      return;

    let answers = this.data.answers
    let titleNum = this.data.titleNum
    let selectAnswer = e.currentTarget.id
    let index = this.data.class.indexOf(selectAnswer)
    let selectButton = 'selectButton[' + index + ']'

    if(answers[titleNum-1] == selectAnswer){
      this.setData({
        [selectButton]:'select-true',
        noneButton:'',
        CLICKLOCK:'ture'
      })
    }else{
      this.setData({
        [selectButton]:'select-false',
        noneButton:'',
        noneAnswer:'',
        CLICKLOCK:'ture'
      })
    }
  },

  // 下一题
  nextTitle: function () {
    let titleNum = this.data.titleNum
    let titlelength = this.data.titleLeng
    if(titleNum >= titlelength)
      return
    this.setData({
      titleNum:titleNum+1
    })
    this.initData()
    this.onloadTitle()
  },

  // 界面 数据初始化
  initData: function() {
    this.setData({
      title:'',
      answer:'',
      selectButton:['','','',''],
      noneAnswer:'display-none',
      noneButton:'display-none',
      CLICKLOCK:false
    })
  }

})