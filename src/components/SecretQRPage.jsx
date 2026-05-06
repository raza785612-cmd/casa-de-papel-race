import React, { useState, useEffect } from 'react';

const SecretQrPage = () => {
  const [pass, setPass] = useState("");
  const [auth, setAuth] = useState(false);
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('race_user');
    if (storedUser) {
      setTeam(JSON.parse(storedUser));
    }
  }, []);

  const check = () => {
    if (!team) {
      alert("שגיאה: עליך להתחבר למערכת המשימות קודם לכן");
      return;
    }

    if (pass.trim() === team.secret_password) {
      setAuth(true);
    } else {
      alert("קוד סודי שגוי");
    }
  };

  if (!auth) {
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'white', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000
      }} dir="rtl">
        
        {/* פנייה אישית לצוות */}
        {team && (
          <div style={{ marginBottom: '10px', color: '#64748b', fontSize: '16px' }}>
            שלום, <span style={{ fontWeight: 'bold', color: 'black' }}>{team.username}</span>
          </div>
        )}

        <h2 style={{ 
          marginBottom: '30px', fontWeight: 'bold', fontSize: '20px', 
          letterSpacing: '2px', color: 'black', textAlign: 'center',
          textTransform: 'uppercase'
        }}>
          כניסה לארכיון המודיעין
        </h2>
        
        <input 
          type="text" 
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          style={{
            border: 'none', borderBottom: '2px solid black', backgroundColor: 'transparent',
            textAlign: 'center', fontSize: '32px', width: '200px', marginBottom: '40px',
            outline: 'none', color: 'black'
          }}
          placeholder="----"
        />
        
        <button 
          onClick={check}
          style={{
            backgroundColor: 'black', color: 'white', padding: '15px 50px',
            borderRadius: '50px', fontWeight: 'bold', border: 'none',
            cursor: 'pointer', fontSize: '18px', transition: 'transform 0.1s'
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          אימות
        </button>
        
        <p style={{ marginTop: '40px', color: '#9ca3af', fontSize: '14px', fontStyle: 'italic' }}>
          רמז: הסיסמה נמצאת אצל המנטור
        </p>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'white', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '40px', zIndex: 1000
    }} dir="rtl">
      <h1 style={{
        fontSize: '28px', fontFamily: 'serif', fontStyle: 'italic',
        borderLeft: '3px solid black', borderRight: '3px solid black',
        padding: '20px 30px', lineHeight: '1.6', color: 'black', textAlign: 'center'
      }}>
        {team?.secret_message || "לא נמצאה הודעה עבור צוות זה"}
      </h1>
    </div>
  );
};

export default SecretQrPage;