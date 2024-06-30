import { PrismaClient } from '@prisma/client'

declare global {
 // eslint-disable-next-line no-var
 var cachedPrisma: PrismaClient
}

let prisma: PrismaClient

// Check if the application is running in production environment
if (process.env.NODE_ENV === 'production') {
 // Create a new instance of PrismaClient for production
 prisma = new PrismaClient()
} else {
 // Use the cached PrismaClient instance for non-production environments
 if (!global.cachedPrisma) {
   global.cachedPrisma = new PrismaClient()
 }
 prisma = global.cachedPrisma
}

export const db = prisma