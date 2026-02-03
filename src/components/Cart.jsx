import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { cartApi } from '../api/cart'
import { formatINR } from '../utils/currency'
import { useSession } from '../hooks/useSession'
import { shoeImages } from '../data/shoeImages'
import './Cart.css'

export function Cart({ isOpen, onClose }) {
  const { user } = useSession()
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      console.log('Cart opened, isOpen:', isOpen, 'user:', user)
      if (user) {
        loadCart()
      } else {
        setCart(null)
        setLoading(false)
      }
    } else {
      // Reset loading state when cart closes
      setLoading(true)
    }
  }, [isOpen, user])

  // Close cart when clicking outside or pressing Escape
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const handleClickOutside = (e) => {
      if (e.target.classList.contains('cart-overlay')) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen, onClose])

  const loadCart = async () => {
    try {
      setLoading(true)
      const data = await cartApi.getCart()
      setCart(data)
    } catch (error) {
      console.error('Failed to load cart', error)
      setCart(null)
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (itemId, quantity) => {
    try {
      await cartApi.updateItem(itemId, quantity)
      loadCart()
      toast.success('Cart updated', {
        icon: '✅',
      })
    } catch {
      toast.error('Failed to update cart', {
        icon: '❌',
      })
    }
  }

  const removeItem = async (itemId) => {
    try {
      await cartApi.removeItem(itemId)
      loadCart()
      toast.success('Item removed from cart', {
        icon: '🗑️',
      })
    } catch {
      toast.error('Failed to remove item', {
        icon: '❌',
      })
    }
  }

  const subtotal = cart?.items?.reduce((sum, item) => {
    return sum + (item.shoe?.price || 0) * item.quantity
  }, 0) || 0

  const shipping = subtotal > 1000 ? 0 : 50
  const tax = subtotal * 0.18
  const total = subtotal + shipping + tax

  if (!isOpen) {
    return null
  }

  // Safety check for document.body
  if (typeof document === 'undefined' || !document.body) {
    return null
  }

  const cartContent = (
    <div 
      className="cart-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 3000,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
      }}
    >
      <div 
        className="cart-drawer" 
        onClick={(e) => e.stopPropagation()}
        role="document"
        style={{
          position: 'relative',
          zIndex: 3001
        }}
      >
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="cart-close" onClick={onClose}>×</button>
        </div>

        {!user ? (
          <div className="cart-empty">
            <p>Please login to view your cart</p>
            <Link to="/login" className="btn-primary">Login</Link>
          </div>
        ) : loading ? (
          <div className="cart-loading">Loading cart...</div>
        ) : !cart?.items?.length ? (
          <div className="cart-empty">
            <p>Your cart is empty</p>
            <Link to="/shoes" className="btn-primary" onClick={onClose}>Shop Now</Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.items.map((item) => {
                // Always use local static images - no backend dependency
                const getCartItemImage = () => {
                  const category = item.shoe?.category || 'men'
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
                  
                  if (categoryImages.length > 0) {
                    const shoeId = item.shoe?._id || item.shoe?.id || 'default'
                    const hash = shoeId.toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
                    return categoryImages[hash % categoryImages.length] || categoryImages[0]
                  }
                  
                  return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop'
                }
                
                return (
                <div key={item._id} className="cart-item">
                  <img 
                    src={getCartItemImage()} 
                    alt={item.shoe?.name}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop'
                    }}
                    loading="lazy"
                  />
                  <div className="cart-item-details">
                    <h4>{item.shoe?.name}</h4>
                    <p>{item.shoe?.category} • Size: {item.size} • Color: {item.color}</p>
                    <div className="cart-item-price">{formatINR(item.shoe?.price || 0)}</div>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      className="cart-delete-btn" 
                      onClick={() => removeItem(item._id)}
                      aria-label="Remove item from cart"
                      title="Remove item"
                    >
                      <span className="delete-icon">🗑️</span>
                      <span className="delete-text">Delete</span>
                    </button>
                  </div>
                </div>
                )
              })}
            </div>

            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatINR(shipping)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Tax (GST)</span>
                <span>{formatINR(tax)}</span>
              </div>
              <div className="cart-summary-row cart-total">
                <span>Total</span>
                <span>{formatINR(total)}</span>
              </div>
              <Link to="/checkout" className="cart-checkout-btn" onClick={onClose}>
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )

  // Render cart using portal to ensure it's at the root level
  return createPortal(cartContent, document.body)
}

