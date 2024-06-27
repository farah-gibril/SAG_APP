'use client'

import { trpc } from '@/app/_trpc/client'
import {
 QueryClient,
 QueryClientProvider,
} from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { PropsWithChildren, useState } from 'react'

const Providers = ({ children }: PropsWithChildren) => {
 // Create a new instance of QueryClient
 const [queryClient] = useState(() => new QueryClient())
 
 // Create a new tRPC client with the httpBatchLink
 const [trpcClient] = useState(() =>
   trpc.createClient({
     links: [
       httpBatchLink({
         url: ("http://localhost:3000/api/trpc"),
       }),
     ],
   })
 )

 return (
   // Provide the tRPC client and query client to the application
   <trpc.Provider
     client={trpcClient}
     queryClient={queryClient}>
     {/* Provide the query client to the application */}
     <QueryClientProvider client={queryClient}>
       {children}
     </QueryClientProvider>
   </trpc.Provider>
 )
}

export default Providers