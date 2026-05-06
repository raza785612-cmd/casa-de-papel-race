import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const SecretQRPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [teamName, setTeamName] = useState("");

  const personalMessages = {
    "פרנקל": "המשימה המיוחדת שלך: חפש את המעטפה הכחולה מאחורי דלפק הקבלה.",
    "default": "מצאתם משימה סודית! פנו למלווה הקרוב לקבלת המשך הוראות."
  };

  useEffect(() => {
    const initSecretMission = async () => {
      // שליפת המשתמש מה-LocalStorage (מסונכרן עם הלוגין)
      const savedUser = localStorage.getItem('race_user');
      if (!savedUser) {
        alert("עליך להתחבר למערכת כדי לצפות בתוכן זה.");
        navigate('/');
        return;
      }

      const userObj = JSON.parse(savedUser);
      setTeamName(userObj.username);

      // שליפת נתוני המשימה הסודית מ-Supabase
      const { data, error } = await supabase
        .from('secret_keys')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !data) {
        console.error("Secret mission not found");
        navigate('/');
        return;
      }

      setLoading(false);

      // בקשת סיסמה
      const entry = prompt(data.hint || "הזן סיסמת משימה סודית:");
      
      if (entry === data.password) {
        const msg = personalMessages[userObj.username] || personalMessages["default"];
        setUserMessage(msg);
        setUnlocked(true);
        
        // דיווח לחמ"ל על משימה סודית
        await supabase.from('mission_reports').upsert({
          username: userObj.username,
          station_id: `SECRET_${slug}`,
          status: 'unlocked'
        }, { onConflict: 'username' });

      } else {
        alert("קוד גישה שגוי!");
        navigate('/');
      }
    };

    initSecretMission();
  }, [slug, navigate]);

  if (loading || !unlocked) {
    return <div style={{ background: 'white', minHeight: '100vh' }} />;
  }

  return (
    <div style={{ 
      background: '#ffffff', minHeight: '100vh', display: 'flex', 
      flexDirection: 'column', justifyContent: 'center', alignItems: 'center', 
      color: '#000000', direction: 'rtl', padding: '25px', textAlign: 'center'
    }}>
      <div style={{ maxWidth: '450px', width: '100%' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '5px' }}>סוכן {teamName}</h1>
        <p style={{ color: '#666', marginBottom: '40px', fontWeight: 'bold', letterSpacing: '1px' }}>--- משימה סודית זוהתה ---</p>
        
        <div style={{ 
          border: '4px solid #000', padding: '40px 20px', fontSize: '1.6rem',
          fontWeight: '900', lineHeight: '1.4', boxShadow: '12px 12px 0px #eeeeee'
        }}>
          {userMessage}
        </div>

        <button 
          onClick={() => navigate(-1)}
          style={{ 
            marginTop: '50px', background: 'black', color: 'white', 
            border: 'none', padding: '15px 30px', cursor: 'pointer',
            fontSize: '1rem', fontWeight: 'bold'
          }}
        >
          חזור למשימות הרגילות
        </button>
      </div>
    </div>
  );
};

export default SecretQRPage;