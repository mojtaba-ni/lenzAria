import { Route, Routes } from 'react-router-dom'
import AddOfferBanner from './add'
import OfferBannerList from './offerBannerList'


const OfferBanner = () => {
  return (
    <Routes>
      <Route path="/" element={<OfferBannerList />} />
      <Route path="/add" element={<AddOfferBanner />} />
    
    </Routes>
  )
}

export default OfferBanner