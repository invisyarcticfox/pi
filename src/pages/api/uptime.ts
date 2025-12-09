import type { APIRoute } from 'astro'


export const GET:APIRoute = async () => {
  try {
    const res = await fetch('http://localhost:3926/services')
    if (!res.ok) return new Response(JSON.stringify({ error: `Uptime request failed: ${res.status}`}), { status: res.status})
    const d = await res.json()
    return new Response(JSON.stringify(d), { headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Unable to reach services', details: (error as Error).message }), { status: 500 })
  }
}