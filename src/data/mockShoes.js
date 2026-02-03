// Mock shoe data for offline/backend-independent display
// This ensures the UI always shows shoes even without backend connection

const generateMockShoes = () => {
  const shoes = []
  let idCounter = 1

  // Men's shoes
  const menTypes = ['sneakers', 'formal', 'slippers', 'sandals', 'boots']
  const menNames = [
    ['Classic Running Sneakers', 'Athletic Performance Shoes', 'Sporty Casual Sneakers', 'Premium Leather Sneakers'],
    ['Oxford Dress Shoes', 'Formal Business Shoes', 'Leather Dress Shoes', 'Classic Formal Footwear'],
    ['Comfortable House Slippers', 'Casual Home Slippers', 'Warm Winter Slippers'],
    ['Summer Sandals', 'Casual Sandals', 'Beach Sandals'],
    ['Leather Boots', 'Winter Boots', 'Casual Boots']
  ]
  const menBrands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Premium', 'Classic']
  
  menTypes.forEach((type, typeIndex) => {
    const names = menNames[typeIndex] || menNames[0]
    names.forEach((name, nameIndex) => {
      const basePrice = [1999, 2999, 3999, 4999, 5999][typeIndex] || 1999
      const price = basePrice + (nameIndex * 500)
      shoes.push({
        _id: `men-${idCounter++}`,
        name: name,
        brand: menBrands[nameIndex % menBrands.length],
        category: 'men',
        price: price,
        originalPrice: price + 500,
        rating: 4 + (Math.random() * 1),
        reviewCount: Math.floor(Math.random() * 100) + 10,
        description: `Premium ${name.toLowerCase()} for men. Comfortable, stylish, and durable.`,
        sizes: [
          { size: '7', stock: 5 },
          { size: '8', stock: 8 },
          { size: '9', stock: 10 },
          { size: '10', stock: 7 },
          { size: '11', stock: 4 }
        ],
        colors: ['Black', 'Brown', 'White', 'Navy'],
        featured: nameIndex === 0
      })
    })
  })

  // Women's shoes
  const womenTypes = ['heels', 'flats', 'slippers', 'sandals', 'boots']
  const womenNames = [
    ['Elegant High Heels', 'Classic Pump Heels', 'Stylish Stiletto Heels', 'Comfortable Block Heels'],
    ['Casual Flats', 'Ballet Flats', 'Comfortable Walking Flats'],
    ['Home Slippers', 'Cozy Slippers', 'Fashion Slippers'],
    ['Summer Sandals', 'Wedge Sandals', 'Flat Sandals'],
    ['Ankle Boots', 'Knee High Boots', 'Fashion Boots']
  ]
  const womenBrands = ['Elegance', 'Style', 'Fashion', 'Comfort', 'Premium']
  
  womenTypes.forEach((type, typeIndex) => {
    const names = womenNames[typeIndex] || womenNames[0]
    names.forEach((name, nameIndex) => {
      const basePrice = [2499, 1999, 1499, 1799, 3499][typeIndex] || 1999
      const price = basePrice + (nameIndex * 400)
      shoes.push({
        _id: `women-${idCounter++}`,
        name: name,
        brand: womenBrands[nameIndex % womenBrands.length],
        category: 'women',
        price: price,
        originalPrice: price + 600,
        rating: 4.2 + (Math.random() * 0.8),
        reviewCount: Math.floor(Math.random() * 150) + 15,
        description: `Beautiful ${name.toLowerCase()} for women. Stylish and comfortable for any occasion.`,
        sizes: [
          { size: '6', stock: 6 },
          { size: '7', stock: 9 },
          { size: '8', stock: 12 },
          { size: '9', stock: 8 },
          { size: '10', stock: 5 }
        ],
        colors: ['Black', 'Nude', 'Red', 'Pink', 'White'],
        featured: nameIndex === 0
      })
    })
  })

  // Kids' shoes
  const kidsTypes = ['sneakers', 'boots', 'school', 'slippers', 'sandals']
  const kidsNames = [
    ['Kids Running Shoes', 'Colorful Sneakers', 'School Sneakers'],
    ['Winter Boots', 'Rain Boots', 'Casual Boots'],
    ['School Shoes', 'Formal School Shoes', 'Comfortable School Shoes'],
    ['Kids Slippers', 'Fun Slippers', 'Warm Slippers'],
    ['Summer Sandals', 'Beach Sandals', 'Casual Sandals']
  ]
  const kidsBrands = ['Kids', 'Fun', 'Comfort', 'Play', 'School']
  
  kidsTypes.forEach((type, typeIndex) => {
    const names = kidsNames[typeIndex] || kidsNames[0]
    names.forEach((name, nameIndex) => {
      const basePrice = [999, 1299, 1499, 799, 899][typeIndex] || 999
      const price = basePrice + (nameIndex * 200)
      shoes.push({
        _id: `kids-${idCounter++}`,
        name: name,
        brand: kidsBrands[nameIndex % kidsBrands.length],
        category: 'kids',
        price: price,
        originalPrice: price + 300,
        rating: 4.5 + (Math.random() * 0.5),
        reviewCount: Math.floor(Math.random() * 80) + 5,
        description: `Comfortable and fun ${name.toLowerCase()} for kids. Perfect for play and school.`,
        sizes: [
          { size: '10', stock: 8 },
          { size: '11', stock: 10 },
          { size: '12', stock: 12 },
          { size: '13', stock: 9 },
          { size: '1', stock: 7 },
          { size: '2', stock: 6 }
        ],
        colors: ['Blue', 'Red', 'Pink', 'Green', 'Yellow', 'Black'],
        featured: nameIndex === 0
      })
    })
  })

  return shoes
}

export const mockShoes = generateMockShoes()

// Helper function to get mock shoes filtered by category
export const getMockShoes = (filters = {}) => {
  let filtered = [...mockShoes]

  // Filter by category
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(shoe => shoe.category === filters.category)
  }

  // Filter by search
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(shoe => 
      shoe.name.toLowerCase().includes(searchLower) ||
      shoe.brand.toLowerCase().includes(searchLower) ||
      shoe.description.toLowerCase().includes(searchLower)
    )
  }

  // Filter by price range
  if (filters.minPrice) {
    filtered = filtered.filter(shoe => shoe.price >= Number(filters.minPrice))
  }
  if (filters.maxPrice) {
    filtered = filtered.filter(shoe => shoe.price <= Number(filters.maxPrice))
  }

  // Sort
  if (filters.sort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price)
  } else if (filters.sort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price)
  } else if (filters.sort === 'rating') {
    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  } else if (filters.sort === 'newest') {
    filtered.reverse() // Just reverse for mock data
  }

  return filtered
}

// Get min prices for each category
export const getMockMinPrices = () => {
  const prices = {}
  const categories = ['men', 'women', 'kids']
  
  categories.forEach(category => {
    const categoryShoes = mockShoes.filter(s => s.category === category)
    if (categoryShoes.length > 0) {
      const minPrice = Math.min(...categoryShoes.map(s => s.price))
      prices[category] = { minPrice, count: categoryShoes.length }
    }
  })
  
  return prices
}

// Get featured shoes
export const getMockFeaturedShoes = (limit = 6) => {
  return mockShoes
    .filter(shoe => shoe.featured)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit)
}
