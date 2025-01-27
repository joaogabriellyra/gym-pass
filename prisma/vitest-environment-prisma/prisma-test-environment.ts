import type { Environment } from 'vitest/environments'

export default (<Partial<Environment>>{
  name: 'prisma',
  async setup() {
    console.log('Executou')

    return {
      teardown() {},
    }
  },
})
