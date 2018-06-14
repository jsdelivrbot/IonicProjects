<template>
    <header>
    	<span class="goback" v-if="goBack" @click="$router.go(-1)"></span>
        <span>{{title}}</span>
        <span class="first" v-show="goHome" @click="home()"></span>
        <a class="second" v-show="goService" href="tel:0755-88889999"></a>
    </header>
</template>
<script type="text/javascript">
export default {
    data() {
            return {

            }
        },
        props: ['title','goBack','goHome','goService'],
        methods: {
            home(){
                this.$router.push({
                    path:'/home'
                })
            },
        }
}
</script>
<style type="text/css">
@import '../style/common.css';
header {
    height: 1.173333rem;
    line-height: 1.173333rem;
    background-color: #e94b31;
    text-align: center;
    color: #fff;
    font-size: 0.48rem;
    position: fixed;
}
span.goback{
	position: absolute;
	top: 0.266667rem;
	left: 0.533333rem;
	display: inline-block;
	width: 0.64rem;
	height: 0.64rem;
	background: url(../assets/img/btn_back_normal.png)no-repeat left center;
	background-size: 100% auto;
}
.first{
    position: absolute;
    top: 0.266667rem;
    right: 0.533333rem;
    display: inline-block;
    width: 0.64rem;
    height: 0.586667rem;
    background: url(../assets/img/home.png)no-repeat;
    background-size: 100% auto;
    background-size: 0.64rem 0.586667rem;
}
.second{
    position: absolute;
    top: 0.266667rem;
    right: 0.533333rem;
    display: inline-block;
    width: 0.64rem;
    height: 0.586667rem;
    background: url(../assets/img/service.png)no-repeat;
    background-size: 100% auto;
    background-size: 0.64rem 0.586667rem;
}
</style>
