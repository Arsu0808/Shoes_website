import { useMemo, useState } from 'react'
import { galleryFilters, galleryItems, galleryVideos } from '../data/gallery'
import './Gallery.css'

export default function Gallery() {
  const [filter, setFilter] = useState('All')

  const filteredItems = useMemo(() => {
    if (filter === 'All') return galleryItems
    return galleryItems.filter((item) => item.category === filter)
  }, [filter])

  return (
    <div className="gallery-page">
      <section className="gallery-hero">
        <div>
          <p className="hero__eyebrow">Gallery</p>
          <h1>Our Shoe Gallery</h1>
          <p>Before-afters, editorial looks, and makeover reels shot in Mumbai, Delhi, and destination weddings.</p>
        </div>
        <div className="gallery-filters">
          {galleryFilters.map((category) => (
            <button
              key={category}
              type="button"
              className={filter === category ? 'is-active' : ''}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="gallery-grid">
        {filteredItems.map((item) => (
          <figure key={item.id}>
            <img src={item.src} alt={`${item.category} look`} loading="lazy" />
            <figcaption>{item.category}</figcaption>
          </figure>
        ))}
      </section>

      <section className="gallery-videos">
        <h2>Makeover reels</h2>
        <div className="gallery-videos__grid">
          {galleryVideos.map((video) => (
            <article key={video.id}>
              <iframe src={video.url} title={video.title} loading="lazy" allow="autoplay; fullscreen; picture-in-picture" />
              <p>{video.title}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

