import { SectionTitle } from './AnimatedSection'

const answers = [
  {
    id: 'pipeline',
    question: 'How do you create your own pipeline?',
    answer: 'I look for a business change that gives me a relevant reason to contact an account. In the Food Manufacturer deal, I learned through a professional connection that they were evaluating a new TMS their incumbent couldn’t integrate with. I prospected into that gap, then used discovery to identify safety stakeholders and expand the opportunity.',
    proof: 'Approximately 55% of my qualified pipeline at Samsara was self-sourced.',
    href: '/deals/food-manufacturer/',
    link: 'See how I opened the Food Manufacturer account',
  },
  {
    id: 'territory',
    question: 'How do you prioritize a new territory?',
    answer: 'I start with product fit, a meaningful operating problem, and a reason to consider change. A system replacement or renewal gives me a starting point; discovery tells me who owns the problem and whether it matters enough to act. I use that evidence to decide where to invest more time.',
    proof: 'The Food Manufacturer story shows how a specific buying trigger became a broader opportunity.',
    href: '/deals/food-manufacturer/#account-plan',
    link: 'Explore the account-plan walkthrough',
  },
  {
    id: 'competitive-deal',
    question: 'How do you win a complex competitive deal?',
    answer: 'I connect the evaluation to a financial decision and a practical plan for switching. In the Beverage Distributor deal, I coordinated the trial, equipped our champion for the President’s review, and worked through installation costs and commercial terms before the renewal notice deadline. That helped turn a stalled evaluation into a signed agreement.',
    proof: 'Beverage Distributor: $331.9K ARR and $1.66M in five-year contracted value; closed 204 days after I took over.',
    href: '/deals/beverage-distributor/',
    link: 'Read the Beverage Distributor story',
  },
  {
    id: 'sales-engineering',
    question: 'How do you work with sales engineers?',
    answer: 'I bring the customer’s priorities, buying-process context, and commercial ownership. For the Oilfield Services Provider, we built the business case around the customer’s accident history, keeping the projected financial value connected to the operating problem.',
    proof: 'The Oilfield Services Provider’s business case projected 4.5× five-year ROI and a 10.9-month payback.',
    href: '/deals/oilfield-services/',
    link: 'See the Oilfield Services Provider business case',
  },
  {
    id: 'lessons',
    question: 'What have losses taught you?',
    answer: 'The Logistics Provider loss taught me that strong safety results cannot substitute for proving the buyer’s everyday workflows. Installation, hardware mobility, and coaching needed to be central to the evaluation. My takeaway is to agree on the customer’s success criteria early and recheck who will make the final decision.',
    proof: 'The Logistics Provider story includes why we lost, what I own, and what I take forward.',
    href: '/losses/logistics-provider/',
    link: 'Read the Logistics Provider lessons',
  },
  {
    id: 'next-role',
    question: 'What are you looking for next?',
    answer: 'I’m looking for an enterprise role selling technology that matters to day-to-day operations, with room to win new customers and grow existing accounts. I’m strongest where I can own the territory, build a defensible business case, and work closely with a strong technical team.',
    proof: 'My experience spans insurance software, connected operations, and AI fleet safety.',
    href: '#sales-profile',
    link: 'See my sales role at a glance',
  },
]

export default function InterviewGuide() {
  return (
    <section id="interview-guide" aria-label="Interview guide" className="px-6 py-16 md:py-20 bg-surface-1 border-b border-border">
      <div className="max-w-[860px] mx-auto">
        <SectionTitle eyebrow="START HERE" title="Interview Guide" />
        <p className="text-[17px] leading-relaxed text-text-secondary -mt-3 mb-7">
          Six questions. Short answers. The deals behind them.
        </p>
        <div className="space-y-3">
          {answers.map((item, index) => (
            <details key={item.id} name="interview-guide" id={`interview-guide-${item.id}`} className="interview-answer group rounded-xl border border-border bg-bg open:border-accent/50 open:bg-surface-2 scroll-mt-28">
              <summary className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-5 rounded-xl list-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 hover:bg-surface-2 transition-colors">
                <span aria-hidden="true" className="text-[13px] tabular-nums text-accent-hover font-medium">{String(index + 1).padStart(2, '0')}</span>
                <span className="font-heading font-medium text-[17px] sm:text-[18px] leading-snug flex-1">{item.question}</span>
                <svg aria-hidden="true" className="w-5 h-5 shrink-0 text-accent-hover" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M5 12h14" strokeLinecap="round" />
                  <path className="group-open:hidden" d="M12 5v14" strokeLinecap="round" />
                </svg>
              </summary>
              <div className="px-4 sm:px-6 pb-6 sm:pl-14">
                <p className="max-w-[700px] text-[17px] leading-[1.8] text-text-secondary">{item.answer}</p>
                <div className="mt-5 border-t border-border pt-4">
                  <p className="text-[15px] leading-relaxed text-text-tertiary">{item.proof}</p>
                  <a href={item.href} className="mt-3 inline-flex items-center gap-2 rounded-sm text-[16px] leading-relaxed font-medium text-accent-hover underline decoration-accent/40 underline-offset-4 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4">
                    {item.link}<span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
