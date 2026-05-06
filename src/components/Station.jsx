import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { STATION_PASSWORDS, allMissionsData } from '../missionsData';
import { supabase } from '../supabaseClient';

const Station = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputPass, setInputPass] = useState("");
  const team = JSON.parse(localStorage.getItem('race_user'));

  useEffect(() => {
    setIsUnlocked(false);
    setInputPass("");
  }, [id]);

  const handleUnlock = () => {
    // לוקח את הסיסמה מהקובץ המקומי ששלחת לי
    if (inputPass === STATION_PASSWORDS[id]) {
      setIsUnlocked(true);
    } else {
      alert("קוד תחנה שגוי");
    }
  };

  const handleFinish = async () => {
    // דיווח אופציונלי לאדמין
    await supabase.from('mission_reports').insert([{ username: team.username, station_id: id }]);
    navigate(`/station/${Number(id) + 1}`);
  };

  const mission = allMissionsData[team?.username]?.[id] || {};

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white" dir="rtl">
        <div className="bg-slate-900 p-8 rounded-2xl border-t-4 border-red-600 w-full max-w-sm text-center shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 italic">STATION {id}</h2>
          <input 
            type="text" value={inputPass}
            onChange={(e) => setInputPass(e.target.value)}
            className="w-full p-4 bg-black border border-slate-700 rounded-xl mb-4 text-center text-2xl"
            placeholder="קוד כניסה"
          />
          <button onClick={handleUnlock} className="w-full bg-red-600 py-4 rounded-xl font-bold text-lg active:scale-95 transition-transform">
            פתח משימה
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6" dir="rtl">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => navigate(`/station/${Number(id) - 1}`)} disabled={id === "1"} className="text-slate-500">◀</button>
          <h1 className="text-4xl font-black italic">תחנה {id}</h1>
          <button onClick={() => navigate(`/station/${Number(id) + 1}`)} className="text-slate-500">▶</button>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl border-r-8 border-red-600 mb-8 shadow-xl">
          <h3 className="text-red-500 text-xs font-bold mb-2">משימה:</h3>
          <p className="text-2xl font-bold leading-tight">{mission.task}</p>
        </div>
        <div className="space-y-3 bg-black/30 p-4 rounded-xl text-sm text-slate-300 mb-8">
          <p>📍 <strong>מיקום:</strong> {mission.address}</p>
          <p>💡 <strong>מודיעין:</strong> {mission.intel}</p>
        </div>
        <button onClick={handleFinish} className="w-full py-6 bg-red-600 rounded-2xl font-black text-2xl shadow-lg active:translate-y-1 transition-all">
          סיימתי / הבא
        </button>
      </div>
    </div>
  );
};

export default Station;