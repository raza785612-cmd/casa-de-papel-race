import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Station = () => {
  const [team, setTeam] = useState(null);
  const [station, setStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameData = async () => {
      const username = localStorage.getItem('race_user');
      if (!username) {
        navigate('/login');
        return;
      }

      // 1. משיכת נתוני הצוות
      const { data: teamData } = await supabase
        .from('teams')
        .select('*')
        .eq('username', username)
        .single();

      if (teamData) {
        setTeam(teamData);
        // 2. משיכת נתוני התחנה הנוכחית
        const { data: stationData } = await supabase
          .from('stations')
          .select('*')
          .eq('station_number', teamData.current_station)
          .single();
        
        setStation(stationData);
      }
      setLoading(false);
    };

    fetchGameData();
  }, [navigate]);

  if (loading) return <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">טוען נתונים מהבנק...</div>;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6" dir="rtl">
      <div className="max-w-md mx-auto pt-10">
        <header className="border-b border-red-600 pb-4 mb-8">
          <p className="text-red-600 font-bold">שלום, {team?.username}</p>
          <h1 className="text-2xl font-black italic text-zinc-100">תחנה {team?.current_station}: {station?.task_title || 'משימה סודית'}</h1>
        </header>

        <div className="bg-zinc-900 p-6 rounded-lg shadow-xl border border-zinc-800">
          <p className="text-lg leading-relaxed mb-8">
            {station?.task_description || 'המשימה בטעינה...'}
          </p>

          <button 
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded shadow-lg shadow-red-900/20 transition"
            onClick={() => alert('סיימנו! עכשיו צריך לעדכן את הדאטה בייס')}
          >
            סיימתי את המשימה!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Station;