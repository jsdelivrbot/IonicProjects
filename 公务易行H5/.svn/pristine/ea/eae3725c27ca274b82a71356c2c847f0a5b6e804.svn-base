<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content">
      <iframe ref="" :src="urlStr" @load="loaded" id="frmid"></iframe>
      <!-- <Embed :src="urlStr" id="frmid" @load="loaded" /> -->
    </div>
  </div>
</template>
<script type="text/javascript">
import headTop from './head'
import loading from './loading'
import {
  getStore,
  setStore,
  watchOrderStatus
} from '../config/utils'
export default {
  data() {
    return {
      title: '支付',
      isLoading: false,
      urlStr: '',
      trueHeight: ''
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log(to)
    console.log(from)
    if (to.path === '/pay'  || to.path === '/dingdan') {
      setStore('toHome',true);
      next({ path: '/order' })
    } else {
      next(true)
    }
  },
  activated: function() {
    this.trueHeight = getStore('trueHeight');
    // https://www.99bill.com/gwfnotify/notifyMerchant.htm?dealId=2839602158&orderId=20170718114615
    this.urlStr = getStore('urlStr');
  },
  components: {
    headTop,
    loading
  },
  methods: {
    loaded() {
      var that = this;
      var iframe = document.getElementById('frmid').contentWindow;
      // iframe.document.write("<script>$('#text-cvv2').parent().insertBefore($('#text-vcode').parent())<\/script>")
      // let cvv2_li = iframe.document.getElementById("text-cvv2").parentNode,
      // vcode_li = iframe.document.getElementById("text-vcode").parentNode,
      // form_ul = iframe.document.getElementsByClassName("editForm");
      // console.log(cvv2_li);
      // console.log(vcode_li);
      // form_ul.insertBefore(cvv2_li,vcode_li);
      var cardNumber = iframe.document.getElementById("text_cardNumber");
      var validTime = iframe.document.getElementById("text-validTime");
      var cvv2 = iframe.document.getElementById("text-cvv2");
      var name = iframe.document.getElementById("text-name");
      var tel = iframe.document.getElementById("text-tel");
      var id = iframe.document.getElementById("text-id");
      var inputs = [cardNumber, validTime, name, id, tel];
      console.log(inputs)
      var arr = JSON.parse(getStore('outInputData'));
      for (var i = 0; i < 5; i++) {
        if (inputs[i]) {
          let input = inputs[i];
          input.value = arr[i];
          input.setAttribute('readOnly', true);
          input.style.color = '#424242';
        }
      }
      // let paySure = iframe.document.getElementsByTagName("input");
      // for (let k = 0; k < paySure.length; k++) {
      //   if (paySure[k].value == '确定并跳转至商户页面') {
      //     var postData = {};
      //     let orderData = JSON.parse(getStore('orderData'));
      //     var data = {
      //       "orderno": orderData.orderno,
      //     }
      //     postData.data = data;
      //     that.$http.post(that.url + '/xxx/api/public/paySuccess', postData, ).then(function(res) {
      //       console.log(res);
      //       watchOrderStatus(orderData.orderno,that)
      //     })
      //     that.$router.replace({
      //       path: '/order'
      //     })
      //   }
      // }

      iframe.document.getElementsByClassName("button-red")[0].addEventListener("click", function(e) {
        var postData = {};
        let orderData = JSON.parse(getStore('orderData'));
        var data = {
          "orderno": orderData.orderno,
        }
        postData.data = data;
        that.$http.post(that.url + '/xxx/api/public/paySuccess', postData, ).then(function(res) {
          console.log(res);
          watchOrderStatus(orderData.orderno,that)
        })
        that.$router.replace({
          path: '/order'
        })
      }, false)
    }
  },
  watch: {
    src(data) {
      console.log(data)
    }
  }
}

</script>
<style scoped>
.content {
  margin-top: 1.173333rem;
  padding: 0;
  background: #e9e9e9;
}

iframe {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0;
}

</style>
