import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // וודא שהקובץ הזה קיים, אפילו אם הוא ריק

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)