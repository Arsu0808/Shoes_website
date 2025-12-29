import { Route, Routes } from 'react-router-dom'
import { PageShell } from './components/layout/PageShell'
import Home from './pages/Home'
import Shoes from './pages/Shoes'
import Contact from './pages/Contact'
import About from './pages/About'
import Blog from './pages/Blog'
import FAQ from './pages/FAQ'
import ShippingInfo from './pages/ShippingInfo'
import ReturnPolicy from './pages/ReturnPolicy'
import SizeGuide from './pages/SizeGuide'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import Admin from './pages/Admin'

function App() {
  return (
    <Routes>
      <Route element={<PageShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/shipping-info" element={<ShippingInfo />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/size-guide" element={<SizeGuide />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success/:orderId" element={<OrderSuccess />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  )
}

export default App
