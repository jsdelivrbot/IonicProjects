<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content" v-else>
      <mt-loadmore :top-method="loadTop" ref="loadmore">
        <div class="top">
          <p>{{total}}</p>
          <p>我的积分</p>
        </div>
        <div class="top_btn row" :class="{check:!provide}">
          <p :class="{check:provide}" @click="provide = true">积分兑换</p>
          <p :class="{check:!provide}" @click="provide = false">积分说明</p>
        </div>
        <template v-if="provide">
          <div class="store_ul">
            <div v-for="value in lists" class="col store_li">
              <img :src="value.picture_url" @click="shop(index)">
              <p>{{value.product_description}}</p>
              <p>{{value.integral}}积分</p>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="about">
            <div class="two">
              <p class="title">保险</p>
              <p class="list">80元保险购买成功可获50积分</p>
              <p class="list">40元保险购买成功可获5积分</p>
            </div>
            <div class="two">
              <p class="title">推荐</p>
              <p class="list">推荐其他用户注册成功可获10积分</p>
              <p class="list">同时被推荐人可获5积分</p>
            </div>
            <div class="one">
              <p class="title">注册</p>
              <p class="list">注册成功可获得2积分</p>
            </div>
            <div class="three">
              <p class="title">兑换里程</p>
              <p class="list" style="margin-top:0.266667rem;">使用积分免费兑换里程、来回程的机票，</p>
              <p class="list">兑换标准按单个航段独立计算。</p>
              <p class="list">具体详情可咨询客服人员&nbsp;&nbsp;0755-88889999</p>
            </div>
          </div>
        </template>
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
      title: '积分商城',
      name: '',
      trueHeight: '',
      provide: true,
      total: '0',
      lists: [
        { name: '【兑换】积分兑换里程', point: '800积分起', imgUrl: '00' },
        { name: '德国直邮 | WMF 福腾宝 CASA锅具三件套银色', point: '1119积分', imgUrl: '01' },
        { name: '启尔（Cheer） 电动红酒开瓶器 启瓶器起子', point: '139积分', imgUrl: '02' },
        { name: 'Midea电水壶WHJ1705C 304不锈钢电热水壶', point: '99积分', imgUrl: '03' },
        { name: 'SStar304不锈钢胡椒研磨器', point: '45积分', imgUrl: '04' },
        { name: '松下滴漏式咖啡机 可分离旋转式过滤网无需滤纸', point: '520积分', imgUrl: '05' },
        { name: '孚日洁玉纯棉毛成人加厚素色多臂毛巾6条装', point: '58积分', imgUrl: '06' },
        { name: '百露叠加收纳柜抽屉式透明内衣收纳箱', point: '215积分', imgUrl: '07' },
        { name: '晟旎尚品 12框实木创意组合相框墙照片墙', point: '129积分', imgUrl: '08' },
        { name: 'Cmon 双层反向雨伞免持式星空蓝', point: '68积分', imgUrl: '09' },
        { name: 'Cmon全自动伞女折叠晴雨两用伞', point: '49积分', imgUrl: '10' },
        { name: '欧乐B（Oral-B） 德国博朗 欧乐B成人电动牙刷', point: '129积分', imgUrl: '11' },
        { name: 'PHISINIC家用除螨紫外线床铺吸尘器除螨仪', point: '298积分', imgUrl: '12' },
        { name: 'Smartfrog水蜜陶迷你静音加湿器', point: '120积分', imgUrl: '13' },
        { name: '韩国原装进口777指甲刀修甲美甲套装镀金', point: '160积分', imgUrl: '14' },
        { name: '（PHILIPS）电吹风机HP4989', point: '199积分', imgUrl: '15' },
        { name: 'PHILIPS电动刮胡刀水洗胡须刀-配修剪器', point: '499积分', imgUrl: '16' },
        { name: '勃兰匠记 PLC-24 28件车载工具套装', point: '600积分', imgUrl: '17' },
        { name: '360行车记录仪二代 高清夜视 WIFI连接', point: '519积分', imgUrl: '18' },
        { name: '台电（Teclast）锋芒 U盘 64G USB3.0 深空灰', point: '129积分', imgUrl: '19' },
        { name: '凌美LAMY钢笔签字笔水笔德国进口学生学习用品文具', point: '99积分', imgUrl: '20' },
        { name: '飞利浦(PHILIPS)空气净化器家用除甲醛除雾霾', point: '1499积分', imgUrl: '21' },
        { name: 'airx A8空气净化器 A7F升级款PM2.5室内净化机', point: '3200积分', imgUrl: '22' }
      ]
    }
  },
  activated: function() {
    let that = this;
    that.trueHeight = getStore('trueHeight');
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
      }
    }, function(err) {

    })
    that.$http.post(that.url + '/xxx/api/public/integralMall', postData).then(function(res) {
      console.log(res)
      if (res.body.sts == 1) {
        that.lists = res.body.list;
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
    shop(index) {
      MessageBox.confirm('', {
        title: '提示',
        message: '如需积分兑换，请联系客服0755-88889999',
        showCancelButton: true,
        confirmButtonText: '拨打电话',
        cancelButtonText: '取消',
      }).then(action => {
        if (action == 'confirm') {
          console.log(action)
          window.location.href = "tel:0755-88889999";
        }
      });
    },
  },
}

</script>
<style scoped>
.content {
  background: #f2f2f2;
  margin-top: 1.173333rem;
}

.top {
  height: 3.2rem;
  background: url(../assets/img/store_bg.png)no-repeat;
  background-size: 100% auto;
  text-align: center;
  font-size: 0.373333rem;
  color: #f8ebc8;
  position: fixed;
  top: 1.173333rem;
  left: 0;
  right: 0;
}

.top p:nth-of-type(1) {
  padding-top: 0.8rem;
  font-size: 1.066667rem;
  color: #fff;
  font-weight: 600;
}

.top p:nth-of-type(2) {
  margin-top: 0.266667rem;
}

.top_btn {
  position: fixed;
  top: 4.373333rem;
  left: 0;
  right: 0;
  background-color: #fff;
  background-image: url(../assets/img/store_line.png);
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 100% 0.053333rem;
}

.top_btn.check {
  background-image: url(../assets/img/store_line_1.png);
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 100% 0.053333rem;
}

.top_btn p {
  display: inline-block;
  width: 50%;
  text-align: center;
  height: 1.306667rem;
  line-height: 1.306667rem;
  color: #666;
  font-size: 0.426667rem;
}

.top_btn p.check {
  color: #333;
}

.store_ul {
  padding: 0 0.266667rem;
  padding-top: 4.373333rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #fff;
}

.store_li {
  text-align: center;
  margin-top: 0.533333rem;
  width: 50%;
}

.store_li img {
  width: 4.586667rem;
  height: 4.586667rem;
}

.store_li p:nth-of-type(1) {
  font-size: 0.373333rem;
  color: #333;
  margin: 0.186667rem 0.266667rem;
  line-height: 0.533333rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.store_li p:nth-of-type(2) {
  font-size: 0.4rem;
  color: #e94b31;
  margin: 0.186667rem 0;
}

.about {
  background-color: #fff;
  padding-top: 4.373333rem;
  margin-top: 0.533333rem;
  padding-bottom: 0.533333rem;
}

.two {
  background: url(../assets/img/two_card.png)no-repeat;
  background-size: 100% auto;
  width: 9.68rem;
  height: 2.946667rem;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 0.533333rem;
}

.title {
  font-size: 0.426667rem;
  color: #e94b31;
  height: 1.066667rem;
  line-height: 1.066667rem;
}

.list {
  font-size: 0.373333rem;
  color: #333;
  height: 0.8rem;
  line-height: 0.8rem;
}

.one {
  background: url(../assets/img/one_card.png)no-repeat;
  background-size: 100% auto;
  height: 2.146667rem;
  width: 9.68rem;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 0.533333rem;
}

.three {
  background: url(../assets/img/three_card.png)no-repeat;
  background-size: 100% auto;
  height: 3.093333rem;
  width: 9.68rem;
  margin: 0 auto;
  text-align: center;
}

.three .list {
  height: 0.533333rem;
  line-height: 0.533333rem;
}

</style>
