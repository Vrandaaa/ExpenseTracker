import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import TransactionContextProvider from './Context/TransactionContext.jsx'
import AuthContextProvider from './Context/AuthContext.jsx'
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthContextProvider>
            <TransactionContextProvider>
                <App />
            </TransactionContextProvider>
        </AuthContextProvider>
    </BrowserRouter>
)