import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // הוספת הייבוא של הניווט
import { supabase } from '../supabaseClient';

const SecretQrPage = () => {
  const navigate = useNavigate(); // אתחול פונקציית הניווט
  const [pass, setPass] = useState("");
  const [auth, setAuth] = useState(false);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestTeamData = async () => {
      const storedUser = JSON.parse(localStorage.getItem('race_user'));
      
      if (storedUser && storedUser.id) {
        const { data, error } = await supabase
          .from('teams')
          .select('*')
          .eq('id', storedUser.id)
          .single();

        if (data && !error) {
          setTeam(data);
          localStorage.setItem('race_user', JSON.stringify(data));
        } else {
          setTeam(storedUser);
        }
      }
      setLoading(false);
    };

    fetchLatestTeamData();
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

  if (loading) return <div style={{ background: 'white', minHeight: '100vh' }} />;

  if (!auth) {
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'white', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000
      }} dir="rtl">
        
        {team && (
          <div style={{ marginBottom: '10px', color: '#64748b', fontSize: '16px' }}>
            שלום, <span style={{ fontWeight: 'bold', color: 'black' }}>{team.username}</span>
          </div>
        )}

        <h2 style={{ 
          marginBottom: '30px', fontWeight: 'bold', fontSize: '20px', 
          letterSpacing: '2px', color: 'black', textAlign: 'center'
        }}>
         המירוץ
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
            cursor: 'pointer', fontSize: '18px'
          }}
        >
          אימות
        </button>
        
        <p style={{ marginTop: '40px', color: '#9ca3af', fontSize: '14px', fontStyle: 'italic' }}>
         הסיסמה היא אבן גבירול אבן גבירול בן יהודה נמיר
        </p>
      </div>
    );
  }

  // דף ההודעה הסודית - אחרי אימות מוצלח
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'white', display: 'flex', flexDirection: 'column', // שינוי ל-Column כדי לסדר כפתור למטה
      alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000
    }} dir="rtl">
      
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{
          fontSize: '28px', fontFamily: 'serif', fontStyle: 'italic',
          borderLeft: '3px solid black', borderRight: '3px solid black',
          padding: '20px 30px', lineHeight: '1.6', color: 'black', textAlign: 'center'
        }}>
          {team?.secret_message}
        </h1>
      </div>

      <button 
          onClick={() => navigate('/station/6')}
          style={{
            width: '100%',
            maxWidth: '300px', // שלא יהיה רחב מדי במסכים גדולים
            padding: '16px',
            backgroundColor: '#1e293b',
            color: 'white',
            borderRadius: '12px',
            border: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            marginBottom: '30px' // רווח מהתחתית
          }}
        >
          🔙 חזרה למשימה הבאה
        </button>
    </div>
  );
};

export default SecretQrPage;