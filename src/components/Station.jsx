import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allMissionsData } from "../missionsData";
import { supabase } from '../supabaseClient';

const Station = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputPass, setInputPass] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [dbPassword, setDbPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const initStation = async () => {
      const savedUser = localStorage.getItem('race_user');
      if (!savedUser) { navigate(`/login?s=${id}`); return; }
      setTeam(JSON.parse(savedUser));

      try {
        // משיכת הסיסמה - הוספתי לוג כדי לראות אם זה מצליח
        const { data, error: dbError } = await supabase
          .from('station_keys')
          .select('password')
          .eq('station_id', String(id))
          .maybeSingle();
        
        if (dbError) {
          console.error("שגיאת RLS או תקשורת:", dbError.message);
        }

        if (data) {
          setDbPassword(data.password);
        }

        const unlocked = JSON.parse(localStorage.getItem('unlocked_stations') || "[]");
        if (unlocked.includes(String(id))) setIsUnlocked(true);
      } catch (e) {
        console.error("System Error:", e);
      } finally {
        setLoading(false);
      }
    };

    initStation();
  }, [id, navigate]);

  const handleUnlock = () => {
    // לוג לבדיקה - תפתח את ה-Console (F12) בדפדפן ותראה מה הערכים
    console.log("Input:", inputPass, "DB Pass:", dbPassword);

    if (inputPass === dbPassword && dbPassword !== "") {
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
    const userInput = prompt("קוד סיום מלווה:");
    if (userInput === dbPassword) {
      await supabase.from('mission_reports').insert([
        { username: team?.username, station_id: String(id), status: 'completed' }
      ]);
      navigate(`/station/${Number(id) + 1}`);
      window.scrollTo(0, 0);
    } else {
      alert("קוד שגוי");
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-mono">CONNECTING TO DATABASE...</div>;

  const mission = allMissionsData[team?.username]?.[id] || {};

  if (!isUnlocked) {
    return (
      <div className="station-page flex flex-col items-center justify-center bg-slate-950 min-h-screen p-4" dir="rtl">
        <div className="card text-center bg-slate-900 p-8 rounded-2xl shadow-2xl border-t-4 border-amber-400 w-full max-w-sm">
          <h2 className="text-white text-3xl font-black mb-2 text-center">תחנה {id}</h2>
          <p className="text-slate-400 mb-6 italic">
            {id === "1" ? "רמז: המספר שמופיע על השלט בכניסה" : "הזן קוד לגישה למשימה"}
          </p>

          <input 
            type="text" 
            value={inputPass}
            onChange={(e) => setInputPass(e.target.value)}
            className={`w-full p-4 rounded-xl mb-4 text-center bg-black border ${error ? 'border-red-500' : 'border-slate-700'} text-white text-2xl font-mono`}
            placeholder="קוד"
          />
          <button 
            onClick={handleUnlock}
            className="w-full bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-all"
          >
            אימות ופתיחה
          </button>
          
          {/* כפתור עזר למקרה שזה עדיין לא עובד - יראה לך מה הסיסמה שהגיע מה-DB */}
          {process.env.NODE_ENV === 'development' && (
            <p className="text-[8px] text-slate-800 mt-4">Debug: {dbPassword}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="station-page min-h-screen bg-slate-950 text-white p-6" dir="rtl">
        <header className="mb-8 border-b border-slate-800 pb-4">
            <h1 className="text-5xl font-black text-red-600">{id}</h1>
            <p className="text-slate-400 font-bold">{team?.username}</p>
        </header>
        
        <div className="space-y-6">
            <div className="bg-slate-900 p-6 rounded-2xl border-r-8 border-red-600 shadow-xl">
                <h3 className="text-red-500 font-bold text-sm mb-2">המשימה:</h3>
                <p className="text-2xl font-bold leading-tight">{mission.task || "משימה לא נמצאה"}</p>
            </div>

            {mission.hint && (
                <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/30">
                    <p className="text-blue-400">💡 {mission.hint}</p>
                </div>
            )}
        </div>

        <button 
            onClick={handleNext} 
            className="w-full mt-12 py-6 bg-red-600 rounded-2xl font-black text-2xl shadow-[0_0_20px_rgba(220,38,38,0.4)]"
        >
            סיימתי / הבא
        </button>
    </div>
  );
};

export default Station;