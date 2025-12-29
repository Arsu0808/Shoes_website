import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ordersApi } from '../api/orders'
import { formatINR } from '../utils/currency'
import './OrderSuccess.css'

export default function OrderSuccess() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      void loadOrder()
      // Show delivery notification
      toast('Your order will be delivered soon! 📦', {
        duration: 5000,
        icon: '🚚'
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId])

  const loadOrder = async () => {
    try {
      const data = await ordersApi.getOrder(orderId)
      setOrder(data)
    } catch (error) {
      console.error('Failed to load order', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="order-success-page">
        <div className="order-success-loading">Loading order details...</div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="order-success-page">
        <div className="order-success-error">
          <h2>Order not found</h2>
          <Link to="/shoes" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  const total = order.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0

  return (
    <div className="order-success-page">
      <div className="order-success-container">
        <div className="success-icon">✅</div>
        <h1>Order Placed Successfully!</h1>
        <p className="success-message">
          Thank you for your purchase. Your order has been confirmed and will be processed shortly.
        </p>

        <div className="order-details-card">
          <h2>Order Details</h2>
          <div className="order-info">
            <div className="info-row">
              <span>Order ID:</span>
              <strong>#{order._id?.slice(-8) || order.id}</strong>
            </div>
            <div className="info-row">
              <span>Order Date:</span>
              <span>{new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}</span>
            </div>
            <div className="info-row">
              <span>Status:</span>
              <span className={`status-badge status-${order.status}`}>
                {order.status || 'Pending'}
              </span>
            </div>
            <div className="info-row">
              <span>Total Amount:</span>
              <strong className="total-amount">{formatINR(total)}</strong>
            </div>
          </div>
        </div>

        {order.items && order.items.length > 0 && (
          <div className="order-items-card">
            <h2>Ordered Items</h2>
            <div className="ordered-items">
              {order.items.map((item, idx) => (
                <div key={idx} className="ordered-item">
                  <div className="item-info">
                    <h4>{item.shoe?.name || 'Shoe'}</h4>
                    <p>Size: {item.size} • Color: {item.color} • Qty: {item.quantity}</p>
                  </div>
                  <div className="item-price">
                    {formatINR(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {order.shippingAddress && (
          <div className="shipping-address-card">
            <h2>Shipping Address</h2>
            <div className="address-details">
              <p><strong>{order.shippingAddress.name}</strong></p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
              <p>📞 {order.shippingAddress.phone}</p>
              <p>✉️ {order.shippingAddress.email}</p>
            </div>
          </div>
        )}

        <div className="next-steps">
          <h2>What&apos;s Next?</h2>
          <div className="steps">
            <div className="step">
              <span className="step-number">1</span>
              <div>
                <h3>Order Confirmation</h3>
                <p>You&apos;ll receive an email confirmation shortly</p>
              </div>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <div>
                <h3>Processing</h3>
                <p>We&apos;ll prepare your order for shipment</p>
              </div>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <div>
                <h3>Shipping</h3>
                <p>You&apos;ll receive tracking information once shipped</p>
              </div>
            </div>
            <div className="step">
              <span className="step-number">4</span>
              <div>
                <h3>Delivery</h3>
                <p>Your order will arrive in 5-7 business days</p>
              </div>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <Link to="/profile" className="btn-secondary">View My Orders</Link>
          <Link to="/shoes" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}

