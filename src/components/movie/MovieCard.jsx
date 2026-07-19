import { Link } from 'react-router-dom'

export function MovieCard({ id, title, year, image, language, rating, genres }) {
  return (
    <div className="group relative bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden hover:border-blue-500/50 hover:shadow-[0_20px_50px_rgba(30,58,138,0.3)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">
      {/* Image Container with overlay */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {genres && genres.slice(0, 2).map((genre) => (
              <span key={genre} className="bg-blue-600 text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full">
                {genre}
              </span>
            ))}
          </div>
          <Link 
            to={`/movie/${id}`} 
            className="w-full text-center bg-blue-600 hover:bg-blue-500 text-white text-xs font-black py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
          >
            VIEW DETAILS
          </Link>
        </div>
        {/* Rating Badge */}
        {rating && (
          <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-xl text-yellow-500 font-bold text-xs flex items-center gap-1">
            ⭐ {rating}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-transparent to-slate-950/40">
        <Link 
          to={`/movie/${id}`} 
          className="text-lg font-black text-white hover:text-blue-400 line-clamp-1 mb-2 transition-colors"
        >
          {title}
        </Link>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/60 text-xs text-slate-400 font-medium">
          <span>📅 {year?.split("-")[0] || "N/A"}</span>
          <span className="bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-wider">
            {language || "English"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default MovieCard;
