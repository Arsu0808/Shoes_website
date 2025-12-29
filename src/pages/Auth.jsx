import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Auth.css'
import { useSession } from '../hooks/useSession'

const initialForm = { name: '', email: '', phone: '', password: '' }

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState({ type: null, message: '' })
  const [submitting, setSubmitting] = useState(false)
  const { login, register } = useSession()
  const navigate = useNavigate()

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setStatus({ type: null, message: '' })
    try {
      if (mode === 'login') {
        const result = await login({ email: form.email, password: form.password })
        setStatus({ type: 'success', message: 'Welcome back!' })
        // Redirect admins to admin panel, others to home
        setTimeout(() => {
          if (result?.user?.role === 'admin') {
            navigate('/admin')
          } else {
            navigate('/')
          }
        }, 500)
      } else {
        const result = await register({ name: form.name, email: form.email, phone: form.phone, password: form.password })
        setStatus({ type: 'success', message: 'Account created. You are now logged in.' })
        // Redirect admins to admin panel, others to home
        setTimeout(() => {
          if (result?.user?.role === 'admin') {
            navigate('/admin')
          } else {
            navigate('/')
          }
        }, 500)
      }
    } catch (error) {
      console.error('Login/Register error:', error)
      console.error('Error response:', error.response)
      console.error('Error data:', error.response?.data)
      
      let errorMessage = 'Something went wrong. Please check your credentials and try again.'
      
      if (error.response) {
        // Server responded with error
        errorMessage = error.response.data?.message || error.response.data?.error || errorMessage
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'Unable to connect to server. Please check your internet connection.'
      } else {
        // Something else happened
        errorMessage = error.message || errorMessage
      }
      
      setStatus({ type: 'error', message: errorMessage })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__glass">
          <p className="hero__eyebrow">Customer portal</p>
          <h1>{mode === 'login' ? 'Welcome back' : 'Create your SoleStyle account'}</h1>
          <p>Access your orders, wishlist, and exclusive offers in one place.</p>
          <div className="auth-toggle">
            <button type="button" className={mode === 'login' ? 'is-active' : ''} onClick={() => setMode('login')}>
              Login
            </button>
            <button type="button" className={mode === 'signup' ? 'is-active' : ''} onClick={() => setMode('signup')}>
              Sign Up
            </button>
          </div>
          {mode === 'login' && (
            <div className="admin-login-hint">
              <p>👤 Admin? Use your admin credentials to access the admin panel.</p>
            </div>
          )}
          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <label>
                Name
                <input type="text" value={form.name} onChange={handleChange('name')} placeholder="Anika" required />
              </label>
            )}
            <label>
              Email
              <input type="email" value={form.email} onChange={handleChange('email')} placeholder="you@solestyle.in" required />
            </label>
            {mode === 'signup' && (
              <label>
                Phone
                <input type="tel" value={form.phone} onChange={handleChange('phone')} placeholder="+91 98 200 12345" />
              </label>
            )}
            <label>
              Password
              <input type="password" value={form.password} onChange={handleChange('password')} placeholder="••••••••" required />
            </label>
            {status.message && <p className={`auth-status ${status.type}`}>{status.message}</p>}
            <button type="submit" disabled={submitting}>
              {submitting ? 'Please wait…' : mode === 'login' ? 'Login' : 'Create account'}
            </button>
          </form>
          <div className="auth-socials">
            <button type="button" disabled>
              Continue with Google
            </button>
            <button type="button" disabled>
              Continue with Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

