<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content" v-else>
      <div class="top_btn row">
        <p :class="{check:provide}" @click="provide = true">服务商</p>
        <p :class="{check:!provide}" @click="provide = false">供应商</p>
      </div>
      <template v-if="!provide">
        <div class="top row" @click="pop =!pop">
          <p><span>直销</span></p>
          <p><span class="agency">代理人</span></p>
          <p><span class="ie">网站</span></p>
          <span class="unfold" v-show="false">{{pop?'收缩':'展开'}}</span>
        </div>
        <div v-show="pop">
          <div class="pop_list row">
            <span class="just_pop">直销渠道</span><span>您可在该航空公司任一营业部及柜台购买到其政府采购机票。</span>
          </div>
          <div class="pop_list row">
            <span class="agency_pop">代理渠道</span><span>您可在服务商代理处购买到该航空公司的政府采购机票。</span>
          </div>
          <div class="pop_list row">
            <span style="line-height: 1.866667rem;">网站渠道</span><span>您可在政府采购机票管理网站(www.gpticket.org)购买到该航空公司的政府采购机票。</span>
          </div>
        </div>
        <ul class="btn">
          <li @click="check_li(index)" v-for="(value,index) in btn_li">
            <img :src="require('../assets/img/airline_logo/'+value.supplier_code+'.png')">
            <span class="title">{{value.supplier_name}}</span>
            <p class="icon">
              <span class="icon_just" v-show="value.direct_selling == '1'"></span>
              <span class="icon_agency" v-show="value.agent == '1'"></span>
              <span class="icon_ie" v-show="value.website == '1'"></span>
            </p>
            <span class="icon_more"></span>
          </li>
        </ul>
      </template>
      <template v-else>
        <div class="list">
          <span>所在地区</span><span @click="popupVisible = true">{{address}}</span><span class="icon_more" @click="popupVisible = true"></span>
          <mt-popup v-model="popupVisible" position="bottom" class='ssq'>
            <div class="popBtns">
              <span @click="popupVisible = false">取消</span>
              <span>选择地区</span>
              <span @click="popupVisible = false">确定</span>
            </div>
            <mt-picker :slots="addressSlots" class="picker" @change="onAddressChange" :visible-item-count="5"></mt-picker>
          </mt-popup>
        </div>
        <div class="list">
          <span>机构名称</span>
          <input type="text" placeholder="支持模糊查询(选填)" v-model="name">
        </div>
        <button @click="tosearch()">搜&nbsp;&nbsp;索</button>
      </template>
    </div>
  </div>
</template>
<script type="text/javascript">
import loading from './loading'
import Address from '../assets/city_1.json'
import headTop from './head'
import {
  getStore,
  setStore,
  checkInput
} from '../config/utils'
export default {
  data() {
    return {
      isLoading: true,
      title: '服务商/供应商',
      trueHeight: '',
      provide: true,
      pop: false,
      popupVisible: false,
      address: '全部地区',
      btn_li: [],
      province: '',
      city: '',
      name: '',
      addressSlots: [{
          flex: 1,
          defaultIndex: 0,
          values: Object.keys(Address),
          className: 'slot1',
          textAlign: 'center'
        },
        {
          divider: true,
          content: '-',
          className: 'slot2'
        },
        {
          flex: 1,
          defaultIndex: 0,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        }
      ],
    }
  },
  activated: function() {
    this.provide = true;
    this.pop = false;
    this.popupVisible = false;
    this.trueHeight = getStore('trueHeight');
    this.isLoading = false;
    let values = Object.keys(Address);
    let shi = Address[values[0]];
    this.addressSlots[2].values = shi;
    this.btn_li = [];
    let postData = {
      "data": {}
    };
    this.$http.post(this.url + '/xxx/api/public/queryfindAllSupplier', postData).then(function(res) {
      console.log("供应商:")
      console.log(res)
      let data = res.body.data;
      this.btn_li = data;
    }, function(err) {
      console.log(err)
    })
  },
  components: {
    headTop,
    loading
  },
  methods: {
    check_li(index) {
      setStore('provider_detail', this.btn_li[index]);
      this.$router.push({
        path: '/provider_detail'
      })
    },
    tosearch() {
      let data = {
        "service_provider_name": this.name,
        "province": this.province,
        "city": this.city
      }
      setStore('facilitator_detail', data)
      this.$router.push({
        path: '/facilitator_detail'
      })
    },
    onAddressChange(picker, values) {
      if (!this.popupVisible) {
        return;
      }
      let sheng = Object.keys(Address);
      let shi = Address[values[0]];
      picker.setSlotValues(1, shi);
      this.province = values[0];
      this.city = values[1];
      this.address = values[0] + values[1];
    },
  },
}

</script>
<style scoped>
.content {
  background: #f2f2f2;
  position: relative;
  margin-top: 1.173333rem;
  text-align: center;
}

.top_btn {
  margin-bottom: 0.533333rem;
}

.top_btn p {
  display: inline-block;
  width: 50%;
  text-align: center;
  height: 1.306667rem;
  line-height: 1.306667rem;
  color: #666;
  font-size: 0.426667rem;
  background-color: #fff;
}

.top_btn p.check {
  border-bottom: 0.053333rem solid #eb4931;
  color: #333;
}

.top {
  padding: 0 0.533333rem;
  justify-content: space-around;
  background: #fff;
}

.top p {
  height: 1.6rem;
  line-height: 1.6rem;
  font-size: 0.373333rem;
  color: #666;
  width: 2.666667rem;
  text-align: center;
}

.top p span {
  padding-left: 0.906667rem;
  background: url(../assets/img/just.png)no-repeat;
  background-size: 0.64rem 0.64rem;
  height: 0.64rem;
  line-height: 0.64rem;
  display: inline-block;
}

.top p span.agency {
  background: url(../assets/img/agency.png)no-repeat;
  background-size: 0.64rem 0.64rem;
}

.top p span.ie {
  background: url(../assets/img/ie.png)no-repeat;
  background-size: 0.64rem 0.64rem;
}

.top span.unfold {
  line-height: 1.6rem;
  color: #e94b31;
  font-size: 0.373333rem;
}

.pop_list {
  padding: 0 0 0 1.066667rem;
  background-color: #fff;
  color: #666;
  font-size: 0.32rem;
  height: 1.333333rem;
  justify-content: initial;
  text-align: left;
}

.pop_list:nth-of-type(1) {
  border-top: 0.013333rem solid #ccc;
}

.pop_list:nth-of-type(3) {
  height: 1.866667rem;
  line-height: 1.866667rem;
}

.pop_list * {
  vertical-align: middle;
}

.pop_list span:nth-of-type(1) {
  display: inline-block;
  font-size: 0.373333rem;
  line-height: 1.333333rem;
  padding-left: 0.8rem;
  margin-right: 0.266667rem;
  background: url(../assets/img/ie.png)no-repeat left;
  background-size: 0.64rem 0.64rem;
}

.pop_list span:nth-of-type(2) {
  display: inline-block;
  font-size: 0.373333rem;
  line-height: 0.4rem;
  padding: 0.266667rem 0;
  width: 65%;
}

.pop_list span.just_pop {
  background: url(../assets/img/just.png)no-repeat left;
  background-size: 0.64rem 0.64rem;
}

.pop_list span.agency_pop {
  background: url(../assets/img/agency.png)no-repeat left;
  background-size: 0.64rem 0.64rem;
}

.btn {
  justify-content: initial;
  margin-top: 0.533333rem;
}

.btn li {
  text-align: center;
  line-height: 1.333333rem;
  height: 1.333333rem;
  font-size: 0.426667rem;
  color: #666;
  padding: 0 0.533333rem;
  background-color: #fff;
  border-bottom: 0.013333rem solid #e5e5e5;
  position: relative;
  text-align: left;
}

.btn li * {
  vertical-align: middle;
}

.btn li span {
  display: inline-block;
}

.btn li img {
  width: 0.426667rem;
  height: 0.426667rem;
  margin-right: 0.266667rem;
}

.btn li .title {
  color: #333;
  text-align: left;
  display: inline-block;
  max-width: 64%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 0.533333rem;
}

.icon {
  display: inline-block;
  position: absolute;
  right: 1.173333rem;
}

.icon span {
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
}

.icon_just {
  margin-right: 0.106667rem;
  background: url(../assets/img/icon_just.png)no-repeat;
  background-size: 100% auto;
}

.icon_agency {
  margin-right: 0.106667rem;
  background: url(../assets/img/icon_agency.png)no-repeat;
  background-size: 100% auto;
}

.icon_ie {
  background: url(../assets/img/icon_ie.png)no-repeat;
  background-size: 100% auto;
}

.icon_more {
  width: 0.8rem;
  height: 0.8rem;
  background-image: url(../assets/img/icon_more.png);
  background-repeat: no-repeat;
  background-size: 0.8rem 0.8rem;
  background-position: center;
  position: absolute;
  right: 0.32rem;
  top: 0.266667rem;
  bottom: 0.266667rem;
}

.popBtns{
  border-bottom: 0.013333rem solid #e5e5e5;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
   height: 1.066667rem;
  color: #333;
  line-height: 1.066667rem; 
  font-size: 0.426667rem;
  padding: 0.026667rem 0;
}
.list .popBtns span{
  margin: 0 0.266667rem;
}
.popBtns span{
  border: none;
  margin: 0 0.533333rem;
  height: 1.066667rem;
  line-height: 1.066667rem;
  background-color: #fff;
  font-size: 0.373333rem;
  color: #666;
}
.popBtns span:nth-of-type(3){
  color: #e94b31;
}

/*服务商*/

.list {
  position: relative;
  padding: 0 0.533333rem;
  font-size: 0.426667rem;
  color: #666;
  background-color: #fff;
  height: 1.333333rem;
  line-height: 1.333333rem;
  border-bottom: 0.013333rem solid #f5f5f5;
  text-align: left;
}

.list span:nth-of-type(1) {
  margin-right: 0.8rem;
}

button {
  width: 8.773333rem;
  height: 1.44rem;
  line-height: 1.44rem;
  font-size: 0.533333rem;
  color: #fff;
  font-weight: 600;
  background: url(../assets/img/red_btn.png)no-repeat;
  background-size: 100% auto;
  background-position: 0 0.106667rem;
  margin: 0 auto;
  margin-top: 1.333333rem;
  border: none;
}

</style>
