import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { message } from 'antd'
window.onerror = (e) => {
  // @ts-ignore
  message.error(e)
}
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
