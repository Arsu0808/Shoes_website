import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../../data/navigation'
import { ThemeToggle } from './ThemeToggle'
import { useSession } from '../../hooks/useSession'
import { Cart } from '../Cart'

import './layout.css'

export function Navbar() {
  const { user, logout, loading } = useSession()
  const [cartOpen, setCartOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  // Close sidebar when route changes (but keep cart open unless navigating to checkout)
  useEffect(() => {
    // Use setTimeout to defer state updates and avoid cascading renders
    const timeoutId = setTimeout(() => {
      setSidebarOpen(false)
      // Only close cart when navigating to checkout or order success pages
      // Don't close cart on other route changes
      if (location.pathname === '/checkout' || location.pathname.startsWith('/order-success')) {
        setCartOpen(false)
      }
    }, 0)
    return () => clearTimeout(timeoutId)
  }, [location.pathname])

  // Prevent body scroll when sidebar or cart is open
  useEffect(() => {
    if (sidebarOpen || cartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [sidebarOpen, cartOpen])

  const handleLogout = async () => {
    try {
      await logout()
      setSidebarOpen(false)
    } catch (error) {
      console.error('Unable to logout', error)
    }
  }

  const firstName = user?.name?.split(' ')[0] || 'Profile'

  return (
    <>
      <header className="navbar">
        <div className="navbar__inner">
          <div className="navbar__left">
            <button 
              className="navbar__hamburger"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <NavLink to="/" className="navbar__brand" onClick={() => setSidebarOpen(false)}>
              <span className="navbar__logo">
                <span className="navbar__logo-icon">👟</span>
                <span>SoleStyle</span>
              </span>
              <span className="navbar__tagline">Premium Footwear</span>
            </NavLink>
          </div>

          <nav className="navbar__links">
            {NAV_LINKS.map(({ label, path, highlight }) => (
              <NavLink 
                key={path} 
                to={path} 
                className={({ isActive }) => (isActive ? 'is-active' : '')}
                onClick={() => setSidebarOpen(false)}
              >
                <span className={highlight ? 'navbar__link--pill' : undefined}>{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="navbar__actions">
            <ThemeToggle />
            <button 
              className="navbar__cart-btn" 
              onClick={() => {
                console.log('Cart button clicked, current state:', cartOpen)
                setSidebarOpen(false) // Close sidebar when opening cart
                setCartOpen(true)
                console.log('Cart should be open now')
              }}
              aria-label="Shopping Cart"
            >
              🛒
            </button>
            {loading ? (
              <span className="navbar__user-pill is-loading">Syncing…</span>
            ) : user ? (
              <>
                <NavLink to="/profile" className="navbar__user-pill">
                  {firstName}
                </NavLink>
                {user.role === 'admin' && (
                  <NavLink to="/admin" className="salon-button salon-button--ghost salon-button--sm">
                    Admin
                  </NavLink>
                )}
                <button type="button" className="salon-button salon-button--ghost salon-button--sm" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className="salon-button salon-button--ghost salon-button--sm">
                Login
              </NavLink>
            )}
            <NavLink to="/shoes" className="salon-button salon-button--primary salon-button--sm">
              Shop Now
            </NavLink>
          </div>
        </div>
        <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </header>

      {/* Mobile Sidebar */}
      <div 
        className={`navbar__sidebar ${sidebarOpen ? 'is-open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setSidebarOpen(false)
          }
        }}
      >
        <div className="navbar__sidebar-content">
          <div className="navbar__sidebar-header">
            <NavLink to="/" className="navbar__sidebar-brand" onClick={() => setSidebarOpen(false)}>
              <span className="navbar__logo-icon">👟</span>
              <span>SoleStyle</span>
            </NavLink>
            <button 
              className="navbar__sidebar-close"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <nav className="navbar__sidebar-links">
            {NAV_LINKS.map(({ label, path, highlight }) => (
              <NavLink 
                key={path} 
                to={path} 
                className={({ isActive }) => `navbar__sidebar-link ${isActive ? 'is-active' : ''} ${highlight ? 'is-highlight' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="navbar__sidebar-actions">
            <div className="navbar__sidebar-user">
              {loading ? (
                <span className="navbar__user-pill is-loading">Syncing…</span>
              ) : user ? (
                <>
                  <NavLink to="/profile" className="navbar__user-pill" onClick={() => setSidebarOpen(false)}>
                    👤 {firstName}
                  </NavLink>
                  {user.role === 'admin' && (
                    <NavLink to="/admin" className="salon-button salon-button--ghost salon-button--sm" onClick={() => setSidebarOpen(false)}>
                      Admin Panel
                    </NavLink>
                  )}
                  <button type="button" className="salon-button salon-button--ghost salon-button--sm" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <NavLink to="/login" className="salon-button salon-button--primary salon-button--sm" onClick={() => setSidebarOpen(false)}>
                  Login / Sign Up
                </NavLink>
              )}
            </div>
            <div className="navbar__sidebar-footer">
              <ThemeToggle />
              <button 
                className="navbar__sidebar-cart-btn" 
                onClick={() => {
                  setSidebarOpen(false)
                  // Small delay to ensure sidebar closes before cart opens
                  setTimeout(() => {
                    setCartOpen(true)
                  }, 100)
                }}
              >
                🛒 Shopping Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

