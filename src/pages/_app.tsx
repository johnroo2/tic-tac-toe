import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'aos/dist/aos.css';
import AOS from 'aos'
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="absolute inset-0 dots pointer-events-none z-[-1]"/>
      <Component {...pageProps}/>

    </div>
  )
}
