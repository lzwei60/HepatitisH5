<template>
  <div class="box">
    <!--内部属性-->
    <div 
    :ref="scrollEl" 
    class="scroll-box" 
    :style="{ top: `${translateY}px`}"
    @scroll="scrollEvent"
    @touchend="touchend"
    @touchmove="touchmove"
    @touchstart="touchstart">
      <div class="loadingBox" v-if="touchStartTitleShow">释放加载数据</div>
      <div class="loadingBox" v-if="touchEndTitleShow">加载中...</div>
      <!--插槽-->
      <slot></slot>
      <div class="end-text" v-if="!isScroll">{{endText}}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, toRefs,withDefaults } from 'vue';

// export type Props = {
//   distance:number;
//   isScroll:boolean;
//   endText:string;
// }

// const props = withDefaults(defineProps<Props>(),{
//   endText:'没有更多了'
// })

// props接收父组件的值
const props = defineProps({
  distance: Number, // 距离底部多少
  isScroll: Boolean, // 是否有下一页
  endText: {
    type: String,
    default: "没有更多了"
  }
})


// 子组件向父组件传值
const $emits = defineEmits(['getList', 'refreshFun'])

const data = reactive({
  scrollEl: null,
  startText: "释放即可刷新",
  scrollTop: 0,
  startY: 0,
  translateY: 0,
  touchStartTitleShow: false,
  touchEndTitleShow: false
})
let {
  scrollEl,
  startText,
  scrollTop,
  startY,
  translateY,
  touchEndTitleShow,
  touchStartTitleShow
} = toRefs(data);

/**
 * 手指触碰到屏幕
 * @param e 
 */
const touchstart = (e: any) => {
  let y = e.targetTouches[0].pageY;
  data.startY = y;
}

/**
 * 手指开始滑动
 * @param e 
 */
const touchmove = (e: any) => {
  let y = e.targetTouches[0].pageY;
  if(y > data.startY && data.scrollTop == 0){
    data.touchStartTitleShow = true;
    // 如果当前移动距离大于初始点击坐标，则视为下拉。并且要处于项目头部
    data.translateY = (y - data.startY) / 2;
  }else{
    data.touchStartTitleShow = false;
  }
}

/**
 * 手指松开
 * @param e 
 */
const touchend = (e: any) => {
  let y = e.changedTouches[0].pageY;
  if(y > data.startY){
    data.translateY = 0;
    data.touchStartTitleShow = false;
    data.touchEndTitleShow = true;
    $emits("refreshFun", ()=>{
      data.touchEndTitleShow = false;
    })
  }
  data.startY = 0;
}

const scrollEvent = (e: any) => {
  data.scrollTop = e.srcElement.scrollTop;
  if(!props.isScroll) return;
  if(
    data.scrollTop + e.srcElement.offsetHeight >
    e.srcElement.scrollHeight - (props.distance || 100)
  ){
    $emits('getList')
  }
}
</script>
<style scoped lang="scss">
.box{
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 90vh;
  .loadingBox{
    padding: 20px;
    text-align: center;
  }
}
.scroll-box{
  height: 90vh;
  width: 100%;
  overflow: auto;
  transform: all 0s ease 0s;
  position: absolute;
  right: 0;
  .end-text{
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #999;
  }
}
</style>