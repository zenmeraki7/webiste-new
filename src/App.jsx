
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Home'
import ShopifyApp from './pages/Expertise/ShopifyApp'
import CustomShopify from './pages/Expertise/CustomShopify'
import CustomApp from './pages/Expertise/CustomApp'
import Website from './pages/Expertise/Website'
import DigitalMarketing from './pages/Expertise/DigitalMarketing'
import Ecommerce from './pages/Expertise/E-commerce'
import AboutUs from './pages/AboutUs/Aboutus'

function App() {

  return (
   <>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about-us" element={<AboutUs/>} />

      {/* Expertise Routes */}
    <Route path="/shopify-app" element={<ShopifyApp />} />
    <Route path="/custom-store" element={<CustomShopify/>} />
    <Route path="/custom-app" element={<CustomApp />} />
    <Route path="/website-management" element={<Website/>} />
    <Route path="/digital-marketing" element={<DigitalMarketing />} />
    <Route path="/e-commerce-management" element={<Ecommerce />} />

   </Routes>
   
   </>
  )
}

export default App
