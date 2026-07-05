import type { RouteObject } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import HomePage       from '@/pages/HomePage'
import AboutPage      from '@/pages/AboutPage'
// TODO: Training page is built but held back for a later release — restore the import and route below to ship it.
// import TrainingPage   from '@/pages/TrainingPage'
import WeekPaperPage  from '@/pages/WeekPaperPage'
import TeamPage       from '@/pages/TeamPage'
import ContactPage    from '@/pages/ContactPage'

function RootLayout() {
  return (
    <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <a className="skip" href="#main">
          {i18n.t('skip_to_content', { ns: 'common' })}
        </a>
        <ScrollToTop />
        <Header />
        <Outlet />
        <Footer />
      </I18nextProvider>
    </HelmetProvider>
  )
}

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,            element: <HomePage /> },
      { path: 'about',          element: <AboutPage /> },
      // { path: 'training',       element: <TrainingPage /> },
      { path: 'week-paper',     element: <WeekPaperPage /> },
      { path: 'team',           element: <TeamPage /> },
      { path: 'contact',        element: <ContactPage /> },
    ],
  },
]
