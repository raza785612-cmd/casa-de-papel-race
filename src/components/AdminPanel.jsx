import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const ADMIN_PASSWORD = "1234"; 

  useEffect(() => {
    // בדיקה האם כבר נכנסנו בעבר (בסשן הנוכחי)
    const isAdmin = sessionStorage.getItem('isAdminConfirmed');
    
    if (isAdmin === 'true') {
      setIsAuthenticated(true);
      startAdminSession();
    } else {
      const password = prompt("נא להזין סיסמה:");
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem('isAdminConfirmed', 'true');
        setIsAuthenticated(true);
        startAdminSession();
      } else {
        alert("סיסמה שגויה!");
        navigate('/');
      }
    }
  }, []);

  const startAdminSession = () => {
    fetchReports();
    
    // האזנה לשינויים בזמן אמת
    const subscription = supabase
      .channel('admin-realtime')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'mission_reports' }, 
        (payload) => {
          console.log("New report received!", payload);
          fetchReports(); // רענון הרשימה כשמגיע דיווח חדש
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  };

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from('mission_reports')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching:", error);
      return;
    }

    const latestReports = [];
    const seenUsers = new Set();

    data.forEach(report => {
      if (!seenUsers.has(report.username)) {
        seenUsers.add(report.username);
        latestReports.push(report);
      }
    });

    setReports(latestReports);
  };

  const clearAllReports = async () => {
    const confirmDelete = window.confirm("⚠️ אזהרה: זה ימחק את כל התקדמות הצוותים. להמשיך?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from('mission_reports')
      .delete()
      .neq('username', 'SYSTEM_RESERVED'); // מחיקה של כולם

    if (error) {
      alert("שגיאה במחיקה: " + error.message);
    } else {
      setReports([]);
      alert("הנתונים נמחקו בהצלחה.");
    }
  };

  if (!isAuthenticated) return <div style={{ background: '#020617', minHeight: '100vh' }} />;

  return (
    <div style={{ padding: '20px', background: '#020617', minHeight: '100vh', color: 'white', direction: 'rtl', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #dc2626', paddingBottom: '15px', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px' }}>🛰️ חמ"ל מעקב - המירוץ</h1>
          <p style={{ margin: '5px 0 0', color: '#94a3b8', fontSize: '14px' }}>מציג תחנה אחרונה לכל צוות</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={clearAllReports} style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
            🗑️ איפוס מרוץ
          </button>
          <span style={{ background: '#dc2626', padding: '6px 15px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>
            {reports.length} צוותים פעילים
          </span>
        </div>
      </div>

      <div style={{ overflowX: 'auto', background: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
          <thead>
            <tr style={{ background: '#1e293b' }}>
              <th style={{ padding: '15px', color: '#94a3b8' }}>צוות</th>
              <th style={{ padding: '15px', color: '#94a3b8' }}>מיקום נוכחי</th>
              <th style={{ padding: '15px', color: '#94a3b8' }}>זמן הגעה</th>
              <th style={{ padding: '15px', color: '#94a3b8' }}>סטטוס</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#475569' }}>אין דיווחים עדיין...</td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr key={report.id} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '15px', fontWeight: 'bold', color: '#fbbf24', fontSize: '18px' }}>{report.username}</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ background: '#dc2626', color: 'white', padding: '5px 12px', borderRadius: '8px', fontWeight: 'bold' }}>
                      תחנה {report.station_id}
                    </span>
                  </td>
                  <td style={{ padding: '15px', fontSize: '14px', color: '#94a3b8' }}>
                    {new Date(report.created_at).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#22c55e', fontSize: '12px' }}>
                      <span style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%' }}></span>
                      מחובר
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;