interface VideoPlayerProps {
  label: string
  duration?: string
  placeholder?: string
  small?: boolean
  gradient?: boolean
}

export function VideoPlayer({ label, duration, placeholder = 'vidéo', small = false, gradient = false }: VideoPlayerProps) {
  const phClass = gradient ? 'ph ph--grad' : 'ph'

  return (
    <div className={`relative rounded-lg overflow-hidden ${small ? 'aspect-video' : 'aspect-[16/9]'}`}>
      <div className={phClass} style={{ position: 'absolute', inset: 0 }}>
        <span>{placeholder}</span>
      </div>
      <button
        aria-label={label}
        className="absolute inset-0 flex items-center justify-center group"
      >
        <span className={`rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110 ${small ? 'w-10 h-10' : 'w-14 h-14'}`}>
          <svg width={small ? 14 : 20} height={small ? 14 : 20} viewBox="0 0 24 24" fill="var(--ink)">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </button>
      {duration && (
        <span className="absolute bottom-3 right-3 bg-[rgba(14,34,48,0.72)] text-white text-[0.72rem] font-mono px-2 py-0.5 rounded">
          {duration}
        </span>
      )}
    </div>
  )
}
