import { useEffect, useMemo, useState } from 'react'
import { DURATION_FILTERS, PRICE_FILTERS, SERVICE_CATEGORIES, SORT_OPTIONS } from '../data/services'
import { ServiceFilters } from '../components/sections/services/ServiceFilters'
import { ServiceCard } from '../components/sections/services/ServiceCard'
import { ServiceDetailModal } from '../components/sections/services/ServiceDetailModal'
import '../components/sections/services/services.css'
import { fetchServices } from '../api/services'

const initialFilters = {
  search: '',
  category: 'all',
  price: 'all',
  duration: 'all',
  sort: 'popular',
}

export default function Services() {
  const [filters, setFilters] = useState(initialFilters)
  const [selectedService, setSelectedService] = useState(null)
  const [services, setServices] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })

  useEffect(() => {
    let isMounted = true
    const load = async () => {
      setStatus({ loading: true, error: '' })
      try {
        const data = await fetchServices()
        if (!isMounted) return
        const mapped = data.map((service) => ({
          id: service._id,
          name: service.title,
          description: service.description,
          category: service.category,
          price: service.price,
          duration: service.durationMinutes,
          image: service.images?.[0],
          rating: service.rating || 4.8,
          popularity: service.popularity || 90,
          includes: service.extras?.map((extra) => extra.name) || [],
          extras: service.extras || [],
          tags: service.tags || [],
          availability: service.availability,
        }))
        setServices(mapped)
        setStatus({ loading: false, error: '' })
      } catch (error) {
        if (!isMounted) return
        setStatus({ loading: false, error: error.message || 'Unable to load services' })
      }
    }
    load()
    return () => {
      isMounted = false
    }
  }, [])

  const filteredServices = useMemo(() => {
    let results = [...services]

    if (filters.category !== 'all') {
      results = results.filter((service) => service.category === filters.category)
    }

    if (filters.search.trim()) {
      const query = filters.search.toLowerCase()
      results = results.filter(
        (service) =>
          service.name.toLowerCase().includes(query) || service.description.toLowerCase().includes(query)
      )
    }

    if (filters.price !== 'all') {
      const priceFilter = PRICE_FILTERS.find((filter) => filter.id === filters.price)
      if (priceFilter) {
        const [min, max] = priceFilter.range
        results = results.filter((service) => service.price >= min && service.price <= max)
      }
    }

    if (filters.duration !== 'all') {
      const durationFilter = DURATION_FILTERS.find((filter) => filter.id === filters.duration)
      if (durationFilter?.max) {
        results = results.filter((service) => service.duration <= durationFilter.max)
      } else if (durationFilter?.min) {
        results = results.filter((service) => service.duration >= durationFilter.min)
      }
    }

    switch (filters.sort) {
      case 'rating':
        results.sort((a, b) => b.rating - a.rating)
        break
      case 'price-asc':
        results.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        results.sort((a, b) => b.price - a.price)
        break
      case 'popular':
      default:
        results.sort((a, b) => b.popularity - a.popularity)
        break
    }

    return results
  }, [filters, services])

  return (
    <section className="services-page">
      <header className="services-page__header">
        <p className="hero__eyebrow">Service Menu</p>
        <h1>Crafted rituals for hair, skin, nails, and more</h1>
        <p>
          Browse curated categories, filter by time or budget, and dive into detail sheets with inclusions, benefits, and
          artist availability.
        </p>
      </header>

      <ServiceFilters
        categories={SERVICE_CATEGORIES}
        priceFilters={PRICE_FILTERS}
        durationFilters={DURATION_FILTERS}
        sortOptions={SORT_OPTIONS}
        filters={filters}
        onChange={setFilters}
      />

      <div className="services-category-pills">
        {SERVICE_CATEGORIES.filter((category) => category.id !== 'all').map((category) => (
          <button
            key={category.id}
            type="button"
            className={filters.category === category.id ? 'is-active' : ''}
            onClick={() => setFilters((prev) => ({ ...prev, category: category.id }))}
          >
            {category.label}
          </button>
        ))}
        <button
          type="button"
          className={filters.category === 'all' ? 'is-active' : ''}
          onClick={() => setFilters((prev) => ({ ...prev, category: 'all' }))}
        >
          Show All
        </button>
      </div>

      {status.loading && <p>Loading services…</p>}

      {status.error && (
        <div className="empty-state">
          <h3>Could not load services</h3>
          <p>{status.error}</p>
        </div>
      )}

      {!status.loading && !status.error && (
        <div className="services-grid-list">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} onSelect={setSelectedService} />
          ))}
        </div>
      )}

      {filteredServices.length === 0 && (
        <div className="empty-state">
          <h3>No services match your filters</h3>
          <p>Try resetting filters or searching with a different term.</p>
        </div>
      )}

      <section className="services-category-section">
        {SERVICE_CATEGORIES.filter((cat) => cat.id !== 'all').map((category) => {
          const categoryServices = services.filter((service) => service.category === category.id).slice(0, 3)
          if (!categoryServices.length) return null
          return (
            <div key={category.id} className="services-category-block">
              <h3>{category.label}</h3>
              <div className="services-grid-list services-grid-list--mini">
                {categoryServices.map((service) => (
                  <ServiceCard key={`${category.id}-${service.id}`} service={service} onSelect={setSelectedService} />
                ))}
              </div>
            </div>
          )
        })}
      </section>

      <ServiceDetailModal service={selectedService} onClose={() => setSelectedService(null)} />
    </section>
  )
}

