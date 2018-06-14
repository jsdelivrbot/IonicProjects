<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content" v-else>
      <ul class="btn">
        <li @click="check_li(index)" v-for="(value,index) in btn_li">
          <span class="title">{{value.menu_bar}}</span><span class="icon_more"></span>
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
      title: '公务政策',
      trueHeight: '',
      btn_li: [],
    }
  },
  activated: function() {
    this.trueHeight = getStore('trueHeight');
    let from = getStore('fromGuide');
    let postData = {
      "data":{}
    };
    this.$http.post(this.url + '/xxx/api/public/queryfindAllHelpPolicy', postData).then(function(res) {
        console.log("通知:")
        console.log(res)
        let data = res.body.data,helps = [],notices = [];
        for (var i = 0; i < data.length; i++) {
          if(data[i].category == '公务政策'){
            notices.push(data[i]);
          }else if(data[i].category == '帮助中心'){
            helps.push(data[i]);
          }
        };
        console.log(notices)
        console.log(helps)
        if(from == '0'){
          console.log(0)
          this.title = '公务政策';
          this.btn_li = notices;
        }else if(from == '1'){
          console.log(1)
          this.title = '公务机票常见问题';
          this.btn_li = helps;
        }
        
      },function(err){
        console.log(err)
      })
    this.isLoading = false;
  },
  components: {
    headTop,
    loading
  },
  methods: {
    check_li(index) {
      setStore('')
      setStore('notice_detail',this.btn_li[index])
      this.$router.push({
        path:'/notice'
      })
    },
  },
}

</script>
<style scoped>
.content {
  background: #f2f2f2;
  position: relative;
  margin-top: 1.173333rem;
  padding-top: 0.533333rem;
}

.btn {
  justify-content: initial;
}

.btn li {
  text-align: center;
  line-height: 1.6rem;
  height: 1.6rem;
  padding: 0 0.32rem;
  background-color: #fff; 
  position: relative;
  text-align: left;
  margin: 0 0.32rem;
  margin-top: 0.32rem;
  border-radius: 0.133333rem;
}
.btn li *{
  vertical-align: middle;
}
.btn li span{
  display: inline-block;
}
.btn li .title{
  color: #333;
  font-size: 0.426667rem;
  text-align: left;
  display: inline-block;
  max-width: 85%;
  overflow: hidden;
  text-overflow:ellipsis;
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
  right: 0.533333rem;
  top: 0.4rem;
  bottom: 0.4rem;
}
</style>
