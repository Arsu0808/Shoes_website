import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { shoesApi } from '../api/shoes'
import { Button } from '../components/common/Button'
import { formatINR } from '../utils/currency'
import { heroCarouselImages, shoeImages } from '../data/shoeImages'
import './Home.css'

const fadeItem = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: 'easeOut' },
  }),
}

export default function Home() {
  const [featuredShoes, setFeaturedShoes] = useState([])
  const [minPrices, setMinPrices] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [shoesData, pricesData] = await Promise.all([
          shoesApi.getAll({ featured: true, sortBy: 'rating', sortOrder: 'desc' }),
          shoesApi.getMinPrices(),
        ])
        setFeaturedShoes(shoesData.shoes?.slice(0, 6) || [])
        // Ensure minPrices are valid numbers - handle both flat and nested structures
        const validMinPrices = {}
        if (pricesData) {
          Object.keys(pricesData).forEach(key => {
            const priceData = pricesData[key]
            // Handle nested structure { minPrice: 399, count: 8 } or flat structure 399
            const value = typeof priceData === 'object' && priceData !== null 
              ? Number(priceData.minPrice || priceData.price || 0)
              : Number(priceData)
            if (!isNaN(value) && value > 0) {
              validMinPrices[key] = value
            }
          })
        }
        setMinPrices(validMinPrices)
      } catch (error) {
        console.error('Failed to load data', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  return (
    <>
      <HeroSection minPrices={minPrices} />
      <FeaturedShoesSection shoes={featuredShoes} loading={loading} />
      <CategoryShowcase minPrices={minPrices} />
      <WhyChooseUs />
      <TestimonialsSection />
    </>
  )
}

function HeroSection({ minPrices }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroCarouselImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="hero hero--shoes">
      <div className="hero__carousel">
        {heroCarouselImages.map((img, idx) => (
          <div
            key={idx}
            className={`hero__carousel-slide ${idx === currentImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="hero__carousel-overlay"></div>
      </div>
      {/* Modern Decorative Elements */}
      <div className="hero__decorative-elements">
        {/* Animated gradient orbs */}
        <motion.div
          className="decorative-orb decorative-orb--1"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="decorative-orb decorative-orb--2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.3, 1],
            x: [0, -25, 0],
            y: [0, 15, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="decorative-orb decorative-orb--3"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.25, 0.45, 0.25],
            scale: [1, 1.15, 1],
            x: [0, 20, 0],
            y: [0, 25, 0]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Animated geometric shapes */}
        <motion.div
          className="decorative-shape decorative-shape--circle"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            rotate: 360
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="decorative-shape decorative-shape--square"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            rotate: -360
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Shoe icon decorations */}
        <motion.div
          className="decorative-icon decorative-icon--1"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          👟
        </motion.div>
        <motion.div
          className="decorative-icon decorative-icon--2"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0],
            y: [0, 30, 0]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          👠
        </motion.div>
        <motion.div
          className="decorative-icon decorative-icon--3"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0],
            y: [0, -25, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        >
          👢
        </motion.div>
      </div>
      
      {/* Animated background gradient */}
      <div className="hero__animated-gradient"></div>
      
      {/* Floating Shoe Images - Mobile Only - Ultra Attractive */}
      <div className="hero__floating-images">
        <motion.div
          className="floating-shoe floating-shoe--1"
          initial={{ opacity: 0, y: 80, rotate: -20, scale: 0.8 }}
          animate={{ 
            opacity: [0.8, 1, 0.8],
            y: [0, -40, 0],
            x: [0, 25, 0],
            rotate: [-20, -12, -20],
            scale: [1, 1.12, 1]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop&q=90" 
            alt="Premium Sneakers"
            loading="eager"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop'
            }}
          />
          <div className="floating-shoe__badge">New</div>
        </motion.div>
        <motion.div
          className="floating-shoe floating-shoe--2"
          initial={{ opacity: 0, y: 80, rotate: 20, scale: 0.8 }}
          animate={{ 
            opacity: [0.8, 1, 0.8],
            y: [0, -50, 0],
            x: [0, -30, 0],
            rotate: [20, 25, 20],
            scale: [1, 1.15, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=500&fit=crop&q=90" 
            alt="Elegant Heels"
            loading="eager"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=500&fit=crop'
            }}
          />
          <div className="floating-shoe__badge">Trending</div>
        </motion.div>
      </div>
      
      <div className="hero__content">
        <motion.p className="hero__eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Premium Footwear Collection
        </motion.p>
        <motion.h1 initial="hidden" animate="visible" variants={fadeItem}>
          Step Into Style
          <br />
          <span className="hero__highlight">Premium Shoes</span>
        </motion.h1>
        <motion.p className="hero__description" initial="hidden" animate="visible" custom={2} variants={fadeItem}>
          Discover our curated collection of premium footwear. From casual sneakers to elegant formal shoes, 
          find your perfect pair at unbeatable prices.
        </motion.p>
        {Object.keys(minPrices).length > 0 && (
          <motion.div 
            className="hero__min-prices" 
            initial="hidden" 
            animate="visible" 
            custom={3} 
            variants={fadeItem}
          >
            <span className="min-price-label">Starting from:</span>
            {minPrices.men && !isNaN(minPrices.men) && (
              <div className="min-price-item">
                <span className="min-price-category">Men&apos;s</span>
                <span className="min-price-value">{formatINR(Number(minPrices.men))}</span>
              </div>
            )}
            {minPrices.women && !isNaN(minPrices.women) && (
              <div className="min-price-item">
                <span className="min-price-category">Women&apos;s</span>
                <span className="min-price-value">{formatINR(Number(minPrices.women))}</span>
              </div>
            )}
            {minPrices.kids && !isNaN(minPrices.kids) && (
              <div className="min-price-item">
                <span className="min-price-category">Kids</span>
                <span className="min-price-value">{formatINR(Number(minPrices.kids))}</span>
              </div>
            )}
          </motion.div>
        )}
        <motion.div className="hero__actions" initial="hidden" animate="visible" custom={4} variants={fadeItem}>
          <Link to="/shoes">
            <Button variant="primary" size="lg">
              Shop Now
            </Button>
          </Link>
          <Link to="/shoes?category=men">
            <Button variant="ghost" size="lg">
              Explore Collection
            </Button>
          </Link>
        </motion.div>
        <motion.div className="hero__stats" initial="hidden" animate="visible" custom={5} variants={fadeItem}>
          <div>
            <span>4.8⭐</span>
            <p>2,500+ verified reviews</p>
          </div>
          <div>
            <span>10K+</span>
            <p>Happy customers</p>
          </div>
          <div>
            <span>100%</span>
            <p>Authentic products</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FeaturedShoesSection({ shoes, loading }) {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  
  // Get stylish carousel images from all categories
  const getCarouselImages = () => {
    const allImages = []
    // Collect images from all categories
    Object.keys(shoeImages).forEach(category => {
      let categoryImages = shoeImages[category]
      if (categoryImages && typeof categoryImages === 'object' && !Array.isArray(categoryImages)) {
        // Nested structure - get all type arrays
        Object.keys(categoryImages).forEach(type => {
          if (Array.isArray(categoryImages[type])) {
            allImages.push(...categoryImages[type].slice(0, 2))
          }
        })
      } else if (Array.isArray(categoryImages)) {
        // Flat structure - take first 2-3 images from each category
        allImages.push(...categoryImages.slice(0, 3))
      }
    })
    // Add stylish wide-format images for carousel (better aspect ratio)
    const stylishImages = [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1575384881048-c8177d55e6c9?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1575540956706-6f0c2b1c5a2a?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=1200&h=600&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&h=600&fit=crop',
    ]
    // Use hero carousel images first, then add variety
    const combined = [...heroCarouselImages, ...allImages, ...stylishImages]
    // Remove duplicates and limit to 10 images for smooth rotation
    return [...new Set(combined)].slice(0, 10)
  }

  const carouselImages = getCarouselImages()

  useEffect(() => {
    if (carouselImages.length === 0) return
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev + 1) % carouselImages.length)
    }, 4000) // Change image every 4 seconds
    return () => clearInterval(interval)
  }, [carouselImages.length])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="section featured-shoes">
      <div className="section-heading">
        <p>Featured Collection</p>
        <h2>Trending Now</h2>
      </div>
      
      {/* Carousel Section */}
      <div className="trendy-carousel-container">
        <div className="trendy-carousel">
          {carouselImages.map((img, idx) => (
            <motion.div
              key={idx}
              className={`trendy-carousel-slide ${idx === currentCarouselIndex ? 'active' : ''}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: idx === currentCarouselIndex ? 1 : 0,
                scale: idx === currentCarouselIndex ? 1 : 0.95
              }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <img 
                src={img} 
                alt={`Trendy shoe ${idx + 1}`}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=600&fit=crop'
                }}
              />
              <div className="trendy-carousel-overlay"></div>
            </motion.div>
          ))}
          
          {/* Carousel Indicators */}
          <div className="trendy-carousel-indicators">
            {carouselImages.map((_, idx) => (
              <button
                key={idx}
                className={`trendy-indicator ${idx === currentCarouselIndex ? 'active' : ''}`}
                onClick={() => setCurrentCarouselIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button 
            className="trendy-carousel-nav trendy-carousel-prev"
            onClick={() => setCurrentCarouselIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button 
            className="trendy-carousel-nav trendy-carousel-next"
            onClick={() => setCurrentCarouselIndex((prev) => (prev + 1) % carouselImages.length)}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>
      </div>

      {/* Featured Shoes Grid */}
      {loading ? (
        <div className="loading-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="shoe-card-skeleton"></div>
          ))}
        </div>
      ) : (
        <div className="shoes-grid-preview">
          {(isMobile ? shoes.slice(0, 4) : shoes.slice(0, 8)).map((shoe, idx) => (
            <motion.div
              key={shoe._id || shoe.id}
              className="shoe-card-preview"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link to={`/shoes?category=${shoe.category}`}>
                <div className="shoe-card-preview__image">
                  {(() => {
                    // Always use local static images - no backend dependency
                    const category = shoe.category || 'men'
                    let categoryImages = []
                    
                    if (shoeImages[category] && typeof shoeImages[category] === 'object') {
                      const catData = shoeImages[category]
                      categoryImages = [
                        ...(catData.sneakers || []),
                        ...(catData.slippers || []),
                        ...(catData.sandals || []),
                        ...(catData.boots || []),
                        ...(catData.formal || []),
                        ...(catData.heels || []),
                        ...(catData.flats || []),
                        ...(catData.school || [])
                      ]
                    }
                    
                    if (categoryImages.length === 0 && category !== 'men') {
                      const menData = shoeImages.men
                      if (menData && typeof menData === 'object') {
                        categoryImages = [
                          ...(menData.sneakers || []),
                          ...(menData.slippers || []),
                          ...(menData.sandals || []),
                          ...(menData.boots || []),
                          ...(menData.formal || [])
                        ]
                      }
                    }
                    
                    if (categoryImages.length === 0) {
                      categoryImages = [
                        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop'
                      ]
                    }
                    
                    // Use a hash of the shoe ID to deterministically select an image
                    const shoeId = shoe._id || shoe.id || 'default'
                    const hash = shoeId.toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
                    const imageUrl = categoryImages[hash % categoryImages.length] || categoryImages[0]
                    
                    return <img 
                      src={imageUrl} 
                      alt={shoe.name}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop'
                      }}
                    />
                  })()}
                  {shoe.featured && <span className="featured-badge">Featured</span>}
                </div>
                <div className="shoe-card-preview__content">
                  <div className="shoe-brand">{shoe.brand || 'Premium'}</div>
                  <h3>{shoe.name}</h3>
                  <div className="shoe-rating">
                    {Array.from({ length: 3}).map((_, i) => (
                      <span key={i} className={i < Math.floor(shoe.rating || 0) ? 'star filled' : 'star'}>★</span>
                    ))}
                    <span>({shoe.reviewCount || 0})</span>
                  </div>
                  <div className="shoe-price">{formatINR(shoe.price)}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
      <div className="section-cta">
        <Link to="/shoes">
          <Button variant="ghost">View All Shoes</Button>
        </Link>
      </div>
    </section>
  )
}

function CategoryShowcase({ minPrices }) {
  // Helper to get images array from shoeImages (handles both flat and nested structures)
  const getCategoryImages = (category) => {
    let images = shoeImages[category]
    if (images && typeof images === 'object' && !Array.isArray(images)) {
      // Nested structure - get first available array
      images = images.sneakers || images.slippers || images.sandals || images.formal || images.heels || images.flats || images.boots || []
    }
    return Array.isArray(images) ? images : []
  }

  const categories = [
    { id: 'men', label: "Men's", path: '/shoes?category=men', color: '#1E3A8A', images: getCategoryImages('men') },
    { id: 'women', label: "Women's", path: '/shoes?category=women', color: '#EC4899', images: getCategoryImages('women') },
    { id: 'kids', label: 'Kids', path: '/shoes?category=kids', color: '#10B981', images: getCategoryImages('kids') },
  ]

  return (
    <section className="section category-showcase">
      <div className="section-heading">
        <p>Shop by Category</p>
        <h2>Find Your Perfect Fit</h2>
      </div>
      <div className="category-grid">
        {categories.map((category, idx) => (
          <motion.div
            key={category.id}
            className="category-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
          >
            <Link to={category.path}>
              <div className="category-card__image">
                <div className="category-image-carousel">
                  {(category.images && category.images.length > 0 ? category.images : [
                    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop'
                  ]).slice(0, 3).map((img, imgIdx) => (
                    <img
                      key={imgIdx}
                      src={img}
                      alt={`${category.label} shoes`}
                      className={imgIdx === 0 ? 'active' : ''}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop'
                      }}
                    />
                  ))}
                </div>
                <div className="category-overlay" style={{ background: `linear-gradient(135deg, ${category.color}88, ${category.color}44)` }}></div>
              </div>
              <div className="category-card__content">
                <h3>{category.label}</h3>
                {minPrices[category.id] && !isNaN(minPrices[category.id]) && (
                  <p className="category-price">Starting from {formatINR(Number(minPrices[category.id]))}</p>
                )}
                <span className="category-link">Shop Now →</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function WhyChooseUs() {
  const features = [
    { icon: '✓', title: 'Premium Quality', desc: 'Authentic products from trusted brands' },
    { icon: '💰', title: 'Best Prices', desc: 'Competitive pricing with regular discounts' },
    { icon: '🚚', title: 'Fast Delivery', desc: 'Quick and secure shipping worldwide' },
    { icon: '🔄', title: 'Easy Returns', desc: 'Hassle-free return policy' },
  ]

  return (
    <section className="section why-us">
      <div className="section-heading">
        <p>Why Choose Us</p>
        <h2>Your Trusted Footwear Partner</h2>
      </div>
      <div className="features-grid">
        {features.map((feature, idx) => (
          <motion.div
            key={feature.title}
            className="feature-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Arush Shukla',
      role: 'Fashion Enthusiast',
      quote: 'Amazing quality and the prices are unbeatable! Found my perfect pair of heels here.',
      rating: 5,
    },
    {
      name: 'Arsu Shukla',
      role: 'Athlete',
      quote: 'Best running shoes I&apos;ve ever owned. Comfortable, durable, and great value for money.',
      rating: 5,
    },
    {
      name: 'Moon',
      role: 'Mom',
      quote: 'Great selection for kids! My daughter loves her new sneakers. Fast shipping too!',
      rating: 5,
    },
  ]

  return (
    <section className="section testimonials">
      <div className="section-heading">
        <p>Customer Reviews</p>
        <h2>What Our Customers Say</h2>
      </div>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={testimonial.name}
            className="testimonial-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="testimonial-rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="star filled">★</span>
              ))}
            </div>
            <p className="testimonial-quote">&quot;{testimonial.quote}&quot;</p>
            <div className="testimonial-author">
              <strong>{testimonial.name}</strong>
              <span>{testimonial.role}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
