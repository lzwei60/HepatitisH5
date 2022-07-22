<template>
  <div class="list-box">
    <div class="info-title info">
      <p>地区</p>
      <p>现有确诊</p>
      <p>确诊</p>
      <p>死亡</p>
      <p>治愈</p>
    </div>
    <div class="list" v-for="i in list" :key="i.id">
      <div class="p-box">
        <div class="info" @click="getChowChildren(i.id)">
          <p>{{i.name}}</p>
          <p>{{i.total.confirm - i.today.dead - i.today.heal}}</p>
          <p>
            <span>{{i.total.confirm}}</span>
            <span>较昨日{{i.today.confirm}}</span>
          </p>
          <p>{{i.total.dead}}</p>
          <p>{{i.total.heal}}</p>
        </div>
        <div v-if="showChildren">
          <div class="children-box" v-show="data.showChildren == i.id">
            <List :list="i.children"></List>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup name="List" lang="ts">
// setup 可以把组件名称写在标签上
import { reactive, ref } from 'vue';
import { IAreaTree } from "../type/index";
// 声明props  无需引入 类似于全局定义
const props = defineProps<{
  list: IAreaTree[];
  showChildren?: Boolean;
}>();
const data = reactive({
  showChildren: ""
})
// 是否展示子级数据
const getChowChildren = (id: string) => {
  data.showChildren == id ? (data.showChildren = "") : (data.showChildren = id);
}
</script>
<style lang="scss" scoped>
.list-box{
  border: 1px solid #d1d1d1;
  margin: 1rem 0;
  .p-box{
    .children-box{
      margin-left: 1rem;
      .list-box{
        border: none;
      }
      .info-title{
        height: 30px;
        line-height: 30px;
      }
      p{
        &:nth-child(1){
          font-weight: 600;
          color: #999;
        }
      }
    }
  }
}
.info-title{
    font-weight: 600;
    color: #000;
    font-size: 16px;
    height: 50px;
    line-height: 50px;
    background: #d1d1d1;
  }
.info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    > p{
      width: 15%;
      text-align: center;
      white-space: nowrap;
      &:nth-child(1){
        font-weight: 600;
        color: #000;
      }
      &:nth-child(2){
        width: 23%;
        color: red;
      }
      &:nth-child(3){
        width: 23%;
        span{
          display: block;
          &:last-child{
            color: #999;
          }
        }
      }
    }
  }
.list{
  &:nth-of-type(odd){
    background: #f6f6f6;
  }
  .info{
    height: 60px;
    line-height: 60px;
    p{
      line-height: 20px;
    }
  }
}

</style>