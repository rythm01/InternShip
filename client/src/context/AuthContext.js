import { createContext, useState, useEffect } from 'react';

import { getProfile } from '../networks/profile';
import jwt from 'jwt-decode' // import dependency
import jwtDecode from 'jwt-decode';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [t, setT] = useState(localStorage.getItem("token"));
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));
    const [authData, setAuthData] = useState({});
    const [refresh, setRefresh] = useState(false);

    const setToken = async (token) => {
        setT(token);
        await localStorage.setItem("token", token);
    }


    const getProfileFromApi = async () => {
        try {
            const res = await getProfile(t);
            if (!res.data.success) return console.log(res.data.message);
            setProfile(res.data.data);
            localStorage.setItem('profile', JSON.stringify(res.data.data))
        } catch (err) {
            console.log(err);
        }
    };


    const getUserAuthDetails = async () => {
        try {
            const data = await jwtDecode(t);
            setAuthData(data);
        } catch (err) {
            console.log(err);
        }
    };

    const logout = async () => {
        await localStorage.removeItem("token");
        await localStorage.removeItem("profile");
        setProfile(null)
        setT(null);
    };



    useEffect(() => {
        t && getProfileFromApi();
        t && getUserAuthDetails();
    }, [t, refresh]);


    return (
        <AuthContext.Provider value={{ setToken, logout, t, profile, authData, setProfile, setRefresh, refresh }}>
            {children}
        </AuthContext.Provider>
    );
}
