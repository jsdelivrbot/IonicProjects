<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content" v-else>
      <Card :card="hang"></Card>
      <p class="s-title">
        <span :class="{check:economy}" @click="economy=true">经济舱</span>
        <b>|</b>
        <span :class="{check:!economy}" @click="economy =false">商务舱/头等舱</span>
      </p>
      <div class="cang_detail">
        <template v-if="cang.length > 0">
          <div class="cang row" v-for="(value,index) in cang" @click="go(index)">
            <div class="col tui">
              <p class="detail">
                {{value.can}}{{value.cab}}
              </p>
              <p class="tuigai" v-if="value.priStart != 0">退改¥{{value.priStart}}起</p>
              <p class="tuigai" v-else>提前退改免费</p>
            </div>
            <div class="row">
              <div class="col total_price">
                <p>
                  <span class="zhe">公务价</span><span class="price">¥{{value.sgc}}</span>
                </p>
                <p style="margin-top:0.133333rem;">
                  市场价:<span style="text-decoration:line-through">¥{{value.stp}}</span>
                </p>
              </div>
              <div class="pay row">订<span class="yu" v-show="value.rsn == value.ticket">余{{value.rsn}}张</span></div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="none">
            <p>抱歉，您查询的舱位已售完</p>
            <p>请查询其他舱位</p>
          </div>
        </template>
      </div>
      <div style="text-align:center;z-index:9999;opacity:1;width:100%;left:0;top:0;position:fixed;background-color:transparent;height:100%;" v-show="isPat">
        <!-- <img src="../assets/img/loading.gif" style="width:3.2rem;height:3.2rem;position:fixed;top:0;right:0;bottom:0;left:0;margin:auto;"></img> -->
        <!-- <div id="loading-center"> -->
          <div id="loading-center-absolute">
            <div  class="circle">
              <div class="object" id="object_one"></div>
              <div class="object" id="object_two"></div>
              <div class="object" id="object_three"></div>
              <div class="object" id="object_four"></div>
              <div class="object" id="object_five"></div>
              <div class="object" id="object_six"></div>
              <div class="object" id="object_seven"></div>
              <div class="object" id="object_eight"></div>
            </div>
            <div class="word">加载中...</div>
          </div>
        </div>
      <!-- </div> -->
    </div>
  </div>
</template>
<script type="text/javascript">
import loading from './loading'
import headTop from './head'
import Card from './card'
import { Toast, MessageBox } from 'mint-ui'
import {
  getStore,
  setStore,
  checkErr,
  checkSts
} from '../config/utils'
export default {
  data() {
    return {
      isLoading: true,
      date: '',
      week: '',
      hang: [],
      title: '',
      cang: [],
      economy: true,
      isPat: false,
      trueHeight: ''
    }
  },
  activated: function() {
    this.trueHeight = getStore('trueHeight');
    setStore("refresh", false)
    var that = this;
    that.isPat = false;
    that.needLogin = false;
    let hang_check = JSON.parse(getStore("hang_check"));
    hang_check.from = "xiang";
    let search = JSON.parse(getStore("search"));
    let title = getStore("title");
    that.title = title;
    that.hang = hang_check;
    that.date = getStore('hang_date');
    var postData = {
      data: {
        "flightNo": hang_check.fno,
        "sessionId": hang_check.sid,
        "cabinType": "",
        "type": 1
      }
    };
    that.$http.post(that.url + '/xxx/api/public/queryMoreCabin', postData).then(function(res) {
      console.log("舱位详情：")
      console.log(res)
      that.isLoading = true;
      if (checkSts(res, '航班更多舱位获取失败', that)) {
        that.$router.push({
          path: '/home',
        })
        return;
      }
      let data = res.body.data.cbns,
        cang = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].rsn <= 9 && data[i].rsn >= 0) {
          var ticket = parseInt(data[i].rsn)
        } else {
          var ticket = '12'
        }
        console.log(data[0].nts.split('%')[0].replace(/[^0-9]/ig, ""))
        var zhe = (parseInt(data[i].dct) / 10 - 10) >= 0;
        cang[i] = {
          can: data[i].can,
          dct: parseInt(data[i].dct) / 10,
          sgc: parseInt(data[i].sgc),
          rsn: data[i].rsn,
          sid: hang_check.sid,
          pid: data[i].pid,
          fno: hang_check.fno,
          cab: data[i].cab,
          nts: data[i].nts,
          zhe: zhe,
          pna: data[i].pna,
          ticket: ticket,
          policyId: data[i].pte,
          civdct: data[i].civdct / 10,
          stp: parseInt(data[i].stp),
          priStart: parseInt(parseInt(data[i].stp) * data[i].nts.split('%')[0].replace(/[^0-9]/ig, "") / 100),
          regulation: '',
          refundArr: '',
        }
      }
      var temp;
      for (var i = 0; i < cang.length; i++) {
        for (var j = 0; j < cang.length - i - 1; j++) {
          if (parseInt(cang[j].sgc) >= parseInt(cang[j + 1].sgc)) {
            temp = cang[j + 1];
            cang[j + 1] = cang[j];
            cang[j] = temp;
          }
        }
      }
      setStore('cang_all', cang);
      let economyArr = [],
        civilArr = [];
      for (var i = cang.length - 1; i >= 0; i--) {
        if (cang[i].can && cang[i].can.indexOf('经济') >= 0) {
          economyArr.push(cang[i])
        } else {
          cang[i].can = cang[i].can.replace('公', '商');
          civilArr.push(cang[i])
        }
      }
      console.log(economyArr)
      console.log(civilArr)
      this.economyArr = economyArr;
      this.civilArr = civilArr;
      this.economy = true;
      this.cang = economyArr;
      this.isLoading = false;
    }, function(res) {
      console.log(res)
      if (checkErr(res, 'xiang')) {
        that.$router.push({
          path: '/register'
        })
      }
    })
    // token检查
    let postDat = { data: {} },
      token = getStore('token');
    that.$http.post(that.url + '/xxx/api/private/checkToken', postDat, {
      headers: { "Authorization": token },
    }).then(function(res) {
      console.log(res)
    }, function(err) {
      console.error(err)
      if (err.status == '401' || (
          (err.status == '500') && (err.data.message.indexOf("UsernameNotFound") != -1)
        )) {
        let userinfo = JSON.parse(getStore('userinfo'))
        let phone = '';
        if (userinfo) {
          phone = userinfo.phone;
        };
        let postDat = {
          data: {
            phoneNumber: phone
          }
        };
        that.$http.post(that.url + '/xxx/api/civilsignin/byWeAppH5', postDat, ).then(function(res) {
          console.log(res)
          if (res.body.sts == -1) {
            that.needLogin = true;
            return;
          }
          setStore('userinfo', res.body.data.data.userinfo);
          setStore('token', res.body.token)
        }, function(res) {
          console.log(res)
        })
      }
    })
  },
  components: {
    headTop,
    loading,
    Card
  },
  methods: {
    go(index) {
      if (this.economy == false) {
        MessageBox.confirm('', {
          message: '头等舱和商务舱是副部级(含)以上才可以报销哦',
        }).then(action => {
          if (action == 'confirm') {
            this.goTo(index)
          }
        })
      } else {
        this.goTo(index)
      }
    },
    goTo(index) {
      let cang = this.cang,
        that = this;
      let hang_check = JSON.parse(getStore("hang_check"));
      hang_check.priStart = cang[index].priStart;
      setStore('check_cang', cang[index]);
      setStore('hang_check', hang_check);
      // 检查token
      if (that.needLogin) {
        that.$router.push({
          path: '/register'
        })
        return;
      }

      // 验价
      let search = JSON.parse(getStore('search'));
      let date = that.hang.det.split(':')[0] + that.hang.det.split(':')[1];
      let postData = {
        data: {
          'departure': search.startcity.city_code,
          'arrival': search.endcity.city_code,
          'airline': that.hang.awy_code,
          'departureDate': that.hang.dpd,
          'departureTime': date,
          'cabin': that.cang[index].cab,
        }
      }
      that.isPat = true;
      that.$http.post(that.url + '/xxx/api/public/pat', postData).then(function(res) {
        console.log("验价：")
        console.log(res)
        that.isPat = false;
        // discount:88 fare:5490 tax:50 total:5540
        if (res.body.message && res.body.message.indexOf('验价成功') != -1) {

          setStore('onefresh', true)
          setStore('StandarPrice', res.body.obj)
          that.$router.push({
            path: '/dingdan'
          })
        } else {
          MessageBox({
            title: '提示',
            message: res.body.message
          })
        }
      }, function(err) {
        console.log(err)
      })
    }
  },
  watch: {
    economy: function(value) {
      if (value) {
        this.cang = this.economyArr
      } else {
        this.cang = this.civilArr
      }
    }
  }
}

</script>
<style scoped>
.content {
  padding-top: 0.426667rem;
  overflow-y: scroll;
  background-image: url(../assets/img/xiang_bg.png);
  background-repeat: round;
  background-size: cover;
  margin-top: 1.173333rem;
}

.s-title {
  color: #848484;
  font-size: 0.48rem;
  height: 1.066667rem;
  line-height: 1.066667rem;
  background-color: #fff;
  width: 100%;
  text-align: center;
  margin: 0.266667rem 0;
}

.s-title span {
  width: 47%;
  display: inline-block;
}

.s-title span.check {
  color: #000;
}

.cang_detail {
  height: 9.866667rem;
  padding-top: 0.08rem;
  overflow-y: scroll;
  margin: 0 auto;
}

.none {
  margin: 0 auto;
  text-align: center;
  color: #666;
  font-size: 0.373333rem;
  margin-top: 0.8rem;
}

.none p {
  line-height: 0.533333rem;
}

.cang {
  border-radius: 0.133333rem;
  width: 9.786667rem;
  margin: 0 auto;
  background-image: url(../assets/img/xiang_card.png);
  background-repeat: no-repeat;
  background-size: 9.786667rem 1.786667rem;
  height: 1.786667rem;
  color: #666;
  font-size: 0.32rem;
}

.tui {
  justify-content: center;
  margin: 0 0 0 0.533333rem;
}

.tuigai {
  font-size: 0.32rem;
  color: #e96b39;
  margin-top: 0.266667rem;
}

.detail {
  font-size: 0.426667rem;
  color: #000;
  /*    text-overflow:ellipsis;
  white-space: nowrap;*/
}

.go {
  display: block;
  width: 1.866667rem;
  height: 1.6rem;
  text-align: center;
  z-index: 99;
  line-height: 1.6rem;
}

.total_price {
  margin-right: 0.533333rem;
  justify-content: center;
  text-align: right;
}

.zhe {
  display: inline-block;
  height: 0.4rem;
  text-align: center;
  font-size: 0.266667rem;
  line-height: 0.4rem;
  color: #666;
  margin-right: 1.266667rem;
}

.price {
  font-size: 0.533333rem;
  color: #e13426;
}

.zhe,
.price {
  vertical-align: middle;
}

.pay {
  width: 1.386667rem;
  height: 1.786667rem;
  line-height: 1.786667rem;
  text-align: center;
  display: inline-block;
  color: #fff;
  font-size: 0.4rem;
  position: relative;
}

.yu {
  font-size: 0.266667rem;
  color: #f8ebc8;
  text-align: center;
  position: absolute;
  top: 0.426667rem;
  left: 0;
  right: 0;
}

</style>
