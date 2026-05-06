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
      alert("קוד תחנה שגוי");
    }
  };

  const handleNext = async () => {
    await supabase.from('mission_reports').insert([{ username: team?.username, station_id: id }]);
    navigate(`/station/${Number(id) + 1}`);
  };

  const mission = allMissionsData[team?.username]?.[id] || {};

  const getGoogleMapsLink = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const getEmbedMap = (query) => `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white" dir="rtl">
        <div className="bg-slate-900 border-t-4 border-red-600 p-8 rounded-3xl shadow-2xl w-full max-w-[350px] text-center">
          <div className="text-4xl mb-4">🔐</div>
          <h2 className="text-xl font-black mb-6">תחנה {id}</h2>
          <input 
            type="text" inputMode="numeric" value={inputPass}
            onChange={(e) => setInputPass(e.target.value)}
            className="w-full p-3 bg-black border border-slate-700 rounded-xl mb-6 text-center text-2xl font-mono text-white"
            placeholder="קוד"
          />
          <button onClick={handleUnlock} className="w-full bg-red-600 py-4 rounded-xl font-bold text-lg italic">UNSEAL MISSION</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-32 font-sans flex flex-col items-center" dir="rtl">
      {/* Container שמגביל את הרווח - הופך את זה ל"מובייל" גם במחשב */}
      <div className="w-full max-w-[400px] space-y-4">
        
        {/* כותרת עליונה */}
        <div className="flex justify-between items-center px-2 py-1">
          <h1 className="text-2xl font-black italic text-red-600 tracking-tighter">STATION {id}</h1>
          <div className="text-[10px] text-slate-500 font-mono uppercase">{team?.username}</div>
        </div>

        {/* 1. כרטיס תמונה - מוגבל בגובה */}
        {mission.img && (
          <div className="w-full h-48 rounded-2xl overflow-hidden border border-slate-800 shadow-lg bg-slate-900">
            <img src={mission.img} alt="Mission" className="w-full h-full object-cover opacity-90" />
          </div>
        )}

        {/* 2. כרטיס משימה (Task) */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-red-500 text-[10px] font-bold uppercase tracking-widest">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span> משימה דחופה
          </div>
          <p className="text-2xl font-black leading-tight text-right">{mission.task}</p>
        </div>

        {/* 3. כרטיס מודיעין (Intel) */}
        {mission.intel && (
          <div className="bg-red-950/20 border border-red-900/30 p-4 rounded-2xl">
            <div className="text-red-500 font-bold text-xs mb-1">⚠️ מודיעין שטח:</div>
            <p className="text-sm text-red-100/80 leading-relaxed italic text-right">{mission.intel}</p>
          </div>
        )}

        {/* 4. כרטיס מיקום (Address) */}
        {mission.address && (
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-start gap-3">
            <span className="text-xl">📍</span>
            <div className="text-right">
              <div className="text-slate-500 text-[10px] font-bold uppercase">מיקום היעד:</div>
              <p className="text-md font-bold">{mission.address}</p>
            </div>
          </div>
        )}

        {/* 5. כרטיס מפה - מוגבל בגובה */}
        {mission.map && (
          <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 p-2 space-y-2">
            <div className="w-full h-40 rounded-xl overflow-hidden grayscale border border-slate-800">
              <iframe
                width="100%" height="100%" frameBorder="0"
                src={getEmbedMap(mission.map)}
              ></iframe>
            </div>
            <a 
              href={getGoogleMapsLink(mission.map)} 
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600/10 text-blue-400 rounded-lg text-xs font-bold border border-blue-600/20"
            >
              פתח ניווט ב-Google Maps
            </a>
          </div>
        )}

        {/* 6. כרטיס פרטים (Escort & Time) */}
        <div className="grid grid-cols-2 gap-3">
          {mission.escort && (
            <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800 text-right">
              <div className="text-slate-500 text-[9px] font-bold">👤 ליווי:</div>
              <div className="text-xs font-bold">{mission.escort}</div>
            </div>
          )}
          {mission.hours && (
            <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800 text-right">
              <div className="text-slate-500 text-[9px] font-bold">🕒 שעת יעד:</div>
              <div className="text-xs font-bold text-red-500">{mission.hours}</div>
            </div>
          )}
        </div>

        {/* כפתור אישור - תמיד צף למטה בתוך הטווח */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[400px] px-4">
          <button 
            onClick={handleNext}
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black text-lg shadow-xl active:scale-95 transition-all uppercase italic"
          >
            Confirm & Proceed ⚡
          </button>
        </div>

      </div>
    </div>
  );
};

export default Station;