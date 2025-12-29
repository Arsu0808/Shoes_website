import './Membership.css'

const tiers = [
  {
    name: 'Silver',
    price: '₹9,999 / year',
    perks: ['10% off services', 'Priority booking', '2 complimentary blowouts'],
  },
  {
    name: 'Gold',
    price: '₹19,999 / year',
    perks: ['15% off', 'Dedicated artist hotline', 'Unlimited champi bar', 'Early access to drops'],
  },
  {
    name: 'Platinum',
    price: '₹35,000 / year',
    perks: ['20% off', 'Bridal suite access', 'On-call concierge', 'VIP events'],
  },
]

export default function Membership() {
  return (
    <div className="membership-page">
      <section className="section-heading">
        <p>Membership</p>
        <h1>Join SoleStyle Rewards</h1>
      </section>
      <div className="membership-grid">
        {tiers.map((tier) => (
          <article key={tier.name}>
            <h3>{tier.name}</h3>
            <p>{tier.price}</p>
            <ul>
              {tier.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
            <button type="button">Join now</button>
          </article>
        ))}
      </div>
    </div>
  )
}

