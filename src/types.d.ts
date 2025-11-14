export type osInfo = {
  host: string
  user: string
  platform: string
  arch: string
  cpu: {
    model: string
    speed: number
    times: { user:number, nice:number, sys:number, idle:number, irq:number, }
    temp: string
  }
  memory: { free:number, total:number }
  release: string
  version: string
  uptime: number
}

export type allElems = {
  user: HTMLElement
  platform: HTMLElement
  cpu: HTMLElement
  mem: HTMLElement
  uptime: HTMLElement
  release: HTMLElement
  version: HTMLElement
}