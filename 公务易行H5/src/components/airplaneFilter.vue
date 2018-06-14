<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <div class="content">
      <div class="tag_top" v-show="tags !=''">
        <span v-for="(value,index) in tags" class="tag" @click="delet(index,value)">{{value.name}}</span>
      </div>
      <p class="stop" @click="codeChange(0)"><span>仅看直飞</span><span class="icon_more" :class="{check:stopCode}"></span></p>
      <p class="stop" :class="{check:shareCode}" @click="codeChange(1)"><span>展示共享航班</span><span class="icon_more" :class="{check:shareCode}"></span></p>
      <div class="main row">
        <ul class="left">
          <li v-for="(value,index) in titles" @click="checkTitle(index)" class="list" :class="{check:value.check,redPoint:redCodes[index]}" v-show="value.showCode">{{value.name}}</li>
        </ul>
        <template>
          <!-- 起飞时间 -->
          <div v-if="titles[0].check" class="right">
            <ul>
              <li v-for="(hour,index) in hours" @click="checkAir(0,index,'hours')" class="list" :class="{check:hour.check}">{{hour.name}}<span class="icon_more" :class="{check:hour.check}"></span></li>
            </ul>
          </div>
          <!-- 起飞机场 -->
          <div v-else-if="titles[1].check" class="right">
            <ul>
              <li v-for="(airport,index) in start_airportBoxs" @click="checkAir(1,index,'start_airportBoxs')" class="list" :class="{check:airport.check}">{{airport.name}}<span class="icon_more" :class="{check:airport.check}"></span></li>
            </ul>
          </div>
          <!-- 降落机场 -->
          <div v-else-if="titles[2].check" class="right">
            <ul>
              <li v-for="(airport,index) in end_airportBoxs" @click="checkAir(2,index,'end_airportBoxs')" class="list" :class="{check:airport.check}">{{airport.name}}<span class="icon_more" :class="{check:airport.check}"></span></li>
            </ul>
          </div>
          <!-- 航司 -->
          <div v-else-if="titles[3].check" class="right">
            <ul>
              <li v-for="(airline,index) in airlineBoxs" @click="checkAir(3,index,'airlineBoxs')" class="list" :class="{check:airline.check}">{{airline.name}}<span class="icon_more" :class="{check:airline.check}"></span></li>
            </ul>
          </div>
        </template>
      </div>
      <!--       <div>
  <p class="title">舱位类型</p>
  <ul>
    <li v-for="(freight,index) in freights" @click="checkFreight(index)" class="list" :class="{check:freight.check}">{{freight.name}}</li>
  </ul>
</div> -->
    </div>
    <div class="foot row">
      <div @click="reset">重置</div>
      <div @click="sure">应用</div>
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
  removeStore
} from '../config/utils'
export default {
  data() {
    return {
      title: '筛选条件',
      value: false,
      firstValue: 0,
      secondValue: 24,
      maxvalue: 24,
      minvalue: 0,
      stopCode: false,
      shareCode: false,
      redCodes: [false, false, false],
      start_airportBoxs: [],
      end_airportBoxs: [],
      airlineBoxs: [],
      // freights: [{ name: '不限', check: true }, { name: '经济舱', check: false }, { name: '公务舱/头等舱', check: false }],
      hours: [{ name: '不限', check: true }, { name: '00:00-06:00', check: false }, { name: '06:00-12:00', check: false }, { name: '12:00-18:00', check: false }, { name: '18:00-24:00', check: false }],
      titles: [{ name: '起飞时间', check: true, showCode: true }, { name: '起飞机场', check: false, showCode: false }, { name: '降落机场', check: false, showCode: false }, { name: '航空公司', check: false, showCode: true }],
      tags: [],
      trueHeight:''
    }
  },
  activated: function() {
    this.trueHeight = getStore('trueHeight');
    var hang = JSON.parse(getStore('hang_all'));
    let start_airportBoxs = JSON.parse(getStore('start_airportBoxs'));
    let end_airportBoxs = JSON.parse(getStore('end_airportBoxs'));
    for (var i = this.titles.length - 1; i >= 0; i--) {
        this.titles[i].check = false;
      }
    this.titles[0].check = true;
    this.titles[1].showCode = false;
    this.titles[2].showCode = false;
    if (start_airportBoxs.length > 0) {
      this.titles[1].showCode = true;
    }
    if (end_airportBoxs.length > 0) {
      this.titles[2].showCode = true;
    }
    this.start_airportBoxs = start_airportBoxs;
    this.end_airportBoxs = end_airportBoxs;
    this.airlineBoxs = JSON.parse(getStore('airlineBoxs'));
    console.log(getStore('airFilterFresh') == 'true')
    if(getStore('airFilterFresh') == 'true'){
      this.reset();
      removeStore('airFilterFresh')
    }
    setStore('isAirfilter', false)
    setStore("refresh", false);
  },
  components: {
    headTop
  },
  methods: {
    delet(index, value) {
      this.tags.splice(index, 1)
      console.log(value)
      this.checkAir(0, value.tagFromIndex, value.tagFrom)
    },
    // left
    checkTitle(index) {
      for (var i = this.titles.length - 1; i >= 0; i--) {
        this.titles[i].check = false;
      }
      this.titles[index].check = true;
    },
    codeChange(index){
      if(index == 0){
        this.stopCode = !this.stopCode
      }else{
        this.shareCode = !this.shareCode
      };
      this.filter();
    },
    checkAir(code, index, name) {
      if (index == 0) {
        for (var i = this[name].length - 1; i >= 0; i--) {
          this[name][i].check = false;
        }
        this[name][0].check = true;
        this.redCodes[code] = false;
        for (var j = this.tags.length - 1; j >= 0; j--) {
          if (this.tags[j].name == this[name][index].name) {
            this.tags.splice(j, 1)
          }
        }
      } else {
        this[name][0].check = false;
        this[name][index].check = !this[name][index].check;
        this.redCodes[code] = true;
        if (this[name][index].check) {
          this.tags.push({
            name: this[name][index].name,
            tagFrom: name,
            tagFromIndex: index
          })
        } else {
          for (var j = this.tags.length - 1; j >= 0; j--) {
            if (this.tags[j].name == this[name][index].name) {
              this.tags.splice(j, 1)
            }
          }
        }
        for (var i = this[name].length - 1; i >= 0; i--) {
          if (this[name][i].check == true) {
            return;
          }
        }
        this.redCodes[code] = false;
        this[name][0].check = true;
      }
      console.log(this.tags)
    },
    reset() {
      let start = this.start_airportBoxs,
        end = this.end_airportBoxs,
        hours = this.hours,
        airlines = this.airlineBoxs;
      for (var j = 0; j < airlines.length; j++) {
        this.airlineBoxs[j].check = false;
      };
      this.airlineBoxs[0].check = true;
      for (var i = 0; i < hours.length; i++) {
        this.hours[i].check = false;
      }
      this.hours[0].check = true;
      for (var i = 0; i < start.length; i++) {
        this.start_airportBoxs[i].check = false;
      }
      for (var i = 0; i < end.length; i++) {
        this.end_airportBoxs[i].check = false;
      }
      if (start.length > 0) {
        this.start_airportBoxs[0].check = true;
      }
      if (end.length > 0) {
        this.end_airportBoxs[0].check = true;
      }
      this.stopCode = false;
      this.shareCode = false;
      this.tags = [];
      setStore('start_airportBoxs', this.start_airportBoxs)
      setStore('end_airportBoxs', this.end_airportBoxs)
      setStore('airlineBoxs', this.airlineBoxs)
    },
    // 时间换算
    hourTominute(hour) {
      let newhour = hour.split(':');
      return parseInt(newhour[0]) * 60 + parseInt(newhour[1])
    },
    sure() {
      let newarr5 = this.newarr5;
      setStore('start_airportBoxs', this.start_airportBoxs)
      setStore('end_airportBoxs', this.end_airportBoxs)
      setStore('airlineBoxs', this.airlineBoxs)
      setStore('airFilter', newarr5)
      setStore('isAirfilter', true)
      this.$router.go(-1)
      console.log(newarr5)
    },
    // 实时筛选
    filter() {
      var hang = JSON.parse(getStore('hang_all'));
      let start = this.start_airportBoxs,
        end = this.end_airportBoxs,
        hours = this.hours,
        airlines = this.airlineBoxs;
      let newarr0 = [];
      if (this.shareCode) {
        for (var i = 0; i< hang.length; i++) {
          hang[i].share = true;
        }
        newarr0 = hang;
      }else{
        for (var i = 0; i< hang.length; i++) {
          if(hang[i].share == true){
            newarr0.push(hang[i])
          }
        }
      }
      let newarr1 = [];
      if (this.stopCode) {
        for (var i = 0; i< newarr0.length; i++) {
          if (newarr0[i].sto != 1) {
            newarr1.push(newarr0[i])
          }
        }
      }
      if (newarr1.length == 0) {
        newarr1 = newarr0;
      }
      console.log(newarr1)
      let newarr2 = [];
      for (var j = 1; j < hours.length; j++) {
        if (hours[j].check == true) {
          for (var i = 0; i < newarr1.length; i++) {
            if (this.hourTominute(newarr1[i].det) <= parseInt(j * 360) && this.hourTominute(newarr1[i].det) >= (parseInt(j * 360 - 360))) {
              newarr2.push(newarr1[i]);
            }
          }
        }
      }

      if (hours[0].check == true) {
        newarr2 = newarr1;
      } else {
        if (newarr2.length == 0) {
          this.title = '筛选共0个结果';
          Toast({
            message: "未查询到航班,请重新筛选1",
            duration: 1000
          });
          return;
        }
      }
      // 航司
      console.log(newarr2)

      let newarr3 = [];
      for (var j = 1; j < airlines.length; j++) {
        if (airlines[j].check == true) {
          for (var k = 0; k < newarr2.length; k++) {
            if (newarr2[k].airlineCode == airlines[j].airlineCode) {
              newarr3.push(newarr2[k])
            }
          }
        }
      }
      if (airlines[0].check == true) {
        newarr3 = newarr2;
      } else {
        if (newarr3.length == 0) {
          this.title = '筛选共0个结果';
          Toast({
            message: "未查询到航班,请重新筛选2",
            duration: 1000
          });
          return;
        }
      }
      console.log(newarr3)
      // 机场 arc_code
      let newarr4 = [];
      if (start.length > 0) {
        for (var i = 1; i < start.length; i++) {
          if (start[i].check == true) {
            for (var k = 0; k < newarr3.length; k++) {
              if (start[i].airportCode == newarr3[k].dpc_code) {
                newarr4.push(newarr3[k])
              }
            }
          }
        }
        if (newarr4.length == 0) {
          if (start[0].check == true) {
            newarr4 = newarr3;
          } else {
            this.title = '筛选共0个结果';
            Toast({
              message: "未查询到航班,请重新筛选3",
              duration: 1000
            });
            return;
          }
        }
      } else {
        newarr4 = newarr3;
      }

      console.log(newarr4)

      let newarr5 = [];
      if (end.length > 0) {
        for (var i = 1; i < end.length; i++) {
          if (end[i].check == true) {
            for (var k = 0; k < newarr4.length; k++) {
              if (end[i].airportCode == newarr4[k].arc_code) {
                newarr5.push(newarr4[k])
              }
            }
          }
        }
        if (newarr5.length == 0) {
          if (end[0].check == true) {
            newarr5 = newarr4;
          } else {
            this.title = '筛选共0个结果';
            Toast({
              message: "未查询到航班,请重新筛选4",
              duration: 1000
            });
            return;
          }
        }
      } else {
        newarr5 = newarr4;
      }
      this.title = '筛选共' + newarr5.length + '个结果';
      this.newarr5 = newarr5;
    }
  },
  watch: {
    tags: function() {
      console.log(1)
      this.filter();
    }
  }
}

</script>
<style scoped>
.content {
  background-color: #fff;
  margin-bottom: 1.173333rem;
  margin-top: 1.173333rem;
}

.tag_top {
  background-color: #f2f2f2;
  padding: 0.266667rem 0.533333rem;
}

.tag {
  display: inline-block;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.32rem;
  color: #333;
  border-radius: 0.133333rem;
  border-color: #eee;
  background-color: #fff;
  padding: 0 0.8rem 0 0.266667rem;
  margin-right: 0.32rem;
  margin-top: 0.133333rem;
  background-image: url(../assets/img/clear_button.png);
  background-size: 0.8rem 0.8rem;
  background-repeat: no-repeat;
  background-position: right center;
}

.stop {
  height: 1.493333rem;
  line-height: 1.493333rem;
  font-size: 0.373333rem;
  color: #333;
  padding-left: 0.533333rem;
  background-color: #fff;
  padding-right: 0.8rem;
  border-bottom: 0.026667rem solid #e6e6e6;
  position: relative;
}
.icon_more{
  background-image: url(../assets/img/box_kong.png);
  background-repeat: no-repeat;
  background-size: 0.693333rem 0.693333rem;
  background-position: center;
  position: absolute;
  width: 0.693333rem;
  height: 0.693333rem;
  display: inline-block;
  right: 0.533333rem;
  top: 0.4rem;
  bottom: 0.4rem;
}
.icon_more.check{
  background-image: url(../assets/img/box_check.png);
}
.main {
  justify-content: initial;
  width: 100%;
  min-height: 12.533333rem;
}

.main .left {
  width: 28%;
  font-size: 0.373333rem;
  color: #999;
  background-color: #f8ebc8;
}

.main .left li {
  height: 1.493333rem;
  line-height: 1.493333rem;

  text-align: center;
  border-bottom: 0.026667rem solid #e6e6e6;
}

.main .left li.check {
  color: #333;
  background-color: #fff;
}

.main .right {
  width: 65%;
  padding-left: 7%;
  overflow-y: scroll;
}

.main .right li {
  border-bottom: 0.026667rem solid #e6e6e6;
  font-size: 0.373333rem;
  color: #333;
  height: 1.493333rem;
  line-height: 1.493333rem;
  position: relative;
}


.main .right li.check {
  color: #e96b39;
}

.foot {
  position: fixed;
  bottom: 0;
  z-index: 99;
  width: 100%;
  background-image: url(../assets/img/result_foot.png);
  background-repeat: no-repeat;
  background-size: 100% auto;
  height: 1.306667rem;
}

.foot div {
  font-size: 0.533333rem;
  color: #fff;
  height: 1.306667rem;
  line-height: 1.306667rem;
  width: 50%;
  text-align: center;
  border: 0;
  display: inline-block;
}

</style>
