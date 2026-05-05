import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const idFromUrl = searchParams.get('s') || '1';

  useEffect(() => {
    const savedUser = localStorage.getItem('race_user');
    const activeStation = localStorage.getItem('active_station');
    
    if (savedUser && activeStation === idFromUrl) {
      const user = JSON.parse(savedUser);
      const role = user.role?.toLowerCase().trim();
      if (role === 'mentor') navigate(`/mentor/${idFromUrl}`);
      else navigate(`/station/${idFromUrl}`);
    }
  }, [idFromUrl, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== import.meta.env.VITE_GENERIC_PASSWORD) {
      alert('קוד גישה שגוי');
      setLoading(false);
      return;
    }

    try {
      const { data: team, error } = await supabase
        .from('teams')
        .select('*')
        .eq('username', username.trim())
        .single();

      if (error || !team) {
        alert('זהות לא מזוהה במערכת');
        setLoading(false);
        return;
      }

      const userRole = team.role ? team.role.toLowerCase().trim() : 'participant';
      localStorage.setItem('race_user', JSON.stringify(team));
      localStorage.setItem('active_station', idFromUrl);

      // לוגיקת הניתוב המעודכנת (כולל ה"גרזן" לאביה ליתר ביטחון)
      if (userRole === 'mentor' || team.username.trim() === 'אביה') {
        navigate(`/mentor/${idFromUrl}`);
      } else {
        navigate(`/station/${idFromUrl}`);
      }

    } catch (err) {
      alert('שגיאת תקשורת');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6" dir="rtl">
      
      {/* לוגו ואפקט עליון */}
      <div className="mb-12 text-center relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-600/20 blur-[60px] rounded-full"></div>
        <div className="text-5xl mb-4 filter drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">🎭</div>
        <h1 className="text-white text-5xl font-black italic tracking-tighter uppercase leading-none">
          THE <span className="text-red-600">RACE</span>
        </h1>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="h-[1px] w-8 bg-red-900"></span>
          <span className="text-red-600 font-mono text-[10px] tracking-[0.3em] uppercase">Authorized_Only</span>
          <span className="h-[1px] w-8 bg-red-900"></span>
        </div>
      </div>

      {/* טופס הלוגין */}
      <form 
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-zinc-900/40 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden"
      >
        {/* קו דקורטיבי עליון */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>

        <div className="space-y-6">
          <div>
            <label className="block text-zinc-500 text-[9px] font-bold mb-2 uppercase tracking-widest mr-2">Agent_Identity</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/50 border border-zinc-800 text-white p-4 rounded-2xl focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all font-bold text-center placeholder:text-zinc-700"
              placeholder="שם משתמש"
              required
            />
          </div>

          <div>
            <label className="block text-zinc-500 text-[9px] font-bold mb-2 uppercase tracking-widest mr-2">Access_Key</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-zinc-800 text-white p-4 rounded-2xl focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all font-bold text-center placeholder:text-zinc-700"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-2xl ${
              loading 
              ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' 
              : 'bg-red-600 hover:bg-red-500 text-white active:scale-[0.98] shadow-red-900/20'
            }`}
          >
            {loading ? 'מבצע אימות...' : 'התחברות למערכת'}
          </button>
        </div>
      </form>

      {/* פוטר טכני */}
      <div className="mt-16 flex flex-col items-center gap-2 opacity-30">
        <div className="text-zinc-500 text-[8px] font-mono uppercase tracking-[0.5em]">Station_Node: {idFromUrl}</div>
        <div className="text-zinc-600 text-[7px] font-mono italic">Encryption_AES_256_Active</div>
      </div>

    </div>
  );
};

export default Login;