import axios from 'axios';
import type { IData,IAreaTree,IchinaDayList,IchinaTotal } from "../type/index";
class InteData implements IData{
  areaTree: IAreaTree[] = []
  chinaDayList: IchinaDayList[] = []
  chinaTotal: object = {}
  //chinaTotal: IchinaTotal = {extData: {},today: {},total: {}}
  china: any[] = []
  hbData: object = {}
  mapType: number = 1
  lineType: number = 1
  lastUpdateTime: string = ""
  type: number = 1
}

const InteDataFun = (data:InteData) => {
  console.log(data)
  axios('/api/ug/api/wuhan/app/data/list-total?t=330415245809').then(res => {
    data.areaTree = res.data.data.areaTree;
    data.chinaDayList = res.data.data.chinaDayList;
    data.chinaTotal = res.data.data.chinaTotal;
    data.china = data.areaTree.find((v) => v.id === "0").children;
    data.hbData = data.china.find((v)=>v.id === "420000");
  })
}


export {
  InteData,
  InteDataFun
}