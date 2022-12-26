import { Navigate, Outlet } from 'react-router-dom';
import tokenExists from '../utils/tokenExists'

const ProtectedRoutes = () => {
    if(tokenExists()){
        return <Outlet />
    } else { 
        return <Navigate to='/login' />
    }
};

export default ProtectedRoutes;