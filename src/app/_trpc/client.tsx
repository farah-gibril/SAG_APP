import { AppRouter } from '@/trpc'
import { createTRPCReact } from '@trpc/react-query'

// Initialize tRPC with AppRouter
export const trpc = createTRPCReact<AppRouter>({})
