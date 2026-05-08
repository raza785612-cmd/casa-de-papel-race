import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { allMissionsData } from '../missionsData'; // ייבוא הנתונים כדי למשוך את שם המלווה

const AdminPanel = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const ADMIN_PASSWORD = "1234";

  

  useEffect(() => {
    const isAdmin = sessionStorage.getItem('isAdminConfirmed');
    if (isAdmin === 'true') {
      setIsAuthenticated(true);
    } else {
      const password = prompt("נא להזין סיסמה: ");
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem('isAdminConfirmed', 'true');
        setIsAuthenticated(true);
      } else {
        alert("סיסמה שגויה!");
        navigate('/');
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;

    fetchReports();
    
    const subscription = supabase
      .channel('admin-realtime')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'mission_reports' }, 
        () => fetchReports()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [isAuthenticated]);

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from('mission_reports')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) return;

    const latestReports = [];
    const seenUsers = new Set();

    data.forEach(report => {
      if (!seenUsers.has(report.username)) {
        seenUsers.add(report.username);
        
        // מציאת שם המלווה מתוך missionsData לפי שם הצוות והתחנה הנוכחית
        const teamData = allMissionsData[report.username];
        const currentEscort = teamData?.[report.station_id]?.escort || "לא ידוע";

        latestReports.push({
          ...report,
          escort: currentEscort
        });
      }
    });

    setReports(latestReports);
  };

  const handleReset = async () => {
    const confirmReset = window.confirm("האם אתה בטוח שברצונך לאפס את כל דיווחי התחנות?");
    if (!confirmReset) return;

    try {
      // מחיקה לפי עמודת הטקסט username במקום לפי ה-ID הבעייתי
      const { error } = await supabase
        .from('mission_reports')
        .delete()
        .neq('username', ''); // מוחק כל שורה שבה יש שם משתמש (כלומר הכל)

      if (error) throw error;
      
      alert("הנתונים אופסו בהצלחה ✨");
      setReports([]); 
    } catch (error) {
      console.error("Error resetting data:", error);
      alert("שגיאה באיפוס: " + error.message);
    }
  };

  // פונקציית עזר לבדיקה אם הצוות "פעיל" (דיווח ב-10 דקות האחרונות)
  const isUserActive = (timestamp) => {
    const lastSeen = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = (now - lastSeen) / 1000 / 60;
    return diffInMinutes < 10; 
  };

  if (!isAuthenticated) return <div style={{ background: '#020617', minHeight: '100vh' }} />;

  return (
    <div style={{ padding: '15px', background: '#020617', minHeight: '100vh', color: 'white', direction: 'rtl', fontFamily: 'system-ui' }}>
      <header style={{ marginBottom: '20px', borderBottom: '2px solid #dc2626', paddingBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '22px', margin: 0 }}>🛰️ שליטה </h1>
          <button 
            onClick={handleReset}
            style={{
              background: 'rgba(220, 38, 38, 0.1)',
              color: '#ef4444',
              border: '1px solid #ef4444',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: '0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = '#ef4444' + '33'}
            onMouseOut={(e) => e.target.style.background = 'rgba(220, 38, 38, 0.1)'}
          >
            🗑️ איפוס נתונים
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#94a3b8' }}>סטטוס משתתפים בזמן אמת</span>
            <span style={{ background: '#dc2626', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                {reports.length} משתתפים מדווחים
            </span>
        </div>
      </header>

      <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #1e293b' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#1e293b', color: '#94a3b8' }}>
              <th style={{ padding: '12px' }}>סטטוס</th>
              <th style={{ padding: '12px' }}>כינוי</th>
              <th style={{ padding: '12px' }}>מיקום</th>
              <th style={{ padding: '12px' }}>מדריך מלווה</th>
              <th style={{ padding: '12px' }}>עדכון אחרון</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => {
              const active = isUserActive(report.created_at);
              return (
                <tr key={report.id} style={{ borderBottom: '1px solid #0f172a', background: '#0f172a' }}>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <div style={{ 
                        width: '12px', height: '12px', borderRadius: '50%', margin: '0 auto',
                        backgroundColor: active ? '#22c55e' : '#475569',
                        boxShadow: active ? '0 0 10px #22c55e' : 'none'
                    }} title={active ? "פעיל כרגע" : "לא נראה לאחרונה"} />
                  </td>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: '#fbbf24' }}>{report.username}</td>
                  <td style={{ padding: '12px' }}>
  <span style={{ background: '#dc2626', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }}>
    {/* שואב את הכותרת מהקובץ לפי שם הצוות ומספר התחנה שדווח */}
    {allMissionsData[report.username]?.[report.station_id]?.title || `תחנה ${report.station_id}`}
  </span>
</td>
                  <td style={{ padding: '12px', color: '#e2e8f0' }}>{report.escort}</td>
                  <td style={{ padding: '12px', color: '#94a3b8', fontSize: '12px' }}>
                    {new Date(report.created_at).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: '11px', color: '#475569', marginTop: '20px', textAlign: 'center' }}>
        * סימון ירוק מציין צוות שדיווח ב-10 הדקות האחרונות.
      </p>
    </div>
  );
};

export default AdminPanel;