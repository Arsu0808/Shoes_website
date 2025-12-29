import './Blog.css'

const posts = [
  {
    id: 'b1',
    title: 'How to Choose the Perfect Running Shoes for Your Feet',
    date: 'Mar 15',
    read: '5 min read',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Finding the right running shoes can make all the difference in your performance and comfort. Learn about arch types, cushioning, and fit.',
  },
  {
    id: 'b2',
    title: 'Top 10 Comfortable Sandals for Summer 2024',
    date: 'Mar 8',
    read: '4 min read',
    image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Stay cool and comfortable this summer with our curated selection of stylish sandals perfect for Indian weather and occasions.',
  },
  {
    id: 'b3',
    title: 'Kids Shoe Sizing Guide: Everything Parents Need to Know',
    date: 'Mar 1',
    read: '6 min read',
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Ensure your child\'s feet grow healthy with our comprehensive guide on measuring, fitting, and choosing the right shoes for kids.',
  },
  {
    id: 'b4',
    title: 'Sneaker Care Tips: Keep Your Shoes Looking New',
    date: 'Feb 22',
    read: '4 min read',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Simple maintenance tips to extend the life of your favorite sneakers and keep them looking fresh for longer.',
  },
  {
    id: 'b5',
    title: 'Women\'s Fashion Footwear Trends for 2024',
    date: 'Feb 15',
    read: '5 min read',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Discover the latest trends in women\'s footwear, from elegant heels to comfortable flats, perfect for every occasion.',
  },
  {
    id: 'b6',
    title: 'Why Quality Matters: Investing in Good Footwear',
    date: 'Feb 8',
    read: '7 min read',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80',
    excerpt: 'Learn why investing in quality shoes is essential for foot health, comfort, and long-term savings.',
  },
]

export default function Blog() {
  return (
    <div className="blog-page">
      <section className="section-heading">
        <p>Blog & Articles</p>
        <h1>Latest from SoleStyle</h1>
        <p style={{ marginTop: '1rem', opacity: 0.8 }}>
          Stay updated with the latest trends, tips, and insights about footwear, fashion, and foot care.
        </p>
      </section>
      <div className="blog-grid">
        {posts.map((post) => (
          <article key={post.id}>
            <img src={post.image} alt={post.title} loading="lazy" />
            <div>
              <span>{post.date} · {post.read}</span>
              <h3>{post.title}</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '0.5rem' }}>{post.excerpt}</p>
              <button type="button">Read article</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

