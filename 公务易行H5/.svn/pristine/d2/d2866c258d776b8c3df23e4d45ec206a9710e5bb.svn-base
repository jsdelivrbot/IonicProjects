<template>
  <div class="container">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content">
      <div class="top">
        <input type="text" placeholder="请输入航司名称或代码" v-model="airline" @input="search(airline)">
      </div>
      <ul style="margin:2.0rem 0;margin-top: 3.173333rem;">
        <li v-for="(value,index) in airlines" class="list" :class="{check:value.check}" @click="aircheck(index)">
          <img class="logo" :src="value.imgurl" :onerror="errorImg01"></img>
          <span>{{value.airline_name}}{{value.airline_code}}</span></li>
      </ul>
      <div class="foot">
        <button @click="sure">保&nbsp;存</button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import loading from './loading'
import headTop from './head'
import Airlines from '../assets/Airlines.json'
import {
  getStore,
  setStore,
  checkSts
} from '../config/utils'
export default {
  data() {
    return {
      title: '航司选择',
      isLoading: true,
      airlines: [],
      airline: '',
      errorImg01: 'this.src="' + require('../assets/img/airline_logo/CA.png') + '"',
    }
  },
  activated: function() {
    var that = this;
    console.log(Airlines[0])
    for (var i = 0;i < Airlines.length; i++) {
      Airlines[i].imgurl = '../assets/img/airline_logo/' + Airlines[i].airline_code + '.png';
    }
    that.airlines = Airlines;
      that.isLoading = false;
    // var postData = { data: {} };
    // var airlines = JSON.parse(getStore('airlines'));
    // if (airlines) {
    //   that.isLoading = false;
    //   that.airlines = airlines;
    //   return;
    // }
    // that.$http.post('url/xxx/api/public/getAirline', postData).then(function(res) {
    //   console.log(res)
    //   if (checkSts(res, '航司获取失败', this)) {
    //     return;
    //   }
    //   let data = res.body.data;
    //   for (var i = data.length - 1; i >= 0; i--) {
    //     data[i].imgurl = '../assets/img/airline_logo/' + data[i].airline_code + '.png';
    //     data[i].check = false;
    //   }
    //   setStore('airlines', data);
    //   that.airlines = data;
    //   console.log(data)
    //   that.isLoading = false;
    // }, function(err) {

    // })
  },
  components: {
    headTop,
    loading
  },
  methods: {
    aircheck(index) {
      console.log(this.airlines)
      this.airlines[index].check = !this.airlines[index].check;
    },
    search(airline) {
      let oldAirlines = JSON.parse(getStore('airlines'));
      let resultAir = [];
      let maxLength = oldAirlines.length;
      console.log(airline == '')
      for (var i = 0; i < maxLength; i++) {
        if (airline == "") {
          console.log(1)
          this.airlines = oldAirlines;
          return;
        } else if (oldAirlines[i].airline_name.toUpperCase().indexOf(airline.replace(/\s+/g, "").toUpperCase()) > -1 || oldAirlines[i].airline_code.toUpperCase().indexOf(airline.replace(/\s+/g, "").toUpperCase()) > -1) {
          resultAir.push(oldAirlines[i])
        }
      }
      this.airlines = resultAir;
    },
    sure() {
      let checkair = [];
      for (var i = this.airlines.length - 1; i >= 0; i--) {
        if (this.airlines[i].check == true) {
          checkair.push(this.airlines[i])
        }
      }
      setStore('checkAirline',checkair)
      console.log(checkair)
      this.$router.go(-1)
    }
  }
}

</script>
<style scoped>
@import '../style/common.css';
.top {
  height: 2.0rem;
  line-height: 2.0rem;
  font-size: 0.8rem;
  padding-left: 0.4rem;
  background-color: #74B7F5;
  position: fixed;
  top: 1.173333rem;
}

.top input::-webkit-input-placeholder {
  color: #ddd;
}

.top input {
  background-color: #74B7F5;
  color: #fff;
}

.list {
  height: 1.173333rem;
  line-height: 1.173333rem;
  border-bottom: 0.013333rem solid #eee;
}

.list * {
  vertical-align: middle;
}

.list.check {
  background-image: url(../assets/img/actionsheet_check.png);
  background-repeat: no-repeat;
  background-size: 0.96rem 0.96rem;
  background-position: 7.866667rem center;
}

.logo {
  width: 0.8rem;
  height: 0.8rem;
  margin: 0 0.32rem;
}

.list span {
  font-size: 0.533333rem;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}

.foot {
  position: fixed;
  padding: 0 0.613333rem;
  bottom: 0;
  height: 2.0rem;
  background-color: #fff;
}

.foot button {
  background: url(../assets/img/airline_btn.png)no-repeat 0 0.066667rem;
  background-size: 8.773333rem 1.44rem;
  width: 8.773333rem;
  height: 1.44rem;
  border: 0;
  color: #fff;
  font-size: 0.586667rem;
  margin-top: 0.266667rem;
}

</style>
