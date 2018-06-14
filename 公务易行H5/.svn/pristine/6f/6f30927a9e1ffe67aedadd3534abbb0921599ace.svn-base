<template>
  <div class="ttt">
    <!-- <img src="../assets/img/loading.gif" class="imgs"></img> -->
    <div id="loading-center">
      <div id="loading-center-absolute">
        <div class="circle">
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
</template>
<script type="text/javascript">
export default {
  data() {
    return {

    }
  },
}

</script>
<style type="text/css">
.ttt {
  text-align: center;
  z-index: 9999;
  /*opacity: 1;*/
  height: 100%;
  width: 100%;
  left: 0;
  top: 1.173333rem;
  position: fixed;
  background: url(../assets/img/result_bg.png)no-repeat;
  background-size: 100% auto;
}

.imgs {
  width: 3.2rem;
  height: 3.2rem;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  opacity: 0.7;
  flex: 1;
}

#loading-center {
  width: 100%;
  height: 100%;
  position: relative;
}

#loading-center-absolute {
  height: 2.666667rem;
  width: 2.666667rem;
  border-radius: 0.266667rem;
  background-color: #2C3444;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  opacity: 0.7;
  flex: 1;
}

.circle {
  left: 50%;
  top: 50%;
  height: 2.666667rem;
  width: 2.666667rem;
  margin-top: -1.333333rem;
  margin-left: -1.333333rem;
  position: absolute;
}

.word {
  position: absolute;
  left: 24%;
  bottom: 10%;
  color: #fff;
  font-size: 0.32rem;
}

.object {
  width:8px;
  height:8px;
  background-color: #e94b31;
  position: absolute;
  -moz-border-radius: 50% 50% 50% 50%;
  -webkit-border-radius: 50% 50% 50% 50%;
  border-radius: 50% 50% 50% 50%;
  -webkit-animation: animate 0.8s infinite;
  animation: animate 0.8s infinite;
}


#object_one {
  top: 20%;
  left: 30%;
}

#object_two {
  top: 12%;
  left: 45%;
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}

#object_three {
  top: 20%;
  left: 60%;
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

#object_four {
  top: 35%;
  left:68%;
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}

#object_five {
  top: 50%;
  left: 60%;
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

#object_six {
  top: 58%;
  left: 45%;
  -webkit-animation-delay: 0.5s;
  animation-delay: 0.5s;
}

#object_seven {
  top: 50%;
  left:30%;
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

#object_eight {
  top: 35%;
  left: 22%;
  -webkit-animation-delay: 0.7s;
  animation-delay: 0.7s;
}




@-webkit-keyframes animate {

  25% {
    -ms-transform: scale(2.2);
    -webkit-transform: scale(2.2);
    transform: scale(2.2);
  }


  75% {
    -ms-transform: scale(0);
    -webkit-transform: scale(0);
    transform: scale(0);
  }
}

@keyframes animate {
  50% {
    -ms-transform: scale(2.2, 2.2);
    -webkit-transform: scale(2.2, 2.2);
    transform: scale(2.2, 2.2);
  }

  100% {
    -ms-transform: scale(1, 1);
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }
}

</style>
