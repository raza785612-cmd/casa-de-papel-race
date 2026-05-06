import React, { useState, useEffect } from 'react';

const SecretQrPage = () => {
  const [pass, setPass] = useState("");
  const [auth, setAuth] = useState(false);
  const [team, setTeam] = useState(null);

  useEffect(() => {
    // טעינת נתוני הצוות שנשמרו בלוגין
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

    // בדיקה מול העמודה secret_password מהתמונה ששלחת
    if (pass.trim() === team.secret_password) {
      setAuth(true);
    } else {
      alert("קוד סודי שגוי");
    }
  };

  // דף כניסה - סטייל ארכיון נקי
  if (!auth) {
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'white', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000
      }} dir="rtl">
        <h2 style={{ 
          marginBottom: '30px', fontWeight: 'bold', fontSize: '20px', 
          letterSpacing: '2px', color: 'black', textAlign: 'center' 
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

  // דף ההודעה הסודית - מוצג לאחר אימות
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
        {/* מציג את ההודעה הייחודית מהעמודה secret_message */}
        {team?.secret_message || "לא נמצאה הודעה עבור צוות זה"}
      </h1>
    </div>
  );
};

export default SecretQrPage;