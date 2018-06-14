<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content" v-else>
      <ul class="btn">
        <li @click="check_li(index)" v-for="(value,index) in btn_li">
          <img :src="require('../assets/img/guide_'+value.imgUrl+'.png')">
          <span class="title">{{value.name}}</span>
          <span class="icon_more"></span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/javascript">
import loading from './loading'
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
      title: '公务指南',
      trueHeight: '',
      btn_li: [
        { imgUrl: 'policy', name: '公务政策' },
        { imgUrl: 'help', name: '公务机票常见问题' },
        { imgUrl: 'provider', name: '服务商/供应商' },
        // { imgUrl: 'facilitator', name: '服务商' },        
        // { imgUrl: 'notice', name: '最新公告' },
        // { imgUrl: 'channel', name: '购票渠道' },
        // { imgUrl: 'fare', name: '公务票价' },
        // { imgUrl: 'backtochange', name: '机票退改' },
        // { imgUrl: 'reimbursement', name: '如何报销' },
        // { imgUrl: 'civilcard', name: '公务卡' },
      ],

    }
  },
  activated: function() {
    this.trueHeight = getStore('trueHeight');
    this.isLoading = false;
  },
  components: {
    headTop,
    loading
  },
  methods: {
    check_li(index) {
      if (index == 0) {
        setStore('fromGuide','0');
        this.$router.push({
          path: '/policy'
        })
      } else if (index == 2) {
        this.$router.push({
          path: '/provider'
        })
      } else if (index == 1) {
        setStore('fromGuide','1');
        this.$router.push({
          path: '/policy'
        })
      }
    },
  },
}

</script>
<style scoped>
.content {
  background: #fff5dd;
  position: relative;
  margin-top: 1.173333rem;
}

.btn {
  justify-content: initial;
  margin-top: 0.533333rem;
}

.btn li {
  text-align: center;
  line-height: 1.6rem;
  height: 1.6rem;
  color: #666;
  padding: 0 0.32rem;
  background-color: #fff;
  position: relative;
  text-align: left;
  margin: 0 0.16rem;
  margin-top: 0.266667rem;
  border-radius: 0.133333rem;
}

.btn li * {
  vertical-align: middle;
}

.btn li span {
  display: inline-block;
}

.btn li img {
  width: 1.066667rem;
  height: 1.066667rem;
  margin-right: 0.32rem;
}

.btn li .title {
  font-size: 0.426667rem;
  color: #333;
  text-align: left;
  display: inline-block;
  max-width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 0.533333rem;
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
  top: 0.4rem;
  bottom:  0.4rem;
}
</style>
