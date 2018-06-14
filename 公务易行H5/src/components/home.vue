<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-service='true'></head-top>
    <!-- <template v-if="index_code"> -->
    <loading v-if="isLoading"></loading>
    <div v-else class="content col">
      <div class="banner">
        <mt-swipe :auto="4000" :prevent="true">
          <mt-swipe-item><img src="../assets/img/home_bg_1.png"></mt-swipe-item>
          <mt-swipe-item><img src="../assets/img/home_bg_2.png"></mt-swipe-item>
          <mt-swipe-item><img src="../assets/img/home_bg_3.png"></mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="lists">
        <div class="row list">
          <div @click="pageTo(0)"><span>国内机票</span></div>
          <div @click="pageTo(1)"><span style="color:#666;">国内酒店</span></div>
          <div @click="pageTo(2)"><span style="color:#666;">火车票</span></div>
        </div>
        <div class="row my">
          <div @click="pageTo(3)"><span style="color:#666;">用车</span></div>
          <div @click="pageTo(4)"><span>公务指南</span></div>
          <div @click="pageTo(5)"><span>我的</span></div>
        </div>
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
  getFromTodayDays,
  checkErr,
  checkSts
} from '../config/utils'

export default {
  data() {
    return {
      title: '公务易行',
      isLoading: true,
      trueHeight: '',
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log(to)
    console.log(from)
    let leaveHome = getStore('leaveHome');
    if (leaveHome && leaveHome == '1') {
      next(true)
    } else {
      next(false)
    }
  },
  activated: function() {
    this.isLoading = false;
    setStore('toHome', true);
    setStore('leaveHome', '0');
  },
  mounted() {
    var pageWidth = window.innerWidth;
    var pageHeight = window.innerHeight;
    if (document.compatMode == "CSS1Compat" ) {
            pageWidth = document.documentElement.clientWidth;
            pageHeight = document.documentElement.clientHeight;
        } else {
            pageWidth = document.body.clientWidth;
            pageHeight = window.body.clientHeight;
        }
      setStore('trueHeight', pageHeight + 'px');
    document.addEventListener('plusready', function() {
      var Statusbar = plus.navigator.getStatusbarHeight();
      var screenHeight = plus.screen.resolutionHeight;
      var trueHeight = screenHeight - Statusbar;
      setStore('trueHeight', trueHeight + 'px')
    })
    this.trueHeight = getStore('trueHeight')
  },

  components: {
    loading,
    headTop,
  },

  computed: {

  },

  methods: {
    pageTo(index) {
      if (index == 0) {
        setStore('leaveHome', '1')
        this.$router.push({
          path: '/index',
        })
      } else if (index == 4) {
        setStore('tokenTimeout', '0')
        setStore('leaveHome', '1')
        this.$router.push({
          path: '/guide',
        })
      } else if (index == 5) {
        setStore('leaveHome', '1')
        this.$router.push({
          path: '/my',
        })
      } else {
        MessageBox.confirm('', {
          message: '即将上线，敬请期待!',
          showCancelButton: false,
          confirmButtonText: '我知道了',
        }).then(action => {
          if (action == 'confirm') {
            console.log(action)
          }
        });
      }
    }
  }
}

</script>
<style type="text/css" scoped>
.content {
  background-color: #F8EBC8;
  margin-top: 1.173333rem;
  height: 100%;
}

.content .banner {
  width: 100%;
  height: 65%;
}

.content .banner img {
  width: 100%;
  height: 100%;
  background-size: 100% auto;
}

.lists {
  height: 35%;
  position: absolute;
  bottom: 0.0rem;
  left: 0.0rem;
  background-color: #F8EBC8;
  width: 100%;
}

.list {
  box-sizing: border-box;
  border-bottom: 0.013rem solid #ccc;
  height: 50%;
}

.my {
  height: 50%;
}

.list div,
.my div {
  height: 100%;
  flex: 1;
  text-align: center;
  background-image: url(../assets/img/index_air.png);
  background-repeat: no-repeat;
  background-size: 100% auto;
  border-right: 0.013rem solid #ccc;
  position: relative;
}

.list div:nth-of-type(2) {
  background-image: url(../assets/img/index_hotel.png);
}

.list div:nth-of-type(3) {
  background-image: url(../assets/img/index_train.png);
  border-right: 0;
}

.my div:nth-of-type(1) {
  background-image: url(../assets/img/index_taxi.png);
}

.my div:nth-of-type(2) {
  background-image: url(../assets/img/index_guide.png);
}

.my div:nth-of-type(3) {
  background-image: url(../assets/img/index_set.png);
  border-right: 0;
}

.my div span,
.list div span {
  position: absolute;
  bottom: 10%;
  left: 0;
  right: 0;
  display: inline-block;
  font-size: 0.426667rem;
  color: #333;
  margin: 0 auto;
}

</style>
