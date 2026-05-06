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

  // פונקציות עזר למפה
  const getGoogleMapsLink = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const getEmbedMap = (query) => `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6" dir="rtl">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] w-full max-w-[340px] shadow-2xl text-center">
          <div className="text-4xl mb-4">🔑</div>
          <h2 className="text-white text-xl font-black mb-6">זיהוי סוכן - תחנה {id}</h2>
          <input 
            type="text" inputMode="numeric" value={inputPass}
            onChange={(e) => setInputPass(e.target.value)}
            className="w-full p-4 bg-black border border-slate-700 rounded-2xl mb-6 text-center text-3xl text-white font-mono focus:border-red-600 outline-none"
            placeholder="0000"
          />
          <button onClick={handleUnlock} className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold text-lg active:scale-95 transition-transform">כניסה למערכת</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-0 sm:p-4" dir="rtl">
      
      {/* Container מובייל קשיח */}
      <div className="w-full max-w-[420px] bg-[#0f0f0f] min-h-screen sm:min-h-fit sm:rounded-[2.5rem] shadow-2xl overflow-hidden border-x border-slate-800 flex flex-col">
        
        {/* 1. תמונה - גובה קבוע, תמיד בראש */}
        {mission.img && (
          <div className="w-full h-[220px] bg-slate-800 relative">
            <img src={mission.img} alt="Mission" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0f0f0f] to-transparent"></div>
          </div>
        )}

        <div className="p-5 space-y-5 flex-1">
          
          {/* 2. משימה */}
          {mission.task && (
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1 text-red-500 font-bold text-[10px] tracking-tighter uppercase">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
                משימה פעילה
              </div>
              <h1 className="text-2xl font-black leading-tight">{mission.task}</h1>
            </div>
          )}

          {/* 3. מודיעין */}
          {mission.intel && (
            <div className="bg-red-600/10 border-r-4 border-red-600 p-4 rounded-xl">
              <p className="text-sm text-red-100/90 leading-relaxed italic">{mission.intel}</p>
            </div>
          )}

          {/* 4. כתובת */}
          {mission.address && (
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
              <div className="text-2xl bg-slate-800 w-10 h-10 flex items-center justify-center rounded-full">📍</div>
              <div>
                <div className="text-slate-500 text-[10px] font-bold uppercase">כתובת היעד</div>
                <div className="text-md font-bold">{mission.address}</div>
              </div>
            </div>
          )}

          {/* 5. מפה - מוגבלת וברורה */}
          {mission.map && (
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-black">
              <div className="w-full h-[160px]">
                 <iframe
                  width="100%" height="100%" frameBorder="0"
                  src={getEmbedMap(mission.map)}
                  title="map"
                  className="grayscale invert-[0.1] opacity-80"
                ></iframe>
              </div>
              <a 
                href={getGoogleMapsLink(mission.map)} 
                target="_blank" rel="noopener noreferrer"
                className="block text-center py-3 bg-blue-600 text-white text-xs font-bold"
              >
                לחץ לניווט (Google Maps) 🚀
              </a>
            </div>
          )}

          {/* 6. פרטי צוות (הצגה בשורה) */}
          {(mission.escort || mission.hours) && (
            <div className="grid grid-cols-2 gap-3">
              {mission.escort && (
                <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700">
                  <div className="text-slate-500 text-[9px] font-bold uppercase mb-1">👤 מלווה</div>
                  <div className="text-xs font-bold truncate">{mission.escort}</div>
                </div>
              )}
              {mission.hours && (
                <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700">
                  <div className="text-slate-500 text-[9px] font-bold uppercase mb-1">🕒 זמן יעד</div>
                  <div className="text-xs font-bold text-red-500">{mission.hours}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 7. כפתור אישור - דבוק למטה של ה-Container */}
        <div className="p-5 bg-gradient-to-t from-black to-transparent">
          <button 
            onClick={handleNext}
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-xl shadow-xl active:scale-95 transition-all"
          >
            סיימנו, המשך ⚡
          </button>
        </div>

      </div>
    </div>
  );
};

export default Station;