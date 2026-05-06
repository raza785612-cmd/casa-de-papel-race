const handleLogin = async () => {
    setLoading(true);
    console.log("מנסה להתחבר עם:", username, password); // בדיקה שהערכים עוברים

    try {
      // שליפת הצוות
      const { data, error } = await supabase
        .from('teams') 
        .select('*')
        .eq('username', username.trim()) // trim מנקה רווחים מיותרים
        .eq('password', password.trim());

      if (error) {
        console.error("שגיאת סופבייס:", error.message);
        alert("שגיאת מערכת: " + error.message);
      } else if (!data || data.length === 0) {
        console.warn("לא נמצא צוות תואם במאגר");
        alert("שם צוות או סיסמה שגויים");
      } else {
        // הצלחה!
        const user = data[0]; // לוקחים את האיבר הראשון במערך
        console.log("התחברות הצליחה:", user);
        localStorage.setItem('race_user', JSON.stringify(user));
        navigate('/station/1');
      }
    } catch (err) {
      console.error("שגיאה לא צפויה:", err);
      alert("משהו השתבש בחיבור לשרת");
    } finally {
      setLoading(false);
    }
  };