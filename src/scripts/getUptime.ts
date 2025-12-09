import type { ServiceStatus } from '../types'


(async () => {
  try {
    const res = await fetch('/api/uptime')
    if (!res.ok) console.error(res.status, res.statusText)
    const {services}:ServiceStatus = await res.json()
    console.log(services)

    const cont = document.querySelector('.info .box.uptime')!
    const grid = cont.querySelector('.grid')!

    services.forEach(service => {
      const div = document.createElement('div')
      div.className = 'item'

      div.innerHTML = `
        <span class='status ${service.status}' title='${service.status}'>
          <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <circle cx="256" cy="256" r="256" />
          </svg>
        </span>
        ${service.name}
      `

      grid.appendChild(div)
    })

    cont.appendChild(grid)
  } catch (error) {
    console.error(error)
  }
})()