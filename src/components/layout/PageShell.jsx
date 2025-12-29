import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ScrollToTop } from './ScrollToTop'

export function PageShell() {
  return (
    <div className="page-shell">
      <ScrollToTop />
      <Navbar />
      <main className="page-container">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

