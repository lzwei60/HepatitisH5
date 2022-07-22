<template>
  <div class="box">
    <div class="top-box">
      <img class="bg-img" src="../assets/bg.png" alt="">
      <div class="title-text">
        <h1>科学防护，共渡难关</h1>
        <h2>肺炎疫情实时动态播报</h2>
      </div>
      <div v-if="chinaTotal.total" class="cover-cards">
        <div class="cover-tab">
          <div @click="tabChange(1)" :class="[type == 1 && 'active']">全国疫情数据（含港澳台）</div>
          <div @click="tabChange(2)" :class="[type == 2 && 'active']">湖北疫情数据</div>
        </div>
        <div v-show="type == 1" class="cover-info">
          <div>
            <h4 class="title">境外输入</h4>
            <p class="number">{{chinaTotal.total.input}}</p>
            <p class="tip">
              较昨日
              <span>+{{chinaTotal.today.input}}</span>
            </p>
          </div>
          <div>
            <h4 class="title">无症状感染者</h4>
            <p class="number">{{chinaTotal.extData.noSymptom}}</p>
            <p class="tip">
              较昨日
              <span>+{{chinaTotal.extData.incrNoSymptom}}</span>
            </p>
          </div>
          <div>
            <h4 class="title">现有确诊</h4>
            <p class="number">
              {{
                chinaTotal.total.confirm - chinaTotal.today.dead - chinaTotal.today.heal
              }}
            </p>
            <p class="tip">
              较昨日
              <span>+{{chinaTotal.today.storeConfirm}}</span>
            </p>
          </div>
          <div>
            <h4 class="title">累积确诊</h4>
            <p class="number">{{chinaTotal.total.confirm}}</p>
            <p class="tip">
              较昨日
              <span>+{{chinaTotal.today.confirm}}</span>
            </p>
          </div>
          <div>
            <h4 class="title">累积死亡</h4>
            <p class="number">{{chinaTotal.total.dead}}</p>
            <p class="tip">
              较昨日
              <span>+{{chinaTotal.today.dead}}</span>
            </p>
          </div>
          <div>
            <h4 class="title">累积治愈</h4>
            <p class="number">{{chinaTotal.total.heal}}</p>
            <p class="tip">
              较昨日
              <span>+{{chinaTotal.today.heal}}</span>
            </p>
          </div>
        </div>
        <div v-show="type == 2" class="cover-info">
          <div>
            <h4 class="title">累积确诊</h4>
            <p class="number">{{hbData.total.confirm}}</p>
            <p class="tip">
              较昨日
              <span>+{{hbData.today.confirm}}</span>
            </p>
          </div>
          <div>
            <h4 class="title">累积死亡</h4>
            <p class="number">{{hbData.total.dead}}</p>
            <p class="tip">
              较昨日
              <span>+{{hbData.today.dead}}</span>
            </p>
          </div>
          <div>
            <h4 class="title">累积治愈</h4>
            <p class="number">{{hbData.total.heal}}</p>
            <p class="tip">
              较昨日
              <span>+{{hbData.today.heal}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!--echarts-->
    <div class="data-map content">
      <h3>中国疫情</h3>
      <div class="map-box">
        <div :class="mapType == 1 ? 'to-left' : 'to-right'" id="map"></div>
        <div :class="mapType == 1 ? 'to-left' : 'to-right'" id="map2"></div>
      </div>
      <div class="map-btn">
        <div @click="mapTypeChange(1)" :class="{ active: mapType == 1}">现有确诊</div>
        <div @click="mapTypeChange(2)" :class="{ active: mapType == 2}">累积确诊</div>
      </div>
    </div>
    <!--折线数据-->
    <div>
      <div class="line-box">
        <div class="line"></div>
        <div class="line1"></div>
        <div class="line2"></div>
      </div>
    </div>
    <!--列表数据-->
    <div class="data-list content">
      <h3>中国病例</h3>
      <List v-if="china.length" :list="china" :show-children="true"></List>
    </div>
    <div class="data-list content" v-if="areaTree.length">
      <h3>世界病例</h3>
      <ScrollCom 
      :distance="100" 
      :isScroll="data.isScroll"
       @get-list="getList"
       @refreshFun="refreshFun">
        <List :list="data.showList" :show-children="false"></List>
      </ScrollCom>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRefs } from 'vue';
import { InteData,InteDataFun } from "../pageJs/index";
import List from './List.vue' // 语法糖引进的组件无需注册
import ScrollCom from './ScrollCom.vue';

const data = reactive(new InteData());

onMounted(()=>{
  InteDataFun(data)
})
const { chinaTotal, hbData, type, mapType, china, areaTree } = toRefs(data);
/**
 * 切换标签
 * @param type 类型
 */
const tabChange = (type: number) =>{
  data.type = type;
}
/**
 * 切换地图
 * @param type 类型
 */
const mapTypeChange = (type: number) => {
  data.mapType = type;
}
/**
 * 滚动加载
 */
let page:number  = 0;
const getList = () => {
  if(page === data.areaTree.length - 1) {
    data.isScroll = false
    return
  }
  console.log("加载下一页");
  // 子组件触发
  page++;
  data.showList.push(...data.areaTree[page]);
}
/**
 * 刷新页面
 * @param fun 
 */
const refreshFun = (fun:Function) => {
  InteDataFun(data).then(()=>{
    page = 0;
    data.isScroll = true;
    fun();
  })
}
</script>
<style lang="scss" scoped>
@keyframes toRight{
  from{
    left: 0;
  }
  to{
    left: calc(0px - 100vw + 1rem);
  }
}
@keyframes toLeft{
  from{
    left: calc(0px - 100vw + 1rem);
  }
  to{
    left: 0;
  }
}
.bg-img{
  width: 100%;
}
.top-box {
  position: relative;
  .title-text {
    position: absolute;
    z-index: 2;
    color: #fff;
    top: 20px;
    left: 1rem;
  }
  .cover-cards {
    position: absolute;
    top: 120px;
    background-color: #fff;
    border-radius: 20px;
    width: calc(100% - 2rem);
    left: 1rem;
    overflow: hidden;
    box-shadow: 0 2px 20px rgb(0 0 0 / 10%);
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-flow: wrap;
      &.cover-tab {
        > div{
          width: 50%;
          background: #efefef;;
          text-align: center;
          height: 40px;
          line-height: 40px;
          &.active {
            background: #fff;
          }
        }
      }
      &.cover-info {
        >div {
          width: 33%;
          text-align: center;
          margin-bottom: 20px;
          .title {
            font-weight: inherit;
            margin: 5px 0;
          }
          .number{
            font-size: 20px;
            margin-bottom: 5px;
          }
          span{
            font-size: 12px;
          }
          &:first-child{
            .number, span {
              color: #A8311C;
            }
          }
          &:nth-child(2){
            .number, span {
              color: #ffa352;
            }
          }
          &:nth-child(3){
            .number, span {
              color: #7D4E67;
            }
          }
          &:nth-child(4){
            .number, span {
              color: #D86055;
            }
          }
          &:nth-child(5){
            .number, span {
              color: #393530;
            }
          }
          &:last-child{
            .number, span {
              color: #409576;
            }
          }
        }
      }
    }
  }
}
.data-map, .data-list{
  margin-top: 200px;
  overflow: hidden;
  h3{
    border-left: 8px solid #e10000;
    padding-left: 1rem;
  }
}
.map-box{
  display: flex;
  width: 200%;
}
#line, #line1, #line2{
  height: 400px;
  width: 100%;
}
#map, #map2{
  height: 350px;
  width: 50%;
  animation-fill-mode: forwards;
}
.to-left{
  animation: toLeft 1s;
}
.to-right{
  animation: toRight 1s;
}
.map-btn, .line-btn{
  display: flex;
  justify-content: space-around;
  align-items: center;
  > div{
    width: 45%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #d2d2d2;
    box-shadow: 0 5px 7px 1px rgb(0 0 0 / 5%);
    border-radius: 5px;
    text-align: center;
    &.active{
      border-color: #ce4733;
      background-color: #fef7f7;
      color: #ce2c1e;
    }
  }
}
.line-btn{
  > div{
    width: 30%;
    height: 55px;
    line-height: 25px;
    padding-top: 5px;
  }
}
.data-list{
  margin-top: 20px;
  padding: 0 5px;
}
</style>
