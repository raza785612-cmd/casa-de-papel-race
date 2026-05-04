import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check password first
    if (password !== import.meta.env.VITE_GENERIC_PASSWORD) {
      setError('קוד סודי שגוי. נסה שוב!');
      return;
    }

    // Check if username exists in teams table
    const { data, error: supabaseError } = await supabase
      .from('teams')
      .select('id')
      .eq('name', username)
      .single();

    if (supabaseError) {
      setError('שגיאה בבדיקת שם המשתמש. אנא נסה שוב מאוחר יותר.');
      console.error('Supabase error:', supabaseError);
      return;
    }

    if (!data) {
      setError('שם המשתמש לא נמצא. אנא בדוק את שמך ונסה שוב.');
      return;
    }

    // Login successful
    localStorage.setItem('username', username);
    navigate('/station');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 font-['Arial', sans-serif] text-gray-800 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-sm text-right dir-rtl">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">כניסה למרוץ</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1 text-gray-700">
              שם משתמש
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dir-rtl"
              placeholder="הזן את שם הקבוצה שלך"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-700">
              קוד סודי
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dir-rtl"
              placeholder="הזן את הקוד הסודי"
            />
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md" role="alert">
              <strong className="font-bold">שגיאה:</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            כניסה למרוץ
          </button>
        </form>
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>הקוד הסודי נדרש להשלמת המשימה.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
