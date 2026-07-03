import { GRAD_STOPS } from '@/constants'
import { NETWORK_NODES, NETWORK_EDGES } from '@/data/network'

function lerpHex(a: string, b: string, k: number): string {
  const pa = [1,3,5].map(i => parseInt(a.slice(i, i+2), 16))
  const pb = [1,3,5].map(i => parseInt(b.slice(i, i+2), 16))
  return '#' + pa.map((v, i) => Math.round(v + (pb[i] - v) * k).toString(16).padStart(2, '0')).join('')
}

function colorAt(t: number): string {
  const stops = [...GRAD_STOPS]
  for (let i = 1; i < stops.length; i++) {
    if (t <= stops[i].offset) {
      const a = stops[i - 1], b = stops[i]
      const k = (t - a.offset) / (b.offset - a.offset)
      return lerpHex(a.hex, b.hex, k)
    }
  }
  return stops[stops.length - 1].hex
}

interface BrandMarkProps {
  id?: string
  className?: string
}

export function BrandMark({ id: _id, className = 'w-[38px] flex-none' }: BrandMarkProps) {
  return (
    <svg
      className={className}
      viewBox="42 40 336 281"
      fill="none"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <g strokeLinecap="round">
        {NETWORK_EDGES.map(([a, b], i) => {
          const [x1, y1] = NETWORK_NODES[a]
          const [x2, y2] = NETWORK_NODES[b]
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={colorAt((x1 + x2) / 2 / 400)}
              strokeWidth="2"
              strokeOpacity="0.55"
            />
          )
        })}
      </g>
      <g>
        {NETWORK_NODES.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={colorAt(x / 400)} />
        ))}
      </g>
    </svg>
  )
}
