interface IData {
  areaTree: any[],
  chinaDayList: any[],
  chinaTotal: object,
  china: any[],
  hbData: object,
  type: number,
  mapType: number,
  lineType: number,
  lastUpdateTime: string
}

interface IAreaTree {
  children: any[],
  extData: object,
  id: string,
  lastUpdateTime: string,
  name: string,
  today: object,
  total: object
}

interface IchinaDayList {
  date: string,
  extData: object,
  lastUpdateTime: string,
  today: object,
  total: object
}

interface IchinaTotal {
  extData: object,
  today: object,
  total: object
}

export type{
  IData,
  IAreaTree,
  IchinaDayList,
  IchinaTotal
}