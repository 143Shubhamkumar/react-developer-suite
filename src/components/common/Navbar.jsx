import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Active check helper
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname.startsWith('/movie/');
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Brand Logo */}
        <Link to="/" className="nav-logo">
          <span>🚀</span> REACT SUITE
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 nav-links">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            🎬 Movie Search
          </Link>
          <Link 
            to="/posts" 
            className={`nav-link ${isActive('/posts') ? 'active' : ''}`}
          >
            📄 Posts Board
          </Link>
          <Link 
            to="/state" 
            className={`nav-link ${isActive('/state') ? 'active' : ''}`}
          >
            🧪 State Lab
          </Link>
        </div>

        {/* Hamburger Menu Toggle (Mobile) */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-400 hover:text-white focus:outline-none transition-colors p-2 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <svg 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0b0e14]/95 border-b border-white/5 backdrop-blur-2xl transition-all duration-350 shadow-2xl z-50">
          <div className="flex flex-col p-6 space-y-4">
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className={`nav-link-mobile ${isActive('/') ? 'active' : ''}`}
            >
              🎬 Movie Search
            </Link>
            <Link 
              to="/posts" 
              onClick={() => setIsOpen(false)}
              className={`nav-link-mobile ${isActive('/posts') ? 'active' : ''}`}
            >
              📄 Posts Board
            </Link>
            <Link 
              to="/state" 
              onClick={() => setIsOpen(false)}
              className={`nav-link-mobile ${isActive('/state') ? 'active' : ''}`}
            >
              🧪 State Lab
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
