// @ts-check
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  build: { format: 'preserve' },
  trailingSlash: 'never',
  site: 'https://pi.invisyarcticfox.uk',
  server: {
    port: 4321,
    allowedHosts: [
      'raspi',
      'pi.invisyarcticfox.uk',
    ]
  }
})
