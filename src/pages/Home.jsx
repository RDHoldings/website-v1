import { useEffect } from 'react'
import { Header } from '../components/sections/Header'
import { Hero } from '../components/sections/Hero'
import { Divisions } from '../components/sections/Divisions'
import { Tech } from '../components/sections/Tech'
import { Footer } from '../components/sections/Footer'

const HOME_TITLE = 'Red Domino Holdings | Strategic Scaling. Infinite Potential.'

export function Home() {
  useEffect(() => {
    document.title = HOME_TITLE
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Divisions />
        <Tech />
        <Footer />
      </main>
    </>
  )
}
