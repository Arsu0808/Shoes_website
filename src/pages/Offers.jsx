import { specialOffers } from '../data/homeContent'
import './Offers.css'

const packages = [
  {
    title: 'Bridal Couture Package',
    price: '₹48,000',
    includes: ['3 makeup looks', 'Saree draping', 'Nail couture', 'Concierge'],
    savings: 'Save ₹6,500',
  },
  {
    title: 'Glow Edit Trio',
    price: '₹7,500',
    includes: ['Glass skin facial', 'Champi massage', 'Runway blowout'],
    savings: 'Save ₹1,450',
  },
]

export default function Offers() {
  return (
    <div className="offers-page">
      <section className="section-heading">
        <p>Offers & Packages</p>
        <h1>Limited-edition edits for every milestone</h1>
      </section>

      <div className="offers-page__grid">
        {specialOffers.map((offer) => (
          <article key={offer.id}>
            <img src={offer.image} alt={offer.title} loading="lazy" />
            <div>
              <span>{offer.badge}</span>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <div className="meta">
                <strong>{offer.price}</strong>
                <em>{offer.savings}</em>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="packages">
        {packages.map((pkg) => (
          <article key={pkg.title}>
            <h3>{pkg.title}</h3>
            <p>{pkg.price}</p>
            <ul>
              {pkg.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <span>{pkg.savings}</span>
            <button type="button">Book package</button>
          </article>
        ))}
      </section>
    </div>
  )
}

