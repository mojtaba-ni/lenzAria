import { Route, Routes } from 'react-router-dom'
import AddMainBanner from './add'
import MainBannerList from './mainBannerList'

const MainBanner = () => {
  return (
    <Routes>
      <Route path="/" element={<MainBannerList />} />
      <Route path="/add" element={<AddMainBanner />} />
    
    </Routes>
  )
}

export default MainBanner