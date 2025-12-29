import { useNavigate } from 'react-router-dom'
import { Button } from '../common/Button'

export function StickyBookButton() {
  const navigate = useNavigate()
  return (
    <div className="sticky-booking">
      <div>
        <p className="sticky-booking__title">Need a glow-up?</p>
        <p className="sticky-booking__subtitle">Tap to reserve your chair</p>
      </div>
      <Button variant="primary" size="md" onClick={() => navigate('/booking')}>
        Book Now
      </Button>
    </div>
  )
}

