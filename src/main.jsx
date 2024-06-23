import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ChatContextProvider  from './context/ChatContext.jsx'
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ChatContextProvider>
      <App />
      <Toaster></Toaster>
    </ChatContextProvider>
)
