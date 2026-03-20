import { Seo } from '../components/Seo'
import { Header } from '../components/sections/Header'
import { Hero } from '../components/sections/Hero'
import { Divisions } from '../components/sections/Divisions'
import { Tech } from '../components/sections/Tech'
import { LeadershipContact } from '../components/sections/LeadershipContact'
import { Footer } from '../components/sections/Footer'
import { SEO_COPY } from '../config/site'

export function Home() {
  return (
    <>
      <Seo title={SEO_COPY.home.title} description={SEO_COPY.home.description} />
      <Header />
      <main id="site-main">
        <Hero />
        <Divisions />
        <Tech />
        <LeadershipContact />
        <Footer />
      </main>
    </>
  )
}
