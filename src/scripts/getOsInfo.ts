const elems = Object.fromEntries([...document.querySelectorAll<HTMLElement>('ul li b[data-key]')].map((el) => [el.dataset.key, el]))
let serverUptime = 0

type osinfo = {
  host: string
  user: string
  platform: string
  arch: string
  cpus: {
    info: {
      model: string
      speed: number
      times: { user: number, nice: number, sys: number, idle: number, irq: number, }
    }, count: number
  }
  freeMem: string
  totalMem: string
  release: string
  version: string
  uptime: string
}


async function getOsInfo() {
  try {
    const res = await fetch('/api/osinfo.json')
    const d:osinfo = await res.json()
    console.log(d)

    serverUptime = parseInt(d.uptime, 10)

    elems.user.textContent = `${d.user}@${d.host}`
    elems.platform.textContent = `${d.platform} ${d.arch}`
    elems.cpus.textContent = `${d.cpus.info.model} x${d.cpus.count}`
    elems.mem.textContent = `${(parseFloat(d.totalMem) - parseFloat(d.freeMem)).toFixed(2)}MB / ${d.totalMem}MB`
    elems.uptime.textContent = formatUptime(serverUptime)
    elems.release.textContent = d.release
    elems.version.textContent = d.version
  } catch (error) {
    console.error(error)
  }
}

function formatUptime(minutes:number):string {
  const totalHours = Math.floor(minutes / 60)
  const days = Math.floor(totalHours / 24)
  const hours = totalHours % 24
  const mins = minutes % 60

  return `${days} days, ${hours} hours, ${mins} minutes`
}


getOsInfo()
setInterval(getOsInfo, 10000)