import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { shoesApi } from '../api/shoes'
import { cartApi } from '../api/cart'
import { formatINR } from '../utils/currency'
import { useSession } from '../hooks/useSession'
import { shoeImages } from '../data/shoeImages'
import './Shoes.css'

const CATEGORIES = [
  { id: 'all', label: 'All Shoes' },
  { id: 'men', label: "Men's" },
  { id: 'women', label: "Women's" },
  { id: 'kids', label: 'Kids' },
]

const SORT_OPTIONS = [
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Highest Rated' },
  { id: 'newest', label: 'Newest First' },
]

export default function Shoes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category') || 'all'
  
  const [filters, setFilters] = useState({
    search: '',
    category: categoryParam,
    minPrice: '',
    maxPrice: '',
    sort: 'price-asc',
  })
  
  const [shoes, setShoes] = useState([])
  const [minPrices, setMinPrices] = useState({})
  const [status, setStatus] = useState({ loading: true, error: '' })
  const [selectedShoe, setSelectedShoe] = useState(null)

  // Sync category from URL param
  useEffect(() => {
    if (filters.category !== categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryParam])

  useEffect(() => {
    let isMounted = true
    const load = async () => {
      setStatus({ loading: true, error: '' })
      try {
        const params = {
          ...(filters.category !== 'all' && { category: filters.category }),
          ...(filters.search && { search: filters.search }),
          ...(filters.minPrice && { minPrice: filters.minPrice }),
          ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
          sortBy: filters.sort === 'price-asc' ? 'price' : filters.sort === 'price-desc' ? 'price' : filters.sort === 'rating' ? 'rating' : 'createdAt',
          sortOrder: filters.sort === 'price-desc' ? 'desc' : 'asc',
        }
        
        const data = await shoesApi.getAll(params)
        if (!isMounted) return
        
        setShoes(data.shoes || data || [])
        setMinPrices(data.minPrices || {})
        setStatus({ loading: false, error: '' })
    } catch (err) {
      if (!isMounted) return
      const errorMessage = err.response?.data?.message || err.message || 'Unable to load shoes'
      const isNetworkError = err.code === 'ERR_NETWORK' || err.message?.includes('Network Error') || errorMessage.includes('Network')
      
      if (isNetworkError) {
        setStatus({ loading: false, error: 'Cannot connect to server. Please ensure the backend is running on port 4000.' })
      } else {
        setStatus({ loading: false, error: errorMessage })
      }
      console.error('Error loading shoes:', err)
    }
    }
    load()
    return () => {
      isMounted = false
    }
  }, [filters])

  useEffect(() => {
    const loadMinPrices = async () => {
      try {
        const prices = await shoesApi.getMinPrices()
        setMinPrices(prices)
    } catch {
      // Failed to load min prices, continue without them
    }
    }
    loadMinPrices()
  }, [])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    if (key === 'category' && value !== 'all') {
      setSearchParams({ category: value })
    } else if (key === 'category' && value === 'all') {
      setSearchParams({})
    }
  }

  return (
    <section className="shoes-page">
      <header className="shoes-page__header">
        <p className="hero__eyebrow">Our Collection</p>
        <h1>
          {filters.category === 'men' && "Men's Premium Footwear"}
          {filters.category === 'women' && "Women's Elegant Shoes"}
          {filters.category === 'kids' && "Kids Comfortable Shoes"}
          {filters.category === 'all' && "Step Into Style"}
        </h1>
        <p>
          {filters.category === 'men' && "Discover our premium collection of men's shoes. From formal dress shoes to casual sneakers, find your perfect pair."}
          {filters.category === 'women' && "Explore our elegant women's shoe collection. From heels to flats, find style and comfort in every step."}
          {filters.category === 'kids' && "Comfortable and stylish shoes for kids. Perfect for play, school, and special occasions."}
          {filters.category === 'all' && "Discover premium footwear for every occasion. From casual to formal, find your perfect pair."}
        </p>
        {Object.keys(minPrices).length > 0 && (
          <div className="min-prices-banner">
            <span className="min-prices-label">Starting from:</span>
            {minPrices.men && <span className="min-price-tag">Men&apos;s: {formatINR(minPrices.men)}</span>}
            {minPrices.women && <span className="min-price-tag">Women&apos;s: {formatINR(minPrices.women)}</span>}
            {minPrices.kids && <span className="min-price-tag">Kids: {formatINR(minPrices.kids)}</span>}
          </div>
        )}
      </header>

      <div className="shoes-filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search shoes..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="filter-select"
          >
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div className="filter-group price-range">
          <input
            type="number"
            placeholder="Min ₹"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            className="filter-input price-input"
          />
          <span className="price-separator">-</span>
          <input
            type="number"
            placeholder="Max ₹"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            className="filter-input price-input"
          />
        </div>

        <div className="filter-group">
          <select
            value={filters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="filter-select"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="category-pills">
        {CATEGORIES.filter(cat => cat.id !== 'all').map(category => (
          <button
            key={category.id}
            type="button"
            className={`category-pill ${filters.category === category.id ? 'is-active' : ''}`}
            onClick={() => handleFilterChange('category', category.id)}
          >
            {category.label}
          </button>
        ))}
        <button
          type="button"
          className={`category-pill ${filters.category === 'all' ? 'is-active' : ''}`}
          onClick={() => handleFilterChange('category', 'all')}
        >
          Show All
        </button>
      </div>

      {status.loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading shoes...</p>
        </div>
      )}

      {status.error && (
        <div className="empty-state">
          <h3>Could not load shoes</h3>
          <p>{status.error}</p>
        </div>
      )}

      {!status.loading && !status.error && (
        <>
          {shoes.length > 0 ? (
            <div className="shoes-grid">
              {shoes.map((shoe) => (
                <ShoeCard key={shoe._id || shoe.id} shoe={shoe} onSelect={setSelectedShoe} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state__icon">👟</div>
              <h3>No shoes found</h3>
              <p>
                {filters.category !== 'all' 
                  ? `We don't have any ${filters.category === 'men' ? "men's" : filters.category === 'women' ? "women's" : "kids'"} shoes yet. Check back soon!`
                  : "No shoes match your filters. Try adjusting your search or filters to find what you're looking for."}
              </p>
              {filters.category !== 'all' && (
                <button 
                  className="empty-state__button"
                  onClick={() => handleFilterChange('category', 'all')}
                >
                  View All Shoes
                </button>
              )}
            </div>
          )}
        </>
      )}

      {selectedShoe && (
        <ShoeModal shoe={selectedShoe} onClose={() => setSelectedShoe(null)} />
      )}
    </section>
  )
}

function ShoeCard({ shoe, onSelect }) {
  const discount = shoe.originalPrice && shoe.originalPrice > shoe.price
    ? Math.round(((shoe.originalPrice - shoe.price) / shoe.originalPrice) * 100)
    : 0

  // Get default image based on category - always use local static images
  const getDefaultImage = () => {
    // Always use local static images - no backend dependency
    const category = shoe.category || 'men'
    let categoryImages = []
    
    if (shoeImages[category] && typeof shoeImages[category] === 'object') {
      // New nested structure - collect all images from all subcategories
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
    
    // If no images found, try men's as fallback
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
    
    // Ultimate fallback
    if (categoryImages.length === 0) {
      categoryImages = [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop'
      ]
    }
    
    // Use a hash of the shoe ID to deterministically select an image
    const shoeId = shoe._id || shoe.id || 'default'
    const hash = shoeId.toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return categoryImages[hash % categoryImages.length] || categoryImages[0]
  }

  const [imageError, setImageError] = useState(false)
  const defaultImage = getDefaultImage()
  const [currentImageSrc, setCurrentImageSrc] = useState(() => defaultImage)

  // Get fallback image
  const getFallbackImage = () => {
    const category = shoe.category || 'men'
    let fallbackImages = []
    
    if (shoeImages[category] && typeof shoeImages[category] === 'object') {
      const catData = shoeImages[category]
      fallbackImages = [
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
    
    if (fallbackImages.length > 0) {
      return fallbackImages[0]
    }
    
    // Try men's images as universal fallback
    if (category !== 'men' && shoeImages.men && typeof shoeImages.men === 'object') {
      const menData = shoeImages.men
      fallbackImages = [
        ...(menData.sneakers || []),
        ...(menData.slippers || []),
        ...(menData.sandals || []),
        ...(menData.boots || []),
        ...(menData.formal || [])
      ]
      if (fallbackImages.length > 0) {
        return fallbackImages[0]
      }
    }
    
    // Ultimate fallback
    return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop'
  }

  const handleImageError = (e) => {
    if (!imageError) {
      setImageError(true)
      const fallback = getFallbackImage()
      setCurrentImageSrc(fallback)
      e.target.src = fallback
    } else if (e.target.src !== getFallbackImage()) {
      // If fallback also fails, use ultimate fallback
      e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop'
    }
  }

  return (
    <div className="shoe-card" onClick={() => onSelect(shoe)}>
      <div className="shoe-card__image-container">
        <img 
          src={currentImageSrc || defaultImage} 
          alt={shoe.name} 
          className="shoe-card__image"
          onError={handleImageError}
          loading="lazy"
          onLoad={() => {
            // Reset error state if image loads successfully
            if (imageError) {
              setImageError(false)
            }
          }}
        />
        {discount > 0 && <span className="shoe-card__badge">-{discount}%</span>}
        {shoe.featured && <span className="shoe-card__featured">Featured</span>}
      </div>
      <div className="shoe-card__content">
        <div className="shoe-card__brand">{shoe.brand || 'Premium'}</div>
        <h3 className="shoe-card__name">{shoe.name}</h3>
        <div className="shoe-card__category">{shoe.category}</div>
        <div className="shoe-card__rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < Math.floor(shoe.rating || 0) ? 'star filled' : 'star'}>★</span>
          ))}
          <span className="rating-text">({shoe.reviewCount || 0})</span>
        </div>
        <div className="shoe-card__price">
          <span className="price-current">{formatINR(shoe.price)}</span>
          {shoe.originalPrice && shoe.originalPrice > shoe.price && (
            <span className="price-original">{formatINR(shoe.originalPrice)}</span>
          )}
        </div>
        {shoe.sizes && shoe.sizes.length > 0 && (
          <div className="shoe-card__sizes">
            <span className="sizes-label">Available Sizes:</span> {shoe.sizes.filter(s => s.stock > 0).slice(0, 5).map(s => s.size).join(', ')}
            {shoe.sizes.filter(s => s.stock > 0).length > 5 && ' +more'}
          </div>
        )}
        {shoe.colors && shoe.colors.length > 0 && (
          <div className="shoe-card__colors-preview">
            <span className="colors-label">Colors:</span>
            <div className="shoe-card__colors-mini">
              {shoe.colors.slice(0, 4).map((color, i) => (
                <span key={i} className="color-dot" style={{ backgroundColor: color }} title={color}></span>
              ))}
              {shoe.colors.length > 4 && <span className="more-colors">+{shoe.colors.length - 4}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ShoeModal({ shoe, onClose }) {
  const { user } = useSession()
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [adding, setAdding] = useState(false)

  if (!shoe) return null

  const discount = shoe.originalPrice && shoe.originalPrice > shoe.price
    ? Math.round(((shoe.originalPrice - shoe.price) / shoe.originalPrice) * 100)
    : 0

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login to add items to cart', {
        icon: '🔐',
      })
      return
    }

    if (!selectedSize && shoe.sizes?.length > 0) {
      toast.error('Please select a size', {
        icon: '👟',
      })
      return
    }

    setAdding(true)
    try {
      await cartApi.addToCart({
        shoe: shoe._id || shoe.id,
        size: selectedSize || shoe.sizes?.[0]?.size || '',
        color: selectedColor || shoe.colors?.[0] || '',
        quantity: 1,
      })
      toast.success('Added to cart!', {
        icon: '✅',
      })
      onClose()
    } catch {
      toast.error('Failed to add to cart', {
        icon: '❌',
      })
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="shoe-modal-overlay" onClick={onClose}>
      <div className="shoe-modal" onClick={(e) => e.stopPropagation()}>
        <button className="shoe-modal__close" onClick={onClose}>×</button>
        <div className="shoe-modal__content">
          <div className="shoe-modal__images">
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
              
              const imageUrl = categoryImages.length > 0 
                ? categoryImages[0] 
                : 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop'
              
              return (
                <img 
                  src={imageUrl} 
                  alt={shoe.name}
                  onError={(e) => {
                    // Try multiple fallbacks
                    const fallbacks = [
                      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
                      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop',
                      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop'
                    ]
                    const currentSrc = e.target.src
                    const fallbackIndex = fallbacks.findIndex(f => f === currentSrc)
                    if (fallbackIndex < fallbacks.length - 1) {
                      e.target.src = fallbacks[fallbackIndex + 1]
                    } else {
                      e.target.src = fallbacks[0]
                    }
                  }}
                  loading="lazy"
                />
              )
            })()}
          </div>
          <div className="shoe-modal__details">
            <div className="shoe-modal__brand">{shoe.brand || 'Premium'}</div>
            <h2>{shoe.name}</h2>
            <div className="shoe-modal__category">{shoe.category}</div>
            <div className="shoe-modal__rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < Math.floor(shoe.rating || 0) ? 'star filled' : 'star'}>★</span>
              ))}
              <span className="rating-text">({shoe.reviewCount || 0} reviews)</span>
            </div>
            <div className="shoe-modal__price">
              <span className="price-current">{formatINR(shoe.price)}</span>
              {shoe.originalPrice && shoe.originalPrice > shoe.price && (
                <>
                  <span className="price-original">{formatINR(shoe.originalPrice)}</span>
                  <span className="price-discount">-{discount}% OFF</span>
                </>
              )}
            </div>
            {shoe.description && (
              <div className="shoe-modal__description">
                <h3>Description</h3>
                <p>{shoe.description}</p>
              </div>
            )}
            {shoe.sizes && shoe.sizes.length > 0 && (
              <div className="shoe-modal__sizes">
                <h3>Available Sizes</h3>
                <div className="size-grid">
                  {shoe.sizes.map((size, i) => (
                    <button
                      key={i}
                      className={`size-option ${size.stock > 0 ? 'available' : 'out-of-stock'} ${selectedSize === size.size ? 'selected' : ''}`}
                      disabled={size.stock === 0}
                      onClick={() => setSelectedSize(size.size)}
                    >
                      {size.size} {size.stock > 0 ? `(${size.stock})` : '(Out)'}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {shoe.colors && shoe.colors.length > 0 && (
              <div className="shoe-modal__colors">
                <h3>Colors</h3>
                <div className="color-options">
                  {shoe.colors.map((color, i) => (
                    <span 
                      key={i} 
                      className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }} 
                      title={color}
                      onClick={() => setSelectedColor(color)}
                    ></span>
                  ))}
                </div>
              </div>
            )}
            <button 
              className="shoe-modal__add-to-cart" 
              onClick={handleAddToCart}
              disabled={adding}
            >
              {adding ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

