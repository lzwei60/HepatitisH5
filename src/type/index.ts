// 整体数据
interface IData {
  areaTree: any[],      // 世界地区数据
  showList: any[],
  chinaDayList: any[],  // 中国当日数据
  chinaTotal: object,   // 中国总体数据
  china: any[],         // 中国地区数据
  hbData: object,       // 湖北数据
  type: number,         // 展示类型 1为全国 2为湖北
  mapType: number,      // 地图类型
  lineType: number,     // 
  lastUpdateTime: string  // 最后更新时间
  isScroll: boolean     // 是否加载
}
// 世界地区数据类型
interface IAreaTree {
  id?: string, 
  name?: string,
  lastUpdateTime?: string,
  extData: ExtData,   // ExtData数据类型
  today: Itoday,
  total: Itoday,
  children?: IAreaTree[] // 单个地区总体数据类型
}
// 单个地区单日数据类型
interface IchinaDayList {
  date: string,
  lastUpdateTime: string,
  extData: ExtData,
  today: Itoday,
  total: Itoday
}
// extData数据类型
interface ExtData {
  incrNoSymptom?: number,
  noSymptom?: number
}
// 今天数据
interface Itoday {
  confirm: number,
  dead: number,
  heal: number,
  severe: null | number,
  storeConfirm?: number,
  input?: number,
  suspect: null | number
}

export type{
  IData,
  IAreaTree,
  IchinaDayList,
}