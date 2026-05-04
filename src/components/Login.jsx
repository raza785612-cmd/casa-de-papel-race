import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (password !== import.meta.env.VITE_GENERIC_PASSWORD) {
        throw new Error('קוד גישה שגוי');
      }

      const { data: team, error: sbError } = await supabase
        .from('teams')
        .select('*')
        .eq('username', username.trim())
        .maybeSingle();

      if (sbError || !team) throw new Error('הסוכן לא נמצא במערכת');

      localStorage.setItem('race_user', team.username);
      
      // בדיקה אם הגיעו מ-QR ספציפי (למשל station=3)
      const stationFromUrl = searchParams.get('s');
      if (stationFromUrl) {
        navigate(`/station/${stationFromUrl}`);
      } else {
        navigate('/station/1'); // ברירת מחדל
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 font-sans">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black -z-10"></div>
      
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-block px-3 py-1 border border-red-600 text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-4 animate-pulse">
            System Online
          </div>
          <h1 className="text-5xl font-black tracking-tighter mb-2">
            CASA DE <span className="text-red-600 shadow-red-500">PAPEL</span>
          </h1>
          <div className="h-1 w-20 bg-red-600 mx-auto"></div>
        </div>

        {/* Login Card */}
        <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-8 rounded-2xl shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mr-1">Agent Identity</label>
              <input
                type="text"
                placeholder="שם משתמש"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/50 border border-zinc-700 p-4 rounded-xl focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-zinc-700"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mr-1">Access Code</label>
              <input
                type="password"
                placeholder="קוד סודי"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-zinc-700 p-4 rounded-xl focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-zinc-700"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center font-bold bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                {error}
              </div>
            )}

            <button
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl shadow-lg shadow-red-900/20 transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              {isLoading ? 'מתחבר לשרת...' : 'כניסה למערכת'}
            </button>
          </form>
        </div>

        {/* Footer Hint */}
        <p className="mt-12 text-center text-zinc-600 text-sm italic">
          "דיזינגוף דיזינגוף הירקון בן יהודה"
        </p>
      </div>
    </div>
  );
};

export default Login;