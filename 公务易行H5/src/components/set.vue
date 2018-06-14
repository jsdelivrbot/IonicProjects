<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content">
      <div style="">
        <p class="top list" @click="share()">分享特航<span class="icon_more"></span></p>
        <p class="top list" @click="about()">关于我们<span class="icon_more"></span></p>
      </div>
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
  removeStore
} from '../config/utils'
export default {
  data() {
    return {
      title: '关于',
      isLoading: true,
      phone: '',
      name: '特航会员',
      trueHeight:''
    }
  },
  activated: function() {
    this.trueHeight = getStore('trueHeight');
    this.isLoading = false;
    let userinfo = JSON.parse(getStore("userinfo"));
    console.log(userinfo)
    if (userinfo) {
      this.phone = userinfo.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
      this.name = userinfo.name
    }
    
  },
  components: {
    headTop,
    loading
  },
  methods: {
    personal() {
      this.$router.push({
        path: '/personal'
      })
    },
    share() {
      var ids = [{
          id: "weixin",
          ex: "WXSceneSession" /*微信好友*/
        }, {
          id: "weixin",
          ex: "WXSceneTimeline" /*微信朋友圈*/
        }, {
          id: "qq" /*QQ好友*/
        }, {
          id: "tencentweibo" /*腾讯微博*/
        }, {
          id: "sinaweibo" /*新浪微博*/
        }],
        bts = [{
          title: "发送给微信好友"
        }, {
          title: "分享到微信朋友圈"
        },         {
          title: "分享到QQ"
        }, {
          title: "分享到腾讯微博"
        }, {
          title: "分享到新浪微博"
        }
        ];
      plus.nativeUI.actionSheet({
          cancel: "取消",
          buttons: bts
        },
        function(e) {
          var i = e.index;
          if (i > 0) {
            shareAction(ids[i - 1].id, ids[i - 1].ex);
          }
        }
      );
      /**
       * 分享操作
       */
      function shareAction(id, ex) {
        var s = null;
        if (!id || !(s = shares[id])) {
          outLine("无效的分享服务！");
          return;
        }
        if (s.authenticated) {
          outSet("---已授权---");
          shareMessage(s, ex);
        } else {
          outSet("---未授权---");
          s.authorize(function() {
            shareMessage(s, ex);
          }, function(e) {
            outLine("认证授权失败");
          });
        }
      }
      /**
       * 发送分享消息
       */
      function shareMessage(s, ex) {
        var msg = {
          content: '分享-详情',
          href: 'http://www.tehang.com',
          title: '公务易行',
          content: '',
          thumbs: ['http://oi41jh6qx.bkt.clouddn.com/share_logo.png'],
          pictures: ['http://oi41jh6qx.bkt.clouddn.com/share_logo.png'],
          extra: {
            scene: ex
          }
        };
        s.send(msg, function() {
          outLine("分享成功!");
        }, function(e) {
          outLine("分享失败!");
        });
      }
      /**
       * 分享按钮点击事件
       */
      // 控制台输出日志
      function outSet(msg) {
        console.log(msg);
      }
      // 界面弹出吐司提示
      function outLine(msg) {
        console.log(msg);
      }
    },
    about() {
      this.$router.push({
        path: '/about'
      })
    },
  },
}

</script>
<style scoped>
.content {
  padding-top: 0.533333rem;
  background-color: #f8ebcb;
  margin-top: 1.173333rem;
}

.top {
  padding: 0 0.533333rem;
  height: 1.653333rem;
  line-height: 1.653333rem;
  justify-content: initial;
  background-color: #fff;
}

.top img {
  width: 1.333333rem;
  height: 1.333333rem;
  margin-top: 0.16rem;
  margin-right: 0.533333rem;
}

.customer {
  font-size: 0.373333rem;
  color: #666;
  justify-content: initial;
  line-height: 0.826667rem;
}

.customer span:nth-of-type(1) {
  font-size: 0.48rem;
  color: #333;
}

.list {
  height: 1.333333rem;
  line-height: 1.333333rem;
  margin-top: 0;
  font-size: 0.426667rem;
  color: #333;
  border-bottom: 0.013333rem solid #eee;
  background-color: #fff;
  position: relative;
}
.icon_more{
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  background-image: url(../assets/img/icon_more.png);
  background-repeat: no-repeat;
  background-size: 0.8rem 0.8rem;
  background-position:center;
  position: absolute;
  right: 0.533333rem;
  top: 0.266667rem;
  bottom: 0.266667rem;
}
</style>
