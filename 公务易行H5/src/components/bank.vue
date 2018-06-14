<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content">
      <!-- <div v-for="(value,index) in banks" @click="check(index)" class="list">{{value.KTitle}}</div> -->
      <mt-index-list>
        <mt-index-section v-for="(value,key,index) in banks" :key="key" class="letter_classify_li" :index="value.word" :height="trueHeight">
          <h4 class="city_title">{{value.word}}</h4>
          <ul>
            <li v-for="(item,index) in value.banks" :key="item.KMark" class="list" @click="check(item)">
              {{item.KTitle}}
            </li>
          </ul>
        </mt-index-section>
      </mt-index-list>
    </div>
  </div>
</template>
<script type="text/javascript">
import loading from './loading'
import banks from '../assets/bank.json'
import headTop from './head'
import {
  getStore,
  setStore,

} from '../config/utils'
export default {
  data() {
    return {
      title: '选择开卡银行',
      isLoading: true,
      banks: [],
      trueHeight:''
    }
  },
  activated: function() {
    this.trueHeight = getStore('trueHeight');
    this.isLoading = false;
    this.banks = banks;
      setStore('checkbankcode', false);
  },
  components: {
    headTop,
    loading
  },
  methods: {
    check(item) {
      setStore('checkbankcode', true);
      setStore("checkbank", item);
      this.$router.go(-1);
    }
  },
}

</script>
<style scoped>
.content{
  margin-top: 1.173333rem;
}
.list {
  height: 1.333333rem;
  line-height: 1.333333rem;
  font-size: 0.373333rem;
  color: #333;
  border-bottom: 0.026667rem solid #e5e5e5;
  padding-left: 0.533333rem;
}
.city_title {
  font-weight: 500;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.48rem;
  color: #343434;
  padding-left: 0.533333rem;
  background-color: #eee;
}
</style>
