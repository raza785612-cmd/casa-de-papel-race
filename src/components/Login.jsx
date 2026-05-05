import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // --- כאן התיקון הקריטי! מחלצים את הפרמטר מה-URL ---
  // אם נכנסת לכתובת /login?s=3 המשתנה id יהיה 3
  const queryParams = new URLSearchParams(location.search);
  const idFromUrl = queryParams.get('s') || '1'; 

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. בדיקת סיסמה גנרית
      const genericPassword = import.meta.env.VITE_GENERIC_PASSWORD;
      if (password !== genericPassword) {
        throw new Error('קוד גישה שגוי');
      }

      // 2. בדיקה מול סופהבייס
      // הוספתי .trim() כדי למנוע טעויות של רווחים מהמקלדת בטלפון
      const { data: team, error: authError } = await supabase
        .from('teams')
        .select('*')
        .eq('username', username.trim()) 
        .single();

      // Debug: זה ידפיס לך בדפדפן (F12) מה הבעיה האמיתית
      if (authError) {
        console.error("Supabase Error Object:", authError);
      }

      if (!team) {
        throw new Error('לא נמצא כינוי - וודאו שהשם מדויק');
      }

      // 3. שמירה בלוקאל סטורג'
      localStorage.setItem('race_user', JSON.stringify(team));

      // 4. ניווט
      navigate(`/station/${idFromUrl}`);

    } catch (err) {
      // כאן אנחנו מציגים את השגיאה המדויקת למשתמש
      setError(err.message);
    } finally {
      setLoading(false);
    }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="mask-icon">🎭</div>
        <h1>CASA DE PAPEL</h1>
        <p className="subtitle">THE RACE</p>
        
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="שם הצוות"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          
          <input
            type="password"
            placeholder="קוד גישה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* הרמז שביקשת */}
          <p className="password-hint">
            רמז: "דיזינגוף דיזינגוף הירקון בן יהודה"
          </p>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'מתחבר...' : 'התחל פריצה'}
          </button>
        </form>
        
        <div className="station-badge">מתחבר לתחנה {idFromUrl}</div>
      </div>
    </div>
  );
};

export default Login;