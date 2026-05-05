import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const idFromUrl = searchParams.get('s') || '1';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== import.meta.env.VITE_GENERIC_PASSWORD) {
      alert('קוד גישה שגוי');
      setLoading(false);
      return;
    }

    const { data: team, error } = await supabase.from('teams').select('*').eq('username', username.trim()).single();

    if (error || !team) {
      alert('משתמש לא נמצא');
      setLoading(false);
      return;
    }

    const userRole = team.role?.toLowerCase().trim();
    localStorage.setItem('race_user', JSON.stringify(team));
    localStorage.setItem('active_station', idFromUrl);

    if (userRole === 'mentor' || team.username === 'אביה') {
      navigate(`/mentor/${idFromUrl}`);
    } else {
      navigate(`/station/${idFromUrl}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-right" dir="rtl">
      <div className="mb-10 text-center">
        <div className="text-red-600 text-5xl mb-3 animate-pulse">🎭</div>
        <h1 className="text-white text-4xl font-black italic uppercase">מבצע <span className="text-red-600 text-shadow-glow">המירוץ</span></h1>
        <p className="text-slate-500 text-[10px] mt-2 font-mono tracking-widest uppercase">Authorized_Personnel_Only</p>
      </div>

      <form onSubmit={handleLogin} className="w-full max-w-sm bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-800 space-y-5">
        <div>
          <label className="block text-slate-500 text-[10px] font-bold mb-1 uppercase mr-1">זהות סוכן</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-2xl focus:outline-none focus:border-red-600 transition-all font-bold text-center" placeholder="הכנס שם..." required />
        </div>

        <div>
          <label className="block text-slate-500 text-[10px] font-bold mb-1 uppercase mr-1">קוד גישה</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-800 text-white p-4 rounded-2xl focus:outline-none focus:border-red-600 transition-all font-bold text-center" placeholder="••••••" required />
        </div>

        <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl font-black uppercase transition-all bg-red-600 hover:bg-red-700 text-white active:scale-95 shadow-lg shadow-red-900/20">{loading ? 'מאמת...' : 'כניסה למערכת'}</button>
      </form>
    </div>
  );
};

export default Login;