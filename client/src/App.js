import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import UserForm from './pages/Register/User/UserForm'
import RestaurantForm from './pages/Register/Restaurant/RestaurantForm'
import Login from './pages/Login/Login'
import Restaurant from './pages/Restaurant/Restaurant'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register/user" element={<UserForm />} />
        <Route exact path="/register/restaurant" element={<RestaurantForm />} />
        <Route exact path="/signin" element={<Login />} />
        <Route exact path="/restaurant" element={<Restaurant />} />
      </Routes>
    </Router>
  )
}

export default App
