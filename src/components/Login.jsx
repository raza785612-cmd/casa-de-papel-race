import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('username', username.trim())
        .eq('login_password', password.trim());

      if (error) {
        console.error("שגיאה:", error.message);
        alert("שגיאת מערכת: " + error.message);
      } else if (!data || data.length === 0) {
        alert("כינוי או סיסמה שגויים");
      } else {
        const user = data[0];
        localStorage.setItem('race_user', JSON.stringify(user));
        navigate('/station/1');
      }
    } catch (err) {
      alert("משהו השתבש בחיבור");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: '#020617', display: 'flex', justifyContent: 'center', 
      alignItems: 'center', overflowY: 'auto', zIndex: 100
    }} dir="rtl">
      
      <div style={{ width: '100%', maxWidth: '380px', padding: '20px' }}>
        <div style={{
          backgroundColor: '#0f172a', borderRadius: '2.5rem', padding: '40px 30px',
          border: '1px solid #1e293b', textAlign: 'center'
        }}>
          <div style={{ fontSize: '50px', marginBottom: '10px' }}>🏎️</div>
          <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'white', marginBottom: '5px', fontStyle: 'italic' }}>
            THE AMAZING <span style={{ color: '#dc2626' }}>RACE</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '30px' }}>מערכת זיהוי</p>

          <div style={{ marginBottom: '20px' }}>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="כינוי"
              style={{
                width: '100%', background: '#020617', border: '1px solid #334155',
                color: 'white', padding: '16px', borderRadius: '1rem', textAlign: 'center', boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="סיסמה"
              style={{
                width: '100%', background: '#020617', border: '1px solid #334155',
                color: 'white', padding: '16px', borderRadius: '1rem', textAlign: 'center', boxSizing: 'border-box'
              }}
            />
          </div>

          <button 
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: '100%', backgroundColor: loading ? '#444' : '#dc2626', color: 'white', 
              padding: '18px', borderRadius: '1rem', border: 'none', 
              fontSize: '18px', fontWeight: '900', cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? "מתחבר..." : "START MISSION ⚡"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;