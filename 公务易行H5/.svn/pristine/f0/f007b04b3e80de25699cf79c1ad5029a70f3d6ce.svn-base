<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <!-- <template v-if="index_code"> -->
    <loading v-if="isLoading"></loading>
    <div v-else class="content">
      <div class="index_card">
        <div class="city row">
          <div class="left">
            <p>出发城市</p>
            <router-link :to="{path:'/city',query:{id:'start'}}" tag="p">{{startcity.city_name}}</router-link>
            <p>{{startcity.airport_name}}</p>
          </div>
          <img :class="{changed:transForm}" class="change" src="../assets/img/icon_change.png" alt="" @click="rotate_img()">
          <div class="right">
            <p>到达城市</p>
            <router-link :to="{path:'/city',query:{id:'end'}}" tag="p">{{endcity.city_name}}</router-link>
            <p>{{endcity.airport_name}}</p>
          </div>
        </div>
        <div class="date">
          <div class="left">
            <p>出发日期</p>
            <p class="startdate row" @click="toCalendar()">
              <span>周{{week}}{{fromToday}}</span>
              <span>{{startTime.year}}-{{startTime.month}}-{{startTime.day}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="search">
        <button @click="search(startcity,endcity,startTime,fromToday)">搜&nbsp;&nbsp;索</button>
      </div>
    </div>
  </div>
</template>
<script>
import headTop from './head'
import loading from './loading'
import { Toast, MessageBox } from 'mint-ui';
import {
  getStore,
  setStore,
  removeStore,
  getFromTodayDays,
  checkErr,
  checkSts
} from '../config/utils'

export default {
  data() {
    return {
      title: '机票',
      isAirport: true,
      sheetVisible: false,
      transForm: false,
      actions: [
        { name: '不限', check: true },
        { name: '经济舱', check: false },
        { name: '公务舱', check: false },
        { name: '头等舱', check: false },
      ],
      ariline: '航司',
      freight: '舱位',
      status: '特航',
      order_code: false,
      service_code: false,
      index_code: true,
      my_code: false,
      selected: '首页',
      isLoading: true,
      startTime: '',
      week: '',
      fromToday: '',
      startcity: {},
      endcity: {},
      validity: false,
      trueHeight:''
    }
  },
  activated: function() {
    this.trueHeight = getStore('trueHeight');
    let date = new Date();
    let indate = JSON.parse(getStore('indate'));
    let weekArray = ["日", "一", "二", "三", "四", "五", "六"];
    date.setDate(date.getDate() + 1)
    this.startTime = {
      'year': date.getFullYear(),
      'month': (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
      'day': date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
      'fromToday': '明天'
    }
    this.week = weekArray[date.getDay()];
    this.fromToday = '明天'
    if (indate) {
      removeStore('dateChange');
      let validity = true;
      let fromToday = getFromTodayDays(indate.year, indate.month - 1, indate.day);
      if (fromToday < 0) {
        validity = false;
        console.log("失效日期")
      } else if (fromToday == 0) {
        this.fromToday = '今天'
      } else if (fromToday == 1) {
        this.fromToday = '明天'
      } else if (fromToday == 2) {
        this.fromToday = '后天'
      } else {
        this.fromToday = ''
      }
      this.validity = validity;
      if (validity) {
        this.startTime = indate;
        this.week = weekArray[new Date(indate.year,indate.month - 1, indate.day).getDay()];
      }

    }
    let start = JSON.parse(getStore('start'));
    let end = JSON.parse(getStore('end'));
    if (start) {
      this.startcity = start;
    } else {
      this.startcity = {
        city_name: '深圳',
        city_code: "SZX",
        airport_name: "宝安机场",
        airport_code: "SZX",
        "szmbs":"0"
      }
    };
    if (end) {
      this.endcity = end
    } else {
      this.endcity = {
        city_name: "北京",
        city_code: "BJS",
        airport_name: "所有机场",
        airport_code: "BJS",
        "szmbs":"1"
      }
    };
    // 城市数据
    let postData_allcity = {};
    postData_allcity.data = {
      "countryCode": "CN"
    };
    let oldCity = JSON.parse(getStore('city'))
    this.$http.post(this.url + '/xxx/api/public/queryAirportBycountryCode', postData_allcity).then(function(res) {
      console.log(res)
      if (checkSts(res, '城市获取失败', this)) {
        return;
      }
      var data = res.data.data;
      var arr = [];
      var allcity = [];
      for (let j = 65; j <= 90; j++) {
        var arr = [];
        for (var i = 0; i < data.length; i++) {
          var letter = data[i].city_name_en.charAt(0, 1);
          if (String.fromCharCode(j) == letter) {
            arr.push({
              "city_name": data[i].city_name,
              "city_name_en": data[i].city_name_en,
              "match": data[i].city_name + data[i].city_name_en + data[i].city_code + data[i].airport_code,
              "city_code": data[i].city_code,
              "airport_name": data[i].airport_name,
              "airport_code": data[i].airport_code,
              "szmbs":"0"
            })
            var zimu = String.fromCharCode(j);
            allcity[j - 65] = {
              "idx": j - 65,
              "zi": zimu,
              "city": arr
            }
          }
          if (allcity[j - 65] == undefined) {
            allcity[j - 65] = {
              "idx": '',
              "zi": "none",
              "city": {}
            }
          }
        }
      }
      console.log(allcity)
      setStore('city', allcity)
    }, function(res) {

    })
    // 检查token
    let token = getStore('token');

    if (!token) {
      this.isLoading = false;
      return;
    }

    let postDat = { data: {} };
    console.log(token)
    console.log(postDat)
    this.$http.post(this.url + '/xxx/api/private/checkToken', postDat, {
      headers: { "Authorization": token },
    }).then(function(res) {
      console.log(res)
    }, function(err) {
      console.log(err.static == '401')
      if (err.static == '401' || (
          (err.static == '500') && (err.data.message.indexOf("UsernameNotFound") != -1)
        )) {
        let userinfo = JSON.parse(getStore('userinfo'))
        console.log(userinfo)
        let phone = '';
        if (userinfo) {
          phone = userinfo.phone;
        };
        let postDat = {
          data: {
            phoneNumber: phone
          }
        };
        console.log(postDat)
        this.$http.post(this.url + '/xxx/api/civilsignin/byWeAppH5', postDat, ).then(function(res) {
          console.log(res)
          if (res.body.sts == -1) {
            setStore('token', '');
            return;
          }
          setStore('userinfo', res.body.data.data.userinfo);
          setStore('token', res.body.token)
        }, function(res) {
          console.log(res)
        })
      }

    })
    this.isLoading = false;
  },
  mounted() {},

  components: {
    loading,
    headTop,
  },

  computed: {

  },

  methods: {
    // 日期
    toCalendar() {
      setStore('validity', this.validity)
      this.$router.push({
        path: '/calendar'
      })
    },
    rotate_img() {
      let that = this;
      that.transForm = !that.transForm;
      let emptyCity = {};
      emptyCity = that.startcity;
      that.startcity = that.endcity;
      that.endcity = emptyCity;
    },
    actioncheck(index) {
      for (var i = this.actions.length - 1; i >= 0; i--) {
        this.actions[i].check = false;
      }
      this.actions[index].check = true;
      this.sheetVisible = false;
      this.freight = this.actions[index].name;
    },
    search(startcity, endcity, startTime, fromToday) {
      let search = {
        'startcity': startcity,
        'endcity': endcity,
        'startTime': startTime,
        'fromToday': fromToday
      }
      if (startcity.city_code == endcity.city_code) {
        MessageBox({
          title: '错误',
          message: '出发城市与到达城市不能相同'
        });
        return;
      }
      setStore("search", search)
      setStore("refresh", true)
      this.$router.push({
        path: '/result',
      })
    },
    pages(index) {
      this.index_code = false;
      this.order_code = false;
      this.service_code = false;
      this.my_code = false;
      this.foots = [
        { name: '首页', imgUrl: require('../assets/img/btn_home_png.png') },
        { name: '订单', imgUrl: require('../assets/img/btn_list_normal.png') },
        { name: '我的', imgUrl: require('../assets/img/btn_mine_normal.png') },
      ];
      if (index == 0) {
        this.index_code = true;
        this.title = '特航航空';
        this.foots[0].imgUrl = require('../assets/img/btn_home_selected.png');
      } else if (index == 1) {
        this.title = '订单';
        this.order_code = true;
        this.foots[1].imgUrl = require('../assets/img/btn_list_pressed.png');
      } else {
        this.title = '我的';
        this.foots[2].imgUrl = require('../assets/img/btn_mine_pressed.png');
        this.my_code = true;
      }
    },
  }
}

</script>
<style type="text/css" scoped>
.content {
  background-color: #f2f2f2;
  padding-top: 0.8rem;
  margin-top: 1.173333rem;
}

.index_card {
  width: 9.067rem;
  height: 6.293rem;
  background-color: #fff;
  background-image: url(../assets/img/real_index_card.png);
  background-repeat: no-repeat;
  margin: 0 auto;
  color: #999;
  font-size: 0.32rem;
}

.city {
  margin: 0 0.8rem;
  padding-bottom: 0.4rem;
  border-bottom: 0.027rem solid #e5e5e5;
  position: relative;
}

.city p:nth-of-type(1) {
  height: 1.067rem;
  line-height: 1.067rem;
}

.city p:nth-of-type(2) {
  font-size: 0.64rem;
  color: #333;
  font-weight: 600;
  height: 1.333rem;
  line-height: 1.333rem;
}

.city p:nth-of-type(3) {
  font-size: 0.373rem;
  color: #666;
  height: 1.067rem;
  line-height: 1.067rem;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  width: 2.666667rem;
}

.city .right p {
  text-align: right;
}
.city img{
  position: absolute;
  top: 1.067rem;
  left: 42%;
  right: auto;
}
.city img.change {
  width: 1.133rem;
  height: 1.133rem;
  transform: rotate(0deg);
  -webkit-transition: -webkit-transform 1s ease-out;
}

.city img.changed {
  -webkit-transition: -webkit-transform 1s ease-out;
  transform: rotate(360deg);
}

.date {
  background-color: #fff;
  margin: 0 0.8rem;
}

.date p:nth-of-type(1) {
  font-size: 0.32rem;
  color: #999;
  height: 1.067rem;
  line-height: 1.067rem;
}

.startdate {
  height: 1.333rem;
  color: #666;
  font-size: 0.48rem;
}

.startdate span:nth-of-type(2) {
  font-size: 0.533rem;
  color: #e94b31;
}

.search {
  text-align: center;
  margin-top: 1.2rem;
}

.search button {
  font-size: 0.64rem;
  color: #fff;
  width: 8.773rem;
  height: 1.52rem;
  line-height: 1.52rem;
  border: 0;
  text-align: center;
  background: url(../assets/img/index_search.png)no-repeat 0 0.08rem;
  background-size: 8.773rem 1.52rem;
}

</style>
