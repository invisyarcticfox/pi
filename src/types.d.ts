export type osInfo = {
  cpuTemp: number
  memory: { free:number, total:number }
  disk: {
    percent: string
    source: string
    total: number
    used: number
  }
  uptime: number
}
export type allElems = {
  cpu: HTMLElement
  disk: HTMLElement
  mem: HTMLElement
  uptime: HTMLElement
}


export type TempEntry = { timestamp:Date|string, temp:number }
export type DayObj = { [key:string]: TempEntry[] | undefined }
export type TempData = { days:DayObj[] }

export type ServiceStatus = {
  services: {
    name: string
    status: 'online'|'offline'|'unknown'
  }[]
}