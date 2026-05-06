import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    const user = username.trim();
    const pass = password.trim();

    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .ilike('username', user)
      .eq('login_password', pass)
      .maybeSingle();

    if (data) {
      localStorage.setItem('race_user', JSON.stringify(data));
      navigate('/station/1');
    } else {
      alert("פרטי גישה שגויים. המערכת ננעלה.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden" dir="rtl">
      {/* רקע דקורטיבי עדין */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black"></div>

      <div className="relative w-full max-w-md">
        {/* כרטיס הלוגין */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-[0_0_50px_-12px_rgba(220,38,38,0.3)]">
          
          {/* אמוג'י המסיכה והכותרת */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)] animate-pulse">
              👺
            </div>
            <h1 className="text-white text-3xl font-black tracking-tighter italic">
              CASA DE PAPEL
            </h1>
            <p className="text-red-600 text-xs font-bold tracking-[0.3em] mt-2 uppercase">
              The Amazing Race
            </p>
          </div>

          <div className="space-y-6">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="זהות הצוות" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 bg-black/50 border border-slate-700 rounded-2xl text-white text-center focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all group-hover:border-slate-500"
              />
            </div>

            <div className="relative group">
              <input 
                type="password" 
                placeholder="קוד כניסה" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-black/50 border border-slate-700 rounded-2xl text-white text-center focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all group-hover:border-slate-500"
              />
            </div>

            <button 
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-black text-xl shadow-[0_4px_20px_-5px_rgba(220,38,38,0.5)] active:scale-[0.98] transition-all flex justify-center items-center gap-2 ${isLoading ? 'opacity-50' : ''}`}
            >
              {isLoading ? 'מתחבר למערכת...' : 'התחל מבצע'}
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-slate-800"></span>
            <p className="text-slate-500 text-[10px] uppercase tracking-widest font-mono">
              Secure Connection Established
            </p>
            <span className="h-px w-8 bg-slate-800"></span>
          </div>
        </div>

        {/* אפקט דקורטיבי תחתון */}
        <div className="absolute -bottom-2 -left-2 -right-2 h-20 bg-red-600/10 blur-3xl -z-10"></div>
      </div>
    </div>
  );
};

export default Login;