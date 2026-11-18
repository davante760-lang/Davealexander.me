import { SectionTitle } from './AnimatedSection'

const steps = [
  { title: 'Qualify the change', text: 'Understand the operating problem, the cost of staying put, and the reason to act now.' },
  { title: 'Align the buying team', text: 'Connect user requirements to executive value and confirm who needs to support the decision.' },
  { title: 'Make the decision practical', text: 'Agree on evaluation criteria, address purchasing risks, and plan a transition the customer can execute.' },
]

export default function HowIWork() {
  return (
    <section id="how-i-sell" className="px-6 py-16 md:py-20">
      <div className="max-w-[860px] mx-auto">
        <SectionTitle eyebrow="MY OPERATING APPROACH" title="How I Sell" />
        <ol className="grid sm:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <li key={step.title} className="border-t border-border pt-4">
              <span aria-hidden="true" className="text-[13px] font-medium text-accent-hover">0{index + 1}</span>
              <h3 className="font-heading text-[18px] font-semibold leading-snug mt-2 mb-2">{step.title}</h3>
              <p className="text-[16px] leading-[1.75] text-text-secondary">{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-7 text-[15px] leading-relaxed text-text-tertiary">
          I use <span className="font-medium text-text-secondary">MEDDPICC</span> to keep the business case, stakeholder support, decision process, and risks to close explicit.
        </p>
      </div>
    </section>
  )
}
