import { motion } from 'framer-motion'
import { FadeIn, SectionTitle } from './AnimatedSection'
import { lossCards } from '../data/lossCards'

export default function Losses() {
  return (
    <section id="losses" className="py-24 md:py-28 px-6 bg-surface-1 border-y border-border">
      <div className="max-w-[860px] mx-auto">
        <FadeIn>
          <SectionTitle eyebrow="LESSONS FROM THE FIELD" title="Losses" />
          <p className="text-[16.5px] leading-[1.75] text-text-secondary max-w-[680px] mb-8">
            Two deals I lost, the decisions I own, and the lessons I take into the next pursuit.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {lossCards.map((deal, index) => (
            <FadeIn key={deal.slug} delay={0.1 + index * 0.08}>
              <motion.a
                href={deal.href}
                aria-label={`Read ${deal.name} loss story and lessons`}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="group bg-bg border border-border rounded-xl p-5 h-full flex flex-col hover:border-accent/60 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 transition-colors"
              >
                <div className="h-[126px] rounded-lg bg-surface-2 border border-border-light flex items-center justify-center px-6 mb-5 overflow-hidden" style={deal.logoPanelStyle}>
                  {deal.logo ? (
                    <img src={deal.logo} alt={`${deal.name} logo`} className="max-w-full max-h-[80px] w-auto object-contain" style={deal.logoStyle} loading="lazy" />
                  ) : (
                    <span aria-hidden="true" className="font-heading text-[32px] font-semibold tracking-[-0.03em] text-text-primary">{deal.name}</span>
                  )}
                </div>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <h3 className="font-heading text-[20px] font-semibold tracking-[-0.02em]">{deal.name}</h3>
                  <span className="text-[11px] uppercase tracking-[0.1em] font-medium text-text-tertiary border border-border rounded-full px-2.5 py-1.5">Closed lost</span>
                </div>
                <p className="text-[14px] leading-[1.6] text-text-tertiary mb-4">{deal.industry}</p>
                <p className="text-[16px] leading-[1.75] text-text-secondary mb-6">{deal.summary}</p>
                <div className="mt-auto pt-5 border-t border-border-light">
                  <span className="text-[11px] uppercase tracking-[0.15em] text-text-tertiary">What I learned</span>
                  <p className="font-heading text-[18px] font-medium leading-[1.5] text-text-primary mt-2">{deal.lesson}</p>
                  <span className="mt-5 flex items-center justify-between text-[14px] font-medium text-accent">
                    Read the story &amp; lessons
                    <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </motion.a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
