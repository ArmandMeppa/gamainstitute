export type TagVariant = 'copper' | 'teal' | 'default'

export interface Course {
  id:           string
  categoryKey:  string
  tagVariant:   TagVariant
  durationWeeks: number
  levelKey:     string
  imageSrc?:    string
}

export interface Category {
  key:    string
  color:  string
  count:  number
}
