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

  try {
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

    // שמירה ב-LocalStorage
    localStorage.setItem('race_user', JSON.stringify(team));
    localStorage.setItem('active_station', idFromUrl);

    // ניתוב חכם: בודק אם זה מנטור, כל השאר הם משתתפים
    const role = (team.role || '').toLowerCase().trim();
    if (role === 'mentor') {
      navigate(`/mentor/${idFromUrl}`);
    } else {
      navigate(`/station/${idFromUrl}`);
    }
  } catch (err) {
    alert('שגיאת חיבור');
  } finally {
    setLoading(false);
  }
};

  return (
  <div className="login-page">
    <div className="app-container">
      <div className="card">
        <div style={{ fontSize: '4rem', marginBottom: '10px' }}>🎭</div>
        <h1>THE <span style={{ color: 'white' }}>RACE</span></h1>
        <p style={{ color: '#64748b', fontSize: '10px', letterSpacing: '2px', marginBottom: '30px' }}>AUTHORIZED PERSONNEL ONLY</p>
        
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="שם סוכן" 
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
          <button type="submit">
            {loading ? 'מאמת זהות...' : 'כניסה למערכת'}
          </button>
        </form>
      </div>
    </div>
  </div>
);
};

export default Login;