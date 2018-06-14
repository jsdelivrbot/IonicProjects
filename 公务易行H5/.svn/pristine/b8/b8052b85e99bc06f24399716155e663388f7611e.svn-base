<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content" v-else>
      <mt-loadmore :top-method="loadTop" ref="loadmore">
      <div class="top">
        <p class="num">{{total}}</p>
        <p class="covert" @click="convert()">积分商城</p>
      </div>
      <ul class="btn row">
        <li :class="{check:value.check}" @click="check_li(index)" v-for="(value,index) in btn_li">{{value.name}}</li>
      </ul>
      <div class="main">
        <template v-if="lists.length>0">
          <div v-for="value in lists" class="row list" :class="{remark:value.remark,pay:value.pay}">
            <div class="col words">
              <p>{{value.source}}</p>
              <p>{{value.date}}</p>
            </div>
            <div class="mark">{{value.point}}</div>
          </div>
        </template>
        <template v-else>
          <p class="none">暂无记录</p>
        </template>
      </div>
    </mt-loadmore>
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
  checkInput
} from '../config/utils'
export default {
  data() {
    return {
      isLoading: true,
      title: '积分明细',
      name: '',
      trueHeight: '',
      btn_li: [{ check: true, name: '全部' }, { check: false, name: '获取' }, { check: false, name: '兑换' }],
      total: '0',
      lists: []
    }
  },
  activated: function() {
    let that = this;
    that.trueHeight = getStore('trueHeight');
    that.name = '';
    that.checkcode = false;
    that.isLoading = false;
    let postData = { "data": {} };
    let token = getStore('token');
    that.$http.post(that.url + '/xxx/api/private/queryPointDetailBymember', postData, {
      headers: { "Authorization": token }
    }).then(function(res) {
      console.log(res)
      if (res.body.sts == 1) {
        let data = res.body.data.pointDetail;
        that.total = res.body.data.totalpoints;
        let shop_arr = [],
          generate_arr = [];
        if (data.length == 0) {
          that.generate_arr = [];
          that.shop_arr = [];
          that.total_arr = [];
          that.lists = [];
          return;
        }
        for (let i = 0; i < data.length; i++) {
          if (data[i].generate_point > 0) {
            generate_arr.push({
              "source": data[i].point_source,
              "date": data[i].generate_point_time,
              "point": '+' + data[i].generate_point,
              "remark": data[i].point_source.indexOf('保险') > -1 ? true : false,
              "pay":data[i].point_source.indexOf('支付成功') > -1 ? true : false
            })
          } else if (data[i].shop_amount > 0) {
            shop_arr.push({
              "source": data[i].shop_source,
              "date": data[i].shop_point_time,
              "point": '-' + data[i].shop_amount,
              "remark": false,
              "pay":data[i].point_source.indexOf('支付成功') > -1 ? true : false
            })
          }
        }
        that.generate_arr = generate_arr;
        that.shop_arr = shop_arr;
        that.total_arr = generate_arr.concat(shop_arr);
        that.lists = generate_arr.concat(shop_arr);
      }
    }, function(err) {

    })
  },
  components: {
    headTop,
    loading
  },
  methods: {
    loadTop() {
      this.$refs.loadmore.onTopLoaded();
    },
    check_li(index) {
      for (var i = this.btn_li.length - 1; i >= 0; i--) {
        this.btn_li[i].check = false;
      }
      this.btn_li[index].check = true;
      if (index == 0) {
        this.lists = this.total_arr;
      } else if (index == 1) {
        this.lists = this.generate_arr;
      } else if (index == 2) {
        this.lists = this.shop_arr;
      }
    },
    toexplain() {
      this.$router.push({
        path: '/explain'
      })
    },
    convert() {
      this.$router.push({
        path:'/store'
      })      
    }
  },
}

</script>
<style scoped>
.content {
  background: #f2f2f2;
  margin-top: 1.173333rem;
}

.top {
  position: relative;
  color: #e94b31;
  font-size: 0.533333rem;
  text-align: center;
  background: url(../assets/img/integral_bg.png)no-repeat;
  background-size: 100% auto;
  height: 4.106667rem;
  padding-top: 0.533333rem;
}

.explain {
  color: #fff;
  font-size: 0.373333rem;
  padding-left: 0.64rem;
  background: url(../assets/img/explain.png)no-repeat left center;
  background-size: 0.373333rem 0.373333rem;
  position: absolute;
  right: 0.533333rem;
  top: 0.266667rem;
}

.num {
  background: url(../assets/img/circle.png)no-repeat center;
  background-size: 100% auto;
  width: 2.346667rem;
  margin: 0 auto;
  margin-bottom: 0.533333rem;
  height: 2.346667rem;
  line-height: 2.346667rem;
}

.covert {
  font-size: 0.373333rem;
  background: url(../assets/img/covert.png)no-repeat center;
  background-size: 2.4rem 0.8rem;
  text-align: center;
  height: 0.8rem;
  line-height: 0.8rem;
}

.btn {
  line-height: 1.333333rem;
  height: 1.333333rem;
  margin: 0.32rem 0;
  justify-content: initial;
}

.btn li {
  flex: 1;
  text-align: center;
  font-size: 0.373333rem;
  color: #666;
  background-color: #fff;
}

.btn li.check {
  color: #333;
  background-image: url(../assets/img/btn_on.png);
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: bottom;
}

.main {
  overflow-y: scroll;
  height: 9.866667rem;
  margin: 0 auto;
}

.list {
  background: url(../assets/img/recommend.png)no-repeat;
  background-size: 9.68rem 1.973333rem;
  height: 1.973333rem;
  width: 9.68rem;
  margin: 0 auto;
  margin-bottom: 0.32rem;
}

.list .words {
  justify-content: center;
  color: #333;
  font-size: 0.373333rem;
  margin-left: 1.493333rem;
}

.list .words p:nth-of-type(2) {
  color: #666;
  margin-top: 0.266667rem;
}

.list .mark {
  font-size: 0.533333rem;
  color: #e94b31;
  margin-right: 0.533333rem;
  line-height: 1.973333rem;
}

.list.remark {
  background: url(../assets/img/insurance.png)no-repeat;
  background-size: 9.68rem 1.973333rem;
}
.list.pay{
  background: url(../assets/img/itgra_pay.png)no-repeat;
  background-size: 9.68rem 1.973333rem;
}
.none {
  font-size: 0.4rem;
  color: #666;
  text-align: center;
  margin-top: 2.666667rem;
}

</style>
