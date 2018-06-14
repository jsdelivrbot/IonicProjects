<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content" v-else>
        <h1 class="top">{{detail.title}}</h1>
        <h2 class="top_title">{{detail.subtitle}}</h2>
      <div class="main" v-html="detail.text">{{detail.text}}</div>
    </div>
  </div>
</template>
<script type="text/javascript">
import loading from './loading'
import headTop from './head'
import {
  getStore,
  setStore,
  removeStore,
  checkInput
} from '../config/utils'
export default {
  data() {
    return {
      isLoading: true,
      title: '政策详情',
      trueHeight: '',
      detail:{}
    }
  },
  activated: function() {
    let from = getStore('fromGuide');
    if(from == '0'){
      this.title = '政策详情'
    }else{
      this.title = "公务机票常见问题详情"
    }
    this.trueHeight = getStore('trueHeight');
    let detail = JSON.parse(getStore('notice_detail'));
    this.detail = detail;
    removeStore('notice_detail')
    this.isLoading = false;
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
  background: #fff;
  position: relative;
  margin-top: 1.173333rem;
}
.top{
  font-size: 0.533333rem;
  color: #e94b31;
  margin: 0 0.533333rem;
  border-bottom: 0.026667rem solid #e94b31;
  text-align: center;
  line-height: 0.8rem;
  padding: 0.266667rem 0;
}
.top_title{
  line-height:0.64rem;
  color: #333;
  font-size: 0.266667rem;
  text-align: center;
}
.main{
  font-size: 0.373333rem;
  line-height: 0.533333rem;
  color: #333;
  padding: 0 0.533333rem;
  margin-top: 0.426667rem;
  text-align: left;
}
</style>
