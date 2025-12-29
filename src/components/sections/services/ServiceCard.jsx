import { Button } from '../../common/Button'
import './services.css'

export function ServiceCard({ service, onSelect }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelect(service)
    }
  }

  return (
    <article
      className="service-tile"
      onClick={() => onSelect(service)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {service.offerTag && <span className="service-tile__offer">{service.offerTag}</span>}
      {service.trend && <span className="service-tile__trend">{service.trend}</span>}
      <img src={service.image || '/vite.svg'} alt={service.name} loading="lazy" />
      <div className="service-tile__body">
        <div className="service-tile__header">
          <div>
            <p className="service-tile__category">{service.subcategory || service.category}</p>
            <h3>{service.name}</h3>
          </div>
          <div className="service-tile__rating">
            ⭐ {(service.rating || 4.8).toFixed(1)}
            <span>({service.popularity || 25} booked)</span>
          </div>
        </div>
        <p className="service-tile__description">{service.description}</p>
        <div className="service-tile__meta">
          <span>₹{service.price?.toLocaleString('en-IN')}</span>
          <span>{service.duration} mins</span>
        </div>
        <div className="service-tile__actions" onClick={(event) => event.stopPropagation()}>
          <Button variant="primary" size="sm">
            Book Now
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onSelect(service)}>
            View details
          </Button>
        </div>
      </div>
    </article>
  )
}

