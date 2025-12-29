import { useState } from 'react'
import './SizeGuide.css'

const sizeCharts = {
  men: {
    title: "Men's Size Guide",
    sizes: ['7', '8', '9', '10', '11', '12'],
    measurements: [
      { size: '7', length: '25.5 cm', width: '9.5 cm', us: '8', uk: '7', eu: '41' },
      { size: '8', length: '26.5 cm', width: '10 cm', us: '9', uk: '8', eu: '42' },
      { size: '9', length: '27.5 cm', width: '10.5 cm', us: '10', uk: '9', eu: '43' },
      { size: '10', length: '28.5 cm', width: '11 cm', us: '11', uk: '10', eu: '44' },
      { size: '11', length: '29.5 cm', width: '11.5 cm', us: '12', uk: '11', eu: '45' },
      { size: '12', length: '30.5 cm', width: '12 cm', us: '13', uk: '12', eu: '46' },
    ],
  },
  women: {
    title: "Women's Size Guide",
    sizes: ['5', '6', '7', '8', '9', '10'],
    measurements: [
      { size: '5', length: '22.5 cm', width: '8.5 cm', us: '6', uk: '4', eu: '36' },
      { size: '6', length: '23.5 cm', width: '9 cm', us: '7', uk: '5', eu: '37' },
      { size: '7', length: '24.5 cm', width: '9.5 cm', us: '8', uk: '6', eu: '38' },
      { size: '8', length: '25.5 cm', width: '10 cm', us: '9', uk: '7', eu: '39' },
      { size: '9', length: '26.5 cm', width: '10.5 cm', us: '10', uk: '8', eu: '40' },
      { size: '10', length: '27.5 cm', width: '11 cm', us: '11', uk: '9', eu: '41' },
    ],
  },
  kids: {
    title: "Kids Size Guide",
    sizes: ['3', '4', '5', '6', '7', '8'],
    measurements: [
      { size: '3', length: '17 cm', width: '6.5 cm', age: '2-3 years', eu: '20' },
      { size: '4', length: '18.5 cm', width: '7 cm', age: '3-4 years', eu: '22' },
      { size: '5', length: '20 cm', width: '7.5 cm', age: '4-5 years', eu: '24' },
      { size: '6', length: '21.5 cm', width: '8 cm', age: '5-6 years', eu: '26' },
      { size: '7', length: '23 cm', width: '8.5 cm', age: '6-7 years', eu: '28' },
      { size: '8', length: '24.5 cm', width: '9 cm', age: '7-8 years', eu: '30' },
    ],
  },
}

export default function SizeGuide() {
  const [selectedCategory, setSelectedCategory] = useState('men')
  const chart = sizeCharts[selectedCategory]

  return (
    <div className="size-guide-page">
      <section className="size-guide-hero">
        <h1>Size Guide</h1>
        <p>Find your perfect fit with our comprehensive size guide</p>
      </section>

      <div className="size-guide-content">
        <div className="category-selector">
          {Object.keys(sizeCharts).map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {sizeCharts[category].title}
            </button>
          ))}
        </div>

        <section className="size-chart-section">
          <h2>{chart.title}</h2>
          
          <div className="measurement-instructions">
            <h3>📏 How to Measure Your Foot</h3>
            <div className="instructions-grid">
              <div className="instruction-step">
                <span className="step-icon">1</span>
                <h4>Place Your Foot</h4>
                <p>Stand on a piece of paper with your heel against a wall</p>
              </div>
              <div className="instruction-step">
                <span className="step-icon">2</span>
                <h4>Mark the Length</h4>
                <p>Mark the longest point of your foot (usually the big toe)</p>
              </div>
              <div className="instruction-step">
                <span className="step-icon">3</span>
                <h4>Measure</h4>
                <p>Measure from the wall to the mark in centimeters</p>
              </div>
              <div className="instruction-step">
                <span className="step-icon">4</span>
                <h4>Find Your Size</h4>
                <p>Compare your measurement with the size chart below</p>
              </div>
            </div>
          </div>

          <div className="size-chart-table">
            <table>
              <thead>
                <tr>
                  <th>India Size</th>
                  <th>Foot Length</th>
                  <th>Foot Width</th>
                  {selectedCategory !== 'kids' && (
                    <>
                      <th>US Size</th>
                      <th>UK Size</th>
                      <th>EU Size</th>
                    </>
                  )}
                  {selectedCategory === 'kids' && (
                    <>
                      <th>Age Range</th>
                      <th>EU Size</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {chart.measurements.map((measurement) => (
                  <tr key={measurement.size}>
                    <td><strong>{measurement.size}</strong></td>
                    <td>{measurement.length}</td>
                    <td>{measurement.width}</td>
                    {selectedCategory !== 'kids' && (
                      <>
                        <td>{measurement.us}</td>
                        <td>{measurement.uk}</td>
                        <td>{measurement.eu}</td>
                      </>
                    )}
                    {selectedCategory === 'kids' && (
                      <>
                        <td>{measurement.age}</td>
                        <td>{measurement.eu}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="size-tips">
          <h2>💡 Size Tips</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <span className="tip-icon">👣</span>
              <h3>Measure Both Feet</h3>
              <p>One foot is often slightly larger than the other. Always use the measurement of the larger foot.</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">⏰</span>
              <h3>Measure in the Evening</h3>
              <p>Feet tend to swell during the day. Measure in the evening for the most accurate size.</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">🧦</span>
              <h3>Wear Socks</h3>
              <p>If you plan to wear socks with your shoes, measure while wearing the socks you'll typically use.</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">📐</span>
              <h3>Allow Some Space</h3>
              <p>There should be about 1 cm of space between your longest toe and the front of the shoe.</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">🔄</span>
              <h3>Easy Exchange</h3>
              <p>If the size doesn't fit, we offer free size exchange within 7 days of delivery.</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">📞</span>
              <h3>Need Help?</h3>
              <p>Still unsure? Contact our customer support team for personalized size recommendations.</p>
            </div>
          </div>
        </section>

        <section className="size-contact">
          <h2>❓ Still Not Sure?</h2>
          <p>Our customer support team is here to help you find the perfect fit!</p>
          <div className="contact-options">
            <a href="tel:+919876543210" className="contact-btn">
              📞 Call: +91 98765 43210
            </a>
            <a href="mailto:hello@solestyle.in" className="contact-btn">
              ✉️ Email: hello@solestyle.in
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

