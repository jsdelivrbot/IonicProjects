<template>
  <div class="container">
    <head-top title="日期选择" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <template v-else>
      <div class="content">
        <ul class="row week">
          <li>日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
        </ul>
        <table border="0" cellspacing="0" cellpadding="0" v-for="(dateArray,dateIndex) in totalArray" :key="dateIndex" class="anchor">
          <thead>{{dateArray.year_month.year}}年{{dateArray.year_month.month}}月</thead>
          <tbody>
            <tr v-for="(week,weekIndex) in dateArray" :key="weekIndex" class="row">
              <td v-for="(value,index) in week" class="col day" :class="{disabled:value.disabled,checked:value.checked,three:value.three}" @click="check(dateArray,dateIndex,weekIndex,index)">
                <p>{{value.day}}</p>
                <p>{{value.lunar}}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>
<script>
import headTop from './head'
import loading from './loading'
import {
  getCNDate
} from '../assets/getCNDate.js'
import {
  getStore,
  setStore,
  removeStore,
  getFromTodayDays
} from '../config/utils'

export default {
  data() {
    return {
      isLoading: true,
      year_month: [],
      totalArray: [],
      dateArray: [],
      scrollIndex: 0
    }
  },
  mounted: function() {

  },
  created: function() {
    console.log(1)
  },
  activated: function() {
    console.log(2)
    let date = new Date();
    let thisyear = date.getFullYear();
    let thismonth = date.getMonth();
    let thisday = date.getDate();
    let oldIndate = JSON.parse(getStore('indate'));
    console.log(JSON.parse(getStore('indate')))
    let totalArray = [];
    let validity = getStore('validity');
    let scrollIndex = 0;
    this.scrollIndex = 0;
    console.log(validity)
    for (let i = 0; i < 13; i++) {
      let newDate = new Date(thisyear, thismonth + i, 1);
      totalArray[i] = initdata(this, newDate.getFullYear(), newDate.getMonth() + 1, i);
      totalArray[i].year_month = {
        'year': newDate.getFullYear(),
        'month': (newDate.getMonth() + 1) < 10 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1)
      };
    }
    console.log(totalArray)
    removeStore('validity');
    // 预订的日期
    let days = thisday + getFirstday(thisyear, thismonth + 1);
    this.totalArray = orderabledate(days, totalArray);
    this.$nextTick(function() {
      //对DOM的操作放在这
      let index = this.scrollIndex;
      let count = 0;
      let interval = setInterval(() => {
        if (count > 1000) {
          clearInterval(interval);
        }
        count++;
        var anchor = document.querySelectorAll('.anchor');
        console.log(anchor)
        if (anchor.length > 0) {
          var top = document.documentElement.scrollTop || document.body.scrollTop;
          if (document.documentElement.scrollTop) {
            document.documentElement.scrollTop = anchor[index].offsetTop - '100';
          } else {
            document.body.scrollTop = anchor[index].offsetTop - '100';
          }
          document.documentElement.scrollTop = anchor[index].offsetTop - '100';
          document.body.scrollTop = anchor[index].offsetTop - '100';
          clearInterval(interval);
        }
      }, 0);
    })
    this.isLoading = false;



    function initdata(that, year, month, index) {
      //日期初始化

      //月份总天数
      var total = getdaysInmonth(year, month);
      //第一天下标
      var day_index_first = getFirstday(year, month);
      var checkday = 0;

      if (validity == 'true') {

        if (oldIndate.year == year && oldIndate.month == month) {
          that.scrollIndex = index;
          checkday = oldIndate.day;
          console.log(oldIndate)
          console.log(checkday)

          return setcalender(total, day_index_first, month, year, index, validity, checkday);
        }
      }
      return setcalender(total, day_index_first, month, year, index, validity, checkday);
    }

    function setcalender(days, index_first, month, year, index, validity, checkday) {
      //往日历中填入日期
      console.log(checkday)
      var dateArray = new Array();
      var a = 1;
      for (var j = 0; j < 6; j++) {
        let weekArray = [];
        for (var i = 0; i < 7; i++) {
          if (j == 0 && i < index_first) {
            weekArray[i] = {
              day: '',
              lunar: '',
              checked: false,
              disabled: true
            };
          } else {
            if (a <= days) {
              let fromToday = getFromTodayDays(year, month - 1, a);
              weekArray[i] = {
                day: a,
                lunar: getCNDate(year, month, a).slice(-2),
                checked: false,
                disabled: false,
                fromToday: fromToday
              };
              if (index == 0) {
                if (fromToday == 0) {
                  weekArray[i].lunar = '今天'
                } else if (fromToday == 1) {
                  weekArray[i].lunar = '明天'
                } else if (fromToday == 2) {
                  weekArray[i].lunar = '后天'
                }
              }
              if (validity == "true") {
                if (checkday == a) {
                  console.log("diyici")
                  console.log(weekArray)
                  weekArray[i].checked = true;
                  weekArray[i].lunar = '出发'
                }
              } else if (fromToday == 1) {
                console.log("dierci")
                weekArray[i].checked = true;
                weekArray[i].lunar = '出发';
              }
              a++;
            } else {
              if (j == 5 && i == 0) {
                break;
              }
              weekArray[i] = {
                day: '',
                lunar: '',
                checked: false,
                disabled: true
              };
              a = days + 1;
            }
          }
        }
        dateArray[j] = weekArray
      }
      // console.log(dateArray)
      return dateArray;
    }

    function orderabledate(days, totalArray) {
      //不能预订的日期
      console.log("投票")
      console.log(totalArray[0][5][0])
      let a = 1;
      let k = 0;
      for (var j = 0; j < 6; j++) {
        for (var i = 0; i < 7; i++, a++) {
          if (a < days) {
            totalArray[0][j][i].disabled = true;
          }
          if (totalArray[0][j][i]) {
            if (totalArray[0][j][i].lunar == '今天' || totalArray[0][j][i].lunar == '明天' || totalArray[0][j][i].lunar == '后天') {
              let arr = totalArray[0][j][i];
              arr.three = true
            }
          }

        }
      }
      console.log(totalArray)
      return totalArray;
    }

    function getdaysInmonth(year, month) {
      //算某个月的总天数
      month = parseInt(month, 10);
      var date = new Date(year, month, 0);
      return date.getDate();
    }

    function getFirstday(year, month) {
      //算某个月的第一天是星期几
      month = month - 1;
      var date = new Date(year, month, 1);
      return date.getDay();
    }
  },
  deactivated: function() {
    console.log(4)

  },

  components: {
    headTop,
    loading
  },
  computed: {

  },

  methods: {
    check(dateArray, dateIndex, weekIndex, index) {
      if (dateArray[weekIndex][index].disabled || dateArray[weekIndex][index].checked) {
        return;
      }
      console.log(dateIndex + '-' + weekIndex + '-' + index)
      let day = dateArray[weekIndex][index].day;
      let newIndate = {
        // 'dateIndex': dateIndex,
        // 'weekIndex': weekIndex,
        // 'index': index,
        // 'lunar': dateArray[weekIndex][index].lunar,
        'year': dateArray.year_month.year,
        'month': dateArray.year_month.month,
        'day': day < 10 ? '0' + day : day,
        'fromToday': dateArray[weekIndex][index].fromToday
      };
      let oldIndate = JSON.parse(getStore('indate'));
      // if (oldIndate && oldIndate !== newIndate) {
      //   this.totalArray[oldIndate.dateIndex][oldIndate.weekIndex][oldIndate.index].checked = false;
      //   this.totalArray[oldIndate.dateIndex][oldIndate.weekIndex][oldIndate.index].lunar = oldIndate.lunar;
      //   dateArray[weekIndex][index].checked = true;
      //   dateArray[weekIndex][index].lunar = '出发';
      // } else {
      dateArray[weekIndex][index].checked = true;
      dateArray[weekIndex][index].lunar = '出发';
      // }
      this.dateArray = dateArray;
      setStore('indate', newIndate)
      setStore('dateChange', true)
      this.$router.go(-1)
    }


  },
}

</script>
<style scoped>

.content {
  width: 100%;
  padding-top: 1.333rem;
  margin-top: 1.173333rem;
}
.week {
  width: 100%;
  position: fixed;
  background-color: #f8ebc8;
  justify-content: space-around;
  top: 1.173333rem;
}

.week li {
  height: 1.333rem;
  line-height: 1.333rem;
  font-size: 0.427rem;
  color: #e96b39;
}

table {
  width: 100%;
  text-align: center;
}

thead {
  width: 9.2rem;
  height: 0.827rem;
  line-height: 0.827rem;
  font-size: 0.453333rem;
  font-weight: 500;
  color: #e94b31;
  background-color: #fff;
  text-align: left;
  padding-left: 0.8rem;
  display: inline-block;
}

tbody {
  display: inline-block;
}

td {
  font-size: 0.587rem;
  color: #333;
  width: 1.333rem;
  text-align: center;
  height: 1.28rem;
  border-radius: 0.133rem;
}

td.day {
  justify-content: center;
}

.day p:nth-of-type(2) {
  color: #666;
  font-size: 0.28rem;
}

td.disabled {
  color: #999;
}

td.disabled p:nth-of-type(2) {
  color: #999;
}

td.checked {
  color: #fff;
  background-color: #E96B39;
}

td.three p:nth-of-type(2) {
  color: #e13426;
}

td.checked p:nth-of-type(2) {
  color: #fff;
}

</style>
