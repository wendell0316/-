// sure.js
var app=getApp();
var date='';
var userName=''
var userNo=''
var landName =''
var landSid=''
var lands=[]
var baseName =''
var baseSid =''
var varietyName =''
var varietyCode =''
var workName =''
var workNo =''
var userName=''
var index = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseName:'',
    landName:'',
    varietyName:'',
    workName:'',
    userName:'',
    userNo:'',
    workDate:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userName=options.userName;
    userNo=options.userNo;
    landName=options.landName;
    landSid=options.landSid;
    baseName=options.baseName;
    baseSid=options.baseSid;
    varietyName=options.varietyName;
    varietyCode=options.varietyCode;
    workName=options.workName;
    workNo=options.workNo;

    date = Date.parse(new Date())/1000;
    var d = new Date(parseInt(date) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    console.log(date)
    var workDate = d.substring(0, d.length - 8);
    
    this.setData({
      baseName:baseName,
      landName:landName,
      varietyName:varietyName,
      workName:workName,
      userName:userName,
      userNo:userNo,
      workDate: workDate.replace(/\//g, '-'),
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var workDate=e.detail.value;
    var str = workDate.replace(/-/g, '/')
    date = Date.parse(new Date(str))/1000;
    console.log(date)
    this.setData({
      workDate: e.detail.value
    })
  },
  addFarmWork:function(){
    var that = this;
    var sessionId=app.data.session;
    var companySid=app.data.companySid;
    var land=[];
    
    wx.request({
      url: 'https://www.inteliagpf.cn/api/1.0/ll/enterprice/land/getLands',
      data: {
        sessionId:sessionId,
        companySid:companySid,
        number:100000,
        page:1,
        baseSid:-1,

      },
      header: {},
      method: 'POST',
      dataType: '',
      success: function(res) {
        lands=res.data.contents.list.map(function(value){return value.landNo})
        land = res.data.contents.list.map(function (value) { return value.landSid })
        for(var i=0;i<land.length;i++){
          if(land[i]==landSid){
            index=i;
            console.log(index)
          }
        }
        var landNo=lands[index];
        console.log(landNo);
        console.log(index)
        console.log(i)
        console.log(land)
        console.log(lands)
        console.log(sessionId);
        console.log(companySid);
        console.log(landSid);
        console.log(baseSid);
        console.log(varietyCode),
        console.log(varietyName),
        console.log(workNo),
        console.log(workName),
          console.log(date),
          console.log(userNo),
          console.log(userName),
          console.log(userNo),
          console.log(userName),
       
        wx.request({
          url: 'https://www.inteliagpf.cn/api/1.0/ll/enterprice/farmwork/addFarmwork',
          data: {
            sessionId:sessionId,
            landNo:landNo,
            companySid:companySid,
            landSid:landSid,
            baseSid:baseSid,
            faemWorkVarietyCode:varietyCode,
            farmWorkVarietyName:varietyName,
            farmWorkOperateCode:workNo,
            farmWorkOperateName:workName,
            executeDatetime:date,
            executorWorkno:userNo,
            executorName:userName,
            updateWriterName:userName,
            updateWriterNo:userNo,
            note:'hehe',
          },
          header: {},
          method: 'POST',
          dataType: '',
          success: function(res) {
            console.log(res.data.message)
          },
          fail: function(res) {},
          complete: function(res) {},
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })

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