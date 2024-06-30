import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/trpc'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),
  })

// Export handler for GET and POST requests
export { handler as GET, handler as POST }
