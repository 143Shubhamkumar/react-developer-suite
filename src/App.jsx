import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/App.css'

import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import MovieSearch from './pages/MovieSearch'
import MovieDetails from './pages/MovieDetails' 
import PostsViewer from './pages/PostsViewer'
import StatePlayground from './pages/StatePlayground'

function App() {
  return (
    <BrowserRouter>
      <div className="page-container">
        <Navbar />
        
        {/* Main Content Area with Routing */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<MovieSearch />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/posts" element={<PostsViewer />} />
            <Route path="/state" element={<StatePlayground />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
