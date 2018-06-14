<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div v-else class="content">
      <div class="date">
        <div class="week_top row">
          <div @click="nextday(0)" :style="{color:dayend?'#999':'#373535'}">前一天</div>
          <div @click="toCalendar()"><img src="../assets/img/result_date_icon.png">{{flightDate}}</div>
          <div @click="nextday(1)">后一天</div>
        </div>
      </div>
      <div class="main">
        <template v-if="hang.length >0">
          <div class="card" v-for="(value,index) in hang" :class="{actived:value.checked}" @click="checkHang(hang,index)" v-show="value.special ||value.share">
            <div class="detail row">
              <div class="time row">
                <div style="position:relative;">
                  <p>{{value.det}}</p>
                  <p class="airline left">{{value.dpc}}{{value.dtm}}</p>
                </div>
                <div class="img col">
                  <p style="margin-top:-0.32rem;">{{value.hour == '00'?'':value.hour + 'h'}}{{value.min == '00'?'':value.min + 'm'}}</p>
                  <img src="../assets/img/result_airport.png">
                  <p style="color:#e13426;" v-show="value.sto == '1'">经停</p>
                </div>
                <p style="position:relative;">
                  <span>{{value.art}}</span>
                  <span class="airline right">{{value.arc}}{{value.atm}}</span>
                </p>
              </div>
              <div class="price">¥{{value.sgc}}<span class="residu" v-show="value.ticket !=12">剩余{{value.ticket}}张</span></div>
            </div>
            <p class="title">
              <img :src="require('../assets/img/airline_logo/'+value.awy_code+'.png')">
              <span>{{value.awy}}&nbsp;{{value.fno}}&nbsp;&nbsp;<span style="color:#e96b39;">{{value.shareword == false?'共享':''}}</span>&nbsp;&nbsp;{{value.man}}&nbsp;&nbsp;<i v-show="value.frt !=0">准点率:{{value.frt}}%</i></span>
              <span style="float:right">{{value.pmn}}{{value.pmd}}{{value.pmt?'('+value.pmt+')':''}}</span>
            </p>
          </div>
        </template>
        <template v-else>
          <img src="../assets/img/order_no.png" class="no_order" />
          <p>暂无航班结果，请检查网络或联系客服0755-88889999</p>
        </template>
      </div>
      <div class="model" v-show="detailVisible" @click="detailVisible = false"></div>
      <div v-show="detailVisible" :class="{pop:detailVisible}" class="detail">
        <ul class="total">
          <li v-for="(value,index) in ranks" class="rank_li" :class="{rank_li_check:value.check}" @click="rank_check(index,hang)">
            <img :src="require('../assets/img/result_'+value.imgUrl+'.png')">
            <span>{{value.name}}</span>
            <span :class="{icon_more:value.check}"></span>
          </li>
        </ul>
      </div>
      <div class="foot row">
        <div @click="detailVisible = !detailVisible">
          <img src="../assets/img/btn_price_nomal.png">
          <span>排序</span>
        </div>
        <div @click='filters'>
          <img src="../assets/img/btn_screen_normal.png">
          <span>筛选</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import loading from './loading'
import headTop from './head'
import { Toast, MessageBox } from 'mint-ui'
import {
  getStore,
  setStore,
  removeStore,
  checkErr,
  checkSts,
  getFromTodayDays,
  addZero
} from '../config/utils'
export default {
  data() {
    return {
      title: '',
      dayend: false,
      isLoading: false,
      hang: [],
      hangk: [],
      pir_type: true,
      tim_type: true,
      popupVisible: false,
      aircode: true,
      detailVisible: false,
      flightDate: '',
      ranks: [{ name: '默认排序', check: true, imgUrl: 'normal' },
        { name: '机型大小：从大到小', check: false, imgUrl: 'airsize' },
        { name: '起飞时间：从早到晚', check: false, imgUrl: 'date_early' },
        { name: '起飞时间：从晚到早', check: false, imgUrl: 'date_early' },
        { name: '价格排序：从低到高', check: false, imgUrl: 'pir' },
        { name: '价格排序：从高到低', check: false, imgUrl: 'pir' }
      ],
      airportBoxs: [],
      airlineBoxs: [],
      trueHeight: ''
    }
  },
  activated: function() {
    this.trueHeight = getStore('trueHeight');
    this.detailVisible = false;
    let search = JSON.parse(getStore('search'));
    let dateChange = getStore('dateChange');
    if (dateChange && dateChange == 'true') {
      removeStore("dateChange");
      let indate = JSON.parse(getStore('indate'));
      let validity = 'true';
      let fromToday = getFromTodayDays(indate.year, indate.month - 1, indate.day);
      if (fromToday < 0) {
        validity = 'false';
        console.log("失效日期")
      } else if (fromToday == 0) {
        fromToday = '今天'
      } else if (fromToday == 1) {
        fromToday = '明天'
      } else if (fromToday == 2) {
        fromToday = '后天'
      } else {
        fromToday = ''
      }
      this.validity = validity;
      search.startTime = indate;
      search.fromToday = fromToday;
      setStore("search", search)
    }
    this.search = search;
    let year = search.startTime.year;
    let month = search.startTime.month;
    let day = search.startTime.day;
    let title = search.startcity.city_name + '-' + search.endcity.city_name;
    this.title = title;
    this.dayend = false;
    if (getFromTodayDays(year, month - 1, day) == 0) {
      this.dayend = true;
    }
    let weekArray = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    this.flightDate = month + '-' + day + weekArray[new Date(year, month - 1, day).getDay()];
    setStore('indate', search.startTime)
    setStore('hang_date', month + '月' + day + '日');
    setStore('title', title);
    setStore('week', weekArray[new Date(year, month, day).getDay()])
    let checkyear = year + '-' + month + '-' + day;
    this.checkdate = new Date(year, month - 1, day);
    console.log('dateChange:' + dateChange)
    if (dateChange || getStore('refresh') == 'true') {
      removeStore("refresh");
      removeStore('rank_check_index');
      setStore('airFilterFresh', true);
      this.all = '';
      this.post(search.startcity, search.endcity, checkyear)
    } else {
      if (getStore('isAirfilter') == 'true') {
        let hang = JSON.parse(getStore('airFilter'));
        removeStore('isAirfilter')
        if (hang && hang.length == 0) {
          MessageBox({
            title: '错误',
            message: "未查询到航班,请重新筛选",
            showConfirmButton: true
          });
          return;
        };
        if (getStore("rank_check_index")) {
          this.rank_check(getStore("rank_check_index"), hang)
        } else {
          this.hang = hang;
        }
      }
    }

  },
  components: {
    headTop,
    loading
  },
  methods: {
    // 日期选择
    toCalendar() {
      setStore("validity", true)
      this.$router.push({
        path: '/calendar'
      })
    },
    // 排序 
    rank_check(index, hang) {
      let that = this;
      for (var i = that.ranks.length - 1; i >= 0; i--) {
        that.ranks[i].check = false;
      }
      that.ranks[index].check = true;
      setStore("rank_check_index", index)
      if (index == 1) {
        // 机型大小
        that.airsize(1, hang)
      } else if (index == 2) {
        that.tim(0, hang)
      } else if (index == 3) {
        that.tim(1, hang)
      } else if (index == 4) {
        that.pir(0, hang)
      } else if (index == 5) {
        that.pir(1, hang)
      } else if (index == 0) {
        that.hang = JSON.parse(getStore('hang_all'));
      }
      this.detailVisible = false;
    },
    // 机型大小
    airsize(index, hang) {
      hang.sort(comparedate('size', this));

      function comparedate(property, that) {
        return function(a, b) {
          var value1 = a[property];
          var value2 = b[property];
          return value2 - value1;
        }
      }
      this.hang = hang;
    },
    // 价格排序
    pir(index, hang) {
      // let hang = JSON.parse(getStore('hang_all'));
      // 从高到低
      if (index) {
        var temp;
        for (var i = 0; i < hang.length; i++) {
          for (var j = 0; j < hang.length - i - 1; j++) {
            if (parseInt(hang[j].sgc) <= parseInt(hang[j + 1].sgc)) {
              temp = hang[j + 1];
              hang[j + 1] = hang[j];
              hang[j] = temp;
            }
          }
        }
      } else {
        var temp;
        for (var i = 0; i < hang.length; i++) {
          for (var j = 0; j < hang.length - i - 1; j++) {
            if (parseInt(hang[j].sgc) >= parseInt(hang[j + 1].sgc)) {
              temp = hang[j + 1];
              hang[j + 1] = hang[j];
              hang[j] = temp;
            }
          }
        }
      }
      this.hang = hang;
    },
    //时间排序
    tim: function(index, hang) {
      // let hang = JSON.parse(getStore('hang_all'))
      // 从高到低
      if (index) {
        var temp;
        for (var i = 0; i < hang.length; i++) {
          for (var j = 0; j < hang.length - i - 1; j++) {

            if (this.hourTominute(hang[j].det) <= this.hourTominute(hang[j + 1].det)) {
              temp = hang[j + 1];
              hang[j + 1] = hang[j];
              hang[j] = temp;
            }
          }
        }
      } else {
        var temp;
        for (var i = 0; i < hang.length; i++) {
          for (var j = 0; j < hang.length - i - 1; j++) {
            if (this.hourTominute(hang[j].det) >= this.hourTominute(hang[j + 1].det)) {
              temp = hang[j + 1];
              hang[j + 1] = hang[j];
              hang[j] = temp;
            }
          }
        }
      }
      this.hang = hang;
    },
    // 时间前后
    nextday(index) {
      if (index == 1) {
        var date = this.checkdate;
        console.log(date)
        date.setDate(date.getDate() + 1);
        console.log(date)

      } else {
        var date = this.checkdate;
        let days = getFromTodayDays(date.getFullYear(), date.getMonth(), date.getDate());
        if (days == 0) {
          return;
        }
        date.setDate(date.getDate() - 1);
      }
      console.log(date)
      let search = JSON.parse(getStore('search'));

      let newyear = date.getFullYear();
      let newmonth = date.getMonth();
      let newday = date.getDate();
      let indate = {
        "year": newyear,
        "month": addZero(newmonth + 1),
        "day": addZero(newday),
      }
      search.startTime = indate;
      setStore("search", search);
      setStore("indate", indate);
      let newdate = new Date(newyear, newmonth, newday);
      console.log(getFromTodayDays(newyear, newmonth, newday))
      this.dayend = false;
      if (getFromTodayDays(newyear, newmonth, newday) == 0) {
        this.dayend = true;
      }
      console.log(newdate)
      let weekArray = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      this.flightDate = addZero(newmonth + 1) + '-' + addZero(newday) + weekArray[newdate.getDay()];
      let checkyear = newyear + '-' + addZero(newmonth + 1) + '-' + addZero(newday)
      setStore('week', weekArray[newdate.getDay()])
      this.post(search.startcity, search.endcity, checkyear)
    },
    // 时间换算
    hourTominute(hour) {
      let newhour = hour.split(':');
      return parseInt(newhour[0]) * 60 + parseInt(newhour[1])
    },
    checkHang(hang, index) {
      console.log(hang)
      for (let i = hang.length - 1; i >= 0; i--) {
        hang[i].checked = false;
      }
      hang[index].checked = true;
      this.hang = hang;
      setStore("hang_check", hang[index]);
      this.$router.push({
        path: '/xiang'
      })
    },
    post(departCity, arrivalCity, departDate) {
      // 在线
      if (navigator.onLine) { console.log('正常工作') } else {
        Toast({
          message: '网络连接失败，请检查后重新搜索！',
          duration: 2000
        })
        this.isLoading = false;
        this.hang = [];
        return;
      }
      this.isLoading = true;
      var postData = {};
      postData.data = {
        "memberId": "",
        "departCity": departCity.szmbs == '0' ? departCity.airport_code : departCity.city_code,
        "arrivalCity": arrivalCity.szmbs == '0' ? arrivalCity.airport_code : arrivalCity.city_code,
        "departDate": departDate,
        "oriCode": '',
        "destCode": '',
        "cfszmbs": departCity.szmbs,
        "ddszmbs": arrivalCity.szmbs,
        "sfgp": 1,
        "airways": '',
        "cabinType": "",
        "sortType": "2",
        "isFliter": "",
        "sessionId": "",
        "originalCabin": "",
        "originalDiscount": "",
        "channel": "",
        'type': 1,
      }
      console.log(postData)
      this.$http.post(this.url + '/xxx/api/public/searchTicket', postData).then(function(res) {
        console.log("航班详情：")
        console.log(res)
        if (checkSts(res, '航班查询失败', this)) {
          this.$router.replace({
            path: '/index'
          })
          return;
        }
        if (res.body.data.flightlist.length == 0) {
          this.isLoading = false;
          this.hang = [];
          return;
        }
        let data = res.body.data.flightlist;
        let sid = res.body.data.sid;

        // 航班list
        let hang = [];
        for (var i = 0; i < data.length; i++) {
          let ticket;
          // 余票
          var hour = data[i].fti.split(":")[0];
          var min = data[i].fti.split(":")[1];
          if (data[i].rsn <= 9 && data[i].rsn >= 0) {
            console.log(data[i].rsn)
            ticket = data[i].rsn
          } else {
            ticket = '12'
          }
          var frt_code = true;
          if (data[i].frt == 0) {
            var frt_code = false
          }
          let date = new Date(data[i].dpd);
          let weekArray = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
          let monDay = data[i].dpd.split('-')[0] + '年' + data[i].dpd.split('-')[1] + '月' + data[i].dpd.split('-')[2] + '日';
          let special = false;
          if (departCity.city_name == '北京南苑' || arrivalCity.city_name == '北京南苑') {
            special = true;
          }
          hang[i] = {
            special: special,
            monDay: monDay,
            week: weekArray[date.getDay()],
            ticket: ticket,
            fno: data[i].fno.indexOf('*') > -1 ? data[i].fno.replace('*', '') : data[i].fno,
            dpc_code: data[i].dpc.airportCode,
            arc_code: data[i].arc.airportCode,
            awy: data[i].awy,
            awy_code: data[i].awyCode,
            dpc: data[i].dpc.airportName.replace("机场", ""),
            arc: data[i].arc.airportName.replace("机场", ""),
            airlineCode: data[i].awyCode,
            det: data[i].det,
            dtm: data[i].dtm,
            art: data[i].art,
            atm: data[i].atm,
            can: data[i].can.substr(0, 3),
            dct: data[i].dct / 10,
            sgc: parseInt(data[i].sgc),
            rsn: parseInt(data[i].rsn),
            frt: parseInt(data[i].frt * 100),
            frt_code: frt_code,
            man: data[i].man,
            sid: res.data.data.sid,
            cabin: data[i].cab,
            itp: data[i].itp,
            hour: hour,
            min: min,
            fen: min == '00' ? true : '',
            fti: data[i].fti,
            /*飞行时长*/
            // 日期
            dpd: data[i].dpd,
            // 经停
            sto: data[i].sto,
            stp: data[i].sto == '1' ? true : false,
            checked: false,
            civdct: data[i].civdct / 10,
            cab: data[i].cab,
            pmn: data[i].pmn,
            pmd: data[i].pmd,
            pmt: data[i].pmt,
            size: data[i].pmt == '大' ? 3 : (data[i].pmt == '中' ? 2 : (data[i].pmt == '小' ? 1 : 0)),
            pmurl: data[i].pmurl,
            vepmd: data[i].vepmd,
            from: 'result',
            tui_more: false,
            priStart: '',
            share: data[i].fno.indexOf('*') > -1 ? false : true,
            shareword: data[i].fno.indexOf('*') > -1 ? false : true,
            imgcan:res.body.data.civilmodel
          }
        }
        for (var m = this.ranks.length - 1; m >= 0; m--) {
          this.ranks[m].check = false;
        }
        this.ranks[0].check = true;
        this.detailVisible = false;
        let newhang = [],
          newarr = [];
        // 有经停就取出重新开始循环
        for (var k = 0; k < hang.length; k++) {
          if (hang[k].sto == '1') {
            let stopvalue = hang[k];
            hang.splice(k, 1);
            newarr.push(stopvalue);
            k = -1;
          }
        }
        hang.sort(comparedate('det', this));
        newhang = hang.concat(newarr);

        function comparedate(property, that) {
          return function(a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return that.hourTominute(value1) - that.hourTominute(value2);
          }
        }
        this.hang = newhang;
        setStore('hang_all', newhang);
        this.isLoading = false;
        //  起飞机场  airportName  airportCode
        let dairs = res.body.data.dairs;
        if (dairs.length <= 1) {
          setStore('start_airportBoxs', [])
        } else {
          let start_airportBoxs = [];
          for (var i = 0; i < dairs.length; i++) {
            start_airportBoxs.push({
              airportCode: dairs[i].airportCode,
              name: dairs[i].airportName,
              check: false
            })
          }
          start_airportBoxs.unshift({
            airportCode: '',
            name: '不限',
            check: true
          })
          setStore('start_airportBoxs', start_airportBoxs)
        };
        // 到达机场集合
        let aairs = res.body.data.aairs;
        if (aairs.length <= 1) {
          setStore('end_airportBoxs', [])
        } else {
          let airportBoxs = [];
          for (var i = 0; i < aairs.length; i++) {
            airportBoxs.push({
              airportCode: aairs[i].airportCode,
              name: aairs[i].airportName,
              check: false
            })
          }
          airportBoxs.unshift({
            airportCode: '',
            name: '不限',
            check: true
          })
          setStore('end_airportBoxs', airportBoxs)
        };

        // 航空公司名称
        let awys = res.body.data.awyslist,
          airlineBoxs = [];
        for (var i = 0; i < awys.length; i++) {
          airlineBoxs[i] = {
            airlineCode: awys[i].airlineCode,
            name: awys[i].airlineName,
            check: false,
            type: 3
          }
        }
        airlineBoxs.unshift({
          airlineCode: '',
          name: '不限',
          type: 3,
          check: true
        })
        this.airlineBoxs = airlineBoxs;
        setStore('airlineBoxs', airlineBoxs);
      }, function(res) {
        console.log(res)
      })
    },
    stopover(sessionId, hang, that) {
      let postData = {
        data: {
          flightNo: hang.fno,
          sessionId: sessionId
        }
      }
      that.$http.post(that.url + '/xxx/api/public/getStopover', postData).then(function(res) {
        console.log(res)
        // var data = res.body.data.stps[0];
        // data.cityName
      }, function(err) {
        // console.log(err)
      })
      return hang;
    },
    filters() {
      this.$router.push({
        path: '/airplaneFilter'
      })
    }
  },
}

</script>
<style scoped>
.content {
  background: url(../assets/img/result_bg.png);
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-attachment: fixed;
  overflow-y: scroll;
  text-align: center;
  padding-bottom: 1.333333rem;
  margin-top: 1.173333rem;
}

.date {
  position: fixed;
  top: 1.173333rem;
  width: 100%;
  z-index: 100;
  margin: 0 auto;
  background-color: #e94b31;
  padding: 0.32rem 0;
}

.week_top {
  width: 9.546667rem;
  margin: 0 auto;
  background-image: url(../assets/img/result_date.png);
  background-repeat: no-repeat;
  background-size: 9.546667rem 1.066667rem;
  height: 1.066667rem;
  line-height: 1.066667rem;
  justify-content: center;
}

.week_top div {
  display: inline-block;
  font-size: 0.373333rem;
  color: #373535;
  text-align: center;
  width: 2.666667rem;
}

.week_top div:nth-of-type(2) {
  color: #f13426;
  width: 3.733333rem;
  /*  background-image: url(../assets/img/result_today.png);
  background-repeat: no-repeat;
  background-size: 100% auto;*/
  border-radius: 0.133333rem;
  background-color: #fff;
  height: 1.066667rem;
}

.week_top div:nth-of-type(2) img {
  width: 0.293333rem;
  height: 0.293333rem;
  margin-right: 0.266667rem;
}

.week_top div.checked {
  color: #59beed;
  background-color: #fff;
  border-radius: 0.133333rem;
}


.main {
  margin-top: 1.706667rem;
}

.card {
  padding: 0.533333rem 0.533333rem 0;
  margin: 0 auto;
  width: 8.8rem;
  height: 2.826667rem;
  /*margin-top: 0.32rem;*/
  background: url(../assets/img/result_card.png)no-repeat;
  background-size: 100% auto;
}

.card.actived {
  background: url(../assets/img/result_card_check.png)no-repeat;
  background-size: 100% auto;
}

.time {
  color: #3f3535;
  font-size: 0.533333rem;
  justify-content: initial;
  width: 7.2rem;
}

.time .img {
  margin: 0 0.533333rem;
  font-size: 0.293333rem;
  color: #666;
  margin-top: 0.16rem;
  justify-content: initial;
}

.time .img img {
  width: 1.893333rem;
  height: 0.266667rem;
}

.airline {
  font-size: 0.293333rem;
  color: #666;
  position: absolute;
  top: 0.933333rem;
}

.airline.left {
  left: 0;
  min-width: 2.666667rem;
  text-align: left;
}

.airline.right {
  right: 0;
  min-width: 2.666667rem;
  text-align: right;
}

.title {
  text-align: left;
  margin: 0.266667rem 0;
  height: 0.48rem;
  line-height: 0.48rem;
  margin-top: 1.333333rem;
}

.title * {
  vertical-align: middle;
}

.title span {
  font-size: 0.373333rem;
  color: #666;
}

.title img {
  margin-right: 0.266667rem;
  width: 0.48rem;
  height: 0.48rem;
}

.price {
  text-align: right;
  color: #e13426;
  font-size: 0.533333rem;
  display: inline-block;
  position: relative;
}

.residu {
  position: absolute;
  top: 0.933333rem;
  color: #fff;
  font-size: 0.346667rem;
  text-align: center;
  right: -0.426667rem;
  width: 1.973333rem;
  height: 0.533333rem;
  background-image: url(../assets/img/residu.png);
  background-repeat: no-repeat;
  background-size: 1.973333rem 0.533333rem;
  line-height: 0.533333rem;
}



.foot {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: url(../assets/img/result_foot.png)no-repeat;
  background-size: 100% auto;
}

.foot img {
  width: 0.533333rem;
  margin: 0 auto;
  height: 0.533333rem;
  display: block;
}

.foot div {
  width: 50%;
  height: 1.306667rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.foot div span {
  display: inline-block;
  width: 0.8rem;
  color: #fff;
  font-size: 0.32rem;
  margin: 0 auto;
}

.detail {
  width: 100%;
}

.rank_li {
  line-height: 1.333333rem;
  height: 1.333333rem;
  font-size: 0.4rem;
  color: #333;
  padding: 0 0.533333rem;
  background-color: #fff;
  text-align: left;
  border-bottom: 0.026667rem solid #f2f2f2;
}

.rank_li * {
  vertical-align: middle;
}

.rank_li img {
  width: 0.64rem;
  height: 0.64rem;
  margin-right: 0.533333rem;
}

.rank_li_check {
  color: #e96b39;
  position: relative;
}

.icon_more {
  background-image: url(../assets/img/result_check.png);
  background-repeat: no-repeat;
  background-size: 0.8rem 0.8rem;
  background-position: center;
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  position: absolute;
  right: 0.533333rem;
  top: 0.266667rem;
  bottom: 0.266667rem;
}

.pop {
  position: fixed;
  background: #fff;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: .2s ease-out;
  transition: .2s ease-out;
  top: auto;
  right: auto;
  bottom: 1.306667rem;
  left: 50%;
  -webkit-transform: translate3d(-50%, 0, 0);
  transform: translate3d(-50%, 0, 0);
}

.model {
  position: fixed;
  left: 0;
  top: 1.173333rem;
  bottom: 1.306667rem;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
}

.no_order {
  height: 2.666667rem;
  width: 4.8rem;
  margin-top: 1.6rem;
  margin-bottom: 1.333333rem;
}

</style>
