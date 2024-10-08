import { type ClassValue, clsx } from 'clsx'
import { Metadata } from 'next'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  if (typeof window !== 'undefined') return path
  if (process.env.NEXT_PUBLIC_APP_URL)
    return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}${path}`
  return `http://localhost:${process.env.PORT ?? 3000}${path}`
}

export function constructMetadata({
  title = "SAG - Somali Graves Association",
  description = "SAG is a SaaS that specializes in managing graves and burial sites.",
  image = "/logo.jpg",
  icons = "/logo.jpg",
  noIndex = false
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "x"
    },
    icons,
    metadataBase: new URL('https://sag-app-pi.vercel.app'),
    // themeColor: '#FFF',
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}