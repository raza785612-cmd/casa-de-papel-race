import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // חילוץ מספר התחנה או ברירת מחדל לתחנה 1
  const idFromUrl = searchParams.get('s') || '1';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // 1. בדיקת סיסמה (מוודא שהיא תואמת למה שהגדרת ב-Vite)
    if (password !== import.meta.env.VITE_GENERIC_PASSWORD) {
      alert('קוד גישה שגוי');
      setLoading(false);
      return;
    }

    try {
      // 2. חיפוש הצוות ב-Database
      const { data: team, error } = await supabase
        .from('teams')
        .select('*')
        .eq('username', username.trim())
        .single();

      if (error || !team) {
        alert('סוכן לא מזוהה. בדוק את שם הצוות ונסה שנית.');
        setLoading(false);
        return;
      }

      // 3. שמירת נתונים מקומית
      localStorage.setItem('race_user', JSON.stringify(team));
      localStorage.setItem('active_station', idFromUrl);

      // 4. ניתוב לפי תפקיד
      const role = (team.role || '').toLowerCase().trim();
      if (role === 'mentor' || team.username === 'אביה') {
        navigate(`/mentor/${idFromUrl}`);
      } else {
        navigate(`/station/${idFromUrl}`);
      }
    } catch (err) {
      console.error(err);
      alert('תקלת תקשורת עם השרת');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="app-container">
        <div className="card">
          <div style={{ fontSize: '4.5rem', marginBottom: '15px' }}>🎭</div>
          <h1>THE <span className="red-text">RACE</span></h1>
          <p style={{ color: '#64748b', fontSize: '10px', letterSpacing: '3px', marginBottom: '35px', fontWeight: 'bold' }}>
            CLASSIFIED SYSTEM ACCESS
          </p>
          
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '15px' }}>
              <input 
                type="text" 
                placeholder="כינוי" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
            </div>

            <div style={{ marginBottom: '5px' }}>
              <input 
                type="password" 
                placeholder="קוד גישה" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            
            {/* הרמז שביקשת */}
            <p style={{ 
              color: '#475569', 
              fontSize: '11px', 
              fontStyle: 'italic', 
              textAlign: 'right', 
              margin: '0 5px 20px 0' 
            }}>
              * רמז: הקוד נמצא על גב תג השם שלך
            </p>

            <button type="submit" disabled={loading}>
              {loading ? 'מאמת נתונים...' : 'כניסה למערכת'}
            </button>
          </form>

          <div style={{ marginTop: '25px', opacity: 0.2 }}>
            <p style={{ fontSize: '9px', fontMono: 'true' }}>STATION_OPE_ID: {idFromUrl}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;