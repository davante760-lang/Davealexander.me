import { useRef, useState } from 'react'

export default function IntroVideo() {
  const videoRef = useRef(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [playError, setPlayError] = useState(false)

  function handleError() {
    setHasStarted(false)
    setPlayError(true)
  }

  async function playVideo() {
    const video = videoRef.current
    if (!video) return

    setPlayError(false)
    try {
      await video.play()
      video.focus({ preventScroll: true })
    } catch {
      handleError()
    }
  }

  return (
    <>
      <div className="relative overflow-hidden rounded-xl border border-border bg-surface-1">
        <video
          ref={videoRef}
          controls={hasStarted}
          playsInline
          preload="none"
          poster="/media/dave-intro-poster-38-13.jpg"
          width="1920"
          height="1080"
          aria-label="A personal introduction from Dave Alexander"
          tabIndex={hasStarted ? 0 : -1}
          onPlay={() => { setHasStarted(true); setPlayError(false) }}
          onEnded={() => setHasStarted(false)}
          onError={handleError}
          className="block w-full h-auto aspect-video focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent"
        >
          <source src="/media/dave-intro.mp4" type="video/mp4" onError={handleError} />
          <a href="/media/dave-intro.mp4">Watch Dave’s introduction</a>
        </video>

        {!hasStarted && (
          <button
            type="button"
            onClick={playVideo}
            aria-label="Play Dave’s introduction"
            className="group absolute inset-0 flex items-center justify-center cursor-pointer bg-black/10 hover:bg-black/5 focus-visible:outline-none"
          >
            <span className="flex h-14 w-20 items-center justify-center rounded-2xl bg-accent shadow-xl transition-[background-color,transform] group-hover:bg-accent-hover group-hover:scale-105 group-focus-visible:ring-4 group-focus-visible:ring-white group-focus-visible:ring-offset-4 group-focus-visible:ring-offset-bg">
              <svg className="h-7 w-7 translate-x-0.5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6 3.5v17L20 12 6 3.5Z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      {playError && (
        <p role="status" className="mt-3 text-sm text-text-secondary">
          Having trouble playing?{' '}
          <a href="/media/dave-intro.mp4" className="text-accent underline underline-offset-4">Open the video directly.</a>
        </p>
      )}
    </>
  )
}
