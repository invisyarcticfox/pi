import type { TempEntry, DayObj, TempData } from '../types'
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler, type ChartConfiguration, type ChartItem, type LinearScaleOptions } from 'chart.js'
import dataJson from '../data/temps.json'
const data:TempData = dataJson


const datasets = data.days.flatMap((dayObj:DayObj, dayIndex:number) => {
  const dayKey = Object.keys(dayObj)[0]
  const dayArray = dayObj[dayKey]
  if (!dayArray || dayArray.length === 0) return []
  

  return [{
    label: new Date(dayArray[0].timestamp).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }),
    data: dayArray.map(e => Number(e.temp.toFixed(2))),
    borderColor: `hsl(${dayIndex * 50}, 70%, 50%)`,
    backgroundColor: `hsl(${dayIndex * 50}, 70%, 50%, .05)`,
    fill: false,
    tension: .2
  }]
})

const labels = Array.from({ length:24 }, (_, h) => h.toString().padStart(2,'0') + ':00')


const ctx = document.querySelector('canvas#graph') as ChartItem

const config:ChartConfiguration<'line'> = {
  type: 'line',
  data: { labels, datasets },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label(context) {
            const dayLabel = context.dataset.label || ''
            const temp = context.parsed.y?.toFixed(2) + '°C'
            return `${dayLabel}: ${temp}`
          },
          // afterLabel(context) {
          //   const nums = context.dataset.data as number[]
          //   const avg = nums.reduce((a,b) => a + b, 0) / nums.length
          //   return `Average: ${avg.toFixed(2)}°C`
          // }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: { display: true, text: 'Temperature (C)' }
      },
      x: { title: { display: true, text: 'Hour of the day' } },
    },
    elements: {
      point: {
        radius: 5,
        hoverRadius: 8,
        hitRadius: 8
      }
    }
  }
}


Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend)
const chart = new Chart(ctx, config)


const toggle = document.querySelector<HTMLButtonElement>('button.format')!
toggle.addEventListener('click', () => {
  const yScale = chart.options.scales!.y as LinearScaleOptions
  yScale.beginAtZero = !yScale.beginAtZero
  if (yScale.beginAtZero) { yScale.max = 100 } else { delete yScale.max }

  chart.update()
})