import { useState, useEffect } from "react";

export default function PostsViewer() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Custom states for local additions (Simulation)
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Detailed Modal for viewing individual posts
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => {
        if (!res.ok) throw new Error("Could not fetch database records.");
        return res.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Compute filtered posts dynamically on render instead of keeping separate state
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Simulate local post creation
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim()) return;

    const newPost = {
      id: Date.now(), // Unique ID
      title: newTitle,
      body: newBody,
      userId: 1,
      isLocal: true // tag it so we can show it differently!
    };

    // Add to top of lists
    setPosts(prev => [newPost, ...prev]);
    setNewTitle("");
    setNewBody("");
    setFormOpen(false);
    
    setSuccessMsg("Post simulated successfully! Added to the top.");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  // Helper to generate custom colored avatar based on name/id
  const getAvatarStyle = (id) => {
    const gradients = [
      "from-pink-500 to-rose-500",
      "from-purple-500 to-indigo-500",
      "from-blue-500 to-cyan-500",
      "from-teal-500 to-emerald-500",
      "from-amber-500 to-orange-500",
    ];
    return gradients[id % gradients.length];
  };

  return (
    <div className="content-wrapper py-10 animate-fade-in">
      <header className="text-center max-w-2xl mx-auto mb-12 mt-6">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400">
          📄 Posts Board
        </h1>
        <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed">
          A dynamic forum explorer fetching live posts from the JSONPlaceholder API, featuring search filtering and local post simulation.
        </p>
      </header>

      {/* Action panel: Search & Add Post Button */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center max-w-4xl mx-auto mb-10 px-4">
        {/* Search Input */}
        <div className="relative flex items-center bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-500/10 transition-all duration-300 w-full sm:max-w-md shadow-lg">
          <span className="pl-4 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
            </svg>
          </span>
          <input 
            type="text" 
            placeholder="Search posts by title or content..."
            className="w-full p-4 bg-transparent outline-none text-white text-sm placeholder:text-slate-500 font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Trigger Button */}
        <button 
          onClick={() => setFormOpen(!formOpen)}
          className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-black text-xs uppercase tracking-widest px-6 py-4 rounded-2xl shadow-lg hover:shadow-teal-500/20 active:scale-95 transition-all duration-300 w-full sm:w-auto justify-center cursor-pointer"
        >
          <span>{formOpen ? "Close Panel" : "➕ Simulated New Post"}</span>
        </button>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl max-w-4xl mx-auto text-center font-bold mb-6 animate-pulse shadow-md">
          🎉 {successMsg}
        </div>
      )}

      {/* Simulation Form Panel */}
      {formOpen && (
        <div className="bg-slate-900/40 border border-slate-800 backdrop-blur-xl p-6 sm:p-8 rounded-3xl max-w-xl mx-auto mb-10 shadow-2xl animate-fade-in">
          <h3 className="text-xl font-black text-white mb-4">Simulate New Post</h3>
          <p className="text-slate-400 text-xs mb-6">Create a post locally. It will appear at the top of the feed.</p>
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div>
              <label className="block text-slate-500 text-[10px] font-black uppercase tracking-wider mb-2">Post Title</label>
              <input 
                type="text" 
                placeholder="e.g. Learning React Router v7" 
                className="w-full p-4 bg-slate-950/60 border border-slate-800 rounded-xl outline-none text-white text-sm focus:border-teal-500 transition-colors"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-slate-500 text-[10px] font-black uppercase tracking-wider mb-2">Post Content</label>
              <textarea 
                placeholder="Write your simulated post thoughts here..." 
                rows="4"
                className="w-full p-4 bg-slate-950/60 border border-slate-800 rounded-xl outline-none text-white text-sm focus:border-teal-500 transition-colors resize-none"
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all duration-300 cursor-pointer"
            >
              Add Simulated Post
            </button>
          </form>
        </div>
      )}

      {/* Main UI States */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-12 h-12 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></div>
          <p className="text-teal-500 text-xs font-black uppercase tracking-[0.3em] animate-pulse">Loading posts directory...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl max-w-xl mx-auto text-center font-bold mb-10 shadow-lg">
          ⚠️ Error loading posts: {error}
        </div>
      )}

      {!loading && !error && filteredPosts.length === 0 && (
        <div className="text-center py-20 bg-slate-900/20 border border-slate-800/40 rounded-3xl p-10 max-w-md mx-auto">
          <p className="text-slate-400 text-lg font-bold mb-2">No Posts Found</p>
          <p className="text-slate-500 text-sm">We couldn't find any posts matching "{searchTerm}". Try another query!</p>
        </div>
      )}

      {!loading && !error && filteredPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto px-4">
          {filteredPosts.map((post) => (
            <div 
              key={post.id} 
              className={`group flex flex-col p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 ${
                post.isLocal 
                  ? "bg-teal-950/20 border-teal-500/40 hover:border-teal-500 shadow-[0_10px_30px_rgba(20,184,166,0.1)]" 
                  : "bg-slate-900/40 border-slate-800/60 hover:border-slate-700/80 hover:bg-slate-900/60"
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                {/* Custom circular avatar */}
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarStyle(post.userId || 1)} flex items-center justify-center text-white font-black text-sm uppercase shadow-md`}>
                  {(post.isLocal ? "ME" : `U${post.userId}`)}
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">
                    {post.isLocal ? "⚡ SIMULATED CLIENT POST" : `👤 USER AUTHOR ${post.userId}`}
                  </h4>
                  <p className="text-[10px] text-slate-600">ID: {post.id}</p>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white line-clamp-1 mb-2 group-hover:text-teal-400 transition-colors">
                {post.title}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
                {post.body}
              </p>

              <button 
                onClick={() => setSelectedPost(post)}
                className="text-teal-400 hover:text-teal-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 mt-auto pt-4 border-t border-slate-800/50 w-fit cursor-pointer transition-colors"
              >
                <span>Read Full Article</span>
                <span>→</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Selected Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 max-w-2xl w-full rounded-[2rem] p-8 md:p-10 shadow-2xl relative animate-scale-up">
            <button 
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarStyle(selectedPost.userId || 1)} flex items-center justify-center text-white font-black text-base shadow-md`}>
                {selectedPost.isLocal ? "ME" : `U${selectedPost.userId}`}
              </div>
              <div>
                <span className="bg-slate-800 text-slate-400 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full border border-slate-700">
                  {selectedPost.isLocal ? "Simulated Post" : `Author ID: ${selectedPost.userId}`}
                </span>
                <h4 className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-widest">Post Entry #{selectedPost.id}</h4>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-snug">
              {selectedPost.title}
            </h2>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6 font-medium">
              {selectedPost.body}
            </p>

            <div className="flex justify-end border-t border-slate-800/60 pt-6">
              <button 
                onClick={() => setSelectedPost(null)}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-colors cursor-pointer"
              >
                Close Modal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
