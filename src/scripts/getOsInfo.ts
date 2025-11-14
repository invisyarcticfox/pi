import type { allElems, osInfo } from '../types'
import { formatUptime } from './utils'

const elems:allElems = Object.fromEntries([...document.querySelectorAll<HTMLElement>('ul li b[data-key]')].map((el) => [el.dataset.key, el]))

async function getOsInfo() {
  try {
    const res = await fetch('/api/osinfo.json')
    const d:osInfo = await res.json()
    console.log(d)

    elems.user.textContent = `${d.user}@${d.host}`
    elems.platform.textContent = `${d.platform} ${d.arch}`
    elems.cpu.textContent = `${d.cpu.model} ${(d.cpu.speed / 1000)}GHz (${d.cpu.temp}°C)`
    elems.release.textContent = d.release
    elems.version.textContent = d.version

    const usedMem = d.memory.total - d.memory.free
    const percMem = (( usedMem / d.memory.total ) * 100).toFixed()
    elems.mem.textContent = `${usedMem.toFixed(2)}MB / ${d.memory.total}MB (${percMem}%)`

    let currUptime = d.uptime
    elems.uptime.textContent = formatUptime(currUptime)
    setInterval(() => { currUptime++, elems.uptime.textContent = formatUptime(currUptime) }, 1000)
  } catch (error) {
    console.error(error)
  }
}


getOsInfo()