<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content">
      <div class="img">
        <img :src="img" alt="" @load="imgLoading">
      </div>
      <div style="text-align:center;z-index:9999;opacity:1;width:100%;left:0;top:0;position:fixed;background-color:transparent;height:100%;" v-show="isLoading">
        <!-- <img src="../assets/img/loading.gif" style="width:3.2rem;height:3.2rem;position:fixed;top:0;right:0;bottom:0;left:0;margin:auto;"></img> -->
        <div id="loading-center">
          <div id="loading-center-absolute">
            <div  class="circle">
              <div class="object" id="object_one"></div>
              <div class="object" id="object_two"></div>
              <div class="object" id="object_three"></div>
              <div class="object" id="object_four"></div>
              <div class="object" id="object_five"></div>
              <div class="object" id="object_six"></div>
              <div class="object" id="object_seven"></div>
              <div class="object" id="object_eight"></div>
            </div>
            <div class="word">加载中...</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import loading from './loading'
import headTop from './head'
import {
  getStore,
  setStore,
  removeStore
} from '../config/utils'
export default {
  data() {
    return {
      title: '机型图',
      isLoading: true,
      img: '',
      trueHeight: ''
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log(to)
    console.log(from)
    this.img = ''
    next(true)
  },
  activated: function() {
    this.trueHeight = getStore('trueHeight');
    this.img = '';
    this.isLoading = true;
    // this.img = this.$route.query.id;
    this.img = getStore('imgUrl') + '?t=' + Math.random();
    removeStore('imgUrl')
    console.log(this.img)
  },
  components: {
    headTop,
    loading
  },
  methods: {
    imgLoading() {
      console.log('加载完成')
      this.isLoading = false;
    }
  },
}

</script>
<style scoped>
.img {
  width: 100%;
  margin-top: 1.173333rem;
  flex: 1;
}

.img img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

</style>
