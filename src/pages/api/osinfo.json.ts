import type { APIRoute } from 'astro'
import os from 'os'


export const GET:APIRoute = async () => {
  const data = {
    host: os.hostname(),
    user: os.userInfo().username,
    platform: os.platform(),
    arch: os.arch(),
    cpus: {
      info: os.cpus()[0],
      count: os.cpus().length
    },
    freeMem: ( os.freemem() / 1024 / 1024 ).toFixed(2),
    totalMem: ( os.totalmem() / 1024 / 1024 ).toFixed(2),
    release: os.release(),
    version: os.version(),
    uptime: (os.uptime()/60).toFixed(),
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  })
}