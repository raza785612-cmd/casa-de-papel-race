import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USERS } from '../missionsData';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = USERS.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('race_user', JSON.stringify(user));
      navigate('/station/1');
    } else {
      alert("שם צוות או סיסמה שגויים");
    }
  };

  return (
    /* עטיפה שחוסמת את ה-Flex של ה-Body ויוצרת רקע נקי */
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: '#020617', display: 'flex', justifyContent: 'center', 
      alignItems: 'center', overflowY: 'auto', zIndex: 100
    }} dir="rtl">
      
      {/* הקונטיינר של ה"טלפון" */}
      <div style={{
        width: '100%', maxWidth: '380px', padding: '20px'
      }}>
        
        <div style={{
          backgroundColor: '#0f172a', borderRadius: '2.5rem', padding: '40px 30px',
          border: '1px solid #1e293b', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          textAlign: 'center'
        }}>
          
          {/* לוגו/אייקון */}
          <div style={{ 
            fontSize: '50px', marginBottom: '10px', 
            filter: 'drop-shadow(0 0 10px rgba(220, 38, 38, 0.4))' 
          }}>
            🏎️
          </div>

          <h1 style={{ 
            fontSize: '32px', fontWeight: '900', color: 'white', 
            marginBottom: '5px', fontStyle: 'italic', letterSpacing: '-1px' 
          }}>
            THE AMAZING <span style={{ color: '#dc2626' }}>RACE</span>
          </h1>
          
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '30px', fontWeight: '500' }}>
            הזדהות צוותים למערכת המשימות
          </p>

          {/* שדות קלט */}
          <div style={{ marginBottom: '20px', textAlign: 'right' }}>
            <label style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 'bold', marginRight: '10px' }}>שם צוות</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="הזן שם צוות"
              style={{
                width: '100%', background: '#020617', border: '1px solid #334155',
                color: 'white', padding: '16px', borderRadius: '1rem', marginTop: '5px',
                textAlign: 'center', fontSize: '16px', outline: 'none', boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '30px', textAlign: 'right' }}>
            <label style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 'bold', marginRight: '10px' }}>קוד סודי</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••"
              style={{
                width: '100%', background: '#020617', border: '1px solid #334155',
                color: 'white', padding: '16px', borderRadius: '1rem', marginTop: '5px',
                textAlign: 'center', fontSize: '20px', outline: 'none', boxSizing: 'border-box',
                letterSpacing: '5px'
              }}
            />
          </div>

          {/* כפתור כניסה */}
          <button 
            onClick={handleLogin}
            style={{
              width: '100%', backgroundColor: '#dc2626', color: 'white', 
              padding: '18px', borderRadius: '1rem', border: 'none', 
              fontSize: '18px', fontWeight: '900', cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(220, 38, 38, 0.4)',
              transition: 'transform 0.1s'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.96)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            START MISSION ⚡
          </button>

          <div style={{ marginTop: '25px', color: '#334155', fontSize: '10px', fontWeight: 'bold' }}>
            OPERATIONAL SYSTEM v3.0
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;