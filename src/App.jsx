import { useEffect } from 'react'
import StickyNav from './components/StickyNav'
import Hero from './components/Hero'
import NumbersBar from './components/NumbersBar'
import QuarterlyAttainment from './components/QuarterlyAttainment'
import WorkHistory from './components/WorkHistory'
import SalesProfile from './components/SalesProfile'
import InterviewGuide from './components/InterviewGuide'
import HowIWork from './components/HowIWork'
import MarqueeDeals from './components/MarqueeDeals'
import Losses from './components/Losses'
import AboutDave from './components/AboutDave'
import ResumeDownload from './components/ResumeDownload'
import Footer from './components/Footer'
import DealStory from './components/DealStory'
import { dealCards } from './data/dealCards'
import { dealStories } from './data/dealStories'
import { lossCards } from './data/lossCards'
import { lossStories } from './data/lossStories'
import { SectionDivider } from './components/AnimatedSection'

export default function App() {
  useEffect(() => {
    const section = document.getElementById(window.location.hash.slice(1))
    if (section) {
      window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - 96 })
    }
  }, [])

  const slug = window.location.pathname.match(/^\/deals\/([^/]+)(?:\/|\/index\.html)?$/)?.[1]
  const dealIndex = dealCards.findIndex(deal => deal.slug === slug)
  if (dealIndex >= 0 && dealStories[slug]) {
    return <DealStory deal={dealCards[dealIndex]} story={dealStories[slug]} nextDeal={dealCards[(dealIndex + 1) % dealCards.length]} />
  }

  const lossSlug = window.location.pathname.match(/^\/losses\/([^/]+)(?:\/|\/index\.html)?$/)?.[1]
  const lossIndex = lossCards.findIndex(deal => deal.slug === lossSlug)
  if (lossIndex >= 0 && lossStories[lossSlug]) {
    return <DealStory deal={lossCards[lossIndex]} story={lossStories[lossSlug]} nextDeal={lossCards[(lossIndex + 1) % lossCards.length]} collectionHref="/#losses" collectionLabel="Back to losses" />
  }

  return (
    <>
      <StickyNav />
      <Hero />
      <InterviewGuide />
      <NumbersBar />
      <QuarterlyAttainment />
      <SectionDivider />
      <WorkHistory />
      <SalesProfile />
      <HowIWork />
      <MarqueeDeals />
      <Losses />
      <AboutDave />
      <ResumeDownload />
      <Footer />
    </>
  )
}
