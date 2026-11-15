import { FadeIn, SectionTitle } from './AnimatedSection'
import { motion } from 'framer-motion'

const companies = [
  {
    name: 'Netradyne',
    homepage: 'https://www.netradyne.com/',
    logo: '/logo-netradyne.png',
    logoStyle: { width: 180, maxWidth: 'none', height: 36, objectFit: 'cover', mixBlendMode: 'lighten' },
    role: 'Enterprise Account Executive (Jan 2026 to Present)',
    takeaway:
      'Closed $1.16M in ARR across seven net-new wins in 2026: 170% of first-year ramp quota and 91% of the full $1.27M annual quota. Averaged $165K ARR per win, including a $332K ARR competitive displacement across 657 vehicles. Built executive ROI cases and led buying teams through pilots, security reviews, procurement, and negotiations.',
  },
  {
    name: 'Samsara',
    homepage: 'https://www.samsara.com/',
    logo: '/logo-samsara-current.svg',
    logoStyle: { width: 180, maxWidth: '100%', height: 'auto' },
    role: 'Account Executive, Mid-Market (Feb 2023 to Jan 2026)',
    takeaway:
      '118% avg attainment against a $900K quota across FY24 and FY25. Grew average deal size to $84K through multi-product attach and executive-aligned business cases. $4 to $5M in qualified pipeline annually, ~55% self-sourced. $250K competitive displacement. Two-time President\u2019s Club, top 10% of the Mid-Market sales org.',
  },
  {
    name: 'Applied Systems',
    homepage: 'https://www1.appliedsystems.com/en-us/',
    logo: '/logo-applied-current.svg',
    logoStyle: { width: 170, maxWidth: '100%', height: 'auto', maxHeight: 36 },
    role: 'Account Executive, Mid-Market (Jun 2021 to Feb 2023)',
    takeaway:
      'Worked with agency principals and operations leaders on agency management software replacements. Led discovery, stakeholder mapping, and business-case development throughout the sales process.',
  },
  {
    name: 'EZLynx',
    homepage: 'https://www.ezlynx.com/',
    logo: '/logo-ezlynx.png',
    logoStyle: { width: 140, objectFit: 'cover', mixBlendMode: 'lighten' },
    role: 'BDR to SMB AE (Nov 2017 to Jun 2021)',
    takeaway:
      'Started in outbound prospecting as a BDR and progressed to SMB Account Executive. Built relationships with insurance agencies and guided buyers through agency management software evaluations.',
  },
]

export default function WorkHistory() {
  return (
    <section id="experience" className="py-24 md:py-28 px-6">
      <div className="max-w-[860px] mx-auto">
        <FadeIn>
          <SectionTitle eyebrow="EXPERIENCE" title="Where I've Sold" />
        </FadeIn>

        {/* Timeline connector line (desktop only) */}
        <div className="hidden md:block relative mb-8">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-border" />
          <div className="flex justify-between relative z-10">
            {companies.map((c) => (
              <div key={c.name} className="w-2 h-2 rounded-full bg-accent" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {companies.map((company, i) => (
            <FadeIn key={company.name} delay={i * 0.1}>
              <motion.a
                href={company.homepage}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${company.name} — visit company homepage (opens in a new tab)`}
                className="group bg-surface-1 border border-border rounded-xl p-5 flex flex-col h-full hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent transition-colors"
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Logo */}
                <div className="h-10 mb-4 flex items-center justify-between gap-4">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-8 max-w-[140px] object-contain"
                    style={company.logoStyle}
                  />
                  <svg className="w-4 h-4 shrink-0 text-text-tertiary group-hover:text-accent group-focus-visible:text-accent transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M7 17 17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Role */}
                {company.role && (
                  <h3 className="font-heading text-[15px] font-semibold text-text-primary tracking-[-0.01em] mb-4">
                    {company.role}
                  </h3>
                )}

                {/* Takeaway */}
                {company.takeaway && (
                  <div className="mt-auto pt-4 border-t border-border-light">
                    <p className="text-[13px] italic text-text-tertiary leading-[1.65]">
                      "{company.takeaway}"
                    </p>
                  </div>
                )}
              </motion.a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
