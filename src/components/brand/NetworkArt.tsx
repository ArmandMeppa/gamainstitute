import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { GRAD_STOPS } from '@/constants'
import { NETWORK_NODES as NODES, NETWORK_EDGES as EDGES } from '@/data/network'

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

export function NetworkArt() {
  const shouldReduce = useReducedMotion()
  const ref = useRef<SVGSVGElement>(null)

  // After animations complete, clear inline styles so print/screenshot sees full graph
  useEffect(() => {
    if (shouldReduce || !ref.current) return
    const id = setTimeout(() => {
      ref.current?.querySelectorAll('circle, line').forEach(el => {
        const element = el as SVGElement
        element.style.animation = ''
        element.style.opacity = ''
        element.style.strokeDashoffset = '0'
        element.style.strokeDasharray = ''
      })
    }, 3000)
    return () => clearTimeout(id)
  }, [shouldReduce])

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 360"
      width="100%"
      role="img"
      aria-label="Gama Institute knowledge network"
      style={{ overflow: 'visible', display: 'block' }}
    >
      {EDGES.map(([a, b], i) => {
        const [x1, y1] = NODES[a]
        const [x2, y2] = NODES[b]
        const len = Math.hypot(x2 - x1, y2 - y1)
        const strokeColor = colorAt((x1 + x2) / 2 / 400)

        if (shouldReduce) {
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeOpacity="0.45"
              strokeLinecap="round"
            />
          )
        }

        return (
          <motion.line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={len}
            initial={{ strokeDashoffset: len, strokeOpacity: 0 }}
            animate={{ strokeDashoffset: 0, strokeOpacity: 0.45 }}
            transition={{ duration: 0.7, delay: 0.55 + i * 0.045, ease: 'easeOut' }}
          />
        )
      })}

      {NODES.map(([x, y, r], i) => {
        const fill = colorAt(x / 400)

        if (shouldReduce) {
          return <circle key={i} cx={x} cy={y} r={r} fill={fill} />
        }

        return (
          <motion.circle
            key={i}
            cx={x} cy={y} r={r}
            fill={fill}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        )
      })}
    </svg>
  )
}