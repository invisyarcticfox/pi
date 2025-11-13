// @ts-check
import { defineConfig } from 'astro/config'
import node from '@astrojs/node';


// https://astro.build/config
export default defineConfig({
  build: { format: 'preserve' },
  trailingSlash: 'never',
  site: 'https://pi.invisyarcticfox.uk',

  server: {
    host: '0.0.0.0',
    port: 4321,
    allowedHosts: [ 'raspi', 'pi.invisyarcticfox.uk' ]
  },

  adapter: node({ mode: 'standalone' })
})
