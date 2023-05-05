import React, { useState,createContext, useContext  } from "react"
import { useNavigate} from 'react-router-dom';
const AuthContext = createContext(null)
export const AuthProvider =  ({child}) => {
    const [user, setUser] = useState(null);
    const login = user => {
        setUser(user)
    }  
    const logout = () => {
        setUser(null)
    } 
    return <AuthContext.Provider value = {{user,login, logout}}>
        {child}
    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthProvider;
