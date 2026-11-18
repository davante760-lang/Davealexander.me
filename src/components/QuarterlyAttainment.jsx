import { FadeIn, SectionTitle } from './AnimatedSection'

const rows = [
  { period: 'FY23 · ramp', company: 'Samsara', quota: '$900K annual quota', quarters: ['65%', '85%', '118%', '136%'], annual: '101%' },
  { period: 'FY24', company: 'Samsara', quota: '$900K annual quota', quarters: ['100%', '108%', '122%', '134%'], annual: '116%' },
  { period: 'FY25', company: 'Samsara', quota: '$900K annual quota', quarters: ['105%', '110%', '118%', '147%'], annual: '120%' },
  { period: '2026 · YTD', company: 'Netradyne', quota: '$1.27M annual quota', quarters: ['—', '52%', '105%', '208%'], annual: '91%', yearToDate: true },
]

export default function QuarterlyAttainment() {
  return (
    <section id="attainment" className="py-24 md:py-28 px-6">
      <div className="max-w-[860px] mx-auto">
        <FadeIn>
          <SectionTitle eyebrow="PERFORMANCE DETAIL" title="Quarterly Attainment" />
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="overflow-x-auto rounded-xl border border-border bg-surface-1" tabIndex="0">
            <table className="w-full min-w-[700px] border-collapse text-[15px]">
              <caption className="sr-only">Annual quota and quarterly attainment at Samsara for FY23 through FY25 and Netradyne for 2026</caption>
              <thead>
                <tr className="bg-surface-3 text-text-primary">
                  {['Period / Company', 'Q1', 'Q2', 'Q3', 'Q4', 'Annual attainment'].map((heading, index) => (
                    <th key={heading} scope="col" className={`px-4 py-3.5 font-medium border-b border-border ${index === 0 ? 'text-left' : 'text-center'}`}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.period} className="border-b border-border-light last:border-b-0 even:bg-surface-2/40">
                    <th scope="row" className="px-4 py-3.5 text-left font-medium text-text-primary whitespace-nowrap">
                      <span className="block">{row.period}</span>
                      <span className="block mt-1 font-normal text-text-secondary">
                        {row.company} <span className="text-text-tertiary">· {row.quota}</span>
                      </span>
                    </th>
                    {row.quarters.map((value, index) => (
                      <td key={`${row.period}-${index}`} className="px-4 py-3.5 text-center text-text-secondary whitespace-nowrap">
                        {value}
                        {row.yearToDate && index === 3 && <span className="block text-[12px] mt-1 text-text-tertiary">QTD</span>}
                      </td>
                    ))}
                    <td className="px-4 py-3.5 text-center font-semibold text-teal whitespace-nowrap">
                      {row.annual}
                      {row.yearToDate && <span className="block text-[12px] mt-1 font-normal text-text-tertiary">YTD</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[14px] text-text-tertiary leading-relaxed mt-3">
            Netradyne: 170% of first-year ramp quota. Full-quota figures reflect seven net-new wins:
            $317,500 per calendar quarter and $1.27M annually, rounded. QTD = quarter to date;
            YTD = year to date against the full annual quota. — = not reported.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
