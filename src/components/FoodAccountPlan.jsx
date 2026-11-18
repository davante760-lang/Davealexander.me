const confirmedSteps = [
  {
    title: 'Why this account',
    text: 'A professional connection surfaced an active TMS evaluation. That gave me a timely, specific reason to pursue the Food Manufacturer account.',
  },
  {
    title: 'The trigger and the gap',
    text: 'Their incumbent system did not integrate with the new transportation management system being evaluated. I used that gap to open a telematics conversation.',
  },
  {
    title: 'The stakeholder map',
    text: 'I started with the prospect in the initial appointment, then asked for names and information about who ran safety. That expanded my view of the account.',
  },
  {
    title: 'The opening approach',
    text: 'Lead with the known integration issue. Use the meeting to understand safety ownership and broaden the opportunity beyond the first requirement.',
  },
]

export default function FoodAccountPlan() {
  return (
    <section id="account-plan" aria-labelledby="account-plan-title" className="scroll-mt-8 mt-12 rounded-2xl border border-accent/30 bg-surface-1 overflow-hidden">
      <header className="border-b border-border p-6 md:p-7">
        <span className="inline-block rounded-full border border-accent/30 bg-accent-dim px-3 py-1 text-[12px] font-medium tracking-[0.04em] text-accent-hover">Illustrative walkthrough</span>
        <h2 id="account-plan-title" className="mt-4 font-heading text-[25px] sm:text-[29px] font-semibold tracking-[-0.025em] text-text-primary">Inside the account plan</h2>
        <p className="mt-2 text-[16px] leading-[1.7] text-text-secondary">Reconstructed from this deal story, not an original customer document. The actions below are from the deal; the evaluation questions are examples of how I would apply the approach.</p>
      </header>

      <div className="p-6 md:p-7">
        <h3 className="mb-5 text-[12px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">What I did in this deal</h3>
        <ol className="grid gap-x-7 gap-y-6 sm:grid-cols-2">
          {confirmedSteps.map((step, index) => (
            <li key={step.title} className="min-w-0">
              <div className="mb-2 flex items-center gap-3">
                <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent-dim text-[12px] font-semibold text-accent-hover">{index + 1}</span>
                <h4 className="font-heading text-[17px] font-semibold text-text-primary">{step.title}</h4>
              </div>
              <p className="text-[16px] leading-[1.7] text-text-secondary">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-7 rounded-xl border border-border bg-surface-2 p-5">
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-accent-hover">Questions I would use in a similar account</h3>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div>
              <h4 className="mb-2 font-heading text-[17px] font-semibold text-text-primary">Discovery objective</h4>
              <p className="text-[16px] leading-[1.7] text-text-secondary">What does the integration gap prevent your team from doing? Who owns safety, and which problems would make a change worth evaluating?</p>
            </div>
            <div>
              <h4 className="mb-2 font-heading text-[17px] font-semibold text-text-primary">The next decision</h4>
              <p className="text-[16px] leading-[1.7] text-text-secondary">Should safety join the evaluation? What would the team need to see to justify including it alongside telematics?</p>
            </div>
          </div>
        </div>

        <div className="mt-6 border-l-2 border-accent pl-4">
          <h3 className="font-heading text-[17px] font-semibold text-text-primary">The repeatable move</h3>
          <p className="mt-1 text-[16px] leading-[1.7] text-text-secondary">Use a buying signal to earn the meeting. Use discovery to find the people and problems that expand the opportunity.</p>
        </div>

        <a href="/#interview-guide-territory" className="mt-6 inline-flex items-center gap-2 rounded-sm text-[15px] font-medium text-accent-hover transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"><span aria-hidden="true">←</span> Back to how I work</a>
      </div>
    </section>
  )
}
