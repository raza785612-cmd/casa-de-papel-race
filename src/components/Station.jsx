import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, useParams } from 'react-router-dom';

const Station = () => {
  const [team, setTeam] = useState(null);
  const [station, setStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // 1. חילוץ ה-ID מהכתובת (למשל station/1)
  const { id } = useParams(); 

  useEffect(() => {
    const fetchGameData = async () => {
      // 2. תיקון קריאת המשתמש מה-localStorage
      const savedUser = localStorage.getItem('race_user');
      if (!savedUser) {
        navigate('/login');
        return;
      }

      const teamData = JSON.parse(savedUser); // הופך את הטקסט חזרה לאובייקט
      setTeam(teamData);

      // 3. משיכת נתוני התחנה לפי ה-ID מה-URL (ה-QR שנסרק)
      const { data: stationData, error } = await supabase
        .from('stations')
        .select('*')
        .eq('station_number', id) // משתמש ב-id מהכתובת
        .single();
      
      if (error) {
        console.error("Error fetching station:", error);
      } else {
        setStation(stationData);
      }
      
      setLoading(false);
    };

    fetchGameData();
  }, [id, navigate]);

  if (loading) return <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">טוען משימה מהמפקדה...</div>;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6" dir="rtl">
      <div className="max-w-md mx-auto pt-10">
        <header className="border-b border-red-600 pb-4 mb-8">
          <p className="text-red-600 font-bold">צוות: {team?.username}</p>
          <h1 className="text-2xl font-black italic text-zinc-100">
            תחנה {id}: {station?.task_title || 'משימה סודית'}
          </h1>
        </header>

        <div className="bg-zinc-900 p-6 rounded-lg shadow-xl border border-zinc-800">
          <p className="text-lg leading-relaxed mb-8 whitespace-pre-line">
            {station?.task_description || 'המשימה בטעינה...'}
          </p>

          <button 
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded shadow-lg shadow-red-900/20 transition"
            onClick={() => alert('משימה הושלמה! המעבר לתחנה הבאה יתבצע בסריקת ה-QR הבא.')}
          >
            סיימתי את המשימה!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Station;