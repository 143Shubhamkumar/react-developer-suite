import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Column 1: Brand */}
          <div className="footer-brand">
            <h3>🚀 REACT SUITE</h3>
            <p>A unified development environment showcasing React Router, API fetching operations, custom modal workflows, and responsive UI designs.</p>
          </div>

          {/* Column 2: Projects Navigation */}
          <div className="footer-links-col">
            <h4>Projects</h4>
            <div className="footer-links-list">
              <Link to="/" className="footer-item-link">🎬 Movie Search</Link>
              <Link to="/posts" className="footer-item-link">📄 Posts Board</Link>
              <Link to="/state" className="footer-item-link">🧪 State Lab</Link>
            </div>
          </div>

          {/* Column 3: Tools */}
          <div className="footer-links-col">
            <h4>Technologies</h4>
            <div className="footer-links-list">
              <span className="text-slate-500 text-sm">React 19 & Router v7</span>
              <span className="text-slate-500 text-sm">Tailwind CSS v4</span>
              <span className="text-slate-500 text-sm">Vite & HMR</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© 2026 REACT SHOWCASE PORTFOLIO • DESIGNED FOR GITHUB</p>
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors cursor-pointer">GITHUB</a>
            <span className="text-slate-700">|</span>
            <a href="https://react.dev" target="_blank" rel="noreferrer" className="hover:text-white transition-colors cursor-pointer">REACT DOCS</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
