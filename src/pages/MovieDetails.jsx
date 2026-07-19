import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Track id change to reset loading state during render
  const [prevId, setPrevId] = useState(id);
  if (id !== prevId) {
    setPrevId(id);
    setLoading(true);
  }

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading-screen">Loading Details...</div>;

  return (
    <div className="content-wrapper">
      <div className="details-wrapper">
        <button className="back-button" onClick={() => navigate(-1)}>
          <span>←</span> Back to Search
        </button>
        
        <div className="details-card">
          <img 
            src={movie.image?.original || movie.image?.medium} 
            alt={movie.name} 
            className="details-image"
          />
          
          <div className="details-info-section">
            <h1 className="details-title">{movie.name}</h1>
            
            {/* TAGS / GENRES */}
            <div className="flex gap-2 mb-4">
              {movie.genres?.map(genre => (
                <span key={genre} className="bg-blue-600/20 text-blue-400 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-blue-500/20">
                  {genre}
                </span>
              ))}
            </div>

            {/* STRUCTURED INFO GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <span className="info-label">Status</span>
                <span className="info-value text-green-400">{movie.status}</span>
              </div>
              <div>
                <span className="info-label">Rating</span>
                <span className="info-value text-yellow-500">⭐ {movie.rating?.average || "N/A"}</span>
              </div>
              <div>
                <span className="info-label">Language</span>
                <span className="info-value">{movie.language}</span>
              </div>
              <div>
                <span className="info-label">Premiered</span>
                <span className="info-value">{movie.premiered}</span>
              </div>
              <div>
                <span className="info-label">Network</span>
                <span className="info-value">{movie.network?.name || movie.webChannel?.name || "N/A"}</span>
              </div>
              <div>
                <span className="info-label">Schedule</span>
                <span className="info-value">{movie.schedule?.time} ({movie.schedule?.days?.join(", ")})</span>
              </div>
            </div>

            {/* OFFICIAL LINK */}
            {movie.officialSite && (
              <a 
                href={movie.officialSite} 
                target="_blank" 
                rel="noreferrer"
                className="mt-4 text-blue-400 hover:text-blue-300 font-bold text-sm underline"
              >
                Visit Official Website →
              </a>
            )}

            {/* SUMMARY SECTION */}
            <div className="details-summary">
              <span className="info-label mb-4">Storyline</span>
              <div dangerouslySetInnerHTML={{ __html: movie.summary }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
