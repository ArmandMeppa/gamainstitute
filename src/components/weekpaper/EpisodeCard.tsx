import { motion }      from 'framer-motion'
import { Tag }         from '@/components/ui/Tag'
import { VideoPlayer } from '@/components/ui/VideoPlayer'
import { ANIM }        from '@/constants'
import type { TagVariant } from '@/types/course'

interface EpisodeCardProps {
  no: string
  tag: string
  tagVariant: TagVariant
  title: string
  date: string
  duration: string
  videoUrl: string
  playLabel: string
}

export function EpisodeCard({ no, tag, tagVariant, title, date, duration, videoUrl, playLabel }: EpisodeCardProps) {
  return (
    <motion.article
      className="flex flex-col rounded-lg border border-hairline bg-surface overflow-hidden"
      whileHover={{ y: -ANIM.CARD_HOVER_Y, boxShadow: 'var(--sh-2)' }}
      transition={{ duration: ANIM.CARD_HOVER_DURATION }}
    >
      <VideoPlayer label={playLabel} url={videoUrl} duration={duration} placeholder="vidéo · épisode" small />
      <div className="p-[clamp(16px,2vw,22px)] flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-[0.72rem] text-ink-muted">{no}</span>
          <Tag variant={tagVariant}>{tag}</Tag>
        </div>
        <h3 className="font-display font-semibold text-[1rem] text-ink leading-[1.3] m-0">
          <a href="#" className="hover:text-[var(--link)] transition-colors">{title}</a>
        </h3>
        <span className="text-[0.82rem] text-ink-muted">{date}</span>
      </div>
    </motion.article>
  )
}
