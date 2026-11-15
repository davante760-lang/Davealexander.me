import { useEffect, useRef } from 'react'

const desktopPointer = '(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
const nativeControls = 'video, audio, iframe, input, textarea, select, [contenteditable]:not([contenteditable="false"]), [data-native-cursor]'

export default function CoinCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const root = document.documentElement
    const media = window.matchMedia(desktopPointer)
    let point = null
    let frame = 0

    const hide = () => {
      cancelAnimationFrame(frame)
      frame = 0
      cursor.removeAttribute('data-visible')
      root.classList.remove('coin-cursor-active')
    }

    const reset = () => {
      point = null
      hide()
    }

    const render = () => {
      frame = 0
      if (!media.matches || !point || document.hidden) return hide()
      const target = document.elementFromPoint(point.x, point.y)
      if (!target || target.closest(nativeControls)) return hide()
      cursor.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`
      cursor.setAttribute('data-visible', '')
      root.classList.add('coin-cursor-active')
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render)
    }

    const move = event => {
      if (event.pointerType !== 'mouse' || !media.matches) return reset()
      point = { x: event.clientX, y: event.clientY }
      schedule()
    }
    const leave = event => { if (!event.relatedTarget) reset() }
    const keyboard = event => { if (event.key === 'Tab' || event.key === 'Escape') reset() }
    const focus = event => { if (event.target.closest(nativeControls)) reset() }
    const visibility = () => { if (document.hidden) reset() }

    document.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', move, { passive: true })
    document.addEventListener('pointerdown', move, { passive: true })
    document.addEventListener('pointerout', leave)
    document.addEventListener('keydown', keyboard)
    document.addEventListener('focusin', focus)
    document.addEventListener('visibilitychange', visibility)
    document.addEventListener('fullscreenchange', reset)
    document.addEventListener('scroll', schedule, { passive: true, capture: true })
    window.addEventListener('blur', reset)
    window.addEventListener('resize', reset)
    media.addEventListener('change', reset)

    return () => {
      reset()
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', move)
      document.removeEventListener('pointerdown', move)
      document.removeEventListener('pointerout', leave)
      document.removeEventListener('keydown', keyboard)
      document.removeEventListener('focusin', focus)
      document.removeEventListener('visibilitychange', visibility)
      document.removeEventListener('fullscreenchange', reset)
      document.removeEventListener('scroll', schedule, true)
      window.removeEventListener('blur', reset)
      window.removeEventListener('resize', reset)
      media.removeEventListener('change', reset)
    }
  }, [])

  return <div ref={cursorRef} className="coin-cursor" aria-hidden="true"><span /></div>
}
