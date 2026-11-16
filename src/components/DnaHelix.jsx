import { useEffect, useRef } from 'react'
import './DnaHelix.css'

const RUNGS = Array.from({ length: 40 }, (_, index) => index)
const CYCLE_MS = 6500

function coordinates(index, phase = 0) {
  const angle = index * 0.27 + phase
  const offset = Math.sin(angle) * 92
  const depth = (Math.cos(angle) + 1) / 2
  return {
    x: 12 + index * 15.8,
    firstY: 130 + offset,
    secondY: 130 - offset,
    firstRadius: 3 + depth * 1.4,
    secondRadius: 4.4 - depth * 1.4,
    firstOpacity: 0.55 + depth * 0.45,
    secondOpacity: 1 - depth * 0.45,
  }
}

function Strand() {
  return (
    <svg viewBox="0 0 640 260" preserveAspectRatio="none" fill="none" focusable="false">
      {RUNGS.map(index => {
        const point = coordinates(index)
        return (
          <g key={index} data-rung={index}>
            <line x1={point.x} x2={point.x} y1={point.firstY} y2={point.secondY} stroke="currentColor" strokeOpacity="0.6" strokeWidth="1.3" />
            <circle cx={point.x} cy={point.firstY} r={point.firstRadius} opacity={point.firstOpacity} fill="currentColor" />
            <circle cx={point.x} cy={point.secondY} r={point.secondRadius} opacity={point.secondOpacity} fill="currentColor" />
          </g>
        )
      })}
    </svg>
  )
}

export default function DnaHelix() {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    const desktop = window.matchMedia('(min-width: 1100px)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const rungs = Array.from(container.querySelectorAll('[data-rung]'), group => ({
      index: Number(group.dataset.rung),
      line: group.children[0],
      first: group.children[1],
      second: group.children[2],
    }))
    let inView = true
    let frame = null
    let lastTime = null
    let phase = 0

    function draw() {
      for (const { index, line, first, second } of rungs) {
        const point = coordinates(index, phase)
        line.setAttribute('y1', point.firstY)
        line.setAttribute('y2', point.secondY)
        first.setAttribute('cy', point.firstY)
        first.setAttribute('r', point.firstRadius)
        first.setAttribute('opacity', point.firstOpacity)
        second.setAttribute('cy', point.secondY)
        second.setAttribute('r', point.secondRadius)
        second.setAttribute('opacity', point.secondOpacity)
      }
    }

    function animate(now) {
      if (lastTime === null) lastTime = now
      const elapsed = now - lastTime
      if (elapsed >= 1000 / 30) {
        phase = (phase + elapsed / CYCLE_MS * Math.PI * 2) % (Math.PI * 2)
        lastTime = now
        draw()
      }
      frame = requestAnimationFrame(animate)
    }

    function updatePlayback() {
      if (frame !== null) cancelAnimationFrame(frame)
      frame = null
      lastTime = null
      const running = desktop.matches && !reducedMotion.matches && inView && !document.hidden
      container.dataset.animating = String(running)
      if (running) frame = requestAnimationFrame(animate)
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      updatePlayback()
    })
    observer.observe(container)
    desktop.addEventListener('change', updatePlayback)
    reducedMotion.addEventListener('change', updatePlayback)
    document.addEventListener('visibilitychange', updatePlayback)
    updatePlayback()

    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      observer.disconnect()
      desktop.removeEventListener('change', updatePlayback)
      reducedMotion.removeEventListener('change', updatePlayback)
      document.removeEventListener('visibilitychange', updatePlayback)
    }
  }, [])

  return (
    <div ref={ref} className="hero-dna" aria-hidden="true">
      <div className="hero-dna-wing hero-dna-left"><Strand /></div>
      <div className="hero-dna-wing hero-dna-right"><Strand /></div>
    </div>
  )
}
