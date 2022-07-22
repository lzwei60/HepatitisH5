import axios from 'axios';
import * as echarts from 'echarts';
import type { IData, IAreaTree, IchinaDayList } from "../type/index";
import chinaJson from '../assets/china.json';

type EChartsOption = echarts.EChartsCoreOption;

const today = {
  confirm: 0,
  dead: 0,
  heal: 0,
  severe: 0,
  storeConfirm: 0,
  suspect: 0
}
const total = {
  confirm: 0,
  dead: 0,
  heal: 0,
  severe: 0,
  input: 0,
  suspect: 0
}
class InteData implements IData {
  areaTree: IAreaTree[][] = []
  showList: any[] = []
  chinaDayList: IchinaDayList[] = []
  chinaTotal: IAreaTree = {
    extData: {},
    today: today,
    total: total,
  }
  china: IAreaTree[] = []
  hbData: IAreaTree = {
    id: "",
    name: "",
    lastUpdateTime: "",
    extData: {},
    today: today,
    total: total,
    children: []
  }
  mapType: number = 1
  lineType: number = 1
  lastUpdateTime: string = ""
  type: number = 1// number 可以不写 ts 会自动推导，类型一般是 小写 
  isScroll: boolean = true
}
const getPageList = (list: any[]) => {
  const arr: any[][] = [];
  for (let index = 0; index < list.length; index += 30) {
    arr.push(list.slice(index, index + 30))
  }
  return arr;
}
const InteDataFun = async (data: InteData) => {
  const mapDom: HTMLElement | null = document.getElementById("map");
  const mapDom2: HTMLElement | null = document.getElementById("map2");

  const optionMap: EChartsOption = {
    title: { // 标题
      // text: '中国疫情图',
      subtext: '单击省份可查看病例数'
    },
    tooltip: { // 提示框组件
      trigger: "item",
      formatter: "{a}病例<br/>{b}: {c}",
      show: true
    },
    visualMap: {
      show: false
    }
  }
  const series = {
    name: "现有确诊",
    type: "map", // 类型
    map: "china", // 中国
    colorBy: "series",
    zoom: 1.3, // 当前视角的缩放比例
    top: 80, // 组件离容器上侧的距离
    label: {
      show: true,
      color: "#333",
      fontSize: 10
    },
  }
  const myMap = echarts.init((mapDom as HTMLElement)) // 生成一个容器1
  const myMap2 = echarts.init((mapDom2 as HTMLElement)) // 生成一个容器2
  echarts.registerMap("china", (chinaJson as any))
  myMap.showLoading() // 加载loading

  // 请求数据
  let res = await axios('/api/ug/api/wuhan/app/data/list-total?t=330415245809')
  // data.areaTree = res.data.data.areaTree;
  data.areaTree = getPageList(res.data.data.areaTree as IAreaTree[]);
  data.showList = data.areaTree[0];
  data.chinaDayList = res.data.data.chinaDayList;
  data.chinaTotal = res.data.data.chinaTotal;
  data.china = res.data.data.areaTree.find((v: any) => v.id === "0").children
  data.hbData = data.china.find((v) => v.id === "420000");
  let mapData: any[] = [];
  data.china.map((v: any) => {
    mapData.push({
      name: v.name,
      value: v.total.confirm - v.total.dead - v.total.heal || 0
    })
  })
  let map1Data: any[] = [];
  data.china.map((v:any) => {
    map1Data.push({
      name: v.name,
      value: v.total.confirm
    })
  })
  myMap.hideLoading(); // 关闭loading
  myMap.setOption({
    ...optionMap,
    series: {
      ...series,
      data: mapData
    }
  })
  series.name = "累积确诊"
  myMap2.setOption({
    ...optionMap,
    series: {
      ...series,
      data: map1Data
    }
  })
}


export {
  InteData,
  InteDataFun
}