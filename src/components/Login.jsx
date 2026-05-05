import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // חילוץ מספר התחנה מה-URL
  const idFromUrl = searchParams.get('s') || '1';

  useEffect(() => {
    // בדיקה אם המשתמש כבר מחובר לאותה תחנה
    const savedUser = localStorage.getItem('race_user');
    const activeStation = localStorage.getItem('active_station');
    
    if (savedUser && activeStation === idFromUrl) {
      const user = JSON.parse(savedUser);
      const role = user.role?.toLowerCase().trim();
      
      if (role === 'mentor') {
        navigate(`/mentor/${idFromUrl}`);
      } else {
        navigate(`/station/${idFromUrl}`);
      }
    }
  }, [idFromUrl, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. בדיקת סיסמה כללית מול ה-ENV
    if (password !== import.meta.env.VITE_GENERIC_PASSWORD) {
      alert('קוד גישה שגוי');
      setLoading(false);
      return;
    }

    try {
      // 2. שליפת המשתמש מ-Supabase
      const { data: team, error } = await supabase
        .from('teams')
        .select('*')
        .eq('username', username.trim())
        .single();

      if (error || !team) {
        alert('משתמש לא נמצא במערכת');
        setLoading(false);
        return;
      }

      // 3. עיבוד ה-Role (הפיכה לאותיות קטנות וניקוי רווחים)
      const userRole = team.role ? team.role.toLowerCase().trim() : 'participant';
      
      // 4. שמירה ב-LocalStorage
      localStorage.setItem('race_user', JSON.stringify(team));
      localStorage.setItem('active_station', idFromUrl);

      // 5. ניתוב חכם (לפי ה-Role ב-Database)
      console.log(`User ${team.username} logged in with role: ${userRole}`);

      if (userRole === 'mentor') {
        navigate(`/mentor/${idFromUrl}`);
      } else {
        navigate(`/station/${idFromUrl}`);
      }

    } catch (err) {
      console.error('Login Error:', err);
      alert('שגיאת מערכת, נסה שנית');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 text-right" dir="rtl">
      
      <div className="mb-10 text-center">
        <div className="text-red-600 text-5xl mb-3">🎭</div>
        <h1 className="text-white text-4xl font-black italic uppercase">
          מבצע <span className="text-red-600">המירוץ</span>
        </h1>
        <p className="text-zinc-500 text-xs mt-2 font-mono tracking-widest">
          SYSTEM_ACCESS // STATION_{idFromUrl}
        </p>
      </div>

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
            className="w-full bg-black border border-zinc-800 text-white p-4 rounded-2xl focus:outline-none focus:border-red-600 transition-all font-bold text-center"
            placeholder="הכנס שם..."
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
            className="w-full bg-black border border-zinc-800 text-white p-4 rounded-2xl focus:outline-none focus:border-red-600 transition-all font-bold text-center"
            placeholder="••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-black uppercase transition-all shadow-lg shadow-red-900/30 ${
            loading 
            ? 'bg-zinc-800 text-zinc-600' 
            : 'bg-red-600 hover:bg-red-700 text-white active:scale-95'
          }`}
        >
          {loading ? 'מתחבר...' : 'כניסה למערכת'}
        </button>
      </form>

      <div className="mt-12 opacity-20 flex flex-col items-center">
        <div className="h-px w-24 bg-zinc-800 mb-2"></div>
        <p className="text-zinc-500 text-[8px] font-mono uppercase tracking-[0.4em]">
          Secure_Channel_Active_v3
        </p>
      </div>
    </div>
  );
};

export default Login;