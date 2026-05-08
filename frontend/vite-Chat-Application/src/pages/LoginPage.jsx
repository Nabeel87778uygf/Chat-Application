import React from 'react'
import useAuthStore from '../store/useAuthStore'
function LoginPage() {
    const { authUser, login, isLoading } = useAuthStore();
    console.log("current auth user", authUser)
    return (
        <div>

        </div>
    )
}

export default LoginPage