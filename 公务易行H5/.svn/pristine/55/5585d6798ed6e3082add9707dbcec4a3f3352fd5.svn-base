import { Toast, MessageBox } from 'mint-ui';
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}
/*
订单状态
*/
export const watchOrderStatus = (orderNo,that) => {
  console.log('订单状态')
  var countdown = 60;
  (function settime() {
    if (countdown == 0) {
      countdown = 60;
      return;
    } else {
      countdown -=5;
      let token = getStore('token');
      var postData = {};
      var data = {
        "orderNo": orderNo,
      }
      postData.data = data;
      that.$http.post(that.url + '/xxx/api/private/getTicketOrderDetail', postData, {
        headers: { "Authorization": token },
      }).then(function(res) {
        var data = res.body.data.ticketOrder;
        if (data && data.orderstatus == '已支付已出票') {
          countdown = 0;
          MessageBox.confirm('', {
            message: '您的订单号为'+orderNo+'的已出票！',
            showCancelButton: false,
            confirmButtonText: '我知道了',
          }).then(action => {
            if (action == 'confirm') {}
          });
        }
      })
    }
    setTimeout(function() {
      settime()
    }, 5000)
  })()
}
/*
距今多少天
*/
export const getFromTodayDays = (year, month, day) => {
  if (!year) return;
  let oldDate = new Date(year, month, day);
  let date = new Date();
  let days = Math.floor((date.getTime() - oldDate.getTime()) / 24 / 60 / 60 / 1000);
  return -days;
}
/*
订单倒计时
*/
export const getFromOrderTime = (ordertime) => {
  if (!ordertime) return;
  let date = new Date(ordertime);
  let newdate = new Date();
  var time1 = date.getTime(),
    time2 = newdate.getTime();
  var total = (30 * 60 * 1000 - (time2 - time1)) / 1000;
  if (total <= 0) {
    return false;
  }
  var day = parseInt(total / (24 * 60 * 60)); //计算整数天数
  var afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数
  var hour = parseInt(afterDay / (60 * 60)); //计算整数小时数
  var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数
  var min = parseInt(afterHour / 60); //计算整数分
  var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //取得算出分后剩余的秒数
  var second = parseInt(afterMin)
  if (day == 0 && hour == 0 && min < 30) {
    return addZero(min) + ":" + addZero(second);
  } else {
    return false;
  }
}
/*ordertime
加零
*/
export const addZero = (num) => {
  // if (!num) return;
  if (num < 10) {
    num = '0' + num;
  }
  return num;
}
/*
表单校验
*/
export const checkInput = (value, name) => {
  if (!value) return;
  console.log(value)
  console.log(name)
  // 姓名
  var patrn1 = /^\s*[\u4e00-\u9fa5]{1,}[\u4e00-\u9fa5.·]{0,15}[\u4e00-\u9fa5]{1,}\s*$/;
  // 身份证
  var patrn2 = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
  // 英文姓/名
  var patrn3 = /^[A-Z]+$/;
  // 护照号码
  var patrn4 = /^1[45][0-9]{7}|G[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$/;
  // 手机号码
  // var patrn5 = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
  var patrn5 = /^1[0-9]{10}$/;
  // 昵称
  var patrn6 = /^[\u4e00-\u9fffa-zA-Z0-9_-]{2,30}$/;
  // 验证码
  var reg = /^[0-9]{6}$/;
  // 密码
  var patrn7 = /^.{6,20}$/;
  // cvv2
  var patrn8 = /^[0-9]{3}$/;
  // 校验
  if (name == 'name' || name == 'lian_name' || name == 'bao_name') {
    // if (!patrn1.exec(value)) {
    //   return false;
    // }
  } else if (name == 'idcard') {
    if (!patrn2.exec(value.replace(/\s+/g, ""))) {
      return false;
    }
  } else if (name == 'last_name') {
    // if (!patrn3.exec(value.toUpperCase())) {
    //   return false;
    // }
  } else if (name == 'first_name') {
    // if (!patrn3.exec(value.toUpperCase())) {
    //   return false;
    // }
  } else if (name == 'passport') {
    if (!patrn4.exec(value.toUpperCase())) {
      return false;
    }
  } else if (name == 'lian_phone' || name == 'bao_phone' || name == 'login_phone' || name == 'phone' || name == 'reference_phone') {
    if (!patrn5.exec(value.replace(/\s+/g, ""))) {
      return false;
    }
  } else if (name == 'nickname') {
    if (!patrn6.exec(value.replace(/\s+/g, ""))) {
      return false;
    }
  } else if (name == 'code') {
    // if (!reg.exec(value)) {
    //   return false;
    // }
  } else if (name == 'password') {
    if (!patrn7.exec(value)) {
      return false;
    }
  } else if (name == 'cvv2') {
    if (!patrn8.exec(value)) {
      return false;
    }
  }
  return true;
}
// 手机号码格式化

export const phoneFormat = (phone) => {
  if (!phone) return;
  if (phone.length > 3 && phone.length <= 7) {
    let matches_0 = phone.substring(0, 3);
    let matches_1 = phone.substring(3)
    var newNum = matches_0 + ' ' + matches_1;
  } else if (phone.length > 7) {
    let matches_0 = phone.substring(0, 3);
    let matches_1 = phone.substring(3, 7);
    let matches_2 = phone.substring(7);
    var newNum = matches_0 + ' ' + matches_1 + ' ' + matches_2;
  } else {
    var newNum = phone;
  };
  return newNum;
}
// 
export const toNumber = (s) => {
  if (s) {
    return parseInt(s)
  } else {
    return 0;
  }
}


// 接口处理
export const checkErr = (res, gotoAfterSignin) => {
  console.log(gotoAfterSignin)
  if (res.status == '401' || (
      (res.status == '500') && (res.body.message.indexOf("UsernameNotFound") != -1)
    )) {
    setStore('gotoAfterSignin', gotoAfterSignin)
    return true;
  }
  return false;
}
export const checkSts = (res, errorMessage, that) => {
  if (res.body && res.body.sts == '1') {
    return false;
  }
  if (res.body && res.body.sts != '1' && res.body.emg) {
    errorMessage = res.body.emg;
  }
  if (errorMessage && errorMessage.indexOf('缓存') != -1) {
    Toast({
      message: '机票信息已更新，请重新查询',
      duration: 2000
    });
    setTimeout(function() {
      that.$router.push({
        path: '/home',
      })
    }, 2000)
    return true;
  }
  if (errorMessage) {
    Toast({
      message: errorMessage,
      duration: 1000
    });
  }
  return true;
}
// checktoken
