import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import MapPage from '../pages/MapPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/map" element={<MapPage />} />
    </Routes>
  )
}
