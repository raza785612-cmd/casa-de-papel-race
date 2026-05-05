import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AdminPanel = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();

    const subscription = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'mission_reports' }, 
        (payload) => {
          // שיפור 1: שימוש ב-Functional Update כדי להבטיח סדר נכון
          setReports(current => [payload.new, ...current]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from('mission_reports')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error("Error fetching reports:", error);
    setReports(data || []);
  };

  return (
    <div style={{ padding: '20px', background: '#020617', minHeight: '100vh', color: 'white', direction: 'rtl', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #dc2626', paddingBottom: '15px' }}>
        <h1 style={{ margin: 0 }}>🛰️ חמ"ל מבצע - שליטה ובקרה</h1>
        <span style={{ background: '#dc2626', padding: '5px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>
          LIVE: {reports.length} דיווחים
        </span>
      </div>

      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse', borderRadius: '8px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ background: '#1e293b' }}>
            <th style={{ padding: '15px', textAlign: 'right' }}>משתתף</th>
            <th style={{ padding: '15px', textAlign: 'right' }}>תחנה</th>
            <th style={{ padding: '15px', textAlign: 'right' }}>זמן דיווח</th>
          </tr>
        </thead>
        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>אין דיווחים עדיין... המתן לתחילת המבצע</td>
            </tr>
          ) : (
            reports.map((report) => (
              <tr key={report.id} style={{ borderBottom: '1px solid #1e293b', transition: 'background 0.3s' }}>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#fbbf24' }}>
                  {report.username || 'אנונימי'}
                </td>
                <td style={{ padding: '15px' }}>
                   {/* שיפור 2: וידוא שהתחנה מוצגת יפה גם אם היא מספר או טקסט */}
                   <span style={{ background: '#334155', padding: '4px 10px', borderRadius: '6px' }}>
                     תחנה {report.station_id}
                   </span>
                </td>
                <td style={{ padding: '15px', fontSize: '14px', color: '#94a3b8' }}>
                  {/* שיפור 3: פורמט זמן קצת יותר קריא לישראל */}
                  {new Date(report.created_at).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;