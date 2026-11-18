const industries = {
  beverage: { label: 'Beverage distribution', paths: ['M9 3h6', 'M10 3v5l-3 4v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-8l-3-4V3', 'M7 13h10', 'M10 17h4'] },
  truck: { label: 'Freight & logistics', paths: ['M3 6h11v11H3z', 'M14 10h4l3 4v3h-7', 'M3 17h2', 'M9 17h6', 'M18 10v4h3'], circles: [[7, 18, 2], [17, 18, 2]] },
  building: { label: 'Building products', paths: ['M5 21V3h10v18', 'M15 9h4v12', 'M3 21h18', 'M8 7h4', 'M8 11h4', 'M8 15h4', 'M9 21v-3h3v3'] },
  fuel: { label: 'Fuel transportation', paths: ['M4 21V4h10v17', 'M4 10h10', 'M2 21h14', 'M14 11h2v6a2 2 0 0 0 4 0V8l-3-3', 'M18 6v4h2'] },
  warehouse: { label: 'Distribution & logistics', paths: ['M3 21V8l9-5 9 5v13', 'M7 21V11h10v10', 'M7 15h10', 'M7 18h10', 'M2 21h20'] },
  taxi: { label: 'Passenger transportation', paths: ['M5 10l2-5h10l2 5', 'M3 17v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5z', 'M5 17v3', 'M19 17v3', 'M10 5V3h4v2', 'M6 13h2', 'M16 13h2'] },
  energy: { label: 'Oilfield services', paths: ['M13 2L4 14h7l-1 8 10-13h-8l1-7Z'] },
  construction: { label: 'Concrete & construction', paths: ['M4 16a8 8 0 0 1 16 0', 'M10 5v7', 'M14 5v7', 'M3 16h18v4H3z', 'M7 8v4', 'M17 8v4'] },
  medical: { label: 'Emergency medical services', paths: ['M3 7h12v11H3z', 'M15 11h4l3 4v3h-7', 'M9 9v6', 'M6 12h6'], circles: [[6, 19, 2], [18, 19, 2]] },
  food: { label: 'Food manufacturing', paths: ['M3 21V10l6 3V7l6 6V3h4l2 18H3Z', 'M7 17h1', 'M12 17h1', 'M17 17h1'] },
}

export default function IndustryMark({ type = 'truck', compact = false }) {
  const industry = industries[type] || industries.truck
  return (
    <div aria-hidden="true" className={compact ? 'flex h-14 w-14 items-center justify-center rounded-xl border border-accent/25 bg-accent-subtle text-accent' : 'flex h-full w-full flex-col items-center justify-center gap-3 text-accent'}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className={compact ? 'h-8 w-8' : 'h-11 w-11'}>
        {industry.paths.map((path, index) => <path key={index} d={path} />)}
        {industry.circles?.map(([cx, cy, r], index) => <circle key={index} cx={cx} cy={cy} r={r} />)}
      </svg>
      {!compact && <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-text-tertiary text-center">{industry.label}</span>}
    </div>
  )
}
