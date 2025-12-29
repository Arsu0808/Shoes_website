import { useState } from 'react'
import './FAQ.css'

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is SoleStyle?',
        a: 'SoleStyle is a premium footwear e-commerce platform offering quality shoes for men, women, and kids at affordable prices. We are based in Satna, Madhya Pradesh, and serve customers across India.',
      },
      {
        q: 'How do I place an order?',
        a: 'Simply browse our collection, select your desired shoes, choose size and color, add to cart, and proceed to checkout. You can pay via multiple payment methods including UPI, cards, and cash on delivery.',
      },
      {
        q: 'Do you ship outside India?',
        a: 'Currently, we ship only within India. We are working on expanding our shipping services to international locations.',
      },
      {
        q: 'How can I track my order?',
        a: 'Once your order is confirmed, you will receive a tracking number via email and SMS. You can use this number on our website or the courier partner\'s website to track your order.',
      },
    ],
  },
  {
    category: 'Products',
    questions: [
      {
        q: 'What sizes are available?',
        a: 'We offer a wide range of sizes for men (7-12), women (5-10), and kids (3-8). Each product page shows available sizes. If your size is out of stock, you can sign up for restock notifications.',
      },
      {
        q: 'Are the products authentic?',
        a: 'Yes, all our products are 100% authentic. We source directly from authorized dealers and manufacturers. We guarantee the authenticity of every product.',
      },
      {
        q: 'Can I see more images of a product?',
        a: 'Yes, each product page includes multiple images from different angles. You can click on any image to view it in full size.',
      },
      {
        q: 'Do you offer gift wrapping?',
        a: 'Yes, we offer gift wrapping services for an additional charge. You can select this option during checkout.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    questions: [
      {
        q: 'What are the shipping charges?',
        a: 'Shipping is FREE for orders above ₹1,000. For orders below ₹1,000, we charge ₹50 as shipping fee. Express delivery options are available at additional charges.',
      },
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery takes 5-7 business days. Express delivery (1-2 days) is available in select cities for an additional charge. Delivery times may vary during festivals and peak seasons.',
      },
      {
        q: 'Which cities do you deliver to?',
        a: 'We deliver to all major cities and towns across India. For remote locations, delivery may take a few extra days.',
      },
      {
        q: 'Can I change my delivery address?',
        a: 'You can change your delivery address within 2 hours of placing the order by contacting our customer support. After that, changes may not be possible if the order has been shipped.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 7-day return policy. If you are not satisfied with your purchase, you can return it in original condition with tags and packaging. The product must be unworn and in original condition.',
      },
      {
        q: 'How do I return a product?',
        a: 'Log in to your account, go to "My Orders", select the order you want to return, and click "Return". Our team will process your request and provide a return label. You can also contact our customer support.',
      },
      {
        q: 'How long does it take to process a refund?',
        a: 'Once we receive the returned product and verify its condition, refunds are processed within 5-7 business days. The amount will be credited to your original payment method.',
      },
      {
        q: 'Are there any charges for returns?',
        a: 'Returns are free for defective or wrong products. For other returns, a nominal return shipping charge may apply. This will be clearly mentioned during the return process.',
      },
    ],
  },
  {
    category: 'Payment',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit/debit cards, UPI, net banking, and cash on delivery (COD) for eligible orders.',
      },
      {
        q: 'Is it safe to pay online?',
        a: 'Yes, we use secure payment gateways with SSL encryption. Your payment information is never stored on our servers and is processed securely through our payment partners.',
      },
      {
        q: 'Do you offer EMI options?',
        a: 'Yes, we offer EMI options through select banks and credit cards. You can see available EMI options during checkout.',
      },
      {
        q: 'What if my payment fails?',
        a: 'If your payment fails, please check your bank account balance, card details, or try a different payment method. If the issue persists, contact our customer support.',
      },
    ],
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('General')

  const currentFAQs = faqs.find(f => f.category === selectedCategory)?.questions || []

  return (
    <div className="faq-page">
      <section className="faq-hero">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our products, shipping, returns, and more.</p>
      </section>

      <div className="faq-container">
        <div className="faq-categories">
          {faqs.map((faq) => (
            <button
              key={faq.category}
              className={`faq-category-btn ${selectedCategory === faq.category ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(faq.category)
                setOpenIndex(null)
              }}
            >
              {faq.category}
            </button>
          ))}
        </div>

        <div className="faq-content">
          <h2>{selectedCategory} Questions</h2>
          <div className="faq-list">
            {currentFAQs.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <span>{faq.q}</span>
                  <span className="faq-icon">{openIndex === idx ? '−' : '+'}</span>
                </button>
                {openIndex === idx && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="faq-contact">
        <h2>Still have questions?</h2>
        <p>Can't find what you're looking for? Our customer support team is here to help!</p>
        <div className="faq-contact-options">
          <a href="tel:+919876543210" className="faq-contact-btn">
            📞 Call Us: +91 98765 43210
          </a>
          <a href="mailto:hello@solestyle.in" className="faq-contact-btn">
            ✉️ Email: hello@solestyle.in
          </a>
        </div>
      </section>
    </div>
  )
}

