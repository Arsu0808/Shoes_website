import { Link } from 'react-router-dom'
import { NAV_LINKS } from '../../data/navigation'

export function Footer() {
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-icon">👟</span>
            <span className="footer__logo-text">SoleStyle</span>
          </div>
          <p>Premium footwear for every step of your journey. Quality, comfort, and style in every pair.</p>
          <div className="footer__social">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="WhatsApp">💬</a>
          </div>
        </div>
        <div className="footer__section">
          <h5>Shop</h5>
          <div className="footer__links">
            <Link to="/shoes?category=men" onClick={handleLinkClick}>Men&apos;s Shoes</Link>
            <Link to="/shoes?category=women" onClick={handleLinkClick}>Women&apos;s Shoes</Link>
            <Link to="/shoes?category=kids" onClick={handleLinkClick}>Kids Shoes</Link>
            <Link to="/shoes" onClick={handleLinkClick}>All Products</Link>
          </div>
        </div>
        <div className="footer__section">
          <h5>Company</h5>
          <div className="footer__links">
            <Link to="/about" onClick={handleLinkClick}>About Us</Link>
            <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
            <a href="#">Careers</a>
            <Link to="/blog" onClick={handleLinkClick}>Blog</Link>
          </div>
        </div>
        <div className="footer__section">
          <h5>Support</h5>
          <div className="footer__links">
            <Link to="/shipping-info" onClick={handleLinkClick}>Shipping Info</Link>
            <Link to="/return-policy" onClick={handleLinkClick}>Returns</Link>
            <Link to="/size-guide" onClick={handleLinkClick}>Size Guide</Link>
            <Link to="/faq" onClick={handleLinkClick}>FAQs</Link>
          </div>
        </div>
        <div className="footer__section">
          <h5>Contact</h5>
          <p className="footer__contact">
            📍 Satna,Panna Naka<br />
            Satna, Madhya Pradesh 485001<br />
            India
          </p>
          <p className="footer__contact">
            📞 +91 98765 43210<br />
            ✉️ hello@solestyle.in
          </p>
          <p className="footer__hours">
            Mon - Sat: 10am - 9pm<br />
            Sunday: 11am - 6pm
          </p>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="footer__bottom-content">
          <span>© {new Date().getFullYear()} SoleStyle. All rights reserved.</span>
          <div className="footer__legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Refund Policy</a>
          </div>
        </div>
        <div className="footer__payment-methods">
          <span>We Accept:</span>
          <div className="payment-icons">
            <span>💳</span>
            <span>📱</span>
            <span>🏦</span>
            <span>💰</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

