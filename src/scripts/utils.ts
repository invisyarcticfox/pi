import fs from 'fs'


export function getCpuTemp():string|null {
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

export function byteToMega(bytes:number):number { return parseFloat((bytes / (1024 * 1024)).toFixed(2)) }

export function formatUptime(seconds:number):string {
  const days = Math.floor(seconds / (3600 * 24))
  seconds %= (3600 * 24)
  const hours = Math.floor(seconds / 3600)
  seconds %= 3600
  const mins = Math.floor(seconds / 60)
  const remSecs = Math.floor(seconds % 60)

  const parts:string[] = []
  parts.push(`${days} day${days === 1 ? '' : 's'}`)
  parts.push(`${hours} hour${hours === 1 ? '' : 's'}`)
  parts.push(`${mins} minute${mins === 1 ? '' : 's'}`)
  parts.push(`${remSecs} second${remSecs === 1 ? '' : 's'}`)

  return parts.join(', ')
}