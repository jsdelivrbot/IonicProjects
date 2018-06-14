<template>
  <div class="top">
    <p class="title">
      <img :src="require('../assets/img/airline_logo/'+card.awy_code+'.png')">
      <span>{{card.awy}}&nbsp;{{card.fno}}&nbsp;&nbsp;&nbsp;</span>
      <span style="float:right">{{card.monDay}}&nbsp;{{card.week}}</span>
    </p>
    <div class="row main">
      <div class="left">
        <p class="time">{{card.det}}</p>
        <span class="left_air">{{card.dpc}}{{card.dtm}}</span>
      </div>
      <div class="middle col">
        <span style="margin-top:-0.32rem;">{{card.hour !='00'?card.hour+'h':''}}{{card.min !='00'?card.min+'m':''}}</span>
        <img src="../assets/img/icon_luxian_1.png">
        <p v-show="card.stp" style="color:#e13426;">经停</p>
      </div>
      <div class="right">
        <p class="time">{{card.art}}</p>
        <span class="right_air">{{card.arc}}{{card.atm}}</span>
      </div>
    </div>
    <p class="zhun">
      <span class="line">{{card.man}}</span>
      <span v-show="card.frt!=0">|</span>
      <span class="line" v-show="card.frt!=0">准点率：{{card.frt}}%</span>
      <span v-show="card.from !='xiang'">|</span>
      <span v-show="card.from !='xiang'">{{card.cabinname}}&nbsp;{{card.cab}}</span>
    </p>
    <p class="pmn">
      <span style="margin-right:0.533333rem;">机型</span>
      <span>{{card.pmn}}{{card.pmd}}{{card.pmt?'('+card.pmt+')':''}}</span>
      <span class="airImg" v-if="imgcode" @click="toImg(card.pmurl)">查看机型图</span>
      <!-- <router-link tag='span' :to="{path:'/typeImg',query:{id:card.pmurl,time:Math.random()}}" class="airImg" v-if="imgcode">查看机型图</router-link> -->
      <span v-else style="color:#666">暂无机型图</span>
    </p>
    <div v-if="!card.tui_more" class="pmn" @click="card.tui_more = !card.tui_more" v-show="card.from !='xiang'">
      <span style="margin-right:0.533333rem;">退改</span>
      <span v-show="card.from !='ordermore'">退改¥{{card.priStart}}起</span>
      <span class="more">点击可查看详情</span>
    </div>
    <div v-else class="tui" @click="card.tui_more = !card.tui_more">
      <p class="tui_title">
        <span>成人退改签说明</span>
        <span class="more_top">点击可收起详情</span>
      </p>
      <div class='border'>
        <div v-for="(value,index) in card.refundArr" :style="{'display':value ==''?'none':'flex'}" class="row">
          <p class="main_l">{{index == 0 ?'退票费':'改签费'}}</p>
          <p class="main_r">
            <span v-for="gai in value" :style="{'display':gai.itemDes ==''?'none':'block'}">{{gai.itemDes}}：¥{{gai.itemPrice}}/人</span>
          </p>
        </div>
        <div class="row">
          <p class="main_l">签转条件</p>
          <p class="main_r">不可签转</p>
        </div>
        <div class="row">
          <p class="main_l">备注</p>
          <p class="main_r">退改签规定以航空公司最新标准为准</p>
        </div>
        <div class="row explain" style="border-bottom: 0;">
          <p class="main_l">详情</p>
          <div class="expalin_detail">
            <p v-for="(value,index) in card.refundArr" :style="{'display':value ==''?'none':'block'}">{{index == 0 ?'退票':'改签'}}：<span v-for="gai in value" :style="{'display':gai.itemDes ==''?'none':'block'}">{{gai.itemDes}}收{{gai.itemValue}}%退票费;</span>
            </p>
            <p>改期费与票价差额同时发生时,两者需同时收取。</p>
          </div>
        </div>
      </div>
      <p class="luggage_title" v-show="tui_code">行李额</p>
      <p class="luggage_content" v-show="tui_code">{{luggage}}</p>
    </div>
  </div>
</template>
<script type="text/javascript">
import {
  getStore,
  setStore,
} from '../config/utils'
export default {
  data() {
    return {
      thr: '',
      tui: {},
      tui_code: false,
      fei: {},
      tui_more: true,
      luggage: '30KG免行李费用',
      imgcan: 'CZ319-CZ320-CZ321-CZ332-CZ333-CZ73F-CZ73G-CZ77W-CZ32E-CZ33A-CZ33B-CZ33G-CZ380-CZ738-CZ772-CZ787-CA319-CA320-CA73F-CA73G-CA744-CA772-CA77W-CA789-CA321-CA332-CA333-CA738-MU319-MU320-MU333-MU77W-MF73G-MF788-MF789-HO320-HO321-KY738-KY73G-ZH32F-ZH73F-320-ZH330-ZH738-ZH739',
      imgcode: false
    }

  },
  props: ['card'],
  mounted() {
    console.log('card0000')
    let imgs = this.card.imgcan.split('-');
    console.log(this.card.awy_code + this.card.vepmd)
    this.imgcode = false;
    for (var i = imgs.length - 1; i >= 0; i--) {
      if (imgs[i] == (this.card.awy_code + this.card.vepmd)) {
        this.imgcode = true;
      }
    }

  },
  components: {},
  methods: {
    toImg(url){
      setStore('imgUrl',url);
      this.$router.push({
        path:'/typeImg'
      })
    }
  },
  watch: {
    card: function() {
      console.log('card11111111')
      let imgs =this.card.imgcan.split('-');
      console.log(this.card.awy_code + this.card.vepmd)
      this.imgcode = false;
      for (var i = imgs.length - 1; i >= 0; i--) {
        if (imgs[i] == (this.card.awy_code + this.card.vepmd)) {
          this.imgcode = true;
        }
      }
    }
  }
}

</script>
<style scoped>
.top {
  margin: 0 0.16rem 0;
  padding: 0.346667rem 0.533333rem 0 0.533333rem;
  border-radius: 0.133333rem;
  background-color: #fff;
  text-align: center;
}

.top .title {
  color: #666;
  font-size: 0.293333rem;
  text-align: left;
}

.top .title img {
  margin-right: 0.16rem;
  width: 0.293333rem;
  height: 0.293333rem;
}

.top .main {
  margin-top: 0.32rem;
  justify-content: space-around;
}

.top .main {
  color: #333;
  font-size: 0.32rem;
}

.top .main .left,
.right {
  margin-top: 0.133333rem;
  position: relative;
}

.left_air {
  position: absolute;
  top: 0.933333rem;
  left: 0;
  min-width: 2.666667rem;
  text-align: left;
}

.right_air {
  position: absolute;
  top: 0.933333rem;
  right: 0;
  min-width: 2.666667rem;
  text-align: right;
}

.top .main p:nth-of-type(2) {
  margin-top: 0.266667rem;
  font-size: 0.373333rem;
  color: #828282;
}

.top .main .middle p {
  font-size: 0.32rem;
  color: #4a4a4a;
}

.top .main .middle img {
  height: 0.72rem;
  width: 4.32rem;
}

.top .main .middle p:nth-of-type(2) {
  color: #ff6666;
}

.top .main .time {
  color: #333;
  font-size: 0.64rem;
}

.zhun {
  margin-top: 0.8rem;
  color: #666;
  font-size: 0.266667rem;
  height: 0.8rem;
  line-height: 0.8rem;
  border-bottom: 0.013333rem solid #eee;
}

.line {
  margin: 0 0.106667rem;
}

.pmn {
  /*margin: 0 0.533333rem;*/
  text-align: left;
  font-size: 0.32rem;
  color: #333;
  height: 1.066667rem;
  line-height: 1.066667rem;
  border-bottom: 0.013333rem solid #eee;
}

.pmn span:nth-of-type(1) {
  color: #666;
}

.pmn span:nth-of-type(3) {
  float: right;
  color: #e96b39;
}

.airImg {
  background: url(../assets/img/more_right.png)no-repeat;
  background-size: 0.426667rem 0.426667rem;
  padding-right: 0.533333rem;
  display: inline-block;
  background-position: right center;
}

.more {
  background: url(../assets/img/tui_more_bottom.png)no-repeat;
  background-size: 0.426667rem 0.426667rem;
  padding-right: 0.533333rem;
  background-position: right center;
  display: inline-block;
}

.more_top {
  float: right;
  color: #e96b39;
  background: url(../assets/img/tui_more_top.png)no-repeat;
  background-size: 0.426667rem 0.426667rem;
  padding-right: 0.533333rem;
  background-position: right center;
  display: inline-block;
}

.tui {
  background-color: #fff;
  border-radius: 0.266667rem;
  text-align: left;
  padding-bottom: 0.533333rem;
}

.tui .border {
  border: 0.013333rem solid #cecece;
}

.tui .row {
  border-bottom: 0.013333rem solid #cecece;
}

.tui_title {
  /*padding: 0 0.4rem;*/
  padding-left: 0;
  font-size: 0.32rem;
  color: #333;
  height: 1.066667rem;
  line-height: 1.066667rem;
}

.main_l {
  color: #666;
  width: 1.866667rem;
  line-height: 0.96rem;
  text-align: center;
  font-size: 0.32rem;
  border-right: 0.013333rem solid #cecece;
}

.main_l::after {
  display: inline-block;
  width: 0;
  height: 100%;
  vertical-align: middle;
  content: "";
}

.main_r {
  width: 6.746667rem;
  height: 0.96rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0.133333rem 0 0.133333rem 0.266667rem;
  color: #333;
  font-size: 0.293333rem;
}

.expalin_detail {
  width: 6.746667rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0.133333rem 0 0.133333rem 0.266667rem;
  color: #333;
  font-size: 0.293333rem;
}

.expalin_detail p {
  line-height: 0.533333rem;
}

.luggage_title {
  padding: 0 0.4rem;
  padding-left: 0;
  font-size: 0.32rem;
  color: #333;
  height: 0.8rem;
  line-height: 0.8rem;
}

.luggage_content {
  color: #666;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.293333rem;
  margin-left: 0.266667rem;
}

</style>
