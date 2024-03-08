"use client";
import type { Metadata } from 'next'
import localfont from "next/font/local";
import { Inter } from 'next/font/google'
import './globals.css'
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const pokefont = localfont({
  src: [
    {
      path: "../../public/fonts/pokemon-firered-leafgreen-font-recreation.ttf",
      weight: "400",
    },
  ],
  variable: "--font-pokefont",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
    <html lang="en" className={[pokefont.variable].join(" ")}>
      <body>{children}</body>
    </html>
    </QueryClientProvider>
  )
}
