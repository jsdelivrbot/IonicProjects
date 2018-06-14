<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content" v-else>
 <!--      <div class="top">
        <span class="org" :class="{org_check:!org_code&& org_index == 1}" @click="chekc_org(0)">直销机构</span>
        <span class="people" :class="{people_check:!org_code&& org_index == 1}" @click="chekc_org(1)">代理人</span>
      </div> -->
    <!--   <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :bottomPullText='bottomText' :bottom-all-loaded="allLoaded"  :auto-fill="false"> -->
      <ul class="btn" v-if="btn_li.length > 0">
        <li @click="check_li(index)" v-for="(value,index) in btn_li">
          <p class="list"><span class="title">{{value.service_provider_name}}</span><span class="icon_more" :class="{more:value.check}"></span></p>
          <div class="detail" v-show="value.check">
            <p><span class="icon home">{{value.service_provider_name}}</span></p>
            <p><span class="icon address">{{value.address}}</span></p>
            <p><span class="tel">服务热线：</span><span style="color:#e96b39;">{{value.contact_information}}</span></p>
          </div>
        </li>
      </ul>
      <template v-else>
        <p class="tost">暂无无服务信息</p>
      </template>
    </mt-loadmore>      
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
      title: '服务商详情',
      trueHeight: '',
      org_index: 0,
      org_code: true,
      btn_li: [],
      allLoaded:false,
      bottomText: '上拉加载更多...',
      pageNo:1,
      pagesCount:'',
      first:true
    }
  },
  activated: function() {
    this.org_index = 0;
    this.org_code = true;
    this.isLoading = true;
    this.trueHeight = getStore('trueHeight');
    this.btn_li = [];
    // this.detail(1,1,15);
    this.detail(1,1,1200);
  },
  components: {
    headTop,
    loading
  },
  methods: {
    loadBottom() {
      // this.detail(0,0,10); 
      console.log(1)
      // this.allLoaded = true;
      // this.$refs.loadmore.onBottomLoaded();
      // pagesCount 总页数
      this.pageNo += 1;
      if (this.pageNo == 3) {
        this.allLoaded = true;
      };
      this.detail(1,this.pageNo,15);
      this.$refs.loadmore.onBottomLoaded();
    },
    // chekc_org(index) {
    //   this.first = false;
    //   if (index == 0) {
    //     this.org_code = true;
    //     this.org_index = 0;
    //   } else {
    //     this.org_index = 1;
    //     this.org_code = false;
    //   }
    //   this.btn_li = [];
    //   this.detail(index,1,1200);  
    //   for (var i = this.btn_li.length - 1; i >= 0; i--) {
    //     this.btn_li[i].check = false;
    //   }
    // },
    check_li(index) {
      console.log(this.btn_li)
      for (var i = this.btn_li.length - 1; i >= 0; i--) {
        if (index == i) {
          this.btn_li[index].check = !this.btn_li[index].check;
        } else {
          this.btn_li[i].check = false;
        }
      }
    },
    detail(index,pageIndex,pageSize) {
      let data = JSON.parse(getStore('facilitator_detail'));
      var btn_lis=[];
      let postData = {
        "data": {
          "province": data.province == '全国'?'':data.province,
          "city": data.city == '不限'?'':data.city,
          "name":data.service_provider_name,
          "type": index,
          "pageIndex": pageIndex,
          "pageSize": pageSize
        }
      };
      this.$http.post(this.url + '/xxx/api/public/service_provider', postData).then(function(res) {
        console.log("服务商:" + index)
        console.log(res)
        
        let data = res.body.items;
        console.log(data)
        if(data &&data.length >0){
          for (var i = 0; i <data.length; i++) {
            data[i]["check"] = false;
            if(data[i].service_provider_name == '深圳市特航航空服务有限公司'){
            console.log(i)
              var tehang = data.splice(i, 1);
            }
          }
          if(tehang){     
            data.unshift(tehang[0]);
          }
          console.log(this.btn_li)
          btn_lis = this.btn_li.concat(data);
          this.btn_li = btn_lis;
        }
          if(index == 1){
            console.log(123)
            this.detail(0,1,500)
          }
        if(index == 0){
          this.isLoading = false;
        }
      }, function(err) {
        console.log(err)
      })
    }
  },
}

</script>
<style scoped>
.content {
  background: #fff5dd;
  position: relative;
  margin-top: 1.173333rem;
  height: 100%;
}

.top {
  margin: 0 auto;
  text-align: center;
  height: 1.333333rem;
  font-size: 0;
  background: #f2f2f2;
}

.top span {
  display: inline-block;
  font-size: 0.426667rem;
  height: 0.96rem;
  width: 3.733333rem;
  line-height: 0.96rem;
  margin-top: 0.186667rem;
}

.org {
  background: url(../assets/img/left_disable.png)no-repeat;
  background-size: 3.733333rem 0.96rem;
  color: #fff;
}

.org_check {
  background: url(../assets/img/left_normal.png)no-repeat;
  background-size: 3.733333rem 0.96rem;
  color: #e96b39;
}

.people {
  background: url(../assets/img/right_normal.png)no-repeat;
  background-size: 3.733333rem 0.96rem;
  color: #e96b39;
}

.people_check {
  background: url(../assets/img/right_disable.png)no-repeat;
  background-size: 3.733333rem 0.96rem;
  color: #fff;
}

.btn {
  background: #f2f2f2;
}

.btn li .list {
  text-align: center;
  line-height: 1.333333rem;
  height: 1.333333rem;
  font-size: 0.426667rem;
  color: #666;
  padding: 0 0.533333rem;
  background-color: #fff;
  border-bottom: 0.013333rem solid #e5e5e5;
  position: relative;
  text-align: left;
}

.btn li .list * {
  vertical-align: middle;
}

.btn li .list span {
  display: inline-block;
}

.btn li .list .title {
  color: #333;
  text-align: left;
  display: inline-block;
  max-width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 0.533333rem;
}

.icon_more {
  width: 0.8rem;
  height: 0.8rem;
  background-image: url(../assets/img/icon_bottom.png);
  background-repeat: no-repeat;
  background-size: 0.8rem 0.8rem;
  background-position: center;
  position: absolute;
  right: 0.533333rem;
  top: 0.266667rem;
  bottom: 0.266667rem;
}

.icon_more.more {
  background-image: url(../assets/img/icon_top.png);
}

.detail {
  padding: 0.266667rem 0.533333rem;
}

.detail p {
  /*height: 1.066667rem;*/
  line-height: 1.066667rem;
}

.detail span {
  color: #666;
  font-size: 0.373333rem;
}

.detail .icon {
  padding-left: 0.586667rem;
  display: inline-block;
  width: 80%;
  line-height: 0.4rem;
  background: url(../assets/img/icon_home.png)no-repeat;
  background-size: 0.32rem 0.32rem;
  background-position: left center;
}

.detail .icon.address {
  background: url(../assets/img/icon_address1.png)no-repeat;
  background-position: left center;
  background-size: 0.32rem 0.32rem;
}

.tel {
  padding-left: 0.586667rem;
  display: inline-block;
  background: url(../assets/img/icon_tel.png)no-repeat;
  background-size: 0.32rem 0.32rem;
  background-position: left center;
}

.tost {
  color: #666;
  font-size: 0.4rem;
  text-align: center;
  margin-top: 5.333333rem;
}

</style>
