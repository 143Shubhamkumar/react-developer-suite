import { useState, useEffect } from 'react'

export default function StatePlayground() {
  // Counter state & logs
  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState([]);

  // Pet simulator state
  const [pet, setPet] = useState({ name: "Fluffy", hunger: 10 });

  // Array state & custom input
  const [foods, setFoods] = useState(["Milk", "Bread"]);
  const [customFood, setCustomFood] = useState("");

  // Helper to handle counter state updates and logging together without an effect
  const handleCountChange = (updater, actionName) => {
    setCount(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      const timestamp = new Date().toLocaleTimeString();
      setLogs(l => [`[${timestamp}] ${actionName} -> Count: ${next}`, ...l.slice(0, 4)]);
      console.log("Count changed:", next);
      return next;
    });
  };

  // Initial fetch simulation (similar to App2.jsx's mount log)
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => {
        console.log("Post fetch on mount:", data.slice(0, 2));
      });
  }, []);

  // Pet emoji reaction helper
  const getPetReaction = (hunger) => {
    if (hunger <= 0) return { emoji: "💀", status: "Passed Out / Starved", color: "text-red-500" };
    if (hunger <= 4) return { emoji: "😢", status: "Extremely Hungry", color: "text-orange-500" };
    if (hunger <= 9) return { emoji: "😐", status: "Getting Peckish", color: "text-yellow-500" };
    if (hunger <= 14) return { emoji: "😊", status: "Happy & Fed", color: "text-green-400" };
    if (hunger <= 20) return { emoji: "🤤", status: "Stuffed & Sleepy", color: "text-cyan-400" };
    return { emoji: "🤢", status: "Overstuffed!", color: "text-purple-500" };
  };

  const petReaction = getPetReaction(pet.hunger);

  // Add custom food
  const handleAddCustomFood = (e) => {
    e.preventDefault();
    if (!customFood.trim()) return;
    setFoods([...foods, customFood.trim()]);
    setCustomFood("");
  };

  // Remove food item (extra interactive optimization!)
  const removeFood = (indexToRemove) => {
    setFoods(foods.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="content-wrapper py-10 animate-fade-in">
      <header className="text-center max-w-2xl mx-auto mb-12 mt-6">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">
          🧪 State Laboratory
        </h1>
        <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed">
          Interactive demonstrations of React's reactive state engine: tracking counters, updating object fields, and mutating arrays.
        </p>
      </header>

      {/* Grid of Labs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        
        {/* LAB 1: COUNTER STATE */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] bg-purple-500/10 text-purple-400 font-black uppercase tracking-widest px-3 py-1 rounded-full border border-purple-500/20">
                MODULE 01
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping"></span>
            </div>
            
            <h2 className="text-2xl font-black text-white mb-2">Counter Reactor</h2>
            <p className="text-slate-400 text-xs mb-8">Triggers re-render and updates the virtual DOM when count modifications are detected.</p>

            {/* Visual Dial */}
            <div className="relative w-36 h-36 mx-auto my-6 bg-gradient-to-tr from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.1)]">
              <div className="text-center">
                <span className="text-5xl font-black text-white block select-none">{count}</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Current Value</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex gap-3 mb-6">
              <button 
                onClick={() => handleCountChange(c => c - 1, "Decrement (-1)")}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-black text-sm p-4 rounded-2xl active:scale-95 transition-all duration-200 cursor-pointer"
              >
                -1
              </button>
              <button 
                onClick={() => handleCountChange(0, "Reset Count")}
                className="flex-1 bg-slate-950 text-slate-500 hover:text-white hover:bg-slate-900 font-black text-xs uppercase tracking-widest p-4 rounded-2xl active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Reset
              </button>
              <button 
                onClick={() => handleCountChange(c => c + 1, "Increment (+1)")}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-sm p-4 rounded-2xl active:scale-95 transition-all duration-200 shadow-lg hover:shadow-purple-500/20 cursor-pointer"
              >
                +1
              </button>
            </div>

            {/* Local log display */}
            <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800">
              <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">State Effect Stream</h4>
              <div className="space-y-1 text-[11px] font-mono text-slate-400">
                {logs.length === 0 && <span className="text-slate-600">No state logs generated yet.</span>}
                {logs.map((log, index) => (
                  <div key={index} className="truncate">{log}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* LAB 2: OBJECT STATE (PET SIMULATOR) */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] bg-pink-500/10 text-pink-400 font-black uppercase tracking-widest px-3 py-1 rounded-full border border-pink-500/20">
                MODULE 02
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping"></span>
            </div>

            <h2 className="text-2xl font-black text-white mb-2">Object Mutation</h2>
            <p className="text-slate-400 text-xs mb-8">Safeguards reactivity using the spread operator to create copy references of objects.</p>

            {/* Virtual Pet View */}
            <div className="bg-slate-950/40 rounded-3xl border border-slate-800/80 p-6 text-center my-6 relative overflow-hidden">
              <div className="text-6xl mb-4 animate-bounce duration-1000 select-none">
                {petReaction.emoji}
              </div>
              <h3 className="text-xl font-black text-white mb-1">{pet.name}</h3>
              <p className={`text-xs font-bold uppercase tracking-wider ${petReaction.color}`}>
                {petReaction.status}
              </p>

              {/* Hunger Bar Meter */}
              <div className="mt-6">
                <div className="flex justify-between text-[10px] text-slate-500 font-black uppercase tracking-wider mb-2">
                  <span>Hunger Level</span>
                  <span>{pet.hunger} / 20</span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      pet.hunger > 14 ? "bg-red-500" : pet.hunger >= 10 ? "bg-green-500" : pet.hunger >= 5 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${Math.min((pet.hunger / 20) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => setPet({ ...pet, name: pet.name === "Max" ? "Fluffy" : "Max" })}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase tracking-widest p-4 rounded-xl active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Toggle Name ({pet.name === "Max" ? "Fluffy" : "Max"})
            </button>
            <div className="flex gap-2">
              <button 
                onClick={() => setPet(prev => ({ ...prev, hunger: Math.max(prev.hunger - 1, 0) }))}
                className="flex-1 bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-900 font-bold text-xs p-3 rounded-xl active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Starve Pet (-1)
              </button>
              <button 
                onClick={() => setPet(prev => ({ ...prev, hunger: Math.min(prev.hunger + 1, 25) }))}
                className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs p-3 rounded-xl active:scale-95 transition-all duration-200 shadow-lg hover:shadow-pink-500/20 cursor-pointer"
              >
                Feed Pet (+1)
              </button>
            </div>
          </div>
        </div>

        {/* LAB 3: ARRAY STATE (FOOD CART) */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] bg-rose-500/10 text-rose-400 font-black uppercase tracking-widest px-3 py-1 rounded-full border border-rose-500/20">
                MODULE 03
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
            </div>

            <h2 className="text-2xl font-black text-white mb-2">Array Mutation</h2>
            <p className="text-slate-400 text-xs mb-6">Appends values to lists while adhering to immutable state standards.</p>

            {/* List Cart */}
            <div className="space-y-2 max-h-[170px] overflow-y-auto mb-6 pr-1 custom-scrollbar">
              {foods.map((food, index) => (
                <div 
                  key={index}
                  onClick={() => removeFood(index)}
                  className="group flex items-center justify-between p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-2xl hover:border-red-500/40 hover:bg-red-950/10 transition-all duration-300 cursor-pointer"
                  title="Click to remove from list"
                >
                  <span className="text-slate-200 text-sm font-bold">{food}</span>
                  <span className="text-slate-500 group-hover:text-red-400 text-[10px] uppercase font-black tracking-wider transition-colors">
                    Remove ✕
                  </span>
                </div>
              ))}
              {foods.length === 0 && (
                <div className="text-center py-6 text-slate-600 text-xs border border-dashed border-slate-800 rounded-2xl">
                  Food array is empty. Add cookies below!
                </div>
              )}
            </div>
          </div>

          <div>
            {/* Custom Input */}
            <form onSubmit={handleAddCustomFood} className="flex gap-2 mb-4">
              <input 
                type="text" 
                placeholder="Custom snack..." 
                className="flex-1 px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl outline-none text-xs text-white placeholder:text-slate-500 focus:border-rose-500 transition-colors"
                value={customFood}
                onChange={(e) => setCustomFood(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-slate-850 border border-slate-800 hover:bg-slate-800 text-white text-xs px-4 rounded-xl font-bold cursor-pointer"
              >
                Add
              </button>
            </form>

            <div className="flex gap-2">
              <button 
                onClick={() => setFoods([...foods, "Cookies 🍪"])}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-black text-[10px] uppercase tracking-wider py-3.5 rounded-xl transition-all duration-200 cursor-pointer"
              >
                Cookies 🍪
              </button>
              <button 
                onClick={() => setFoods([...foods, "Chocolate 🍫"])}
                className="flex-1 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-black text-[10px] uppercase tracking-wider py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-rose-500/20 cursor-pointer"
              >
                Chocolate 🍫
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
