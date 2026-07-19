import { useState, useEffect } from 'react'
import MovieCard from '../components/movie/MovieCard'

export default function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchMovies = () => {
    if (query.length < 2) return;
    
    setLoading(true);
    setError(null);
    fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch show data.");
        return res.json();
      })
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Something went wrong while loading movies. Please try again.");
        setLoading(false);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    searchMovies();
  };

  useEffect(() => {
    // Fetch a default search query on mount so the page isn't empty and boring
    fetch(`https://api.tvmaze.com/search/shows?q=Batman`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch show data.");
        return res.json();
      })
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Something went wrong while loading movies. Please try again.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="content-wrapper py-10 animate-fade-in">
      <header className="text-center max-w-2xl mx-auto mb-12 mt-6">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
          🎬 Show Finder
        </h1>
        <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed">
          Explore tv shows, details, cast information, and schedules from the TVMaze directory.
        </p>
      </header>

      {/* Search Bar Container */}
      <form onSubmit={handleFormSubmit} className="max-w-xl mx-auto mb-16 px-4">
        <div className="relative flex items-center bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-500 shadow-2xl">
          <span className="pl-4 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
            </svg>
          </span>
          <input 
            type="text" 
            placeholder="Search TV shows (e.g. Sherlock, Friends, Dark...)"
            className="flex-1 p-4 bg-transparent outline-none text-white text-base md:text-lg placeholder:text-slate-500 font-medium"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white font-black px-6 py-4 text-xs md:text-sm tracking-widest uppercase hover:bg-blue-500 active:scale-95 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer"
          >
            Search
          </button>
        </div>
      </form>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-blue-500 text-xs font-black uppercase tracking-[0.3em] animate-pulse">Searching the archives...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl max-w-xl mx-auto text-center font-bold mb-10 shadow-lg">
          ⚠️ {error}
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <div className="text-center py-20 bg-slate-900/20 border border-slate-800/40 rounded-3xl p-10 max-w-md mx-auto">
          <p className="text-slate-400 text-lg font-bold mb-2">No Results Found</p>
          <p className="text-slate-500 text-sm">We couldn't find any TV shows matching "{query}". Try searching for something else!</p>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {movies.map((item) => (
            <MovieCard 
              key={item.show.id}
              id={item.show.id}
              title={item.show.name} 
              year={item.show.premiered}
              language={item.show.language}
              rating={item.show.rating?.average}
              genres={item.show.genres}
              image={item.show.image?.medium || "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=350&auto=format&fit=crop"}
            />
          ))}
        </div>
      )}
    </div>
  )
}
