import { useEffect, useMemo, useState } from 'react'
import '../components/forms/booking.css'
import { fetchServices, fetchStaff } from '../api/services'
import { createBooking } from '../api/bookings'
import { useSession } from '../hooks/useSession'

const steps = ['Services', 'Schedule', 'Artist', 'Details']

const paymentOptions = ['Pay at salon', 'UPI', 'Card on file (Stripe)', 'Razorpay link']

export default function Booking() {
  const { user } = useSession()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedServices, setSelectedServices] = useState([])
  const [services, setServices] = useState([])
  const [staffOptions, setStaffOptions] = useState([])
  const [form, setForm] = useState({
    date: '',
    time: '',
    staff: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
    payment: paymentOptions[0],
  })
  const [status, setStatus] = useState({ loading: true, error: '', submitting: false, success: '' })

  useEffect(() => {
    if (!user) return
    setForm((prev) => ({
      ...prev,
      name: prev.name || user.name || '',
      email: prev.email || user.email || '',
      phone: prev.phone || user.phone || '',
    }))
  }, [user])

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const [servicesData, staffData] = await Promise.all([fetchServices(), fetchStaff()])
        if (!mounted) return
        setServices(
          servicesData.map((service) => ({
            id: service._id,
            name: service.title,
            price: service.price,
            duration: service.durationMinutes,
          }))
        )
        setStaffOptions(
          staffData.map((staff) => ({
            id: staff._id,
            name: staff.name,
            specialty: staff.role,
          }))
        )
        setStatus((prev) => ({ ...prev, loading: false }))
      } catch (error) {
        if (!mounted) return
        setStatus({ loading: false, error: error.message || 'Unable to load booking data' })
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  const totalPrice = useMemo(
    () => selectedServices.reduce((sum, serviceId) => {
      const service = services.find((s) => s.id === serviceId)
      return sum + (service?.price || 0)
    }, 0),
    [selectedServices, services]
  )

  const totalDuration = useMemo(
    () => selectedServices.reduce((sum, serviceId) => {
      const service = services.find((s) => s.id === serviceId)
      return sum + (service?.duration || 0)
    }, 0),
    [selectedServices, services]
  )

  const canContinue = () => {
    if (currentStep === 0) return selectedServices.length > 0
    if (currentStep === 1) return form.date && form.time
    if (currentStep === 2) return Boolean(form.staff)
    if (currentStep === 3) return form.name && form.phone && form.email
    return true
  }

  const handleServiceToggle = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    )
  }

  const updateForm = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const goNext = () => {
    if (currentStep === steps.length - 1) {
      handleSubmit()
    } else {
      setCurrentStep((step) => step + 1)
    }
  }

  const goPrev = () => {
    if (currentStep > 0) setCurrentStep((step) => step - 1)
  }

  const handleSubmit = async () => {
    if (!user) {
      setStatus((prev) => ({ ...prev, error: 'Please login to confirm your booking.' }))
      return
    }
    try {
      setStatus((prev) => ({ ...prev, submitting: true, error: '', success: '' }))
      const isoDate = form.date && form.time ? new Date(`${form.date}T${form.time}`) : null
      await createBooking({
        services: selectedServices.map((serviceId) => ({
          serviceId,
          staffId: form.staff || undefined,
        })),
        appointmentDate: isoDate?.toISOString(),
        notes: form.notes,
      })
      setStatus((prev) => ({ ...prev, submitting: false, success: 'Booking confirmed! Check your inbox shortly.' }))
    } catch (error) {
      setStatus((prev) => ({
        ...prev,
        submitting: false,
        error: error.response?.data?.message || 'Unable to create booking',
      }))
    }
  }

  return (
    <section className="booking-page">
      <header className="booking-page__header">
        <p className="hero__eyebrow">Appointment</p>
        <h1>Craft your ritual in four guided steps</h1>
        <p>Select services, schedule an artist, and confirm your details. You’ll receive instant email and WhatsApp confirmations.</p>
      </header>

      <div className="booking-page__content">
        {status.loading && <p>Loading availability…</p>}
        {status.error && !status.submitting && <p className="booking-error">{status.error}</p>}
        <div className="booking-wizard">
          <ol className="booking-wizard__steps">
            {steps.map((step, idx) => (
              <li key={step} className={idx === currentStep ? 'is-active' : idx < currentStep ? 'is-done' : ''}>
                <span>{idx + 1}</span>
                {step}
              </li>
            ))}
          </ol>

          {currentStep === 0 && (
            <div className="booking-panel">
              <h3>Step 1: Choose services</h3>
              <div className="booking-services">
                {services.map((service) => (
                  <label key={service.id} className={`booking-service ${selectedServices.includes(service.id) ? 'is-selected' : ''}`}>
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service.id)}
                      onChange={() => handleServiceToggle(service.id)}
                    />
                    <div>
                      <p>{service.name}</p>
                      <span>
                        ₹{service.price.toLocaleString('en-IN')} • {service.duration} mins
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="booking-panel">
              <h3>Step 2: Pick date & time</h3>
              <div className="booking-grid">
                <label>
                  Date
                  <input type="date" value={form.date} onChange={updateForm('date')} />
                </label>
                <label>
                  Time
                  <input type="time" value={form.time} onChange={updateForm('time')} />
                </label>
              </div>
              <p className="booking-hint">Need an urgent slot? Call +91 98200 12345 after booking.</p>
            </div>
          )}

          {currentStep === 2 && (
            <div className="booking-panel">
              <h3>Step 3: Choose preferred artist</h3>
              <div className="booking-staff">
                {staffOptions.map((staff) => (
                  <button
                    key={staff.id}
                    type="button"
                    className={form.staff === staff.id ? 'is-selected' : ''}
                    onClick={() => setForm((prev) => ({ ...prev, staff: staff.id }))}
                  >
                    <strong>{staff.name}</strong>
                    <span>{staff.specialty}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="booking-panel">
              <h3>Step 4: Contact & payment</h3>
              <div className="booking-grid booking-grid--two">
                <label>
                  Full name
                  <input type="text" value={form.name} onChange={updateForm('name')} placeholder="Anika Sharma" />
                </label>
                <label>
                  Phone
                  <input type="tel" value={form.phone} onChange={updateForm('phone')} placeholder="+91 98 200 12345" />
                </label>
                <label>
                  Email
                  <input type="email" value={form.email} onChange={updateForm('email')} placeholder="you@solestyle.in" />
                </label>
                <label>
                  Payment preference
                  <select value={form.payment} onChange={updateForm('payment')}>
                    {paymentOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                Special instructions
                <textarea value={form.notes} onChange={updateForm('notes')} rows={3} placeholder="Skin sensitivities, parking notes…" />
              </label>
            </div>
          )}

          <div className="booking-wizard__nav">
            <button type="button" onClick={goPrev} disabled={currentStep === 0}>
              Back
            </button>
            <button type="button" onClick={goNext} disabled={!canContinue() || status.submitting}>
              {currentStep === steps.length - 1 ? (status.submitting ? 'Submitting…' : 'Confirm Booking') : 'Continue'}
            </button>
          </div>
        </div>

        <aside className="booking-summary">
          <h3>Booking summary</h3>
          <div className="booking-summary__card">
            <strong>Selected services</strong>
            {selectedServices.length === 0 && <p>No services chosen yet.</p>}
            <ul>
              {selectedServices.map((serviceId) => {
                const service = services.find((s) => s.id === serviceId)
                return (
                  <li key={serviceId}>
                    <span>{service?.name}</span>
                    <span>₹{service?.price.toLocaleString('en-IN')}</span>
                  </li>
                )
              })}
            </ul>
            <hr />
            <div className="booking-summary__meta">
              <span>Total time</span>
              <strong>{totalDuration || 0} mins</strong>
            </div>
            <div className="booking-summary__meta">
              <span>Estimate</span>
              <strong>₹{totalPrice.toLocaleString('en-IN')}</strong>
            </div>
          </div>
          <div className="booking-summary__card">
            <strong>Schedule</strong>
            <p>{form.date ? `${form.date} at ${form.time || '--'}` : 'Pick a slot next step'}</p>
            <strong>Artist</strong>
            <p>{form.staff ? staffOptions.find((s) => s.id === form.staff)?.name : 'Assign any artist'}</p>
            <strong>Payment</strong>
            <p>{form.payment}</p>
          </div>
          {status.success && <div className="booking-summary__card success">{status.success}</div>}
        </aside>
      </div>
    </section>
  )
}

