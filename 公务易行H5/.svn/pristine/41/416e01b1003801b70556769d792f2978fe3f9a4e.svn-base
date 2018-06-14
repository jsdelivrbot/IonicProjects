<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content" v-else>
      <div class="top">
        <p class="title"><span class="left"></span>{{detail.supplier_name}}<span class="right"></span></p>
        <p class="link">服务热线：<span style="color:#e94b31">{{detail.hotline}}</span></p>
        <p class="link">官方地址：{{detail.official_website}}</p>
      </div>
      <div class="introduce" v-html="detail.describe">{{detail.describe}}</div>
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
      title: '供应商详情',
      trueHeight: '',
      detail: {}
    }
  },
  activated: function() {
    let detail = JSON.parse(getStore('provider_detail'));
    this.detail = detail;
    detail.describe = escape2Html(detail.describe)
    this.trueHeight = getStore('trueHeight');
    this.isLoading = false;

    function escape2Html(str) {
      var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
      return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function(all, t) { return arrEntities[t]; });
    }
  },
  components: {
    headTop,
    loading
  },
  methods: {

  },
}

</script>
<style scoped>
.content {
  background: #fff5dd;
  margin-top: 1.173333rem;
  padding-top: 0.533333rem;
  padding-bottom: 0.533333rem;
}

.top {
  width: 9.68rem;
  height: 2.946667rem;
  margin: 0 auto;
  text-align: center;
}

.title {
  height: 1.066667rem;
  line-height: 1.066667rem;
  font-size: 0.426667rem;
  color: #333;
  background-image: url(../assets/img/provider_top.png);
  background-size: 100% auto;
}

.left {
  display: inline-block;
  width: 1.133333rem;
  height: 0.2rem;
  background: url(../assets/img/title_right.png)no-repeat;
  background-size: 1.133333rem 0.2rem;
  margin-right: 0.266667rem;
}

.right {
  display: inline-block;
  width: 1.133333rem;
  height: 0.2rem;
  background: url(../assets/img/title_left.png)no-repeat;
  background-size: 1.133333rem 0.2rem;
  margin-left: 0.266667rem;
}

.top .link {
  font-size: 0.373333rem;
  color: #333;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: left;
  padding: 0 0.533333rem;
}

.introduce {
  width: 8.613333rem;
  margin: 0 auto;
  /*margin-top: 0.32rem;*/
  font-size: 0.373333rem;
  color: #666;
  border-radius: 0.133333rem;
  padding: 0.533333rem;
  line-height: 0.48rem;
  background-color: #fff;
  text-indent: 0.266667rem;
}

</style>
