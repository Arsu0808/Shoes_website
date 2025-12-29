import { useEffect, useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Profile.css'
import { ordersApi } from '../api/orders'
import { updateProfile } from '../api/users'
import { useSession } from '../hooks/useSession'
import { formatINR } from '../utils/currency'

const formatDateTime = (value) => {
  if (!value) return 'TBD'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'TBD'
  return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(date)
}

const getTier = (points = 0) => {
  if (points >= 2500) return 'Champagne'
  if (points >= 1000) return 'Rose Gold'
  if (points >= 500) return 'Blush'
  return 'New'
}

export default function Profile() {
  const navigate = useNavigate()
  const { user, loading, reloadProfile } = useSession()
  const [orders, setOrders] = useState([])
  const [orderState, setOrderState] = useState({ loading: true, error: '' })
  const [profileState, setProfileState] = useState({ saving: false, success: '', error: '' })
  const [form, setForm] = useState({ name: '', email: '', phone: '' })

  useEffect(() => {
    if (!user) return
    // Sync the server profile into the editable form whenever the active user changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm({ name: user.name || '', email: user.email || '', phone: user.phone || '' })
  }, [user])

  useEffect(() => {
    if (!user) {
      // Clear cached orders when the visitor logs out so we don't show stale data.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOrders([])
      return
    }
    let active = true
    const loadOrders = async () => {
      setOrderState({ loading: true, error: '' })
      try {
        const data = await ordersApi.getOrders()
        if (!active) return
        setOrders(data || [])
        setOrderState({ loading: false, error: '' })
      } catch (error) {
        if (!active) return
        setOrderState({
          loading: false,
          error: error.response?.data?.message || 'Unable to load your orders right now.',
        })
      }
    }
    loadOrders()
    return () => {
      active = false
    }
  }, [user])

  const pending = useMemo(
    () => orders.filter((order) => ['pending', 'confirmed', 'processing', 'shipped'].includes(order.status)),
    [orders]
  )
  const completed = useMemo(
    () => orders.filter((order) => ['delivered', 'cancelled', 'returned'].includes(order.status)),
    [orders]
  )

  const lifetimeSpend = useMemo(
    () => orders.reduce((sum, order) => sum + (order.total || 0), 0),
    [orders]
  )

  const topProducts = useMemo(() => {
    const counts = orders.reduce((acc, order) => {
      ;(order.items || []).forEach((item) => {
        const name = item.shoe?.name || item.name || 'Shoe'
        acc[name] = (acc[name] || 0) + item.quantity
      })
      return acc
    }, {})
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
  }, [orders])

  const handleFormChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleProfileSubmit = async (event) => {
    event.preventDefault()
    setProfileState({ saving: true, success: '', error: '' })
    try {
      const updated = await updateProfile(form)
      setProfileState({ saving: false, success: 'Profile updated', error: '' })
      setForm({ name: updated.name || '', email: updated.email || '', phone: updated.phone || '' })
      if (reloadProfile) {
        await reloadProfile()
      }
    } catch (error) {
      setProfileState({
        saving: false,
        success: '',
        error: error.response?.data?.message || 'Unable to update profile',
      })
    }
  }

  if (!loading && !user) {
    return (
      <div className="profile-page profile-empty">
        <div className="profile-card">
          <h1>Login to view your orders</h1>
          <p>Track your orders, manage your profile, and update your preferences.</p>
          <button type="button" onClick={() => navigate('/login')} className="profile-primary-btn">
            Go to login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <section className="profile-header">
        <div>
          <p className="hero__eyebrow">Customer profile</p>
          <h1>Hi, {user?.name?.split(' ')[0] || 'Guest'}</h1>
          <p>
            Loyalty points: <strong>{user?.loyaltyPoints ?? 0}</strong> · Tier: <strong>{getTier(user?.loyaltyPoints)}</strong>
          </p>
        </div>
        <div className="profile-pills">
          <div className="profile-pill">
            <span>Total orders</span>
            <strong>{orders.length}</strong>
          </div>
          <div className="profile-pill">
            <span>Lifetime spend</span>
            <strong>{formatINR(lifetimeSpend)}</strong>
          </div>
        </div>
      </section>

      {orderState.error && <p className="profile-alert">{orderState.error}</p>}

      <div className="profile-grid">
        <article>
          <h3>Active Orders</h3>
          {orderState.loading && <p>Loading your orders…</p>}
          {!orderState.loading && pending.length === 0 && <p>No active orders yet.</p>}
          {pending.map((order) => (
            <div key={order._id} className="profile-card">
              <strong>Order #{order._id?.slice(-8)}</strong>
              <p>{formatDateTime(order.createdAt)}</p>
              <p>{(order.items || []).map((item) => item.shoe?.name || item.name).join(', ')}</p>
              <span className={`profile-status profile-status--${order.status}`}>{order.status}</span>
              <span>{formatINR(order.total || 0)}</span>
              <Link to={`/order-success/${order._id}`} className="profile-link-btn">
                View Details
              </Link>
            </div>
          ))}
        </article>

        <article>
          <h3>Favourite Products</h3>
          {topProducts.length === 0 && <p>Place an order to start building your list.</p>}
          <ul>
            {topProducts.map(([product, count]) => (
              <li key={product}>
                <span>{product}</span>
                <span className="profile-count-pill">{count}×</span>
              </li>
            ))}
          </ul>
        </article>

        <article>
          <h3>Order History</h3>
          {orderState.loading && <p>Loading order history…</p>}
          {!orderState.loading && completed.length === 0 && <p>No completed orders yet.</p>}
          {completed.map((order) => (
            <div key={order._id} className="profile-card">
              <strong>Order #{order._id?.slice(-8)}</strong>
              <p>{formatDateTime(order.createdAt)}</p>
              <p>{(order.items || []).map((item) => item.shoe?.name || item.name).join(', ')}</p>
              <span className={`profile-status profile-status--${order.status}`}>{order.status}</span>
              <span>{formatINR(order.total || 0)}</span>
              <Link to={`/order-success/${order._id}`} className="profile-link-btn">
                View Details
              </Link>
            </div>
          ))}
        </article>

        <article className="profile-form-card">
          <h3>Profile details</h3>
          <form className="profile-form" onSubmit={handleProfileSubmit}>
            <label>
              Name
              <input type="text" value={form.name} onChange={handleFormChange('name')} required />
            </label>
            <label>
              Email
              <input type="email" value={form.email} onChange={handleFormChange('email')} required />
            </label>
            <label>
              Phone
              <input type="tel" value={form.phone} onChange={handleFormChange('phone')} />
            </label>
            {profileState.error && <p className="profile-alert">{profileState.error}</p>}
            {profileState.success && <p className="profile-alert success">{profileState.success}</p>}
            <button type="submit" disabled={profileState.saving}>
              {profileState.saving ? 'Saving…' : 'Save changes'}
            </button>
          </form>
        </article>
      </div>
    </div>
  )
}

