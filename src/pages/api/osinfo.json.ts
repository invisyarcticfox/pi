export const prerender = false
import os from 'os'
import type { APIRoute } from 'astro'
import { getCpuTemp, byteToMega } from '../../scripts/utils'


export const GET:APIRoute = async () => {
  const data = {
    host: os.hostname(),
    user: os.userInfo().username,
    platform: os.platform(),
    arch: os.arch(),
    cpu: { ...os.cpus()[0], temp: getCpuTemp() },
    memory: { free: byteToMega(os.freemem()), total: byteToMega(os.totalmem()) },
    release: os.release(),
    version: os.version(),
    uptime: os.uptime()
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  })
}