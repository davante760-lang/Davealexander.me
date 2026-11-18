import { SectionTitle } from './AnimatedSection'

const facts = [
  { label: 'Customers', value: 'Operational businesses', detail: 'Transportation, distribution, building products, and oilfield services. Featured Netradyne wins span fleets of 116 to 680+ vehicles.' },
  { label: 'Buying team', value: 'Operations to the executive team', detail: 'Safety and operations leaders, with executive sponsors, finance, IT, legal, and procurement involved as the decision requires.' },
  { label: 'Deal economics', value: '$165K average ARR', detail: 'Across seven documented Netradyne wins in 2026. Beverage Distributor: $331.9K ARR and $1.66M in five-year contracted value.' },
  { label: 'Sales cycle', value: '6–12 months', detail: 'Typical at Netradyne; previously 4–6 months at Samsara. Individual stories distinguish full opportunity cycles from time under my ownership.' },
  { label: 'Revenue responsibility', value: 'New business & account growth', detail: 'Seven net-new customer wins at Netradyne. My Samsara experience includes new business and expanding accounts through additional products.' },
  { label: 'Sources & support', value: 'Outbound, partners & inherited deals', detail: 'Approximately 55% self-sourced pipeline at Samsara. I work with sales engineering on validation and with internal teams on contracts and implementation planning.' },
]

export default function SalesProfile() {
  return (
    <section id="sales-profile" className="bg-surface-1 border-y border-border px-6 py-16 md:py-20">
      <div className="max-w-[860px] mx-auto">
        <span id="built-for" className="block scroll-mt-28" />
        <SectionTitle eyebrow="THE SALES ENVIRONMENT" title="My Sales Role at a Glance" />
        <p className="text-[17px] leading-relaxed text-text-secondary -mt-3 mb-7">
          Enterprise Account Executive at Netradyne · AI fleet safety & video telematics
        </p>
        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
          {facts.map(fact => (
            <div key={fact.label} className="border-t border-border pt-5">
              <dt className="text-[12px] uppercase tracking-[0.14em] text-accent-hover font-medium mb-2">{fact.label}</dt>
              <dd>
                <span className="block font-heading text-[19px] font-medium leading-snug mb-2">{fact.value}</span>
                <p className="text-[16px] leading-[1.75] text-text-secondary">{fact.detail}</p>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-7 text-[14px] leading-relaxed text-text-tertiary">ARR is annual recurring revenue. Contracted value covers the full agreement term. Net-new describes the customer win; it does not mean every opportunity was self-sourced.</p>
      </div>
    </section>
  )
}
