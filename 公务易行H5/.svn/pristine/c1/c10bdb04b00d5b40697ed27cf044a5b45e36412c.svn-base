<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading> 
    <div class="content">
    </div>
  </div>
</template>
<script type="text/javascript">
import loading from './loading'
import headTop from './head'
import {
  getStore,
  setStore,
  
} from '../config/utils'
export default {
  data() {
    return {
      title: '姓名规则',
      isLoading:true,
      trueHeight: '',
    }
  },
  activated: function() {
    this.isLoading = false;
    this.trueHeight = getStore('trueHeight');
  },
  components: {
    headTop,loading
  },
  methods: {

  },
}

</script>
<style scoped>
.content{
  background: url(../assets/img/namerule.png)no-repeat;
  background-size: 100% 100%;
  margin-top: 1.173333rem;
}

</style>
