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
    window.scrollTo(0, 0);
  }, [id]);

  const handleUnlock = () => {
    if (inputPass === STATION_PASSWORDS[id]) {
      setIsUnlocked(true);
    } else {
      alert("קוד תחנה שגוי. המערכת ננעלה.");
    }
  };

  const handleNext = async () => {
    await supabase.from('mission_reports').insert([{ username: team?.username, station_id: id }]);
    navigate(`/station/${Number(id) + 1}`);
  };

  const mission = allMissionsData[team?.username]?.[id] || {};

  // מסך נעול - הזנת קוד תחנה
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white font-sans" dir="rtl">
        <div className="bg-slate-900 border-t-4 border-red-600 p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-sm text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-2xl font-black mb-2 italic">STATION {id}</h2>
          <p className="text-slate-400 text-sm mb-6 font-mono">מערכת נעולה - הזן קוד אימות</p>
          <input 
            type="text" 
            inputMode="numeric"
            value={inputPass}
            onChange={(e) => setInputPass(e.target.value)}
            className="w-full p-4 bg-black border border-slate-700 rounded-2xl mb-4 text-center text-3xl font-mono tracking-widest focus:border-red-600 outline-none"
            placeholder="----"
          />
          <button onClick={handleUnlock} className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-2xl font-bold text-lg active:scale-95 transition-all shadow-lg shadow-red-900/20">
            פענח משימה
          </button>
        </div>
      </div>
    );
  }

  // מסך משימה פתוח
  return (
    <div className="min-h-screen bg-black text-slate-200 p-4 pb-24 font-sans" dir="rtl">
      <div className="max-w-md mx-auto space-y-4">
        
        {/* כותרת עליונה */}
        <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
          <div className="text-red-600 font-black text-xl italic tracking-tighter">STATION {id}</div>
          <div className="text-xs font-mono text-slate-500 uppercase">{team?.username} | Agent active</div>
        </div>

        {/* כרטיס משימה ראשי */}
        <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          {/* תמונה - מוצגת רק אם קיימת */}
          {mission.img && (
            <div className="h-48 w-full relative">
              <img src={mission.img} alt="Mission" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
            </div>
          )}

          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
              <span className="text-red-500 text-xs font-bold uppercase tracking-widest">משימה דחופה</span>
            </div>
            <h1 className="text-3xl font-black text-white leading-tight mb-4 tracking-tight">
              {mission.task}
            </h1>

            {/* פרטי משימה - מוצגים רק אם קיימים */}
            <div className="space-y-4 border-t border-slate-800 pt-4">
              
              {mission.address && (
                <div className="flex items-start gap-3">
                  <div className="bg-slate-800 p-2 rounded-lg text-lg">📍</div>
                  <div>
                    <div className="text-slate-500 text-xs">מיקום יעד:</div>
                    <div className="text-white font-bold">{mission.address}</div>
                  </div>
                </div>
              )}

              {mission.intel && (
                <div className="bg-red-950/20 border border-red-900/30 p-4 rounded-2xl mt-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-red-500">⚠️</span>
                    <span className="text-red-500 text-xs font-bold uppercase">מודיעין שטח:</span>
                  </div>
                  <p className="text-sm italic leading-relaxed text-red-100/80">{mission.intel}</p>
                </div>
              )}

              {/* שדות נוספים במבנה גריד (זמן ומפה) */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {mission.hours && (
                  <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                    <div className="text-slate-500 text-[10px]">זמן גג:</div>
                    <div className="text-white text-sm font-bold">{mission.hours}</div>
                  </div>
                )}
                {mission.map && (
                  <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                    <div className="text-slate-500 text-[10px]">מפה:</div>
                    <div className="text-white text-sm font-bold">{mission.map}</div>
                  </div>
                )}
              </div>

              {mission.escort && (
                <div className="flex items-center gap-3 bg-blue-900/10 border border-blue-900/20 p-3 rounded-xl">
                  <div className="text-sm">👤</div>
                  <div className="text-xs text-blue-200/70 italic">ליווי: <span className="font-bold text-blue-100">{mission.escort}</span></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* כפתור אישור תחנה */}
        <button 
          onClick={handleNext} 
          className="w-full py-5 bg-white text-black rounded-2xl font-black text-xl shadow-xl active:translate-y-1 transition-all flex items-center justify-center gap-3"
        >
          {id === "8" ? "סיום מבצע" : "אישור ביצוע והמשך"}
          <span className="text-2xl">⚡</span>
        </button>

      </div>
    </div>
  );
};

export default Station;