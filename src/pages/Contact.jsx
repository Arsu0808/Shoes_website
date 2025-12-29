import './Contact.css'

export default function Contact() {
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div>
          <p className="hero__eyebrow">Visit us</p>
          <h1>Get in Touch</h1>
          <p>Contact us for inquiries, support, or visit our store. We are here to help you find your perfect pair!</p>
        </div>
        <div className="contact-info">
          <article>
            <h3>Call & WhatsApp</h3>
            <p>+91 6260289367</p>
            <p>hello@solestyle.in</p>
          </article>
          <article>
            <h3>Hours</h3>
            <p>Mon - Sun · 9:00 AM – 10:30 PM</p>
          </article>
          <article>
            <h3>Flagship</h3>
            <p>Satna, Panna Naka, Satna, Madhya Pradesh 485001, India</p>
            <p>Parking + valet available</p>
          </article>
        </div>
      </section>

      <section className="contact-grid">
        <form className="contact-form">
          <h2>Send a note</h2>
          <label>
            Name
            <input type="text" placeholder="Arsu shukla" />
          </label>
          <label>
            Email
            <input type="email" placeholder="you@solestyle.in" />
          </label>
          <label>
            Phone / WhatsApp
            <input type="tel" placeholder="+91 98 200 12345" />
          </label>
          <label>
            Message
            <textarea rows={4} placeholder="Share event details, looks, or questions." />
          </label>
          <button type="submit">Submit inquiry</button>
        </form>
        <div className="contact-map">
          <iframe
            title="SoleStyle Store Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.485655862725!2d72.8260972!3d18.9986564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1dc5fd0560b%3A0x90a962f8d833b0d7!2sColaba%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1700000000000"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  )
}

