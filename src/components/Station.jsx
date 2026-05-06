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

  // פונקציה ליצירת לינק ניווט לגוגל מפות
  const getGoogleMapsLink = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  
  // פונקציה למפה משובצת (Embed)
  const getEmbedMap = (query) => `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white" dir="rtl">
        <div className="bg-slate-900 border-t-4 border-red-600 p-8 rounded-3xl shadow-2xl w-full max-w-sm text-center">
          <div className="text-5xl mb-4">🔐</div>
          <h2 className="text-2xl font-black mb-6 italic">תחנה {id} נעולה</h2>
          <input 
            type="text" inputMode="numeric" value={inputPass}
            onChange={(e) => setInputPass(e.target.value)}
            className="w-full p-4 bg-black border border-slate-700 rounded-2xl mb-6 text-center text-3xl font-mono"
            placeholder="קוד"
          />
          <button onClick={handleUnlock} className="w-full bg-red-600 py-4 rounded-2xl font-bold text-xl">פתח משימה</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 pb-28 font-sans" dir="rtl">
      <div className="max-w-md mx-auto">
        
        {/* כותרת הצוות */}
        {mission.group && (
          <div className="text-center mb-4">
            <span className="bg-red-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              {mission.group}
            </span>
          </div>
        )}

        <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800">
          
          {/* 1. תמונה */}
          {mission.img && (
            <div className="h-56 w-full relative">
              <img src={mission.img} alt="Mission" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
            </div>
          )}

          <div className="p-6 space-y-6">
            
            {/* 2. משימה (Task) */}
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-red-500 animate-pulse">●</span>
                <span className="text-slate-400 text-xs font-bold">משימה נוכחית:</span>
              </div>
              <h1 className="text-3xl font-black leading-none text-white">{mission.task}</h1>
            </div>

            {/* 3. מודיעין (Intel) */}
            {mission.intel && (
              <div className="bg-red-600/10 border-r-4 border-red-600 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-1 text-red-500 font-bold text-sm">
                  <span>⚠️</span> מודיעין שטח
                </div>
                <p className="text-slate-200 text-sm leading-relaxed italic">{mission.intel}</p>
              </div>
            )}

            {/* 4. כתובת (Address) */}
            {mission.address && (
              <div className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-2xl">
                <span className="text-2xl">📍</span>
                <div>
                  <div className="text-slate-500 text-xs font-bold">מיקום היעד:</div>
                  <div className="text-lg font-bold leading-tight">{mission.address}</div>
                </div>
              </div>
            )}

            {/* 5. מפה (Map) - Embed + Button */}
            {mission.map && (
              <div className="space-y-3">
                <div className="w-full h-40 rounded-2xl overflow-hidden border border-slate-700 shadow-inner grayscale contrast-125">
                  <iframe
                    width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"
                    src={getEmbedMap(mission.map)}
                  ></iframe>
                </div>
                <a 
                  href={getGoogleMapsLink(mission.map)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-xl text-sm font-bold"
                >
                  ניווט ב-Google Maps ➔
                </a>
              </div>
            )}

            {/* 6+7. ליווי וזמן (Escort & Hours) */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {mission.escort && (
                <div className="bg-slate-800/30 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-500 text-[10px] mb-1">👤 ליווי שטח:</div>
                  <div className="text-sm font-bold">{mission.escort}</div>
                </div>
              )}
              {mission.hours && (
                <div className="bg-slate-800/30 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-500 text-[10px] mb-1">🕒 שעת יעד:</div>
                  <div className="text-sm font-bold">{mission.hours}</div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* כפתור סיום בתחתית - דביק */}
        <div className="fixed bottom-6 left-4 right-4 max-w-md mx-auto">
          <button 
            onClick={handleNext}
            className="w-full py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-xl shadow-[0_10px_30px_-10px_rgba(220,38,38,0.5)] active:scale-95 transition-all"
          >
            אישור ביצוע והמשך ⚡
          </button>
        </div>

      </div>
    </div>
  );
};

export default Station;