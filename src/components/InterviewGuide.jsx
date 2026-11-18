import { SectionTitle } from './AnimatedSection'

const areas = [
  {
    id: 'pipeline',
    title: 'Building pipeline',
    approach: 'I build outreach around a reason for the customer to act—a system change, a renewal, or an operating problem. That creates a relevant opening for your business, then discovery helps me find the people and needs that can turn it into a broader opportunity.',
    proof: 'Approximately 55% of my qualified pipeline at Samsara was self-sourced. At a food manufacturer, an integration gap opened the door to a broader safety conversation.',
    href: '/deals/food-manufacturer/',
    link: 'See how I opened the Food Manufacturer account',
  },
  {
    id: 'territory',
    title: 'Prioritizing a territory',
    approach: 'I focus on accounts with product fit, a meaningful business problem, and a reason to change. Discovery establishes who owns the problem and whether it matters enough to act, so I can direct time and team resources toward opportunities with a credible path forward.',
    proof: 'The Food Manufacturer story shows how a specific buying trigger became a broader opportunity.',
    href: '/deals/food-manufacturer/#account-plan',
    link: 'Explore the account-plan walkthrough',
  },
  {
    id: 'competitive-deal',
    title: 'Moving complex deals to a decision',
    approach: 'I connect the evaluation, financial case, and switching plan to the customer’s buying process. I equip champions for internal approvals and work through commercial and rollout requirements, giving your team a clear path from technical interest to a signed agreement.',
    proof: 'Beverage Distributor: $331.9K ARR and $1.66M in five-year contracted value; closed 204 days after I took over.',
    href: '/deals/beverage-distributor/',
    link: 'Read the Beverage Distributor story',
  },
  {
    id: 'sales-engineering',
    title: 'Connecting technical proof to business value',
    approach: 'I bring customer priorities and buying-process context to the technical team, and stay accountable for the commercial path. Together, we connect the evaluation to the operating problem and financial case, so the buyer has evidence to support a decision.',
    proof: 'The Oilfield Services Provider’s business case projected 4.5× five-year ROI and a 10.9-month payback.',
    href: '/deals/oilfield-services/',
    link: 'See the Oilfield Services Provider business case',
  },
  {
    id: 'lessons',
    title: 'Owning losses and learning from them',
    approach: 'I look closely at where my qualification, evaluation plan, or stakeholder coverage fell short. In the Logistics Provider loss, we proved safety value but left key operating requirements unresolved. The lesson for the next pursuit: agree on the buyer’s success criteria early and confirm who makes the final decision.',
    proof: 'The Logistics Provider story includes why we lost, what I own, and what I take forward.',
    href: '/losses/logistics-provider/',
    link: 'Read the Logistics Provider lessons',
  },
  {
    id: 'next-role',
    title: 'Taking ownership of the sales cycle',
    approach: 'I stay accountable from prospecting and discovery through evaluation, negotiation, and close. Whether I create the opportunity or inherit a stalled deal, I coordinate the right internal partners and keep the buying team’s next decision clear.',
    proof: 'My experience includes new customer acquisition and account expansion across insurance software, connected operations, and AI fleet safety.',
    href: '#sales-profile',
    link: 'See my sales role at a glance',
  },
]

export default function InterviewGuide() {
  return (
    <section id="interview-guide" aria-label="How I work" className="px-6 py-16 md:py-20 bg-surface-1 border-b border-border">
      <div className="max-w-[860px] mx-auto">
        <SectionTitle eyebrow="WHAT I BRING TO YOUR TEAM" title="How I Work" />
        <p className="text-[17px] leading-relaxed text-text-secondary -mt-3 mb-7">
          A quick look at how I build pipeline, prioritize accounts, and guide complex purchases—with examples from the field.
        </p>
        <div className="space-y-3">
          {areas.map((item, index) => (
            <details key={item.id} name="interview-guide" id={`interview-guide-${item.id}`} className="interview-answer group rounded-xl border border-border bg-bg open:border-accent/50 open:bg-surface-2 scroll-mt-28">
              <summary className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-5 rounded-xl list-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 hover:bg-surface-2 transition-colors">
                <span aria-hidden="true" className="text-[13px] tabular-nums text-accent-hover font-medium">{String(index + 1).padStart(2, '0')}</span>
                <span className="font-heading font-medium text-[17px] sm:text-[18px] leading-snug flex-1">{item.title}</span>
                <svg aria-hidden="true" className="w-5 h-5 shrink-0 text-accent-hover" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M5 12h14" strokeLinecap="round" />
                  <path className="group-open:hidden" d="M12 5v14" strokeLinecap="round" />
                </svg>
              </summary>
              <div className="px-4 sm:px-6 pb-6 sm:pl-14">
                <p className="max-w-[700px] text-[17px] leading-[1.8] text-text-secondary">{item.approach}</p>
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
