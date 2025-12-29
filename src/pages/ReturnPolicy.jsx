import './ReturnPolicy.css'

export default function ReturnPolicy() {
  return (
    <div className="return-page">
      <section className="return-hero">
        <h1>Return & Refund Policy</h1>
        <p>We want you to be completely satisfied with your purchase</p>
      </section>

      <div className="return-content">
        <section className="return-section">
          <h2>🔄 Return Policy</h2>
          <div className="info-card">
            <h3>7-Day Return Window</h3>
            <p>You can return any product within <strong>7 days</strong> of delivery if you're not satisfied with your purchase.</p>
            
            <div className="return-conditions">
              <h4>Return Conditions:</h4>
              <ul>
                <li>✅ Product must be in original, unworn condition</li>
                <li>✅ All original tags and labels must be attached</li>
                <li>✅ Original packaging must be intact</li>
                <li>✅ Product should not show any signs of wear or damage</li>
                <li>✅ Accessories and freebies (if any) must be included</li>
              </ul>
            </div>

            <div className="return-not-eligible">
              <h4>Items Not Eligible for Return:</h4>
              <ul>
                <li>❌ Products worn or used</li>
                <li>❌ Products without original tags</li>
                <li>❌ Products damaged by customer</li>
                <li>❌ Products returned after 7 days</li>
                <li>❌ Customized or personalized items</li>
                <li>❌ Products purchased during clearance sales (unless defective)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="return-section">
          <h2>📝 How to Return</h2>
          <div className="return-steps">
            <div className="return-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Initiate Return</h3>
                <p>Log in to your account, go to "My Orders", select the order, and click "Return". Alternatively, contact our customer support.</p>
              </div>
            </div>
            <div className="return-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Pack the Product</h3>
                <p>Pack the product in its original packaging with all tags and accessories. Include the return form (if provided).</p>
              </div>
            </div>
            <div className="return-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Schedule Pickup</h3>
                <p>Our team will arrange a pickup from your address. You'll receive a confirmation email with pickup details.</p>
              </div>
            </div>
            <div className="return-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Quality Check</h3>
                <p>Once we receive the product, we'll verify its condition. This usually takes 2-3 business days.</p>
              </div>
            </div>
            <div className="return-step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h3>Refund Processing</h3>
                <p>Upon approval, your refund will be processed within 5-7 business days to your original payment method.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="return-section">
          <h2>💰 Refund Policy</h2>
          <div className="info-card">
            <div className="refund-info">
              <h3>Refund Timeline</h3>
              <ul>
                <li><strong>Processing Time:</strong> 2-3 business days after receiving the return</li>
                <li><strong>Refund Time:</strong> 5-7 business days after approval</li>
                <li><strong>Total Time:</strong> 7-10 business days from return pickup</li>
              </ul>
            </div>

            <div className="refund-methods">
              <h3>Refund Methods</h3>
              <div className="method-grid">
                <div className="method-item">
                  <span className="method-icon">💳</span>
                  <h4>Credit/Debit Card</h4>
                  <p>Refunded to the same card used for payment</p>
                </div>
                <div className="method-item">
                  <span className="method-icon">📱</span>
                  <h4>UPI</h4>
                  <p>Refunded to the same UPI ID used for payment</p>
                </div>
                <div className="method-item">
                  <span className="method-icon">🏦</span>
                  <h4>Net Banking</h4>
                  <p>Refunded to the same bank account</p>
                </div>
                <div className="method-item">
                  <span className="method-icon">💵</span>
                  <h4>Cash on Delivery</h4>
                  <p>Refunded via bank transfer or store credit</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="return-section">
          <h2>🚚 Return Shipping</h2>
          <div className="info-card">
            <div className="shipping-info">
              <div className="shipping-item free">
                <h3>🆓 Free Returns</h3>
                <p>Returns are FREE for:</p>
                <ul>
                  <li>Defective or damaged products</li>
                  <li>Wrong products delivered</li>
                  <li>Size exchange (first exchange only)</li>
                </ul>
              </div>
              <div className="shipping-item chargeable">
                <h3>💰 Return Shipping Charges</h3>
                <p>Return shipping charges apply for:</p>
                <ul>
                  <li>Change of mind returns</li>
                  <li>Second or subsequent exchanges</li>
                  <li>Returns due to customer error</li>
                </ul>
                <p className="charge-amount">Return shipping charge: <strong>₹50</strong></p>
              </div>
            </div>
          </div>
        </section>

        <section className="return-section">
          <h2>🔄 Exchange Policy</h2>
          <div className="info-card">
            <h3>Size Exchange</h3>
            <p>We offer size exchanges within 7 days of delivery, subject to availability. The first exchange is free, subsequent exchanges may incur charges.</p>
            
            <div className="exchange-conditions">
              <h4>Exchange Conditions:</h4>
              <ul>
                <li>✅ Product must be unworn and in original condition</li>
                <li>✅ Original tags and packaging must be intact</li>
                <li>✅ Exchange is subject to stock availability</li>
                <li>✅ Price difference (if any) will be adjusted</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="return-section">
          <h2>⚠️ Important Notes</h2>
          <div className="info-card warning">
            <ul>
              <li>Please inspect the product immediately upon delivery</li>
              <li>Report any defects or damages within 24 hours</li>
              <li>Keep the original packaging until you're satisfied with the product</li>
              <li>Return requests must be initiated within 7 days of delivery</li>
              <li>Refunds will be processed only after quality verification</li>
              <li>For COD orders, refunds are processed via bank transfer</li>
            </ul>
          </div>
        </section>

        <section className="return-section">
          <h2>❓ Need Help?</h2>
          <div className="contact-box">
            <p>For any questions about returns or refunds, contact us:</p>
            <div className="contact-info">
              <a href="tel:+919876543210">📞 +91 98765 43210</a>
              <a href="mailto:hello@solestyle.in">✉️ hello@solestyle.in</a>
              <p>📍 Satna, Panna Naka, Satna, Madhya Pradesh 485001</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

