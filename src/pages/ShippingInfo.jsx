import './ShippingInfo.css'

export default function ShippingInfo() {
  return (
    <div className="shipping-page">
      <section className="shipping-hero">
        <h1>Shipping Information</h1>
        <p>Everything you need to know about our shipping and delivery services</p>
      </section>

      <div className="shipping-content">
        <section className="shipping-section">
          <h2>🚚 Shipping Charges</h2>
          <div className="info-card">
            <div className="info-item">
              <h3>Free Shipping</h3>
              <p>Orders above <strong>₹1,000</strong> qualify for FREE shipping across India.</p>
            </div>
            <div className="info-item">
              <h3>Standard Shipping</h3>
              <p>Orders below ₹1,000 are charged <strong>₹50</strong> as shipping fee.</p>
            </div>
            <div className="info-item">
              <h3>Express Delivery</h3>
              <p>Available in select cities for <strong>₹150</strong> extra. Delivery in 1-2 business days.</p>
            </div>
          </div>
        </section>

        <section className="shipping-section">
          <h2>⏱️ Delivery Timeframes</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker">1</div>
              <div className="timeline-content">
                <h3>Order Processing</h3>
                <p>1-2 business days for order verification and packaging</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker">2</div>
              <div className="timeline-content">
                <h3>Standard Delivery</h3>
                <p>5-7 business days to most locations in India</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker">3</div>
              <div className="timeline-content">
                <h3>Express Delivery</h3>
                <p>1-2 business days to major cities (Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune)</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker">4</div>
              <div className="timeline-content">
                <h3>Remote Areas</h3>
                <p>May take 8-12 business days for remote locations</p>
              </div>
            </div>
          </div>
        </section>

        <section className="shipping-section">
          <h2>📍 Delivery Locations</h2>
          <div className="info-card">
            <p>We deliver to all major cities and towns across India including:</p>
            <div className="cities-grid">
              <div className="city-group">
                <h4>Metro Cities</h4>
                <ul>
                  <li>Mumbai</li>
                  <li>Delhi</li>
                  <li>Bangalore</li>
                  <li>Chennai</li>
                  <li>Kolkata</li>
                  <li>Hyderabad</li>
                  <li>Pune</li>
                </ul>
              </div>
              <div className="city-group">
                <h4>Tier 2 Cities</h4>
                <ul>
                  <li>Ahmedabad</li>
                  <li>Jaipur</li>
                  <li>Lucknow</li>
                  <li>Chandigarh</li>
                  <li>Bhopal</li>
                  <li>Indore</li>
                  <li>And many more...</li>
                </ul>
              </div>
            </div>
            <p className="note">We also deliver to smaller towns and villages. Delivery time may vary for remote locations.</p>
          </div>
        </section>

        <section className="shipping-section">
          <h2>📦 Order Tracking</h2>
          <div className="info-card">
            <div className="tracking-steps">
              <div className="step">
                <span className="step-icon">📧</span>
                <h3>Order Confirmation</h3>
                <p>You'll receive an email and SMS with order details and tracking number</p>
              </div>
              <div className="step">
                <span className="step-icon">📦</span>
                <h3>Order Shipped</h3>
                <p>You'll receive shipping confirmation with tracking link</p>
              </div>
              <div className="step">
                <span className="step-icon">🚚</span>
                <h3>In Transit</h3>
                <p>Track your order in real-time using the tracking number</p>
              </div>
              <div className="step">
                <span className="step-icon">✅</span>
                <h3>Delivered</h3>
                <p>You'll receive delivery confirmation once your order arrives</p>
              </div>
            </div>
            <p className="note">Track your order by logging into your account and visiting "My Orders" section.</p>
          </div>
        </section>

        <section className="shipping-section">
          <h2>⚠️ Important Notes</h2>
          <div className="info-card warning">
            <ul>
              <li>Delivery times may be extended during festivals, sales, and peak seasons</li>
              <li>Please ensure someone is available to receive the package at the delivery address</li>
              <li>For Cash on Delivery (COD), exact change is appreciated</li>
              <li>If you're not available, the courier will attempt delivery 2-3 times</li>
              <li>After multiple failed attempts, the order may be returned to us</li>
              <li>Please provide accurate address details to avoid delivery delays</li>
            </ul>
          </div>
        </section>

        <section className="shipping-section">
          <h2>❓ Need Help?</h2>
          <div className="contact-box">
            <p>If you have any questions about shipping or delivery, feel free to contact us:</p>
            <div className="contact-info">
              <a href="tel:+6260289367">📞 +91 6260289367</a>
              <a href="mailto:hello@solestyle.in">✉️ hello@solestyle.in</a>
              <p>📍 Satna, Panna Naka, Satna, Madhya Pradesh 485001</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

