import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allMissionsData } from "../missionsData"; // הורדנו את STATION_PASSWORDS מהקוד המקומי
import { supabase } from '../supabaseClient';

const Station = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputPass, setInputPass] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [dbPassword, setDbPassword] = useState(""); // שומר את הסיסמה מהדאטאבייס
  const [error, setError] = useState(false);

  useEffect(() => {
    const initStation = async () => {
      // 1. בדיקת משתמש
      const savedUser = localStorage.getItem('race_user');
      if (!savedUser) { navigate(`/login?s=${id}`); return; }
      const user = JSON.parse(savedUser);
      setTeam(user);

      // 2. משיכת הסיסמה מה-Database (כדי ש-3321 יעבוד)
      const { data, error: dbError } = await supabase
        .from('station_keys')
        .select('password')
        .eq('station_id', String(id))
        .maybeSingle();
      
      if (data) setDbPassword(data.password);

      // 3. בדיקה אם כבר פתוח
      const unlocked = JSON.parse(localStorage.getItem('unlocked_stations') || "[]");
      if (unlocked.includes(String(id))) setIsUnlocked(true);
      
      setLoading(false);
    };

    initStation();
  }, [id]);

  const handleUnlock = () => {
    // עכשיו הבדיקה היא מול מה שמשכנו מה-Database בתחילת הטעינה
    if (inputPass === dbPassword) {
      const unlocked = JSON.parse(localStorage.getItem('unlocked_stations') || "[]");
      if (!unlocked.includes(String(id))) {
        unlocked.push(String(id));
        localStorage.setItem('unlocked_stations', JSON.stringify(unlocked));
      }
      setIsUnlocked(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleNext = async () => {
    const userInput = prompt("סיסמת מלווה לסיום התחנה (קוד סיום):");
    // לצורך הפשטות, בתחנה זו נשתמש באותה סיסמה מה-DB לסיום
    if (userInput === dbPassword) {
      await supabase.from('mission_reports').insert([
        { username: team?.username, station_id: String(id), status: 'completed' }
      ]);
      navigate(`/station/${Number(id) + 1}`);
      window.scrollTo(0, 0);
    } else {
      alert("קוד סיום שגוי!");
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-mono">LOADING...</div>;

  const mission = allMissionsData[team?.username]?.[id] || {};

  // מסך נעילה עם רמז
  if (!isUnlocked) {
    return (
      <div className="station-page flex items-center justify-center bg-slate-950 min-h-screen p-4" dir="rtl">
        <div className="card text-center bg-slate-900 p-8 rounded-2xl shadow-2xl border-t-4 border-amber-400 w-full max-w-sm">
          <div className="text-5xl mb-4">🔓</div>
          <h2 className="text-white text-2xl font-bold mb-2">תחנה {id}</h2>
          
          {/* הוספת רמז לתחנה 1 או כל תחנה אחרת */}
          <p className="text-slate-400 mb-6 italic text-sm">
            {id === "1" ? "רמז: חפשו את המספר על גב השלט בכניסה" : "הזן קוד לפתיחת המשימה"}
          </p>

          <input 
            type="text" 
            value={inputPass}
            onChange={(e) => setInputPass(e.target.value)}
            className={`w-full p-4 rounded-xl mb-4 text-center bg-black border ${error ? 'border-red-500' : 'border-slate-700'} text-white text-xl font-mono`}
            placeholder="----"
          />
          <button 
            onClick={handleUnlock}
            className="w-full bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-500 transition-all"
          >
            פתח משימה
          </button>
        </div>
      </div>
    );
  }

  // מסך התוכן (נשאר אותו דבר כמו קודם)
  return (
    <div className="station-page min-h-screen bg-slate-950 text-white p-6" dir="rtl">
      {/* ... כל ה-JSX של התוכן שכתבתי לך קודם ... */}
      <h1 className="text-4xl font-black mb-4">משימה {id}</h1>
      <div className="bg-slate-900 p-6 rounded-xl border-r-4 border-red-600 mb-6">
          <p className="text-xl">{mission.task || "אין תיאור משימה לצוות זה"}</p>
      </div>
      <button onClick={handleNext} className="w-full py-6 bg-red-600 rounded-2xl font-black text-2xl shadow-xl">
        סיימתי / הבא
      </button>
    </div>
  );
};

export default Station;