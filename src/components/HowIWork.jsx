import { FadeIn, SectionTitle } from './AnimatedSection'

const storyLinkClass = 'font-medium text-text-primary underline decoration-accent/50 underline-offset-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 rounded-sm'

const items = [
  {
    title: 'Prospect with a reason to talk',
    body: <>I look for changes that create a relevant opening. At <a href="/deals/dietz-watson/" className={storyLinkClass}>Dietz &amp; Watson</a>, I learned they were evaluating a new TMS their incumbent couldn’t integrate with. I used that opening to start a conversation, identify safety stakeholders, and expand the opportunity.</>,
  },
  {
    title: 'Build support across the buying team',
    body: <>I work to understand what each stakeholder needs to support a decision. At <a href="/deals/kodiak-building-partners/" className={storyLinkClass}>Kodiak</a>, a new fleet manager paused the process. I reopened discovery and gave him his own evaluation, helping restore operational support.</>,
  },
  {
    title: 'Build a business case the buyer can defend',
    body: <>I work with the customer and my technical team to make the financial assumptions clear. At <a href="/deals/calfrac/" className={storyLinkClass}>Calfrac</a>, we built the case around their accident history. At <a href="/deals/odom/" className={storyLinkClass}>Odom</a>, I equipped my champion to take the recommendation to the President.</>,
  },
  {
    title: 'Test what matters to the customer',
    body: <>An evaluation needs to address performance, workflow, and practical adoption. <strong className="font-medium text-text-primary">Kenco</strong> reinforced that lesson: strong safety results weren’t enough when everyday usability remained unresolved. The customer’s definition of success has to guide the evaluation.</>,
  },
  {
    title: 'Make the purchase practical',
    body: <>I work through budget timing, contracts, and rollout requirements with the buyer and my internal team. At <a href="/deals/woodfield/" className={storyLinkClass}>Woodfield</a>, trial evidence and a workable payment schedule helped the owner move forward earlier than planned.</>,
  },
]

export default function HowIWork() {
  return (
    <section id="how-i-sell" className="py-24 md:py-28 px-6">
      <div className="max-w-[860px] mx-auto">
        <FadeIn>
          <SectionTitle eyebrow="APPROACH" title="How I Sell" />
        </FadeIn>

        <div className="space-y-6">
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.08}>
              <div className="pl-4 border-l border-border-light max-w-[680px]">
                <h3 className="font-heading text-[17px] font-semibold text-text-primary tracking-[-0.01em] mb-2">
                  {item.title}
                </h3>
                <p className="text-[16.5px] leading-[1.75] text-text-secondary">
                  {item.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <p className="mt-8 pl-4 max-w-[680px] text-[15px] leading-[1.75] text-text-tertiary">
            I use <span className="font-medium text-text-secondary">MEDDPICC</span> to assess the business case, stakeholder support, decision process, and risks to close.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
