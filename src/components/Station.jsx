import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allMissionsData, STATION_PASSWORDS, groupsData } from "../missionsData";
import { supabase } from '../supabaseClient';

const Station = () => {
  const { id } = useParams(); // מזהה התחנה מה-URL
  const navigate = useNavigate();
  
  // State management
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputPass, setInputPass] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // 1. אימות כניסה - משיכת המשתמש מהלוגין
    const savedUser = localStorage.getItem('race_user');
    if (!savedUser) { 
      navigate(`/login?s=${id}`); 
      return; 
    }
    
    const user = JSON.parse(savedUser);
    setTeam(user);

    // 2. בדיקה האם התחנה כבר נפתחה בעבר (בדיקה מקומית)
    const unlockedStations = JSON.parse(localStorage.getItem('unlocked_stations') || "[]");
    if (unlockedStations.includes(String(id))) {
      setIsUnlocked(true);
    }
    
    setLoading(false);
  }, [id, navigate]);

  // פונקציה לפתיחת התחנה (קוד גישה ראשוני מהקוד המקומי)
  const handleUnlock = () => {
    if (inputPass === STATION_PASSWORDS[id]) {
      const unlocked = JSON.parse(localStorage.getItem('unlocked_stations') || "[]");
      if (!unlocked.includes(String(id))) {
        unlocked.push(String(id));
        localStorage.setItem('unlocked_stations', JSON.stringify(unlocked));
      }
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000); // אינדיקציה לשגיאה
    }
  };

  // פונקציה לסיום משימה ומעבר לתחנה הבאה (אימות מול Supabase)
  const handleNext = async () => {
    try {
      // 1. שליפת הסיסמה מהדאטאבייס (טבלת station_keys כפי שמופיעה ב-image_9fce7b.png)
      const { data, error: dbError } = await supabase
        .from('station_keys')
        .select('password')
        .eq('station_id', String(id))
        .maybeSingle();

      if (dbError || !data) {
        alert(`שגיאה: לא נמצאה סיסמת סיום לתחנה ${id} בבסיס הנתונים.`);
        return;
      }

      const userInput = prompt("סיסמת מלווה לסיום התחנה:");

      if (userInput === data.password) {
        // 2. דיווח לחמ"ל (טבלת mission_reports כפי שמופיעה ב-image_9fcf57.png)
        // משתמשים ב-insert בגלל ה-UUID האוטומטי
        await supabase.from('mission_reports').insert([
          {
            username: team?.username,
            station_id: String(id),
            status: 'completed'
          }
        ]);

        // 3. מעבר לתחנה הבאה
        const nextId = parseInt(id) + 1;
        navigate(`/station/${nextId}`);
        window.scrollTo(0, 0);
      } else {
        alert("קוד שגוי! המשימה עדיין לא הושלמה.");
      }
    } catch (err) {
      console.error(err);
      alert("תקלת תקשורת בביצוע הפעולה.");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-mono italic text-xl">
      INITIALIZING SYSTEM...
    </div>
  );

  // משיכת נתוני המשימה מתוך missionsData לפי שם הצוות וה-ID
  const mission = allMissionsData[team?.username]?.[id] || {};

  // מסך נעילה במידה והתחנה טרם נפתחה
  if (!isUnlocked && STATION_PASSWORDS[id]) {
    return (
      <div className="station-page flex items-center justify-center bg-slate-950 min-h-screen p-4" dir="rtl">
        <div className="card text-center" style={{ borderTop: '4px solid #fbbf24', maxWidth: '400px', width: '100%' }}>
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-amber-400 text-2xl font-bold mb-6">תחנה {id} נעולה</h2>
          <input 
            type="text" 
            value={inputPass}
            onChange={(e) => setInputPass(e.target.value)}
            placeholder="הזן קוד גישה לתחנה"
            className="w-full p-4 rounded-xl mb-4 text-center bg-slate-900 border text-white"
            style={{ borderColor: error ? '#ef4444' : '#1e293b' }}
          />
          <button 
            onClick={handleUnlock}
            className="w-full bg-amber-400 text-black font-black py-4 rounded-xl hover:bg-amber-300 transition-colors"
          >
            פתח משימה
          </button>
        </div>
      </div>
    );
  }

  // מסך התוכן של התחנה
  return (
    <div className="station-page min-h-screen bg-slate-950 text-white p-4" dir="rtl">
      <div className="max-w-md mx-auto">
        <div className="card shadow-2xl p-6 rounded-2xl bg-slate-900 border-t-4 border-red-600">
          
          <header className="flex justify-between items-center mb-8">
             <div>
                <h1 className="text-5xl font-black">{id}</h1>
                <p className="text-red-600 text-xs font-bold tracking-widest">STATION_DATA</p>
             </div>
             <div className="text-left">
                <p className="font-bold text-lg">{team?.username}</p>
                {mission.group && <p className="text-xs text-amber-400 italic">{mission.group}</p>}
             </div>
          </header>

          <main className="space-y-4">
            {mission.task && (
              <div className="bg-red-600/10 p-4 rounded-xl border-r-4 border-red-600">
                <p className="text-red-500 text-xs font-bold mb-1">המשימה:</p>
                <p className="text-lg font-bold leading-tight">{mission.task}</p>
              </div>
            )}

            {mission.hint && (
              <div className="bg-blue-600/10 p-4 rounded-xl border-r-4 border-blue-600">
                <p className="text-sm">💡 {mission.hint}</p>
              </div>
            )}

            <div className="bg-black/30 p-4 rounded-xl text-sm text-slate-400">
              {mission.address && <p className="mb-2 text-white">📍 <strong>מיקום:</strong> {mission.address}</p>}
              {mission.intel && <p>🔍 <strong>מודיעין:</strong> {mission.intel}</p>}
            </div>

            {mission.map && (
              <div className="mt-4 rounded-xl overflow-hidden border border-slate-800">
                <iframe 
                  title="map" 
                  width="100%" 
                  height="200" 
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(mission.map)}&z=15&output=embed`} 
                  style={{ border: 0, filter: 'grayscale(1) invert(1)' }}
                />
              </div>
            )}
          </main>

          <footer className="flex gap-3 mt-8">
            {parseInt(id) > 1 && (
              <button 
                onClick={() => navigate(`/station/${parseInt(id) - 1}`)}
                className="flex-1 py-4 rounded-xl bg-slate-800 font-bold hover:bg-slate-700 transition-colors"
              >
                הקודם
              </button>
            )}
            <button 
              onClick={handleNext}
              className="flex-[2] py-4 rounded-xl bg-red-600 font-bold hover:bg-red-500 transition-all shadow-lg shadow-red-600/20"
            >
              סיימתי / הבא
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Station;