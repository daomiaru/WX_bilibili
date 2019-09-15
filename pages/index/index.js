Page({

  /**
   * 页面的初始数据
   */
  data: {
    //首页导航数据
    navList:[],
    swiperList:[],
    videoList:[],
    currenIndexNav:0
  },
  //点击首页触发
  activeNav(e){
    this.setData({
      currentIndexNav: e.target.dataset.index
    })
  },
  /**
   * 获取首页导航数据
   */
  getNavList(){
    //利用小程序内置发送请求的方法
    let that = this
    wx.request({
      url: 'https://www.easy-mock.com/mock/5d590978d3185331448bb542/bilibili/navlist',
      success(res){
        //当res.data.code === 0 表明数据请求成功
        if(res.data.code === 0){
          that.setData({
            //将数据保存在navList数组中
            navList: res.data.data.navlist
          })
        }
      }
    })
  },
  /**
   * 获取轮播图数据
   */
  getSwiperList(){
    let that = this
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/swiperList',
      success(res) {
        //当res.data.code === 0 表明数据请求成功
        if (res.data.code === 0) {
          that.setData({
            //将数据保存在navList数组中
            swiperList: res.data.data.swiperList
          })
          
        }
      }
    })
  },
  /**
   * 获取视频列表数据
   */
  getVideoList() {
    let that = this
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/videosList',
      success(res) {
        //当res.data.code === 0 表明数据请求成功
        if (res.data.code === 0) {
          that.setData({
            //将数据保存在navList数组中
            videoList: res.data.data.videosList
          })

        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNavList()
    this.getSwiperList()
    this.getVideoList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})