<template>
  <div class="container">
    <head-top title="城市选择" go-back='true' go-home='true'></head-top>
    <div class="shade" v-show="show" @click='show=false'></div>
    <loading v-if="isLoading"></loading>
    <div class="content" v-else>
      <div class="top">
        <input type="text" placeholder="城市名/拼音缩写/三字码" v-model="city" @input="search" @focus="focus">
      </div>
      <div class="all-city">
        <mt-index-list>
          <mt-index-section index="历">
            <div class="history" v-if="historytitle">
              <p>历史<span class="line"></span></p>
              <ul>
                <li v-for="(value,key,index) in sorthistorycity" :key="value.city" class="historycity_li" @click="checkcity(value)">
                  {{value.city_name}}
                </li>
              </ul>
            </div>
          </mt-index-section>
          <mt-index-section index="热">
            <div class="hot">
              <p>热门<span class="line"></span></p>
              <ul>
                <li v-for="(value,key,index) in sorthotcity" :key="value.city" class="hotcity_li" @click="checkcity(value)">
                  {{value.city_name}}
                </li>
              </ul>
            </div>
          </mt-index-section>
          <mt-index-section v-for="(value,key,index) in sortgroupcity" :key="key" class="letter_classify_li" v-if="value.zi != 'none'" :index="value.zi">
            <h4 class="city_title">{{value.zi}}
                        <span v-if="index == 0">（按字母排序）</span>
                    </h4>
            <ul>
              <li v-for="item in value.city" :key="item.city_code" class="ellipsis" @click="checkcity(item)">
                {{item.city_name}}
              </li>
            </ul>
          </mt-index-section>
        </mt-index-list>
      </div>
    </div>
    <div class="result" v-show="resultShow" @touchmove.prevent>
      <ul>
        <li v-for="(value,key,index) in sortResultcity" :key="value.airport_code" class="resultLi" @click="checkcity(value)">
          <span>{{value.city_name}}</span>
          <span>{{value.airport_code}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import headTop from './head'
import loading from './loading'
import {
  getStore,
  setStore
} from '../config/utils'

export default {
  data() {
    return {
      isLoading: true,
      resultShow: false,
      show: false,
      city: '',
      historytitle: false,
      resultCity: [],
      cityHistory: [],
      hotcity: [],
      groupcity: {}, //所有城市列表
    }
  },
  created: function() {},
  activated: function() {
    let history = JSON.parse(getStore('cityHistory'));
    let allcity = JSON.parse(getStore('city'));
    if (history) {
      this.cityHistory = history;
      this.historytitle = true;
    } else {
      this.historytitle = false;
    }
    console.log(allcity)
    for(let i = 0;i<allcity.length;i++){
      console.log(allcity[i].zi == 'B')
      if(allcity[i].zi == 'B'){
        let citys = allcity[i].city;
        for(let j = 0;j<citys.length;j++){
          if(citys[j].airport_code == 'NAY'){
            citys[j].city_name = '北京南苑'
          }else if(citys[j].airport_code == 'PEK'){
            citys[j].city_name = '北京首都'
          }
        }
      }else if(allcity[i].zi == 'S'){
        let citys = allcity[i].city;
        for(let k = 0;k<citys.length;k++){
          if(citys[k].airport_code == 'SHA'){
            citys[k].city_name = '上海虹桥'
          }else if(citys[k].airport_code == 'PVG'){
            citys[k].city_name = '上海浦东'
          }
        }
      }
    }
    this.groupcity = allcity;
  },
  deactivated: function() {
    this.$destroy()
  },
  mounted() {
    this.hotcity = [{
        "szmbs":"1",
        "city_code": "BJS",
        "city_name": "北京",
        "airport_name": "所有机场",
        "airport_code": "BJS",
      },
      {
        "szmbs":"1",
        "city_code": "SHA",
        "city_name": "上海",
        "airport_name": "所有机场",
        "airport_code": "SHA"
      },

      {
        "szmbs":"1",
        "city_code": "CAN",
        "city_name": "广州",
        "airport_name": "广州白云机场",
        "airport_code": "CAN"
      },
      {
        "szmbs":"1",
        "city_code": "SZX",
        "city_name": "深圳",
        "airport_name": "深圳宝安机场",
        "airport_code": "SZX"
      },
      {
        "szmbs":"1",
        "city_code": "XIY",
        "city_name": "西安",
        "airport_name": "西安咸阳机场",
        "airport_code": "XIY"
      },
      {
        "szmbs":"1",
        "city_code": "CKG",
        "city_name": "重庆",
        "airport_name": "重庆江北机场",
        "airport_code": "CKG"
      },
      {
        "szmbs":"1",
        "city_code": "TAO",
        "city_name": "青岛",
        "airport_name": "青岛流亭机场",
        "airport_code": "TAO"
      },
      {
        "szmbs":"1",
        "city_code": "WUH",
        "city_name": "武汉",
        "airport_name": "武汉天河机场",
        "airport_code": "WUH"
      },
      {
        "szmbs":"1",
        "city_code": "CSX",
        "city_name": "长沙",
        "airport_name": "长沙黄花机场",
        "airport_code": "CSX"
      },
      {
        "szmbs":"1",
        "city_code": "NKG",
        "city_name": "南京",
        "airport_name": "南京禄口机场",
        "airport_code": "NKG"
      },
      {
        "szmbs":"1",
        "city_code": "XMN",
        "city_name": "厦门",
        "airport_name": "厦门高崎机场",
        "airport_code": "XMN"
      },
      {
        "szmbs":"1",
        "city_code": "KMG",
        "city_name": "昆明",
        "airport_name": "昆明长水机场",
        "airport_code": "KMG"
      },
      {
        "szmbs":"1",
        "city_code": "TSN",
        "city_name": "天津",
        "airport_name": "天津滨海机场",
        "airport_code": "TSN"
      },
      {
        "szmbs":"1",
        "city_code": "CGO",
        "city_name": "郑州",
        "airport_name": "郑州新郑机场",
        "airport_code": "CGO"
      },
      {
        "szmbs":"1",
        "city_code": "SYX",
        "city_name": "三亚",
        "airport_name": "三亚凤凰机场",
        "airport_code": "SYX"
      },
      {
        "szmbs":"1",
        "city_code": "HGH",
        "city_name": "杭州",
        "airport_name": "杭州萧山机场",
        "airport_code": "HGH"
      },
    ];
    this.isLoading = false;
  },

  components: {
    headTop,
    loading
  },
  computed: {
    sorthistorycity() {
      return this.cityHistory
    },
    sortgroupcity() {
      return this.groupcity
    },
    sorthotcity() {
      return this.hotcity
    },
    sortResultcity() {
      return this.resultCity
    }
  },

  methods: {
    focus() {
      this.show = true;
      console.log("聚焦")
    },
    search() {
      this.show = false;
      this.resultShow = true;
      this.resultCity = [];
      let seach = this.city;
      let allCity = this.groupcity;
      let resultCity = [];
      let maxLength = allCity.length;
      for (var i = 0; i < maxLength; i++) {
        for (var k = 0; k < allCity[i].city.length; k++) {
          if (seach == "") {
            this.resultShow = false;
            this.show = true;
            break;
          } else if (allCity[i].city[k].match.toUpperCase().indexOf(seach.replace(/\s+/g, "").toUpperCase()) > -1) {
            resultCity.push(allCity[i].city[k])
          }
        }
      }
      this.resultCity = resultCity;
    },
    checkcity(item) {
      let checkfrom = this.$route.query.id;
      let city = item;
      this.show = false;
      let history = getStore('cityHistory');
      if (history) {
        let checkrepeat = false;
        this.cityHistory = JSON.parse(history);
        // 去重
        this.cityHistory.forEach(item => {
          console.log(item)
          if (item.city_name == city.city_name) {
            checkrepeat = true;
          }
        })
        if (!checkrepeat) {
          if (this.cityHistory.length == 3) {
            this.cityHistory.pop();
            this.cityHistory.unshift(city);
          } else {
            this.cityHistory.unshift(city)
          }
        }
      } else {
        this.cityHistory.unshift(city)
      }
      setStore('cityHistory', this.cityHistory)
      if (checkfrom == 'start') {
        setStore('start', city)
      } else {
        setStore('end', city)
      }
      this.city = '';
      this.show = false;
      this.resultShow = false;
      this.$router.go(-1)
    },
  },
}

</script>
<style type="text/css" scoped>
.content {
  margin-top: 2.88rem;
}

.top {
  height: 1.707rem;
  line-height: 1.707rem;
  font-size: 0.373rem;
  margin: 0 auto;
  background-color: #f2f2f2;
  position: fixed;
  top: 1.173rem;
  width: 100%;
  text-align: center;
  z-index: 999;
}


.top input {
  background-color: #fff;
  color: #666;
  height: 1.067rem;
  width: 9.173rem;
  text-align: center;
  line-height: 1.067rem;
  background-image: url(../assets/img/city_search.png);
  background-position: 2.0rem center;
  background-repeat: no-repeat;
  background-size: 0.4rem 0.4rem;
}

.hot,
.history {
  background-color: #fff5dd;
}

.history p,
.hot p {
  height: 1.066667rem;
  line-height: 1.066667rem;
  font-size: 0.373333rem;
  color: #424242;
  padding-left: 0.533333rem;
}

.line {
  display: inline-block;
  width: 89%;
  height: 0.133333rem;
  border-top: 0.013333rem solid #ccc;
  margin-left: 0.16rem;
}

p.kong {
  background-color: #eee;
  height: 0.4rem;
}

.hot ul,
.history ul {
  text-align: center;
  padding: 0.266667rem 0.453333rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: -0.586667rem;
}

.historycity_li {}

.hotcity_li,
.historycity_li {
  width: 2.453333rem;
  height: 0.8rem;
  line-height: 0.8rem;
  color: #000;
  font-size: 0.373333rem;
  margin-right: 0.32rem;
  display: inline-block;
  /*border-radius: 0.133333rem;*/
  margin-top: 0.32rem;
  overflow: hidden;
  background:url(../assets/img/hot_btn.png)no-repeat;
  background-size: 100% auto;
}

.letter_classify_li {
  border-bottom: 0.013333rem solid #e4e4e4;
}

.city_title {
  font-weight: 500;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.48rem;
  color: #343434;
  padding-left: 0.533333rem;
  background-color: #eee;
}

.ellipsis {
  height: 1.36rem;
  line-height: 1.36rem;
  color: #000;
  font-size: 0.48rem;
  margin-left: 0.533333rem;
  border-bottom: 0.013333rem solid #e4e4e4;
}

.shade {
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  z-index: 1;
  top: 2.88rem;
  position: fixed;
}

.result {
  background: rgba(255, 255, 255, 1);
  width: 100%;
  z-index: 88;
  left: 0;
  top: 2.88rem;
  bottom: 0;
  position: fixed;
  overflow-y: scroll;
}

.resultLi {
  border-bottom: 1px solid #eee;
  height: 1.333333rem;
  line-height: 1.333333rem;
  text-align: center;
  color: #828282;
  font-size: 0.32rem;
}

.resultLi span:nth-of-type(1) {
  display: inline-block;
  color: #28648c;
  font-size: 0.426667rem;
  width: 2.666667rem;
}

</style>
