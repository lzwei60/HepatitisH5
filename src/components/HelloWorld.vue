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
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRefs } from 'vue';
import { InteData,InteDataFun } from "../pageJs/index";

const data = reactive(new InteData());

onMounted(()=>{
  InteDataFun(data)
})
const { chinaTotal, hbData, type } = toRefs(data);

const tabChange = (type: number) =>{
  data.type = type;
}

</script>
<style lang="scss" scoped>
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
</style>
