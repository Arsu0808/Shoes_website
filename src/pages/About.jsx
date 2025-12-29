import { achievements, brandStory, teamMembers, values } from '../data/about'
import './About.css'

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div>
          <p className="hero__eyebrow">Our Story</p>
          <h1>Premium Footwear for Every Step</h1>
          <p>{brandStory.mission}</p>
          <div className="about-address">
            <p><strong>📍 Our Location:</strong></p>
            <p>Satna, Panna Naka<br />Satna, Madhya Pradesh 485001<br />India</p>
          </div>
        </div>
        <div className="about-hero__stats">
          {achievements.map((item) => (
            <article key={item.label}>
              <span>{item.value}</span>
              <p>{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-story">
        <h2>Mission & Vision</h2>
        <div className="about-story__grid">
          <article>
            <h3>Our Mission</h3>
            <p>{brandStory.mission}</p>
          </article>
          <article>
            <h3>Our Vision</h3>
            <p>{brandStory.vision}</p>
          </article>
        </div>
      </section>

      <section className="about-team">
        <div className="section-heading">
          <p>Meet Our Team</p>
          <h2>Led by Industry Experts</h2>
        </div>
        <div className="about-team__grid">
          {teamMembers.map((member) => (
            <article key={member.name}>
              <img src={member.image} alt={member.name} loading="lazy" />
              <div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <span>{member.experience} experience</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-values">
        <div className="section-heading">
          <p>Our Values</p>
          <h2>What Drives Us</h2>
        </div>
        <div className="about-values__grid">
          {values.map((value) => (
            <article key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-company">
        <h2>About SoleStyle</h2>
        <div className="about-company__content">
          <p>
            SoleStyle was established with a passion for bringing quality footwear to customers across India. 
            Under the leadership of our CEO, Arsu Shukla, we have grown from a small local business in Satna to 
            a trusted name in the footwear industry.
          </p>
          <p>
            Our commitment to quality, affordability, and customer satisfaction has helped us serve thousands 
            of happy customers. We offer a wide range of shoes for men, women, and kids, including sneakers, 
            slippers, sandals, and more.
          </p>
          <p>
            Located in the heart of Satna, Madhya Pradesh, we take pride in our roots and are dedicated to 
            providing exceptional service to our community and customers nationwide. Every pair of shoes we 
            offer is carefully selected to ensure the best quality and value for our customers.
          </p>
        </div>
      </section>
    </div>
  )
}

