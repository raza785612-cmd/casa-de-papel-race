import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // חילוץ מספר התחנה מה-URL (למשל: login?s=2)
  // אם אין מספר ב-URL, ברירת המחדל היא תחנה 1
  const idFromUrl = searchParams.get('s') || '1';

  useEffect(() => {
    // בדיקה אם המשתמש כבר מחובר לאותה תחנה - אם כן, דלג על הלוגין
    const savedUser = localStorage.getItem('race_user');
    const activeStation = localStorage.getItem('active_station');
    
    if (savedUser && activeStation === idFromUrl) {
      const user = JSON.parse(savedUser);
      if (user.role === 'mentor') {
        navigate(`/mentor/${idFromUrl}`);
      } else {
        navigate(`/station/${idFromUrl}`);
      }
    }
  }, [idFromUrl, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. אימות סיסמה כללית מול הקובץ .env
    if (password !== import.meta.env.VITE_GENERIC_PASSWORD) {
      alert('סיסמה שגויה');
      setLoading(false);
      return;
    }

    try {
      // 2. שליפת נתוני המשתמש מ-Supabase
      const { data: team, error } = await supabase
        .from('teams')
        .select('*')
        .eq('username', username.trim())
        .single();

      if (error || !team) {
        alert('שם משתמש לא קיים במערכת');
        setLoading(false);
        return;
      }

      // 3. שמירת נתוני ההתחברות בזיכרון המקומי (LocalStorage)
      // אנחנו שומרים גם את ה-role וגם את התחנה שסרקו עכשיו
      localStorage.setItem('race_user', JSON.stringify(team));
      localStorage.setItem('active_station', idFromUrl);

      // 4. ניתוב לדף המתאים לפי התפקיד ב-DB
      if (team.role === 'mentor') {
        navigate(`/mentor/${idFromUrl}`);
      } else {
        navigate(`/station/${idFromUrl}`);
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('שגיאת התחברות');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 text-right" dir="rtl">
      
      {/* לוגו / כותרת */}
      <div className="mb-10 text-center">
        <div className="text-red-600 text-5xl mb-3 animate-bounce">🎭</div>
        <h1 className="text-white text-4xl font-black italic tracking-tighter uppercase">
          מבצע <span className="text-red-600">המירוץ</span>
        </h1>
        <p className="text-zinc-500 text-xs mt-2 font-mono tracking-widest uppercase">
          Authorization Required // Station {idFromUrl}
        </p>
      </div>

      {/* טופס התחברות */}
      <form 
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-zinc-900 p-8 rounded-3xl shadow-2xl border border-zinc-800 space-y-5"
      >
        <div>
          <label className="block text-zinc-500 text-[10px] font-bold mb-1 uppercase mr-1">
            זהות סוכן / חונך
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-black border border-zinc-800 text-white p-4 rounded-2xl focus:outline-none focus:border-red-600 transition-all placeholder-zinc-700 font-bold text-center"
            placeholder="שם משתמש"
            required
          />
        </div>

        <div>
          <label className="block text-zinc-500 text-[10px] font-bold mb-1 uppercase mr-1">
            קוד סודי
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-zinc-800 text-white p-4 rounded-2xl focus:outline-none focus:border-red-600 transition-all placeholder-zinc-700 font-bold text-center"
            placeholder="••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all ${
            loading 
            ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' 
            : 'bg-red-600 hover:bg-red-700 text-white active:scale-95 shadow-lg shadow-red-900/30'
          }`}
        >
          {loading ? 'מאמת נתונים...' : 'כניסה למערכת'}
        </button>
      </form>

      {/* פוטר אבטחה */}
      <div className="mt-10 flex flex-col items-center space-y-1">
        <div className="h-px w-12 bg-zinc-800"></div>
        <p className="text-zinc-700 text-[9px] font-mono uppercase tracking-[0.2em]">
          Classified Information - Level 4 Clearance
        </p>
      </div>
    </div>
  );
};

export default Login;