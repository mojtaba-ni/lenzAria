import { Route, Routes } from 'react-router-dom'
import ModelBannerList from './modelBannerList'
import AddModelBanner from './add'

const ModelBanner = () => {
  return (
    <Routes>
      <Route path="/" element={<ModelBannerList />} />
      <Route path="/add" element={<AddModelBanner />} />
    
    </Routes>
  )
}

export default ModelBanner