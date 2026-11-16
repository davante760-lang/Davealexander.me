import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FadeIn, SectionTitle } from './AnimatedSection'

const numbers = [
  {
    value: '$1.16M',
    label: '2026 Net-New ARR',
    context: 'Seven account wins at Netradyne, averaging $165K in ARR per win.',
    prefix: '$',
    number: 1.16,
    suffix: 'M',
    decimals: 2,
  },
  {
    value: '$331.9K',
    label: 'Competitive Displacement ARR',
    context: 'Odom: 657 vehicles and $1.66M in five-year contract value. Won at Netradyne in 2026.',
    prefix: '$',
    number: 331.9,
    suffix: 'K',
    decimals: 1,
  },
  {
    value: '170%',
    label: 'First-Year Ramp Attainment',
    context: 'Netradyne, 2026. Also reached 91% of the full $1.27M annual quota.',
    prefix: '',
    number: 170,
    suffix: '%',
    decimals: 0,
  },
  {
    value: 'Q4 FY25',
    label: 'Above and Beyond Award',
    context: 'Samsara: returned from a full quarter of parental leave with no new pipeline generated during that period. Rebuilt through outbound calls, created urgency to close, and met a fully ramped quota.',
    animated: false,
  },
]

function AnimatedNumber({ prefix = '', number, suffix = '', decimals = 0, animated = true, value }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(animated ? `${prefix}0${suffix}` : value)

  useEffect(() => {
    if (!isInView || !animated) return

    const duration = 1400
    const startTime = performance.now()
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4)

    function tick(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutQuart(progress)
      const current = easedProgress * number

      if (decimals > 0) {
        setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`)
      } else {
        setDisplay(`${prefix}${Math.round(current)}${suffix}`)
      }

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [isInView, animated, number, prefix, suffix, decimals])

  return (
    <span ref={ref}>{display}</span>
  )
}

export default function NumbersBar() {
  return (
    <section id="numbers" className="bg-surface-1 border-b border-border py-24 md:py-28 px-6">
      <div className="max-w-[860px] mx-auto">
        <FadeIn>
          <SectionTitle eyebrow="STATS" title="Track Record" />
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {numbers.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.08}>
              <motion.div
                className="text-center md:text-left"
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="font-heading text-accent text-[34px] md:text-[44px] font-semibold tracking-[-0.03em] leading-none tabular-nums">
                  <AnimatedNumber
                    prefix={item.prefix}
                    number={item.number}
                    suffix={item.suffix}
                    decimals={item.decimals}
                    animated={item.animated !== false}
                    value={item.value}
                  />
                </div>
                <div className="text-[12px] uppercase tracking-[0.15em] text-text-tertiary mt-3 font-medium">
                  {item.label}
                </div>
                <p className="text-[15px] leading-[1.6] text-text-secondary mt-2 max-w-[360px] mx-auto md:mx-0">
                  {item.context}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
