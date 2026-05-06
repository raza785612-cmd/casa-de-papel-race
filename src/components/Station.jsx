const Station = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // תמיד מתחיל כ-false
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputPass, setInputPass] = useState("");
  
  // חילוץ המשתמש
  const team = JSON.parse(localStorage.getItem('race_user'));
  const mission = allMissionsData[team?.username]?.[id];

  // איפוס נוסף לביטחון בטעינה
  useEffect(() => {
    setIsUnlocked(false);
    setInputPass("");
  }, [id]);

  const handleUnlock = () => {
    // לוגיקת הבדיקה
    if (inputPass.trim() === STATION_PASSWORDS[id]) {
      setIsUnlocked(true);
    } else {
      alert("קוד תחנה שגוי");
    }
  };

  // ... שאר הקוד (תצוגה נעולה ותצוגה פתוחה)