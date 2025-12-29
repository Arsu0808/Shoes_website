import { motion } from 'framer-motion'
import { useRef } from 'react'
import { BsShieldCheck } from 'react-icons/bs'
import { HiSparkles } from 'react-icons/hi2'
import { LuDroplet, LuZap } from 'react-icons/lu'
import {
  experienceStats,
  featuredServices,
  galleryGrid,
  heroMedia,
  specialOffers,
  testimonials,
  whyChoosePoints,
} from '../../data/homeContent'
import { Button } from '../common/Button'

import './HomeSections.css'

const fadeItem = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: 'easeOut' },
  }),
}

const iconMap = {
  sparkles: HiSparkles,
  drop: LuDroplet,
  shield: BsShieldCheck,
  flash: LuZap,
}

export function HeroSection() {
  return (
    <section className="hero hero--immersive">
      <div className="hero__background">
        <video autoPlay loop muted playsInline poster={heroMedia.poster}>
          <source src={heroMedia.video} type="video/mp4" />
        </video>
        <div className="hero__overlay" />
      </div>

      <div className="hero__body">
        <motion.p className="hero__eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Premium Grooming Studio · India
        </motion.p>
        <motion.h1 initial="hidden" animate="visible" variants={fadeItem}>
          Redefine your style with premium grooming
        </motion.h1>
        <motion.p className="hero__description" initial="hidden" animate="visible" custom={2} variants={fadeItem}>
          Discover premium footwear for every occasion. From formal dress shoes to casual sneakers, find your perfect pair.
        </motion.p>
        <motion.div className="hero__actions" initial="hidden" animate="visible" custom={3} variants={fadeItem}>
          <Button variant="primary" size="lg">
            Book Appointment
          </Button>
          <Button variant="ghost" size="lg">
            View Services
          </Button>
        </motion.div>
        <motion.div className="hero__stats hero__stats--grid" initial="hidden" animate="visible" custom={4} variants={fadeItem}>
          <div>
            <span>4.9⭐</span>
            <p>2,400+ verified reviews</p>
          </div>
          <div>
            <span>12 yrs</span>
            <p>Crafting couture looks</p>
          </div>
          <div>
            <span>18</span>
            <p>Master artists on roster</p>
          </div>
        </motion.div>
      </div>

      <div className="hero__gallery">
        {heroMedia.gallery.map((image, idx) => (
          <motion.div
            key={image.alt}
            className="hero__card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
          </motion.div>
        ))}
      </div>

      {heroMedia.floating?.map((floatImage, idx) => (
        <motion.img
          key={floatImage.alt}
          src={floatImage.src}
          alt={floatImage.alt}
          className="hero__float"
          style={floatImage.style}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.75, scale: 1 }}
          transition={{ delay: idx * 0.3, duration: 0.8 }}
        />
      ))}
    </section>
  )
}

export function FeaturedServicesSlider() {
  const railRef = useRef(null)

  const scrollBy = (direction) => {
    if (!railRef.current) return
    railRef.current.scrollBy({
      left: direction * 320,
      behavior: 'smooth',
    })
  }

  return (
    <section className="section featured-slider">
      <div className="section-heading">
        <p>Featured Rituals</p>
        <h2>Curated services designed for the season</h2>
      </div>
      <div className="featured-slider__controls">
        <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous services">
          ‹
        </button>
        <button type="button" onClick={() => scrollBy(1)} aria-label="Next services">
          ›
        </button>
      </div>
      <div className="featured-slider__rail" ref={railRef} role="list">
        {featuredServices.map((service, idx) => (
          <motion.article
            key={service.title}
            className="featured-card"
            role="listitem"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <span className="featured-card__tag">{service.tag}</span>
            <img src={service.image} alt={service.title} loading="lazy" />
            <div className="featured-card__body">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="featured-card__meta">
                <span>{service.price}</span>
                <span>{service.duration}</span>
                <span>⭐ {service.rating}</span>
              </div>
              <Button variant='primary' size='sm'>Book Now</Button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export function WhyChooseUs() {
  return (
    <section className="section why-us">
      <div className="section-heading">
        <p>Why SoleStyle</p>
        <h2>Experience-first, science-backed beauty</h2>
      </div>
      <div className="why-us__grid">
        {whyChoosePoints.map((point, idx) => {
          const Icon = iconMap[point.icon]
          return (
            <motion.article
              key={point.id}
              className="why-us__card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              {Icon && <Icon size={28} />}
              <h3>{point.title}</h3>
              <p>{point.description}</p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}

export function ExperienceHighlights() {
  return (
    <section className="section experience-highlight">
      <div className="experience-highlight__glow" />
      <div className="section-heading">
        <p>Salon Experience</p>
        <h2>Immersive rituals guided by master artists</h2>
      </div>
      <div className="experience-highlight__stats">
        {experienceStats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            className="experience-highlight__stat"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <span>{stat.value}</span>
            <p>{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function OffersHighlight() {
  return (
    <section className="section offers">
      <div className="offers__header">
        <div className="section-heading">
          <p>Seasonal offers</p>
          <h2>Celebrate every milestone with curated bundles</h2>
        </div>
        <Button variant="ghost">View all offers</Button>
      </div>
      <div className="offers__grid">
        {specialOffers.map((offer, idx) => (
          <motion.article
            key={offer.id}
            className="offer-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <img src={offer.image} alt={offer.title} loading="lazy" />
            <div className="offer-card__body">
              <span className="offer-card__badge">{offer.badge}</span>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <div className="offer-card__meta">
                <strong>{offer.price}</strong>
                <span>{offer.savings}</span>
              </div>
              <Button variant="primary" size="sm">
                Book package
              </Button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export function TestimonialsCarousel() {
  return (
    <section className="section testimonials">
      <div className="section-heading">
        <p>Client Love</p>
        <h2>Stories from Our Customers</h2>
      </div>
      <div className="testimonials__carousel" role="list">
        {testimonials.map((testimonial, idx) => (
          <motion.article
            key={testimonial.name}
            className="testimonial-card"
            role="listitem"
            initial={{ opacity: 0.5, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
          >
            <div className="testimonial-card__profile">
              <img src={testimonial.avatar} alt={testimonial.name} loading="lazy" />
              <div>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </div>
            </div>
            <p>{testimonial.quote}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export function GalleryPreview() {
  return (
    <section className="section gallery">
      <div className="section-heading">
        <p>Gallery</p>
        <h2>Our Shoe Collection</h2>
      </div>
      <div className="gallery__grid">
        {galleryGrid.map((image, idx) => (
          <motion.div
            key={image + idx}
            className="gallery__item"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
          >
            <img src={image} alt="Salon look" loading="lazy" />
          </motion.div>
        ))}
      </div>
      <div className="gallery__cta">
        <Button variant="ghost">View full gallery</Button>
      </div>
    </section>
  )
}

