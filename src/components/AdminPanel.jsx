import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AdminPanel = () => {
  const [reports, setReports] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // הגדרת הסיסמה שלך כאן
  const ADMIN_PASSWORD = "1234"; 

  useEffect(() => {
    // בקשת סיסמה מיד עם טעינת הדף
    const password = prompt("נא להזין סיסמת חמ''ל:");
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchReports();
      
      // הפעלת ה-Realtime רק אם המשתמש מורשה
      const subscription = supabase
        .channel('schema-db-changes')
        .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'mission_reports' }, 
          (payload) => {
            setReports(current => [payload.new, ...current]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    } else {
      alert("סיסמה שגויה!");
      window.location.href = "/"; // מחזיר לדף הבית אם הסיסמה שגויה
    }
  }, []);

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from('mission_reports')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error("Error:", error);
    setReports(data || []);
  };

  // אם לא עבר אימות, לא מציגים כלום (או מציגים הודעת טעינה)
  if (!isAuthenticated) {
    return <div style={{ background: '#020617', minHeight: '100vh' }} />;
  }

  return (
    <div style={{ padding: '20px', background: '#020617', minHeight: '100vh', color: 'white', direction: 'rtl', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #dc2626', paddingBottom: '15px' }}>
        <h1 style={{ margin: 0 }}>🛰️ חמ"ל מבצע - שליטה ובקרה</h1>
        <span style={{ background: '#dc2626', padding: '5px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>
          LIVE: {reports.length} דיווחים
        </span>
      </div>

      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#1e293b' }}>
            <th style={{ padding: '15px', textAlign: 'right' }}>משתתף</th>
            <th style={{ padding: '15px', textAlign: 'right' }}>תחנה</th>
            <th style={{ padding: '15px', textAlign: 'right' }}>זמן דיווח</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id} style={{ borderBottom: '1px solid #1e293b' }}>
              <td style={{ padding: '15px', fontWeight: 'bold', color: '#fbbf24' }}>{report.username}</td>
              <td style={{ padding: '15px' }}>
                <span style={{ background: '#334155', padding: '4px 10px', borderRadius: '6px' }}>
                  תחנה {report.station_id}
                </span>
              </td>
              <td style={{ padding: '15px', fontSize: '14px', color: '#94a3b8' }}>
                {new Date(report.created_at).toLocaleTimeString('he-IL')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;