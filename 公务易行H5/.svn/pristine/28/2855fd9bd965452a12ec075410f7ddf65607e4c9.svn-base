<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content">
      <div class="top-tab">
        <div class="toptab" :class="{active:currentNavtab==idx}" v-for="(itemName,idx) in navTab" @click="switchTab(idx)">{{itemName}}</div>
      </div>
      <template v-if="people">
        <div class="card" :class="[{idcarderr:value.is_validate != 1},{check:value.check && isFromMy != 'my'}]" @click="check(index)" v-for="(value,index) in passengers" v-show="value.is_validate == (currentNavtab+1)">
          <p>{{value.pagType =='3'?value.passenger_ename:value.passenger_name}}</p>
          <p><span>公务卡</span><span>{{value.official_cardName}}</span></p>
          <p><span>{{value.pagType =='3'?'护照':'身份证'}}</span><span>{{value.pagType =='3'?value.passport_number:value.security_iden_num}}</span></p>
        </div>
      </template>
      <template v-else>
        <p class="err">{{tos}}</p>
      </template>
    </div>
    <button class="add" @click="add"><span class="add_logo"></span>添加乘机人</button>
  </div>
</template>
<script type="text/javascript">
import loading from './loading'
import headTop from './head'
import bankGroup from '../assets/bank.json'
import { Toast, MessageBox } from 'mint-ui'
import {
  getStore,
  setStore,
} from '../config/utils'
export default {
  data() {
    return {
      isLoading: true,
      isFromMy: '',
      title: '选择乘机人',
      navTab: ["已验证", "验证失败"],
      currentNavtab: 0,
      passengers: [],
      people: true,
      tos: '暂无验证成功的乘机人',
      trueHeight: ''
    }
  },
  activated: function() {
    this.trueHeight = getStore('trueHeight');
    let isFromMy = getStore('fromPassenger')
    if (isFromMy != 'my') {
      this.title = '选择乘机人'
    } else {
      this.title = '常用乘机人'
    }
    this.isFromMy = isFromMy;

    let postData = {
      data: {
        is_civil_servant: 1
      }
    };
    var token = getStore('token');
    this.$http.post(this.url + '/xxx/api/private/queryFrequentPassenger', postData, {
      headers: { "Authorization": token },
    }).then(function(res) {
      console.log(res)
      var data = res.body.data.data;
      var array = [];
      for (var i = data.length - 1; i >= 0; i--) {
        data[i].check = false;
        data[i]['pagType'] = data[i].identification_type;
        if (data[i].identification_type == '1') {
          var idcard = data[i].identification_num.toUpperCase().replace(/\s+/g, "");
          if (idcard.length == 18) {
            let matches_0 = idcard.substring(0, 6);
            let matches_1 = idcard.substring(6, 14);
            let matches_2 = idcard.substring(14);
            var newNum = matches_0 + ' ' + '********' + ' ' + matches_2;
          }
          data[i]["security_iden_num"] = newNum;
        }

        for (var k = bankGroup.length - 1; k >= 0; k--) {
          let banks = bankGroup[k].banks;
          for (let j = banks.length - 1; j >= 0; j--) {
            if (banks[j].KMark == data[i].official_card) {
              data[i].official_cardName = banks[j].KTitle;
              break;
            }
          }
        }
        if (isFromMy != 'my') {
          var selectedPassengers = JSON.parse(getStore('selectedPassengers')) ? JSON.parse(getStore('selectedPassengers')) : [];
          if (isFromMy == 'oneclick') {
            selectedPassengers = JSON.parse(getStore('oneclickPassengers')) ? JSON.parse(getStore('oneclickPassengers')) : [];
          }
          console.log(selectedPassengers)
          for (let j in selectedPassengers) {
            if (data[i].passenger_id == selectedPassengers[j].passenger_id) {
              data[i].check = true;
              break;
            }
          }
        }
        array.push(data[i]);
      }
      console.log(array)
      setStore('passengers', array);
      this.passengers = array ? array : '';
      this.selectedPassengers = selectedPassengers;
      this.switchTab(0);
      this.isLoading = false;
    }, function(err) {

    })
  },
  components: {
    loading,
    headTop
  },
  methods: {
    switchTab: function(index) {
      console.log(index)
      this.currentNavtab = index;
      this.people = true;
      if (this.passengers.length == 0) {
        if (index == 0) {
        console.log(12125)
          this.people = false;
          this.tos = '暂无验证成功的乘机人';
        } else if (index == 1) {
          this.people = false;
          this.tos = '暂无验证失败的乘机人'
        }
        return;
      }
      for (var i = this.passengers.length - 1; i >= 0; i--) {
        // this.passengers[i].is_validate
        if (index == 0) {
            this.people = false;
            this.tos = '暂无验证成功的乘机人';
          if (this.passengers[i].is_validate == 1) {
            this.people = true;
            this.tos = '';
            return;
          }
        } else if (index == 1) {
            this.people = false;
            this.tos = '暂无验证失败的乘机人';            
          if (this.passengers[i].is_validate == 2) {
            this.people = true;
            this.tos = '';
            return;
          }
        }
      }
    },
    check(index) {
      var passengers = this.passengers;
      console.log(passengers)
      if (this.isFromMy == 'my') {
        // 我的
        setStore('editPassenger', passengers[index])
        setStore('fromEdit', 'my')
        setStore('editFresh', true)
        this.$router.push({
          path: '/edit',
        })
        return;
      }
      // dingdan
      if (passengers[index].check == true) {
        return;
      }
      if (passengers[index].is_validate != 1) {
        setStore('editPassenger', passengers[index])
        setStore('editFresh', true)
        setStore('fromEdit', 'dingdan')
        this.$router.push({
          path: '/edit',
        })
        return;
      }
      passengers[index].check = !passengers[index].check;
      var selectedPassengers = this.selectedPassengers;
      console.log(selectedPassengers)
      if (passengers[index].check == true) {
        selectedPassengers.push(passengers[index])
      }
      if (selectedPassengers.length > 9) {
        Toast({
          message: '最多添加9位旅客',
          duration: 2000
        })
        return;
      }
      let cang = JSON.parse(getStore('check_cang'));
      if (cang) {
        var residue = cang.ticket;
        if (residue != '12') {
          if (selectedPassengers.length > residue) {
            Toast({
              message: '该航班最多可添加' + residue + '位旅客',
              duration: 2000
            })
            return;
          }
        }
      }

      this.passengers = passengers;
      if (this.isFromMy == 'oneclick') {
        setStore('oneclickPassengers', selectedPassengers);
      } else if (this.isFromMy == 'dingdan') {
        setStore('selectedPassengers', selectedPassengers);
      };
      console.log("selectedPassengers end")
      this.$router.go(-1)
    },
    add() {
      this.$router.push({
        path: '/verify',
      })
    }
  },
}

</script>
<style scoped>
.container {
  margin: 0 auto;
}

.top-tab {
  width: 100%;
  height: 1.306667rem;
  background: #fff;
  color: #666;
  font-size: 0.426667rem;
  line-height: 1.306667rem;
  z-index: 9998;
  display: flex;
  position: fixed;
  top: 1.173333rem;
  flex-direction: row;
}

.toptab {
  flex: 1;
  text-align: center;
}

.active {
  color: #e96b39;
  border-bottom: solid 0.08rem #E96B39;
}

.content {
  padding-top: 2.48rem;
  background-color: #f8ebc8;
  padding-bottom: 1.706667rem;
}

.card {
  height: 2.986667rem;
  width: 8.906667rem;
  background-image: url(../assets/img/pger_0.png);
  background-size: 9.44rem 2.986667rem;
  background-repeat: no-repeat;
  margin: 0 auto;
  margin-top: 0.266667rem;
  font-size: 0.426667rem;
  color: #000;
  padding-left: 0.533333rem;
}

.card p span:nth-of-type(1) {
  display: inline-block;
  width: 25%;
  color: #666;
}

.card p {
  font-size: 0.453333rem;
  height: 0.8rem;
  line-height: 0.8rem;
}

.card p:nth-of-type(1) {
  font-size: 0.533333rem;
  padding-top: 0.266667rem;
}

.card.idcarderr {
  background-image: url(../assets/img/pger_2.png);
  background-size: 9.44rem 2.986667rem;
  color: #999;
}

.card.idcarderr p:nth-of-type(1) {
  color: #999;
}

.card.check {
  background-image: url(../assets/img/pger_1.png);
  background-size: 9.44rem 2.986667rem;
  color: #999;
}

.card.check p span:nth-of-type(1) {
  color: #999;
}

.add {
  background-image: url(../assets/img/result_foot.png);
  background-repeat: no-repeat;
  background-size: cover;
  height: 1.706667rem;
  line-height: 1.706667rem;
  font-size: 0.426667rem;
  position: fixed;
  bottom: 0;
  text-align: center;
  color: #fff;
  border: 0;
  width: 100%;
}

.add * {
  vertical-align: middle;
}

.add_logo {
  background: url(../assets/img/add_logo.png)no-repeat;
  background-size: 0.426667rem 0.426667rem;
  width: 0.426667rem;
  height: 0.426667rem;
  display: inline-block;
  margin-right: 0.266667rem;
}

.err {
  color: #666;
  font-size: 0.4rem;
  margin: 0 auto;
  padding: 0;
  text-align: center;
  margin-top: 2.666667rem;
}

</style>
