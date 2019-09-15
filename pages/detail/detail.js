// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoDetail: null,
    othersList: [],
    commentData: null
  },
  // 获取视频详情
  getvideoDetail(videoId){
    var that = this
    wx.request({
      url: 'https://easy-mock.com/mock/5ccc2cc89e5cbc7d96b29785/bili/videoDetail?id='+videoId,
      success(res){
         if(res.data.code === 0){
           that.setData({
             videoDetail : res.data.data.videoInfo
           })          
         } 
      }
    })
  },
  //获取推荐视频
  getothers(videoId) {
    var that = this
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/othersList?id=' + videoId,
      success(res) {
        if (res.data.code === 0) {
          that.setData({
            othersList: res.data.data.othersList
          })
        }
      }
    })
  },
  //获取评论信息
  getComments(videoId) {
    var that = this
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/commentsList?id=' + videoId,
      success(res) {
        if (res.data.code === 0) {
          that.setData({
            commentData: res.data.data.commentData
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取传入的参数
    let videoId = options.id
    this.getvideoDetail(videoId)
    this.getothers(videoId)
    this.getComments(videoId)
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