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
    const { data: team } = await supabase.from('teams').select('*').eq('username', username.trim()).single();
    if (!team) {
      alert('משתמש לא נמצא');
      setLoading(false);
      return;
    }
    localStorage.setItem('race_user', JSON.stringify(team));
    localStorage.setItem('active_station', idFromUrl);
    
    if (team.role?.toLowerCase().trim() === 'mentor' || team.username === 'אביה') {
      navigate(`/mentor/${idFromUrl}`);
    } else {
      navigate(`/station/${idFromUrl}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-6" dir="rtl">
      <div className="w-full max-w-[360px] mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">🎭</div>
          <h1 className="text-white text-4xl font-black italic tracking-tighter uppercase">
            THE <span className="text-red-600">RACE</span>
          </h1>
          <p className="text-slate-500 text-[10px] mt-2 font-mono tracking-[0.3em] uppercase">Authorized_Personnel_Only</p>
        </div>

        <form onSubmit={handleLogin} className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl space-y-5">
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="w-full bg-black/40 border border-slate-800 text-white p-4 rounded-2xl focus:border-red-600 outline-none text-center font-bold placeholder:text-slate-700" 
            placeholder="שם משתמש" 
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full bg-black/40 border border-slate-800 text-white p-4 rounded-2xl focus:border-red-600 outline-none text-center font-bold placeholder:text-slate-700" 
            placeholder="קוד גישה" 
          />
          <button className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black uppercase shadow-lg shadow-red-900/40 active:scale-95 transition-all italic tracking-widest">
            {loading ? 'מבצע אימות...' : 'כניסה למערכת'}
          </button>
        </form>
        
        <div className="mt-8 text-center opacity-20">
          <p className="text-slate-500 text-[8px] font-mono tracking-widest uppercase">Node_ID: {idFromUrl}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;