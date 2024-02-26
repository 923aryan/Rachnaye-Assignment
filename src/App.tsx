import SearchPage from './pages/searchBar'
import './App.css'
import { RouterProvider, Routes, createBrowserRouter,Route } from 'react-router-dom'
import AllProduct from './pages/products/pages/Products'

function App() {

  return (
    <div >
      <Routes>
        <Route path="/" element = {<SearchPage/>}></Route>
        <Route path='/products' element = {<AllProduct/>}></Route>
      </Routes>
    </div>
  )
}
export default App


