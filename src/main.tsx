import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import './styles/base.css'
import './i18n'

export const createRoot = ViteReactSSG({ routes, basename: import.meta.env.BASE_URL })
