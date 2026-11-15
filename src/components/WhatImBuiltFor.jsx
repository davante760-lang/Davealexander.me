import { motion } from 'framer-motion'
import { FadeIn, SectionTitle } from './AnimatedSection'

const storyLinkClass = 'font-medium text-text-primary underline decoration-accent/50 underline-offset-4 transition-colors hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 rounded-sm'

const cards = [
  {
    title: 'Full-Cycle Revenue Ownership',
    body: 'I’m built for roles that require me to generate pipeline and carry opportunities through close. My experience spans self-sourced outbound, partner introductions, and taking ownership of stalled evaluations.',
    proof: <>$4–5M in annual qualified pipeline at Samsara, approximately 55% self-sourced; revived and closed <a href="/deals/odom/" className={storyLinkClass}>Odom</a> at Netradyne.</>,
  },
  {
    title: 'Competitive Enterprise Replacements',
    body: 'I’m comfortable selling into accounts with an established vendor and real switching costs. These deals require a compelling business case, support across the buying team, and a practical transition plan.',
    proof: <>Three Samsara and Lytx displacements totaling $691K ARR at Netradyne: <a href="/deals/odom/" className={storyLinkClass}>Odom</a>, <a href="/deals/texas-transeastern/" className={storyLinkClass}>Texas TransEastern</a>, and <a href="/deals/bjs-logistics/" className={storyLinkClass}>BJ’s</a>.</>,
  },
  {
    title: 'Operational Buyers and Executive Value',
    body: 'My experience is strongest with products that affect safety, productivity, visibility, and operating costs. I understand how to connect frontline requirements with an investment that leadership can justify.',
    proof: <><a href="/deals/calfrac/" className={storyLinkClass}>Calfrac’s</a> business case built around customer accident data; <a href="/deals/odom/" className={storyLinkClass}>Odom’s</a> financial justification for a 657-vehicle replacement.</>,
  },
  {
    title: 'Leading Complex Deals Across Teams',
    body: 'I’m suited to opportunities that require coordination across sales engineering, partners, finance, legal, and implementation. I’ve worked through changing stakeholders, budget constraints, contract reviews, and rollout requirements to reach a decision.',
    proof: <><a href="/deals/bjs-logistics/" className={storyLinkClass}>BJ’s</a> four-site rollout planning, <a href="/deals/miami-yellow-cab/" className={storyLinkClass}>Miami’s</a> payment structure, and <a href="/deals/kodiak-building-partners/" className={storyLinkClass}>Kodiak’s</a> changing buying team.</>,
  },
]

export default function WhatImBuiltFor() {
  return (
    <section id="built-for" className="bg-surface-1 border-b border-border py-24 md:py-28 px-6">
      <div className="max-w-[860px] mx-auto">
        <FadeIn>
          <SectionTitle eyebrow="FIT" title="What I'm Built For" />
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="text-[16.5px] leading-[1.75] text-text-secondary max-w-[680px] mb-8">
            The sales challenges where my experience is most useful.
          </p>
        </FadeIn>

        <div className="flex flex-col gap-4">
          {cards.map((card, i) => (
            <FadeIn key={card.title} delay={0.1 + i * 0.06}>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="bg-surface-2 border border-border rounded-xl p-5"
              >
                <h3 className="font-heading font-medium text-text-primary mb-2">{card.title}</h3>
                <p className="text-[16.5px] leading-[1.75] text-text-secondary">{card.body}</p>
                <p className="mt-4 border-t border-border pt-3 text-[15px] leading-[1.75] text-text-secondary">
                  <span className="font-medium text-accent-hover">Proof: </span>{card.proof}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
