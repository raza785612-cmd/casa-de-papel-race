import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // הוספנו ייבוא של סופבייס

const SecretQrPage = () => {
  const [pass, setPass] = useState("");
  const [auth, setAuth] = useState(false);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestTeamData = async () => {
      const storedUser = JSON.parse(localStorage.getItem('race_user'));
      
      if (storedUser && storedUser.id) {
        // משיכת הנתונים הכי עדכניים מהדאטאבייס לפי ה-ID
        const { data, error } = await supabase
          .from('teams')
          .select('*')
          .eq('id', storedUser.id)
          .single();

        if (data && !error) {
          setTeam(data);
          // מעדכנים גם את ה-localStorage שיהיה מעודכן להמשך
          localStorage.setItem('race_user', JSON.stringify(data));
        } else {
          setTeam(storedUser); // fallback למה שיש בזיכרון
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
        {team?.secret_message}
      </h1>
    </div>
  );
};

export default SecretQrPage;