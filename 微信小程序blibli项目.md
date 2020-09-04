## 微信小程序项目之哔哩哔哩

由于图片路径问题，这里图片的引入有误，详细信息可以查看我的博客有同样的开发文档https://daomiaru.github.io/archives/

先来看看页面整体效果

![1568545001591](C:\Users\14331\AppData\Roaming\Typora\typora-user-images\1568545001591.png)

![1568545034075](C:\Users\14331\AppData\Roaming\Typora\typora-user-images\1568545034075.png)

![1568545066006](C:\Users\14331\AppData\Roaming\Typora\typora-user-images\1568545066006.png)

### 接口

| 接口         | 接口地址                                                     |
| ------------ | ------------------------------------------------------------ |
| 导航条接口   | https://www.easy-mock.com/mock/5d590978d3185331448bb542/bilibili/navlist |
| 轮播图接口   | https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/swiperList |
| 视频列表接口 | https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/videosList |
| 视频详情接口 | https://easy-mock.com/mock/5ccc2cc89e5cbc7d96b29785/bili/videoDetail?id=xxx |
| 推荐视频接口 | https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/othersList?id=xxx |
| 评论内容接口 | https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/commentsList?id=xxx |

### 1.公共头部组件myTitle

第一步先创建组件myTitle

第二步首页index.json配置使用组件

![1568378944911](C:\Users\14331\AppData\Roaming\Typora\typora-user-images\1568378944911.png)

第三步index.wxml使用组件

![1568378991424](C:\Users\14331\AppData\Roaming\Typora\typora-user-images\1568378991424.png)

第四步编写组件myTitle.wxml

![1568379026786](C:\Users\14331\AppData\Roaming\Typora\typora-user-images\1568379026786.png)

第五步编写组件样式myTitle.wxss

```css
.my_title{
  display: flex;
  padding: 10px
}
.logo{
  flex: 5
}
.search_icon{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user_icon{
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1
}
.download{
  flex: 2;
  font-size: 25rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: pink;
  color: #fff;
  border-radius: 10rpx;
  padding: 8rpx;
}

```

查看效果

![1568379090430](C:\Users\14331\AppData\Roaming\Typora\typora-user-images\1568379090430.png)





### 2.导航条部分

首先通过小程序内置的发送请求的方法获取导航条数据，这里使用easy-mock提供的伪数据接口。

由于easy-mock.com不太稳定的关系，有时候控制台会报404请求失败，但是这并不代表没有数据

请求回来的数据保存在res中，将数据保存在navList:[]中，再将其渲染到页面上

```javascript
 data: {
    //首页导航数据
    navList:[],
    currenIndexNav:0
  }
```

```javascript
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
```

编写页面部分，scroll-view组件可以使导航条有滑动的效果，scroll-x表示在x轴上滑动

这里data-index为自定义属性，使用wx:for循环遍历navList数组渲染

bindtap给标签绑定点击事件，当点击事件发生时调用相应的回调函数，e是事件对象，当前触发该事件的item索引值保存在e.target.dataset中。当点击时，将当前索引值赋值成点击索引值

```javascript
  activeNav(e){
    this.setData({
      currentIndexNav: e.target.dataset.index
    })
  }
```

这里面有一个判断，当index等于currentIndexNav的时候将其class属性设为active,没有则为空。

这里是主页的css，可以看出.nav_item.active样式为：border-bottom: 3px solid #de688b

以此来实现点击效果

```css
page{
  color: #666;
}
.nav_wrap{

}
.nav{
  white-space: nowrap;
  padding: 5rpx 0;
}
.nav_item{
  padding: 20rpx 45rpx;
  font-size: 30rpx;
  display: inline-block
}
.nav_item.active{
  border-bottom: 3px solid #de688b
}
```

![1568430283773](C:\Users\14331\AppData\Roaming\Typora\typora-user-images\1568430283773.png)

```javascript
<!-- 首页导航部分 -->
<view class="nav_wrap">
<!-- 滚动区域组件 -->
<scroll-view class="nav" scroll-x> 
<view bindtap="activeNav" data-index="{{index}}" class="nav_item {{index === currentIndexNav?'active':''}}" wx:for="{{navList}}" wx:key="{{index}}">
{{item.text}}
</view>
</scroll-view>
</view>
```



### 3.视频列表

首先通过视频列表接口https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/videosList拿到数据

```javascript
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
  }
```

将其保存在videoList中，videoList初始为空

调用该函数

![1568450444640](C:\Users\14331\AppData\Roaming\Typora\typora-user-images\1568450444640.png)

编写页面渲染

```html
<!-- 视频列表 -->
<view class="video_wrap">
  <navigator wx:for="{{videoList}}" wx:key="{{index}}" class="video_item">
    <!-- 图片容器 -->
  <view class="img_wrap">
    <!-- 图片 -->
    <image src="{{item.imgSrc}}" mode="widthFix"></image>
    
    <!-- 左边播放信息 -->
    <view class="left">
      <!-- 播放量图标 -->
      <view class="fa fa-play-circle-o"></view>
      <!-- 播放量数值 -->
      <text class="play_info">{{item.playCount}}</text>
    </view>

    <!-- 右边评论信息 -->
    <view class="right">
      <!-- 评论图标 -->
      <view class="fa fa-commenting-o"></view>
      <!-- 评论数值 -->
      <text class="talk_info">{{item.commentCount}}</text>
    </view>
  </view>
  <view class="video_title">{{item.desc}}</view>
  </navigator>
 </view>
```

编写CSS设置样式

```css
/* 视频列表css */
.video_wrap{
  display: flex;
  flex-wrap: wrap;
  margin-top: -30rpx;
  padding: 5rpx;
  justify-content: space-between;
}
.video_item{
  width: 48%;
  margin-bottom: 20rpx;
}
.img_wrap{
  position: relative
}
.left{
  font-size: 30rpx;
  color: white;
  position: absolute;
  left: 10rpx;
  bottom: 15rpx;
}
.right{
  font-size: 30rpx;
  color: white;
  position: absolute;
  right: 20rpx;
  bottom: 15rpx;
}
.video_title{
  font-size: 30rpx;
  display: -webkit-box;
  overflow: hidden;
  text-overflow:ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical
}
```



### 4.视频详情

当点击视频的时候根据navigator组件的url属性传入跳转页面路径，通过？传递参数，参数保存在option中

```html
<navigator wx:for="{{videoList}}" wx:key="{{index}}" class="video_item" url="../detail/detail?id={{item.id}}">
```

根据传入的id不同拿到对应的详情视频

当视频详情页面加载时，获取传入的id

```javascript
 onLoad: function (options) {
    // 获取传入的参数
    let videoId = options.id
    this.getvideoDetail(videoId)
    this.getothers(videoId)
    this.getComments(videoId)
  }
```

通过视频详情接口 + 相应的id拿到视频详情信息

可以看出该数据为json对象，所以我么初始为null

![1568544329636](C:\Users\14331\AppData\Roaming\Typora\typora-user-images\1568544329636.png)

```javascript
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
```



![1568544265894](C:\Users\14331\AppData\Roaming\Typora\typora-user-images\1568544265894.png)

拿到视频详情数据后编写页面渲染

```html
<!-- 视频 -->
<view class="video">
<video src="{{videoDetail.videoSrc}}" controls="true"></video>
<!-- 视频详情 -->
<view class="videoDetail">
<!-- 视频标题 -->
<view>
<text class="video_title">{{videoDetail.videoTitle}}</text>
</view>
<!-- 视频作者 -->
<text class="video_autor">{{videoDetail.author}}</text>
<!-- 播放量 -->
<text class="play_Count">{{videoDetail.playCount}}万次观看</text>
<!-- 弹幕数 -->
<text class="barrage_Count">{{videoDetail.commentCount}}弹幕</text>
<!-- 时间 -->
<text class="data">{{videoDetail.date}}</text>
</view>
</view>
```

相应的编写wxss

```css
/* 视频详情 */
.main{
  padding: 10rpx;
  color: #666;
  font-size: 25rpx
}
video{
  width: 100%
}
.videoDetail{
  
}
.video_title{
  color: #000;
  font-size: 35rpx;
}
.video_autor{
  color: #000;
  font-size: 30rpx
}
.videoDetail > text{
  margin-left: 10rpx;
}
```

![1568544440126](C:\Users\14331\AppData\Roaming\Typora\typora-user-images\1568544440126.png)



### 5.推荐视频

同样根据不同的id拿到对应的推荐视频数据

![1568544520609](C:\Users\14331\AppData\Roaming\Typora\typora-user-images\1568544520609.png)

数据初始为数组

![1568544580741](C:\Users\14331\AppData\Roaming\Typora\typora-user-images\1568544580741.png)

```javascript
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
  }
```

编写页面渲染

```html
<!-- 推荐视频 -->
<view class="other_wrap">
<navigator class="others_item" wx:for="{{othersList}}" wx:key="{{index}}" class="other_item">
<!-- 图片 -->
<view class="img_wrap">
<image src="{{item.imgSrc}}" mode="widthFix"></image>
</view>
<!-- 推荐视频信息 -->
<view class="others_info">
<!-- 推荐视频标题 -->
<text class="others_title">{{item.title}}</text>
<view class="others_text">
<!-- 推荐视频播放量 -->
<text class="others_playCount">{{item.playMsg}}万次观看</text>
<!-- 推荐视频评论 -->
<text class="others_comment">{{item.commentCount}}弹幕</text>
</view>
</view>
</navigator>
</view>
```

编写相应的wxss

```css
/* 推荐视频 */
.other_item{
  margin-top: 10rpx;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
}
.img_wrap{
  display: flex;
  width: 40%;
  justify-content: center;
  align-items: center;
}
.img_wrap>image{
  width: 90%;
  border-radius: 10rpx;
}
.others_info{
  width: 60%;
}
.others_title{
  font-size: 28rpx;
  color: #e06f93;
}
.others_text{
  font-size: 26rpx;
  color: #666;
}
```

![1568544669526](C:\Users\14331\AppData\Roaming\Typora\typora-user-images\1568544669526.png)



### 6.评论

同样通过接口 + id拿到评论数据

```javascript
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
  }
```

![1568544759216](C:\Users\14331\AppData\Roaming\Typora\typora-user-images\1568544759216.png)

数据初始为null

编写页面渲染

```html
<!-- 评论 -->
<view class="comment_wrap">
<text>评论({{commentData.commentTotalCount}})</text>

<view class="comment_item" wx:for="{{commentData.commentList}}" wx:key="{{index}}">
<!-- 评论左边 -->
<view class="comment_left">
<image src="{{item.userIconSrc}}"  mode="widthFix"></image>
</view>
<!-- 评论右边 -->
<view class="comment_right">
<view class="comment_user">
<text class="user">{{item.username}}</text>
<text class="comment_date">{{item.commentDate}}</text>
</view>
<view class="comment">
<text>{{item.commentInfo}}</text>
</view>
</view>
</view>
</view>
```

编写相应的wxss

```css
/* 评论 */
.comment_item{
  display: flex;
  justify-content: space-between;
  margin-bottom: 10rpx;
  border-bottom: 2rpx solid #666;
}
.comment_left{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.comment_left>image{
  width: 80%;
}
.comment_right{
  flex: 8;
}
.comment_user{
  display: flex;
  margin: 15rpx;
}
.comment{
  margin: 15rpx;
}
.user{
  flex: 8;
}
.comment_date{
  flex: 1;
}
```

![1568544847544](C:\Users\14331\AppData\Roaming\Typora\typora-user-images\1568544847544.png)



#### 大功告成！！！，老实说没什么难度，主要是一些css的部分由于不够熟悉的关系有点困难，代码基本上都有一定的共通性，只要学会了学会了写一个其他的基本都是大同小异。
