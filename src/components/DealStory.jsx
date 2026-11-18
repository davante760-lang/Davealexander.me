import Footer from './Footer'
import FoodAccountPlan from './FoodAccountPlan'
import IndustryMark from './IndustryMark'

const linkStyle = 'rounded-sm text-[15px] font-medium transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4'

export default function DealStory({ deal, story, nextDeal, collectionHref = '/#marquee-deals', collectionLabel = 'Back to deals' }) {
  return (
    <>
      <header className="px-6">
        <nav aria-label="Deal story navigation" className="max-w-[860px] mx-auto flex items-center justify-between gap-4 py-6 border-b border-border">
          <a href={collectionHref} className={`${linkStyle} text-text-secondary`}><span aria-hidden="true">← </span>{collectionLabel}</a>
          <a href="/" className={`${linkStyle} font-heading text-text-tertiary`}>Dave Alexander</a>
        </nav>
      </header>

      <main className="px-6 pt-12 md:pt-16 pb-16 md:pb-20">
        <article className="max-w-[720px] mx-auto" aria-labelledby="deal-title">
          <header className="mb-10 md:mb-12">
            <div className="flex items-center justify-between gap-5 mb-7">
              <span className="text-[12px] uppercase tracking-[0.2em] font-medium text-accent">{story.eyebrow || 'Deal story'}</span>
              <IndustryMark type={deal.icon} compact />
            </div>
            <h1 id="deal-title" className="font-heading text-[34px] md:text-[44px] leading-[1.12] font-semibold tracking-[-0.035em] mb-4">{story.name}</h1>
            <p className="text-[18px] md:text-[20px] leading-[1.65] text-text-secondary max-w-[600px]">{story.headline}</p>
            <p className="mt-4 text-[13px] leading-relaxed text-text-tertiary">Customer identity anonymized · Deal figures retained</p>
            <div aria-hidden="true" className="h-[2px] w-12 bg-accent mt-6" />
            <dl className="deal-metrics mt-8 rounded-xl border border-border bg-surface-1" style={{ '--metric-columns': story.metrics.length }}>
              {story.metrics.map((metric, index) => (
                <div key={metric.label}>
                  <dt className="text-[12px] text-text-tertiary mb-1">{metric.label}</dt>
                  <dd className={`font-heading text-[25px] sm:text-[31px] font-semibold tracking-[-0.03em] ${index === 0 ? 'text-accent' : ''}`}>
                    {metric.value}{metric.unit && <span className="text-[14px] sm:text-[16px] font-normal tracking-normal text-text-tertiary"> {metric.unit}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </header>

          <div className="space-y-8 md:space-y-10 text-[17px] leading-[1.8] text-text-secondary">
            {story.sections.map(section => (
              <section key={section.title} className={section.highlight ? 'rounded-xl border border-accent/25 bg-accent-subtle p-6 md:p-7' : ''}>
                <h2 className={`font-heading text-[21px] font-semibold tracking-[-0.02em] mb-3 ${section.highlight ? 'text-accent' : 'text-text-primary'}`}>{section.title}</h2>
                {section.paragraphs?.map((paragraph, index) => <p key={paragraph} className={index > 0 ? 'mt-4' : ''}>{paragraph}</p>)}
                {section.items && (
                  <ul className="space-y-5 list-disc pl-5 marker:text-accent">
                    {section.items.map(item => <li key={item.title} className="pl-1"><strong className="font-semibold text-text-primary">{item.title}</strong> {item.text}</li>)}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {deal.slug === 'food-manufacturer' && <FoodAccountPlan />}

          <nav aria-label="Continue exploring" className="border-t border-border mt-12 pt-7">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <a href={collectionHref} className={`${linkStyle} text-accent`}><span aria-hidden="true">← </span>{collectionLabel}</a>
              <a href={nextDeal.href} className={`${linkStyle} text-text-secondary`} aria-label={`Next story: ${nextDeal.name}`}>{nextDeal.name} <span aria-hidden="true">→</span></a>
            </div>
            <a href="/DaveAlexanderResume.pdf?v=20261116-above-beyond" download className={`${linkStyle} inline-block mt-6 text-text-tertiary`}>Download resume <span aria-hidden="true">↓</span></a>
          </nav>
        </article>
      </main>
      <Footer />
    </>
  )
}
