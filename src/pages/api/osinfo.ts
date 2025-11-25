import type { APIRoute } from 'astro'
import os from 'os'
import fs from 'fs'
import { execSync } from 'child_process'

function getCpuTemp():string|null {
  try {
    const raw =  fs.readFileSync('/sys/class/thermal/thermal_zone0/temp', 'utf-8')
    const milDeg = parseFloat(raw.trim())
    if (!isNaN(milDeg)) return (milDeg / 1000).toFixed(1)
    return null
  } catch (error) {
    console.error(error)
    return null
  }
}

function getDiskInfo():{used:number,total:number,percent:string,source:string}|null {
  try {
    const out = execSync(`df -B1 --output=source,fstype,size,used,pcent '/' | tail -n 1`, { encoding: 'utf-8' }).trim()
    const parts = out.split(/\s+/)
    if (parts.length < 5) return null

    const [ source, fsType, sizeStr, usedStr, percent ] = parts
    const total = byteToMega(parseInt(sizeStr))
    const used = byteToMega(parseInt(usedStr))

    return { used, total, percent, source }
  } catch (error) {
    console.error(error)
    return null
  }
}

function byteToMega(bytes:number):number { return parseFloat((bytes / (1024 * 1024)).toFixed(2)) }


export const GET:APIRoute = async () => {
  const data = {
    cpuTemp: Number(getCpuTemp()),
    memory: { free: byteToMega(os.freemem()), total: byteToMega(os.totalmem()) },
    disk: getDiskInfo(),
    uptime: os.uptime()
  }

  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
}