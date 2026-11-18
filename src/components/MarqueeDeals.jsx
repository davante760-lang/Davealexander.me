import IndustryMark from './IndustryMark'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FadeIn, SectionTitle } from './AnimatedSection'
import { dealCards as deals } from '../data/dealCards'

function DealSection({ id, title, description, deals, className = 'py-24 md:py-28 px-6' }) {
  const [expanded, setExpanded] = useState(false)
  const featuredDeals = deals.slice(0, 2)
  const moreDeals = deals.slice(2)
  const moreDealsId = `${id}-more`

  return (
    <section id={id} className={className}>
      <div className="max-w-[860px] mx-auto">
        <FadeIn>
          <SectionTitle eyebrow="MARQUEE DEALS" title={title} />
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="text-[16.5px] leading-[1.75] text-text-secondary max-w-[680px] mb-8">
            {description}
            <span className="block mt-2 text-[14px] text-text-tertiary">Customer identities are anonymized. Deal figures are retained.</span>
          </p>
        </FadeIn>

        <DealGrid deals={featuredDeals} />

        {moreDeals.length > 0 && (
          <>
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={moreDealsId}
              onClick={() => setExpanded(value => !value)}
              className="mt-6 w-full min-h-[56px] flex items-center justify-center gap-3 rounded-xl bg-accent-strong px-6 py-4 font-heading text-[17px] font-semibold text-white shadow-lg shadow-accent/15 hover:bg-accent-strong-hover focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 transition-colors"
            >
              {expanded ? 'Show fewer wins' : `View all ${deals.length} wins`}
              <svg aria-hidden="true" className={`h-5 w-5 shrink-0 ${expanded ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div id={moreDealsId} hidden={!expanded}>
              <div className="mt-5">
                <DealGrid deals={moreDeals} />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

function DealGrid({ deals }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
      {deals.map((deal, index) => {
        const Card = deal.href ? motion.a : motion.article
        return (
          <FadeIn key={deal.name} delay={0.1 + (index % 2) * 0.08}>
            <Card
              href={deal.href}
              aria-label={deal.href ? `Read ${deal.name} deal story` : undefined}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className={`bg-surface-1 border border-border rounded-xl p-5 h-full flex flex-col ${deal.href ? 'group hover:border-accent/60 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 transition-colors' : ''}`}
            >
              <div className="h-[126px] rounded-lg bg-surface-2 border border-border-light flex items-center justify-center px-4 mb-5 overflow-hidden">
                <IndustryMark type={deal.icon} />
              </div>
              <h3 className="font-heading text-[17px] font-semibold text-text-primary tracking-[-0.01em] mb-1.5">
                {deal.name}
              </h3>
              <p className="text-[14px] leading-[1.6] text-text-tertiary mb-4">{deal.industry}</p>
              <div className="mt-auto pt-4 border-t border-border-light flex flex-wrap items-center justify-between gap-3">
                <div className="shrink-0">
                  <span className="font-heading text-[23px] font-semibold tracking-[-0.03em] text-accent">{deal.value}</span>
                  {deal.valueLabel && <span className="block text-[12px] uppercase tracking-[0.12em] text-text-tertiary mt-0.5">{deal.valueLabel}</span>}
                </div>
                <div className="flex flex-col items-end gap-1.5 max-w-[140px] text-right">
                  <span className="text-[12px] leading-[1.5] text-text-tertiary">{deal.cycle}</span>
                  <span className="text-[11px] uppercase tracking-[0.1em] font-medium text-teal bg-teal-dim rounded-full px-2.5 py-1.5 text-center leading-[1.5]">
                    {deal.tag}
                  </span>
                </div>
              </div>
              {deal.href && (
                <span className="mt-4 flex items-center justify-between text-[14px] font-medium text-accent">
                  Read deal story
                  <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              )}
            </Card>
          </FadeIn>
        )
      })}
    </div>
  )
}

export default function MarqueeDeals() {
  return (
    <DealSection
      id="marquee-deals"
      title="Deals"
      description="Selected wins across transportation, distribution, construction, and industrial operations."
      deals={deals}
    />
  )
}
