import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../common/Button'
import './services.css'

export function ServiceDetailModal({ service, onClose }) {
  const includes = service?.includes?.length
    ? service.includes
    : service?.extras?.map((extra) => extra.name) || []
  const benefits = service?.benefits || service?.tags || []
  const staff = service?.staff || []

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          className="service-modal__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="service-modal"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="service-modal__banner">
              <img src={service.image} alt={service.name} />
              <div className="service-modal__banner-info">
                <p>{service.subcategory}</p>
                <h2>{service.name}</h2>
                <div className="service-modal__chip-row">
                  <span>₹{service.price.toLocaleString('en-IN')}</span>
                  <span>{service.duration} mins</span>
                  <span>⭐ {service.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>

            <div className="service-modal__content">
              <section>
                <h3>Description</h3>
                <p>{service.description}</p>
              </section>

              {service?.beforeAfter?.length > 0 && (
                <section>
                  <h3>Before / After</h3>
                  <div className="service-modal__before-after">
                    {service.beforeAfter.map((image, idx) => (
                      <img key={image + idx} src={image} alt="Result preview" loading="lazy" />
                    ))}
                  </div>
                </section>
              )}

              {includes.length > 0 && (
                <section>
                  <h3>What’s Included</h3>
                  <ul>
                    {includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}

              {benefits.length > 0 && (
                <section>
                  <h3>Benefits</h3>
                  <ul>
                    {benefits.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}

              {staff.length > 0 && (
                <section>
                  <h3>Available Experts</h3>
                  <div className="service-modal__chips">
                    {staff.map((member) => (
                      <span key={typeof member === 'string' ? member : member.name}>{member.name || member}</span>
                    ))}
                  </div>
                </section>
              )}

              {service?.reviews?.length > 0 && (
                <section>
                  <h3>Client Reviews</h3>
                  <div className="service-modal__reviews">
                    {service.reviews.map((review, idx) => (
                      <article key={review.name + idx}>
                        <strong>{review.name}</strong>
                        <p>{review.text}</p>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="service-modal__footer">
              <div>
                <strong>₹{service.price.toLocaleString('en-IN')}</strong>
                <span>{service.duration} mins</span>
              </div>
              <Button variant="primary" size="md">
                Add to Booking
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

