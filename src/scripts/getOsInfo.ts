import type { allElems, osInfo } from '../types'


function formatUptime(seconds:number):string {
  const days = Math.floor(seconds / (3600 * 24))
  seconds %= (3600 * 24)
  const hours = Math.floor(seconds / 3600)
  seconds %= 3600
  const mins = Math.floor(seconds / 60)
  const remSecs = Math.floor(seconds % 60)

  const pad = (num:number) => String(num).padStart(2,'0')

  return `${pad(days)}:${pad(hours)}:${pad(mins)}:${pad(remSecs)}`
}

const elems:allElems = Object.fromEntries([...document.querySelectorAll<HTMLElement>('ul li [data-key]')].map((el) => [el.dataset.key, el]))


async function getOsInfo() {
  try {
    const res = await fetch('/api/osinfo')
    const d:osInfo = await res.json()
    console.log(d)

    elems.cpu.textContent = `(${d.cpuTemp}°C)`

    const disk = {
      used: (d.disk.used / 1024).toFixed(2),
      total: (d.disk.total/ 1024).toFixed(2)
    }
    elems.disk.innerHTML = `${disk.used}GB / ${disk.total}GB <i>(${d.disk.percent})</i>`
    
    const usedMem = d.memory.total - d.memory.free
    const percMem = (( usedMem / d.memory.total ) * 100).toFixed()
    elems.mem.innerHTML = `${usedMem.toFixed(2)}MB / ${d.memory.total}MB <i>(${percMem}%)</i>`
    
    let currUptime = d.uptime
    elems.uptime.textContent = formatUptime(currUptime)
    setInterval(() => { currUptime++, elems.uptime.textContent = formatUptime(currUptime) }, 1000)
  } catch (error) {
    console.error(error)
  }
}

getOsInfo()