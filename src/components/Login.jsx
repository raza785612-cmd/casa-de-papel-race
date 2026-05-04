import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // וודא שהנתיב לקוח מהקובץ שלך
import './Login.css'; // נשתמש בזה לעיצוב, או שתוסיף ל-index.css

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // חילוץ מספר התחנה מהכתובת (למשל ?s=1)
  const queryParams = new URLSearchParams(location.search);
  const stationId = queryParams.get('s') || '1'; 

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. בדיקת סיסמה גנרית מה-Environment Variables
      const genericPassword = import.meta.env.VITE_GENERIC_PASSWORD;
      
      if (password !== genericPassword) {
        throw new Error('קוד גישה שגוי');
      }

      // 2. בדיקה אם הצוות קיים ב-Supabase
      const { data: team, error: authError } = await supabase
        .from('teams')
        .select('*')
        .eq('username', username)
        .single();

      if (authError || !team) {
        throw new Error('שם צוות לא נמצא');
      }

      // 3. שמירת פרטי הצוות בדפדפן (כדי שלא יצטרכו לוגין שוב)
      localStorage.setItem('race_user', JSON.stringify(team));

      // 4. ניווט לתחנה הרלוונטית - אותיות קטנות ולוכסן בהתחלה!
      navigate(`/station/${stationId}`);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="mask-icon">🎭</div>
        <h1>CASA DE PAPEL</h1>
        <h2>מרוץ התחנות</h2>
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="שם הצוות"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              placeholder="קוד גישה (סיסמה)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'מתחבר...' : 'התחל משימה'}
          </button>
        </form>
        
        <p className="station-indicator">תחנה נוכחית: {stationId}</p>
      </div>
    </div>
  );
};

export default Login;