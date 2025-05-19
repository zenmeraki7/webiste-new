
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
import Careers from './pages/Carrers/Careers'
import Contact from './pages/Contact/Contact'
import MetaMatrixApp from './pages/Apps/MetamatrixApp'
import MultiVendorApp from './pages/Apps/MultivendorApp'
import Tap2shareApp from './pages/Apps/Tap2share'
import EmailAssistant from './pages/Projects/EmailAssistant'
import Metamatrix from './pages/Projects/Metamatrix'
import Multivendor from './pages/Projects/Multivendor'
import VisualSearchPage from './pages/Apps/VisualSearchApp'

function App() {

  return (
    <>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />



        {/* Expertise Routes */}
        <Route path="/shopify-app" element={<ShopifyApp />} />
        <Route path="/custom-store" element={<CustomShopify />} />
        <Route path="/custom-app" element={<CustomApp />} />
        <Route path="/website-management" element={<Website />} />
        <Route path="/digital-marketing" element={<DigitalMarketing />} />
        <Route path="/e-commerce-management" element={<Ecommerce />} />

        {/* apps */}
        <Route path="/metamatrix-app" element={<MetaMatrixApp />} />
        <Route path="/multivendor-app" element={<MultiVendorApp />} />
        <Route path="/tap2share-app" element={<Tap2shareApp />} />
        <Route path="/visual-search-app" element={<VisualSearchPage />} />

        {/* projects */}
        <Route path="/email-assitant" element={<EmailAssistant />} />
        <Route path="/meta-matrix" element={<Metamatrix />} />
        <Route path="/multivendor" element={<Multivendor />} />

        {/* Catch all route */}

   



      </Routes>

    </>
  )
}

export default App
