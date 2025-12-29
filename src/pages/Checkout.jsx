import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { cartApi } from '../api/cart'
import { ordersApi } from '../api/orders'
import { formatINR } from '../utils/currency'
import { useSession } from '../hooks/useSession'
import './Checkout.css'

export default function Checkout() {
  const { user } = useSession()
  const navigate = useNavigate()
  const location = useLocation()
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod',
  })

  const loadCart = useCallback(async () => {
    try {
      const data = await cartApi.getCart()
      setCart(data)
      if (!data?.items?.length) {
        toast.error('Your cart is empty')
        navigate('/shoes')
      }
    } catch (error) {
      console.error('Failed to load cart', error)
      toast.error('Failed to load cart')
    } finally {
      setLoading(false)
    }
  }, [navigate])

  useEffect(() => {
    if (!user) {
      toast.error('Please login to checkout')
      navigate('/login')
      return
    }

    loadCart()
    if (user) {
      setForm(prev => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
      }))
    }
  }, [user, navigate, loadCart])

  // Ensure body scroll is enabled when on checkout page
  useEffect(() => {
    if (location.pathname === '/checkout') {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [location.pathname])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Show notification when payment method changes
    if (name === 'paymentMethod') {
      const paymentMethodNames = {
        cod: 'Cash on Delivery',
        upi: 'UPI Payment',
        card: 'Card Payment'
      }
      toast.success(`Payment method selected: ${paymentMethodNames[value]}`, {
        duration: 2000,
        icon: '💳'
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.state || !form.pincode) {
      toast.error('Please fill all required fields')
      return
    }

    if (!cart?.items?.length) {
      toast.error('Your cart is empty')
      return
    }

    // Show notification when payment method is selected
    const paymentMethodNames = {
      cod: 'Cash on Delivery',
      upi: 'UPI Payment',
      card: 'Card Payment'
    }
    
    toast.loading(`Processing your order with ${paymentMethodNames[form.paymentMethod]}...`, {
      id: 'order-processing'
    })

    setSubmitting(true)
    try {
      const orderData = {
        items: cart.items.map(item => ({
          shoeId: item.shoe._id,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          price: item.shoe.price,
        })),
        shippingAddress: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
        },
        paymentMethod: form.paymentMethod,
      }

      const order = await ordersApi.createOrder(orderData)
      
      // Clear cart after successful order
      try {
        for (const item of cart.items) {
          await cartApi.removeItem(item._id)
        }
      } catch (cartError) {
        console.error('Failed to clear cart items', cartError)
        // Continue even if cart clearing fails
      }

      toast.dismiss('order-processing')
      toast.success('Order placed successfully! 🎉', {
        duration: 3000,
        icon: '✅'
      })
      
      // Show delivery notification
      setTimeout(() => {
        toast('Your order will be delivered soon! 📦', {
          duration: 4000,
          icon: '🚚'
        })
      }, 1000)

      // Navigate after a short delay to show notifications
      setTimeout(() => {
        navigate(`/order-success/${order._id}`)
      }, 2000)
    } catch (error) {
      console.error('Failed to place order', error)
      toast.dismiss('order-processing')
      toast.error(error.response?.data?.message || 'Failed to place order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="checkout-page">
        <div className="checkout-loading">Loading checkout...</div>
      </div>
    )
  }

  if (!cart?.items?.length) {
    return (
      <div className="checkout-page">
        <div className="checkout-empty">
          <h2>Your cart is empty</h2>
          <button onClick={() => navigate('/shoes')} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  const subtotal = cart.items.reduce((sum, item) => sum + (item.shoe?.price || 0) * item.quantity, 0)
  const shipping = subtotal > 1000 ? 0 : 50
  const tax = subtotal * 0.18
  const total = subtotal + shipping + tax

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>
        
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="checkout-main">
            <section className="checkout-section">
              <h2>Shipping Address</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Address *</label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    placeholder="House/Flat No., Building Name, Street"
                  />
                </div>
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleInputChange}
                    required
                    placeholder="City"
                  />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleInputChange}
                    required
                    placeholder="State"
                  />
                </div>
                <div className="form-group">
                  <label>Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{6}"
                    placeholder="123456"
                  />
                </div>
              </div>
            </section>

            <section className="checkout-section">
              <h2>Payment Method</h2>
              <div className="payment-methods">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={form.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-option-content">
                    <span className="payment-icon">💵</span>
                    <div>
                      <strong>Cash on Delivery</strong>
                      <p>Pay when you receive</p>
                    </div>
                  </div>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={form.paymentMethod === 'upi'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-option-content">
                    <span className="payment-icon">📱</span>
                    <div>
                      <strong>UPI</strong>
                      <p>Pay via UPI</p>
                    </div>
                  </div>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={form.paymentMethod === 'card'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-option-content">
                    <span className="payment-icon">💳</span>
                    <div>
                      <strong>Card</strong>
                      <p>Credit/Debit Card</p>
                    </div>
                  </div>
                </label>
              </div>
            </section>
          </div>

          <aside className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cart.items.map((item) => (
                <div key={item._id} className="order-item">
                  <img 
                    src={item.shoe?.images?.[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop'} 
                    alt={item.shoe?.name}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop'
                    }}
                    loading="lazy"
                  />
                  <div className="order-item-details">
                    <h4>{item.shoe?.name}</h4>
                    <p>Size: {item.size} • Color: {item.color}</p>
                    <p>Qty: {item.quantity} × {formatINR(item.shoe?.price || 0)}</p>
                  </div>
                  <div className="order-item-total">
                    {formatINR((item.shoe?.price || 0) * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatINR(shipping)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (GST)</span>
                <span>{formatINR(tax)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>{formatINR(total)}</span>
              </div>
            </div>

            <button type="submit" className="checkout-btn" disabled={submitting}>
              {submitting ? 'Placing Order...' : `Place Order - ${formatINR(total)}`}
            </button>
          </aside>
        </form>
      </div>
    </div>
  )
}

