import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ChatPage from './pages/ChatPage'
import useAuthStore from './store/useAuthStore'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import PageLoader from './components/PageLoader'
import { Toaster } from 'react-hot-toast'

function App() {
    const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

    useEffect(() => {
        checkAuth()
    }, [])

    console.log(authUser);


    if (isCheckingAuth) {
        return <div>
            <PageLoader />
        </div>
    }


    return (
        <div className='min-h-screen  bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden '>
            <div className='absolute -top-10 -right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-30 animate-blob' />
            <div className='absolute -bottom-10 -left-10 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-30 animate-blob' />
            <div className='absolute -top-10 -left-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-30 animate-blob' />


            <Routes>
                <Route path="/" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
                <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
                <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />

            </Routes>

            <Toaster />
        </div>
    )
}

export default App