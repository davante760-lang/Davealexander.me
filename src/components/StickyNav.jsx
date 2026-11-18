import { useEffect, useState } from 'react'

// Pill-style floating nav matching the Claude Design mood board.
// Replaces the prior full-width 9-link sticky bar. Links map to the
// 1stInterviewsite sections that actually render (see src/App.jsx).
const navLinks = [
  { id: 'interview-guide', label: 'Interview guide' },
  { id: 'experience',     label: 'Experience' },
  { id: 'marquee-deals', label: 'Deals' },
  { id: 'losses', label: 'Losses' },
]

// The menu shares the same accent palette as the rest of the site.
const COBALT = 'var(--color-accent-strong)'
const COBALT_BRIGHT = 'var(--color-accent-strong-hover)'

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTo(id) {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 96
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <nav
      className="fixed max-w-[calc(100%-24px)] left-1/2 top-5 z-50 -translate-x-1/2 transition-all duration-300"
      style={{ willChange: 'transform' }}
    >
      <div
        className="flex items-center gap-1.5 sm:gap-3 whitespace-nowrap rounded-full backdrop-blur-xl px-3 sm:px-4 py-2"
        style={{
          background: scrolled ? 'rgba(14,16,22,0.82)' : 'rgba(14,16,22,0.64)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: scrolled
            ? '0 12px 48px -16px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.02)'
            : '0 8px 32px -12px rgba(0,0,0,0.4)',
          transition: 'background 250ms ease, box-shadow 250ms ease',
        }}
      >
        {/* Logo mark + wordmark */}
        <a href="/" className="flex items-center gap-1.5 sm:gap-2 pl-1 sm:pl-2 pr-0 sm:pr-2 group" aria-label="Dave Alexander home">
          <span
            className="inline-block h-4 w-4 rounded-[4px]"
            style={{
              background: COBALT,
              boxShadow: `0 0 14px -2px ${COBALT}`,
            }}
            aria-hidden="true"
          />
          <span className="font-semibold text-[15px] sm:text-[16px] text-white tracking-[-0.01em]">
            Dave Alexander
          </span>
        </a>

        {/* Divider between wordmark and links (desktop only) */}
        <span
          aria-hidden="true"
          className="hidden md:block h-5 w-px"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        />

        {/* Nav links (hidden below md) */}
        <div className="hidden md:flex items-center">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-[15px] text-white/65 hover:text-white px-2.5 lg:px-3 py-1.5 rounded-full transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA. Primary action on this personal-brand page is the resume section. */}
        <button
          onClick={() => scrollTo('resume')}
          className="inline-flex items-center gap-1.5 rounded-full text-[14px] sm:text-[15px] font-medium text-white pl-3 pr-2.5 sm:pl-4 sm:pr-3.5 py-2 ml-0 sm:ml-2 transition-all duration-200"
          style={{
            background: COBALT,
            boxShadow: `0 4px 16px -4px color-mix(in srgb, ${COBALT} 50%, transparent)`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = COBALT_BRIGHT
            e.currentTarget.style.boxShadow = `0 6px 22px -4px color-mix(in srgb, ${COBALT_BRIGHT} 67%, transparent)`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = COBALT
            e.currentTarget.style.boxShadow = `0 4px 16px -4px color-mix(in srgb, ${COBALT} 50%, transparent)`
          }}
        >
          Get resume
          <span aria-hidden="true" className="text-[16px] leading-none">→</span>
        </button>
      </div>
    </nav>
  )
}
