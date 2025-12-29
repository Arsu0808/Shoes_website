import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { fetchDashboard } from '../api/admin'
import { ordersApi } from '../api/orders'
import { reviewsApi } from '../api/reviews'
import { contactApi } from '../api/contact'
import { shoesApi } from '../api/shoes'
import { usersApi } from '../api/users'
import { useSession } from '../hooks/useSession'
import { formatINR } from '../utils/currency'
import './Admin.css'

const TABS = ['Dashboard', 'Customers', 'Orders', 'Products', 'Reviews', 'Contacts', 'Images']

export default function Admin() {
  const { user, loading: sessionLoading } = useSession()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [dashboard, setDashboard] = useState(null)
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [reviews, setReviews] = useState([])
  const [contacts, setContacts] = useState([])
  const [customers, setCustomers] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [customerOrders, setCustomerOrders] = useState([])

  const loadDashboard = useCallback(async () => {
    try {
      const data = await fetchDashboard()
      setDashboard(data)
      if (data.recentOrders) setOrders(data.recentOrders)
    } catch (err) {
      console.error('Failed to load dashboard', err)
    }
  }, [])

  const loadOrders = useCallback(async () => {
    try {
      const data = await ordersApi.getAllOrders()
      setOrders(data)
    } catch (err) {
      console.error('Failed to load orders', err)
    }
  }, [])

  const loadProducts = useCallback(async () => {
    try {
      const data = await shoesApi.getAll({})
      setProducts(data.shoes || [])
    } catch (err) {
      console.error('Failed to load products', err)
    }
  }, [])

  const loadReviews = useCallback(async () => {
    try {
      const data = await reviewsApi.getAllReviews()
      setReviews(data)
    } catch (err) {
      console.error('Failed to load reviews', err)
    }
  }, [])

  const loadContacts = useCallback(async () => {
    try {
      const data = await contactApi.getContacts()
      setContacts(data)
    } catch (err) {
      console.error('Failed to load contacts', err)
    }
  }, [])

  const loadCustomers = useCallback(async () => {
    try {
      const data = await usersApi.getAllUsers()
      // Filter out admin users, show only customers
      const customerData = data.filter(user => user.role === 'customer')
      setCustomers(customerData)
    } catch (err) {
      console.error('Failed to load customers', err)
      toast.error('Failed to load customers', { icon: '❌' })
    }
  }, [])

  const loadCustomerOrders = useCallback(async (userId) => {
    try {
      const allOrders = await ordersApi.getAllOrders()
      const userOrders = allOrders.filter(order => order.user?._id === userId || order.user === userId)
      setCustomerOrders(userOrders)
    } catch (err) {
      console.error('Failed to load customer orders', err)
    }
  }, [])

  const handleOrderStatusUpdate = async (orderId, newStatus) => {
    try {
      await ordersApi.updateOrderStatus(orderId, { status: newStatus })
      loadOrders()
      toast.success('Order status updated', {
        icon: '✅',
      })
    } catch {
      toast.error('Failed to update order status', {
        icon: '❌',
      })
    }
  }

  const handleContactStatusUpdate = async (contactId, newStatus) => {
    try {
      await contactApi.updateContact(contactId, { status: newStatus })
      loadContacts()
      toast.success('Contact status updated', {
        icon: '✅',
      })
    } catch {
      toast.error('Failed to update contact status', {
        icon: '❌',
      })
    }
  }

  useEffect(() => {
    if (!user || user.role !== 'admin') return
    void loadDashboard()
  }, [user, loadDashboard])

  useEffect(() => {
    if (activeTab === 'Customers') void loadCustomers()
    if (activeTab === 'Orders') void loadOrders()
    if (activeTab === 'Products') void loadProducts()
    if (activeTab === 'Reviews') void loadReviews()
    if (activeTab === 'Contacts') void loadContacts()
  }, [activeTab, loadCustomers, loadOrders, loadProducts, loadReviews, loadContacts])

  useEffect(() => {
    if (selectedCustomer) {
      void loadCustomerOrders(selectedCustomer._id)
    }
  }, [selectedCustomer, loadCustomerOrders])

  if (sessionLoading) return <div className="admin-page">Loading...</div>

  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-page admin-empty">
        <div className="admin-card">
          <h2>Admin access required</h2>
          <p>Please login with an admin account to access the admin panel.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {user?.name?.split(' ')[0] || 'Admin'}</p>
        </div>
        <div className="admin-logo">👟 SoleStyle</div>
      </header>

      <div className="admin-tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`admin-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Dashboard' && dashboard && (
        <div className="admin-dashboard">
          <div className="admin-metrics">
            <div className="metric-card">
              <div className="metric-icon">📦</div>
              <div>
                <h3>{dashboard.orders || 0}</h3>
                <p>Total Orders</p>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">💰</div>
              <div>
                <h3>{formatINR(dashboard.revenue || 0)}</h3>
                <p>Total Revenue</p>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">⏳</div>
              <div>
                <h3>{dashboard.pendingOrders || 0}</h3>
                <p>Pending Orders</p>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-icon">💬</div>
              <div>
                <h3>{dashboard.newContacts || 0}</h3>
                <p>New Messages</p>
              </div>
            </div>
          </div>

          <div className="admin-grid">
            <div className="admin-section">
              <h2>Recent Orders</h2>
              <div className="orders-list">
                {dashboard.recentOrders?.slice(0, 10).map(order => (
                  <div key={order._id} className="order-item">
                    <div>
                      <strong>{order.user?.name || 'Customer'}</strong>
                      <p>{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                    </div>
                    <div>
                      <span className={`status-badge status-${order.status}`}>{order.status}</span>
                      <p>{formatINR(order.total)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-section">
              <h2>Order Status Breakdown</h2>
              <div className="status-breakdown">
                {Object.entries(dashboard.statusBreakdown || {}).map(([status, count]) => (
                  <div key={status} className="status-item">
                    <span className="status-label">{status}</span>
                    <span className="status-count">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Customers' && (
        <div className="admin-section-full">
          <div className="admin-section-header">
            <h2>All Customers ({customers.length})</h2>
            <div className="customer-stats">
              <span>Total Customers: {customers.length}</span>
            </div>
          </div>
          
          {selectedCustomer ? (
            <div className="customer-detail-view">
              <button className="back-btn" onClick={() => setSelectedCustomer(null)}>
                ← Back to Customers
              </button>
              
              <div className="customer-detail-card">
                <div className="customer-header">
                  <div>
                    <h3>{selectedCustomer.name}</h3>
                    <p>{selectedCustomer.email}</p>
                    {selectedCustomer.phone && <p>📞 {selectedCustomer.phone}</p>}
                  </div>
                  <div className="customer-badges">
                    <span className="badge">Role: {selectedCustomer.role}</span>
                    {selectedCustomer.loyaltyPoints > 0 && (
                      <span className="badge">⭐ {selectedCustomer.loyaltyPoints} Points</span>
                    )}
                  </div>
                </div>
                
                <div className="customer-info-grid">
                  <div className="info-card">
                    <h4>Account Information</h4>
                    <p><strong>Email:</strong> {selectedCustomer.email}</p>
                    {selectedCustomer.phone && <p><strong>Phone:</strong> {selectedCustomer.phone}</p>}
                    <p><strong>Member Since:</strong> {new Date(selectedCustomer.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}</p>
                    <p><strong>Loyalty Points:</strong> {selectedCustomer.loyaltyPoints || 0}</p>
                  </div>
                  
                  <div className="info-card">
                    <h4>Order Statistics</h4>
                    <p><strong>Total Orders:</strong> {customerOrders.length}</p>
                    <p><strong>Total Spent:</strong> {formatINR(
                      customerOrders.reduce((sum, order) => sum + (order.total || 0), 0)
                    )}</p>
                    <p><strong>Pending Orders:</strong> {
                      customerOrders.filter(o => ['pending', 'confirmed', 'processing'].includes(o.status)).length
                    }</p>
                    <p><strong>Delivered Orders:</strong> {
                      customerOrders.filter(o => o.status === 'delivered').length
                    }</p>
                  </div>
                </div>
                
                <div className="customer-orders-section">
                  <h4>Order History</h4>
                  {customerOrders.length === 0 ? (
                    <p className="no-data">No orders found for this customer.</p>
                  ) : (
                    <div className="customer-orders-list">
                      {customerOrders.map(order => (
                        <div key={order._id} className="customer-order-item">
                          <div className="order-info">
                            <strong>Order #{order._id.slice(-8)}</strong>
                            <p>{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                            <p>{order.items?.length || 0} items</p>
                          </div>
                          <div className="order-details">
                            <span className={`status-badge status-${order.status}`}>
                              {order.status}
                            </span>
                            <strong>{formatINR(order.total || 0)}</strong>
                          </div>
                          <button 
                            className="view-order-btn"
                            onClick={() => {
                              setActiveTab('Orders')
                              setTimeout(() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                              }, 100)
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="customers-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Orders</th>
                    <th>Total Spent</th>
                    <th>Member Since</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="no-data">No customers found</td>
                    </tr>
                  ) : (
                    customers.map(customer => {
                      // Calculate customer stats from orders
                      const customerOrderCount = orders.filter(o => 
                        o.user?._id === customer._id || o.user === customer._id
                      ).length
                      const customerTotalSpent = orders
                        .filter(o => o.user?._id === customer._id || o.user === customer._id)
                        .reduce((sum, order) => sum + (order.total || 0), 0)
                      
                      return (
                        <tr key={customer._id}>
                          <td>
                            <strong>{customer.name}</strong>
                            {customer.loyaltyPoints > 0 && (
                              <span className="loyalty-badge">⭐ {customer.loyaltyPoints}</span>
                            )}
                          </td>
                          <td>{customer.email}</td>
                          <td>{customer.phone || 'N/A'}</td>
                          <td>{customerOrderCount}</td>
                          <td>{formatINR(customerTotalSpent)}</td>
                          <td>{new Date(customer.createdAt).toLocaleDateString('en-IN')}</td>
                          <td>
                            <button 
                              className="view-customer-btn"
                              onClick={() => setSelectedCustomer(customer)}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'Orders' && (
        <div className="admin-section-full">
          <h2>All Orders</h2>
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>#{order._id.slice(-6)}</td>
                    <td>{order.user?.name || 'N/A'}<br /><small>{order.user?.email}</small></td>
                    <td>{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                    <td>{order.items?.length || 0} items</td>
                    <td>{formatINR(order.total)}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleOrderStatusUpdate(order._id, e.target.value)}
                        className={`status-select status-${order.status}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={() => navigate(`/orders/${order._id}`)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Products' && (
        <div className="admin-section-full">
          <div className="admin-section-header">
            <h2>Products Management</h2>
            <button className="btn-primary" onClick={() => navigate('/admin/products/new')}>
              + Add Product
            </button>
          </div>
          <div className="products-grid">
            {products.map(product => (
              <div key={product._id} className="product-admin-card">
                <img src={product.images?.[0] || '/placeholder-shoe.jpg'} alt={product.name} />
                <div className="product-admin-info">
                  <h3>{product.name}</h3>
                  <p>{product.category} • {formatINR(product.price)}</p>
                  <div className="product-actions">
                    <button onClick={() => navigate(`/admin/products/${product._id}/edit`)}>Edit</button>
                    <button onClick={() => navigate(`/shoes?category=${product.category}`)}>View</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Reviews' && (
        <div className="admin-section-full">
          <h2>Customer Reviews</h2>
          <div className="reviews-list">
            {reviews.map(review => (
              <div key={review._id} className="review-admin-card">
                <div className="review-header">
                  <div>
                    <strong>{review.user?.name || 'Anonymous'}</strong>
                    <p>{review.shoe?.name || 'Product'}</p>
                  </div>
                  <div className="review-rating">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                </div>
                <p className="review-comment">{review.comment || review.title}</p>
                <div className="review-actions">
                  <button onClick={() => reviewsApi.updateReview(review._id, { verified: true })}>
                    {review.verified ? '✓ Verified' : 'Verify'}
                  </button>
                  <button onClick={() => reviewsApi.deleteReview(review._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Contacts' && (
        <div className="admin-section-full">
          <h2>Contact Messages</h2>
          <div className="contacts-list">
            {contacts.map(contact => (
              <div key={contact._id} className="contact-card">
                <div className="contact-header">
                  <div>
                    <strong>{contact.name}</strong>
                    <p>{contact.email} • {contact.phone}</p>
                  </div>
                  <span className={`status-badge status-${contact.status}`}>{contact.status}</span>
                </div>
                <p className="contact-subject">{contact.subject}</p>
                <p className="contact-message">{contact.message}</p>
                <div className="contact-actions">
                  <select
                    value={contact.status}
                    onChange={(e) => handleContactStatusUpdate(contact._id, e.target.value)}
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                  <button>Reply</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Images' && (
        <div className="admin-section-full">
          <h2>Image Management</h2>
          <div className="image-upload-section">
            <div className="upload-area">
              <p>📷 Drag & drop images here or click to upload</p>
              <input type="file" multiple accept="image/*" />
            </div>
            <p className="upload-note">Upload product images, banners, or promotional content. Supported formats: JPG, PNG, WebP</p>
          </div>
        </div>
      )}
    </div>
  )
}
