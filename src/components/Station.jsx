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
      <div className="centered-page">
        <div className="card w-full max-w-[350px]">
          <h1>STATION <span className="red-text">{id}</span></h1>
          <p style={{ marginBottom: '20px', opacity: 0.7 }}>הזן קוד משימה לחשיפת הפרטים</p>
          <input 
            type="text" inputMode="numeric" value={inputPass}
            onChange={(e) => setInputPass(e.target.value)}
            placeholder="קוד סודי"
          />
          <button onClick={handleUnlock}>חשיפת משימה</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 px-4 flex justify-center bg-[#020617]">
      {/* מגביל הרווח המרכזי - ה"טלפון" */}
      <div className="w-full max-w-[400px] flex flex-col gap-4">
        
        {/* כרטיס ראשי המכיל את כל התוכן */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-[2rem] overflow-hidden shadow-2xl">
          
          {/* 1. תמונה - הגבלה קשיחה */}
          {mission.img && (
            <div className="w-full h-[220px] bg-slate-800">
              <img src={mission.img} alt="Mission" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="p-6 space-y-6 text-right">
            
            {/* 2. משימה */}
            <div>
              <div className="text-red-500 text-[10px] font-bold uppercase tracking-widest mb-1">● משימה פעילה</div>
              <h2 className="text-2xl font-black text-white italic leading-tight">{mission.task}</h2>
            </div>

            {/* 3. מודיעין - מתוחם בבוקסה אדומה */}
            {mission.intel && (
              <div className="bg-red-600/10 border-r-4 border-red-600 p-4 rounded-xl">
                <span className="text-red-500 font-bold text-xs block mb-1">מודיעין שטח:</span>
                <p className="text-sm text-slate-300 italic">{mission.intel}</p>
              </div>
            )}

            {/* 4. כתובת - מתוחם */}
            {mission.address && (
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="text-slate-500 text-[10px] font-bold uppercase mb-1">מיקום היעד</div>
                <div className="text-lg font-bold">{mission.address}</div>
              </div>
            )}

            {/* 5. מפה - הגבלה קשיחה */}
            {mission.map && (
              <div className="rounded-2xl overflow-hidden border border-white/5 bg-black">
                <div className="w-full h-[180px]">
                  <iframe
                    width="100%" height="100%" frameBorder="0"
                    src={getEmbedMap(mission.map)}
                    title="map"
                    style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.8)' }}
                  ></iframe>
                </div>
                <a 
                  href={getGoogleMapsLink(mission.map)} 
                  target="_blank" rel="noopener noreferrer"
                  className="block text-center py-3 bg-white/10 text-white text-[11px] font-bold uppercase tracking-wider"
                >
                  לחץ לניווט ב-Google Maps
                </a>
              </div>
            )}

            {/* 6. נתוני ליווי וזמן */}
            <div className="grid grid-cols-2 gap-3">
              {mission.escort && (
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="text-slate-500 text-[9px] font-bold mb-1">👤 ליווי</div>
                  <div className="text-xs font-bold">{mission.escort}</div>
                </div>
              )}
              {mission.hours && (
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="text-slate-500 text-[9px] font-bold mb-1">🕒 זמן יעד</div>
                  <div className="text-xs font-bold text-red-500">{mission.hours}</div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 7. כפתור אישור סופי */}
        <button 
          onClick={handleNext}
          className="w-full py-5 bg-red-600 hover:bg-red-700 text-white rounded-[1.5rem] font-black text-xl shadow-lg transition-all active:scale-95"
        >
          CONFIRM & PROCEED ⚡
        </button>

      </div>
    </div>
  );
};

export default Station;