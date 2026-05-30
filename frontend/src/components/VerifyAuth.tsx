import { useAuth } from '../hooks/authContextHook'
import { Navigate } from 'react-router-dom'

const VerifyAuth = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth()

    if (!user) {
        return <Navigate to="/" replace />
    }

    if (loading.home) {
        return <div>Loading...</div>
    }

    return children
}

export default VerifyAuth